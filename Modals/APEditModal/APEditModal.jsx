import React, { useEffect, useState, useRef } from "react";
import { ConfigProvider, Select, Space } from "antd";
import { DatePicker } from "antd";
import chevronIcon from "assets/chevron-down.png";
import { Upload, Radio } from "antd";
import fileUploadIcon from "assets/upload-cloud-02-circle.png";
import calendarIcon from "assets/calendar.png";
import UseGetHook from "Hooks/UseGetHook";
import FileUploader from "Components/FileUploader/FileUploader";
import arrowLeft from "assets/chevron-left (1).png";
import { useNavigate } from "react-router-dom";
import ModalLoader from "Components/GeneralComponents/ModalLoader";

const APEditModal = (onClose, onOpen) => {
  const [notifyTenantChecked, setNotifyTenantChecked] = useState(false);
  const [assigneeChecked, setAssigneeChecked] = useState(false);
  const [Images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [selectedOptions, setselectedOptions] = useState([]);
  const inputRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [inputHeight, setInputHeight] = useState("45px");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [propertyTitle, setPropertyTitle] = useState("");
  const [propertyStatus, setPropertyStatus] = useState("");
  const [propertyBedroom, setPropertyBedroom] = useState("");
  const [propertyBathroom, setPropertyBathroom] = useState("");
  const [propertysqft, setPropertysqft] = useState("");
  const [propertyRentAmount, setPropertyRentAmount] = useState("");
  const [propertyAddress1, setPropertyAddress1] = useState("");
  const [propertyAddress2, setPropertyAddress2] = useState("");
  const [propertyCountry, setPropertyCountry] = useState("");
  const [propertyCity, setPropertyCity] = useState("");
  const [propertyState, setPropertyState] = useState("");
  const [propertyZipcode, setPropertyZipcode] = useState("");
  const [propertyUnit, setPropertyUnit] = useState("");
  const [description, setdescription] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  //   const [currentStep, setCurrentStep] = useState(1);

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
  const handlePrev = () => {
    // setCurrentStep(currentStep - 1);
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

  // Fetch Data
  const { PropertyData, fetchProperty } = UseGetHook("property");
  const { VendorData, fetchVendor } = UseGetHook("vendors");
  useEffect(() => {
    fetchProperty();
    fetchVendor();
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      const numSelectedOptions = selectedOptions.length;
      let inputHeightValue =
        numSelectedOptions >= 8 ? `${numSelectedOptions * 7}px` : "45px";
      if (window.innerWidth <= 375) {
        if (numSelectedOptions >= 4) {
          inputHeightValue = `${numSelectedOptions * 20}px`;
        }
      } else if (window.innerWidth <= 425) {
        if (numSelectedOptions >= 4) {
          inputHeightValue = `${numSelectedOptions * 17}px`;
        }
      } else if (window.innerWidth <= 768) {
        if (numSelectedOptions >= 4) {
          inputHeightValue = `${numSelectedOptions * 11}px`;
        }
      }

      setInputHeight(inputHeightValue);
    }
  }, [selectedOptions, windowWidth]); // Update when selectedOptions change

  // Get Properties
  const config = require("Helpers/config.json");
  // Add Tasks
  const formData = new FormData();

  formData.append("description", Description);
  Images.forEach((img) => {
    formData.append("images", img);
  });
  const handleZipCodeChange = (e) => {
    // Update the state
    if (/^\d{0,5}$/.test(e.target.value)) setPropertyZipcode(e.target.value);
  };
  for (let i = 0; i < selectedOptions.length; i++) {
    formData.append(`amenities[${[i]}]`, selectedOptions[i]);
  }
  // Multi Select
  const [options1, setOptions1] = useState([
    { value: "Addtional Storage", label: "Addtional Storage" },
    { value: "Balcony", label: "Balcony" },
    { value: "Carport", label: "Carport" },
    { value: "Courtyard", label: "Courtyard" },
    { value: "Double Sink Vanity", label: "Double Sink Vanity" },
    { value: "Framed Mirrors", label: "Framed Mirrors" },
    { value: "Handrails", label: "Handrails" },
    { value: "Heat", label: "Heat" },
    { value: "Laminate Counter Tops", label: "Laminate Counter Tops" },
    { value: "Linen Closet", label: "Linen Closet" },
    { value: "Patio", label: "Patio" },
    { value: "Range", label: "Range" },
    { value: "Skylight", label: "Skylight" },
    { value: "View", label: "View" },
    { value: "WD Hookup", label: "WD Hookup" },
  ]);
  const [options2, setOptions2] = useState([
    { value: "Air Conditioner", label: "Air Conditioner" },
    { value: "Cable", label: "Cable" },
    { value: "Ceiling Fan", label: "Ceiling Fan" },
    { value: "Dishwasher", label: "Dishwasher" },
    { value: "Dryer", label: "Dryer" },
    { value: "Furnished", label: "Furnished" },
    { value: "Hardwood Flooring", label: "Hardwood Flooring" },
    {
      value: "Individual Climate Control",
      label: "Individual Climate Control",
    },
    { value: "Vinyl Flooring", label: "Vinyl Flooring" },
    { value: "Microwave", label: "Microwave" },
    { value: "Private Balcony", label: "Private Balcony" },
    { value: "Refrigerator", label: "Refrigerator" },
    { value: "Tile Flooring", label: "Tile Flooring" },
    { value: "Washer", label: "Washer" },
    { value: "Window Coverings", label: "Window Coverings" },
  ]);
  const [option3, setOptions3] = useState([
    { value: "Alarm", label: "Alarm" },
    { value: "Carpet", label: "Carpet" },
    { value: "Controlled Access", label: "Controlled Access" },
    { value: "Disposal", label: "Disposal" },
    { value: "Fireplace", label: "Fireplace" },
    { value: "Garage", label: "Garage" },
    { value: "Hard Surface Counter Tops", label: "Hard Surface Counter Tops" },
    { value: "Island Kitchen", label: "Island Kitchen" },
    { value: "Pantry", label: "Pantry" },
    { value: "Private Patio", label: "Private Patio" },
    { value: "Satellite", label: "Satellite" },
    { value: "Vaulted Ceiling", label: "Vaulted Ceiling" },
    { value: "Wheel Chair", label: "Wheel Chair" },
    { value: "Other", label: "Other" },
  ]);
  const [options4, setOptions4] = useState([
    { value: "Club House", label: "Club House" },
    { value: "Door attendant", label: "Door attendant" },
    { value: "Fitness Center", label: "Fitness Center" },
    { value: "Furnished Available", label: "Furnished Available" },
    { value: "Bilingual", label: "Bilingual" },
  ]);
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

  const addTask = () => {
    fetch(`${config["baseUrl"]}/api/task`, {
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      body: formData,
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.apiCallStatus === "success") {
          console.log(res, "success");
setLoader(true)
        } else {
          console.log(res, "error");
        }
      });
  };
  return (
    <>
      <div className="payment-modal-container">
        <div className="payment-method-modal property-details-view-task-modal">
          <div className="modal-heading d-flex justify-content-between align-items-center p-41 pt-20 property-details-view-add-task-modal-heading-main">
            <h1>Edit Property</h1>
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
          <div className="modal-content-main-section p-41">
            <div className="row ">
              <div className="col-md-12">
                <span className="property-details-input-title">
                  Properties Images
                  <span className="sign-up-imp-star">*</span>
                </span>
                <div className="dragger ">
                  <FileUploader setImages={setImages} Images={Images} />

                  {/* <Dragger
                            multiple
                            action="http://localhost:3000/"
                            listType="picture"
                            accept=".png,.jpg,svg"
                            beforeUpload={(file) => {
                              console.log(file);
                            }}
                            onChange={(dragger) => {
                              setPropertyImg(dragger.fileList);
                              console.log(
                                propertyImg.map((e) => e.originFileObj),
                                "propertyImg"
                              );
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
                         */}
                </div>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-md-12">
                <span className="property-details-input-title">
                  Property Title
                  <span className="sign-up-imp-star">*</span>
                </span>
                <input
                  onChange={(e) => setPropertyTitle(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="Property Title"
                  required="required"
                />
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-12">
                <span className="property-details-input-title">
                  Property Status
                  <span className="sign-up-imp-star">*</span>
                </span>
                <ConfigProvider
                  theme={{
                    components: {
                      Select: {
                        zIndexPopupBase: 99999,
                        colorPrimaryHover: "#EF6B3E",
                        optionSelectedBg: "rgba(239, 107, 62, 0.16)",
                        borderRadius: 4,
                        colorTextPlaceholder: "#667085",
                        fontFamily: "montserrat",
                      },
                    },
                  }}
                >
                  <Select
                    // suffixIcon={dropdownIcon}
                    placeholder="Property Status"
                    className="mt-3"
                    style={{
                      width: "100%",
                      height: 45,
                    }}
                    onChange={(e) => setPropertyStatus(e)}
                    options={[
                      {
                        value: "Active",
                        label: "Active",
                      },
                      {
                        value: "Not Active",
                        label: "InActive",
                      },
                    ]}
                  />
                </ConfigProvider>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-12">
                <span className="property-details-input-title">
                  Select Amenities
                </span>
                <div
                  className="custom-multi-select position-relative"
                  ref={dropdownRef}
                >
                  <input
                    readOnly
                    placeholder={
                      isOpen || selectedOptions.length > 0
                        ? ""
                        : "Select Amenities"
                    }
                    onFocus={() => toggleDropdown()}
                    type="text"
                    className="form-control"
                    style={{ height: inputHeight, maxHeight: "250px" }}
                    ref={inputRef}
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
            <div className="row mt-4">
              <div className="col-md-6">
                <span className="property-details-input-title">
                  Bedroom<span className="sign-up-imp-star">*</span>
                </span>
                <input
                  onChange={(e) => setPropertyBedroom(e.target.value)}
                  type="number"
                  className="form-control"
                  placeholder="Bedroom"
                />
              </div>
              <div className="col-md-6">
                <span className="property-details-input-title">
                  Bathroom<span className="sign-up-imp-star">*</span>
                </span>
                <input
                  onChange={(e) => setPropertyBathroom(e.target.value)}
                  type="number"
                  className="form-control"
                  placeholder="Bathroom"
                />
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-6">
                <span className="property-details-input-title">
                  SQFT<span className="sign-up-imp-star">*</span>
                </span>
                <input
                  onChange={(e) => setPropertysqft(e.target.value)}
                  type="number"
                  className="form-control"
                  placeholder="SQFT"
                />
              </div>
              <div className="col-md-6">
                <span className="property-details-input-title">
                  Rent Amount<span className="sign-up-imp-star">*</span>
                </span>
                <div className="rent-amount-input-container position-relative">
                  <input
                    onChange={(e) => setPropertyRentAmount(e.target.value)}
                    type="number"
                    className="form-control"
                    placeholder="Rent Amount"
                  />
                  <div className="dollar-sign-box">$</div>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-6">
                <span className="property-details-input-title">
                  Address Line 1<span className="sign-up-imp-star">*</span>
                </span>
                <input
                  onChange={(e) => setPropertyAddress1(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="Address Line 1"
                />
              </div>
              <div className="col-md-6">
                <span className="property-details-input-title">
                  Address Line 2
                </span>
                <input
                  onChange={(e) => setPropertyAddress2(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="Address Line 2"
                />
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-3">
                <span className="property-details-input-title">Country</span>
                <ConfigProvider
                  theme={{
                    components: {
                      Select: {
                        zIndexPopupBase: 99999,
                        colorPrimaryHover: "#EF6B3E",
                        optionSelectedBg: "rgba(239, 107, 62, 0.16)",
                        borderRadius: 4,
                        colorTextPlaceholder: "#667085",
                        colorTextDisabled: "#667085",
                        fontFamily: "montserrat",
                      },
                    },
                  }}
                >
                  <Select
                    onChange={(e) => setPropertyCountry(e)}
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
                        value: "USA",
                        label: "USA",
                      },
                      {
                        value: "Canada",
                        label: "Canada",
                      },
                    ]}
                  />
                </ConfigProvider>
              </div>
              <div className="col-md-3">
                <span className="property-details-input-title">
                  City<span className="sign-up-imp-star">*</span>
                </span>
                <input
                  onChange={(e) => setPropertyCity(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="City"
                />
              </div>
              <div className="col-md-3">
                <span className="property-details-input-title">
                  State<span className="sign-up-imp-star">*</span>
                </span>
                <ConfigProvider
                  theme={{
                    components: {
                      Select: {
                        zIndexPopupBase: 99999,
                        colorPrimaryHover: "#EF6B3E",
                        optionSelectedBg: "rgba(239, 107, 62, 0.16)",
                        borderRadius: 4,
                        colorTextPlaceholder: "#667085",
                        fontFamily: "montserrat",
                      },
                    },
                  }}
                >
                  <Select
                    showSearch
                    onChange={(e) => setPropertyState(e)}
                    // suffixIcon={dropdownIcon}
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
              <div className="col-md-3">
                <span className="property-details-input-title">
                  Zip Code<span className="sign-up-imp-star">*</span>
                </span>
                <input
                  onChange={handleZipCodeChange}
                  value={propertyZipcode}
                  type="number"
                  className="form-control"
                  maxLength={5}
                  placeholder="Zip Code"
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <span className="property-details-input-title">
                  Description
                </span>
                <textarea
                  className="form-control"
                  name=""
                  onChange={(e) => setdescription(e.target.value)}
                  id=""
                  cols="30"
                  rows="10"
                ></textarea>
              </div>
            </div>
            {/* <div
              className={
                window.innerWidth <= 768
                  ? "stepper-first-btn property-details-next-btn-main add-property-details-content-btn d-flex  gap-1 justify-content-center mt-5"
                  : "stepper-first-btn property-details-next-btn-main add-property-details-content-btn d-flex justify-content-between gap-1 mt-5"
              } */}
            {/* > */}
            {/* <button
            onClick={() => {
              navigate("/properties-dashboard");
            }}
            className="back-prev-btn"
          >
            Cancel
          </button> */}
            {/* <button className="next-btn-same-class"> */}
            {/* {currentStep === 3 ? "Finish" : "Next"}
            <img
              src={arrowRight}
              className={currentStep === 3 ? "d-none" : ""}
            /> */}
            {/* </button> */}
            {/* </div> */}
          </div>

          <div className="modal-content-footer-section-scroll p-custom">
            <div className="row mt-3">
              <div className="col-md-12 d-flex justify-content-between responsive-direction-column">
                <div className="modal-check-box-container d-flex align-items-center responsive-modal-checkbox">
                  <input
                    onChange={(e) => {
                      setAssigneeChecked(e.target.checked);
                    }}
                    type="checkbox"
                    name=""
                    id=""
                    checked={assigneeChecked}
                    className={
                      assigneeChecked
                        ? "checked me-2"
                        : "me-2 mobile-resp-height-width"
                    }
                  />{" "}
                  <span className="me-2 task-checkbox-text">
                    Notify Assignee
                  </span>
                  <input
                    onChange={(e) => {
                      setNotifyTenantChecked(e.target.checked);
                    }}
                    type="checkbox"
                    name=""
                    id=""
                    checked={notifyTenantChecked}
                    className={
                      notifyTenantChecked
                        ? "checked ms-2"
                        : "me-2 mobile-resp-height-width"
                    }
                  />{" "}
                  <span className="task-checkbox-text">Notify Tenant</span>
                </div>
                <div className="task-modal-footer-btn">
                  <button
                    onClick={() => {
                      addTask();
                      setLoader(true)
                    }}
                    className="modal-save-task-btn"
                  >
                    Save {loader&&<ModalLoader/>}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default APEditModal;
