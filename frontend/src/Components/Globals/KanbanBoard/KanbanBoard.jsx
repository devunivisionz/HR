import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  useDroppable,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, User, Mail, Phone, Briefcase } from "lucide-react";

const KanbanColumn = ({ title, candidates, status, isOver }) => {
  const { setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <div className="col-md-3">
      <div 
        className={`kanban-column ${isOver ? 'kanban-column-over' : ''}`}
        style={{
          backgroundColor: '#fff',
          borderRadius: '16px',
          boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
          height: '100%',
          border: isOver ? '2px solid #4d007d' : '1px solid #eee',
          transition: 'all 0.3s ease'
        }}
      >
        <div 
          style={{
            backgroundColor: '#4d007d',
            color: 'white',
            padding: '14px 16px',
            borderRadius: '16px 16px 0 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <h6 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>
            {title}
          </h6>
          <span 
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              padding: '4px 12px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: '500'
            }}
          >
            {candidates.length}
          </span>
        </div>
        <div 
          ref={setNodeRef}
          style={{ 
            padding: '16px',
            minHeight: '300px',
            borderRadius: '0 0 16px 16px'
          }}
        >
          <SortableContext
            items={candidates.map(c => c._id)}
            strategy={verticalListSortingStrategy}
          >
            {candidates.map((candidate) => (
              <CandidateCard key={candidate._id} candidate={candidate} />
            ))}
          </SortableContext>
          {candidates.length === 0 && (
            <div 
              style={{
                textAlign: 'center',
                color: '#999',
                padding: '40px 20px',
                fontSize: '14px',
                fontStyle: 'italic'
              }}
            >
              Drop candidates here
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CandidateCard = ({ candidate }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: candidate._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const getStatusColor = (status) => {
    const colors = {
      New: '#4d007d',
      Scheduled: '#17a2b8',
      Ongoing: '#ffc107',
      Selected: '#28a745',
      Rejected: '#dc3545',
    };
    return colors[status] || '#6c757d';
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        backgroundColor: '#fff',
        borderRadius: '12px',
        border: `3px solid ${getStatusColor(candidate.status)}`,
        marginBottom: '12px',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 8px',
        cursor: 'grab',
        transition: 'all 0.2s ease'
      }}
      {...attributes}
      {...listeners}
    >
      <div style={{ padding: '16px' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'start', 
          marginBottom: '12px' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <User size={16} style={{ color: '#666', marginRight: '8px' }} />
            <strong style={{ 
              fontSize: '14px',
              color: '#333',
              maxWidth: '120px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {candidate.name}
            </strong>
          </div>
          <GripVertical size={14} style={{ color: '#999', cursor: 'grab' }} />
        </div>
        
        <div style={{ marginBottom: '12px' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: '6px' 
          }}>
            <Mail size={12} style={{ color: '#666', marginRight: '6px' }} />
            <small style={{ 
              color: '#666',
              maxWidth: '150px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {candidate.email}
            </small>
          </div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: '6px' 
          }}>
            <Phone size={12} style={{ color: '#666', marginRight: '6px' }} />
            <small style={{ color: '#666' }}>{candidate.phone}</small>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Briefcase size={12} style={{ color: '#666', marginRight: '6px' }} />
            <small style={{ color: '#666' }}>{candidate.position}</small>
          </div>
        </div>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          <span style={{
            backgroundColor: getStatusColor(candidate.status),
            color: 'white',
            padding: '4px 8px',
            borderRadius: '8px',
            fontSize: '11px',
            fontWeight: '500'
          }}>
            {candidate.status}
          </span>
          <small style={{ color: '#999', fontSize: '12px' }}>
            {candidate.experience} years
          </small>
        </div>
      </div>
    </div>
  );
};

const getStatusBadgeColor = (status) => {
  const colors = {
    New: "primary",
    Scheduled: "info",
    Ongoing: "warning",
    Selected: "success",
    Rejected: "danger",
  };
  return colors[status] || "secondary";
};

const KanbanBoard = ({ candidates, onStatusChange, loading }) => {
  const [activeId, setActiveId] = useState(null);
  const [overColumn, setOverColumn] = useState(null);

  const statusColumns = [
    { status: "New", title: "New Candidates", color: "primary" },
    { status: "Scheduled", title: "Scheduled", color: "info" },
    { status: "Ongoing", title: "Ongoing", color: "warning" },
    { status: "Selected", title: "Selected", color: "success" },
    { status: "Rejected", title: "Rejected", color: "danger" },
  ];

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;

    // Check if we're over a column (droppable zone)
    const overColumn = statusColumns.find(column => over.id === column.status);
    if (overColumn) {
      setOverColumn(overColumn.status);
    } else {
      // Check if we're over a candidate and get their column
      const overCandidate = candidates.find(c => c._id === over.id);
      if (overCandidate) {
        setOverColumn(overCandidate.status);
      }
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);
    setOverColumn(null);

    if (!over) return;

    const candidate = candidates.find(c => c._id === active.id);
    if (!candidate) return;

    // Determine the new status
    let newStatus = null;
    
    // Check if we're over a column (droppable zone)
    const overColumn = statusColumns.find(column => over.id === column.status);
    if (overColumn) {
      newStatus = overColumn.status;
    } else {
      // We're over another candidate, get their status
      const overCandidate = candidates.find(c => c._id === over.id);
      if (overCandidate) {
        newStatus = overCandidate.status;
      }
    }

    // If we found a new status and it's different from current, update
    if (newStatus && newStatus !== candidate.status) {
      console.log(`Moving candidate ${candidate.name} from ${candidate.status} to ${newStatus}`);
      onStatusChange(newStatus, candidate.status, candidate._id);
    }
  };

  const getCandidatesByStatus = (status) => {
    return candidates.filter(candidate => candidate.status === status);
  };

  const getActiveCandidate = () => {
    return candidates.find(c => c._id === activeId);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "400px" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '0 16px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h4 style={{ 
          margin: 0, 
          color: '#333', 
          fontSize: '24px', 
          fontWeight: '600',
          marginBottom: '8px'
        }}>
          Recruitment Pipeline
        </h4>
        <p style={{ 
          margin: 0, 
          color: '#666', 
          fontSize: '14px' 
        }}>
          Drag candidates between stages to update their status
        </p>
      </div>
      
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div style={{ display: 'flex', gap: '16px', overflowX: 'auto' }}>
          {statusColumns.map((column) => (
            <KanbanColumn
              key={column.status}
              title={column.title}
              status={column.status}
              candidates={getCandidatesByStatus(column.status)}
              isOver={overColumn === column.status}
            />
          ))}
        </div>
        
        <DragOverlay>
          {activeId ? (
            <div style={{
              backgroundColor: '#fff',
              borderRadius: '12px',
              border: '3px solid #4d007d',
              boxShadow: 'rgba(0, 0, 0, 0.3) 0px 8px 24px',
              width: '280px',
              transform: 'rotate(5deg)'
            }}>
              <div style={{ padding: '16px' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'start', 
                  marginBottom: '12px' 
                }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <User size={16} style={{ color: '#666', marginRight: '8px' }} />
                    <strong style={{ 
                      fontSize: '14px',
                      color: '#333',
                      maxWidth: '120px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {getActiveCandidate()?.name}
                    </strong>
                  </div>
                  <GripVertical size={14} style={{ color: '#999' }} />
                </div>
                
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    marginBottom: '6px' 
                  }}>
                    <Mail size={12} style={{ color: '#666', marginRight: '6px' }} />
                    <small style={{ 
                      color: '#666',
                      maxWidth: '150px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {getActiveCandidate()?.email}
                    </small>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    marginBottom: '6px' 
                  }}>
                    <Phone size={12} style={{ color: '#666', marginRight: '6px' }} />
                    <small style={{ color: '#666' }}>{getActiveCandidate()?.phone}</small>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Briefcase size={12} style={{ color: '#666', marginRight: '6px' }} />
                    <small style={{ color: '#666' }}>{getActiveCandidate()?.position}</small>
                  </div>
                </div>

                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center' 
                }}>
                  <span style={{
                    backgroundColor: '#4d007d',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '8px',
                    fontSize: '11px',
                    fontWeight: '500'
                  }}>
                    {getActiveCandidate()?.status}
                  </span>
                  <small style={{ color: '#999', fontSize: '12px' }}>
                    {getActiveCandidate()?.experience} years
                  </small>
                </div>
              </div>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default KanbanBoard;
