import { useEffect, useState, useRef, useMemo } from "react";
import { ConfigProvider, Select, DatePicker, Space, Tooltip } from "antd";
import chevronIcon from "assets/chevron-down.png";
import calendarIcon from "assets/calendar.png";
import UseGetHook from "Hooks/UseGetHook";
import { useNavigate } from "react-router-dom";
import helpIcon from "assets/help-circle.png";
import ProfileUploader from "Components/ProfileUploader/ProfileUploader";
import UseUpdateHook from "Hooks/UseUpdateHook";
import ModalLoader from "Components/GeneralComponents/ModalLoader";
const AddTenantDetailsEditModal = ({ onClose, onOpen, id, setUpdate }) => {
  const { PropertyData, fetchProperty } = UseGetHook("property");
  const { TenantData, FetchTenantId } = UseGetHook("tenant", id);
  const tenants = TenantData.filter((e) => e.id === id);
  const [ProfileImages, setProfileImages] = useState([]);
  const inputRef = useRef(null);
  const [zipCode, setzipCode] = useState("");
  const [phone, setphone] = useState("");
  const [formattedNumber, setFormattedNumber] = useState("");
  const [property, setproperty] = useState("");
  const [unit, setunit] = useState("");
  const [rollover, setrollover] = useState("");
  const [loader, setLoader] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    dob: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    rentAmount: "",
    leaseStart: "",
    leaseTerm: "",
    leaseEnd: "",
  });
  const navigate = useNavigate();
  const imageArray = useMemo(() => {
    return tenants[0]?.profileImage || [];
  }, [tenants]);
  useEffect(() => {
    if (imageArray.length > 0) {
      setProfileImages((prev) => [...prev, imageArray]);
    }
  }, [imageArray]);
  // Fetch Data
  useEffect(() => {
    fetchProperty();
    FetchTenantId();
  }, []);
  // Fetch Data End
  const dateFormat = "MM/DD/YYYY";
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

  // Remove Vendor
  // Add Tasks
  const formData = new FormData();
  if (form.firstName) formData.append("firstName", form.firstName);
  if (form.middleName) formData.append("middleName", form.middleName);
  if (form.lastName) formData.append("lastName", form.lastName);
  if (form.email) formData.append("email", form.email);
  if (phone) formData.append("phone", phone);
  if (form.dob) formData.append("dob", form.dob);
  if (form.address1) formData.append("address_line_1", form.address1);
  if (form.address2) formData.append("address_line_2", form.address2);
  if (form.city) formData.append("city", form.city);
  if (form.state) formData.append("state", form.state);
  if (zipCode) formData.append("zipcode", zipCode);
  if (property) formData.append("property", property);
  if (unit) formData.append("unit", unit);
  if (form.rentAmount) formData.append(`rent_amount`, form.rentAmount);
  if (form.leaseTerm) formData.append("lease_term", form.leaseTerm);
  if (form.leaseStart)
    formData.append("lease_term_start_date", form.leaseStart);
  if (form.leaseEnd) formData.append("lease_term_end_date", form.leaseEnd);
  if (ProfileImages.length !== 0)
    formData.append(`profileImage`, ProfileImages);
  const handleForm = (fieldName, value) => {
    setForm((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };
  const EditTenant = () => {
    UseUpdateHook("tenant", id, formData, onClose, "landlord", setUpdate, setLoader);
  };
  const handleZipCodeChange = (e) => {
    // Update the state
    if (/^\d{0,5}$/.test(e.target.value)) setzipCode(e.target.value);
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
  const { fetchUnit, UnitData } = UseGetHook("unit", property);
  useEffect(() => {
    fetchProperty();
    if (property !== "") {
      fetchUnit();
    }
  }, [property]);
  const onChangeSwitch = (check) => {
    setrollover(check);
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
      <div className="payment-modal-container">
        <div className="payment-method-modal property-details-view-task-modal">
          <div className="modal-heading d-flex justify-content-between align-items-center p-41 pt-20 property-details-view-add-task-modal-heading-main">
            <h1>Edit Tenant</h1>
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
            <div className="row mt-5">
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
                <span className="tenant-personal-details-title">
                  First Name
                  <span className="input-field-imp-star">*</span>
                </span>
                <input
                  defaultValue={tenants[0]?.firstName}
                  onChange={(e) => handleForm("firstName", e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="First Name"
                />
              </div>
              <div className="col-md-4">
                <span className="tenant-personal-details-title">
                  Middle Name
                </span>
                <input
                  defaultValue={tenants[0]?.middleName}
                  onChange={(e) => handleForm("middleName", e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="Middle Name"
                />
              </div>
              <div className="col-md-4">
                <span className="tenant-personal-details-title">
                  Last Name<span className="input-field-imp-star">*</span>
                </span>
                <input
                  defaultValue={tenants[0]?.lastName}
                  onChange={(e) => handleForm("lastName", e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-4">
                <span className="tenant-personal-details-title">
                  Email<span className="input-field-imp-star">*</span>
                </span>
                <input
                  defaultValue={tenants[0]?.email}
                  onChange={(e) => handleForm("email", e.target.value)}
                  type="email"
                  className="form-control"
                  placeholder="Email"
                />
              </div>
              <div className="col-md-4">
                <span className="tenant-personal-details-title">
                  Phone No<span className="input-field-imp-star">*</span>
                </span>
                <input
                  defaultValue={tenants[0]?.phone}
                  onChange={handleInputChange}
                  // value={formattedNumber}
                  type="text"
                  className="form-control"
                  placeholder="Phone number"
                />
              </div>
              <div className="col-md-4">
                <span className="tenant-personal-details-title">
                  Date of Birth
                  <span className="input-field-imp-star">*</span>
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
                      placeholder="Select Date"
                      style={{
                        width: "100%",
                        height: 45,
                      }}
                      onChange={(e) => {
                        const formattedDate = new Date(e).toLocaleDateString();
                        handleForm("dob", formattedDate);
                      }}
                      className="lease-date-picker"
                    />
                  </Space>
                </ConfigProvider>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <span className="property-details-input-title">
                  Address Line 1<span className="sign-up-imp-star">*</span>
                </span>
                <input
                  defaultValue={tenants[0]?.address}
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
                  value={form.address2}
                  onChange={(e) => handleForm("address2", e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="Address Line 2"
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-3">
                <span className="tenant-personal-details-title">
                  Country<span className="input-field-imp-star">*</span>
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
              <div className="col-md-3">
                <span className="property-details-input-title">
                  City<span className="sign-up-imp-star">*</span>
                </span>
                <input
                  defaultValue={tenants[0]?.city}
                  onChange={(e) => handleForm("city", e.target.value)}
                  type="text"
                  placeholder="City"
                  className="form-control"
                />
              </div>
              <div className="col-md-3">
                <span className="tenant-personal-details-title">
                  State<span className="input-field-imp-star">*</span>
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
                    tenants.length > 0 ?
                      <>
                        <Select
                          showSearch
                          // value={state}
                          placeholder="Select State"
                          defaultValue={tenants[0]?.state}
                          suffixIcon={dropdownIcon}
                          style={{
                            width: "100%",
                            height: 45,
                          }}
                          options={usaStates.map((e) => {
                            return { value: e.name, label: e.name };
                          })}
                          onChange={(e) => handleForm("state", e)}
                        />
                      </>
                      :
                      <Select
                        showSearch
                        // value={state}
                        placeholder="Select State"
                        suffixIcon={dropdownIcon}
                        style={{
                          width: "100%",
                          height: 45,
                        }}
                        options={usaStates.map((e) => {
                          return { value: e.name, label: e.name };
                        })}
                        onChange={(e) => handleForm("state", e)}
                      />
                  }
                </ConfigProvider>
              </div>
              <div className="col-md-3">
                <span className="tenant-personal-details-title">
                  Zip code<span className="input-field-imp-star">*</span>
                </span>
                <input
                  onChange={handleZipCodeChange}
                  defaultValue={tenants[0]?.zipcode}
                  type="number"
                  className="form-control"
                  placeholder="Zip code"
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <span className="tenant-personal-details-title">
                  Property<span className="input-field-imp-star">*</span>
                  <Tooltip title="User cannot add a tenant until they have added a property and units">
                    <img src={helpIcon} alt="" className="cursor" />
                  </Tooltip>
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
                    tenants.length > 0 ?
                      <>
                        <Select
                          suffixIcon={dropdownIcon}
                          placeholder="Select Property"
                          defaultValue={{
                            label: PropertyData[0]?.title,
                            value: PropertyData[0]?.title,
                          }}
                          style={{
                            width: "100%",
                            height: 45,
                          }}
                          options={PropertyData.map((e) => {
                            return { value: e.id, label: e.title };
                          })}
                          onChange={(e) => setproperty(e)}
                        />
                      </>
                      : <Select
                        suffixIcon={dropdownIcon}
                        placeholder="Select Property"
                        defaultValue={{
                          label: PropertyData[0]?.title,
                          value: PropertyData[0]?.title,
                        }}
                        style={{
                          width: "100%",
                          height: 45,
                        }}
                        options={PropertyData.map((e) => {
                          return { value: e.id, label: e.title };
                        })}
                        onChange={(e) => setproperty(e)}
                      />
                  }
                </ConfigProvider>
              </div>
              <div className="col-md-6">
                <span className="tenant-personal-details-title">
                  Units<span className="input-field-imp-star">*</span>
                  <Tooltip title="User cannot add a tenant until they have added a property and units">
                    <img src={helpIcon} alt="" className="cursor" />
                  </Tooltip>
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
                    tenants.length > 0 ? <>

                      <Select
                        defaultValue={{
                          label: UnitData[0]?.name,
                          value: UnitData[0]?.name,
                        }}
                        suffixIcon={dropdownIcon}
                        placeholder="Select units"
                        style={{
                          width: "100%",
                          height: 45,
                        }}
                        options={UnitData.map((e) => {
                          return { value: e.id, label: e.name };
                        })}
                        onChange={(e) => setunit(e)}
                      /></>
                      : <Select
                        defaultValue={{
                          label: UnitData[0]?.name,
                          value: UnitData[0]?.name,
                        }}
                        suffixIcon={dropdownIcon}
                        placeholder="Select units"
                        style={{
                          width: "100%",
                          height: 45,
                        }}
                        options={UnitData.map((e) => {
                          return { value: e.id, label: e.name };
                        })}
                        onChange={(e) => setunit(e)}
                      />
                  }
                  {
                    console.log(UnitData, 'hfghs')
                  }
                </ConfigProvider>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <span className="tenant-personal-details-title">
                  Rent Amount
                  <span className="input-field-imp-star">*</span>
                </span>
                <div className="rent-amount-input-container position-relative">
                  <input
                    defaultValue={tenants[0]?.additional_info.lease.rent_amount}
                    onChange={(e) => handleForm("rentAmount", e.target.value)}
                    type="number"
                    className="form-control"
                    placeholder="Rent Amount"
                  />
                  <div className="dollar-sign-box">$</div>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-4">
                <span className="tenant-personal-details-title">
                  Lease Term
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
                    tenants.length > 0 ?
                      <>
                        <Select
                          defaultValue={tenants[0]?.additional_info?.lease?.lease_term}
                          onChange={(e) => handleForm("leaseTerm", e)}
                          suffixIcon={dropdownIcon}
                          placeholder="Select Lease Term"
                          style={{
                            width: "100%",
                            height: 45,
                          }}
                          options={[
                            {
                              value: "Fixed Term",
                              label: "Fixed Term",
                            },
                            {
                              value: "Month-to-Month",
                              label: "Month-to-Month",
                            },
                          ]}
                        />
                      </> : 
                      <Select
                        onChange={(e) => handleForm("leaseTerm", e)}
                        suffixIcon={dropdownIcon}
                        placeholder="Select Lease Term"
                        style={{
                          width: "100%",
                          height: 45,
                        }}
                        options={[
                          {
                            value: "Fixed Term",
                            label: "Fixed Term",
                          },
                          {
                            value: "Month-to-Month",
                            label: "Month-to-Month",
                          },
                        ]}
                      />
                    }
                    {console.log(tenants,"tenants")}
                </ConfigProvider>
              </div>
              <div className="col-md-4">
                <span className="tenant-personal-details-title">
                  Lease Term Start Date
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
                {
                  tenants.length>0?
                 <>
                  <Space
                  style={{
                    width: "100%",
                  }}
                  direction="vertical"
                >
                  <DatePicker
                    suffixIcon={calendar}
                    placeholder="Select Start Date"
                    style={{
                      width: "100%",
                      height: 45,
                    }}
                    onChange={(e) => {
                      const formattedDate = new Date(e).toLocaleDateString();
                      handleForm("leaseStart", formattedDate);
                    }}
                    className="lease-date-picker"
                    format={dateFormat}
                  />
                </Space>
                 </>
                :
                <Space
                style={{
                  width: "100%",
                }}
                direction="vertical"
              >
                <DatePicker
                  suffixIcon={calendar}
                  placeholder="Select Start Date"
                  style={{
                    width: "100%",
                    height: 45,
                  }}
                  onChange={(e) => {
                    const formattedDate = new Date(e).toLocaleDateString();
                    handleForm("leaseStart", formattedDate);
                  }}
                  className="lease-date-picker"
                  format={dateFormat}
                />
              </Space>
                }
                </ConfigProvider>
              </div>
              <div className="col-md-4">
                <span className="tenant-personal-details-title">
                  Lease Term End Date
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
                      placeholder="Select End Date"
                      style={{
                        width: "100%",
                        height: 45,
                      }}
                      onChange={(e) => {
                        const formattedDate = new Date(e).toLocaleDateString();
                        handleForm("leaseEnd", formattedDate);
                      }}
                      className="lease-date-picker"
                      format={dateFormat}
                    />
                  </Space>
                </ConfigProvider>
              </div>
            </div>
            {/* <div className="row mt-3">
              <div className="col-md-12">
                <ConfigProvider
                  theme={{
                    components: {
                      Switch: {
                        colorPrimary: "#EF6B3E",
                        colorPrimaryHover: "#EF6B3E",
                      },
                    },
                  }}
                >
                  <Switch
                    value={rollover}
                    onChange={(e) => onChangeSwitch(e)}
                  />
                </ConfigProvider>
                <span className="tenant-personal-details-switch-text">
                  {" "}
                  Rollover to “Month to Month” at the end of the term
                </span>
              </div>
            </div> */}
            {/* <div className="row mt-3">
              <div className="col-md-6">
                <span className="tenant-personal-details-title">
                  Upload documents
                </span>
                <div className="dragger">
                  <FileUploader setImages={setProfileImages} />
                </div>
              </div>
              <div className="col-md-6">
                <span className="tenant-personal-details-title ">
                  Upload lease
                  <span className="input-field-imp-star">*</span>
                </span>
                <div className="dragger">
                  <FileUploader setImages={setProfileImages} Images={ProfileImages} />
                </div>
              </div>
            </div> */}
            <div className="modal-content-footer-section-scroll p-custom">
              <div className="row mt-3">
                <div className="col-md-12 d-flex justify-content-end responsive-direction-column">
                  <div className="task-modal-footer-btn">
                    <button
                      onClick={() => {
                        EditTenant();
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

export default AddTenantDetailsEditModal;
