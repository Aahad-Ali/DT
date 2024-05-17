import React, { useState, useRef, useEffect, useMemo } from "react";
import chevronIcon from "assets/chevron-down.png";
import FileUploader from "Components/FileUploader/FileUploader";
import { useLocation } from "react-router-dom";
import UseUrlParamsHook from "Hooks/UseUrlParamsHook";
import { message } from "antd";
import ModalLoader from "Components/GeneralComponents/ModalLoader";

const AddUnitDetailsEditModal = ({ onClose, onOpen, setUpdate }) => {
  const [Images, setImages] = useState([]);
  const [DeletedImages, setDeletedImages] = useState([]);
  const [selectedOptions, setselectedOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [inputHeight, setInputHeight] = useState("45px"); // Initial height
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [Data, setData] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [unitData, setUnitData] = useState([]);
  const [sqft, setsqft] = useState("");
  const [bed, setBed] = useState("");
  const [bath, setBath] = useState("");
  const [rentAmount, setRentAmount] = useState("");
  const [description, setdescription] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

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

  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // Calculate input height based on the number of selected options
    if (inputRef.current) {
      const numSelectedOptions = selectedOptions.length;
      let inputHeightValue =
        numSelectedOptions >= 8 ? `${numSelectedOptions * 7}px` : "45px";
      if (window.innerWidth <= 375) {
        if (numSelectedOptions >= 4) {
          inputHeightValue = `${numSelectedOptions * 20}px`;
        }
      } else if (window.innerWidth <= 425) {
        if (numSelectedOptions >= 3) {
          inputHeightValue = `${numSelectedOptions * 25}px`;
        }
      } else if (window.innerWidth <= 768) {
        if (numSelectedOptions >= 4) {
          inputHeightValue = `${numSelectedOptions * 11}px`;
        }
      }

      setInputHeight(inputHeightValue);
    }
  }, [selectedOptions, windowWidth]); // Update when selectedOptions change

  //   const EditUnit = () => {
  //     UseUpdateHook("property", id, formData, onClose);
  //   };

  const search = useLocation().search;
  const { id } = UseUrlParamsHook();
  const property_id = new URLSearchParams(search).get("propertyId");

  const config = require("Helpers/config.json");
  useEffect(() => {
    // Get Property By Id
    fetch(`${config["baseUrl"]}/api/property/${property_id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.apiCallStatus === "success") {
          let temp = [];
          let temp2 = [];
          temp = res.message;
          setData([temp]);
          console.log(res.message.bathroom, "success");
        } else {
          console.log(res, "error");
        }
      });
    // Get Unit By Id
    fetch(`${config["baseUrl"]}/api/unit/${id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.apiCallStatus === "success") {
          let temp = [];
          let temp2 = [];
          temp = res.message;
          temp2 = res.message.amenities;
          setAmenities([...temp2]);
          setUnitData([temp]);
          console.log(res.message, "Unit success");
        } else {
          console.log(res, "error");
        }
      });
  }, []);
  const imageArray = useMemo(() => {
    return unitData[0]?.images || [];
  }, [unitData]);
  useEffect(() => {
    if (imageArray.length > 0) {
      setImages((prev) => [...prev, ...imageArray]);
    }
  }, [imageArray]);

  const editUnit = () => {
    const formData = new FormData();
    if (sqft) formData.append("area", sqft);
    if (bed) formData.append("bedroom", bed);
    if (bath) formData.append("bathroom", bath);
    if (rentAmount) formData.append("rent_amount", rentAmount);
    if (description) formData.append("description", description);
    Images.forEach((img) => {
      formData.append("images", img);
    });
    for (let i = 0; i < selectedOptions.length; i++) {
      formData.append(`amenities[${[i]}]`, selectedOptions[i]);
    }
    if (DeletedImages.length > 0) {
      DeletedImages?.forEach((img, index) => {
        formData.append(`__delete_files[${[index]}]`, img);
      });
    }
    fetch(`${config["baseUrl"]}/api/unit/${id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      body: formData,
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.apiCallStatus === "success") {
          setOpenModal(true);
          setUpdate(true)
          setLoader(true)
          onClose()
          message.success("Unit updated successfully")
        } else {
        }
      });
  };

  return (
    <>
      <div className="payment-modal-container">
        <div className="payment-method-modal property-details-view-task-modal">
          <div className="modal-heading d-flex justify-content-between align-items-center p-41 pt-20 property-details-view-add-task-modal-heading-main">
            <h1>Edit Unit</h1>
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
            <div className="row mt-4">
              <div className="col-md-12">
                <span className="property-details-input-title">
                  Property Title
                </span>
                <input
                  type="text"
                  value={unitData.map((e) => e.property_title)}
                  className="form-control"
                  disabled
                />
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-6">
                <span className="property-details-input-title">
                  Unit Name<span className="sign-up-imp-star">*</span>
                </span>
                <input
                  type="text"
                  value={unitData.map((e) => e.name)}
                  className="form-control"
                  disabled
                />
              </div>
              <div className="col-md-6">
                <span className="property-details-input-title">
                  Rent Amount<span className="sign-up-imp-star">*</span>
                </span>
                <div className="rent-amount-input-container position-relative">
                  <input
                    defaultValue={unitData.map((e) => e.rent_amount)}
                    onChange={(e) => setRentAmount(e.target.value)}
                    type="number"
                    className="form-control"
                    placeholder="Rent Amount"
                  />
                  <div className="dollar-sign-box">$</div>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-4">
                <span className="property-details-input-title">
                  Bedroom<span className="sign-up-imp-star">*</span>
                </span>
                <input
                  defaultValue={unitData.map((e) => e.bedroom)}
                  onChange={(e) => setBed(e.target.value)}
                  type="number"
                  className="form-control"
                  placeholder="Bedroom"
                />
              </div>
              <div className="col-md-4">
                <span className="property-details-input-title">
                  Bathroom<span className="sign-up-imp-star">*</span>
                </span>
                <input
                  defaultValue={unitData.map((e) => e.bathroom)}
                  onChange={(e) => setBath(e.target.value)}
                  type="number"
                  className="form-control"
                  placeholder="Bathroom"
                />
              </div>
              <div className="col-md-4">
                <span className="property-details-input-title">SQFT</span>
                <input
                  defaultValue={unitData.map((e) => e.area)}
                  onChange={(e) => setsqft(e.target.value)}
                  type="number"
                  className="form-control"
                  placeholder="SQFT"
                />
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
                    placeholder={
                      isOpen || selectedOptions.length > 0
                        ? ""
                        : "Select Amenities"
                    }
                    onFocus={() => toggleDropdown()}
                    type="text"
                    className="form-control"
                    style={{ height: inputHeight }}
                    ref={inputRef}
                  />
                  <span className="multi-chevron cursor">
                    <img src={chevronIcon} alt="" />
                  </span>
                  <div className="selected-data d-flex align-items-center gap-3">
                    {selectedOptions.length > 0
                      ? selectedOptions.map((data) => {
                        return (
                          <>
                            <div className="">
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
              <div className="col-md-12">
                <span className="property-details-input-title">
                  Description
                </span>
                <textarea
                  defaultValue={unitData.map((e) => e.description)}
                  onChange={(e) => setdescription(e.target.value)}
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  className="form-control"
                ></textarea>
              </div>
            </div>
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
            <div className="row mt-4">
              <div className="col-md-12">
                <input type="checkbox" className="me-2" name="" id="" />{" "}
                <span className="ms-2">This unit is active</span>
              </div>
            </div>
            <div className="modal-content-footer-section-scroll p-custom">
              <div className="row mt-3">
                <div className="col-md-12 d-flex justify-content-end responsive-direction-column">
                  <div className="task-modal-footer-btn">
                    <button
                      onClick={()=>{
                        editUnit()
                        setLoader(true)
                      }}
                    className="modal-save-task-btn mb-3"
                    >
                    Save {loader&& <ModalLoader/> }
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
    </>
  );
};

export default AddUnitDetailsEditModal;
