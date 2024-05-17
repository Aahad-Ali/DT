import React, { useEffect, useRef, useState } from "react";
import {
  message,
  Upload,
  DatePicker,
  Select,
  ConfigProvider,
  Space,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import chevronIcon from "assets/chevron-down.png";
import calendarIcon from "assets/calendar.png";
import FileUploader from "Components/FileUploader/FileUploader";
import ModalLoader from "Components/GeneralComponents/ModalLoader";

const { Dragger } = Upload;

const CompanyProfileSetupModal = ({ onClose, onOpen }) => {
  const dateFormat = "MM/DD/YYYY";
  const [leaseStartDate, setleaseStartDate] = useState("");
  const [Images, setImages] = useState([]);
  const [DeletedImages, setDeletedImages] = useState([]);
  const [selectedOptions, setselectedOptions] = useState([]);
  const [multiValue, setMultiValue] = useState([]);
  const [loader, setLoader] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Drag Drop Function
  const props = {
    name: "file",
    multiple: true,
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    onChange(info) {
      const { status } = info.file;
      console.log(status);
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  const formData = new FormData();
  Images.forEach((file) => {
    formData.append("file", file);
  });

  // Multi Select
  const [options1, setOptions1] = useState([
    { value: "Plumbing", label: "Plumbing" },
    { value: "Renovation", label: "Renovation" },
    { value: "Carpenter", label: "Carpenter" },
    { value: "Construction", label: "Construction" },
    { value: "Plumbing", label: "Plumbing" },
    { value: "Renovation", label: "Renovation" },
    { value: "Construction", label: "Construction" },
    { value: "Painter", label: "Painter" },
  ]);
  const [options2, setOptions2] = useState([
    { value: "Construction", label: "Construction" },
    { value: "Car wash", label: "Car wash" },
    { value: "Carpenter", label: "Carpenter" },
    { value: "Painter", label: "Painter" },
    { value: "Renovation", label: "Renovation" },
    { value: "Construction", label: "Construction" },
    { value: "Painter", label: "Painter" },
    {
      value: "Renovation",
      label: "Renovation",
    },
  ]);
  const [option3, setOptions3] = useState([
    { value: "Construction", label: "Construction" },
    { value: "Painter", label: "Painter" },
    { value: "Per Diem Accepted", label: "Per Diem Accepted" },
    { value: "Racquetball", label: "Racquetball" },
    { value: "Sauna", label: "Sauna" },
    { value: "Construction", label: "Construction" },
    { value: "Construction", label: "Construction" },
    { value: "Construction", label: "Construction" },
  ]);

  const handleCheckboxChange = (value) => {
    console.log("Checkbox with value:", value, "was clicked");
    if (selectedOptions.includes(value)) {
      setselectedOptions(selectedOptions.filter((option) => option !== value));
    } else {
      setselectedOptions([...selectedOptions, value]);
    }
  };
  const removeMultiValue = (value) => {
    console.log(value);
    if (selectedOptions.includes(value)) {
      setselectedOptions(selectedOptions.filter((option) => option !== value));
    } else {
      setselectedOptions([...selectedOptions, value]);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const dropdownRef = useRef(null);
  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  let dropdownIcon;
  dropdownIcon = (
    <>
      <img src={chevronIcon} alt="" />
    </>
  );
  let calendar;
  calendar = (
    <>
      <img src={calendarIcon} alt="" />
    </>
  );

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
      <div className="payment-modal-container">
        <div className="payment-method-modal task-modal">
          <div className="modal-heading d-flex justify-content-between align-items-center p-41 pt-20 pb-20">
            <h1>COMPANY PROFILE SETUP</h1>
          </div>
          <div className="company-profile-setup-content-main">
            <div className="row mt-3">
              <div className="col-md-12">
                <div className="dragger">
                  <FileUploader
                    setImages={setImages}
                    Images={Images}
                    setDeletedImages={setDeletedImages}
                    DeletedImages={DeletedImages}
                  />
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <span className="tenant-personal-details-title">
                  Name<span className="input-field-imp-star">*</span>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <span className="tenant-personal-details-title">
                  Type of Company<span className="input-field-imp-star">*</span>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Sole Proprieter"
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <span className="tenant-personal-details-title">
                  SSN Number<span className="input-field-imp-star">*</span>
                </span>
                <input type="text" className="form-control" />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <span className="tenant-personal-details-title">
                  Doing Business as
                  <span className="input-field-imp-star">
                    <img src="assets/question-markc" alt="" />
                  </span>
                </span>
                <input type="text" className="form-control" />
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-12">
                <span className="property-details-input-title">
                  Services<span className="input-field-imp-star">*</span>
                </span>
                <div
                  className="custom-multi-select position-relative"
                  ref={dropdownRef}
                >
                  <input
                    placeholder={
                      isOpen || selectedOptions.length > 0
                        ? ""
                        : "Select Services"
                    }
                    onFocus={() => toggleDropdown()}
                    type="text"
                    className="form-control"
                  />
                  <span
                    onClick={toggleDropdown}
                    className="multi-chevron cursor"
                  >
                    <img src={chevronIcon} alt="" />
                  </span>
                  <div className="selected-data d-flex align-items-center gap-3">
                    {selectedOptions.length > 0
                      ? selectedOptions.map((data, index) => {
                          return (
                            <>
                              <div className="" key={index + 1}>
                                <span className="select-data-box position-relative">
                                  {data}
                                  <div
                                    onClick={() => {
                                      removeMultiValue(data);
                                    }}
                                    className="cancel-select cursor"
                                  >
                                    <svg
                                      width={16}
                                      height={16}
                                      fill="#EF6B3E"
                                      viewBox="0 0 24 24"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path d="M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0ZM8.693 7.808a.626.626 0 1 0-.885.885L11.116 12l-3.308 3.307a.626.626 0 1 0 .885.885L12 12.884l3.307 3.308a.627.627 0 0 0 .885-.885L12.884 12l3.308-3.307a.627.627 0 0 0-.885-.885L12 11.116 8.693 7.808Z" />
                                    </svg>
                                  </div>
                                </span>
                              </div>
                            </>
                          );
                        })
                      : ""}
                  </div>
                  {isOpen && (
                    <div className="dropdown-options">
                      <div className="row">
                        <div className="col-md-4">
                          <div className="multi-select-options">
                            {options1.map((option) => (
                              <div
                                key={option.value}
                                className="d-flex align-items-center"
                              >
                                <input
                                  type="checkbox"
                                  id={option.value}
                                  value={option.value}
                                  checked={selectedOptions.includes(
                                    option.value
                                  )}
                                  onChange={() =>
                                    handleCheckboxChange(option.value)
                                  }
                                />
                                <label htmlFor={option.value}>
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="multi-select-options">
                            {options2.map((option) => (
                              <div
                                key={option.value}
                                className="d-flex align-items-center"
                              >
                                <input
                                  type="checkbox"
                                  id={option.value}
                                  value={option.value}
                                  checked={selectedOptions.includes(
                                    option.value
                                  )}
                                  onChange={() =>
                                    handleCheckboxChange(option.value)
                                  }
                                />
                                <label htmlFor={option.value}>
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="multi-select-options">
                            {option3.map((option) => (
                              <div
                                key={option.value}
                                className="d-flex align-items-center"
                              >
                                <input
                                  type="checkbox"
                                  id={option.value}
                                  value={option.value}
                                  checked={selectedOptions.includes(
                                    option.value
                                  )}
                                  onChange={() =>
                                    handleCheckboxChange(option.value)
                                  }
                                />
                                <label htmlFor={option.value}>
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <span className="tenant-personal-details-title">
                  Company Description
                </span>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="6"
                  className="form-control"
                ></textarea>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <span className="tenant-personal-details-title">
                  Address
                  <span className="input-field-imp-star">*</span>
                </span>
                <input type="text" className="form-control" />
              </div>
              <div className="col-md-6">
                <span className="tenant-personal-details-title">
                  State<span className="input-field-imp-star">*</span>
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
                    showSearch
                    suffixIcon={dropdownIcon}
                    placeholder="Select State"
                    className=""
                    style={{
                      width: "100%",
                      height: 50,
                    }}
                    options={usaStates.map((e) => {
                      return { value: e.name, label: e.name };
                    })}
                  />
                </ConfigProvider>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <span className="tenant-personal-details-title">
                  Zip code<span className="input-field-imp-star">*</span>
                </span>
                <input
                  type="text"
                  className="form-control"
                  maxLength={6}
                  placeholder="Zip code"
                />
              </div>
              <div className="col-md-6">
                <span className="tenant-personal-details-title">
                  Country<span className="input-field-imp-star">*</span>
                </span>
                <ConfigProvider
                  theme={{
                    components: {
                      Select: {
                        zIndexPopup: 99999,
                      },
                    },
                  }}
                >
                  <Select
                    placeholder="Select Country"
                    className=""
                    style={{
                      width: "100%",
                      height: 50,
                    }}
                    options={usaStates.map((e) => {
                      return { value: e.name, label: e.name };
                    })}
                  />
                </ConfigProvider>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <span className="tenant-personal-details-title">
                  Insurance Detail
                  <span className="input-field-imp-star">*</span>
                </span>
                <input type="text" className="form-control" />
              </div>
              <div className="col-md-6">
                <span className="tenant-personal-details-title">
                  Insurance Expiry
                </span>
                <br />
                <ConfigProvider
                  theme={{
                    components: {
                      DatePicker: {
                        zIndexPopupBase: 99999,
                        colorPrimaryHover: "#EF6B3E",
                        borderRadius: 4,
                        fontFamily: "montserrat",
                      },
                    },
                  }}
                >
                  <Space
                    style={{
                      width: "100%",
                    }}
                    direction="vertical"
                  >
                    <DatePicker
                      suffixIcon={calendar}
                      style={{
                        width: "100%",
                        height: 45,
                      }}
                      onChange={(e) => {
                        const formattedDate = new Date(e).toLocaleDateString();
                        setleaseStartDate(formattedDate);
                      }}
                      className="lease-date-picker"
                      format={dateFormat}
                    />
                  </Space>
                </ConfigProvider>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <span className="tenant-personal-details-title">
                  Insurance Documents
                  <span className="input-field-imp-star">*</span>
                </span>
                <div className="dragger">
                  <FileUploader
                    setImages={setImages}
                    Images={Images}
                    setDeletedImages={setDeletedImages}
                    DeletedImages={DeletedImages}
                  />
                </div>
              </div>
            </div>
            <div className="row mt-3 pb-20">
              <div className="col-md-12 d-flex justify-content-end">
                <button
                  onClick={() => {
                    onOpen();
                    onClose();
                    setLoader(true)
                  }}
                  className="modal-submit-btn next-btn-main"
                >
                  Next {loader&& <ModalLoader/>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyProfileSetupModal;
