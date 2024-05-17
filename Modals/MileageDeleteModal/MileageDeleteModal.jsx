import React from "react";
import alertIcon from "assets/alert-circle.png";
import cancelIcon from "assets/x-circle.png";
import { useNavigate } from "react-router-dom";

const MileageDeleteModal = ({ onClose, route, deleteBtnText, delId }) => {
  const navigate = useNavigate();
  const redirectPages = () => {
    navigate(`/${route}`);
  };
  const config = require("Helpers/config.json");
  const DeleteMileage = () => {
    fetch(`${config["baseUrl"]}/api/mileage/${delId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.apiCallStatus === "success") {
          console.log(res);
          window.location.reload(true);
        } else {
          console.log(res, "error");
        }
      });
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
              <p className="mb-0 fw-bold mt-2">Delete Mileage</p>
              <p className="mb-2">
                Once the mileage is deleted, it will move to the <br /> archive,
                and after 60 days, it will be deleted <br /> from the archive.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 text-center">
              <button
                onClick={() => {
                  DeleteMileage();
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

export default MileageDeleteModal;
