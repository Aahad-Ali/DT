import React, { useState } from "react";
import profilePicture from "assets/tenant-profile-pic.png";
import buildingIcon from "assets/building-icon.png";
import TenantDashboardBarChart from "../TenantDashboardBarChart/TenantDashboardBarChart";
import balanceIcon from "assets/tenant-accoun-box-icon.png";
import rentIcon from "assets/tenant-accoun-box-icon.png";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import flagIcon from "assets/flag.png";
import arrowCircle from "assets/arrow-circle-right.png";
import checkCircle from "assets/check-circle.png";
import ArrowIcon from "assets/arrow-up.png";
import userProfile from "assets/user-profile-img.png";
import { Table } from "antd";
import settingBtn from "assets/more-vertical.png";
import viewIcon from "assets/Icon.png";
import editIcon from "assets/edit-05.png";
import completeIcon from "assets/calendar-check-01.png";
import deleteIcon from "assets/trash-01.png";
import { useNavigate } from "react-router-dom";
import dot from "assets/_Dot.png";
import dueDot from "assets/_red-Dot.png";
const TenantDashboard = () => {
  // States start
  const [selected, setSelected] = useState([new Date()]);
  const [selectionType, setSelectionType] = useState("checkbox");
  const [key, setKey] = useState([]);
  // States end

  const navigate = useNavigate();
  // Data Table functions
  const data = [
    {
      key: "1",
      invoice: "INV-24301901",
      name: "Olivia Rhye",
      phone: "+1 (555) 543-2109",
      task: "Plumbing issues",
      amount: "$381.76",
      date: "12/3/22",
      status: "",
    },
    {
      key: "2",
      invoice: "INV-24301901",
      name: "Olivia Rhye",
      phone: "+1 (555) 543-2109",
      task: "Plumbing issues",
      amount: "$381.76",
      date: "12/3/22",
      status: "",
    },
    {
      key: "3",
      invoice: "INV-24301901",
      name: "Olivia Rhye",
      phone: "+1 (555) 543-2109",
      task: "Plumbing issues",
      amount: "$381.76",
      date: "12/3/22",
      status: "",
    },
    {
      key: "4",
      invoice: "INV-24301901",
      name: "Olivia Rhye",
      phone: "+1 (555) 543-2109",
      task: "Plumbing issues",
      amount: "$381.76",
      date: "12/3/22",
      status: "",
    },
  ];
  const handleIconClick = (result) => {
    // Toggle the dropdownOpen state
    const filterData = data.filter((item) => {
      return item.key === result;
    });
    setKey(filterData[0].key);
    if (key === result) {
      setKey(null);
    } else {
      setKey(result);
    }
  };
  const columns = [
    {
      title: "INVOICE NO",
      dataIndex: "invoice",
    },
    {
      title: "NAME",
      dataIndex: "name",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Phone No",
      dataIndex: "phone",
      render: (text) => (
        <>
          <span className="phone">{text}</span>
        </>
      ),
    },
    {
      title: "TASK",
      dataIndex: "task",
      render: (text) => (
        <>
          <span>{text}</span>
        </>
      ),
    },
    {
      title: "AMOUNT",
      dataIndex: "amount",
      render: (text) => (
        <>
          <span>{text}</span>
        </>
      ),
    },
    {
      title: "INVOICE DATE",
      dataIndex: "date",
      render: (text) => (
        <>
          <span className="phone">{text}</span>
          <br />
          <span className="phone">Due Date:3/12/-22</span>
        </>
      ),
    },
    {
      title: "STATUS",
      dataIndex: "status",
      render: (text, status) => (
        <>
          <span
            className={
              status.key === "2"
                ? "tenant-report-due-bar"
                : "tenant-report-active-bar"
            }
          >
            <img
              src={status.key === "2" ? dueDot : dot}
              alt=""
              className="me-1"
            />
            {status.key === "2" ? "Overdue" : "Paid"}
          </span>
        </>
      ),
    },
    {
      title: "",
      dataIndex: "setting",
      render: (text, setting) => (
        <>
          <div className="task-table-setting-container position-relative cursor">
            <img
              src={settingBtn}
              alt=""
              onClick={() => handleIconClick(setting.key)}
            />
            {setting.key === key && (
              <div className="task-table-setting-dropdown-prospect bg-white box-shadow">
                <ul className="p-0 d-flex flex-column gap-3">
                  <li
                    onClick={() => {
                      navigate("/payable-overview");
                    }}
                    className="list-style-none"
                  >
                    {" "}
                    <img src={viewIcon} alt="" /> View
                  </li>
                  <li className="list-style-none">
                    {" "}
                    <img src={editIcon} alt="" /> Edit
                  </li>
                  <li className="list-style-none">
                    {" "}
                    <img src={completeIcon} alt="" /> Complete
                  </li>
                  <li className="list-style-none">
                    {" "}
                    <img src={deleteIcon} alt="" /> Delete
                  </li>
                </ul>
              </div>
            )}
          </div>
        </>
      ),
    },
  ];
  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };
  return (
    <>
      <div className="container-fluid bg-white p-3 mt-3">
        <div className="row mt-4">
          <div className="col-md-8">
            <div className="tenant-dashboard-profile-left d-flex gap-3">
              <div className="tenant-dashboard-profile-img">
                <img src={profilePicture} alt="" />
              </div>
              <div className="tenant-dashboard-profile-text">
                <h3>
                  Hi, <span className="fw-bold">Olivia</span>{" "}
                </h3>
                <p className="normal-grey-text">
                  Looks like you don't have any insurance for this lease
                </p>
                <button
                  className={
                    window.innerWidth <= 768
                      ? "save-btn w-100"
                      : "save-btn w-50"
                  }
                >
                  Get Insurance
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="tenant-dashboard-profile-right position-relative">
              <p className="normal-grey-text">PROPERTY DETAILS</p>
              <p className="normal-grey-text">
                <span className="fw-bold text-dark">354 Gladwell Street</span>{" "}
                PITTSBURGH, Pennsylvania 15283
              </p>
              <p className="primary-orange-text f-italic">
                Your next payment of $1,922.00 is due on 7/1/2023
              </p>
              <div className="building-icon">
                <img src={buildingIcon} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-lg-8 col-md-12  ">
            <div className="tenant-dashboard-accounting-container">
              <div className="tenant-dashboard-accounting-box d-flex align-items-start border-bottom justify-content-between">
                <div
                  className="tenant-dashboard-account-box-text d-flex flex-column justify-content-between"
                  style={{ gap: "7rem" }}
                >
                  <div className="tenant-account-box-1">
                    <p className="mb-0 text-dark fw-bold fs-5">Accounting</p>
                    <p className="mb-0 normal-grey-text">
                      March 1, 2020 - April 31, 2021
                    </p>
                  </div>
                  <div className="tenant-account-box-2">
                    <p className="mb-2 normal-grey-text">Monthly Rent </p>
                    <p className="mb-2 text-dark fw-bold fs-5">$23,240.00</p>
                    <p className="normal-grey-text mb-0">
                      {" "}
                      <span className="dashboard-success-text fw-bold">
                        <img src={ArrowIcon} alt="" /> 20%{" "}
                      </span>{" "}
                      vs Last Month
                    </p>
                  </div>
                </div>
                <div className="tenant-dashboard-account-box-chart">
                  <TenantDashboardBarChart />
                </div>
              </div>
              <div className="accounting-stats-container flex-wrap d-flex justify-content-between align-items-center mt-3">
                <div className="balance-due-box d-flex align-items-center gap-3">
                  <div className="balance-due-box-img">
                    <img src={balanceIcon} alt="" />
                  </div>
                  <div className="balance-due-box-text">
                    <p className="text-dark fw-bold fs-5 mb-0">$23,240.00</p>
                    <p className="normal-grey-text mb-0">Balance Due</p>
                  </div>
                </div>
                <div className="rent-box d-flex align-items-center gap-3">
                  <div className="rent-box-img">
                    <img src={rentIcon} alt="" />
                  </div>
                  <div className="rent-box-text">
                    <p className="text-dark fw-bold fs-5 mb-0">$23,240.00</p>
                    <p className="normal-grey-text mb-0">Balance Due</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-12">
            <div className="day-pick">
              <DayPicker
                showOutsideDays
                className="custom-calendar"
                mode="multiple"
                max={3}
                fromDate={selected}
                toDate={selected}
                selected={selected}
                onSelect={setSelected}
              />
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-8">
            <div className="tenant-property-task-container">
              <div className="row">
                <div className="col-md-12 text-start property-box-heading">
                  <h2>Property Tasks</h2>
                </div>
              </div>
              <div className="property-box-container d-flex align-items-center justify-content-center gap-5 mt-3">
                <div className="property-box d-flex justify-content-between flex-column">
                  <div className="property-box-upper-text">
                    <span>New</span>
                  </div>
                  <div className="property-box-lower-text d-flex justify-content-between align-items-end">
                    <span>3</span>
                    <div className="property-box-img">
                      <img src={flagIcon} alt="" />
                    </div>
                  </div>
                </div>
                <div className="property-box d-flex justify-content-between flex-column">
                  <div className="property-box-upper-text">
                    <span>Assigned</span>
                  </div>
                  <div className="property-box-lower-text d-flex justify-content-between align-items-end">
                    <span>5</span>
                    <div className="property-box-img">
                      <img src={arrowCircle} alt="" />
                    </div>
                  </div>
                </div>
                <div className="property-box d-flex justify-content-between flex-column">
                  <div className="property-box-upper-text">
                    <span>Closed </span>
                  </div>
                  <div className="property-box-lower-text d-flex justify-content-between align-items-end">
                    <span>10</span>
                    <div className="property-box-img">
                      <img src={checkCircle} alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <p className="normal-grey-text mt-3">Task Report</p>
                <p className="normal-grey-text mb-0">
                  {" "}
                  <span className="dashboard-success-text fw-bold">
                    <img src={ArrowIcon} alt="" /> 20%{" "}
                  </span>{" "}
                  vs Last Month
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-12 mt-4">
            <div className="dashboard-activity-box box-shadow rounded-3 d-flex flex-column justify-content-around h-100  p-3">
              <div className="row">
                <div className="col-md-12 activity-box-heading">
                  Recent Activities
                </div>
              </div>
              <div className="activity-first-image d-flex gap-3 align-items-start">
                <div className="position-relative d-flex justify-content-center">
                  <img
                    src={userProfile}
                    className="object-fit-contain "
                    alt=""
                  />

                  <div className="task-line-2 position-absolute"></div>
                </div>
                <div className="activity-box-task">
                  <span className="new-task-icon primary-orange-text fw-bold">
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
                      <path d="M4 15h13.865a1 1 0 0 0 .768-1.64L15 9l3.633-4.36A1 1 0 0 0 17.865 3H4v18" />
                    </svg>
                    new task
                  </span>
                  <p className="text-dark mb-0">
                    <strong>Logan Harrington</strong> created new mail...
                  </p>
                  <p className="text-dark">Today, 9:48 AM</p>

                  <div className="activity-middle-box p-2 rounded-3">
                    <strong>Water Drip from Faucots</strong>{" "}
                    <span className="drawer-text-grey  fw-bold">#284</span>
                    <br />
                    <span className="primary-bg ps-1 pe-2 text-white rounded-5">
                      MAINTENANCE
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="invoice-table-container">
            <Table
              className="table-responsive"
              pagination={false}
              rowSelection={{
                type: selectionType,
                ...rowSelection,
              }}
              columns={columns}
              dataSource={data}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TenantDashboard;
