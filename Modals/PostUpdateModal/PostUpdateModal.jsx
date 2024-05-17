import React, { useState } from "react";
import { Select, ConfigProvider, message } from "antd";
import chevronIconDown from "assets/chevron-down.png";
import ModalLoader from "Components/GeneralComponents/ModalLoader";

const PostUpdateModal = ({ onOpen, onClose, id }) => {


  const [loader,setLoader]=useState(false)
  const [form, setForm] = useState({
    status: "",
    description: "",
  });
  // select box icon
  const handleForm = (formField, value) => {
    setForm((prev) => {
      return {
        ...prev,
        [formField]: value,
      };
    });
  };
  let dropdownIcon;
  dropdownIcon = (
    <>
      <img src={chevronIconDown} alt="" />
    </>
  );
  const [notifyTenantChecked, setNotifyTenantChecked] = useState(false);

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const config = require("Helpers/config.json");
  const UpdateTask = () => {
    fetch(`${config["baseUrl"]}/api/taskupdate/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        status: form.status,
        description: form.description,
        notifyTenant: notifyTenantChecked,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.apiCallStatus === "success") {
          message.success("Task updated successfully");
          setLoader(false);

        } else {
          message.success("Task Updated unsuccessfully");
          setLoader(false);

        }
      });
  };
  return (
    <>
      <div className="payment-modal-container">
        <div className="payment-method-modal property-details-view-task-modal">
          <div className="modal-heading d-flex justify-content-between align-items-center p-41 pt-20 property-details-view-add-task-modal-heading-main">
            <h1>Post Update</h1>
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
                  onChange={(e) => handleForm("description", e.target.value)}
                  name=""
                  id=""
                  cols="30"
                  rows="4"
                  className="form-control"
                ></textarea>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <span>
                  Status<span className="sign-up-imp-star">*</span>
                </span>
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
                    placeholder="Select Status"
                    style={{
                      width: "100%",
                      height: 45,
                    }}
                    onChange={(e) => handleForm("status", e)}
                    options={[
                      {
                        value: "In Progress",
                        label: "In Progress",
                      },
                      {
                        value: "Completed",
                        label: "Completed",
                      },
                      {
                        value: "Unassigned",
                        label: "Unassigned",
                      },
                    ]}
                  />
                </ConfigProvider>
              </div>
            </div>
          </div>
          <div className="modal-content-footer-section-scroll p-custom-post-update">
            <div className="row mt-3">
              <div className="col-md-12 d-flex justify-content-between">
                <div className="modal-check-box-container d-flex align-items-center">
                  <input
                    onChange={(e) => {
                      setNotifyTenantChecked(e.target.checked);
                    }}
                    type="checkbox"
                    name=""
                    id=""
                    checked={notifyTenantChecked}
                    className={notifyTenantChecked ? "checked ms-2" : "ms-2"}
                  />{" "}
                  <span className="ms-2">Notify Tenant</span>
                </div>
                <div className="post-update-btn">
                  <button
                    onClick={() => {
                      UpdateTask();
                      setLoader(true);

                    }}
                    className="modal-post-update-btn"
                  >
                    Post Update{loader && <ModalLoader />}

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

export default PostUpdateModal;
