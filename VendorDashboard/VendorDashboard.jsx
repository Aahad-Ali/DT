import React, { useState, useEffect } from "react";
import ArrowIcon from "assets/arrow-up.png";
import revenvueIcon from "assets/more-vertical.png";
import CalendarIcon from "assets/calendar.png";
import deleteIcon from "assets/delete1.png";
import "react-circular-progressbar/dist/styles.css";
import ColumnChartDashboard from "../ColumnChartDashboard/ColumnChartDashboard";
import userIcon from "assets/users-02.png";
import coinIcon from "assets/coins-stacked-03.png";
import buildingIcon from "assets/buildingIcon.png";
import userProfile from "assets/user-profile-img.png";
import TaskPieChart from "../TaskPieChart/TaskPieChart";
const VendorDashboard = () => {
  // States start
  const [removeRevenue, setremoveRevenue] = useState(false);
  // States end
  return (
    <>
      <div className="container-fluid bg-white mt-3 p-3">
        <div className="row mt-5">
          <div className="col-md-4">
            <div className="vendor-dashboard-top-box d-flex align-items-center gap-4 position-relative">
              <div className="vendor-box-left-box ">
                <img src={coinIcon} alt="" />
              </div>
              <div className="vendor-box-right-box">
                <p className="drawer-text-grey fw-medium mb-2">TODAY’S MONEY</p>
                <p className="price-text">$53,000</p>
                <p className="normal-grey-text ">
                  {" "}
                  <span className="dashboard-success-text fw-bold">
                    <img src={ArrowIcon} alt="" /> 20%{" "}
                  </span>{" "}
                  vs Last Month
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="vendor-dashboard-top-box d-flex align-items-center gap-4 position-relative">
              <div className="vendor-box-left-box ">
                <img src={userIcon} alt="" />
              </div>
              <div className="vendor-box-right-box">
                <p className="drawer-text-grey fw-medium mb-2">TOTAL TASKS </p>
                <p className="price-text">2,300</p>
                <p className="normal-grey-text ">
                  {" "}
                  <span className="dashboard-success-text fw-bold">
                    <img src={ArrowIcon} alt="" /> +3{" "}
                  </span>{" "}
                  vs Last Month
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="vendor-dashboard-top-box d-flex align-items-center gap-4 position-relative">
              <div className="vendor-box-left-box ">
                <img src={buildingIcon} alt="" />
              </div>
              <div className="vendor-box-right-box">
                <p className="drawer-text-grey fw-medium mb-2">
                  TOTAL WORK ORDERS
                </p>
                <p className="price-text">200</p>
                <p className="normal-grey-text ">
                  {" "}
                  <span className="dashboard-success-text fw-bold">
                    <img src={ArrowIcon} alt="" /> 20%{" "}
                  </span>{" "}
                  vs Last Month
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-8">
            <div className="land-lord-dashboard-revenue-box">
              <div className="row">
                <div className="col-md-12">
                  <div className="revenue-top-box d-flex align-item-start justify-content-between">
                    <div className="revenue-box-heading">
                      <span className="fw-bold fs-5">Revenue</span>{" "}
                      <span className="ms-4 revenvue-calendar drawer-text-grey">
                        <img src={CalendarIcon} alt="" /> Jan - Sep{" "}
                      </span>
                      <p className="mt-2">March 1, 2020 - April 31, 2021</p>
                    </div>
                    <div className="revenue-box-right-icon position-relative text-end ">
                      <img
                        onClick={() => {
                          setremoveRevenue(!removeRevenue);
                        }}
                        src={revenvueIcon}
                        className="cursor"
                        alt=""
                      />
                      <div
                        className={
                          removeRevenue === true
                            ? "revenue-delete-box delete-box-show mt-3"
                            : "revenue-delete-box mt-3"
                        }
                      >
                        <span className="text-delete">
                          <img src={deleteIcon} alt="" /> Remove
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <ColumnChartDashboard />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="dashboard-activity-box box-shadow position-relative d-flex flex-column justify-content-around h-100  p-3">
              <div className="activity-first-image d-flex gap-3 align-items-start">
                <img src={userProfile} className="object-fit-contain " alt="" />
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
              <div className="activity-second-image d-flex gap-3">
                <img src={userProfile} className="object-fit-contain " alt="" />
                <div className="activity-box-task">
                  <span className="new-task-icon dashboard-success-text fw-bold">
                    <svg
                      width={21}
                      height={21}
                      fill="#027A48"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zm4.768 9.14a1 1 0 1 0-1.536-1.28l-4.3 5.159-2.225-2.226a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.475-.067l5-6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="ms-1">task Completed</span>
                  </span>
                  <p className="text-dark mb-0">
                    <strong>Georgia Mollie</strong> completed task{" "}
                    <strong>#276</strong>
                  </p>
                  <p className="text-dark">Yesterday, 3:58 pm</p>
                </div>
              </div>
              <div className="task-line position-absolute"></div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-8">
              <div className="land-lord-dashboard-revenue-box">
                <div className="row">
                  <div className="col-md-12">
                    <div className="revenue-top-box d-flex align-item-start justify-content-between">
                      <div className="revenue-box-heading">
                        <span className="fw-bold fs-5">Work Orders</span>
                        <p className="mt-2">March 1, 2020 - April 31, 2021</p>
                        <span className="ms-4 revenvue-calendar drawer-text-grey">
                          <img src={CalendarIcon} alt="" /> Jan - Sep{" "}
                        </span>
                      </div>
                      <div className="revenue-box-right-icon position-relative text-end ">
                        <img
                          onClick={() => {
                            setremoveRevenue(!removeRevenue);
                          }}
                          src={revenvueIcon}
                          className="cursor"
                          alt=""
                        />
                        <div
                          className={
                            removeRevenue === true
                              ? "revenue-delete-box delete-box-show mt-3"
                              : "revenue-delete-box mt-3"
                          }
                        >
                          <span className="text-delete">
                            <img src={deleteIcon} alt="" /> Remove
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-5">
                  <div className="col-md-12">
                    <div className="vendor-dashboard-vendor-box d-flex align-items-center gap-3">
                      <div className="not-started-box w-50">
                        <span className="border-number">10</span>{" "}
                        <span>Not started</span>
                      </div>
                      <div className="in-progress-box w-50">
                        <span className="border-number-white">15</span>{" "}
                        <span>In progress</span>
                      </div>
                    </div>
                    <div className="completed-box mt-4">
                      <span className="border-number-white">36</span>{" "}
                      <span>Completed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="land-lord-dashboard-revenue-box">
                <div className="row">
                  <div className="col-md-12">
                    <div className="revenue-top-box d-flex align-item-start justify-content-between">
                      <div className="revenue-box-heading">
                        <span className="fw-bold fs-5">Tasks</span>
                        <p className="mt-2">March 1, 2020 - April 31, 2021</p>
                      </div>
                      <div className="revenue-box-right-icon position-relative text-end ">
                        <img
                          onClick={() => {
                            setremoveRevenue(!removeRevenue);
                          }}
                          src={revenvueIcon}
                          className="cursor"
                          alt=""
                        />
                        <div
                          className={
                            removeRevenue === true
                              ? "revenue-delete-box delete-box-show mt-3"
                              : "revenue-delete-box mt-3"
                          }
                        >
                          <span className="text-delete">
                            <img src={deleteIcon} alt="" /> Remove
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-5">
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-4">
                        <div className="task-status">
                          <div className="task-not-started">
                            <p className="fw-medium text-dark">Not Started</p>
                            <p className="not-started-status"></p>
                          </div>
                          <div className="task-completed">
                            <p className="fw-medium text-dark">Completed</p>
                            <p className="completed-status"></p>
                          </div>
                          <div className="task-in-progress">
                            <p className="fw-medium text-dark">In Progress</p>
                            <p className="in-progress-status"></p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <TaskPieChart />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorDashboard;
