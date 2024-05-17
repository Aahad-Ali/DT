import React from "react";
import successIcon from "assets/Featured icon.png";
import { Link, useNavigate } from "react-router-dom";
import cancelIcon from "assets/x-circle.png";
const ConvertTenantModal = ({
  modalTitle,
  onClose,
  leasePara,
  inviteLink,
  prospectModalText,
  modalProspectTitle,
  id,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="payment-modal-container">
        <div className="payment-success-modal position-relative">
          <div className="row">
            <div className="col-md-12 text-center">
              <img src={successIcon} alt="" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 text-center mt-3">
              <p className="convert-tenant-modal-title">
                {!modalProspectTitle ? "Success" : modalProspectTitle}
              </p>
            </div>
          </div>{" "}
          <div className="row">
            <div className="col-md-12 text-center">
              <p className="convert-tenant-modal-text">
                {!leasePara
                  ? "Create lease to convert tenant"
                  : leasePara}
              </p>
              <p className="primary-orange-text fw-bold">
                {!inviteLink ? "" : inviteLink}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 text-center mt-2 p-0">
              <button
                onClick={() => {
                  navigate(
                    modalProspectTitle
                      ? "/all-prospect"
                      : `/prospect-lease?id=${id}`
                  );
                }}
                className="create-accoutn-btn w-100 btn-box-shadow"
              >
                {modalTitle}
              </button>
            </div>
            <div className="col-md-12 text-center mt-3">
              <Link className="normal-grey-text " to="/all-tenants">
                {!inviteLink ? "Skip" : ""}
              </Link>
            </div>
          </div>
          <div
            onClick={() => {
              navigate(`/all-tenants`);
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

export default ConvertTenantModal;
