import { useEffect, useRef, useState } from "react";
import residentialIcon from "assets/country-house 1.png";
import commercialIcon from "assets/commercial-house.png";
import singleFamilyIcon from "assets/country-house 2.png";
import multiFamilyIcon from "assets/country-house 3.png";
import condoIcon from "assets/country-house 3 (1).png";
import townHouseIcon from "assets/country-house 4.png";
import otherIcon from "assets/country-house 1 (1).png";
import officeIcon from "assets/country-house 2 (1).png";
import shoppingCenterIcon from "assets/country-house 3 (2).png";
import storageIcon from "assets/country-house 3 (3).png";
import parkingIcon from "assets/country-house 4 (1).png";
import arrowRight from "assets/chevron-right.png";
import arrowLeft from "assets/chevron-left (1).png";
import { Select, message, ConfigProvider } from "antd";
import PropertyAddSuccessModal from "Modals/PropertyAddSuccessModal/PropertyAddSuccessModal";
import chevronIcon from "assets/chevron-down.png";
import calendarIcon from "assets/calendar.png";
import Loader from "Helpers/Loader";
import FileUploader from "Components/FileUploader/FileUploader";
import UseFormDataHook from "Hooks/UseFormDataHook";
import PurchaseUnit from "Modals/PurchaseUnit/PurchaseUnit";
import UseGetHook from "Hooks/UseGetHook";
import config from 'Helpers/config.json'
const AddPropertyDetails = () => {
  // Choose Property Type states
  const [choosePropertyTypeResidential, setChoosePropertyTypeResidential] =
    useState(false);
  const [choosePropertyTypeCommercial, setChoosePropertyTypeCommercial] =
    useState(false);
  const [residentialSingleFamily, setResidentialSingleFamily] = useState(false);
  const [residentialMultiFamily, setResidentialMultiFamily] = useState(false);
  const [residentialCondo, setResidentialCondo] = useState(false);
  const [residentialTownHouse, setResidentialTownHouse] = useState(false);
  const [residentialOther, setResidentialOther] = useState(false);
  const [commercialOffice, setCommercialOffice] = useState(false);
  const [commercialShoppingCenter, setCommercialShoppingCenter] =
    useState(false);
  const [commercialStorage, setCommercialStorage] = useState(false);
  const [commercialParking, setCommercialParking] = useState(false);
  const [commercialOther, setCommercialOther] = useState(false);
  const [unitValue, setUnitValue] = useState(0);
  // Choose Property Type states end

  // States start
  const [propertyUnit, setPropertyUnit] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [description, setdescription] = useState("");
  const [bedroom, setBedroom] = useState("");
  const [bathroom, setBathroom] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [Images, setImages] = useState([]);
  const [selectedOptions, setselectedOptions] = useState([]);
  const [loader, setLoader] = useState(false);
  const [inputHeight, setInputHeight] = useState("45px");
  const [address2, setAddress2] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [openAccountModal, setOpenAccountModal] = useState(false);
  const { FetchUser, user } = UseGetHook("userinfo");

  useEffect(() => {
    FetchUser();
  }, []);
  const [form, setForm] = useState({
    title: "",
    status: "",

    area: "",
    rent: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (fieldName, value) => {
    setForm({
      ...form,
      [fieldName]: value,
    });
  };
  // States end
  const handleZipCodeChange = (e) => {
    // Update the state
    if (/^\d{0,5}$/.test(e.target.value))
      handleChange("zipCode", e.target.value);
  };
  const preventMinus = (e) => {
    if (e.code === "Minus") {
      e.preventDefault();
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
  // Modal Function
  const onOpenModal = () => {
    setOpenModal(true);
  };
  const onCloseModal = () => {
    setOpenModal(false);
  };
  const onOpenAccountModal = () => {
    setOpenAccountModal(true);
  };
  const onCloseModalWorkOrder = () => {
    setOpenAccountModal(false);
  };
  // Multi Select
  const [options1, setOptions1] = useState([
    { id: "1", value: "Addtional Storage", label: "Addtional Storage" },
    { id: "2", value: "Balcony", label: "Balcony" },
    { id: "3", value: "Carport", label: "Carport" },
    { id: "4", value: "Courtyard", label: "Courtyard" },
    { id: "5", value: "Double Sink Vanity", label: "Double Sink Vanity" },
    { id: "6", value: "Framed Mirrors", label: "Framed Mirrors" },
    { id: "7", value: "Handrails", label: "Handrails" },
    { id: "8", value: "Heat", label: "Heat" },
    { id: "9", value: "Laminate Counter Tops", label: "Laminate Counter Tops" },
    { id: "10", value: "Linen Closet", label: "Linen Closet" },
    { id: "11", value: "Patio", label: "Patio" },
    { id: "12", value: "Range", label: "Range" },
    { id: "13", value: "Skylight", label: "Skylight" },
    { id: "14", value: "View", label: "View" },
    { id: "15", value: "WD Hookup", label: "WD Hookup" },
  ]);
  const [options2, setOptions2] = useState([
    { id: "1", value: "Air Conditioner", label: "Air Conditioner" },
    { id: "2", value: "Cable", label: "Cable" },
    { id: "3", value: "Ceiling Fan", label: "Ceiling Fan" },
    { id: "4", value: "Dishwasher", label: "Dishwasher" },
    { id: "5", value: "Dryer", label: "Dryer" },
    { id: "6", value: "Furnished", label: "Furnished" },
    { id: "7", value: "Hardwood Flooring", label: "Hardwood Flooring" },
    {
      id: "8",
      value: "Individual Climate Control",
      label: "Individual Climate Control",
    },
    { id: "9", value: "Vinyl Flooring", label: "Vinyl Flooring" },
    { id: "10", value: "Microwave", label: "Microwave" },
    { id: "11", value: "Private Balcony", label: "Private Balcony" },
    { id: "12", value: "Refrigerator", label: "Refrigerator" },
    { id: "13", value: "Tile Flooring", label: "Tile Flooring" },
    { id: "14", value: "Washer", label: "Washer" },
    { id: "15", value: "Window Coverings", label: "Window Coverings" },
  ]);
  const [option3, setOptions3] = useState([
    { id: "1", value: "Alarm", label: "Alarm" },
    { id: "2", value: "Carpet", label: "Carpet" },
    { id: "3", value: "Controlled Access", label: "Controlled Access" },
    { id: "4", value: "Disposal", label: "Disposal" },
    { id: "5", value: "Fireplace", label: "Fireplace" },
    { id: "6", value: "Garage", label: "Garage" },
    {
      id: "7",
      value: "Hard Surface Counter Tops",
      label: "Hard Surface Counter Tops",
    },
    { id: "8", value: "Island Kitchen", label: "Island Kitchen" },
    { id: "9", value: "Pantry", label: "Pantry" },
    { id: "10", value: "Private Patio", label: "Private Patio" },
    { id: "11", value: "Satellite", label: "Satellite" },
    { id: "12", value: "Vaulted Ceiling", label: "Vaulted Ceiling" },
    { id: "13", value: "Wheel Chair", label: "Wheel Chair" },
    { id: "14", value: "Other", label: "Other" },
  ]);
  const [options4, setOptions4] = useState([
    { id: "1", value: "Club House", label: "Club House" },
    { id: "2", value: "Door attendant", label: "Door attendant" },
    { id: "3", value: "Fitness Center", label: "Fitness Center" },
    { id: "4", value: "Furnished Available", label: "Furnished Available" },
    { id: "5", value: "Bilingual", label: "Bilingual" },
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
  // Create Property
  const formData = new FormData();
  formData.append("title", form.title);
  formData.append("status", form.status);
  formData.append("address[address_line_1]", form.address);
  formData.append("address[address_line_2]", address2);
  formData.append("address[zipcode]", form.zipCode);
  formData.append("address[state]", form.state);
  formData.append("address[city]", form.city);
  formData.append("address[country]", "USA");
  formData.append("description", description);
  formData.append("bedroom", bedroom);
  formData.append("bathroom", bathroom);
  formData.append("area", form.area);
  formData.append("rent_amount", form.rent);
  formData.append("unit", propertyUnit);
  formData.append(
    "property_type",
    choosePropertyTypeResidential
      ? "residential"
      : choosePropertyTypeCommercial
        ? "commercial"
        : ""
  );
  formData.append(
    "property_sub_type",
    residentialSingleFamily
      ? "single_family"
      : residentialMultiFamily
        ? "multi_family"
        : residentialCondo
          ? "condo"
          : residentialTownHouse
            ? "townhouse"
            : residentialOther
              ? "residential_others"
              : commercialOffice
                ? "office"
                : commercialShoppingCenter
                  ? "shopping_center"
                  : commercialStorage
                    ? "commercial_Storage"
                    : commercialParking
                      ? "parking"
                      : commercialOther
                        ? "commercial_others"
                        : ""
  );
  Images.forEach((img) => {
    formData.append("images", img);
  });
  for (let i = 0; i < selectedOptions.length; i++) {
    formData.append(`amenities[${[i]}]`, selectedOptions[i]);
  }
  const CreateProperty = () => {
    setLoader(true);
    UseFormDataHook("property", formData, onOpenModal, setLoader);
  };
  // Stepper Function
  const handleNext = () => {
    if (currentStep === 1) {
      if (!choosePropertyTypeResidential || !choosePropertyTypeCommercial) {
        if (
          residentialSingleFamily ||
          residentialMultiFamily ||
          residentialCondo ||
          residentialTownHouse ||
          residentialOther ||
          commercialOffice ||
          commercialShoppingCenter ||
          commercialStorage ||
          commercialParking ||
          commercialOther
        ) {
          setCurrentStep(currentStep + 1);
        } else {
          message.error("Please select property type to continue");
        }
      }
    }

    if (currentStep === 2) {
      const newErrors = {};
      for (const key in form) {
        if (form[key] === "") {
          newErrors[key] = `${key} is required`;
        }

      }
      setErrors(newErrors);
      if (Object.keys(newErrors).length === 0 && form.zipCode.length === 5) {
        if (!choosePropertyTypeCommercial && bedroom === "") {
          newErrors["bedroom"] = `Bedroom is required`;
        }
        if (!choosePropertyTypeCommercial && bathroom === "") {
          newErrors["bathroom"] = `Bathroom is required`;
        }
        else {
          setCurrentStep(currentStep + 1);
        }
      } else {
        if (form.zipCode.length !== 5) {
          message.error("ZipCode must be 5 digits");
        }

      }
    }
    if (currentStep === 3) {
      const newErrors = {};
      for (const key in form) {
        if (form[key] === "") {
          newErrors[key] = `${key} is required`;
        }
      }
      setErrors(newErrors);
      if (Object.keys(newErrors).length === 0) {
        CreateProperty();
      }
    }
  };
  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
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
  const purchaseUnit = () => {
    fetch(`${config.baseUrl}/api/stripe/purchaseUnit`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        quantity: unitValue
      })
    }).then(res => {
      return res.json()
    }).then(res => {
      if (res.apiCallStatus === "success") {
        onCloseModalWorkOrder()
        CreateProperty();
      }
      else {
        console.log(res)
      }
    }).catch(error => console.log(error, "error"))
  }
  useEffect(() => {
    // Calculate input height based on the number of selected options
    if (inputRef.current) {
      const numSelectedOptions = selectedOptions.length;
      let inputHeightValue =
        numSelectedOptions >= 8 ? `${numSelectedOptions * 7}px` : "45px";
      if (window.innerWidth <= 375) {
        if (numSelectedOptions >= 3) {
          inputHeightValue = `${numSelectedOptions * 30}px`;
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

  return (
    <>
      {openAccountModal === true ? (
        <PurchaseUnit
          onOpen={onOpenModal}
          onClose={onCloseModalWorkOrder}
          setUnitValue={setUnitValue}
          callBack={purchaseUnit}
          value={unitValue}
        />
      ) : (
        ""
      )}
      {openModal === true && (
        <PropertyAddSuccessModal
          success="Add Bank Account"
          route="all-accounts"
          onClose={onCloseModal}
        />
      )}
      <div className="container-fluid bg-white p-3">
        <div className="container">
          <div className="stepper-container step-container-responsive">
            <div
              className={
                currentStep === 1 || currentStep === 2 || currentStep === 3
                  ? "step-1 property-type stepper-active"
                  : "step-1 property-type stepper-inactive"
              }
            >
              1<div className="form-step-text">Property Type</div>
            </div>
            <div
              className={
                currentStep === 2 || currentStep === 3
                  ? "step-2 property-details stepper-active"
                  : "step-2 property-details stepper-inactive"
              }
            >
              2<div className="form-step-text">Property Details</div>
            </div>
            <div
              className={
                currentStep === 3
                  ? "step-3 unit information stepper-active"
                  : "step-3 unit information stepper-inactive"
              }
            >
              3<div className="form-step-text">Unit Information</div>
            </div>
            <div className="lines-property">
              <div
                className={`line ${currentStep === 2 || currentStep === 3 ? "active" : ""
                  }`}
              ></div>
              <div
                className={`line ${currentStep === 3 ? "active" : ""}`}
              ></div>
            </div>
          </div>
          {/* <div className="stepper-heading-container property-details-stepper-heading-main mt-3">
            <div className="property-details-stepper-heading">
              Property Type
            </div>
            <div className="property-details-stepper-heading">
              Property Details
            </div>
            <div className="property-details-stepper-heading">
              Unit Information
            </div>
          </div> */}
          <div className="stepper-content-container mt-4 add-property-details-stepper-content">
            {currentStep === 1 && (
              <>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="stepper-content d-flex justify-content-between align-items-center">
                        <div className="stepper-content-text-content">
                          <div className="add-property-details-form">
                            <div className="add-property-details-form-title">
                              <p className="add-property-details-form-title-heading">
                                Choose Property Type
                              </p>
                            </div>
                            <div className="add-property-details-form-content">
                              <div
                                onClick={() => {
                                  setChoosePropertyTypeResidential(true);
                                  setChoosePropertyTypeCommercial(false);
                                }}
                                className={
                                  choosePropertyTypeResidential === true
                                    ? "add-property-details-form-content-residential mb-4 mt-4 property-active-form cursor "
                                    : " cursor add-property-details-form-content-residential mb-4 mt-4"
                                }
                              >
                                <div
                                  className={
                                    choosePropertyTypeResidential === true
                                      ? "add-property-details-form-content-residential-icon property-form-icon-active-border"
                                      : "add-property-details-form-content-residential-icon"
                                  }
                                >
                                  <img
                                    src={residentialIcon}
                                    className="add-property-details-icon"
                                  />
                                  <p className="add-property-details-text">
                                    Residential
                                  </p>
                                </div>
                                <div className="add-property-details-form-content-residential-text ms-3">
                                  <p className="add-property-details-form-content-residential-sub-text">
                                    The property itself can be a single-family
                                    home, townhouse, apartment, condominium
                                    unit, duplex, mobile home or even a boat.
                                  </p>
                                </div>
                              </div>
                              <div
                                onClick={() => {
                                  setChoosePropertyTypeResidential(false);
                                  setChoosePropertyTypeCommercial(true);
                                }}
                                className={
                                  choosePropertyTypeCommercial === true
                                    ? "add-property-details-form-content-commercial mb-4 mt-4 property-active-form cursor "
                                    : " cursor add-property-details-form-content-commercial mb-4 mt-4"
                                }
                              >
                                <div
                                  className={
                                    choosePropertyTypeCommercial === true
                                      ? "add-property-details-form-content-commercial-icon property-form-icon-active-border"
                                      : "add-property-details-form-content-commercial-icon"
                                  }
                                >
                                  <img
                                    src={commercialIcon}
                                    className="add-property-details-icon"
                                    alt=""
                                  />
                                  <p className="add-property-details-text">
                                    Commercial
                                  </p>
                                </div>
                                <div className="add-property-details-form-content-commercial-text ms-3">
                                  <p>
                                    Commercial real estate differs from
                                    residential real estate because it has the
                                    potential to generate profit for the
                                    property owner through capital gain or
                                    rental income.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          {choosePropertyTypeResidential === true && (
                            <div className="choose-property-type-residential-options text-center">
                              <div className="choose-property-type-residential-options-title">
                                <p>Which Type Describes Your Property?</p>
                              </div>

                              <div className="choose-property-type-residential-options-icon">
                                <div className="choose-property-type-residential-options-icon-list">
                                  <ul className="d-flex justify-content-between gap-3 md-column">
                                    <li
                                      onClick={() => {
                                        setResidentialSingleFamily(true);
                                        setResidentialMultiFamily(false);
                                        setResidentialCondo(false);
                                        setResidentialTownHouse(false);
                                        setResidentialOther(false);
                                      }}
                                      className="list-style-none cursor"
                                    >
                                      <img src={singleFamilyIcon} alt="" />
                                      <p
                                        className={
                                          residentialSingleFamily === true
                                            ? "property-description-type-text property-description-type-text-active"
                                            : "property-description-type-text"
                                        }
                                      >
                                        Single Family
                                      </p>
                                    </li>
                                    <li
                                      onClick={() => {
                                        setResidentialSingleFamily(false);
                                        setResidentialMultiFamily(true);
                                        setResidentialCondo(false);
                                        setResidentialTownHouse(false);
                                        setResidentialOther(false);
                                      }}
                                      className="list-style-none cursor"
                                    >
                                      <img src={multiFamilyIcon} alt="" />
                                      <p
                                        className={
                                          residentialMultiFamily === true
                                            ? "property-description-type-text property-description-type-text-active"
                                            : "property-description-type-text"
                                        }
                                      >
                                        Multi Family
                                      </p>
                                    </li>
                                    <li
                                      onClick={() => {
                                        setResidentialSingleFamily(false);
                                        setResidentialMultiFamily(false);
                                        setResidentialCondo(true);
                                        setResidentialTownHouse(false);
                                        setResidentialOther(false);
                                      }}
                                      className="list-style-none cursor"
                                    >
                                      <img src={condoIcon} alt="" />
                                      <p
                                        className={
                                          residentialCondo === true
                                            ? "property-description-type-text property-description-type-text-active"
                                            : "property-description-type-text"
                                        }
                                      >
                                        Condo
                                      </p>
                                    </li>
                                    <li
                                      onClick={() => {
                                        setResidentialSingleFamily(false);
                                        setResidentialMultiFamily(false);
                                        setResidentialCondo(false);
                                        setResidentialTownHouse(true);
                                        setResidentialOther(false);
                                      }}
                                      className="list-style-none cursor"
                                    >
                                      <img src={townHouseIcon} alt="" />
                                      <p
                                        className={
                                          residentialTownHouse === true
                                            ? "property-description-type-text property-description-type-text-active"
                                            : "property-description-type-text"
                                        }
                                      >
                                        Townhouse
                                      </p>
                                    </li>
                                    <li
                                      onClick={() => {
                                        setResidentialSingleFamily(false);
                                        setResidentialMultiFamily(false);
                                        setResidentialCondo(false);
                                        setResidentialTownHouse(false);
                                        setResidentialOther(true);
                                      }}
                                      className="list-style-none cursor"
                                    >
                                      <img src={otherIcon} alt="" />
                                      <p
                                        className={
                                          residentialOther === true
                                            ? "property-description-type-text property-description-type-text-active"
                                            : "property-description-type-text"
                                        }
                                      >
                                        Other
                                      </p>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          )}
                          {choosePropertyTypeCommercial === true && (
                            <div className="choose-property-type-residential-options text-center">
                              <div className="choose-property-type-residential-options-title">
                                <p>Which Type Describes Your Property?</p>
                              </div>

                              <div className="choose-property-type-residential-options-icon">
                                <div className="choose-property-type-residential-options-icon-list">
                                  <ul className="d-flex justify-content-between gap-3 md-column">
                                    <li
                                      onClick={() => {
                                        setCommercialOffice(true);
                                        setCommercialShoppingCenter(false);
                                        setCommercialStorage(false);
                                        setCommercialParking(false);
                                        setCommercialOther(false);
                                      }}
                                      className="list-style-none cursor"
                                    >
                                      <img src={officeIcon} alt="" />
                                      <p
                                        className={
                                          commercialOffice === true
                                            ? "property-description-type-text property-description-type-text-active"
                                            : "property-description-type-text"
                                        }
                                      >
                                        Office
                                      </p>
                                    </li>
                                    <li
                                      onClick={() => {
                                        setCommercialOffice(false);
                                        setCommercialShoppingCenter(true);
                                        setCommercialStorage(false);
                                        setCommercialParking(false);
                                        setCommercialOther(false);
                                      }}
                                      className="list-style-none cursor"
                                    >
                                      <img src={shoppingCenterIcon} alt="" />
                                      <p
                                        className={
                                          commercialShoppingCenter === true
                                            ? "property-description-type-text property-description-type-text-active"
                                            : "property-description-type-text"
                                        }
                                      >
                                        Shopping Center
                                      </p>
                                    </li>
                                    <li
                                      onClick={() => {
                                        setCommercialOffice(false);
                                        setCommercialShoppingCenter(false);
                                        setCommercialStorage(true);
                                        setCommercialParking(false);
                                        setCommercialOther(false);
                                      }}
                                      className="list-style-none cursor"
                                    >
                                      <img src={storageIcon} alt="" />
                                      <p
                                        className={
                                          commercialStorage === true
                                            ? "property-description-type-text property-description-type-text-active"
                                            : "property-description-type-text"
                                        }
                                      >
                                        Storage
                                      </p>
                                    </li>
                                    <li
                                      onClick={() => {
                                        setCommercialOffice(false);
                                        setCommercialShoppingCenter(false);
                                        setCommercialStorage(false);
                                        setCommercialParking(true);
                                        setCommercialOther(false);
                                      }}
                                      className="list-style-none cursor"
                                    >
                                      <img src={parkingIcon} alt="" />
                                      <p
                                        className={
                                          commercialParking === true
                                            ? "property-description-type-text property-description-type-text-active"
                                            : "property-description-type-text"
                                        }
                                      >
                                        Parking
                                      </p>
                                    </li>
                                    <li
                                      onClick={() => {
                                        setCommercialOffice(false);
                                        setCommercialShoppingCenter(false);
                                        setCommercialStorage(false);
                                        setCommercialParking(false);
                                        setCommercialOther(true);
                                      }}
                                      className="list-style-none cursor"
                                    >
                                      <img src={otherIcon} alt="" />
                                      <p
                                        className={
                                          commercialOther === true
                                            ? "property-description-type-text property-description-type-text-active"
                                            : "property-description-type-text"
                                        }
                                      >
                                        Other
                                      </p>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          )}
                          <div
                            className={
                              window.innerWidth <= 768
                                ? "stepper-first-btn property-details-next-btn-main add-property-details-content-btn d-flex  gap-3 justify-content-center"
                                : "stepper--first-btn property-details-next-btn-main add-property-details-content-btn d-flex justify-content-between gap-3"
                            }
                          >
                            <button
                              onClick={() => {
                                handleNext();
                              }}
                              className="modal-save-btn w-100 next-btn"
                            >
                              Next
                              <img
                                src={arrowRight}
                                className={currentStep === 3 ? "d-none" : ""}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            {currentStep === 2 && (
              <>
                <div className="container-fluid mt-5 mb-4">
                  <div className="row ">
                    <div className="col-md-12">
                      <span className="property-details-input-title">
                        Properties Images
                      </span>
                      <div className="dragger ">
                        <FileUploader
                          setImages={setImages}
                          property={true}
                          Images={Images}
                        />
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
                        onChange={(e) => handleChange("title", e.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="Property Title"
                        required="required"
                      />
                      {errors.title ? (
                        <span className="text-danger fw-semibold">
                          {errors.title}
                        </span>
                      ) : (
                        ""
                      )}
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
                          suffixIcon={dropdownIcon}
                          placeholder="Property Status"
                          className="mt-3"
                          style={{
                            width: "100%",
                            height: 45,
                          }}
                          onChange={(e) => handleChange("status", e)}
                          options={[
                            {
                              value: "Active",
                              label: "Active",
                            },
                            {
                              value: "InActive",
                              label: "In Active",
                            },
                          ]}
                        />
                      </ConfigProvider>
                      {errors.status ? (
                        <span className="text-danger fw-semibold">
                          {errors.status}
                        </span>
                      ) : (
                        ""
                      )}
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
                          style={{ height: inputHeight }}
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
                                  <div>
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
                                      key={option.id}
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
                                      key={option.id}
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
                                      key={option.id}
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
                  {
                    choosePropertyTypeCommercial ?
                      ""
                      :
                      <>
                        <div className="row mt-4">
                          <div className="col-md-6">
                            <span className="property-details-input-title">
                              Bedrooms<span className="sign-up-imp-star">*</span>
                            </span>
                            <input
                              onChange={(e) =>
                                setBedroom(e.target.value)
                              }
                              type="number"
                              className="form-control"
                              placeholder="Bedrooms"
                              min="0"
                              onKeyPress={preventMinus}
                            />
                            {errors.bedroom ? (
                              <span className="text-danger fw-semibold">
                                {errors.bedroom}
                              </span>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="col-md-6">
                            <span className="property-details-input-title">
                              Bathroom<span className="sign-up-imp-star">*</span>
                            </span>
                            <input
                              onChange={(e) =>
                                setBathroom(e.target.value)
                              }
                              type="number"
                              className="form-control"
                              placeholder="Bathroom"
                              min="0"
                              onKeyPress={preventMinus}
                            />
                            {errors.bathroom ? (
                              <span className="text-danger fw-semibold">
                                {errors.bathroom}
                              </span>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </>
                  }

                  <div className="row mt-4">
                    <div className="col-md-6">
                      <span className="property-details-input-title">
                        SqFt<span className="sign-up-imp-star">*</span>
                      </span>
                      <input
                        onChange={(e) => handleChange("area", e.target.value)}
                        type="number"
                        className="form-control"
                        placeholder="SqFt"
                        min="0"
                        onKeyPress={preventMinus}
                      />
                      {errors.area ? (
                        <span className="text-danger fw-semibold">
                          {errors.area}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="col-md-6">
                      <span className="property-details-input-title">
                        Rent Amount<span className="sign-up-imp-star">*</span>
                      </span>
                      <div className="rent-amount-input-container position-relative">
                        <input
                          onChange={(e) => handleChange("rent", e.target.value)}
                          type="number"
                          className="form-control"
                          placeholder="Rent Amount"
                          min="0"
                          onKeyPress={preventMinus}
                        />
                        <div className="dollar-sign-box">$</div>
                      </div>
                      {errors.rent ? (
                        <span className="text-danger fw-semibold">
                          {errors.rent}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-md-6">
                      <span className="property-details-input-title">
                        Address Line 1
                        <span className="sign-up-imp-star">*</span>
                      </span>
                      <input
                        onChange={(e) =>
                          handleChange("address", e.target.value)
                        }
                        type="text"
                        className="form-control"
                        placeholder="Address Line 1"
                      />
                      {errors.address ? (
                        <span className="text-danger fw-semibold">
                          {errors.address}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="col-md-6">
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
                  <div className="row mt-4">
                    <div className="col-md-3">
                      <span className="property-details-input-title">
                        Country<span className="sign-up-imp-star">*</span>
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
                              colorTextDisabled: "#667085",
                              fontFamily: "montserrat",
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
                        onChange={(e) => handleChange("city", e.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="City"
                      />
                      {errors.city ? (
                        <span className="text-danger fw-semibold">
                          {errors.city}
                        </span>
                      ) : (
                        ""
                      )}
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
                          onChange={(e) => handleChange("state", e)}
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
                      {errors.state ? (
                        <span className="text-danger fw-semibold">
                          {errors.state}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="col-md-3">
                      <span className="property-details-input-title">
                        Zip Code<span className="sign-up-imp-star">*</span>
                      </span>
                      <input
                        onChange={handleZipCodeChange}
                        value={form.zipCode}
                        type="number"
                        className="form-control"
                        maxLength={5}
                        placeholder="Zip Code"
                      />
                      {errors.zipCode ? (
                        <span className="text-danger fw-semibold">
                          {errors.zipCode}
                        </span>
                      ) : (
                        ""
                      )}
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
                  <div
                    className={
                      window.innerWidth <= 768
                        ? "stepper-first-btn property-details-next-btn-main add-property-details-content-btn d-flex  gap-1 justify-content-center mt-5"
                        : "stepper-first-btn property-details-next-btn-main add-property-details-content-btn d-flex justify-content-between gap-1 mt-5"
                    }
                  >
                    <button onClick={handlePrev} className="back-prev-btn mt-3">
                      <img src={arrowLeft} />
                      Back
                    </button>
                    <button
                      onClick={handleNext}
                      className="next-btn-same-class mt-3"
                    >
                      {currentStep === 3 ? "Finish" : "Next"}
                      <img
                        src={arrowRight}
                        className={currentStep === 3 ? "d-none" : ""}
                      />
                    </button>
                  </div>
                </div>
              </>
            )}
            {currentStep === 3 && (
              <>
                {loader ? (
                  <Loader />
                ) : (
                  <>
                    <div className="container-fluid mt-5 mb-4">
                      <div className="row mt-4">
                        <div className="col-md-12">
                          <span className="property-details-input-title">
                            How many units or add unit amount

                          </span>
                          <input
                            onChange={(e) => setPropertyUnit(e.target.value)}
                            type="number"
                            placeholder="Number of Units"
                            className={"form-control"}
                            onKeyPress={preventMinus}
                          />


                        </div>
                      </div>
                      <div
                        className={
                          window.innerWidth <= 768
                            ? "stepper-btn property-details-next-btn-main add-property-details-content-btn d-flex  gap-1 justify-content-center mt-5"
                            : "stepper-btn property-details-next-btn-main add-property-details-content-btn d-flex justify-content-between gap-1 mt-5"
                        }
                      >
                        <button
                          onClick={handlePrev}
                          className="back-prev-btn mt-3"
                        >
                          <img src={arrowLeft} />
                          Back
                        </button>
                        <button
                          onClick={(e) => { user[0]?.paidUnits < propertyUnit ? onOpenAccountModal() : handleNext() }}
                          className="next-btn-same-class mt-3"
                        >
                          Next
                          <img
                            src={arrowRight}
                            className={currentStep === 3 ? "d-none" : ""}
                          />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPropertyDetails;
