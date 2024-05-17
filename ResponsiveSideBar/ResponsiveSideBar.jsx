import React, { useState } from "react";
import Logo from "assets/digitaltenant__CV-3.webp";
import sideDrawerHome from "assets/home.png";
import sideDrawerTags from "assets/tags.png";
import sideDrawerTasks from "assets/drawer-file-check-02.png";
import sideDrawerContact from "assets/drawer-user-circle.png";
import sideDrawerDocument from "assets/folders.png";
import sideDrawerChat from "assets/drawer--chat-icon.png";
import sideDrawerPassport from "assets/side-drawer-globe.png";
import sideDrawerPayable from "assets/drawer-payable-icon.png";
import SettignUserIcon from "assets/user.svg";
import settingIcon from "assets/settings.png";
import logOutIcon from "assets/log-out-04.png";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Avatar, ConfigProvider, Progress } from "antd";
import { useSelector } from "react-redux";
import { dropdownClose, dropdownOpen } from "Store/Slices/DropDownSlice";
import CompanyProfileSetupModal from "Modals/CompanyProfileSetupModal/CompanyProfileSetupModal";
import AddEmployeesModal from "Modals/AddEmployeesModal/AddEmployeesModal";
import { useEffect } from "react";
import UseGetHook from "Hooks/UseGetHook";
import { closeDrawer } from "Store/Slices/SideDrawerSlice";
const SideDrawer = ({ landLord, property, dashboard }) => {
  // States start
  const dispatch = useDispatch();
  const dropdown = useSelector((state) => {
    return state.DropDown.openDropdownId;
  });
  const handleClickDropdown = (id) => {
    if (dropdown) {
      dispatch(dropdownClose());
    } else {
      dispatch(dropdownOpen(id));
    }
  };
  const drawer = useSelector((state) => {
    return state.sideDrawer.drawerState;
  });
  const openDrawerHandler = () => {
    console.log(drawer);
    dispatch(closeDrawer());
  };

  const [openModal, setOpenModal] = useState(false);
  const [openModalAddEmployees, setOpenModalAddEmployees] = useState(false);
  // Modal Function
  const onOpenModal = () => {
    setOpenModal(true);
  };
  const onCloseModal = () => {
    setOpenModal(false);
  };

  // Modal Function
  const onOpenModalAddEmployees = () => {
    setOpenModalAddEmployees(true);
  };
  const onCloseModalAddEmployees = () => {
    setOpenModalAddEmployees(false);
  };
  const config = require("Helpers/config.json");
  const navigate = useNavigate();
  const logOut = () => {
    fetch(`${config["baseUrl"]}/api/auth/logout`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.apiCallStatus === "success") {
          localStorage.clear();
          window.location = "/";
        } else {
          console.log(res);
        }
      })
      .catch((err) => console.log(err, "error"));
  };
  // Fetch Data
  const { FetchUser, user, FetchUserTenant } = UseGetHook("userinfo");
  useEffect(() => {
    if (localStorage.getItem("role") === "tenant") {
      FetchUserTenant();
    } else {
      FetchUser();
    }
  }, []);
  return (
    <>
      {openModal === true ? (
        <CompanyProfileSetupModal
          onOpen={onOpenModalAddEmployees}
          onClose={onCloseModal}
        />
      ) : (
        ""
      )}
      {openModalAddEmployees === true ? (
        <AddEmployeesModal onClose={onCloseModalAddEmployees} />
      ) : (
        ""
      )}
      <div className="side-drawer-container drawer-bg-primary">
        <div className="side-drawer-logo text-center my-4">
          <button
            onClick={openDrawerHandler}
            className={
              drawer === true
                ? "hamburger hamburger--elastic is-active position-absolute top-0 end-0"
                : "hamburger hamburger--elastic  position-absolute top-0 end-0"
            }
            type="button"
          >
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </button>
          <img src={Logo} alt="" style={{ width: "196px", height: "50px" }} />
        </div>
        {localStorage.getItem("role") === "landlord" ||
          localStorage.getItem("role") === "vendor" ||
          localStorage.getItem("role") === "serviceprovider" ? (
          <div className="">
            <button
              onClick={() => {
                navigate("/create-new");
              }}
              className="modal-save-btn w-75 mx-auto p-0"
            >
              {localStorage.getItem("role") === "serviceprovider"
                ? "Create New "
                : "Create new "}
            </button>
            {/* <div className='side-drawer-invite-tenant-right'><button
                                onClick={() => {
                                    if (localStorage.getItem("role") === 'serviceprovider') {
                                        onOpenModal()
                                    }
                                }}

                            >+</button></div> */}
          </div>
        ) : (
          <div className="complete-profile p-4">
            <ConfigProvider
              theme={{
                components: {
                  Progress: {
                    colorText: "#FFF",
                  },
                },
              }}
            >
              <Progress
                strokeColor="#EF6B3E"
                trailColor="#EAECF0"
                className="text-white"
                percent={60}
              />
            </ConfigProvider>
            <p className="text-white">Complete your Profile</p>
          </div>
        )}
        <div className="side-drawer-menu">
          <ul className="side-drawer-menu-list mb-3"></ul>
        </div>
        <div className="side-drawer-app mt-4">
          {localStorage.getItem("role") === "serviceprovider" ? (
            <ul className="side-drawer-app-list mb-3">
              <NavLink to="/dashboard">
                <li className="text-white d-flex align-items-center gap-3 mt-3 cursor list-menu">
                  {/* <img src={sideDrawerHome} alt="" /> */}
                  <svg
                    width={20}
                    height={20}
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M3 3h7v7H3z" />
                    <path d="M14 3h7v7h-7z" />
                    <path d="M14 14h7v7h-7z" />
                    <path d="M3 14h7v7H3z" />
                  </svg>
                  Dashboard
                </li>
              </NavLink>
              <div className="d-flex align-items-center ">
                <li
                  onClick={() => {
                    handleClickDropdown("task");
                  }}
                  className="flex-grow-1 text-white list-app mt-4"
                >
                  <img src={sideDrawerTasks} className="me-3 cursor" alt="" />
                  Maintenance
                </li>
                {/* <span
                                        
                                        className={dropdown === "task" ? "active-chevron mt-4 me-2 p-2 " : "chevron mt-4 me-2 p-2 "}>
                                        <svg width={21} height={21} fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="m6 9 6 6 6-6" />
                                        </svg>
                                    </span> */}
              </div>
              {dropdown === "task" && (
                <ul className="mt-3 list-app-dropdown-active ">
                  <NavLink to="/all-task">
                    {" "}
                    <li className="drawer-drop-down-text list-app cursor">
                      Tasks
                    </li>
                  </NavLink>
                  <NavLink to="/all-work-order">
                    {" "}
                    <li className="drawer-drop-down-text list-app cursor">
                      Work Orders
                    </li>
                  </NavLink>
                </ul>
              )}
              <>
                <div className="d-flex align-items-center ">
                  <li
                    onClick={() => {
                      handleClickDropdown("contact");
                    }}
                    className="text-white list-app mt-4 flex-grow-1 me-2"
                  >
                    <img src={sideDrawerContact} className="me-3" alt="" />
                    Contacts
                  </li>
                  {/* <span
                                           
                                            className={dropdown === "contact" ? "active-chevron mt-4 me-2 p-2 " : "chevron mt-4 me-2 p-2 "}>
                                            <svg width={21} height={21} fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="m6 9 6 6 6-6" />
                                            </svg>
                                        </span> */}
                </div>
                {dropdown === "contact" && (
                  <ul className="mt-3 list-app-dropdown-active ">
                    <NavLink
                      to={
                        localStorage.getItem("role") === "serviceprovider"
                          ? "/costumer-queries"
                          : "/all-prospect"
                      }
                    >
                      <li className="mt-4 drawer-drop-down-text list-app  cursor">
                        Landlords
                      </li>
                    </NavLink>
                  </ul>
                )}
                <div className="d-flex align-items-center ">
                  <li
                    onClick={() => {
                      handleClickDropdown("document");
                    }}
                    className="text-white flex-grow-1 list-app mt-4"
                  >
                    <img src={sideDrawerDocument} className="me-3" alt="" />
                    Documentation
                  </li>
                  {/* <span
                                           
                                            className={dropdown === "document" ? "active-chevron mt-4 me-2 p-2 " : "chevron mt-4 me-2 p-2 "}>
                                            <svg width={21} height={21} fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="m6 9 6 6 6-6" />
                                            </svg>
                                        </span> */}
                </div>
                {dropdown === "document" && (
                  <ul className="mt-3 list-app-dropdown-active ">
                    <NavLink to="/all-reports">
                      {" "}
                      <li className="mt-4 drawer-drop-down-text list-app  cursor">
                        Reports
                      </li>
                    </NavLink>
                    <NavLink to="/all-files">
                      {" "}
                      <li className="mt-4 drawer-drop-down-text list-app cursor">
                        Files{" "}
                      </li>
                    </NavLink>
                  </ul>
                )}
                <NavLink
                  onClick={() => {
                    if (dropdown) {
                      dispatch(dropdownClose());
                    }
                  }}
                  to="/user-chat"
                >
                  <li className="text-white d-flex align-items-center gap-3 mt-3 cursor list-app">
                    <img src={sideDrawerChat} alt="" />
                    Chat
                  </li>
                </NavLink>
                <div
                  className={
                    dropdown === "contact" ||
                      dropdown === "document" ||
                      dropdown === "task"
                      ? "mb-6 d-flex align-items-center "
                      : " d-flex align-items-center "
                  }
                >
                  <NavLink className="flex-grow-1" to="/accounting">
                    <li className="text-white  list-app mt-4">
                      <img src={sideDrawerTasks} className="me-3" alt="" />
                      Accounting
                    </li>
                  </NavLink>
                </div>
              </>
            </ul>
          ) : (
            <ul className="side-drawer-app-list mb-3">
              {localStorage.getItem("role") === "landlord" ? (
                <>
                  <NavLink to="/dashboard">
                    <li className="text-white d-flex align-items-center gap-3 mt-3 cursor list-menu">
                      {/* <img src={sideDrawerHome} alt="" /> */}
                      <svg
                        width={20}
                        height={20}
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M3 3h7v7H3z" />
                        <path d="M14 3h7v7h-7z" />
                        <path d="M14 14h7v7h-7z" />
                        <path d="M3 14h7v7H3z" />
                      </svg>
                      Dashboard
                    </li>
                  </NavLink>
                  <NavLink
                    onClick={() => {
                      if (dropdown) {
                        dispatch(dropdownClose());
                      }
                    }}
                    to="/properties-dashboard"
                  >
                    <li className="text-white d-flex align-items-center gap-3 mt-4 cursor list-app">
                      <img src={sideDrawerHome} alt="" />
                      Properties
                    </li>
                  </NavLink>
                  <div className="d-flex align-items-center ">
                    <NavLink to="/maintenance" className="flex-grow-1">
                      <li
                        onClick={() => {
                          handleClickDropdown("task");
                        }}
                        className="flex-grow-1 text-white list-app mt-4"
                      >
                        <img
                          src={sideDrawerTasks}
                          className="me-3 cursor"
                          alt=""
                        />
                        Maintenance
                      </li>
                    </NavLink>
                    {/* <span

                                                    className={dropdown === "task" ? "active-chevron mt-4 me-2 p-2 " : "chevron mt-4 me-2 p-2 "}>
                                                    <svg width={21} height={21} fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="m6 9 6 6 6-6" />
                                                    </svg>
                                                </span> */}
                  </div>
                  {dropdown === "task" && (
                    <ul className="mt-3 list-app-dropdown-active ">
                      <NavLink className="" to="/all-task">
                        {" "}
                        <li className="text-white list-app mt-4">Tasks</li>
                      </NavLink>
                      <NavLink to="/all-work-order">
                        {" "}
                        <li className="drawer-drop-down-text list-app cursor">
                          Work Orders
                        </li>
                      </NavLink>
                    </ul>
                  )}
                </>
              ) : localStorage.getItem("role") === "tenant" ? (
                <>
                  <NavLink to="/dashboard">
                    <li className="text-white d-flex align-items-center gap-3 mt-3 cursor list-menu">
                      {/* <img src={sideDrawerHome} alt="" /> */}
                      <svg
                        width={20}
                        height={20}
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M3 3h7v7H3z" />
                        <path d="M14 3h7v7h-7z" />
                        <path d="M14 14h7v7h-7z" />
                        <path d="M3 14h7v7H3z" />
                      </svg>
                      Dashboard
                    </li>
                  </NavLink>
                  <NavLink
                    onClick={() => {
                      if (dropdown) {
                        dispatch(dropdownClose());
                      }
                    }}
                    to="/tenant-properties"
                  >
                    <li className="text-white d-flex align-items-center gap-3 mt-4 cursor list-app">
                      <img src={sideDrawerHome} alt="" />
                      Properties
                    </li>
                  </NavLink>
                  <NavLink to="/all-task">
                    {" "}
                    <li className="text-white list-app mt-4">
                      <img
                        src={sideDrawerTasks}
                        className="me-3 cursor"
                        alt=""
                      />
                      Tasks
                    </li>
                  </NavLink>
                  <NavLink to="/payment">
                    <li className="text-white d-flex align-items-center list-app gap-3 mt-4 cursor">
                      <img
                        src={sideDrawerPayable}
                        className="payable-icon"
                        alt=""
                      />
                      Payments
                    </li>
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink to="/all-task">
                    {" "}
                    <li className="text-white list-app mt-4">Tasks</li>
                  </NavLink>
                </>
              )}
              {localStorage.getItem("role") === "landlord" ? (
                <>
                  <div className="d-flex align-items-center ">
                    <NavLink
                      onClick={() => {
                        handleClickDropdown("contact");
                      }}
                      className="flex-grow-1"
                      to="/contacts"
                    >
                      <li className="text-white list-app mt-4 flex-grow-1 ">
                        <img src={sideDrawerContact} className="me-3" alt="" />
                        Contacts
                      </li>
                    </NavLink>
                    {/* <span
                                                    className={dropdown === "contact" ? "active-chevron mt-4 me-2 p-2 " : "chevron mt-4 me-2 p-2 "}>
                                                    <svg width={21} height={21} fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="m6 9 6 6 6-6" />
                                                    </svg>
                                                </span> */}
                  </div>
                  {dropdown === "contact" && (
                    <ul className="mt-3 list-app-dropdown-active ">
                      <NavLink to="/all-prospect">
                        <li className="mt-4 drawer-drop-down-text list-app  cursor">
                          Prospects
                        </li>
                      </NavLink>
                      <NavLink to="/all-tenants">
                        <li className="mt-4 drawer-drop-down-text list-app  cursor">
                          Tenants{" "}
                        </li>
                      </NavLink>
                      <NavLink to="/all-vendor">
                        <li className="mt-4 drawer-drop-down-text list-app cursor">
                          Vendors
                        </li>
                      </NavLink>
                      <NavLink to="/all-service-professional">
                        <li className="mt-4 drawer-drop-down-text list-app cursor">
                          Service Professional
                        </li>
                      </NavLink>
                    </ul>
                  )}
                  { }

                  <div className="d-flex align-items-center ">
                    <NavLink to="/documentation" className={"flex-grow-1"}>
                      <li
                        onClick={() => {
                          handleClickDropdown("document");
                        }}
                        className="text-white flex-grow-1 list-app mt-4"
                      >
                        <img src={sideDrawerDocument} className="me-3" alt="" />
                        Documentation
                      </li>
                    </NavLink>
                    {/* <span
                                                   
                                                    className={dropdown === "document" ? "active-chevron mt-4 me-2 p-2 " : "chevron mt-4 me-2 p-2 "}>
                                                    <svg width={21} height={21} fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="m6 9 6 6 6-6" />
                                                    </svg>
                                                </span> */}
                  </div>
                  {dropdown === "document" && (
                    <ul className="mt-3 list-app-dropdown-active ">
                      <NavLink to="/all-reports">
                        {" "}
                        <li className="mt-4 drawer-drop-down-text list-app  cursor">
                          Reports
                        </li>
                      </NavLink>
                      <NavLink to="/all-files">
                        {" "}
                        <li className="mt-4 drawer-drop-down-text list-app cursor">
                          Files{" "}
                        </li>
                      </NavLink>
                      <NavLink to="/all-lease">
                        {" "}
                        <li className="mt-4 drawer-drop-down-text list-app  cursor">
                          Leases
                        </li>
                      </NavLink>
                    </ul>
                  )}

                  <NavLink
                    onClick={() => {
                      if (dropdown) {
                        dispatch(dropdownClose());
                      }
                    }}
                    to="/user-chat"
                  >
                    <li className="text-white d-flex align-items-center gap-3 mt-3 cursor list-app">
                      <img src={sideDrawerChat} alt="" />
                      Chat
                    </li>
                  </NavLink>
                  <div
                    className={
                      dropdown === "contact" ||
                        dropdown === "document" ||
                        dropdown === "task"
                        ? "mb-6 d-flex align-items-center "
                        : " d-flex align-items-center "
                    }
                  >
                    <NavLink className="flex-grow-1" to="/accounting">
                      <li
                        onClick={() => {
                          handleClickDropdown("account");
                        }}
                        className="text-white  list-app mt-4"
                      >
                        <img src={sideDrawerTasks} className="me-3" alt="" />
                        Accounting
                      </li>
                    </NavLink>
                    {/*<span
                                                    onClick={() => {
                                                        handleClickDropdown("account")
                                                    }}
                                                    className={dropdown === "account" ? "active-chevron mt-4 me-2 p-2 " : "chevron mt-4 me-2 p-2 "}>
                                                    <svg width={21} height={21} fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="m6 9 6 6 6-6" />
                                                    </svg>
                                                </span>*/}
                  </div>
                  {dropdown === "account" && (
                    <ul className="mt-3 list-app-dropdown-active ">
                      <NavLink to="/all-accounts">
                        {" "}
                        <li className="mt-4 drawer-drop-down-text list-app cursor">
                          Accounting
                        </li>
                      </NavLink>
                      <NavLink to="/mileage">
                        {" "}
                        <li className="mt-4 drawer-drop-down-text list-app cursor">
                          Mileage
                        </li>
                      </NavLink>
                      <NavLink to="/payment">
                        <li className="drawer-drop-down-text d-flex align-items-center list-app gap-3 mt-4 cursor">
                          Payments
                        </li>
                      </NavLink>
                    </ul>
                  )}
                </>
              ) : localStorage.getItem("role") === "tenant" ? (
                <>
                  <NavLink to="/user-chat">
                    <li className="text-white d-flex align-items-center gap-3 mt-3 cursor list-app">
                      <img src={sideDrawerChat} alt="" />
                      Chat
                    </li>
                  </NavLink>
                  {/* <NavLink to='/property-search'><li className='text-white d-flex align-items-center gap-3 mt-3 cursor list-app'><img src={sideDrawerProperty} alt="" />Property Search</li></NavLink> */}
                  <NavLink to="/tenant-passport">
                    <li className="text-white d-flex align-items-center gap-3 mt-3 cursor list-app">
                      <img src={sideDrawerPassport} alt="" />
                      Tenant Passport
                    </li>
                  </NavLink>
                </>
              ) : (
                <NavLink to="/user-chat">
                  <li className="text-white d-flex align-items-center gap-3 mt-3 cursor list-app">
                    <img src={sideDrawerChat} alt="" />
                    Chat
                  </li>
                </NavLink>
              )}
            </ul>
          )}
        </div>
        <div
          className={
            dashboard
              ? "log-out-dashboard-container-dashboard primary-bg d-flex gap-2 position-absolute"
              : "log-out-dashboard-container-dashboard primary-bg d-flex gap-2"
          }
        >
          <div className="log-out-dashboard-img mt-2" style={{ display: 'flex', alignItems: 'center' }}>
            {user[0]?.profileImage ? (
              <img
                className="profile-img-sidebar"
                src={`${user[0]?.profileImage}`}
                alt=""
              />
            ) : (
              <Avatar
              style={{
                backgroundColor: "#ef6b3e",
                verticalAlign: "middle",
                border:'2px solid #fff'
              }}
              size="large"
            >
              {user[0]?.firstName[0].toUpperCase()}
            </Avatar>
            )}
          </div>
          <div className="log-out-dashboard-text mt-2">
            <span className="text-white">{user[0]?.firstName}</span>
            <Link to="/settings/personal-info">
              <p className="text-white" style={{ marginBottom: '5px' }}>
                {" "}
                <img src={settingIcon} alt="" /> Setting
              </p>
            </Link>
          </div>
          <div className="ms-2 log-out-dashboard-button border-start d-flex justify-content-center align-items-center">
            <span
              onClick={() => {
                // logOut()
                localStorage.clear();
                window.location = "/";
              }}
              className="ms-4 cursor"
            >
              <img src={logOutIcon} alt="" />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideDrawer;
