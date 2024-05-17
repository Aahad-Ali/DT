import React from "react";
import searchIcon from "assets/New icons (7).png";
import userOneImage from "assets/Ellipse 35.png";
import userTwoImage from "assets/Ellipse 34.png";
import userThreeImage from "assets/Ellipse 34 (1).png";
import userFourImage from "assets/Ellipse 34 (2).png";

const Notification = () => {
  return (
    <>
      <div className="container-fluid bg-white p-3">
        <div className="row m-b-50">
          <div className="col-md-12">
            <div className="search-bar mt-4">
              <form>
                <div className="input-icon">
                  <span className="input-icon-addon">
                    <img src={searchIcon} alt="" className="icon" />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="notification-ui_dd-content">
              <p className="notification-main-title">Today</p>
              <div className="notification-list">
                <div className="notification-list_content">
                  <div className="notification-list_img">
                    <img src={userOneImage} alt="user" />
                  </div>
                  <div className="notification-list_detail d-flex flex-column justify-content-center">
                    <p className="notification-user-name">Carmen Parksouth</p>
                    <p className="notification-user-title">
                      Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                      sed diam nonummy nibh euismod tincidunt.
                    </p>
                  </div>
                </div>
                <div className="notification-list_time">
                  <p className="notification-time-text">7:30 AM</p>
                </div>
              </div>
              <div className="notification-list m-b-50">
                <div className="notification-list_content">
                  <div className="notification-list_img">
                    <img src={userTwoImage} alt="user" />
                  </div>
                  <div className="notification-list_detail d-flex flex-column justify-content-center">
                    <p className="notification-user-name">Heidi Turner</p>
                    <p className="notification-user-title">
                      Lorem ipsum dolor sit amet, consectetuer adipiscing eli.
                    </p>
                  </div>
                </div>
                <div className="notification-list_time">
                  <p className="notification-time-text">3:00 PM</p>
                </div>
              </div>
              <p className="notification-sub-title">Mon 22 May 23</p>
              <div className="notification-list">
                <div className="notification-list_content">
                  <div className="notification-list_img">
                    <img src={userThreeImage} alt="user" />
                  </div>
                  <div className="notification-list_detail d-flex flex-column justify-content-center">
                    <p className="notification-user-name">Emilly Walker</p>
                    <p className="notification-user-title">
                      Lorem ipsum dolor sit amet, consectetuer adipiscing eli.
                      Explore the origins, history amous passage
                    </p>
                  </div>
                </div>
                <div className="notification-list_time">
                  <p className="notification-time-text">3:00 PM</p>
                </div>
              </div>
              <div className="notification-list m-b-50">
                <div className="notification-list_content">
                  <div className="notification-list_img">
                    <img src={userFourImage} alt="user" />
                  </div>
                  <div className="notification-list_detail d-flex flex-column justify-content-center">
                    <p className="notification-user-name">Robert Joe</p>
                    <p className="notification-user-title">
                      Lorem ipsum dolor sit amet, consectetuer adipiscing eli.
                    </p>
                  </div>
                </div>
                <div className="notification-list_time">
                  <p className="notification-time-text">3:00 PM</p>
                </div>
              </div>
              <p className="notification-sub-title">Mon 20 May 23</p>
              <div className="notification-list">
                <div className="notification-list_content">
                  <div className="notification-list_img">
                    <img src={userThreeImage} alt="user" />
                  </div>
                  <div className="notification-list_detail d-flex flex-column justify-content-center">
                    <p className="notification-user-name">Emilly Walker</p>
                    <p className="notification-user-title">
                      Lorem ipsum dolor sit amet, consectetuer adipiscing eli.
                    </p>
                  </div>
                </div>
                <div className="notification-list_time">
                  <p className="notification-time-text">12:00 AM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notification;
