import React, { useEffect, useState } from "react";

import { Select, ConfigProvider } from "antd";

import NotFound from "assets/not-found-img.png";

import dot from "assets/_Dot.png";
import inActiveDot from "assets/_inActive-Dot.png";
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

const TenantReports = () => {
  // States start
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
  const [selectionType, setSelectionType] = useState("checkbox");

  const [openModal, setOpenModal] = useState(false);

  const [selectedTableItem, setSelectedTableItem] = useState("");
  const { report, fetchTenantReport } = UseGetHook("tenant")
  // States end

  const navigate = useNavigate();
  useEffect(() => {
    fetchTenantReport()
  }, [])
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
  const data = report.filter((e) =>
    e?.data?.firstName.toLowerCase().includes(search.toLowerCase())
  ).map(e => ({
    key: "1",
    name: `${e.data.firstName} ${e.data.lastName}`,
    property: e.data.address,
    email: e.data.email,
    status: "",
  }))

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Properties",
      dataIndex: "property",
      render: (text) => (
        <>
          {" "}
          <span>{text}</span>
        </>
      ),
    },
    {
      title: "Email Address",
      dataIndex: "email",
      render: (text, type) => (
        <>
          <span>{text} </span>
        </>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, status) => (
        <>
          <span
            className={
              status.key === "2"
                ? "tenant-report-in-active-bar"
                : "tenant-report-active-bar"
            }
          >
            <img
              src={status.key === "2" ? inActiveDot : dot}
              alt=""
              className="me-1"
            />
            Active
          </span>
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
    //               <Link>
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

export default TenantReports;
