import React, { useState } from "react";
import { ConfigProvider, Tabs } from "antd";
import settingIconOrange from "assets/dots-vertical.png";
import userImg from "assets/over-user-img.png";
import deleteIcon from "assets/trash-01.png";
import dollar from "assets/CurrencyDollar.png";
import { useNavigate } from "react-router-dom";
import inProgressIcon from "assets/task-details-progress.png";
import DueDateIcon from "assets/task-details-due.png";
import { Upload } from "antd";
import TerminateModal from "Modals/TerminateModal/TerminateModal";
const { Dragger } = Upload;
const { TabPane } = Tabs;

const ProfessionalDetails = () => {
  //States start
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  //States end

  const handleIconClickCustom = () => {
    // Toggle the dropdown state when the icon is clicked
    setDropdownOpen(!isDropdownOpen);
  };
  const onOpenModal = () => {
    setOpenModal(true);
  };
  const onCloseModal = () => {
    setOpenModal(false);
  };
  return (
    <>
      {openModal === true && <TerminateModal onClose={onCloseModal} />}
      <div className="container-fluid p-3">
        <ConfigProvider
          theme={{
            components: {
              Tabs: {
                inkBarColor: "#EF6B3E",
                itemColor: "#667085",
                itemSelectedColor: "#EF6B3E",
                itemHoverColor: "#EF6B3E",
                titleFontSize: 15,
                horizontalItemGutter: window.innerWidth <= 768 ? 10 : 60,
                fontFamily: "Montserrat",
              },
            },
          }}
        >
          <Tabs centered defaultActiveKey="1" style={{ fontWeight: 500 }}>
            <TabPane tab="Overview" key="1">
              <div className="global-setting-icon">
                <img
                  onClick={handleIconClickCustom}
                  src={settingIconOrange}
                  alt=""
                  className="cursor"
                />
                {isDropdownOpen && (
                  <div className="task-table-setting-dropdown-prospect bg-white box-shadow text-start">
                    <ul className="p-0 d-flex flex-column gap-3">
                      <li
                        onClick={onOpenModal}
                        className="list-style-none cursor lease-details-dropdown-icons"
                      >
                        {" "}
                        <img src={deleteIcon} alt="" /> Terminate
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              <div className="row mt-3">
                <div className="col-md-4">
                  <div className="task-overview-tab-boxes p-3 position-relative">
                    <div className="overview-box-img">
                      <img src={inProgressIcon} alt="" />
                    </div>
                    <div className="over-view-box-text text-start">
                      <span>Status</span>
                      <br />
                      <span className="status-active text-white mt-2">
                        Accepted
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="task-overview-tab-boxes p-3 position-relative">
                    <div className="overview-box-img">
                      <img src={DueDateIcon} alt="" />
                    </div>
                    <div className="over-view-box-text">
                      <span>Open work orders</span>
                      <br />
                      <span>21</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="task-overview-tab-boxes p-3 position-relative">
                    <div className="overview-box-img">
                      <img src={DueDateIcon} alt="" />
                    </div>
                    <div className="over-view-box-text">
                      <span>Charges</span>
                      <br />
                      <span>
                        <img src={dollar} alt="" />
                      </span>{" "}
                      <span>40-42 Hourly</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-md-10">
                  <div className="task-info-heading">
                    <h4>Service Professional info</h4>
                  </div>
                  <div className="task-info-lists mt-4">
                    <p>
                      <span className="task-info-list-span me-3">
                        Company Name:
                      </span>{" "}
                      Water Zone
                    </p>
                    <p>
                      <span className="task-info-list-span me-3">
                        Location:
                      </span>{" "}
                      Phoenix, Arizona(AZ), 85003
                    </p>
                    <p>
                      <span className="task-info-list-span me-3">
                        Phone No :
                      </span>{" "}
                      (051) 348 2940
                    </p>
                    <p>
                      <span className="task-info-list-span me-3">Email:</span>{" "}
                      Info@watezonecompany.com{" "}
                    </p>
                    <p>
                      <span className="task-info-list-span me-3">
                        Services:
                      </span>{" "}
                      Plumbing, Renovation
                    </p>
                    <p>
                      <span className="task-info-list-span me-3">
                        Description:
                      </span>
                      Experience peace of mind with our top-notch plumbing
                      service. At Water Zone, we take pride in providing
                      reliable and efficient plumbing solutions to meet all your
                      needs. Our team of skilled and licensed plumbers is
                      dedicated to ensuring your plumbing systems run smoothly.
                      From fixing leaks, repairing pipes, and unclogging drains
                      to installing new fixtures, we've got you covered. We're
                      available around the clock to handle emergency repairs and
                      guarantee a quick response time. Trust us to deliver
                      quality workmanship, honest pricing, and excellent
                      customer service. Your satisfaction is our priority, and
                      we're here to keep your water flowing and your plumbing
                      worries at bay. Contact us today for all your plumbing
                      needs.
                    </p>
                  </div>
                </div>
                <div className="col-md-2 text-end">
                  <img src={userImg} alt="" />
                </div>
              </div>
            </TabPane>
            <TabPane tab="Work Orders" key="2"></TabPane>
            <TabPane tab="Payments" key="3"></TabPane>
          </Tabs>
        </ConfigProvider>
      </div>
    </>
  );
};

export default ProfessionalDetails;
