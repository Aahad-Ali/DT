import React from "react";
import alertIcon from "assets/alert-circle.png";
import cancelIcon from "assets/x-circle.png";
import { useNavigate } from "react-router-dom";
import UseDeleteHook from "Hooks/UseDeleteHook";

const PropertyDeleteModal = ({ onClose, route, deleteBtnText, delId }) => {
  const navigate = useNavigate();
  const redirectPages = () => {
    navigate(`/${route}`);
  };
  const { deleteData } = UseDeleteHook("property", delId);
  const DeleteProperty = () => {
    deleteData();
    onClose();
  };
  return (
    <>
      <div className="payment-modal-container ">
        <div className="payment-success-modal position-relative">
          <div className="row">
            <div className="col-md-12 text-center">
              <img src={alertIcon} alt="" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 text-center">
              <p className="mb-0 fw-bold mt-2">Delete Property</p>
              <p className="mb-2">
                Once the property is deleted, it will move to the <br />{" "}
                archive, and after 60 days, it will be deleted <br /> from the
                archive.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 text-center">
              <button
                onClick={() => {
                  DeleteProperty();
                  // redirectPages()
                }}
                className="delete-modal-delete-btn w-100"
              >
                {deleteBtnText}
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

export default PropertyDeleteModal;
