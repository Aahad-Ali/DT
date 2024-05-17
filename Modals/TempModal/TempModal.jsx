import React from "react";
import successIcon from "assets/Featured icon.png";
import { Link, useNavigate } from "react-router-dom";
import cancelIcon from "assets/x-circle.png";
const TempModal = ({ onClose, title, success, route }) => {
  const navigate = useNavigate();
  const redirectPages = () => {
    navigate(`/${route}`);
  };
  return (
    <>
      <div className="payment-modal-container ">
        <div className="vendor-success-modal position-relative">
          <div className="row">
            <div className="col-md-12 text-center">
              <img src={successIcon} alt="" />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-12 text-center">
              <p className="convert-tenant-modal-title">Success</p>
              <p className="normal-grey-text convert-tenant-modal-text">
                {title}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 text-center mt-2 p-0">
              <button
                onClick={() => {
                  onClose();
                  redirectPages();
                }}
                className="create-accoutn-btn w-100 btn-box-shadow"
              >
                {success}
              </button>
            </div>
          </div>
          <div
            onClick={() => {
              onClose();
              navigate(`/${route}`);
            }}
            className="cancel-modal-icon cursor"
          >
            <img src={cancelIcon} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default TempModal;
