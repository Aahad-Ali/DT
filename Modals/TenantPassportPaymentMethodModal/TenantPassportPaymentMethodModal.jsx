import React, { useState } from "react";
import helpChatIcon from "assets/message-chat-circle.png";
import { Radio, ConfigProvider } from "antd";

const TenantPassportPaymentMethodModal = ({ onClose, onOpen }) => {
  const [expiry, setExpiry] = useState("");
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [cvc, setCvc] = useState("");
  const [value, setValue] = useState(1);

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    if (value.length > 0) {
      value = value.match(/.{1,2}/g).join("/"); // Add a slash between month and year
    }
    setExpiry(value);
  };
  // Credit Card field functions
  const handleCreditCardChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    if (value.length > 0) {
      value = value.match(/.{1,4}/g).join("-"); // Add hyphens every four digits
    }
    setCreditCardNumber(value);
  };
  const handleCvcChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    setCvc(value);
  };
  return (
    <>
      <div className="payment-modal-container">
        <div className="payment-method-modal task-modal">
          <div className="modal-heading d-flex justify-content-between align-items-center p-41 pt-20">
            <h1>Payment Details</h1>
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
          <div className="row mt-3 p-41">
            <div className="col-md-12">
              <p className="tenant-portal-payment-details-modal-text">
                We automatically bill on the 1st of each month.
              </p>
            </div>
          </div>
          <div className="tenant-portal-payment-details-options">
            <div className="row mt-3">
              <div className="col-md-12">
                <div className="d-flex align-items-center">
                  <ConfigProvider
                    theme={{
                      components: {
                        Radio: {
                          colorText: "#344054",
                          colorPrimary: "#EF6B3E",
                          fontFamily: "Montserrat",
                          fontSize: 16,
                        },
                      },
                    }}
                  >
                    <Radio.Group
                      onChange={onChange}
                      value={value}
                      className="screening-questions-options"
                    >
                      <Radio
                        value={1}
                        className="tenant-personal-details-title"
                      >
                        Credit or Debit Card
                      </Radio>
                      <p className="tenant-portal-payment-details-modal-text p-30">
                        Use a credit or debit card to pay with automatic payment
                        enabled.
                      </p>
                      <br />
                      <Radio
                        value={2}
                        className="tenant-personal-details-title"
                      >
                        ACH Card
                      </Radio>
                      <p className="tenant-portal-payment-details-modal-text p-30">
                        Use ACH card to pay with automatic payment enabled.
                      </p>
                    </Radio.Group>
                  </ConfigProvider>
                </div>
              </div>
            </div>
          </div>
          {value === 1 ? (
            <>
              <div className="row mt-3 p-41">
                <div className="col-md-8">
                  <span className="tenant-personal-details-title">
                    Name on Card
                  </span>
                  <input
                    placeholder="Olivia Rhye"
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="col-md-4">
                  <span className="tenant-personal-details-title">Expiry</span>
                  <input
                    type="text"
                    id="expiry"
                    className="form-control"
                    value={expiry}
                    onChange={handleExpiryChange}
                    maxLength="5"
                    placeholder="06 / 2024"
                  />
                </div>
              </div>
              <div className="row mt-3 mb-5 p-41">
                <div className="col-md-8">
                  <span className="tenant-personal-details-title">
                    Card Number
                  </span>
                  <input
                    type="text"
                    id="creditCard"
                    className="form-control"
                    value={creditCardNumber}
                    onChange={handleCreditCardChange}
                    maxLength="19"
                    placeholder="8235 2731 1190 5642  "
                  />
                </div>
                <div className="col-md-4">
                  <span className="tenant-personal-details-title">CVV</span>
                  <input
                    type="password"
                    id="cvc"
                    className="form-control"
                    value={cvc}
                    onChange={handleCvcChange}
                    maxLength="3"
                    placeholder="cvc"
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="row mt-3 p-41">
                <div className="col-md-12">
                  <span className="tenant-personal-details-title">
                    Account Name
                  </span>
                  <input
                    placeholder="Olivia Rhye"
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="row mt-3 p-41">
                <div className="col-md-6">
                  <span className="tenant-personal-details-title">
                    Account Number
                  </span>
                  <input
                    type="text"
                    id="creditCard"
                    className="form-control"
                    value={creditCardNumber}
                    onChange={handleCreditCardChange}
                    maxLength="19"
                    placeholder="8235 2731 1190 5642  "
                  />
                </div>
                <div className="col-md-6">
                  <span className="tenant-personal-details-title">
                    Routing Number
                  </span>
                  <input
                    type="text"
                    id="creditCard"
                    className="form-control"
                    value={creditCardNumber}
                    onChange={handleCreditCardChange}
                    maxLength="19"
                    placeholder=""
                  />
                </div>
              </div>
            </>
          )}
          <div className="row mt-5 pt-5 p-41 pb-20">
            <div className="col-md-12 d-flex justify-content-between">
              <button className="modal-help-btn next-btn-main">
                <img src={helpChatIcon} alt="" />
                Help
              </button>
              <button
                onClick={() => {
                  onOpen();
                  onClose();
                }}
                className="modal-submit-btn next-btn-main"
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TenantPassportPaymentMethodModal;
