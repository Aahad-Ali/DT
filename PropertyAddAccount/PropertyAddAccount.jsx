import React, { useState } from "react";
import { Select, Switch, ConfigProvider } from "antd";
import arrowLeft from "assets/chevron-left.png";
import AccountAddSuccessModal from "Modals/AccountAddSuccessModal/AccountAddSuccessModal";
import chevronIcon from "assets/chevron-down.png";
const PropertyAddAccount = () => {
  // States start
  const [currentStep, setCurrentStep] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  // States end

  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };
  let dropdownIcon;
  dropdownIcon = (
    <>
      <img src={chevronIcon} alt="" />
    </>
  );
  // Modal Function
  const onOpenModal = () => {
    setOpenModal(true);
  };
  const onCloseModal = () => {
    setOpenModal(false);
  };
  // Stepper Function
  const handleNext = () => {
    setCurrentStep(currentStep + 1);
    if (currentStep === 4) {
      setCurrentStep(1);
    }
  };
  const handlePrev = () => {
    if (currentStep <= 1) {
      setCurrentStep(1);
    } else {
      setCurrentStep(currentStep - 1);
    }
  };
  return (
    <>
      {openModal && (
        <AccountAddSuccessModal
          successAccount="Connect to Bank"
          onClose={onCloseModal}
        />
      )}
      <div className="container-fluid bg-white  p-3">
        <div className="stepper-container step-container-responsive">
          <div
            className={
              currentStep <= 1 || currentStep === 2
                ? "step-1 account-info stepper-active"
                : "step-1 account-info stepper-inactive"
            }
          >
            1<div className="form-step-text">Account Info</div>
          </div>
          <div
            className={
              currentStep === 2
                ? "step-2 property-info stepper-active"
                : "step-2 property-info stepper-inactive"
            }
          >
            2<div className="form-step-text">Lease Options</div>
          </div>
          <div className="lines-account">
            <div
              className={`line ${
                currentStep === 2 || currentStep === 3 ? "active" : ""
              }`}
            ></div>
            <div className={`line ${currentStep === 3 ? "active" : ""}`}></div>
          </div>
        </div>
        <div className="stepper-content-container mt-4 add-account-details-stepper-content">
          {currentStep === 1 && (
            <>
              <div className="container-fluid">
                <div className="row mt-3">
                  <div className="col-md-12">
                    <div className="stepper-content">
                      <span className="property-details-input-title">
                        Type<span className="sign-up-imp-star">*</span>
                      </span>
                      <ConfigProvider
                        theme={{
                          components: {
                            Select: {
                              zIndexPopupBase: 99999,
                              colorPrimaryHover: "#EF6B3E",
                              optionSelectedBg: "rgba(239, 107, 62, 0.16)",
                              borderRadius: 4,
                              colorTextPlaceholder: "#667085",
                              fontFamily: "montserrat",
                            },
                          },
                        }}
                      >
                        <Select
                          suffixIcon={dropdownIcon}
                          className="mt-3"
                          placeholder="Select Type"
                          style={{
                            width: "100%",
                            height: 45,
                          }}
                          options={[
                            {
                              value: "Savings Account",
                              label: "Savings Account",
                            },
                            {
                              value: "Current Account",
                              label: "Current Account",
                            },
                            {
                              value: "Yiminghe",
                              label: "yiminghe",
                            },
                            {
                              value: "disabled",
                              label: "Disabled",
                              disabled: true,
                            },
                          ]}
                        />
                      </ConfigProvider>
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <span className="property-details-input-title">
                      Account Name<span className="sign-up-imp-star">*</span>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Account Name"
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <span className="property-details-input-title">
                      Description
                    </span>
                    <textarea
                      name=""
                      id=""
                      cols="30"
                      rows="5"
                      className="form-control"
                      placeholder="Description"
                    ></textarea>
                  </div>
                </div>
                <div className="stepper-btn step-btn-responsive-tab d-flex justify-content-between gap-3 mt-5 pb-3">
                  <button onClick={handlePrev} className="back-prev-btn mt-3">
                    <img src={arrowLeft} />
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    className="next-btn-same-class mt-3"
                  >
                    {currentStep === 2 ? "Save" : "Next"}
                  </button>
                </div>
              </div>
            </>
          )}
          {currentStep === 2 && (
            <>
              <div className="container-fluid">
                <div className="row mt-5">
                  <div className="col-md-12">
                    <p className="property-accounts-lease-options-title">
                      Uses account to receive payment
                    </p>
                    <p className="property-accounts-lease-options-text">
                      This will allow you to select this account when receiving
                      payments.{" "}
                    </p>
                    <ConfigProvider
                      theme={{
                        components: {
                          Switch: {
                            colorPrimary: "#EF6B3E",
                            colorPrimaryHover: "#EF6B3E",
                          },
                        },
                      }}
                    >
                      <Switch onChange={onChange} />
                    </ConfigProvider>
                  </div>
                </div>
                <div className="row mt-5">
                  <div className="col-md-12">
                    <p className="property-accounts-lease-options-title">
                      Uses account to make payment{" "}
                    </p>
                    <p className="property-accounts-lease-options-text">
                      This will allow you to select this account when making
                      payments.{" "}
                    </p>
                    <ConfigProvider
                      theme={{
                        components: {
                          Switch: {
                            colorPrimary: "#EF6B3E",
                            colorPrimaryHover: "#EF6B3E",
                          },
                        },
                      }}
                    >
                      <Switch onChange={onChange} />
                    </ConfigProvider>
                  </div>
                </div>
                <div className="row mt-5">
                  <div className="col-md-12">
                    <p className="property-accounts-lease-options-title">
                      Make this account primary
                    </p>
                    <p className="property-accounts-lease-options-text">
                      This will allow you to select this account as primary.{" "}
                    </p>
                    <ConfigProvider
                      theme={{
                        components: {
                          Switch: {
                            colorPrimary: "#EF6B3E",
                            colorPrimaryHover: "#EF6B3E",
                          },
                        },
                      }}
                    >
                      <Switch onChange={onChange} />
                    </ConfigProvider>
                  </div>
                </div>
                <div className="stepper-btn d-flex justify-content-between gap-3 mt-5 pb-3">
                  <button onClick={handlePrev} className="back-prev-btn mt-3">
                    <img src={arrowLeft} />
                    Back
                  </button>
                  <button
                    onClick={onOpenModal}
                    className="next-btn-same-class mt-3"
                  >
                    Save
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PropertyAddAccount;
