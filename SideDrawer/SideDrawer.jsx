import { useState } from "react";
import Logo from "assets/digitaltenant__CV-3.webp";
import sideDrawerHome from "assets/home.png";
import sideDrawerTasks from "assets/drawer-file-check-02.png";
import sideDrawerContact from "assets/drawer-user-circle.png";
import sideDrawerDocument from "assets/folders.png";
import sideDrawerChat from "assets/drawer--chat-icon.png";
import sideDrawerPassport from "assets/side-drawer-globe.png";
import sideDrawerPayable from "assets/drawer-payable-icon.png";
import settingIcon from "assets/settings.png";
import SettignUserIcon from "assets/user.svg";
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
import UserPermission from "libs/UserPermission";
const SideDrawer = ({ landLord, property, dashboard }) => {
  // States start

  const [openModal, setOpenModal] = useState(false);
  const [openModalAddEmployees, setOpenModalAddEmployees] = useState(false);

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
  useEffect(() => {
    localStorage.getItem("role") === "serviceprovider"
      ? setOpenModal(true)
      : setOpenModal(false);
  }, []);
  const config = require("Helpers/config.json");
  const navigate = useNavigate();
  const Logout = () => {
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
  const { FetchUser, user, FetchUserTenant, FetchUserLandlordUser } = UseGetHook("userinfo");
  const { FetchUserRole, role, ROLE } = UserPermission()
  useEffect(() => {
    if (localStorage.getItem("role") === "tenant") {
      FetchUserTenant();
    } else if (localStorage.getItem("role") === "landlord") {
      // console.log('landlord')
      FetchUser();
      FetchUserRole()
    }
    else {
      console.log('user')
      FetchUserLandlordUser()
      FetchUserRole()
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
      <div className="side-drawer-container1 drawer-bg-primary">
        <div className="side-drawer-logo text-center my-4">
          <img src={Logo} alt="" style={{ width: "196px", height: "50px" }} />
        </div>
        {localStorage.getItem("role") === "landlord" ||
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
        <div className="side-drawer-app mt-1">
          {localStorage.getItem("role") === "serviceprovider" ? (
            <ul className="side-drawer-app-list mb-3">
              <NavLink to="/dashboard">
                <li className="text-white d-flex align-items-center gap-3 mt-3 cursor list-menu">
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
                  className="flex-grow-1 text-white list-app mt-3"
                >
                  <img src={sideDrawerTasks} className="me-3 cursor" alt="" />
                  Maintenance
                </li>
              </div>
              {dropdown === "task" && (
                <ul className="mt-3 list-app-dropdown-active ">
                  <NavLink to="/all-task">
                    {" "}
                    <li className="drawer-drop-down-text list-app cursor ms-3">
                      Tasks
                    </li>
                  </NavLink>
                  <NavLink to="/all-work-order">
                    {" "}
                    <li className="drawer-drop-down-text list-app cursor ms-3">
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
                    className="text-white list-app mt-3 flex-grow-1 me-2"
                  >
                    <img src={sideDrawerContact} className="me-3" alt="" />
                    Contacts
                  </li>
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
                      <li className="mt-1 drawer-drop-down-text list-app  cursor ms-3">
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
                    className="text-white flex-grow-1 list-app mt-3"
                  >
                    <img src={sideDrawerDocument} className="me-3" alt="" />
                    Documentation
                  </li>
                </div>
                {dropdown === "document" && (
                  <ul className="mt-3 list-app-dropdown-active ">
                    <NavLink to="/all-reports/property-reports">
                      {" "}
                      <li className="mt-1 drawer-drop-down-text list-app  cursor ms-3">
                        Reports
                      </li>
                    </NavLink>
                    <NavLink to="/all-files">
                      {" "}
                      <li className="mt-1 drawer-drop-down-text list-app cursor ms-3">
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
                  <li className="text-white d-flex align-items-center gap-3 cursor list-app mt-3">
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
                    <li className="text-white  list-app mt-1">
                      <img src={sideDrawerTasks} className="me-3" alt="" />
                      Accounting
                    </li>
                  </NavLink>
                </div>
              </>
            </ul>
          ) : (
            <ul className="side-drawer-app-list mb-3">
              {

                localStorage.getItem("role") === "landlord" || localStorage.getItem("role") === "user" ? (

                  <>
                    <NavLink to="/dashboard">
                      <li className="text-white d-flex align-items-center gap-3 mt-3 cursor list-menu">
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
                    {
                      localStorage.getItem("role") !== "landlord" && localStorage.getItem("role") === "user" && ROLE[0]?.properties.view ?
                        <NavLink
                          onClick={() => {
                            if (dropdown) {
                              dispatch(dropdownClose());
                            }
                          }}
                          to="/properties-dashboard"
                        >
                          <li className="text-white d-flex align-items-center gap-3 mt-3 cursor list-app">
                            <img src={sideDrawerHome} alt="" />
                            Properties
                          </li>
                        </NavLink>
                        :
                        localStorage.getItem("role") === "landlord" ?
                          <NavLink
                            onClick={() => {
                              if (dropdown) {
                                dispatch(dropdownClose());
                              }
                            }}
                            to="/properties-dashboard"
                          >
                            <li className="text-white d-flex align-items-center gap-3 mt-3 cursor list-app">
                              <img src={sideDrawerHome} alt="" />
                              Properties
                            </li>
                          </NavLink>
                          : ""
                    }


                  </>
                ) : localStorage.getItem("role") === "tenant" ? (
                  <>
                    <NavLink to="/dashboard">
                      <li className="text-white d-flex align-items-center gap-3 mt-3 cursor list-menu">
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
                      <li className="text-white d-flex align-items-center gap-3 mt-3 cursor list-app">
                        <img src={sideDrawerHome} alt="" />
                        Properties
                      </li>
                    </NavLink>
                    <NavLink to="/all-task">
                      {" "}
                      <li className="text-white list-app mt-1 ms-3">
                        <img
                          src={sideDrawerTasks}
                          className="me-3 cursor"
                          alt=""
                        />
                        Tasks
                      </li>
                    </NavLink>
                    <NavLink to="/tenant-passport">
                      <li className="text-white d-flex align-items-center gap-3 cursor list-app">
                        <img src={sideDrawerPassport} alt="" />
                        Tenant Passport
                      </li>
                    </NavLink>
                    <NavLink to="/payment">
                      <li className="text-white d-flex align-items-center list-app gap-3 mt-1 cursor">
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
                      <li className="text-white list-app mt-1 ms-3">Tasks</li>
                    </NavLink>
                  </>
                )}
              {localStorage.getItem("role") === "landlord" || localStorage.getItem("role") === "user" ? (
                <>
                  {
                    ((localStorage.getItem("role") !== "landlord" && localStorage.getItem("role") === "user") && (ROLE[0]?.prospects.view || ROLE[0]?.prospects.view || ROLE[0]?.prospects.view || ROLE[0]?.prospects.view)) ?
                      <>
                        <div className="d-flex align-items-center ">
                          <NavLink
                            onClick={() => {
                              handleClickDropdown("contact");
                            }}
                            className="flex-grow-1"
                            to="/contacts"
                          >
                            <li className="text-white list-app mt-3 flex-grow-1 ">
                              <img src={sideDrawerContact} className="me-3" alt="" />
                              Contacts
                            </li>
                          </NavLink>
                        </div>
                      </>
                      :
                      localStorage.getItem("role") === "landlord" ?
                        <>
                          <div className="d-flex align-items-center ">
                            <NavLink
                              onClick={() => {
                                handleClickDropdown("contact");
                              }}
                              className="flex-grow-1"
                              to="/contacts"
                            >
                              <li className="text-white list-app mt-3 flex-grow-1 ">
                                <img src={sideDrawerContact} className="me-3" alt="" />
                                Contacts
                              </li>
                            </NavLink>
                          </div>
                        </>
                        : ""
                  }
                  {dropdown === "contact" && (
                    <ul className="mt-3 list-app-dropdown-active ">
                      {
                        localStorage.getItem("role") !== "landlord" && localStorage.getItem("role") === "user" && ROLE[0]?.prospects.view ?
                          <>
                            <NavLink to="/all-prospect">
                              <li className="mt-1 drawer-drop-down-text list-app  cursor ms-3">
                                Prospects
                              </li>
                            </NavLink>
                          </>
                          :
                          localStorage.getItem("role") === "landlord" ?
                            <NavLink to="/all-prospect">
                              <li className="mt-1 drawer-drop-down-text list-app  cursor ms-3">
                                Prospects
                              </li>
                            </NavLink>
                            : ""
                      }
                      {
                        localStorage.getItem("role") !== "landlord" && localStorage.getItem("role") === "user" && ROLE[0]?.tenants.view ?
                          <>
                            <NavLink to="/all-tenants">
                              <li className="mt-1 drawer-drop-down-text list-app  cursor ms-3">
                                Tenants{" "}
                              </li>
                            </NavLink>
                          </>
                          :
                          localStorage.getItem("role") === "landlord" ?
                            <NavLink to="/all-tenants">
                              <li className="mt-1 drawer-drop-down-text list-app  cursor ms-3">
                                Tenants{" "}
                              </li>
                            </NavLink>
                            : ""
                      }
                      {
                        localStorage.getItem("role") !== "landlord" && localStorage.getItem("role") === "user" && ROLE[0]?.vendors?.view ?
                          <>
                            <NavLink to="/all-vendor">
                              <li className="mt-1 drawer-drop-down-text list-app cursor ms-3">
                                Vendors
                              </li>
                            </NavLink>
                          </>
                          :
                          localStorage.getItem("role") === "landlord" ?
                            <NavLink to="/all-vendor">
                              <li className="mt-1 drawer-drop-down-text list-app cursor ms-3">
                                Vendors
                              </li>
                            </NavLink>
                            : ""
                      }
                      {
                        localStorage.getItem("role") !== "landlord" && localStorage.getItem("role") === "user" && ROLE[0]?.service_professional?.view ?
                          <>
                            <NavLink to="/all-service-professional">
                              <li className="mt-1 drawer-drop-down-text list-app cursor ms-3">
                                Service Professional
                              </li>
                            </NavLink>
                          </>
                          :
                          localStorage.getItem("role") === "landlord" ?
                            <NavLink to="/all-service-professional">
                              <li className="mt-1 drawer-drop-down-text list-app cursor ms-3">
                                Service Professional
                              </li>
                            </NavLink>
                            : ""
                      }
                    </ul>
                  )}
                  {
                    ((localStorage.getItem("role") !== "landlord" && localStorage.getItem("role") === "user") && (ROLE[0]?.task.view || ROLE[0]?.workOrders.view)) ?
                      <>
                        <div className="d-flex align-items-center ">
                          <NavLink to="/maintenance" className="flex-grow-1">
                            <li
                              onClick={() => {
                                handleClickDropdown("task");
                              }}
                              className="flex-grow-1 text-white list-app mt-3"
                            >
                              <img
                                src={sideDrawerTasks}
                                className="me-3 cursor"
                                alt=""
                              />
                              Maintenance
                            </li>
                          </NavLink>
                        </div>
                      </>
                      :
                      localStorage.getItem("role") === "landlord" ?
                        <>
                          <div className="d-flex align-items-center ">
                            <NavLink to="/maintenance" className="flex-grow-1">
                              <li
                                onClick={() => {
                                  handleClickDropdown("task");
                                }}
                                className="flex-grow-1 text-white list-app mt-3"
                              >
                                <img
                                  src={sideDrawerTasks}
                                  className="me-3 cursor"
                                  alt=""
                                />
                                Maintenance
                              </li>
                            </NavLink>
                          </div>
                        </>
                        : ""
                  }
                  {dropdown === "task" && (
                    <ul className="mt-3 list-app-dropdown-active ">
                      {
                        localStorage.getItem("role") !== "landlord" && localStorage.getItem("role") === "user" && ROLE[0]?.task.view ?
                          <>
                            <NavLink className="" to="/all-task">
                              {" "}
                              <li className="text-white list-app mt-1 ms-3">Tasks</li>
                            </NavLink>
                          </>
                          :
                          localStorage.getItem("role") === "landlord" ?
                            <NavLink className="" to="/all-task">
                              {" "}
                              <li className="text-white list-app mt-1 ms-3">Tasks</li>
                            </NavLink>
                            : ""
                      }
                      {
                        localStorage.getItem("role") !== "landlord" && localStorage.getItem("role") === "user" && ROLE[0]?.workOrders.view ?
                          <>
                            <NavLink to="/all-work-order">
                              {" "}
                              <li className="drawer-drop-down-text list-app cursor ms-3">
                                Work Orders
                              </li>
                            </NavLink>
                          </>
                          :
                          localStorage.getItem("role") === "landlord" ?
                            <NavLink to="/all-work-order">
                              {" "}
                              <li className="drawer-drop-down-text list-app cursor ms-3">
                                Work Orders
                              </li>
                            </NavLink>
                            : ""
                      }

                    </ul>
                  )}

                  <div className="">
                    <NavLink
                      onClick={() => {
                        if (dropdown) {
                          dispatch(dropdownClose());
                        }
                      }}
                      to="/user-chat"
                    >
                      <li className="text-white d-flex align-items-center gap-3 cursor list-app mt-3">
                        <img src={sideDrawerChat} alt="" />
                        Chat
                      </li>
                    </NavLink>
                  </div>
                  <div className="d-flex align-items-center ">
                    <NavLink to="/documentation" className={"flex-grow-1"}>
                      <li
                        onClick={() => {
                          handleClickDropdown("document");
                        }}
                        className="text-white flex-grow-1 list-app mt-3"
                      >
                        <img src={sideDrawerDocument} className="me-3" alt="" />
                        Documentation
                      </li>
                    </NavLink>
                  </div>
                  {dropdown === "document" && (
                    <ul className="mt-3 list-app-dropdown-active ">
                      {
                        localStorage.getItem("role") !== "landlord" && localStorage.getItem("role") === "user" && ROLE[0]?.LLreports.view ?
                          <NavLink to="/all-reports/property-reports">
                            {" "}
                            <li className="mt-1 drawer-drop-down-text list-app  cursor ms-3">
                              Reports
                            </li>
                          </NavLink>
                          :
                          localStorage.getItem("role") === "landlord" ?
                            <NavLink to="/all-reports/property-reports">
                              {" "}
                              <li className="mt-1 drawer-drop-down-text list-app  cursor ms-3">
                                Reports
                              </li>
                            </NavLink>
                            : ""

                      }
                      <NavLink to="/all-files">
                        {" "}
                        <li className="mt-1 drawer-drop-down-text list-app cursor ms-3">
                          Files{" "}
                        </li>
                      </NavLink>
                      {
                        localStorage.getItem("role") !== "landlord" && localStorage.getItem("role") === "user" && ROLE[0]?.leases.view ?
                          <NavLink to="/all-lease">
                            {" "}
                            <li className="mt-1 drawer-drop-down-text list-app  cursor ms-3">
                              Leases
                            </li>
                          </NavLink>
                          :
                          localStorage.getItem("role") === "landlord" ?
                            <NavLink to="/all-lease">
                              {" "}
                              <li className="mt-1 drawer-drop-down-text list-app  cursor ms-3">
                                Leases
                              </li>
                            </NavLink>
                            : ""
                      }
                    </ul>
                  )}


                  <div
                    className={
                      dropdown === "contact" ||
                        dropdown === "document" ||
                        dropdown === "task"
                        ? "mb-6 d-flex align-items-center "
                        : " d-flex align-items-center "
                    }
                  >
                    {
                      ((localStorage.getItem("role") !== "landlord" && localStorage.getItem("role") === "user") && (ROLE[0]?.accounting.view || ROLE[0]?.mileage.view || ROLE[0]?.invoicing.view)) ?
                        <>
                          <NavLink className="flex-grow-1" to="/accounting">
                            <li
                              onClick={() => {
                                handleClickDropdown("account");
                              }}
                              className="text-white  list-app mt-1"
                            >
                              <img src={sideDrawerTasks} className="me-3" alt="" />
                              Accounting
                            </li>
                          </NavLink>
                        </>
                        :
                        localStorage.getItem("role") === "landlord" ?
                          <>
                            <NavLink className="flex-grow-1" to="/accounting">
                              <li
                                onClick={() => {
                                  handleClickDropdown("account");
                                }}
                                className="text-white  list-app mt-1"
                              >
                                <img src={sideDrawerTasks} className="me-3" alt="" />
                                Accounting
                              </li>
                            </NavLink>
                          </>
                          : ""
                    }
                  </div>
                  {dropdown === "account" && (
                    <ul className="mt-3 list-app-dropdown-active ">
                      {
                        localStorage.getItem("role") !== "landlord" && localStorage.getItem("role") === "user" && ROLE[0]?.accounting.view ?
                          <>
                            <NavLink to="/all-accounts">
                              {" "}
                              <li className="mt-1 drawer-drop-down-text list-app cursor ms-3">
                                Accounting
                              </li>
                            </NavLink>
                          </>
                          :
                          localStorage.getItem("role") === "landlord" ?
                            <NavLink to="/all-accounts">
                              {" "}
                              <li className="mt-1 drawer-drop-down-text list-app cursor ms-3">
                                Accounting
                              </li>
                            </NavLink>
                            : ""
                      }
                      {
                        localStorage.getItem("role") !== "landlord" && localStorage.getItem("role") === "user" && ROLE[0]?.mileage.view ?
                          <>
                            <NavLink to="/mileage">
                              {" "}
                              <li className="mt-1 drawer-drop-down-text list-app cursor ms-3">
                                Mileage
                              </li>
                            </NavLink>
                          </>
                          :
                          localStorage.getItem("role") === "landlord" ?
                            <NavLink to="/mileage">
                              {" "}
                              <li className="mt-1 drawer-drop-down-text list-app cursor ms-3">
                                Mileage
                              </li>
                            </NavLink>
                            : ""
                      }
                      {
                        localStorage.getItem("role") !== "landlord" && localStorage.getItem("role") === "user" && ROLE[0]?.invoicing.view ?
                          <>
                            <NavLink to="/payment">
                              <li className="drawer-drop-down-text d-flex align-items-center list-app gap-3 mt-1 cursor mb-5 ms-3">
                                Payments
                              </li>
                            </NavLink>
                          </>
                          :
                          localStorage.getItem("role") === "landlord" ?
                            <NavLink to="/payment">
                              <li className="drawer-drop-down-text d-flex align-items-center list-app gap-3 mt-1 cursor mb-5 ms-3">
                                Payments
                              </li>
                            </NavLink>
                            : ""
                      }
                      {/* <NavLink to="/payment">
                        <li className="drawer-drop-down-text d-flex align-items-center list-app gap-3 mt-1 cursor mb-5">
                          Payments
                        </li>
                      </NavLink> */}
                    </ul>
                  )}
                </>
              ) : localStorage.getItem("role") === "tenant" ? (
                <>
                  <NavLink to="/user-chat">
                    <li className="text-white d-flex align-items-center gap-3 cursor list-app mt-3">
                      <img src={sideDrawerChat} alt="" />
                      Chat
                    </li>
                  </NavLink>
                </>
              ) : (
                <NavLink to="/user-chat">
                  <li className="text-white d-flex align-items-center gap-3 cursor list-app mt-3">
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
          <div className="log-out-dashboard-img mt-2" style={{ display: 'flex', alignItems: 'center' }} >
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
                  border: '2px solid #fff'
                }}
                size="large"
              >
                {user[0]?.firstName[0].toUpperCase()}
              </Avatar>
            )}
          </div>
          <div className="log-out-dashboard-text mt-2" >
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
                Logout()
              }}
              className="cursor"
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
