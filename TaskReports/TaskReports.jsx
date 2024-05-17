import React, { useEffect, useState } from "react";
import searchIcon from "assets/search.png";
import FilterIcon from "assets/filter.png";
import { Select, ConfigProvider } from "antd";
import calendarIcon from "assets/calendar.png";
import NotFound from "assets/not-found-img.png";
import { CSVLink } from "react-csv";
import viewIcon from "assets/Icon.png";
import editIcon from "assets/edit-05.png";
import completeIcon from "assets/calendar-check-01.png";
import deleteIcon from "assets/trash-01.png";
import settingIcon from "assets/three-dots.png";
import { useNavigate, Link } from "react-router-dom";
import { Table, DatePicker, Space } from "antd";
import { usePDF } from "react-to-pdf";
import chevronIcon from "assets/chevron-down.png";
import calendarIconDate from "assets/calendar-icon.png";
import trashIconWhite from "assets/trash-icon-white.png";
import UseGetHook from "Hooks/UseGetHook";
import { useSelector } from "react-redux";

const { RangePicker } = DatePicker;
let calendar;
calendar = (
  <>
    <img src={calendarIconDate} alt="" />
  </>
);

const TaskReports = () => {
  // States start
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
  const [selectionType, setSelectionType] = useState("checkbox");
  const [exportDropdown, setExportDropdown] = useState(false);
  const [taskFilterDropdown, settaskFilterDropdown] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [key, setKey] = useState([]);
  const [selectedTableItem, setSelectedTableItem] = useState("");
  const { report, fetchTaskReport } = UseGetHook("task")
  // States end
  useEffect(() => {
    fetchTaskReport()
  }, [])
  const navigate = useNavigate();
  // Modal Function
  const onOpenModal = () => {
    setOpenModal(true);
  };
  const onCloseModal = () => {
    setOpenModal(false);
  };

  const search = useSelector((state) => {
    return state.Search.value;
  });

  // Data Table functions
  const data = report?.filter((e) =>
    e?.data?.title?.toLowerCase().includes(search.toLowerCase())
  ).map(e => ({
    key: "1",
    title: e.data.title,
    assign: "Joe Walker",
    due: new Date(e.data.dueDate).toLocaleDateString(),
    related: e.data.property.title,
    status: e.data.status,
  }))
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      render: (text) => (
        <>
          <Link to="/task-report-detail">
            <span className="property-table-name-text">{text}</span>
          </Link>
        </>
      ),
    },
    {
      title: "Assigned To",
      dataIndex: "assign",
      render: (text) => (
        <>
          {" "}
          <span>{text}</span>
        </>
      ),
    },
    {
      title: "Due At",
      dataIndex: "due",
      render: (text, due) => (
        <>
          {due.key === "1" && <p className="due-label pb-0 mb-0"></p>}
          {due.key === "2" && <p className="completed-label pb-0 mb-0"></p>}
          {due.key === "3" && <p className="not-started-label pb-0 mb-0"></p>}
          {due.key === "4" && <p className="not-started-label pb-0 mb-0"></p>}
          <span>{text}</span>
        </>
      ),
    },
    {
      title: "Related To",
      dataIndex: "related",
      render: (text) => <span className="related-text">{text}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, status) => (
        <>
          {text === "in Progress" && (
            <span className="table-status-bar ">in Progress</span>
          )}
          {text === "Completed" && (
            <span className="table-complete-status-bar ">Completed</span>
          )}
          {text === "Not Started" && (
            <span className="table-not-started-status-bar ">Not Started</span>
          )}
        </>
      ),
    },
    // {
    //   title: "",
    //   dataIndex: "setting",
    //   render: (text, setting) => (
    //     <>
    //       <div className="task-table-setting-container position-relative cursor">
    //         <img
    //           src={settingIcon}
    //           alt=""
    //           onClick={() => handleIconClick(setting.key)}
    //         />
    //         {setting.key === key && (
    //           <div className="task-table-setting-dropdown-prospect bg-white box-shadow">
    //             <ul className="p-0 d-flex flex-column gap-3">
    //               <Link to="/task-report-detail">
    //                 <li className="list-style-none table-setting-dropdown-menu">
    //                   {" "}
    //                   <img src={viewIcon} alt="" /> View
    //                 </li>
    //               </Link>
    //               <Link>
    //                 <li className="list-style-none table-setting-dropdown-menu">
    //                   {" "}
    //                   <img src={editIcon} alt="" /> Edit
    //                 </li>
    //               </Link>
    //               <Link>
    //                 <li className="list-style-none table-setting-dropdown-menu">
    //                   {" "}
    //                   <img src={completeIcon} alt="" /> Complete
    //                 </li>
    //               </Link>
    //               <Link>
    //                 <li className="list-style-none table-setting-dropdown-menu">
    //                   {" "}
    //                   <img src={deleteIcon} alt="" /> Delete
    //                 </li>
    //               </Link>
    //             </ul>
    //           </div>
    //         )}
    //       </div>
    //     </>
    //   ),
    // },
  ];
  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      console.log(selectedTableItem.length);
      setSelectedTableItem(selectedRowKeys);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };
  const routeHandleChange = (route) => {
    navigate(`/${route}`);
  };
  let dropdownIcon;
  dropdownIcon = (
    <>
      <img src={chevronIcon} alt="" />
    </>
  );
  return (
    <>
      <div className="container-fluid">
        {selectedTableItem.length >= 1 && (
          <div className="table-delete-icon mt-3">
            <button className="table-delete-btn next-btn-main">
              <img src={trashIconWhite} />
              Delete
            </button>
          </div>
        )}
        <div className="report-table-container mt-3" ref={targetRef}>
          <ConfigProvider
            theme={{
              components: {
                Table: {
                  colorTextHeading: "#667085",
                  colorText: "#667085",
                  fontSize: 14,
                  fontWeightStrong: 500,
                  fontFamily: "Montserrat",
                },
                Checkbox: {
                  colorPrimary: "#EF6B3E",
                  colorPrimaryHover: "#EF6B3E",
                },
              },
            }}
          >
            <Table
              className="scroll-remove scroll-responsive-tablet"
              pagination={false}
              rowSelection={{
                type: selectionType,
                ...rowSelection,
              }}
              columns={columns}
              dataSource={data}
            />
          </ConfigProvider>
        </div>
        <div className="not-found-container text-center d-none">
          <img src={NotFound} alt="" />
          <p>
            <strong>No tasks found</strong>
          </p>
          <p>
            No tasks were found; the folder is empty. <br /> Please try again.
          </p>
          <button className="not-found-add-task-btn primary-orange-text">
            <span className="plus">
              <svg
                width={21}
                height={21}
                fill="#EF6B3E"
                stroke="#EF6B3E"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 5v14" />
                <path d="M5 12h14" />
              </svg>
            </span>
            Add Tasks
          </button>
        </div>
      </div>
    </>
  );
};

export default TaskReports;
