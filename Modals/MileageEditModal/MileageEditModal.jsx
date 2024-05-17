import React, { useState, useEffect } from "react";
import { DatePicker, ConfigProvider, Space } from "antd";
import calendarIcon from "assets/calendar-icon.png";
import UseUrlParamsHook from "Hooks/UseUrlParamsHook";
import UseUpdateHook from "Hooks/UseUpdateHook";
import ModalLoader from "Components/GeneralComponents/ModalLoader";

const MileageEditModal = ({ onClose, id }) => {
  const [Data, setData] = useState([]);
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [miles, setMiles] = useState("");
  const [amount, setAmount] = useState("");
  const [loader, setLoader] = useState(false);

  let calendar;
  calendar = (
    <>
      <img src={calendarIcon} alt="" />
    </>
  );
  const dateFormat = "MM/DD/YYYY";

  // Get Mileages
  //   const { id } = UseUrlParamsHook();
  const config = require("Helpers/config.json");
  useEffect(() => {
    fetch(`${config["baseUrl"]}/api/mileage/${id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.apiCallStatus === "success") {
          const {
            fromLocation,
            toLocation,
            businessName,
            purpose,
            miles,
            amount,
          } = res.message;
          setFromLocation(fromLocation);
          setToLocation(toLocation);
          setBusinessName(businessName);
          setPurpose(purpose);
          setMiles(miles);
          setAmount(amount);

          let temp = [];
          temp = res.message;
          setData([temp]);
          console.log(Data, "success");
        } else {
          console.log(res, "error");
        }
      });
  }, []);

  const editMileage = () => {
    fetch(`${config["baseUrl"]}/api/mileage/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        fromLocation: fromLocation ? fromLocation : fromLocation,
        toLocation: toLocation ? toLocation : toLocation,
        businessName: businessName ? businessName : businessName,
        purpose: purpose ? purpose : purpose,
        miles: miles ? miles : miles,
        amount: amount ? amount : amount,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.apiCallStatus === "success") {
          onClose()
          setLoader(false)

          console.log(res, "Mileage Update");
        } else {
          console.log(res);
        }
      });
  };
  return (
    <>
      <div className="payment-modal-container">
        <div className="payment-method-modal property-details-view-task-modal">
          <div className="modal-heading d-flex justify-content-between align-items-center p-41 pt-20 property-details-view-add-task-modal-heading-main">
            <h1>Edit Mileage</h1>
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
              <div className="col-md-6">
                <span className="property-details-input-title">
                  From<span className="sign-up-imp-star">*</span>
                </span>
                <input
                  defaultValue={Data[0]?.fromLocation}
                  onChange={(e) => setFromLocation(e.target.value)}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <span className="property-details-input-title">
                  To<span className="sign-up-imp-star">*</span>
                </span>
                <input
                  defaultValue={Data[0]?.toLocation}
                  onChange={(e) => setToLocation(e.target.value)}
                  type="text"
                  className="form-control"
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <span className="property-details-input-title">
                  Business Name
                </span>
                <input
                  defaultValue={Data[0]?.businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <span className="property-details-input-title">Trip Date</span>
                <ConfigProvider
                  theme={{
                    components: {
                      DatePicker: {
                        zIndexPopupBase: 99999,
                        colorPrimaryHover: "#EF6B3E",
                        borderRadius: 4,
                        fontFamily: "Montserrat",
                        colorText: "#667085",
                        colorTextPlaceholder: "#667085",
                        fontSize: 16,
                      },
                    },
                  }}
                >
                  <Space
                    style={{
                      width: "100%",
                    }}
                    direction="vertical"
                  >
                    <DatePicker
                      //onChange={(e) => setTripDate(e.target.value)}
                      placeholder="Select Date"
                      style={{
                        width: "100%",
                        height: 45,
                      }}
                      suffixIcon={calendar}
                      format={dateFormat}
                    />
                  </Space>
                </ConfigProvider>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <span className="property-details-input-title">
                  Purpose<span className="sign-up-imp-star">*</span>
                </span>
                <input
                  defaultValue={Data[0]?.purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  type="text"
                  className="form-control"
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <span className="property-details-input-title">
                  Miles<span className="sign-up-imp-star">*</span>
                </span>
                <input
                  defaultValue={Data[0]?.miles}
                  onChange={(e) => setMiles(e.target.value)}
                  type="number"
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <span className="property-details-input-title">
                  Amount<span className="sign-up-imp-star">*</span>
                </span>
                <div className="rent-amount-input-container position-relative">
                  <input
                    defaultValue={Data[0]?.amount}
                    onChange={(e) => setAmount(e.target.value)}
                    type="number"
                    className="form-control"
                  />
                  <div className="dollar-sign-box-2">$</div>
                </div>
              </div>
            </div>
            <div className="modal-content-footer-section-scroll p-custom">
              <div className="row mt-3">
                <div className="col-md-12 d-flex justify-content-end responsive-direction-column">
                  <div className="task-modal-footer-btn">
                    <button
                      onClick={() => {
                        editMileage();
                        setLoader(true)
                      }}
                      className="modal-save-task-btn"
                    >
                      Save {loader&&<ModalLoader/>}
                    </button>
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

export default MileageEditModal;
