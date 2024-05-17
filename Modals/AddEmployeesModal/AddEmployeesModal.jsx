import React, { useState } from "react";
import plusIcon from "assets/plus.png";
import plusIconOrange from "assets/plus-orange.png";
import chevronIcon from "assets/chevron-down.png";
import { ConfigProvider, Select } from "antd";
import ServiceProfessionalSuccessModal from "Modals/ServiceProfessionalSuccessModal/ServiceProfessionalSuccessModal";
import ModalLoader from "Components/GeneralComponents/ModalLoader";

const AddEmployeesModal = ({ onClose }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [formattedNumber, setFormattedNumber] = useState("");
  const [phone, setphone] = useState("");
  const [loader, setLoader] = useState("");

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  // Modal Function
  const onOpenModal = () => {
    setOpenModal(true);
  };
  const onCloseModal = () => {
    setOpenModal(false);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const modalOpen = () => {
    setOpenModal(true);
    // onClose()
    // onOpenModal()
  };
  let dropdownIcon;
  dropdownIcon = (
    <>
      <img src={chevronIcon} alt="" />
    </>
  );

  const handleInputChange = (event) => {
    const input = event.target.value.replace(/\D/g, "");
    const formatted = formatPhoneNumber(input);
    setFormattedNumber(formatted);
    const unformatted = input.slice(0, 10);
    setphone(unformatted);
  };

  const formatPhoneNumber = (input) => {
    let formattedNumber = "";

    if (input.length > 0) {
      formattedNumber = `(${input.slice(0, 3)}`;

      if (input.length > 3) {
        formattedNumber += `) ${input.slice(3, 6)}`;
      }

      if (input.length > 6) {
        formattedNumber += `-${input.slice(6, 10)}`;
      }
    }

    return formattedNumber;
  };
  return (
    <>
      {openModal === true ? (
        <ServiceProfessionalSuccessModal
          successAccount="Connect to Bank"
          onClose={onClose}
        />
      ) : (
        <>
          <div className="payment-modal-container">
            <div className="payment-method-modal task-modal">
              <div className="modal-heading d-flex justify-content-between align-items-center p-41 pt-20 pb-20">
                <h1>ADD EMPLOYEES</h1>
                <button onClick={onClose} className="modal-cancel-btn">
                  <svg
                    width={18}
                    height={18}
                    fill="#667085"
                    stroke="#667085"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>
              <div className="company-profile-setup-content-main">
                <div className="row mt-3">
                  <div className="col-md-4">
                    <span className="tenant-personal-details-title">
                      First Name<span className="input-field-imp-star">*</span>
                    </span>
                    <input
                      type="text"
                      className="form-control mt-3"
                      placeholder="First Name"
                    />
                  </div>
                  <div className="col-md-4">
                    <span className="tenant-personal-details-title">
                      Middle Name
                    </span>
                    <input
                      type="text"
                      className="form-control mt-3"
                      placeholder="Middle Name"
                    />
                  </div>
                  <div className="col-md-4">
                    <span className="tenant-personal-details-title">
                      Last Name<span className="input-field-imp-star">*</span>
                    </span>
                    <input
                      type="text"
                      className="form-control mt-3"
                      placeholder="Last Name"
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <span className="tenant-personal-details-title">
                      Email<span className="input-field-imp-star">*</span>
                    </span>
                    <input
                      type="email"
                      className="form-control mt-3"
                      placeholder="Email"
                    />
                  </div>
                  <div className="col-md-6">
                    <span className="tenant-personal-details-title">
                      Phone No<span className="input-field-imp-star">*</span>
                    </span>
                    <input
                      onChange={handleInputChange}
                      value={formattedNumber}
                      type="text"
                      className="form-control mt-3"
                      placeholder="Phone number"
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <span className="tenant-personal-details-title">
                      Select Access
                      <span className="input-field-imp-star">*</span>
                    </span>
                    <ConfigProvider
                      theme={{
                        components: {
                          Select: {
                            zIndexPopup: 99999,
                            colorPrimaryHover: "#EF6B3E",
                            optionSelectedBg: "rgba(239, 107, 62, 0.16)",
                            colorTextPlaceholder: "#667085",
                            fontFamily: "montserrat",
                          },
                        },
                      }}
                    >
                      <Select
                        suffixIcon={dropdownIcon}
                        placeholder="Select Access Level"
                        className="mt-3"
                        style={{
                          width: "100%",
                          height: 50,
                        }}
                        options={[
                          {
                            value: "Manager",
                            label: "Manager",
                          },
                          {
                            value: "Administrator",
                            label: "Administrator",
                          },
                          {
                            value: "Super Admin",
                            label: "Super Admin",
                          },
                          {
                            value: "Staff",
                            label: "Staff",
                          },
                          {
                            value: "Side Crew",
                            label: "Side Crew",
                          },
                        ]}
                      />
                    </ConfigProvider>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <button
                      className="add-employment-btn-white"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <img
                        src={isHovered ? plusIcon : plusIconOrange}
                        className="add-property-icon-white"
                      />{" "}
                      Add New Employee
                    </button>
                  </div>
                </div>

                <div className="row mt-5 pt-5 pb-20">
                  <div className="col-md-12 d-flex justify-content-end">
                    <button
                      className="modal-skip-btn next-btn-main me-3"
                      onClick={modalOpen}
                    >
                      Skip
                    </button>

                    <button
                      className="modal-submit-btn next-btn-main"
                      onClick={()=>{
                        openModal()
                        setLoader(true)

                      }}
                    >
                      Save {loader && <ModalLoader />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AddEmployeesModal;
