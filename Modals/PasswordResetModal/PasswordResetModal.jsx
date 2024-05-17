import React from "react";
import successIcon from "assets/Featured icon.png";
import cancelIcon from "assets/x-circle.png";
import { useNavigate } from "react-router-dom";

const PasswordResetModal = ({ onClose, passwordResetBtnText, route }) => {
  const navigate = useNavigate();
  const redirectPages = () => {
    navigate(`/${route}`);
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
          <div className="row">
            <div className="col-md-12 text-center">
              <p className="mb-0 fw-bold mt-2">Password Reset</p>
              <p className="mb-2">Password reset successfully</p>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-12 text-center">
              <button
                onClick={() => {
                  onClose();
                  redirectPages();
                }}
                className="create-accoutn-btn w-100 btn-box-shadow password-reset-modal-btn"
              >
                {passwordResetBtnText}
              </button>
            </div>
          </div>
          <div onClick={onClose} className="cancel-modal-icon cursor">
            <img src={cancelIcon} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordResetModal;
