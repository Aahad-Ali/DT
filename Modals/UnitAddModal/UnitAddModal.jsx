import React from "react";
import successIcon from "assets/Featured icon.png";
import cancelIcon from "assets/x-circle.png";
import { useNavigate } from "react-router-dom";

const UnitAddModal = ({ route, onClose }) => {
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
              <p className="mb-0 fw-bold mt-2">Unit Add Successfully</p>
              <p className="mb-2">
                Unit has been added successfully <br /> Check your units.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 text-center">
              <button
                onClick={() => {
                  redirectPages();
                }}
                className="create-accoutn-btn w-100"
              >
                Go to units
              </button>
            </div>
          </div>
          <div onClick={() => onClose()} className="cancel-modal-icon cursor">
            <img src={cancelIcon} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default UnitAddModal;
