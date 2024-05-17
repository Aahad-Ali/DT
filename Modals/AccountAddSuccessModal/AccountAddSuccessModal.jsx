import React from "react";
import successIcon from "assets/Featured icon.png";
import { useNavigate } from "react-router-dom";
import cancelIcon from "assets/x-circle.png";
const AccountAddSuccessModal = ({
  success,
  onClose,
  message,
  btnTitle,
  successAccount,
  userRole,
}) => {
  const navigate = useNavigate();
  const redirectPages = () => {
    if (!userRole) {
      navigate("/accounting");
    }
    else {
      navigate("/settings/user-role");
    }
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
              {!success && (
                <p className="account-add-modal-title">
                  Account Added Successfully
                </p>
              )}
              {success && <p>{success}</p>}
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 text-center">
              {!message && (
                <p className="account-add-modal-text">
                  Your account has been successfully added. <br /> Check your
                  accounts.{" "}
                </p>
              )}
              {message && <p>{message} </p>}
            </div>
          </div>
          <div className="row">
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
          </div>{" "}
          <div onClick={onClose} className="cancel-modal-icon cursor">
            <img src={cancelIcon} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountAddSuccessModal;
