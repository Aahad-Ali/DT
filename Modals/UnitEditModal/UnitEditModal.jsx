import React from "react";
import alertIcon from "assets/alert-circle.png";
import editIcon from "assets/Featured icon.png";
import cancelIcon from "assets/x-circle.png";
import { useNavigate } from "react-router-dom";

const UnitEditModal = ({ route, onClose, btnTitle, message1, message2 }) => {
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
              <img src={editIcon} alt="" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 text-center">
              <p className="mb-0 fw-bold mt-2">Edit Successfully</p>
              <p className="mb-2">
                {message1} <br /> {message2}
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
                {btnTitle}
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

export default UnitEditModal;
