import React from "react";
import successIcon from "assets/Featured icon.png";
import { Link, useNavigate } from "react-router-dom";
import cancelIcon from "assets/x-circle.png";

const ServiceProfessionalSuccessModal = ({
  success,
  onClose,
  message,
  btnTitle,
  successAccount,
}) => {
  const navigate = useNavigate();
  const redirectPages = () => {
    navigate("/mileage");
  };
  return (
    <>
      <div className="payment-modal-container ">
        <div className="payment-success-modal position-relative">
          <div className="row">
            <div className="col-md-12 text-center">
              <img src={successIcon} alt="" />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-12 text-center">
              {!success && <p className="account-add-modal-title">Success </p>}
              {success && <p>{success}</p>}
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 text-center">
              {!message && (
                <p className="account-add-modal-text">
                  Your Information saved successfully.{" "}
                </p>
              )}
              {message && <p>{message} </p>}
            </div>
          </div>
          {/* <div className="row">
            <div className="col-md-12 text-center">
              <button
                onClick={() => {
                  onClose();
                  redirectPages();
                }}
                className="create-accoutn-btn w-100 btn-box-shadow"
              >
                {successAccount}
                {btnTitle}
              </button>
            </div>
          </div>{" "} */}
          <div onClick={onClose} className="cancel-modal-icon cursor">
            <img src={cancelIcon} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceProfessionalSuccessModal;
