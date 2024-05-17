import React, { useState } from "react";
import settingIcon from "assets/setting-icon.png";
import folderIcon from "assets/folder.png";
import globeIcon from "assets/globe.png";
import lockIcon from "assets/lock.png";
import monitorIcon from "assets/monitor-03.png";
import tagIcon from "assets/tag-03.png";
import userIcon from "assets/user-circle.png";
import userRoleIcon from "assets/user-03.png";
import walletIcon from "assets/wallet-02.png";
import { Link, Outlet } from "react-router-dom";
import UserPermission from "libs/UserPermission";
const Setting = () => {
  // States start
  const [personalInfoTab, setpersonalInfoTab] = useState(true);
  const [loginInfoTab, setloginInfoTab] = useState(false);
  const [companyInfoTab, setcompanyInfoTab] = useState(false);
  const [regionInfoTab, setregionInfoTab] = useState(false);
  const [userInfoTab, setuserInfoTab] = useState(false);
  const [userRoleInfoTab, setuserRoleInfoTab] = useState(false);
  const [subInfoTab, setsubInfoTab] = useState(false);
  const [paymentInfoTab, setpaymentInfoTab] = useState(false);
  const [portfolioInfoTab, setportfolioInfoTab] = useState(false);
  const [leadInfoTab, setleadInfoTab] = useState(false);
  const { ROLE } = UserPermission()
  // States end
  return (
    <>
      <div className="container-fluid bg-white ps-0 pe-3">
        <div className="setting-container d-md-none d-lg-flex d-none align-items-start gap-3">
          <div className="setting-navbar-main-container">
            {localStorage.getItem("role") === "landlord" || localStorage.getItem("role") === "user" ? (
              <>
                <Link className="text-dark" to="personal-info">
                  <div
                    onClick={() => {
                      setpersonalInfoTab(true);
                      setloginInfoTab(false);
                      setcompanyInfoTab(false);
                      setregionInfoTab(false);
                      setuserRoleInfoTab(false);
                      setsubInfoTab(false);
                      setpaymentInfoTab(false);
                      setportfolioInfoTab(false);
                      setleadInfoTab(false);
                      setuserInfoTab(false);
                    }}
                    className={
                      personalInfoTab === true
                        ? "active-setting-tab setting-navbar-container border-bottom border-end"
                        : "setting-navbar-container border-bottom border-end"
                    }
                  >
                    <div className="setting-navbar d-flex gap-3 ">
                      <div className="setting-navbar-img">
                        <img src={settingIcon} alt="" />
                      </div>
                      <div className="setting-navbar-text">
                        <p className="mb-0 setting-nav-heading">
                          Personal Information{" "}
                        </p>
                        <p>
                          Change your name, picture, phone, email, & mailing
                          address.{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>

                {
                  localStorage.getItem("role") !== "landlord" && localStorage.getItem("role") === "user" && ROLE[0]?.settings_changePassword?.view ?
                    <Link className="text-dark" to="login-info">
                      <div
                        className={
                          loginInfoTab === true
                            ? "active-setting-tab setting-navbar-container border-bottom border-end"
                            : "setting-navbar-container border-bottom border-end"
                        }
                      >
                        <div
                          onClick={() => {
                            setpersonalInfoTab(false);
                            setloginInfoTab(true);
                            setcompanyInfoTab(false);
                            setregionInfoTab(false);
                            setuserRoleInfoTab(false);
                            setsubInfoTab(false);
                            setpaymentInfoTab(false);
                            setportfolioInfoTab(false);
                            setleadInfoTab(false);
                            setuserInfoTab(false);
                          }}
                          className="setting-navbar d-flex gap-3 "
                        >
                          <div className="setting-navbar-img">
                            <img src={lockIcon} alt="" />
                          </div>
                          <div className="setting-navbar-text">
                            <p className="mb-0 setting-nav-heading">
                              Login & Password{" "}
                            </p>
                            <p>
                              Change your email or password, and allow technician
                              access.
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                    :
                    localStorage.getItem("role") === "landlord" ?
                      <Link className="text-dark" to="login-info">
                        <div
                          className={
                            loginInfoTab === true
                              ? "active-setting-tab setting-navbar-container border-bottom border-end"
                              : "setting-navbar-container border-bottom border-end"
                          }
                        >
                          <div
                            onClick={() => {
                              setpersonalInfoTab(false);
                              setloginInfoTab(true);
                              setcompanyInfoTab(false);
                              setregionInfoTab(false);
                              setuserRoleInfoTab(false);
                              setsubInfoTab(false);
                              setpaymentInfoTab(false);
                              setportfolioInfoTab(false);
                              setleadInfoTab(false);
                              setuserInfoTab(false);
                            }}
                            className="setting-navbar d-flex gap-3 "
                          >
                            <div className="setting-navbar-img">
                              <img src={lockIcon} alt="" />
                            </div>
                            <div className="setting-navbar-text">
                              <p className="mb-0 setting-nav-heading">
                                Login & Password{" "}
                              </p>
                              <p>
                                Change your email or password, and allow technician
                                access.
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                      : ""
                }

                <Link className="text-dark" to="company-info">
                  <div
                    className={
                      companyInfoTab === true
                        ? "active-setting-tab setting-navbar-container border-bottom border-end"
                        : "setting-navbar-container border-bottom border-end"
                    }
                  >
                    <div
                      onClick={() => {
                        setpersonalInfoTab(false);
                        setloginInfoTab(false);
                        setcompanyInfoTab(true);
                        setregionInfoTab(false);
                        setuserRoleInfoTab(false);
                        setsubInfoTab(false);
                        setpaymentInfoTab(false);
                        setportfolioInfoTab(false);
                        setleadInfoTab(false);
                        setuserInfoTab(false);
                      }}
                      className="setting-navbar d-flex gap-3 "
                    >
                      <div className="setting-navbar-img">
                        <img src={monitorIcon} alt="" />
                      </div>
                      <div className="setting-navbar-text">
                        <p className="mb-0 setting-nav-heading">
                          Company Information{" "}
                        </p>
                        <p>
                          Lorem Ipsum is a placeholder text used in the graphic,
                          print, and publishing industries.{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
                <Link className="text-dark" to="user-info">
                  <div
                    onClick={() => {
                      setpersonalInfoTab(false);
                      setuserInfoTab(true);
                      setloginInfoTab(false);
                      setcompanyInfoTab(false);
                      setregionInfoTab(false);
                      setuserRoleInfoTab(false);
                      setsubInfoTab(false);
                      setpaymentInfoTab(false);
                      setportfolioInfoTab(false);
                      setleadInfoTab(false);
                    }}
                    className={
                      userInfoTab === true
                        ? "active-setting-tab setting-navbar-container border-bottom border-end"
                        : "setting-navbar-container border-bottom border-end"
                    }
                  >
                    <div className="setting-navbar d-flex gap-3 ">
                      <div className="setting-navbar-img">
                        <img src={userIcon} alt="" />
                      </div>
                      <div className="setting-navbar-text">
                        <p className="mb-0 setting-nav-heading">User</p>
                        <p>Add or edit users</p>
                      </div>
                    </div>
                  </div>
                </Link>
                {
                  localStorage.getItem("role") !== "landlord" && localStorage.getItem("role") === "user" && ROLE[0]?.settings_ManageUsers?.view ?
                    <Link className="text-dark" to="user-role">
                      <div
                        onClick={() => {
                          setpersonalInfoTab(false);
                          setloginInfoTab(false);
                          setcompanyInfoTab(false);
                          setregionInfoTab(false);
                          setuserRoleInfoTab(true);
                          setsubInfoTab(false);
                          setpaymentInfoTab(false);
                          setportfolioInfoTab(false);
                          setleadInfoTab(false);
                          setuserInfoTab(false);
                        }}
                        className={
                          userRoleInfoTab === true
                            ? "active-setting-tab setting-navbar-container border-bottom border-end"
                            : "setting-navbar-container border-bottom border-end"
                        }
                      >
                        <div className="setting-navbar d-flex gap-3 ">
                          <div className="setting-navbar-img">
                            <img src={userRoleIcon} alt="" />
                          </div>
                          <div className="setting-navbar-text">
                            <p className="mb-0 setting-nav-heading">User Roles </p>
                            <p>
                              Allow or block access to features of DigitalTenant for
                              each user.
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                    :
                    localStorage.getItem("role") === "landlord" ?
                      <Link className="text-dark" to="user-role">
                        <div
                          onClick={() => {
                            setpersonalInfoTab(false);
                            setloginInfoTab(false);
                            setcompanyInfoTab(false);
                            setregionInfoTab(false);
                            setuserRoleInfoTab(true);
                            setsubInfoTab(false);
                            setpaymentInfoTab(false);
                            setportfolioInfoTab(false);
                            setleadInfoTab(false);
                            setuserInfoTab(false);
                          }}
                          className={
                            userRoleInfoTab === true
                              ? "active-setting-tab setting-navbar-container border-bottom border-end"
                              : "setting-navbar-container border-bottom border-end"
                          }
                        >
                          <div className="setting-navbar d-flex gap-3 ">
                            <div className="setting-navbar-img">
                              <img src={userRoleIcon} alt="" />
                            </div>
                            <div className="setting-navbar-text">
                              <p className="mb-0 setting-nav-heading">User Roles </p>
                              <p>
                                Allow or block access to features of DigitalTenant for
                                each user.
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                      : ""
                }

                {
                  localStorage.getItem("role") !== "landlord" && localStorage.getItem("role") === "user" && ROLE[0]?.settings_Subscription?.view ?
                    <Link className="text-dark" to="subscription">
                      <div
                        className={
                          subInfoTab === true
                            ? "active-setting-tab setting-navbar-container border-bottom border-end"
                            : "setting-navbar-container border-bottom border-end"
                        }
                      >
                        <div
                          onClick={() => {
                            setpersonalInfoTab(false);
                            setloginInfoTab(false);
                            setcompanyInfoTab(false);
                            setregionInfoTab(false);
                            setuserRoleInfoTab(false);
                            setsubInfoTab(true);
                            setpaymentInfoTab(false);
                            setportfolioInfoTab(false);
                            setleadInfoTab(false);
                            setuserInfoTab(false);
                          }}
                          className="setting-navbar d-flex gap-3 "
                        >
                          <div className="setting-navbar-img">
                            <img src={userIcon} alt="" />
                          </div>
                          <div className="setting-navbar-text">
                            <p className="mb-0 setting-nav-heading">
                              Subscription{" "}
                            </p>
                            <p>
                              Allow or block access to features of DigitalTenant for
                              each user.
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                    :
                    localStorage.getItem("role") === "landlord" ?
                      <Link className="text-dark" to="subscription">
                        <div
                          className={
                            subInfoTab === true
                              ? "active-setting-tab setting-navbar-container border-bottom border-end"
                              : "setting-navbar-container border-bottom border-end"
                          }
                        >
                          <div
                            onClick={() => {
                              setpersonalInfoTab(false);
                              setloginInfoTab(false);
                              setcompanyInfoTab(false);
                              setregionInfoTab(false);
                              setuserRoleInfoTab(false);
                              setsubInfoTab(true);
                              setpaymentInfoTab(false);
                              setportfolioInfoTab(false);
                              setleadInfoTab(false);
                              setuserInfoTab(false);
                            }}
                            className="setting-navbar d-flex gap-3 "
                          >
                            <div className="setting-navbar-img">
                              <img src={userIcon} alt="" />
                            </div>
                            <div className="setting-navbar-text">
                              <p className="mb-0 setting-nav-heading">
                                Subscription{" "}
                              </p>
                              <p>
                                Allow or block access to features of DigitalTenant for
                                each user.
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                      : ""
                }

              </>
            ) : (
              <>
                <Link className="text-dark" to="personal-info">
                  <div
                    onClick={() => {
                      setpersonalInfoTab(true);
                      setloginInfoTab(false);
                      setcompanyInfoTab(false);
                      setregionInfoTab(false);
                      setuserRoleInfoTab(false);
                      setsubInfoTab(false);
                      setpaymentInfoTab(false);
                      setportfolioInfoTab(false);
                      setleadInfoTab(false);
                      setuserInfoTab(false);
                    }}
                    className={
                      personalInfoTab === true
                        ? "active-setting-tab setting-navbar-container border-bottom border-end"
                        : "setting-navbar-container border-bottom border-end"
                    }
                  >
                    <div className="setting-navbar d-flex gap-3 ">
                      <div className="setting-navbar-img">
                        <img src={settingIcon} alt="" />
                      </div>
                      <div className="setting-navbar-text">
                        <p className="mb-0 setting-nav-heading">
                          Personal Information{" "}
                        </p>
                        <p>
                          Change your name, picture, phone, email, & mailing
                          address.{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
                <Link className="text-dark" to="login-info">
                  <div
                    className={
                      loginInfoTab === true
                        ? "active-setting-tab setting-navbar-container border-bottom border-end"
                        : "setting-navbar-container border-bottom border-end"
                    }
                  >
                    <div
                      onClick={() => {
                        setpersonalInfoTab(false);
                        setloginInfoTab(true);
                        setcompanyInfoTab(false);
                        setregionInfoTab(false);
                        setuserRoleInfoTab(false);
                        setsubInfoTab(false);
                        setpaymentInfoTab(false);
                        setportfolioInfoTab(false);
                        setleadInfoTab(false);
                        setuserInfoTab(false);
                      }}
                      className="setting-navbar d-flex gap-3 "
                    >
                      <div className="setting-navbar-img">
                        <img src={lockIcon} alt="" />
                      </div>
                      <div className="setting-navbar-text">
                        <p className="mb-0 setting-nav-heading">
                          Login & Password{" "}
                        </p>
                        <p>
                          Change your email or password, and allow technician
                          access.
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </>
            )}
          </div>
          <div className="setting-info-container flex-grow-1 mt-2">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Setting;
