import React from "react";
import AlertIcon from "assets/alert-circle.png";
const FileDeleteModal = ({ onClose }) => {
  return (
    <>
      <div className="payment-modal-container ">
        <div className="payment-success-modal position-relative">
          <div className="row">
            <div className="col-md-12 text-center">
              <img src={AlertIcon} alt="" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 text-center">
              <p className="mb-0 fw-bold mt-2">Delete file</p>
              <p>Are you sure you want to delete the file?</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 text-center">
              <div className="delete-modal-btn d-flex justify-content-between gap-3">
                <button
                  onClick={onClose}
                  className="delete-modal-cancel-btn w-100"
                >
                  Cancel
                </button>
                <button className="delete-modal-delete-btn w-100">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FileDeleteModal;
