import React from "react";
import "./GlobalList.css";
import {
  Pencil,
  Trash2,
  Ban,
  MoreVertical,
  Loader,
  LoaderCircle,
  DockIcon,
  FileSpreadsheet,
} from "lucide-react";
import { Dropdown } from "react-bootstrap";
import GlobalDropdown from "../GlobalDropdown/GlobalDropdown";

const GlobalList = ({
  data = [],
  headers = [],
  handleBlockToggle,
  actionOptions,
  currentPage = 1,
  pageSize = 10,
  loading,
  dropdownList,
  employeeStatusChange,
  serialNumber = true,
  fileDownloader,
}) => {
  const allHeaders = [
    ...headers,
    actionOptions?.length > 0 && { id: "action", label: "Action" },
  ];

  return loading ? (
    <div className="full-page-loader">
      <Loader />
    </div>
  ) : data?.length == 0 ? (
    <div className="no-data">No data found!</div>
  ) : (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {allHeaders.map((header, idx) => {
              if (header.id === "sno" && !serialNumber) return null; // skip rendering
              return <th key={idx}>{header.label}</th>;
            })}
          </tr>
        </thead>

        <tbody>
          {data.map((ele, index) => (
            <tr key={ele._id || ele.id || index}>
              {headers.map((header, i) => {
                if (header.id === "sno" && !serialNumber) return null; // Skip <td> if serialNumber false

                return (
                  <td key={i}>
                    {header.id === "sno" && serialNumber ? (
                      pageSize * (currentPage - 1) + (index + 1)
                    ) : header.id === "avatar" ? (
                      <img
                        className="avatar"
                        src={ele[header.id]}
                        alt={ele.name}
                      />
                    ) : header.type === "dropdown" ? (
                      <GlobalDropdown
                        changeHandler={(e) =>
                          employeeStatusChange(e, ele[header?.id], ele)
                        }
                        dropdownFor={ele[header?.id]}
                        dropdownList={dropdownList}
                      />
                    ) : header.type === "doc" ? (
                      <FileSpreadsheet
                        onClick={() => {
                          fileDownloader(ele);
                          console.log(ele, "khuygtfch");
                        }}
                      />
                    ) : (
                      ele[header.id] ?? "-"
                    )}
                  </td>
                );
              })}
              {actionOptions?.length > 0 && (
                <td className="action">
                  <Dropdown align="end">
                    <Dropdown.Toggle
                      variant="light"
                      bsPrefix="custom-toggle"
                      style={{ background: "transparent", border: "none" }}
                    >
                      <MoreVertical size={20} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {actionOptions?.map((elem) => {
                        return (
                          <Dropdown.Item
                            key={elem}
                            onClick={() => handleBlockToggle(elem, ele)}
                          >
                            {elem}
                          </Dropdown.Item>
                        );
                      })}
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GlobalList;
