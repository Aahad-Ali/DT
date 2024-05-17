import React, { useState, useEffect } from "react";
import todayMoneyIcon from "assets/today-money-icon.png";
import ArrowIcon from "assets/arrow-up.png";
import TenantCountIcon from "assets/tenant-count.png";
import PropertyCountIcon from "assets/properties-count.png";
import revenvueIcon from "assets/more-vertical.png";
import CalendarIcon from "assets/calendar.png";
import deleteIcon from "assets/delete1.png";
import FinanceBarChart from "../FinanceBarChart/FinanceBarChart";
import TaskPieChart from "../TaskPieChart/TaskPieChart";
import LandLordLineChart from "../LandLordLineChart/LandLordLineChart";
import userProfile from "assets/user-profile-img.png";
import crossIcon from "assets/work-order-x-icon.png";
import checkIcon from "assets/work-order-check-icon.png";
import progressIcon from "assets/work-order-progress-icon.png";
const ServiceProfessionalDashboard = () => {
  // States start
  const [removeRevenue, setremoveRevenue] = useState(false);
  const [removeProperty, setremoveProperty] = useState(false);
  const [removeTenant, setremoveTenant] = useState(false);
  const [removeProspect, setremoveProspect] = useState(false);
  const [removerevenue, setremoverevenue] = useState(false);
  const [removeVacancy, setremoveVacancy] = useState(false);
  const [removeTask, setremoveTask] = useState(false);
  // States end
  return (
    <>
      <div className="container-fluid bg-white p-3">
        <div className="row">
          <div className="col-md-4">
            <div className="land-lord-dashboard-box-container">
              <div className="land-lord-dashboard-update-box pb-4 d-flex align-items-center justify-content-between">
                <div className="land-lord-dashboard-update-text">
                  <span className="drawer-text-grey">TOTAL LANDLORD</span>
                  <p className="text-dark fw-bold fs-5">12</p>
                </div>
                <div className="land-lord-dashboard-update-img align-self-start">
                  <img src={todayMoneyIcon} alt="" />
                </div>
              </div>
              <div className="land-lord-dashboard-update-percent ">
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
          <div className="col-md-4">
            <div className="land-lord-dashboard-box-container">
              <div className="land-lord-dashboard-update-box pb-4 d-flex align-items-center justify-content-between">
                <div className="land-lord-dashboard-update-text">
                  <span className="drawer-text-grey">TOTAL TASKS</span>
                  <p className="text-dark fw-bold fs-5">20</p>
                </div>
                <div className="land-lord-dashboard-update-img align-self-start">
                  <img src={TenantCountIcon} alt="" />
                </div>
              </div>
              <div className="land-lord-dashboard-update-percent ">
                <p className="normal-grey-text mb-0">
                  {" "}
                  <span className="dashboard-success-text fw-bold">
                    <img src={ArrowIcon} alt="" /> +3%{" "}
                  </span>{" "}
                  vs Last Month
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="land-lord-dashboard-box-container">
              <div className="land-lord-dashboard-update-box pb-4 d-flex align-items-center justify-content-between">
                <div className="land-lord-dashboard-update-text">
                  <span className="drawer-text-grey">PENDING WORK ORDERS</span>
                  <p className="text-dark fw-bold fs-5">2</p>
                </div>
                <div className="land-lord-dashboard-update-img align-self-start">
                  <img src={PropertyCountIcon} alt="" />
                </div>
              </div>
              <div className="land-lord-dashboard-update-percent ">
                <p className="normal-grey-text mb-0">
                  {" "}
                  <span className="dashboard-success-text fw-bold">
                    <img src={ArrowIcon} alt="" /> 5%{" "}
                  </span>{" "}
                  vs Last Month
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8 col-md-6 mt-3">
            <div className="land-lord-dashboard-revenue-box">
              <div className="row">
                <div className="col-md-12">
                  <div className="revenue-top-box d-flex align-item-start justify-content-between">
                    <div className="revenue-box-heading">
                      <span className="fw-bold fs-5">Finance</span>
                      <p className="mt-2">March 1, 2020 - April 31, 2021</p>
                      <span className="revenvue-calendar drawer-text-grey">
                        <img src={CalendarIcon} alt="" /> Jan - Oct{" "}
                      </span>
                    </div>
                    <div className="revenue-box-right-icon position-relative text-end ">
                      <img
                        onClick={() => {
                          setremoveTenant(!removeTenant);
                        }}
                        src={revenvueIcon}
                        className="cursor"
                        alt=""
                      />
                      {/* <div
                        className={
                          removeTenant === true
                            ? "revenue-delete-box delete-box-show mt-3"
                            : "revenue-delete-box show mt-3"
                        }
                      >
                        <span className="text-delete">
                          <img src={deleteIcon} alt="" /> Remove
                        </span>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <FinanceBarChart className="service-perfessional-dashboard-chart" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mt-3">
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
                          setremoveTenant(!removeTenant);
                        }}
                        src={revenvueIcon}
                        className="cursor"
                        alt=""
                      />
                      {/* <div
                        className={
                          removeTenant === true
                            ? "revenue-delete-box delete-box-show mt-3"
                            : "revenue-delete-box show mt-3"
                        }
                      >
                        <span className="text-delete">
                          <img src={deleteIcon} alt="" /> Remove
                        </span>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-md-12">
                  <div className="row flex-wrap">
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
        <div className="row">
          <div className="col-lg-8 col-md-6 mt-3">
            <div className="land-lord-dashboard-revenue-box">
              <div className="row">
                <div className="col-md-12">
                  <div className="revenue-top-box d-flex align-item-start justify-content-between">
                    <div className="revenue-box-heading">
                      <span className="fw-bold fs-5">Finance</span>
                      <p className="mt-2">March 1, 2020 - April 31, 2021</p>
                      <span className="revenvue-calendar drawer-text-grey">
                        <img src={CalendarIcon} alt="" /> Jan - Oct{" "}
                      </span>
                    </div>
                    <div className="revenue-box-right-icon position-relative text-end ">
                      <img
                        onClick={() => {
                          setremoveTenant(!removeTenant);
                        }}
                        src={revenvueIcon}
                        className="cursor"
                        alt=""
                      />
                      {/* <div
                        className={
                          removeTenant === true
                            ? "revenue-delete-box delete-box-show mt-3"
                            : "revenue-delete-box show mt-3"
                        }
                      >
                        <span className="text-delete">
                          <img src={deleteIcon} alt="" /> Remove
                        </span>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="landlord-chart-details gap-2 d-flex align-items-center justify-content-center flex-column h-100">
                        <p className="mb-0">Past month landlords</p>
                        <div className="past-month-landlord"></div>
                        <p className="mb-0">Present month landlords</p>
                        <div className="present-month-landlord"></div>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <LandLordLineChart />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mt-3">
            <div className="dashboard-activity-box box-shadow position-relative d-flex flex-column justify-content-around h-100  p-3">
              <div className="revenue-top-box d-flex align-item-start justify-content-between">
                <div className="revenue-box-heading">
                  <span className="fw-bold fs-5">Recent Activities</span>
                  <p className="mt-2">March 1, 2020 - April 31, 2021</p>
                  <span className="revenvue-calendar drawer-text-grey">
                    <img src={CalendarIcon} alt="" /> Jan - Oct{" "}
                  </span>
                </div>
                <div className="revenue-box-right-icon position-relative text-end ">
                  <img
                    onClick={() => {
                      setremoveTenant(!removeTenant);
                    }}
                    src={revenvueIcon}
                    className="cursor"
                    alt=""
                  />
                  {/* <div
                    className={
                      removeTenant === true
                        ? "revenue-delete-box delete-box-show mt-3"
                        : "revenue-delete-box show mt-3"
                    }
                  >
                    <span className="text-delete">
                      <img src={deleteIcon} alt="" /> Remove
                    </span>
                  </div> */}
                </div>
              </div>
              <div className="position-relative">
                <div className="task-line position-absolute"></div>

                <div className="activity-first-image d-flex gap-3 align-items-start">
                  <img
                    src={userProfile}
                    className="object-fit-contain "
                    alt=""
                  />
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
                  <img
                    src={userProfile}
                    className="object-fit-contain "
                    alt=""
                  />
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
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-xl-8"></div>
          <div className="col-lg-12 col-xl-4 col-md-12">
            <div className="row">
              <div className="col-md-12">
                <div className="land-lord-dashboard-revenue-box">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="revenue-top-box d-flex align-item-start justify-content-between">
                        <div className="revenue-box-heading">
                          <span className="fw-bold fs-5">Work Order</span>
                          <p className="mt-2">March 1, 2020 - April 31, 2021</p>
                        </div>
                        <div className="revenue-box-right-icon position-relative text-end">
                          <img
                            onClick={() => {
                              setremoveTenant(!removeTenant);
                            }}
                            src={revenvueIcon}
                            className="cursor"
                            alt=""
                          />
                          {/* <div
                            className={
                              removeTenant === true
                                ? "revenue-delete-box delete-box-show mt-3"
                                : "revenue-delete-box show mt-3"
                            }
                          >
                            <span className="text-delete">
                              <img src={deleteIcon} alt="" /> Remove
                            </span>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-12 gap-3 service-professional-dashboard-work-order-section">
                      <div className="work-order-completed-box mb-4 d-flex align-items-center p-2 gap-3 justify-content-start">
                        <div className="completed-box-img">
                          <img src={checkIcon} alt="" />
                        </div>
                        <div className="completed-box-text">
                          <p className="text-white mb-0">Completed</p>
                          <p className="text-white">12</p>
                        </div>
                      </div>
                      <div className="work-order-not-started-box mb-4 d-flex align-items-center p-2 gap-3 justify-content-start">
                        <div className="completed-box-img">
                          <img src={crossIcon} alt="" />
                        </div>
                        <div className="completed-box-text">
                          <p className="text-white mb-0">Not Started</p>
                          <p className="text-white">8</p>
                        </div>
                      </div>
                      <div className="work-order-in-progress-box d-flex align-items-center p-2 gap-3 justify-content-start">
                        <div className="completed-box-img">
                          <img src={progressIcon} alt="" />
                        </div>
                        <div className="completed-box-text">
                          <p className="text-white mb-0">In Progress</p>
                          <p className="text-white">10</p>
                        </div>
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

export default ServiceProfessionalDashboard;
