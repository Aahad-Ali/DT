import React, { useState } from "react";
import notificationIcon from "assets/bell-01.png";
import helpIcon from "assets/Help icon.png";
import { useNavigate, Link, NavLink } from "react-router-dom";
import unread from "assets/unread-icon.jpg";
import user from "assets/notification-img.png";
import "../hamburgers/dist/hamburgers.css";
import { useDispatch, useSelector } from "react-redux";
import { openDrawer } from "Store/Slices/SideDrawerSlice";
const notifications = [
  {
    id: 1,
    name: "Carmen Parksouth",
    notification:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt.",
    unread: true,
    time: "7:30 AM",
  },
  {
    id: 2,
    name: "Heidi Turner",
    notification: "Lorem ipsum dolor sit amet, consectetuer adipiscing eli.",
    unread: false,
    time: "3:00 PM",
  },
  {
    id: 3,
    name: "Emilly Walker",
    notification:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing eli. Explore the origins, history amous passage",
    unread: false,
    time: "3:00 PM",
  },
  {
    id: 4,
    name: "Heidi Turner",
    notification: "Lorem ipsum dolor sit amet, consectetuer adipiscing eli.",
    unread: false,
    time: "3:00 PM",
  },
];
const TitleTopBar = ({ topBarTitle, topBarTitleDetail, back, vendorText }) => {
  // States
  const [notifyData, setNotifyData] = useState(notifications);
  const [notifyDropdown, setNotifyDropdown] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const drawer = useSelector((state) => {
    return state.sideDrawer.drawerState;
  });
  const openDrawerHandler = () => {
    dispatch(openDrawer());
  };
  // Functions
  const redirecting = () => {
    if (back) {
      navigate(`/${back}`);
    }
  };
  return (
    <>
      <div className="row">
        <div className="responsive-top-bar d-flex d-lg-flex d-md-flex d-xl-none justify-content-between align-items-center">
          <div className="burger-menu-container">
            <div className="burger-menu d-none">
              <button
                onClick={() => {
                  openDrawerHandler();
                }}
                className={
                  drawer === true
                    ? "hamburger hamburger--elastic is-active"
                    : "hamburger hamburger--elastic "
                }
                type="button"
              >
                <span className="hamburger-box">
                  <span className="hamburger-inner"></span>
                </span>
              </button>
            </div>
          </div>
          <div className="page-title-box">
            <div className="top-heading-h1 d-flex align-items-center gap-4">
              <h1 className="fw-bold top-bar-heading">
                {topBarTitleDetail && (
                  <span onClick={redirecting} className="me-2 cursor">
                    <svg
                      width={30}
                      height={30}
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                  </span>
                )}
                {topBarTitle}
                {topBarTitleDetail}
              </h1>
            </div>
          </div>
          <div className="notification-box-container">
            <div className="dashboard-right-top-header d-flex align-items-center gap-2">
              <span className="help-icon">
                <NavLink to="/help">
                  <img src={helpIcon} alt="" />
                </NavLink>
              </span>
              <div className="notify-icon me-3 position-relative cursor">
                <img
                  onClick={() => {
                    setNotifyDropdown(!notifyDropdown);
                  }}
                  src={notificationIcon}
                  alt=""
                />
                <div
                  className={
                    notifyDropdown === true
                      ? "notification-dropdown-show"
                      : "notification-dropdown"
                  }
                >
                  <div className="notification-dropdown-header d-flex justify-content-between align-items-center">
                    <p className="notification-left-heading">Notifications</p>
                    <p className="notification-right-heading">
                      {" "}
                      Mark all as read
                    </p>
                  </div>
                  <div className="notification-dropdown-second-header d-flex gap-3">
                    <p className="notification-left-second-heading">All</p>
                    <p className="notification-right-second-heading">
                      {" "}
                      Unread <span className="unread-count">01</span>{" "}
                    </p>
                  </div>
                  {notifyData.map((item, index) => {
                    return (
                      <div key={item.id}>
                        <div
                          className={
                            item.unread === true
                              ? "notification-box-unread mt-4 d-flex gap-1 position-relative"
                              : "notification-box mt-4 d-flex gap-1 position-relative"
                          }
                        >
                          <div className="notification-box-img d-flex gap-1">
                            {item.unread === true ? (
                              <img
                                src={unread}
                                alt=""
                                className="object-fit-contain "
                              />
                            ) : (
                              ""
                            )}{" "}
                            <img
                              className="object-fit-contain "
                              src={user}
                              alt=""
                            />
                          </div>
                          <div className="notification-box-text">
                            <p className="mb-0 notification-text-one">
                              {item.name}
                            </p>
                            <p className="mb-0 notification-text-second">
                              {item.notification}
                            </p>
                          </div>
                          <div
                            className="notification-box-time position-absolute top-0 "
                            style={{ right: "10px" }}
                          >
                            <span className="normal-grey-text">
                              {item.time}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div className="see-all-notification-box text-center border-top p-2">
                    <Link to="/notification" className="text-dark fw-bold td">
                      See All Notifications
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="top-heading-container d-md-none d-lg-none d-xl-flex d-none align-items-center justify-content-between">
          <div className="top-heading-h1  d-flex align-items-start flex-column">
            <h1 className="fw-bold top-bar-heading mb-0 mt-2">
              {topBarTitleDetail && (
                <span onClick={redirecting} className="me-2 cursor">
                  <svg
                    width={30}
                    height={30}
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </span>
              )}
              {topBarTitle}
              {topBarTitleDetail}
            </h1>
            <p className="fw-medium ">{vendorText}</p>
          </div>
          <div className="dashboard-right-top-header d-md-none d-lg-flex  d-none align-items-center gap-3">
            <span className="help-icon">
              <NavLink to="/help">
                <img src={helpIcon} alt="" />
              </NavLink>
            </span>
            <div className="notify-icon me-3 position-relative cursor">
              <img
                onClick={() => {
                  setNotifyDropdown(!notifyDropdown);
                }}
                src={notificationIcon}
                alt=""
              />
              <div
                className={
                  notifyDropdown === true
                    ? "notification-dropdown-show"
                    : "notification-dropdown"
                }
              >
                <div className="notification-dropdown-header d-flex justify-content-between align-items-center">
                  <p className="notification-left-heading">Notifications</p>
                  <p className="notification-right-heading">
                    {" "}
                    Mark all as read
                  </p>
                </div>
                <div className="notification-dropdown-second-header d-flex gap-3">
                  <p className="notification-left-second-heading">All</p>
                  <p className="notification-right-second-heading">
                    {" "}
                    Unread <span className="unread-count">01</span>{" "}
                  </p>
                </div>
                {notifyData.map((item, index) => {
                  return (
                    <div key={item.id}>
                      <div
                        className={
                          item.unread === true
                            ? "notification-box-unread mt-4 d-flex gap-1 position-relative"
                            : "notification-box mt-4 d-flex gap-1 position-relative"
                        }
                      >
                        <div className="notification-box-img d-flex gap-1">
                          {item.unread === true ? (
                            <img
                              src={unread}
                              alt=""
                              className="object-fit-contain "
                            />
                          ) : (
                            ""
                          )}{" "}
                          <img
                            className="object-fit-contain "
                            src={user}
                            alt=""
                          />
                        </div>
                        <div className="notification-box-text">
                          <p className="mb-0 notification-text-one">
                            {item.name}
                          </p>
                          <p className="mb-0 notification-text-second">
                            {item.notification}
                          </p>
                        </div>
                        <div
                          className="notification-box-time position-absolute top-0 "
                          style={{ right: "10px" }}
                        >
                          <span className="normal-grey-text">{item.time}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div className="see-all-notification-box text-center border-top p-2">
                  <Link to="/notification" className="text-dark fw-bold td">
                    See All Notifications
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TitleTopBar;
