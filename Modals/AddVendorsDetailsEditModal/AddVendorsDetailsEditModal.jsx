import React, { useEffect, useState, useRef, useMemo } from "react";
import {
  ConfigProvider,
  Select,
  Upload,
  DatePicker,
  Switch,
  Space,
  Tooltip,
} from "antd";
import chevronIcon from "assets/chevron-down.png";
import calendarIcon from "assets/calendar.png";
import UseGetHook from "Hooks/UseGetHook";
import FileUploader from "Components/FileUploader/FileUploader";
import { useNavigate } from "react-router-dom";
import avatar from "assets/Avatar.png";
import fileUploadIcon from "assets/upload-cloud-02-circle.png";
import helpIcon from "assets/help-circle.png";
import ProfileUploader from "Components/ProfileUploader/ProfileUploader";
import UseUpdateHook from "Hooks/UseUpdateHook";
import ModalLoader from "Components/GeneralComponents/ModalLoader";

const { Dragger } = Upload;

const AddVendorsDetailsEditModal = ({ onClose, onOpen, id, setUpdate }) => {
  const { fetchVendor, VendorData } = UseGetHook("vendor", id);
  const vendor = VendorData.filter((e) => e.id === id);
  const [fName, setFname] = useState("");
  const [mName, setMname] = useState("");
  const [lName, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [job, setJob] = useState("");
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
  const [formattedNumber, setFormattedNumber] = useState("");
  const [phoneno, setphoneno] = useState("");
  const [workAllProperty, setworkAllProperty] = useState("");
  const [vendor1099, setvendor1099] = useState("");
  const [loader, setLoader] = useState(false);
  const [ProfileImages, setProfileImages] = useState([]);

  const config = require("Helpers/config.json");

  let dropdownIcon;
  dropdownIcon = (
    <>
      <img src={chevronIcon} alt="" />
    </>
  );
  const formData = new FormData();
  if (fName) formData.append("firstName", fName);
  if (mName) formData.append("middleName", mName);
  if (lName) formData.append("lastName", lName);
  if (email) formData.append("email", email);
  if (phoneno) formData.append("phone", phoneno);
  if (vendorDo) formData.append("services", vendorDo);
  if (company) formData.append("company", company);
  if (job) formData.append("job_title", job);
  if (address1) formData.append("address[address_line_1]", address1);
  if (address2) formData.append("address[address_line_2]", address2);
  if (city) formData.append("address[city]", city);
  if (state) formData.append("address[state]", state);
  if (country) formData.append("address[country]", country);
  if (zipCode) formData.append("address[zipcode]", zipCode);
  if (policyNum) formData.append("insurance[policy_number]", policyNum);
  if (provider) formData.append("insurance[provider]", provider);
  if (coverage) formData.append("insurance[coverage]", coverage);
  if (effectiveDate)
    formData.append("insurance[effective_date]", effectiveDate);
  if (expireDate) formData.append("insurance[expiration_date]", expireDate);
  if (workAllProperty)
    formData.append(
      "can_access_all_properties",
      workAllProperty === 1 ? true : false
    );
  if (vendor1099)
    formData.append("send_1099_forms", vendor1099 === 1 ? true : false);
  if (ProfileImages.length !== 0)
    formData.append("profileImage", ProfileImages);
  const imageArray = useMemo(() => {
    return vendor[0]?.profileImage || [];
  }, [vendor]);
  useEffect(() => {
    if (imageArray.length > 0) {
      setProfileImages((prev) => [...prev, imageArray]);
    }
  }, [imageArray]);
  useEffect(() => {
    fetchVendor();
  }, []);
  const EditVendor = () => {
    UseUpdateHook("vendor", id, formData, onClose, "", setUpdate, setLoader);
  };
  const handleZipCodeChange = (e) => {
    // Update the state
    if (/^\d{0,5}$/.test(e.target.value)) setZipCode(e.target.value);
  };

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
      <div className="payment-modal-container">
        <div className="payment-method-modal property-details-view-task-modal">
          <div className="modal-heading d-flex justify-content-between align-items-center p-41 pt-20 property-details-view-add-task-modal-heading-main">
            <h1>Edit Vender</h1>
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
            <div className="row">
              <div className="col-md-6">
                <div className="stepper-content d-flex align-items-center">
                  <div className="dragger">
                    <ProfileUploader
                      setProfileImages={setProfileImages}
                      ProfileImages={ProfileImages}
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
                  defaultValue={vendor[0]?.firstName}
                  onChange={(e) => setFname(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="First Name"
                />
              </div>
              <div className="col-md-4">
                <span className="property-details-input-title">
                  Middle Name
                </span>
                <input
                  defaultValue={vendor[0]?.middleName}
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
                  defaultValue={vendor[0]?.lastName}
                  onChange={(e) => setLname(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <span className="property-details-input-title">
                  Email<span className="sign-up-imp-star">*</span>
                </span>
                <input
                  defaultValue={vendor[0]?.email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="form-control"
                  placeholder="Email"
                />
              </div>
              <div className="col-md-6">
                <span className="property-details-input-title">
                  Phone No<span className="sign-up-imp-star">*</span>
                </span>
                <input
                  onChange={handleInputChange}
                  // value={formattedNumber}
                  defaultValue={vendor[0]?.phone}
                  type="text"
                  className="form-control"
                  placeholder="Phone number"
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <span className="property-details-input-title">
                  Company<span className="sign-up-imp-star">*</span>
                </span>
                <input
                  defaultValue={vendor[0]?.company}
                  onChange={(e) => setCompany(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="Company"
                />
              </div>
              <div className="col-md-6">
                <span className="property-details-input-title">
                  Job Title<span className="sign-up-imp-star">*</span>
                </span>
                <input
                  defaultValue={vendor[0]?.job_title}
                  onChange={(e) => setJob(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="Job Title"
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <span className="property-details-input-title">
                  Address Line 1<span className="sign-up-imp-star">*</span>
                </span>
                <input
                  defaultValue={vendor[0]?.address.address_line_1}
                  onChange={(e) => setAddress1(e.target.value)}
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
                  defaultValue={vendor[0]?.address.address_line_2}
                  onChange={(e) => setAddress2(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="Address Line 2"
                />
              </div>
            </div>
            <div className="row mt-3">
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
                  defaultValue={vendor[0]?.address.address_line_1}
                  onChange={(e) => setcity(e.target.value)}
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
                  {
                    vendor.length > 0 ?
                      <>
                        <Select
                          showSearch
                          defaultValue={vendor[0]?.address?.state?.name}
                          suffixIcon={dropdownIcon}
                          placeholder="Select State"
                          style={{
                            width: "100%",
                            height: 45,
                          }}
                          onChange={(e) => setState(e)}
                          options={usaStates.map((e) => {
                            return { value: e.name, label: e.name };
                          })}
                        />
                      </> : <Select
                        showSearch
                        suffixIcon={dropdownIcon}
                        placeholder="Select State"
                        style={{
                          width: "100%",
                          height: 45,
                        }}
                        onChange={(e) => setState(e)}
                        options={usaStates.map((e) => {
                          return { value: e.name, label: e.name };
                        })}
                      />
                  }
                </ConfigProvider>
              </div>
              <div className="col-md-3">
                <span className="property-details-input-title">
                  Zip code<span className="sign-up-imp-star">*</span>
                </span>
                <input
                  //onChange={(e) => setZipCode(e.target.value)}
                  onChange={handleZipCodeChange}
                  defaultValue={vendor[0]?.address?.zipcode?.number}
                  // value={zipCode}
                  type="number"
                  className="form-control"
                  placeholder="Zip code"
                />
              </div>
            </div>
            <div className="modal-content-footer-section-scroll p-custom">
              <div className="row mt-3">
                <div className="col-md-12 d-flex justify-content-end responsive-direction-column">
                  <div className="task-modal-footer-btn">
                    <button
                      onClick={() => {
                        EditVendor();
                        setLoader(true)
                      }}
                      className="modal-save-task-btn mb-3"
                    >
                      Save {loader && <ModalLoader />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddVendorsDetailsEditModal;
