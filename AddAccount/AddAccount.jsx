import React, { useEffect, useMemo, useState } from "react";
import { ConfigProvider, Select } from "antd";
import { message } from "antd";
import AccountAddSuccessModal from "Modals/AccountAddSuccessModal/AccountAddSuccessModal";
import chevronIcon from "assets/chevron-down.png";
import config from "Helpers/config.json";
import { loadConnectAndInitialize } from "@stripe/connect-js";
import {
  ConnectAccountOnboarding,
  ConnectComponentsProvider,
} from "@stripe/react-connect-js";
import { useNavigate } from "react-router-dom";
import UseGetHook from "Hooks/UseGetHook";
const AddAccount = () => {
  // States start
  const [currentStep, setCurrentStep] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [account_id, setAccount_id] = useState("");
  const [property, setProperty] = useState("");
  const [connectStripe, setConnectStripe] = useState(null);
  const navigate = useNavigate();
  // States end
  // Modal Function
  const onOpenModal = () => {
    setOpenModal(true);
  };
  const onCloseModal = () => {
    setOpenModal(false);
  };
  // Stepper Function
  const handleNext = () => {
    if (currentStep === 1) {
      if (property.length > 0) {
        setCurrentStep(currentStep + 1);

        const fetchClientSecret = async () => {
          // Fetch the AccountSession client secret
          const response = await fetch(`${config.baseUrl}/api/stripe/connect`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              properties: property,
            }),
          });
          if (!response.ok) {
            // Handle errors on the client side here
            const { error } = await response.json();
            console.log("An error occurred: ", error);
            // document.querySelector('#error').removeAttribute('hidden');
            return undefined;
          } else {
            const { message } = await response.json();
            setAccount_id(message.account_id);
            return message.client_secret;
          }
        };
        const instance = loadConnectAndInitialize({
          publishableKey: process.env.REACT_APP_STRIPE_PUBLIC_KEY,
          fetchClientSecret: fetchClientSecret,
        });
        setConnectStripe(instance);
      } else {
        message.error("Property is required");
      }
    }
    if (currentStep === 4) {
      setCurrentStep(1);
    }
  };
  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };
  let dropdownIcon;
  dropdownIcon = (
    <>
      <img src={chevronIcon} alt="" />
    </>
  );
  const { fetchAccountProperty, PropertyData } = UseGetHook(
    "propertiesAvailableToAddAccount"
  );
  useEffect(() => {
    fetchAccountProperty();
  }, []);
  // Stripe
  // We use `useState` to ensure the Connect instance is only initialized once

  // Stripe End
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
              currentStep <= 1 || currentStep === 2 || currentStep === 3
                ? "step-1 account-info stepper-active"
                : "step-1 account-info stepper-inactive"
            }
          >
            1<div className="form-step-text">Property Info</div>
          </div>
          <div
            className={
              currentStep === 2 || currentStep === 3
                ? "step-2 property-info stepper-active"
                : "step-2 property-info stepper-inactive"
            }
          >
            2<div className="form-step-text">Account Info</div>
          </div>
          <div className="lines-account">
            <div
              className={`line ${currentStep === 2 || currentStep === 3 ? "active" : ""
                }`}
            ></div>
            <div className={`line ${currentStep === 3 ? "active" : ""}`}></div>
          </div>
        </div>
        <div className="stepper-content-container mt-4">
          {currentStep <= 1 && (
            <>
              <div className="container-fluid">
                <div className="row mt-3">
                  <div className="col-md-12">
                    <div className="stepper-content">
                      <span>
                        Property<span className="sign-up-imp-star">*</span>
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
                          mode="multiple"
                          placeholder="Select property"
                          suffixIcon={dropdownIcon}
                          style={{
                            width: "100%",
                            height: 50,
                          }}
                          onChange={(e) => setProperty(e)}
                          options={PropertyData.map((e) => {
                            return { value: e.id, label: e.title };
                          })}
                        />
                      </ConfigProvider>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="stepper-btn d-flex justify-content-between mt-5 gap-1 pb-3">
                    <button onClick={handlePrev} className="back-prev-btn mt-3">
                      Back
                    </button>
                    <button
                      onClick={handleNext}
                      className="next-btn-same-class mt-3"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
          {currentStep === 2 && (
            <>
              <div className="container-fluid mt-5">
                <div className="row">
                  <div className="container">
                    <ConnectComponentsProvider connectInstance={connectStripe}>
                      <ConnectAccountOnboarding
                        onExit={() => {
                          message.success("Account added");
                          fetch(`${config.baseUrl}/api/stripe/connectConfirm`, {
                            method: "PUT",
                            headers: {
                              "content-type": "application/json",
                              "Authorization": `Bearer ${localStorage.getItem("token")}`
                            },
                            body: JSON.stringify({
                              account_id: account_id,
                            }),
                          })
                            .then((res) => {
                              return res.json();
                            })
                            .then((res) => {
                              console.log(res);
                            })
                            .catch((e) => console.log(e, "error"));
                          setTimeout(() => {
                            navigate("/all-accounts");
                          }, 1000);
                        }}
                      />
                    </ConnectComponentsProvider>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AddAccount;
