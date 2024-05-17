import React, { useEffect, useState, useMemo } from "react";
import { ConfigProvider, Select } from "antd";
import chevronIcon from "assets/chevron-down.png";
import calendarIcon from "assets/calendar.png";
import UseGetHook from "Hooks/UseGetHook";
import { useNavigate } from "react-router-dom";
import ProfileUploader from "Components/ProfileUploader/ProfileUploader";
import UseUpdateHook from "Hooks/UseUpdateHook";
import ModalLoader from "Components/GeneralComponents/ModalLoader";

const AddProspectDetailsEditModal = ({ onClose, onOpen, id, setUpdate }) => {
  const { ProspectData, fetchProspectId } = UseGetHook("prospect", id);
  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    job_title: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    zipcode: "",
    notes: "",
  });
  const prospect = ProspectData.filter((e) => e.id === id);

  const [DeletedImages, setDeletedImages] = useState([]);
  const [ProfileImages, setProfileImages] = useState([]);
  const [formattedNumber, setFormattedNumber] = useState("");
  const [phone, setphone] = useState("");
  const [loader, setLoader] = useState(false);
  const [zipCode, setZipCode] = useState("");

  const navigate = useNavigate();
  const imageArray = useMemo(() => {
    return prospect[0]?.profileImage || [];
  }, [prospect]);
  useEffect(() => {
    if (imageArray.length !== 0) {
      setProfileImages((prev) => [...prev, imageArray]);
    }
  }, [imageArray]);
  // Fetch Data
  useEffect(() => {
    fetchProspectId();
  }, []);
  // Fetch Data End
  // select box icon
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

  // Get Properties
  const config = require("Helpers/config.json");
  // Get Vendors
  // Add Tasks
  const handleForm = (fieldName, value) => {
    setForm((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };
  const formData = new FormData();
  if (form.firstName) formData.append("firstName", form.firstName);
  if (form.middleName) formData.append("middleName", form.middleName);
  if (form.lastName) formData.append("lastName", form.lastName);
  if (form.email) formData.append("email", form.email);
  if (phone) formData.append("phone", phone);
  if (form.company) formData.append("company", form.company);
  if (form.job_title) formData.append("job_title", form.job_title);
  if (form.address1) formData.append("address[address_line_1]", form.address1);
  if (form.address2) formData.append("address[address_line_2]", form.address2);
  if (form.city) formData.append("address[city]", form.city);
  if (form.state) formData.append("address[state]", form.state);
  formData.append("address[country]", "USA");
  if (zipCode) formData.append("address[zipcode]", zipCode);
  if (form.notes) formData.append("notes", form.notes);
  if (ProfileImages.length !== 0)
    formData.append(`profileImage`, ProfileImages);
  if (DeletedImages.length > 0) {
    DeletedImages?.forEach((img, index) => {
      formData.append(`__delete_files[${[index]}]`, img);
    });
  }
  const EditProspect = () => {
    UseUpdateHook("prospect", id, formData, onClose, "", setUpdate,setLoader);
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
    setphone(unformatted); // Update state with unformatted number
  };
  // Multi Select
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
      <div className="payment-modal-container">
        <div className="payment-method-modal property-details-view-task-modal">
          <div className="modal-heading d-flex justify-content-between align-items-center p-41 pt-20 property-details-view-add-task-modal-heading-main">
            <h1>Edit Prospect</h1>
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
            <div className="row  mt-5">
              <div className="col-md-6">
                <div className="stepper-content d-flex gap-2 align-items-center">
                  <div className="dragger">
                    <ProfileUploader
                      setProfileImages={setProfileImages}
                      ProfileImages={ProfileImages}
                      setDeletedImages={setDeletedImages}
                      DeletedImages={DeletedImages}
                    />
                  </div>
                  <p>Your Photo</p>
                </div>
              </div>
              <div className="col-md-6"></div>
            </div>
            <div className="row mt-3">
              <div className="col-md-4">
                <span className="property-details-input-title">
                  First Name
                </span>
                <input
                  defaultValue={prospect[0]?.firstName}
                  onChange={(e) => handleForm("firstName", e.target.value)}
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
                  defaultValue={prospect[0]?.middleName}
                  onChange={(e) => handleForm("middleName", e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="Middle Name"
                />
              </div>
              <div className="col-md-4">
                <span className="property-details-input-title">
                  Last Name
                </span>
                <input
                  defaultValue={prospect[0]?.lastName}
                  onChange={(e) => handleForm("lastName", e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <span className="property-details-input-title">
                  Email
                </span>
                <input
                  defaultValue={prospect[0]?.email}
                  onChange={(e) => handleForm("email", e.target.value)}
                  type="email"
                  className="form-control"
                  placeholder="Email"
                />
              </div>
              <div className="col-md-6">
                <span className="property-details-input-title">
                  Phone No
                </span>
                <input
                  defaultValue={prospect[0]?.phone}
                  onChange={handleInputChange}
                  // value={formattedNumber}
                  type="text"
                  className="form-control"
                  placeholder="Phone number"
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <span className="property-details-input-title">
                  Company
                </span>
                <input
                  defaultValue={prospect[0]?.company}
                  onChange={(e) => handleForm("company", e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="Company"
                />
              </div>
              <div className="col-md-6">
                <span className="property-details-input-title">
                  Job Title
                </span>
                <input
                  defaultValue={prospect[0]?.job_title}
                  onChange={(e) => handleForm("job_title", e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="Job Title"
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <span className="property-details-input-title">
                  Address Line 1
                </span>
                <input
                  defaultValue={prospect[0]?.address.address_line_1}
                  onChange={(e) => handleForm("address1", e.target.value)}
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
                  defaultValue={prospect[0]?.address.address_line_2}
                  onChange={(e) => handleForm("address2", e.target.value)}
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
                    options={[
                      {
                        value: "jack",
                        label: "Jack",
                      },
                      {
                        value: "lucy",
                        label: "Lucy",
                      },
                      {
                        value: "Yiminghe",
                        label: "yiminghe",
                      },
                      {
                        value: "disabled",
                        label: "Disabled",
                        disabled: true,
                      },
                    ]}
                  />
                </ConfigProvider>
              </div>
              <div className="col-md-3">
                <span className="property-details-input-title">
                  City
                </span>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={prospect[0]?.city}
                  onChange={(e) => handleForm("city", e.target.value)}
                  placeholder="City"
                />
              </div>
              <div className="col-md-3">
                <span className="property-details-input-title">
                  State
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
                    //value={state}
                    showSearch
                    suffixIcon={dropdownIcon}
                    placeholder="Select State"
                    style={{
                      width: "100%",
                      height: 45,
                    }}
                    onChange={(e) => handleForm("state", e)}
                    options={usaStates.map((e) => {
                      return { value: e.name, label: e.name };
                    })}
                  />
                </ConfigProvider>
              </div>
              <div className="col-md-3">
                <span className="property-details-input-title">
                  Zip code
                </span>
                <input
                  maxLength={5}
                  onChange={handleZipCodeChange}
                  defaultValue={prospect[0]?.zipCode}
                  type="number"
                  className="form-control"
                  placeholder="Zip code"
                />
              </div>
            </div>
            <div className="row my-3">
              <div className="col-md-12">
                <span className="property-details-input-title">Notes</span>
                <textarea
                  defaultValue={prospect[0]?.notes}
                  onChange={(e) => handleForm("notes", e.target.value)}
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  className="form-control"
                  placeholder="Add your notes"
                ></textarea>
              </div>
            </div>
            <div className="modal-content-footer-section-scroll p-custom">
              <div className="row mt-3">
                <div className="col-md-12 d-flex justify-content-end responsive-direction-column">
                  <div className="task-modal-footer-btn">
                    <button
                      onClick={() => {
                        EditProspect();
                        setLoader(true)
                      }}
                      className="modal-save-task-btn mb-3 d-flex justify-content-center gap-3"
                    >
                      Save {loader && <ModalLoader/>}
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

export default AddProspectDetailsEditModal;
