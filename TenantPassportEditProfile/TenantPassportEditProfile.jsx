import React, { useState } from "react";
import avatar from "assets/Avatar.png";
import arrowRight from "assets/chevron-right.png";
import arrowLeft from "assets/chevron-left (1).png";
import plusIcon from "assets/plus.png";
import plusIconOrange from "assets/plus-orange.png";
import {
  message,
  Upload,
  DatePicker,
  Select,
  Switch,
  Collapse,
  ConfigProvider,
  Space,
  Radio,
} from "antd";
import TenantPassportPaymentMethodModal from "Modals/TenantPassportPaymentMethodModal/TenantPassportPaymentMethodModal";
import TenantPassportInvitationSentModal from "Modals/TenantPassportInvitationSentModal/TenantPassportInvitationSentModal";
import fileUploadIcon from "assets/upload-cloud-02-circle.png";
import chevronIcon from "assets/chevron-down.png";
import FileUploader from "Components/FileUploader/FileUploader";
import ProfileUploader from "../ProfileUploader/ProfileUploader";

// const { Dragger } = Upload;

const TenantPassportEditProfile = () => {
  const dateFormat = "MM/DD/YYYY";
  let dropdownIcon;
  dropdownIcon = (
    <>
      <img src={chevronIcon} alt="" />
    </>
  );
  // States start
  const [isHovered, setIsHovered] = useState(false);
  const [addEmployment, setAddEmployment] = useState(false);
  const [addWorkHistory, setAddWorkHistory] = useState(false);
  const [addRentalHistory, setAddRentalHistory] = useState(false);
  const [addRentalHistoryAccordion, setAddRentalHistoryAccordion] =
    useState(false);
  const [value, setValue] = useState();
  const [value2, setValue2] = useState();
  const [value3, setValue3] = useState();
  const [value4, setValue4] = useState();
  const [value5, setValue5] = useState();
  const [value6, setValue6] = useState();
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipCode, setzipCode] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openModalInvitation, setOpenModalInvitation] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formattedNumber, setFormattedNumber] = useState("");
  const [phone, setphone] = useState("");
  const [DeletedImages, setDeletedImages] = useState([]);
  const [Images, setImages] = useState([]);
  // States end

  const handleZipCodeChange = (e) => {
    // Update the state
    if (/^\d{0,5}$/.test(e.target.value)) setzipCode(e.target.value);
  };

  const onChangeRadioRentalHistory = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const onChangeRadioScreeningQuestions1 = (e) => {
    console.log("radio checked", e.target.value);
    setValue2(e.target.value);
  };

  const onChangeRadioScreeningQuestions2 = (e) => {
    console.log("radio checked", e.target.value);
    setValue3(e.target.value);
  };

  const onChangeRadioScreeningQuestions3 = (e) => {
    console.log("radio checked", e.target.value);
    setValue4(e.target.value);
  };

  const onChangeRadioScreeningQuestions4 = (e) => {
    console.log("radio checked", e.target.value);
    setValue5(e.target.value);
  };

  const onChangeRadioScreeningQuestions5 = (e) => {
    console.log("radio checked", e.target.value);
    setValue6(e.target.value);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Modal Function
  const onOpenModal = () => {
    setOpenModal(true);
  };
  const onCloseModal = () => {
    setOpenModal(false);
  };

  // Modal Function
  const onOpenModalInvitation = () => {
    setOpenModalInvitation(true);
  };
  const onCloseModalInvitation = () => {
    setOpenModalInvitation(false);
  };

  // States

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  // Stepper Function
  const handleNext = () => {
    setCurrentStep(currentStep + 1);
    if (currentStep === 5) {
      setCurrentStep(1);
    }
  };
  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };
  const text = `
        Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.
    `;
  const items = [
    {
      key: "1",
      label: "Employer 1",
      children: <p>{text}</p>,
    },
    {
      key: "2",
      label: "Employer 2",
      children: <p>{text}</p>,
    },
    {
      key: "3",
      label: "Employer 3",
      children: <p>{text}</p>,
    },
  ];
  const rentalHistoryItems = [
    {
      key: "1",
      label: "Rental History 1",
      children: <p>{text}</p>,
    },
    {
      key: "2",
      label: "Rental History 2",
      children: <p>{text}</p>,
    },
  ];

  // Formated Phone number

  const handleInputChange = (event) => {
    const input = event.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    const formatted = formatPhoneNumber(input);
    setFormattedNumber(formatted); // Update state with formatted number
    const unformatted = input.slice(0, 10);
    setphone(unformatted); // Update state with unformatted number
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

  const usaStates = [
    { name: "Alabama", abbreviation: "AL" },
    { name: "Alaska", abbreviation: "AK" },
    { name: "Arizona", abbreviation: "AZ" },
    { name: "Arkansas", abbreviation: "AR" },
    { name: "California", abbreviation: "CA" },
    { name: "Colorado", abbreviation: "CO" },
    { name: "Connecticut", abbreviation: "CT" },
    { name: "Delaware", abbreviation: "DE" },
    { name: "Florida", abbreviation: "FL" },
    { name: "Georgia", abbreviation: "GA" },
    { name: "Hawaii", abbreviation: "HI" },
    { name: "Idaho", abbreviation: "ID" },
    { name: "Illinois", abbreviation: "IL" },
    { name: "Indiana", abbreviation: "IN" },
    { name: "Iowa", abbreviation: "IA" },
    { name: "Kansas", abbreviation: "KS" },
    { name: "Kentucky", abbreviation: "KY" },
    { name: "Louisiana", abbreviation: "LA" },
    { name: "Maine", abbreviation: "ME" },
    { name: "Maryland", abbreviation: "MD" },
    { name: "Massachusetts", abbreviation: "MA" },
    { name: "Michigan", abbreviation: "MI" },
    { name: "Minnesota", abbreviation: "MN" },
    { name: "Mississippi", abbreviation: "MS" },
    { name: "Missouri", abbreviation: "MO" },
    { name: "Montana", abbreviation: "MT" },
    { name: "Nebraska", abbreviation: "NE" },
    { name: "Nevada", abbreviation: "NV" },
    { name: "New Hampshire", abbreviation: "NH" },
    { name: "New Jersey", abbreviation: "NJ" },
    { name: "New Mexico", abbreviation: "NM" },
    { name: "New York", abbreviation: "NY" },
    { name: "North Carolina", abbreviation: "NC" },
    { name: "North Dakota", abbreviation: "ND" },
    { name: "Ohio", abbreviation: "OH" },
    { name: "Oklahoma", abbreviation: "OK" },
    { name: "Oregon", abbreviation: "OR" },
    { name: "Pennsylvania", abbreviation: "PA" },
    { name: "Rhode Island", abbreviation: "RI" },
    { name: "South Carolina", abbreviation: "SC" },
    { name: "South Dakota", abbreviation: "SD" },
    { name: "Tennessee", abbreviation: "TN" },
    { name: "Texas", abbreviation: "TX" },
    { name: "Utah", abbreviation: "UT" },
    { name: "Vermont", abbreviation: "VT" },
    { name: "Virginia", abbreviation: "VA" },
    { name: "Washington", abbreviation: "WA" },
    { name: "West Virginia", abbreviation: "WV" },
    { name: "Wisconsin", abbreviation: "WI" },
    { name: "Wyoming", abbreviation: "WY" },
  ];
  return (
    <>
      {openModal === true ? (
        <TenantPassportPaymentMethodModal
          onOpen={onOpenModalInvitation}
          onClose={onCloseModal}
        />
      ) : (
        ""
      )}
      {openModalInvitation === true ? (
        <TenantPassportInvitationSentModal
          success="Share Your Profile"
          route="tenant-passport"
          onClose={onCloseModalInvitation}
        />
      ) : (
        ""
      )}
      <div className="container-fluid bg-white p-3">
        <div className="stepper-container step-container-responsive">
          <div
            className={
              currentStep === 1 ||
                currentStep === 2 ||
                currentStep === 3 ||
                currentStep === 4 ||
                currentStep === 5
                ? "step-1 stepper-active"
                : "step-1 stepper-inactive"
            }
          >
            1 <div className="form-step-text">Edit Profile</div>
          </div>
          <div
            className={
              currentStep === 2 ||
                currentStep === 3 ||
                currentStep === 4 ||
                currentStep === 5
                ? "step-2 stepper-active"
                : "step-2 stepper-inactive"
            }
          >
            2<div className="form-step-text">Employment Verification</div>
          </div>
          <div
            className={
              currentStep === 3 || currentStep === 4 || currentStep === 5
                ? "step-3 stepper-active"
                : "step-3 stepper-inactive"
            }
          >
            3<div className="form-step-text">Rental History</div>
          </div>
          <div
            className={
              currentStep === 4 || currentStep === 5
                ? "step-4 stepper-active"
                : "step-4 stepper-inactive"
            }
          >
            4<div className="form-step-text">Credit & Background check</div>
          </div>
          <div
            className={
              currentStep === 5
                ? "step-5 stepper-active"
                : "step-5 stepper-inactive"
            }
          >
            5<div className="form-step-text"> Screening Questions</div>
          </div>
          <div className="lines tenant-passport-edit-profile">
            <div
              className={`line ${currentStep === 2 ||
                currentStep === 3 ||
                currentStep === 4 ||
                currentStep === 5
                ? "active"
                : ""
                }`}
            ></div>
            <div
              className={`line ${currentStep === 3 || currentStep === 4 || currentStep === 5
                ? "active"
                : ""
                }`}
            ></div>
            <div
              className={`line ${currentStep === 4 || currentStep === 5 ? "active" : ""
                }`}
            ></div>
            <div className={`line ${currentStep === 5 ? "active" : ""}`}></div>
          </div>
        </div>
        {/* <div className="stepper-heading-container mt-3">
          <div className="tenant-passport-stepper-heading">Edit Profile</div>
          <div className="tenant-passport-stepper-heading">
            Employment Verification
          </div>
          <div className="tenant-passport-stepper-heading">Rental History</div>
          <div className="tenant-passport-stepper-heading">
            Credit & Background check
          </div>
          <div className="tenant-passport-stepper-heading">
            Scrtionseening Ques
          </div>
        </div> */}
        <div className="stepper-content-container mt-5">
          {currentStep === 1 && (
            <>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-6 mt-3">
                    <div className="stepper-content d-flex align-items-center">
                      <div className="dragger">
                        <ProfileUploader
                          setImages={setImages}
                          Images={Images}
                          setDeletedImages={setDeletedImages}
                          DeletedImages={DeletedImages}
                        />
                      </div>
                      <p
                        className="
                        ps-3"
                      >
                        Your Photo
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4 mt-3">
                    <span className="tenant-personal-details-title">
                      First Name<span className="input-field-imp-star">*</span>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First Name"
                    />
                  </div>
                  <div className="col-md-4 mt-3">
                    <span className="tenant-personal-details-title">
                      Middle Name<span className="input-field-imp-star">*</span>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Middle Name"
                    />
                  </div>
                  <div className="col-md-4 mt-3">
                    <span className="tenant-personal-details-title">
                      Last Name<span className="input-field-imp-star">*</span>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Last Name"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mt-3">
                    <span className="tenant-personal-details-title">
                      Email<span className="input-field-imp-star">*</span>
                    </span>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                    />
                  </div>
                  <div className="col-md-6 mt-3">
                    <span className="tenant-personal-details-title">
                      Phone No<span className="input-field-imp-star">*</span>
                    </span>
                    <input
                      onChange={handleInputChange}
                      value={formattedNumber}
                      type="text"
                      className="form-control"
                      placeholder="Phone number"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mt-3">
                    <span className="tenant-personal-details-title">
                      Date of Birth
                    </span>
                    <ConfigProvider
                      theme={{
                        components: {
                          DatePicker: {
                            zIndexPopupBase: 99999,
                            colorText: "#667085",
                            colorTextPlaceholder: "#667085",
                            fontFamily: "Montserrat",
                            fontSize: 16,
                            colorPrimaryHover: "#EF6B3E",
                            borderRadius: 4,
                          },
                        },
                      }}
                    >
                      <Space
                        style={{
                          width: "100%",
                          height: 45,
                        }}
                        direction="vertical"
                      >
                        <DatePicker
                          placeholder="Select Date"
                          style={{
                            width: "100%",
                            height: 45,
                          }}
                          format={dateFormat}
                          onChange={onChange}
                          className="lease-date-picker"
                        />
                      </Space>
                    </ConfigProvider>
                  </div>
                  <div className="col-md-6 mt-3">
                    <span className="tenant-personal-details-title">
                      Gender
                    </span>
                    <ConfigProvider
                      theme={{
                        components: {
                          Select: {
                            zIndexPopupBase: 99999,
                            colorText: "#667085",
                            colorTextPlaceholder: "#667085",
                            fontFamily: "Montserrat",
                            fontSize: 16,
                            colorPrimaryHover: "#EF6B3E",
                            optionSelectedBg: "rgba(239, 107, 62, 0.16)",
                            borderRadius: 4,
                          },
                        },
                      }}
                    >
                      <Select
                        placeholder="Select Gender"
                        style={{
                          width: "100%",
                          height: 45,
                        }}
                        onChange={handleChange}
                        options={[
                          {
                            value: "Male",
                            label: "Male",
                          },
                          {
                            value: "Female",
                            label: "Female",
                          },
                        ]}
                      />
                    </ConfigProvider>
                  </div>
                </div>
                <div className="row ">
                  <div className="col-md-6 mt-3">
                    <span className="property-details-input-title">
                      Address Line 1<span className="sign-up-imp-star">*</span>
                    </span>
                    <input
                      onChange={(e) => setAddress1(e.target.value)}
                      type="text"
                      className="form-control"
                      placeholder="Address Line 1"
                    />
                  </div>
                  <div className="col-md-6 mt-3">
                    <span className="property-details-input-title">
                      Address Line 2
                    </span>
                    <input
                      onChange={(e) => setAddress2(e.target.value)}
                      type="text"
                      className="form-control"
                      placeholder="Address Line 2"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3 mt-3">
                    <span className="tenant-personal-details-title">
                      Country<span className="input-field-imp-star">*</span>
                    </span>
                    <ConfigProvider
                      theme={{
                        components: {
                          Select: {
                            zIndexPopupBase: 99999,
                            colorText: "#667085",
                            colorTextPlaceholder: "#667085",
                            colorTextDisabled: "#667085",
                            fontFamily: "Montserrat",
                            fontSize: 16,
                            colorPrimaryHover: "#EF6B3E",
                            optionSelectedBg: "rgba(239, 107, 62, 0.16)",
                            borderRadius: 4,
                          },
                        },
                      }}
                    >
                      <Select
                        suffixIcon={""}
                        placeholder="Select Country"
                        defaultValue={"USA"}
                        style={{
                          width: "100%",
                          height: 45,
                        }}
                        disabled
                        options={[
                          {
                            value: "United States",
                            label: "United States",
                          },
                          {
                            value: "Canada",
                            label: "Canada",
                          },
                        ]}
                      />
                    </ConfigProvider>
                  </div>
                  <div className="col-md-3 mt-3">
                    <span className="property-details-input-title">
                      City<span className="sign-up-imp-star">*</span>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="City"
                    />
                  </div>
                  <div className="col-md-3 mt-3">
                    <span className="tenant-personal-details-title">
                      State<span className="input-field-imp-star">*</span>
                    </span>
                    <ConfigProvider
                      theme={{
                        components: {
                          Select: {
                            zIndexPopupBase: 99999,
                            colorText: "#667085",
                            colorTextPlaceholder: "#667085",
                            fontFamily: "Montserrat",
                            fontSize: 16,
                            colorPrimaryHover: "#EF6B3E",
                            optionSelectedBg: "rgba(239, 107, 62, 0.16)",
                            borderRadius: 4,
                          },
                        },
                      }}
                    >
                      <Select
                        showSearch
                        suffixIcon={dropdownIcon}
                        placeholder="Select State"
                        style={{
                          width: "100%",
                          height: 45,
                        }}
                        options={usaStates.map((e) => {
                          return { value: e.name, label: e.name };
                        })}
                      />
                    </ConfigProvider>
                  </div>
                  <div className="col-md-3 mt-3">
                    <span className="tenant-personal-details-title">
                      Zip code<span className="input-field-imp-star">*</span>
                    </span>
                    <input
                      onChange={handleZipCodeChange}
                      value={zipCode}
                      type="text"
                      className="form-control"
                      maxLength={6}
                      placeholder="Zip code"
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <span className="tenant-personal-details-title">
                      SSN<span className="input-field-imp-star">*</span>
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="SSN"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mt-3">
                    <span className="tenant-personal-details-title">
                      Driver License
                    </span>
                    <ConfigProvider
                      theme={{
                        components: {
                          Select: {
                            zIndexPopupBase: 99999,
                            colorText: "#667085",
                            colorTextPlaceholder: "#667085",
                            fontFamily: "Montserrat",
                            fontSize: 16,
                            colorPrimaryHover: "#EF6B3E",
                            optionSelectedBg: "rgba(239, 107, 62, 0.16)",
                            borderRadius: 4,
                          },
                        },
                      }}
                    >
                      <Select
                        showSearch
                        placeholder="Select Driver License"
                        style={{
                          width: "100%",
                          height: 45,
                        }}
                        options={[
                          {
                            value: "Learning",
                            label: "Learning",
                          },
                          {
                            value: "Permanent",
                            label: "Permanent",
                          },
                        ]}
                      />
                    </ConfigProvider>
                  </div>
                  <div className="col-md-6 mt-3">
                    <span className="tenant-personal-details-title">
                      Driver License Number
                    </span>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter License Number"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
          {currentStep === 2 && (
            <>
              <div
                className={
                  addEmployment === true
                    ? "d-none"
                    : "container-fluid employment-verification-main"
                }
              >
                <div className="row">
                  <div className="col-md-12">
                    <button
                      onClick={() => {
                        setAddEmployment(true);
                      }}
                      className="add-employment-btn-white"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <img
                        src={isHovered ? plusIcon : plusIconOrange}
                        className="add-property-icon-white"
                      />{" "}
                      Add Employment
                    </button>
                  </div>
                </div>
              </div>
              <div
                className={
                  addEmployment === true
                    ? "container-fluid employer-verification-form"
                    : "d-none"
                }
              >
                <div className="row mt-3">
                  <div className="col-md-12 d-flex justify-content-between align-items-center">
                    <p className="employer-verification-form-title">
                      Employer 1
                    </p>
                    <button className="modal-delete-btn next-btn-main">
                      Delete
                    </button>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <span className="tenant-personal-details-title">
                      Job Title<span className="input-field-imp-star">*</span>
                    </span>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <span className="tenant-personal-details-title">
                      Company Name
                      <span className="input-field-imp-star">*</span>
                    </span>
                    <ConfigProvider
                      theme={{
                        components: {
                          Select: {
                            zIndexPopupBase: 99999,
                            colorText: "#667085",
                            colorTextPlaceholder: "#667085",
                            fontFamily: "Montserrat",
                            fontSize: 16,
                            colorPrimaryHover: "#EF6B3E",
                            optionSelectedBg: "rgba(239, 107, 62, 0.16)",
                            borderRadius: 4,
                          },
                        },
                      }}
                    >
                      <Select
                        placeholder="Company Name"
                        style={{
                          width: "100%",
                          height: 45,
                        }}
                        options={[
                          {
                            value: "DigitalTenant",
                            label: "DigitalTenant",
                          },
                          {
                            value: "AirBnb",
                            label: "AirBnb",
                          },
                        ]}
                      />
                    </ConfigProvider>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mt-3">
                    <span className="tenant-personal-details-title">
                      Start Date<span className="input-field-imp-star">*</span>
                    </span>
                    <ConfigProvider
                      theme={{
                        components: {
                          DatePicker: {
                            fontFamily: "Montserrat",
                            fontSize: 16,
                            colorText: "#667085",
                            colorTextPlaceholder: "#667085",
                          },
                        },
                      }}
                    >
                      {/* <DatePicker
                        placeholder="6/1/22"
                        style={{
                          width: "100%",
                          height: 45,
                        }}
                        format={dateFormat}
                        onChange={onChange}
                        className="lease-date-picker"
                      /> */}
                    </ConfigProvider>
                  </div>
                  <div className="col-md-6 mt-3">
                    <span className="tenant-personal-details-title">
                      End Date<span className="input-field-imp-star">*</span>
                    </span>
                    <ConfigProvider
                      theme={{
                        components: {
                          DatePicker: {
                            fontFamily: "Montserrat",
                            fontSize: 16,
                            colorText: "#667085",
                            colorTextPlaceholder: "#667085",
                          },
                        },
                      }}
                    >
                      {/* <DatePicker
                        placeholder="6/1/22"
                        style={{
                          width: "100%",
                          height: 45,
                        }}
                        onChange={onChange}
                        className="lease-date-picker"
                        disabled
                      /> */}
                    </ConfigProvider>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    {/* <ConfigProvider
                      theme={{
                        components: {
                          Switch: {
                            colorPrimary: "#EF6B3E",
                            colorPrimaryHover: "#EF6B3E",
                          },
                        },
                      }}
                    >
                      <span className="d-flex gap-2 employer-switch-text">
                        <Switch onChange={onChange} />
                        This is my current employer
                      </span>
                    </ConfigProvider> */}
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <span className="tenant-personal-details-title">
                      Supervisor Name
                      <span className="input-field-imp-star">*</span>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Supervisor Name"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mt-3">
                    <span className="tenant-personal-details-title">
                      Supervisor Email
                      <span className="input-field-imp-star">*</span>
                    </span>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Supervisor Email"
                    />
                  </div>
                  <div className="col-md-6 mt-3">
                    <span className="tenant-personal-details-title">
                      Supervisor Phone No
                      <span className="input-field-imp-star">*</span>
                    </span>
                    <input
                      onChange={handleInputChange}
                      value={formattedNumber}
                      type="text"
                      className="form-control"
                      placeholder="Phone number"
                    />
                  </div>
                </div>
                <div
                  className={addWorkHistory === true ? "row mt-3" : "d-none"}
                >
                  <div className="col-md-12">
                    <Collapse
                      className="add-work-history-form"
                      accordion
                      items={items}
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <button
                      onClick={() => {
                        setAddWorkHistory(true);
                      }}
                      className="add-employment-btn-white"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <img
                        src={isHovered ? plusIcon : plusIconOrange}
                        className="add-property-icon-white"
                      />{" "}
                      Add Work History
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
          {currentStep === 3 && (
            <>
              <div
                className={
                  addRentalHistory === true
                    ? "d-none"
                    : "container-fluid employment-verification-main"
                }
              >
                <div className="row">
                  <div className="col-md-12">
                    <button
                      onClick={() => {
                        setAddRentalHistory(true);
                      }}
                      className="add-employment-btn-white"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <img
                        src={isHovered ? plusIcon : plusIconOrange}
                        className="add-property-icon-white"
                      />{" "}
                      Add Rental History
                    </button>
                  </div>
                </div>
              </div>
              <div
                className={
                  addRentalHistory === true
                    ? "container-fluid employer-verification-form"
                    : "d-none"
                }
              >
                <div className="row mt-3">
                  <div className="col-md-12">
                    <span className="tenant-personal-details-title">
                      Residence Type
                      <span className="input-field-imp-star">*</span>
                    </span>
                    <ConfigProvider
                      theme={{
                        components: {
                          Select: {
                            fontFamily: "Montserrat",
                            fontSize: 16,
                            colorText: "#667085",
                            colorTextPlaceholder: "#667085",
                          },
                        },
                      }}
                    >
                      <Select
                        placeholder="Select Residence Type"
                        style={{
                          width: "100%",
                          height: 45,
                        }}
                        options={[
                          {
                            value: "I rented this property",
                            label: "I rented this property",
                          },
                          {
                            value: "I owned this property",
                            label: "I owned this property",
                          },
                          {
                            value:
                              "Other(i.e. with family, outside US, college dorms etc)",
                            label:
                              "Other(i.e. with family, outside US, college dorms etc)",
                          },
                        ]}
                      />
                    </ConfigProvider>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mt-3">
                    <span className="tenant-personal-details-title">
                      Street Address
                      <span className="input-field-imp-star">*</span>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Street Address"
                    />
                  </div>
                  <div className="col-md-6 mt-3">
                    <span className="tenant-personal-details-title">
                      Apt or Unit
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Apt or Unit"
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <div className="d-flex align-items-center">
                      <input type="checkbox" className="me-2" />
                      <span className="ms-2 street-address-text">
                        This is my current address
                      </span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mt-3">
                    <span className="tenant-personal-details-title">
                      Move-in Date
                      <span className="input-field-imp-star">*</span>
                    </span>
                    <ConfigProvider
                      theme={{
                        components: {
                          DatePicker: {
                            fontFamily: "Montserrat",
                            fontSize: 16,
                            colorText: "#667085",
                            colorTextPlaceholder: "#667085",
                          },
                        },
                      }}
                    >
                      {/* <DatePicker
                        placeholder="6/1/22"
                        style={{
                          width: "100%",
                          height: 50,
                        }}
                        format={dateFormat}
                        onChange={onChange}
                        className="lease-date-picker"
                      /> */}
                    </ConfigProvider>
                  </div>
                  <div className="col-md-6 mt-3">
                    <span className="tenant-personal-details-title">
                      Expected Move-out Date
                      <span className="input-field-imp-star">*</span>
                    </span>
                    <ConfigProvider
                      theme={{
                        components: {
                          DatePicker: {
                            fontFamily: "Montserrat",
                            fontSize: 16,
                            colorText: "#667085",
                            colorTextPlaceholder: "#667085",
                          },
                        },
                      }}
                    >
                      {/* <DatePicker
                        placeholder="7/31/23"
                        style={{
                          width: "100%",
                          height: 50,
                        }}
                        format={dateFormat}
                        onChange={onChange}
                        className="lease-date-picker"
                      /> */}
                    </ConfigProvider>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <span className="tenant-personal-details-title">
                      Is this reference an individual landlord or a property
                      management company?
                      <span className="input-field-imp-star">*</span>
                    </span>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12 d-flex gap-3">
                    <ConfigProvider
                      theme={{
                        components: {
                          Radio: {
                            colorText: "#344054",
                            colorPrimary: "#EF6B3E",
                            fontFamily: "Montserrat",
                            fontSize: 16,
                          },
                        },
                      }}
                    >
                      <Radio.Group
                        onChange={onChangeRadioRentalHistory}
                        value={value}
                        className="screening-questions-options"
                      >
                        <Radio value={1} style={{ fontWeight: "500" }}>
                          Individual Landlord
                        </Radio>
                        <Radio value={2} style={{ fontWeight: "500" }}>
                          Property Management
                        </Radio>
                      </Radio.Group>
                    </ConfigProvider>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mt-3">
                    <span className="tenant-personal-details-title">
                      First Name<span className="input-field-imp-star">*</span>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First Name"
                    />
                  </div>
                  <div className="col-md-6 mt-3">
                    <span className="tenant-personal-details-title">
                      Monthly Rent Amount
                      <span className="input-field-imp-star">*</span>
                    </span>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Monthly Rent Amount"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mt-3">
                    <span className="tenant-personal-details-title">
                      Email<span className="input-field-imp-star">*</span>
                    </span>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                    />
                  </div>
                  <div className="col-md-6 mt-3">
                    <span className="tenant-personal-details-title">
                      Phone No<span className="input-field-imp-star">*</span>
                    </span>
                    <input
                      onChange={handleInputChange}
                      value={formattedNumber}
                      type="text"
                      className="form-control"
                      placeholder="Phone number"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="dragger">
                      <FileUploader setImages={setImages} Images={Images} />
                      {/* <ConfigProvider
                        theme={{
                          components: {
                            Upload: {
                              // actionsColor: "red"
                              colorPrimaryHover: "#EF6B3E",
                              colorFillAlter: "#F9FAFB",
                              colorBorder: "rgba(147, 145, 141, 0.52)",
                            },
                          },
                        }}
                      >
                        <Dragger
                          multiple
                          action="http://localhost:3000/"
                          listType="picture"
                          accept=".png,.jpg,svg"
                          beforeUpload={(file) => {
                            console.log(file);
                            return false;
                          }}
                          onChange={(dragger) => {
                            console.log(dragger);
                          }}
                        >
                          <p className="ant-upload-drag-icon">
                            <img src={fileUploadIcon} alt="" />
                          </p>
                          <p className="ant-upload-text property-images-file-uploader-text">
                            <span className="property-images-file-uploader-text-unique">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="ant-upload-hint property-images-file-uploader-text">
                            {" "}
                            SVG, PNG, JPG
                          </p>
                        </Dragger>
                      </ConfigProvider> */}
                    </div>
                  </div>
                </div>
                <div
                  className={
                    addRentalHistoryAccordion === true ? "row mt-3" : "d-none"
                  }
                >
                  <div className="col-md-12">
                    <Collapse
                      className="add-work-history-form"
                      accordion
                      items={rentalHistoryItems}
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <button
                      onClick={() => {
                        setAddRentalHistoryAccordion(true);
                      }}
                      className="add-employment-btn-white"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <img
                        src={isHovered ? plusIcon : plusIconOrange}
                        className="add-property-icon-white"
                      />{" "}
                      Add Rental History
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
          {currentStep === 4 && (
            <>
              <div className="container-fluid employment-verification-main">
                <div className="row mt-3">
                  <div className="col-md-12">
                    <span className="tenant-personal-details-title">
                      Yearly Income ($)
                      <span className="input-field-imp-star">*</span>
                    </span>
                    <div className="rent-amount-input-container position-relative">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Yearly Income"
                      />
                      <div className="dollar-yearly-sign-box">$</div>
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <span className="tenant-personal-details-title">
                      Add Details
                    </span>
                    <textarea
                      name=""
                      id=""
                      cols="30"
                      rows="10"
                      className="form-control"
                      placeholder="Add your detail"
                    ></textarea>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <div className="dragger">
                      <FileUploader setImages={setImages} Images={Images} />
                      {/* <ConfigProvider
                        theme={{
                          components: {
                            Upload: {
                              // actionsColor: "red"
                              colorPrimaryHover: "#EF6B3E",
                              colorFillAlter: "#F9FAFB",
                              colorBorder: "rgba(147, 145, 141, 0.52)",
                            },
                          },
                        }}
                      >
                        <Dragger
                          multiple
                          action="http://localhost:3000/"
                          listType="picture"
                          accept=".png,.jpg,svg"
                          beforeUpload={(file) => {
                            console.log(file);
                            return false;
                          }}
                          onChange={(dragger) => {
                            console.log(dragger);
                          }}
                        >
                          <p className="ant-upload-drag-icon">
                            <img src={fileUploadIcon} alt="" />
                          </p>
                          <p className="ant-upload-text property-images-file-uploader-text">
                            <span className="property-images-file-uploader-text-unique">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="ant-upload-hint property-images-file-uploader-text">
                            {" "}
                            SVG, PNG, JPG
                          </p>
                        </Dragger>
                      </ConfigProvider> */}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          {currentStep === 5 && (
            <>
              <div className="container-fluid employment-verification-main">
                <div className="row mt-3">
                  <div className="col-md-12">
                    <p className="screening-questions-main-title">
                      Standard Questions
                    </p>
                    <p className="screening-questions-main-text">
                      Please answer to the best of your ability all of the
                      questions below .
                    </p>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12 d-flex justify-content-between">
                    <div className="screening-questions-text">
                      <span className="tenant-personal-details-title">
                        Do you or anyone else living in the property smoke?
                        <span className="input-field-imp-star">*</span>
                      </span>
                    </div>
                    <div className="d-flex screening-questions-options gap-5">
                      <ConfigProvider
                        theme={{
                          components: {
                            Radio: {
                              colorText: "#344054",
                              colorPrimary: "#EF6B3E",
                              fontFamily: "Montserrat",
                              fontSize: 16,
                            },
                          },
                        }}
                      >
                        <Radio.Group
                          onChange={onChangeRadioScreeningQuestions1}
                          value={value2}
                          className="screening-questions-options d-flex justify-content-center align-items-center gap-3"
                        >
                          <Radio value={2} name="question1">
                            Yes
                          </Radio>
                          <Radio value={3}>No </Radio>
                        </Radio.Group>
                      </ConfigProvider>
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12 d-flex justify-content-between">
                    <div className="screening-questions-text">
                      <span className="tenant-personal-details-title">
                        Have you declared bankruptcy in the last 7 years?
                        <span className="input-field-imp-star">*</span>
                      </span>
                    </div>
                    <div className="d-flex screening-questions-options gap-5">
                      <ConfigProvider
                        theme={{
                          components: {
                            Radio: {
                              colorText: "#344054",
                              colorPrimary: "#EF6B3E",
                              fontFamily: "Montserrat",
                              fontSize: 16,
                            },
                          },
                        }}
                      >
                        <Radio.Group
                          onChange={onChangeRadioScreeningQuestions2}
                          value={value3}
                          className="screening-questions-options d-flex justify-content-center align-items-center gap-3"
                        >
                          <Radio value={2} name="question1">
                            Yes
                          </Radio>
                          <Radio value={3}>No </Radio>
                        </Radio.Group>
                      </ConfigProvider>
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12 d-flex justify-content-between">
                    <div className="screening-questions-text">
                      <span className="tenant-personal-details-title">
                        Have you ever been convicted of a felony?
                        <span className="input-field-imp-star">*</span>
                      </span>
                    </div>
                    <div className="d-flex screening-questions-options gap-5">
                      <ConfigProvider
                        theme={{
                          components: {
                            Radio: {
                              colorText: "#344054",
                              colorPrimary: "#EF6B3E",
                              fontFamily: "Montserrat",
                              fontSize: 16,
                            },
                          },
                        }}
                      >
                        <Radio.Group
                          onChange={onChangeRadioScreeningQuestions3}
                          value={value4}
                          className="screening-questions-options d-flex justify-content-center align-items-center gap-3"
                        >
                          <Radio value={2} name="question1">
                            Yes
                          </Radio>
                          <Radio value={3}>No </Radio>
                        </Radio.Group>
                      </ConfigProvider>
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12 d-flex justify-content-between">
                    <div className="screening-questions-text">
                      <span className="tenant-personal-details-title">
                        Have you ever been evicted?
                        <span className="input-field-imp-star">*</span>
                      </span>
                    </div>
                    <div className="d-flex screening-questions-options gap-5">
                      <ConfigProvider
                        theme={{
                          components: {
                            Radio: {
                              colorText: "#344054",
                              colorPrimary: "#EF6B3E",
                              fontFamily: "Montserrat",
                              fontSize: 16,
                            },
                          },
                        }}
                      >
                        <Radio.Group
                          onChange={onChangeRadioScreeningQuestions4}
                          value={value5}
                          className="screening-questions-options d-flex justify-content-center align-items-center gap-3"
                        >
                          <Radio value={2} name="question1">
                            Yes
                          </Radio>
                          <Radio value={3}>No </Radio>
                        </Radio.Group>
                      </ConfigProvider>
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12 d-flex justify-content-between">
                    <div className="screening-questions-text">
                      <span className="tenant-personal-details-title">
                        Have you ever refused to pay rent when due ?
                        <span className="input-field-imp-star">*</span>
                      </span>
                    </div>
                    <div className="d-flex screening-questions-options gap-5">
                      <ConfigProvider
                        theme={{
                          components: {
                            Radio: {
                              colorText: "#344054",
                              colorPrimary: "#EF6B3E",
                              fontFamily: "Montserrat",
                              fontSize: 16,
                            },
                          },
                        }}
                      >
                        <Radio.Group
                          onChange={onChangeRadioScreeningQuestions5}
                          value={value6}
                          className="screening-questions-options d-flex justify-content-center align-items-center gap-3"
                        >
                          <Radio value={2} name="question1">
                            Yes
                          </Radio>
                          <Radio value={3}>No </Radio>
                        </Radio.Group>
                      </ConfigProvider>
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <textarea
                      name=""
                      id=""
                      cols="30"
                      rows="10"
                      className="form-control mt-3"
                      placeholder="Please provide any additional details to the answers  above. "
                    ></textarea>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="stepper-first-btn d-flex justify-content-between mt-3 gap-1">
          {currentStep === 1 ? (
            <button
              onClick={handleNext}
              className="modal-next-btn next-btn-main w-100"
            >
              Next
              <img src={arrowRight} />
            </button>
          ) : (
            <>
              <button onClick={handlePrev} className="back-prev-btn mt-3">
                <img src={arrowLeft} />
                Back
              </button>
              <button
                onClick={currentStep === 5 ? onOpenModal : handleNext}
                className="next-btn-same-class mt-3"
              >
                {currentStep === 5 ? "Finish" : "Next"}
                <img
                  src={arrowRight}
                  className={currentStep === 5 ? "d-none" : ""}
                />
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default TenantPassportEditProfile;
