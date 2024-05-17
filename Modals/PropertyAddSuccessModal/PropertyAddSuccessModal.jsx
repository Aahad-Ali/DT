import React from "react";
import successIcon from "assets/Featured icon.png";
import { Link, useNavigate } from "react-router-dom";
import cancelIcon from "assets/x-circle.png";
const PropertyAddSuccessModal = ({ onClose, success, route }) => {
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
          <div className="row mt-3">
            <div className="col-md-12 text-center">
              <p className="mb-3 account-add-modal-title">
                Property Added successfully
              </p>
              <p className="account-add-modal-text">
                Your property has been successfully added. <br /> Check your
                properties
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 text-center mt-2">
              <button
                onClick={() => {
                  onClose();
                  redirectPages();
                }}
                className="create-accoutn-btn w-100 btn-box-shadow  mb-3"
              >
                {success}
              </button>
              <Link className="td normal-grey-text" to="/properties-dashboard">
                Skip for now
              </Link>
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

export default PropertyAddSuccessModal;
