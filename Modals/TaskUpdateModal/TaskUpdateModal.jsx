import React, { useState } from "react";
import { Select, ConfigProvider, DatePicker } from "antd";
import chevronIconDown from "assets/chevron-down.png";
import calendarIcon from "assets/calendar-icon.png";

const TaskUpdateModal = () => {
  // select box icon
  let dropdownIcon;
  dropdownIcon = (
    <>
      <img src={chevronIconDown} alt="" />
    </>
  );
  // select date icon
  let dateIcon;
  dateIcon = (
    <>
      <img src={calendarIcon} alt="" />
    </>
  );

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  return (
    <>
      <div className="payment-modal-container">
        <div className="payment-method-modal property-details-view-task-modal">
          <div className="modal-heading d-flex justify-content-between align-items-center p-41 pt-20 property-details-view-add-task-modal-heading-main">
            <h1>Task Update</h1>
            <button onClick={onClose} className="modal-cancel-btn">
              <svg
                width={18}
                height={18}
                fill="#667085"
                stroke="#667085"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
          <div className="modal-content-main-section p-41">
            <div className="row mt-3">
              <div className="col-md-12">
                <span>Description</span>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="4"
                  className="form-control"
                  placeholder="Add description"
                ></textarea>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <span>
                  Due Date<span className="sign-up-imp-star">*</span>
                </span>
                <ConfigProvider
                  theme={{
                    components: {
                      DatePicker: {
                        zIndexPopup: 99999,
                        fontFamily: "Montserrat",
                        fontSize: 16,
                        colorText: "#667085",
                        colorTextPlaceholder: "#667085",
                        colorPrimaryHover: "#EF6B3E",
                        borderRadius: 4,
                        colorPrimary: "#EF6B3E",
                      },
                    },
                  }}
                >
                  <DatePicker
                    suffixIcon={dateIcon}
                    style={{
                      width: "100%",
                      height: 45,
                    }}
                    onChange={onChange}
                    placeholder="Select Date"
                  />
                </ConfigProvider>
              </div>
              <div className="col-md-6">
                <span>Priority</span>
                <ConfigProvider
                  theme={{
                    components: {
                      Select: {
                        zIndexPopupBase: 99999,
                        colorText: "#667085",
                        colorTextPlaceholder: "#667085",
                        fontFamily: "Montserrat",
                        fontSize: 16,
                        colorPrimaryHover: "#EF6B3E",
                        optionSelectedBg: "rgba(239, 107, 62, 0.16)",
                        borderRadius: 4,
                      },
                    },
                  }}
                >
                  <Select
                    suffixIcon={dropdownIcon}
                    placeholder="Select Priority"
                    style={{
                      width: "100%",
                      height: 45,
                    }}
                    onChange={handleChange}
                    options={[
                      {
                        value: "High",
                        label: "High",
                      },
                      {
                        value: "Medium",
                        label: "Medium",
                      },
                      {
                        value: "Low",
                        label: "Low",
                      },
                    ]}
                  />
                </ConfigProvider>
              </div>
            </div>
          </div>
          <div className="modal-content-footer-section-scroll p-custom-post-update">
            <div className="row mt-3">
              <div className="col-md-12 d-flex justify-content-end">
                <div className="post-update-btn">
                  <button
                    onClick={() => {
                      onClose();
                      
                    }}
                    className="modal-post-update-btn"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskUpdateModal;
