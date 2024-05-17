import React from "react";
import arrowLeft from "assets/chevron-left (1).png";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "antd";
const NonRenewal = () => {
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  const navigate = useNavigate();
  return (
    <>
      <div className="container-fluid bg-white  p-3">
        <div className="row mt-3">
          <div className="col-md-12">
            <span className="property-details-input-title">
              Non Renewal<span className="sign-up-imp-star">*</span>
            </span>
            <br />
            <DatePicker
              className="lease-date-picker mt-3"
              style={{
                width: "100%",
                height: 45,
              }}
              onChange={onChange}
              placeholder="Select Date"
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-12">
            <span className="property-details-input-title">Description</span>
            <textarea
              name=""
              className="form-control mt-3"
              id=""
              cols="30"
              rows="10"
              placeholder="Description"
            ></textarea>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-12 ">
            <div className="btn-box d-flex align-items-end justify-content-center gap-3">
              <button
                onClick={() => {
                  navigate("/lease-detail");
                }}
                className="back-prev-btn mt-3"
              >
                <img src={arrowLeft} />
                Back
              </button>
              <button className="save-btn-same-class mt-3">Save</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NonRenewal;
