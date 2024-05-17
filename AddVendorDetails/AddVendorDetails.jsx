import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ConfigProvider, Select, Space } from "antd";
import { DatePicker } from "antd";
import { message, Radio } from "antd";
import TempModal from "Modals/TempModal/TempModal";
import chevronIcon from "assets/chevron-down.png";
import calendarIcon from "assets/calendar.png";
import ProfileUploader from "../ProfileUploader/ProfileUploader";
import UseFormDataHook from "Hooks/UseFormDataHook";
import UseGetHook from "Hooks/UseGetHook";
const AddVendorDetails = () => {
  const dateFormat = "MM/DD/YYYY";
  // States start
  const [currentStep, setCurrentStep] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [phoneno, setphoneno] = useState("");
  const [mName, setMname] = useState("");
  const [DeletedImages, setDeletedImages] = useState([]);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [country, setCountry] = useState("");
  const [city, setcity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState();
  const [vendorDo, setVendorDo] = useState("");
  const [provider, setProvider] = useState("");
  const [policyNum, setPolicyNum] = useState();
  const [coverage, setCoverage] = useState("");
  const [effectiveDate, setEffectiveDate] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [workAllProperty, setworkAllProperty] = useState("");
  const [vendor1099, setvendor1099] = useState("");
  const [vendorImg, setVendorImg] = useState([]);
  const [formattedNumber, setFormattedNumber] = useState("");
  const [ProfileImages, setProfileImages] = useState([]);
  const { fetchProperty, PropertyData } = UseGetHook("property");
  useEffect(() => {
    fetchProperty();
  }, []);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_no: "",
    company: "",
    address1: "",
    job: "",
    city: "",
    state: "",
    zipCode: "",
  });
  const [insuranceForm, setInsuranceForm] = useState({
    provider: "",
    policyNum: "",
    coverage: "",
    effectiveDate: "",
    expireDate: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (fieldName, value) => {
    setForm({
      ...form,
      [fieldName]: value,
    });
  };
  const handleInsuranceChange = (fieldName, value) => {
    setInsuranceForm({
      ...insuranceForm,
      [fieldName]: value,
    });
  };
  // States end

  const handleZipCodeChange = (e) => {
    // Update the state
    if (/^\d{0,5}$/.test(e.target.value))
      handleChange("zipCode", e.target.value);
  };

  const navigate = useNavigate();
  // Create Vendor
  const config = require("Helpers/config.json");
  const formData = new FormData();
  formData.append("firstName", form.first_name);
  formData.append("middleName", mName);
  formData.append("lastName", form.last_name);
  formData.append("email", form.email);
  formData.append("phone", form.phone_no);
  formData.append("services", vendorDo);
  formData.append("company", form.company);
  formData.append("job_title", form.job);
  formData.append("address[address_line_1]", form.address1);
  formData.append("address[address_line_2]", address2);
  formData.append("address[city]", form.city);
  formData.append("address[state]", form.state);
  formData.append("address[country]", form.country);
  formData.append("address[zipcode]", form.zipCode);
  formData.append("insurance[policy_number]", insuranceForm.policyNum);
  formData.append("insurance[provider]", insuranceForm.provider);
  formData.append("insurance[coverage]", insuranceForm.coverage);
  formData.append("insurance[effective_date]", insuranceForm.effectiveDate);
  formData.append("insurance[expiration_date]", insuranceForm.expireDate);
  formData.append(
    "can_access_all_properties",
    workAllProperty === 1 ? true : false
  );
  formData.append("send_1099_forms", vendor1099 === 1 ? true : false);
  vendorImg.forEach((img) => {
    formData.append("profileImage", img.originFileObj);
  });
  const createVendor = () => {
    UseFormDataHook("vendor", formData, onOpenModal);
  };
  formData.append("profileImage", ProfileImages);
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
  // Stepper Function
  const handleNext = () => {
    if (currentStep === 1) {
      const newErrors = {};
      for (const key in form) {
        if (form[key] === "") {
          newErrors[key] = `${key} is required`;
        }
      }
      setErrors(newErrors);
      if (
        Object.keys(newErrors).length === 0 &&
        form.phone_no.length === 10 &&
        form.zipCode.length === 5
      ) {
        setCurrentStep(currentStep + 1);
      } else {
        if (form.phone_no.length !== 10) {
          message.error("phone number must be 10 digits");
        }
        if (form.zipCode.length !== 5) {
          message.error("ZIpCode must be 5 digits");
        }
      }
    }

    if (currentStep === 2) {
      if (vendorDo === "") {
        message.error("Please fill required fields to continue");
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
    if (currentStep === 3) {
      const newErrors = {};
      for (const key in insuranceForm) {
        if (insuranceForm[key] === "") {
          newErrors[key] = `${key} is required`;
        }
      }
      setErrors(newErrors);
      if (Object.keys(newErrors).length === 0) {
        setCurrentStep(currentStep + 1);
      }
    }
    if (currentStep === 4) {
      if (!workAllProperty) {
        message.error("Please fill required fields to continue");
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
    if (currentStep === 5) {
      if (!vendor1099) {
        message.error("Please fill required fields to continue");
      } else {
        createVendor();
      }
    }
  };
  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };
  // Drag Drop Function

  // Formated Phone number

  const handleInputChange = (event) => {
    const input = event.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    const formatted = formatPhoneNumber(input);
    setFormattedNumber(formatted); // Update state with formatted number
    const unformatted = input.slice(0, 10);
    setphoneno(unformatted); // Update state with unformatted number
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
      {openModal === true && (
        <TempModal
          onClose={onCloseModal}
          title="Vendors added successfully"
          success="Go To Vendors"
          route="all-vendor"
        />
      )}
      <div className="container-fluid bg-white p-3">
        <div className="container">
          <div className="stepper-container step-container-responsive">
            <div
              className={
                currentStep === 1 ||
                currentStep === 2 ||
                currentStep === 3 ||
                currentStep === 4 ||
                currentStep === 5
                  ? "step-1 personal-details stepper-active"
                  : "step-1 personal-details stepper-inactive"
              }
            >
              1 <div className="form-step-text">Personal Details</div>
            </div>
            <div
              className={
                currentStep === 2 ||
                currentStep === 3 ||
                currentStep === 4 ||
                currentStep === 5
                  ? "step-2 services stepper-active"
                  : "step-2 services stepper-inactive"
              }
            >
              2<div className="form-step-text">Services</div>
            </div>
            <div
              className={
                currentStep === 3 || currentStep === 4 || currentStep === 5
                  ? "step-3 insurance stepper-active"
                  : "step-3 insurance stepper-inactive"
              }
            >
              3<div className="form-step-text">Insurance</div>
            </div>
            <div
              className={
                currentStep === 4 || currentStep === 5
                  ? "step-4 properties stepper-active"
                  : "step-4 Properties stepper-inactive"
              }
            >
              4<div className="form-step-text">Properties</div>
            </div>
            <div
              className={
                currentStep === 5
                  ? "step-5 federal-taxes stepper-active"
                  : "step-5 federal-taxes stepper-inactive"
              }
            >
              5<div className="form-step-text">Federal Taxes</div>
            </div>
            <div className="lines-vendor">
              <div
                className={`line ${
                  currentStep === 2 ||
                  currentStep === 3 ||
                  currentStep === 4 ||
                  currentStep === 5
                    ? "active"
                    : ""
                }`}
              ></div>
              <div
                className={`line ${
                  currentStep === 3 || currentStep === 4 || currentStep === 5
                    ? "active"
                    : ""
                }`}
              ></div>
              <div
                className={`line ${
                  currentStep === 4 || currentStep === 5 ? "active" : ""
                }`}
              ></div>
              <div
                className={`line ${currentStep === 5 ? "active" : ""}`}
              ></div>
            </div>
          </div>
          {/* <div className="stepper-heading-container mt-3">
                        <div className="">Personal Details</div>
                        <div className="">Services</div>
                        <div className="">Insurance</div>
                        <div className="">Properties</div>
                        <div className="">Federal Taxes</div>
                    </div> */}
          <div className="stepper-content-container mt-5">
            {currentStep === 1 && (
              <>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="stepper-content d-flex align-items-center">
                        <div className="dragger">
                          <ProfileUploader
                            setProfileImages={setProfileImages}
                            ProfileImages={ProfileImages}
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
                  <div className="row mt-3">
                    <div className="col-md-4">
                      <span className="property-details-input-title">
                        First Name<span className="sign-up-imp-star">*</span>
                      </span>
                      <input
                        value={form.first_name}
                        onChange={(e) =>
                          handleChange("first_name", e.target.value)
                        }
                        type="text"
                        className="form-control"
                        placeholder="First Name"
                      />
                      {errors.first_name && (
                        <span className="text-danger fw-bold">
                          {errors.first_name.split("_").join(" ")}
                        </span>
                      )}
                    </div>
                    <div className="col-md-4">
                      <span className="property-details-input-title">
                        Middle Name
                      </span>
                      <input
                        onChange={(e) => setMname(e.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="Middle Name"
                      />
                    </div>
                    <div className="col-md-4">
                      <span className="property-details-input-title">
                        Last Name<span className="sign-up-imp-star">*</span>
                      </span>
                      <input
                        value={form.last_name}
                        onChange={(e) =>
                          handleChange("last_name", e.target.value)
                        }
                        type="text"
                        className="form-control"
                        placeholder="Last Name"
                      />
                      {errors.last_name && (
                        <span className="text-danger fw-bold">
                          {errors.last_name.split("_").join(" ")}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <span className="property-details-input-title">
                        Email<span className="sign-up-imp-star">*</span>
                      </span>
                      <input
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        type="email"
                        className="form-control"
                        placeholder="Email"
                      />
                      {errors.email && (
                        <span className="text-danger fw-bold">
                          {errors.email.split("_").join(" ")}
                        </span>
                      )}
                    </div>
                    <div className="col-md-6">
                      <span className="property-details-input-title">
                        Phone No<span className="sign-up-imp-star">*</span>
                      </span>
                      <input
                        onChange={(e) => {
                          handleChange("phone_no", e.target.value);
                        }}
                        value={form.formattedNumber}
                        type="tel"
                        className="form-control"
                        placeholder="Phone number"
                        max={10}
                      />
                      {errors.phone_no && (
                        <span className="text-danger fw-bold">
                          {errors.phone_no.split("_").join(" ")}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <span className="property-details-input-title">
                        Company<span className="sign-up-imp-star">*</span>
                      </span>
                      <input
                        value={form.company}
                        onChange={(e) =>
                          handleChange("company", e.target.value)
                        }
                        type="text"
                        className="form-control"
                        placeholder="Company"
                      />
                      {errors.company && (
                        <span className="text-danger fw-bold">
                          {errors.company.split("_").join(" ")}
                        </span>
                      )}
                    </div>
                    <div className="col-md-6">
                      <span className="property-details-input-title">
                        Job Title<span className="sign-up-imp-star">*</span>
                      </span>
                      <input
                        value={form.job}
                        onChange={(e) => handleChange("job", e.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="Job Title"
                      />
                      {errors.job && (
                        <span className="text-danger fw-bold">
                          {errors.job.split("_").join(" ")}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <span className="property-details-input-title">
                        Address Line 1
                        <span className="sign-up-imp-star">*</span>
                      </span>
                      <input
                        value={form.address1}
                        onChange={(e) =>
                          handleChange("address1", e.target.value)
                        }
                        type="text"
                        className="form-control"
                        placeholder="Address Line 1"
                      />
                      {errors.address1 && (
                        <span className="text-danger fw-bold">
                          {errors.address1.split("_").join(" ")}
                        </span>
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
                  <div className="row mt-3">
                    <div className="col-md-3">
                      <span className="property-details-input-title">
                        Country
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
                          onChange={(e) => setCountry(e)}
                          options={[
                            {
                              value: "USA",
                              label: "USA",
                            },
                            {
                              value: "USA",
                              label: "USA",
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
                        value={form.city}
                        onChange={(e) => handleChange("city", e.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="City"
                      />
                      {errors.city && (
                        <span className="text-danger fw-bold">
                          {errors.city.split("_").join(" ")}
                        </span>
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
                          suffixIcon={dropdownIcon}
                          placeholder="Select State"
                          style={{
                            width: "100%",
                            height: 45,
                          }}
                          onChange={(e) => handleChange("state", e)}
                          options={usaStates.map((e) => {
                            return { value: e.name, label: e.name };
                          })}
                        />
                      </ConfigProvider>
                      {errors.state && (
                        <span className="text-danger fw-bold">
                          {errors.state.split("_").join(" ")}
                        </span>
                      )}
                    </div>
                    <div className="col-md-3">
                      <span className="property-details-input-title">
                        Zip code<span className="sign-up-imp-star">*</span>
                      </span>
                      <input
                        onChange={handleZipCodeChange}
                        value={form.zipCode}
                        type="number"
                        className="form-control"
                        placeholder="Zip code"
                      />
                      {errors.zipCode && (
                        <span className="text-danger fw-bold">
                          {errors.zipCode.split("_").join(" ")}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="stepper-first-btn d-flex justify-content-between mt-5">
                    <button
                      onClick={handleNext}
                      className="primary-btn w-100 next-btn"
                    >
                      Next{" "}
                    </button>
                  </div>
                </div>
              </>
            )}
            {currentStep === 2 && (
              <>
                <div className="container-fluid">
                  <div className="row mt-3">
                    <div className="col-md-12">
                      <span className="property-details-input-title">
                        What does this vendor do?
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
                          placeholder="What does this vendor do?"
                          style={{
                            width: "100%",
                            height: 45,
                          }}
                          onChange={(e) => setVendorDo(e)}
                          options={[
                            {
                              value: "Licensed Plumber",
                              label: "Licensed Plumber",
                            },
                            {
                              value: "Licensed Electrician",
                              label: "Licensed Electrician",
                            },
                            {
                              value: "Licensed HVAC Technician",
                              label: "Licensed HVAC Technician",
                            },
                            {
                              value: "Landscaping/Groundskeeping Service",
                              label: "Landscaping/Groundskeeping Service",
                            },
                            {
                              value: "Pest Control Service",
                              label: "Pest Control Service",
                            },
                            {
                              value: "Cleaning Service",
                              label: "Cleaning Service",
                            },
                            {
                              value: "Handyman/General Maintenance Technician",
                              label: "Handyman/General Maintenance Technician",
                            },
                            {
                              value: "Security Service",
                              label: "Security Service",
                            },
                          ]}
                        />
                      </ConfigProvider>
                    </div>
                  </div>
                  <div className="stepper-btn d-flex justify-content-between mt-5 gap-1">
                    <button onClick={handlePrev} className="back-prev-btn mt-3">
                      Back
                    </button>
                    <button
                      onClick={handleNext}
                      className="next-btn-same-class mt-3"
                    >
                      Next{" "}
                    </button>
                  </div>
                </div>
              </>
            )}
            {currentStep === 3 && (
              <>
                <div className="container-fluid">
                  <div className="row mt-3">
                    <div className="col-md-12">
                      <span className="property-details-input-title">
                        Provider<span className="sign-up-imp-star">*</span>
                      </span>
                      <input
                        value={form.provider}
                        onChange={(e) =>
                          handleInsuranceChange("provider", e.target.value)
                        }
                        type="text"
                        className="form-control"
                        placeholder="Provider"
                      />
                      {errors.provider && (
                        <span className="text-danger fw-bold">
                          {errors.provider.split("_").join(" ")}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <span className="property-details-input-title">
                        Policy Number<span className="sign-up-imp-star">*</span>
                      </span>
                      <input
                        value={form.policyNum}
                        onChange={(e) =>
                          handleInsuranceChange("policyNum", e.target.value)
                        }
                        type="number"
                        className="form-control"
                        placeholder="Policy Number"
                      />
                      {errors.policyNum && (
                        <span className="text-danger fw-bold">
                          {errors.policyNum.split("_").join(" ")}
                        </span>
                      )}
                    </div>
                    <div className="col-md-6">
                      <span className="property-details-input-title">
                        Coverage<span className="sign-up-imp-star">*</span>
                      </span>
                      <input
                        value={form.coverage}
                        onChange={(e) =>
                          handleInsuranceChange("coverage", e.target.value)
                        }
                        type="text"
                        className="form-control"
                        placeholder="Coverage"
                      />
                      {errors.coverage && (
                        <span className="text-danger fw-bold">
                          {errors.coverage.split("_").join(" ")}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <span className="property-details-input-title">
                        Effective Date
                        <span className="sign-up-imp-star">*</span>
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
                            style={{
                              width: "100%",
                              height: 45,
                            }}
                            onChange={(e, dateString) => {
                              const formattedDate = new Date(
                                dateString
                              ).toLocaleDateString();
                              handleInsuranceChange(
                                "effectiveDate",
                                formattedDate
                              );
                            }}
                            format={dateFormat}
                            suffixIcon={calendar}
                          />
                        </Space>
                      </ConfigProvider>
                      {errors.effectiveDate && (
                        <span className="text-danger fw-bold">
                          {errors.effectiveDate.split("_").join(" ")}
                        </span>
                      )}
                    </div>
                    <div className="col-md-6">
                      <span className="property-details-input-title">
                        Expiration Date
                        <span className="sign-up-imp-star">*</span>
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
                            onChange={(e, dateString) => {
                              const formattedDate = new Date(
                                dateString
                              ).toLocaleDateString();
                              handleInsuranceChange(
                                "expireDate",
                                formattedDate
                              );
                            }}
                            style={{
                              width: "100%",
                              height: 45,
                            }}
                            format={dateFormat}
                            suffixIcon={calendar}
                          />
                        </Space>
                      </ConfigProvider>
                      {errors.expireDate && (
                        <span className="text-danger fw-bold">
                          {errors.expireDate.split("_").join(" ")}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="stepper-btn d-flex justify-content-between mt-5 gap-1">
                    <button
                      onClick={handlePrev}
                      className="back-prev-btn mt-3 "
                    >
                      Back
                    </button>
                    <button
                      onClick={handleNext}
                      className="next-btn-same-class mt-3"
                    >
                      Next{" "}
                    </button>
                  </div>
                </div>
              </>
            )}
            {currentStep === 4 && (
              <>
                <div className="container-fluid">
                  <div className="row mt-3">
                    <div className="col-md-12">
                      <Radio.Group
                        onChange={(e) => {
                          setworkAllProperty(e.target.value);
                        }}
                        className="d-flex flex-column gap-3"
                      >
                        <ConfigProvider
                          theme={{
                            components: {
                              Radio: {
                                colorPrimary: "#EF6B3E",
                                radioSize: 18,
                                fontSize: 16,
                                fontFamily: "Montserrat",
                              },
                            },
                          }}
                        >
                          <Radio value={1}>
                            This vendor can work on all my properties
                          </Radio>
                        </ConfigProvider>
                        <ConfigProvider
                          theme={{
                            components: {
                              Radio: {
                                colorPrimary: "#EF6B3E",
                                radioSize: 18,
                                fontSize: 16,
                                fontFamily: "Montserrat",
                              },
                            },
                          }}
                        >
                          <Radio value={2}>
                            This vendor can work only on specific properties
                          </Radio>
                        </ConfigProvider>
                      </Radio.Group>
                      {workAllProperty === 2 ? (
                        <>
                          <div className="mt-4">
                            <ConfigProvider
                              theme={{
                                components: {
                                  Select: {
                                    zIndexPopupBase: 99999,
                                    colorPrimaryHover: "#EF6B3E",
                                    optionSelectedBg:
                                      "rgba(239, 107, 62, 0.16)",
                                    borderRadius: 4,
                                    colorTextPlaceholder: "#667085",
                                    fontFamily: "montserrat",
                                  },
                                },
                              }}
                            >
                              <Select
                                mode="multiple"
                                suffixIcon={dropdownIcon}
                                placeholder="Select Property"
                                style={{
                                  width: "100%",
                                  height: 45,
                                }}
                                onChange={(e) => handleChange("state", e)}
                                options={PropertyData.map((e) => {
                                  return { value: e.id, label: e.title };
                                })}
                              />
                            </ConfigProvider>
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="stepper-btn d-flex justify-content-between mt-5 gap-1">
                    <button onClick={handlePrev} className="back-prev-btn mt-3">
                      Back
                    </button>
                    <button
                      onClick={handleNext}
                      className="next-btn-same-class mt-3"
                    >
                      Next{" "}
                    </button>
                  </div>
                </div>
              </>
            )}
            {currentStep === 5 && (
              <>
                <div className="container-fluid">
                  <div className="row mt-3">
                    <div className="col-md-12">
                      <Radio.Group
                        onChange={(e) => setvendor1099(e.target.checked)}
                        className="d-flex flex-column gap-3"
                      >
                        <ConfigProvider
                          theme={{
                            components: {
                              Radio: {
                                colorPrimary: "#EF6B3E",
                                radioSize: 18,
                                fontSize: 16,
                                fontFamily: "Montserrat",
                              },
                            },
                          }}
                        >
                          <Radio value={1}>
                            Do not send 1099 forms to this vendor
                          </Radio>
                        </ConfigProvider>
                        <ConfigProvider
                          theme={{
                            components: {
                              Radio: {
                                colorPrimary: "#EF6B3E",
                                radioSize: 18,
                                fontSize: 16,
                                fontFamily: "Montserrat",
                              },
                            },
                          }}
                        >
                          <Radio value={2}>
                            I want to send 1099 forms to this vendor
                          </Radio>
                        </ConfigProvider>
                      </Radio.Group>
                    </div>
                  </div>
                  <div className="row mt-3"></div>
                  <div className="stepper-btn d-flex justify-content-between mt-5 gap-1 pb-3">
                    <button onClick={handlePrev} className="back-prev-btn mt-3">
                      Back
                    </button>
                    <button
                      onClick={handleNext}
                      className="next-btn-same-class mt-3"
                    >
                      Save{" "}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddVendorDetails;
