import React from "react";
import alertIcon from "assets/alert-circle.png";
import cancelIcon from "assets/x-circle.png";
import { useNavigate } from "react-router-dom";
import UseDeleteHook from "Hooks/UseDeleteHook";

const UnitDeleteModal = ({ onClose, delId }) => {
  const navigate = useNavigate();
  const DeleteProperty = () => {
    const { deleteData } = UseDeleteHook("unit", delId);
    deleteData();
    onClose();
  };
  return (
    <>
      <div className="payment-modal-container ">
        <div className="payment-success-modal position-relative w-25">
          <div className="row">
            <div className="col-md-12 text-center">
              <img src={alertIcon} alt="" />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-md-12 text-center">
              <p className="mb-0 fw-bold mt-2">Delete Unit</p>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-12 text-center">
              <button
                onClick={() => {
                  DeleteProperty();
                }}
                className="delete-modal-delete-btn w-100"
              >
                Delete Unit
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

export default UnitDeleteModal;
