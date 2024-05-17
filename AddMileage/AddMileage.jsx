import React, { useState } from "react";
import { DatePicker, ConfigProvider, Space, message } from "antd";
import TempModal from "Modals/TempModal/TempModal";
import calendarIcon from "assets/calendar-icon.png";
import { useNavigate } from "react-router-dom";
import UsePostHook from "Hooks/UsePostHook";
const AddMileage = () => {
  const dateFormat = "MM/DD/YYYY";
  //States start
  //const [openModal, setOpenModal] = useState(false);
  const [openModal, setOpenModalMileage] = useState(false);
  const [loader, setLoader] = useState(false);
  const [businessName, setBusinessName] = useState("");
  const [tripDate, setTripDate] = useState("");
  //States end
  const [form, setForm] = useState({
    fromLocation: "",
    toLocation: "",
    purpose: "",
    miles: "",
    amount: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (fieldName, value) => {
    setForm({
      ...form,
      [fieldName]: value,
    });
  };

  let calendar;
  calendar = (
    <>
      <img src={calendarIcon} alt="" />
    </>
  );
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  // Modal Function
  const onOpenModal = () => {
    setOpenModalMileage(true);
  };
  const onCloseModal = () => {
    setOpenModalMileage(false);
  };
  const navigate = useNavigate();

  // Create Mileage

  const CreateMileage = () => {
    UsePostHook(
      "api/mileage",
      {
        fromLocation: form.fromLocation,
        toLocation: form.toLocation,
        businessName,
        purpose: form.purpose,
        miles: form.miles,
        amount: form.amount,
        tripDate,
      },
      setLoader,
      onOpenModal
    );
  };
  const preventMinus = (e) => {
    if (e.code === "Minus") {
      e.preventDefault();
    }
  };

  const handleNext = () => {
    const newErrors = {};
    for (const key in form) {
      if (form[key] === "") {
        newErrors[key] = `${key} is required`;
      }
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      CreateMileage();
    }
  };
  return (
    <>
      {openModal === true && (
        <TempModal
          onClose={onCloseModal}
          title="Mileage added successfully"
          success="Go To Mileage"
          route="mileage"
        />
      )}
      {/*
                openModal && <AccountAddSuccessModal onClose={onCloseModal} success="Success" message="Mileage added successfully" btnTitle={"Go to Mileage"} />
            */}
      <div className="container-fluid bg-white p-3">
        <div className="row mt-3">
          <div className="col-md-6">
            <span className="property-details-input-title">
              From<span className="sign-up-imp-star">*</span>
            </span>
            <input
              onChange={(e) => {
                handleChange("fromLocation", e.target.value);
              }}
              type="text"
              className="form-control"
            />
            {errors.fromLocation && (
              <span className="text-danger fw-bold validation-text">
                {errors.fromLocation.split("_").join(" ")}
              </span>
            )}
          </div>
          <div className="col-md-6">
            <span className="property-details-input-title">
              To<span className="sign-up-imp-star">*</span>
            </span>
            <input
              onChange={(e) => {
                handleChange("toLocation", e.target.value);
              }}
              type="text"
              className="form-control"
            />
            {errors.toLocation && (
              <span className="text-danger fw-bold validation-text">
                {errors.toLocation.split("_").join(" ")}
              </span>
            )}
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-6">
            <span className="property-details-input-title">Business Name</span>
            <input
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
                  onChange={(date, dateString) => {
                    console.log(date);
                    if (dateString) {
                      const formattedDate = new Date(
                        dateString
                      ).toLocaleDateString();
                      setTripDate(formattedDate);
                    } else {
                      setTripDate(null);
                    }
                  }}
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
              onChange={(e) => {
                handleChange("purpose", e.target.value);
              }}
              type="text"
              className="form-control"
            />
            {errors.purpose && (
              <span className="text-danger fw-bold validation-text">
                {errors.purpose.split("_").join(" ")}
              </span>
            )}
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-6">
            <span className="property-details-input-title">
              Miles<span className="sign-up-imp-star">*</span>
            </span>
            <input
              onChange={(e) => {
                handleChange("miles", e.target.value);
              }}
              type="number"
              className="form-control"
              min="0"
              onKeyPress={preventMinus}
            />
            {errors.miles && (
              <span className="text-danger fw-bold validation-text">
                {errors.miles.split("_").join(" ")}
              </span>
            )}
          </div>
          <div className="col-md-6">
            <span className="property-details-input-title">
              Amount<span className="sign-up-imp-star">*</span>
            </span>
            <div className="rent-amount-input-container position-relative">
              <input
                onChange={(e) => {
                  handleChange("amount", e.target.value);
                }}
                type="number"
                className="form-control"
                min="0"
                onKeyPress={preventMinus}
              />
              {errors.amount && (
                <span className="text-danger fw-bold validation-text">
                  {errors.amount.split("_").join(" ")}
                </span>
              )}
              <div className="dollar-sign-box-2">$</div>
            </div>
          </div>
        </div>
        <div className="stepper-btn d-flex justify-content-between gap-1 pb-3 mt-5">
          <button
            onClick={() => {
              navigate("/mileage");
            }}
            className="back-prev-btn mt-3"
          >
            Cancel
          </button>
          <button onClick={handleNext} className="next-btn-same-class mt-3">
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default AddMileage;
