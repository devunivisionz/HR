import React, { useEffect, useState } from "react";
import "./Calender.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getLeaveAction,
  getLeaveActionWithFilter,
} from "../../../../Redux/Leave/action";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date()); // September 2024
  const [selectedDate, setSelectedDate] = useState(new Date()); // Default select 8th date

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const current = new Date(startDate);

    while (current <= lastDay || days.length < 42) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
      if (days.length >= 42) break;
    }

    return days;
  };

  const days = getDaysInMonth(currentDate);
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const getApprovedLeavesListReducer = useSelector(
    (state) => state?.getLeaveReducerWithFilter
  );
  const getApprovedLeavesList = getApprovedLeavesListReducer?.data?.data;
  const navigateMonth = (direction) => {
    setCurrentDate(new Date(currentYear, currentMonth + direction, 1));
    setSelectedDate(null); // optional: reset selection on month change
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLeaveActionWithFilter({ leaveDate: selectedDate }));
  }, [selectedDate]);
  const approvedLeaves = [
    {
      name: "Cody Fisher",
      position: "Senior Backend Developer",
      date: "8/09/24",
      avatar: "CF",
    },
  ];
  console.log(getApprovedLeavesList);
  const formattedDate = (date) => new Date(date).toISOString().split("T")[0]; // '2024-09-20'

  return (
    <div className="calendar-panel">
      <div className="calendar-header">Leave Calendar</div>
      <div className="calendar-content">
        <div className="calendar-body">
          <div className="calendar-nav">
            <button
              onClick={() => navigateMonth(-1)}
              className="calendar-button"
            >
              ◀
            </button>
            <h6>
              {months[currentMonth]}, {currentYear}
            </h6>
            <button
              onClick={() => navigateMonth(1)}
              className="calendar-button"
            >
              ▶
            </button>
          </div>

          <div className="calendar-days-header">
            {daysOfWeek.map((day, idx) => (
              <div key={idx} className="calendar-day-header">
                {day}
              </div>
            ))}
          </div>

          <div className="calendar-days-grid">
            {days.map((day, index) => {
              const isCurrentMonth = day.getMonth() === currentMonth;
              const isToday = day.toDateString() === new Date().toDateString();

              const isSelected =
                selectedDate?.toDateString() === day.toDateString();

              return (
                <div
                  key={index}
                  onClick={() => setSelectedDate(day)}
                  className={`calendar-day 
                    ${isCurrentMonth ? "" : "calendar-day-outside"} 
                    ${isToday ? "calendar-day-today" : ""} 
                    ${isSelected ? "calendar-day-leave" : ""}
                  `}
                >
                  {day.getDate()}
                  {isSelected && (
                    <div className="calendar-leave-indicator">!</div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="calendar-approved-leaves">
            <h4>Approved Leaves</h4>
            {getApprovedLeavesList?.map((leave, index) => (
              <div key={index} className="calendar-leave-item">
                <div className="calendar-avatar">{leave.avatar}</div>
                <div className="calendar-leave-info">
                  <div className="calendar-leave-name">
                    {leave?.employee.name}
                  </div>
                  <div className="calendar-leave-position">
                    {leave?.employee.position}
                  </div>
                </div>
                <div className="calendar-leave-date">
                  {formattedDate(leave?.leaveDate)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
