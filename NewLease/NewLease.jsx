import React, { useState, useEffect } from "react";
import { Select, Space } from "antd";
import { DatePicker, Switch, Radio } from "antd";
import ConvertTenantModal from "Modals/ConvertTenantModal/ConvertTenantModal";
import chevronIconDown from "assets/chevron-down.png";
import calendarIcon from "assets/calendar-icon.png";
import { message, Upload, ConfigProvider } from "antd";
import { useNavigate } from "react-router-dom";
import UseUrlParamsHook from "Hooks/UseUrlParamsHook";
import UseGetHook from "Hooks/UseGetHook";
import FileUploader from "Components/FileUploader/FileUploader";
import UseFormDataHook from "Hooks/UseFormDataHook";
import { ModalLayout1 } from "Components/GeneralComponents";
import ModalLoader from "Components/GeneralComponents/ModalLoader";

const { Dragger } = Upload;
const NewLease = () => {
  const dateFormat = "MM/DD/YYYY";
  // select box icon
  let dropdownIcon;
  dropdownIcon = (
    <>
      <img src={chevronIconDown} alt="" />
    </>
  );
  // select date icon
  let dateIcon;
  dateIcon = (
    <>
      <img src={calendarIcon} alt="" />
    </>
  );
  //States start
  const [openModal, setOpenModal] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [loader, setLoader] = useState(false);
  const [value, setValue] = useState();
  const [Images, setImages] = useState([]);

  //States end

  const handleSwitchChange = (checked) => {
    setIsSwitchOn(checked);
  };

  const handleRadioChange = (e) => {
    setValue(e.target.value);
    console.log(value);
  };

  const onChangeRadio = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  // Modal Function
  const onOpenModal = () => {
    setOpenModal(true);
  };
  const onCloseModal = () => {
    setOpenModal(false);
  };
  const preventMinus = (e) => {
    if (e.code === "Minus") {
      e.preventDefault();
    }
  };
  const navigate = useNavigate();

  // Fetch Data
  const [form, setForm] = useState({
    property: "",
    unit: "",
    tenant: "",
    lease_term: "",
    lease_term_start_date: "",
    lease_term_end_date: "",
    first_rent_date: "",
    frequency: "",
    rent_amount: "",
    security_deposit: "",
    late_fee: "",
    late_fees_amount: "",
    security_amount: "",
    rollover_end_of_term: "",
    renewLease: "",
  });
  const { id } = UseUrlParamsHook();
  const { PropertyData, fetchProperty } = UseGetHook("property");
  const { fetchVacantUnit, UnitData } = UseGetHook("unit", form.property);
  const { FetchTenant, TenantData } = UseGetHook("tenants");

  useEffect(() => {
    fetchProperty();
    FetchTenant();
    if (form.property !== "") {
      fetchVacantUnit();
    }
  }, [form.property]);
  const handleFormChange = (fieldName, e) => {
    setForm((prev) => ({
      ...prev,
      [fieldName]: e,
    }));
    console.log(e);
  };
  // Add Lease
  var formdata = new FormData();
  formdata.append("property", form.property);
  formdata.append("unit", form.unit);
  formdata.append("rent_amount", form.rent_amount);
  formdata.append("lease_term", form.lease_term);
  formdata.append("lease_term_start_date", form.lease_term_start_date);
  formdata.append("lease_term_end_date", form.lease_term_end_date);
  formdata.append("rollover_end_of_term", form.rollover_end_of_term);
  formdata.append("tenant", form.tenant);
  formdata.append("frequency", form.frequency);
  formdata.append("first_rent_date", form.first_rent_date);
  formdata.append("renew", value === 1 ? true : false);
  Images.forEach((img) => {
    formdata.append("upload_lease", img);
  });
  const config = require("Helpers/config.json");
  const addLease = () => {
    if (
      form.property === "" ||
      form.unit === "" ||
      form.tenant === "" ||
      form.lease_term === "" ||
      form.lease_term_start_date === "" ||
      form.lease_term_end_date === "" ||
      form.first_rent_date === "" ||
      form.rent_amount === ""
    ) {
      message.error("Please Fill Required Fields to Continue");
    } else if (form.lease_term_start_date > form.lease_term_end_date) {
      message.error("Start Date cannot be greater than End Date");
    } else if (form.first_rent_date > form.lease_term_end_date) {
      message.error(
        "Rent start date cannot be greater than lease term end date"
      );
    } else {
      UseFormDataHook("lease", formdata, onOpenModal, setLoader);
    }
  };

  return (
    <>
      {openModal && (
        <ConvertTenantModal
          onClose={onCloseModal}
          modalTitle="Send Invite"
          leasePara="Invite your Tenant to the Tenant Portal"
          inviteLink="https://digitalcrm.teqdeft.in/contacs/"
        />
      )}
      <div className="container-fluid bg-white p-3">
        <div className="row">
          <div className="col-md-12">
            <span className="property-details-input-title">
              Select Property<span className="sign-up-imp-star">*</span>
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
                suffixIcon={dropdownIcon}
                placeholder="Select Property"
                style={{
                  width: "100%",
                  height: 45,
                }}
                options={PropertyData.map((e) => {
                  return { value: e.id, label: e.title };
                })}
                onChange={(e) => handleFormChange("property", e)}
              ></Select>
            </ConfigProvider>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-12">
            <span className="property-details-input-title">
              Select Unit<span className="sign-up-imp-star">*</span>
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
                suffixIcon={dropdownIcon}
                placeholder="Select Unit"
                style={{
                  width: "100%",
                  height: 45,
                }}
                options={UnitData.map((e) => {
                  return { value: e.id, label: e.name };
                })}
                onChange={(e) => handleFormChange("unit", e)}
              ></Select>
            </ConfigProvider>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-12">
            <span className="fw-medium">
              Select Tenant<span className="sign-up-imp-star">*</span>
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
                suffixIcon={dropdownIcon}
                placeholder="Select Tenant"
                style={{
                  width: "100%",
                  height: 45,
                }}
                onChange={(e) => handleFormChange("tenant", e)}
                options={TenantData.map((e) => {
                  return { value: e.id, label: e.firstName };
                })}
              />
            </ConfigProvider>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-4">
            <span className="fw-medium">
              Lease Term<span className="sign-up-imp-star">*</span>
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
                suffixIcon={dropdownIcon}
                placeholder="Select Lease Term"
                style={{
                  width: "100%",
                  height: 45,
                }}
                onChange={(e) => handleFormChange("lease_term", e)}
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
            </ConfigProvider>
          </div>
          <div className="col-md-4 ">
            <span className="fw-medium">
              Lease Term Start Date<span className="sign-up-imp-star">*</span>
            </span>
            <div className="lease-date-picker-container d-flex justify-content-center align-items-end">
              <ConfigProvider
                theme={{
                  components: {
                    DatePicker: {
                      fontFamily: "Montserrat",
                      fontSize: 16,
                      colorText: "#667085",
                      colorTextPlaceholder: "#667085",
                      colorPrimaryHover: "#EF6B3E",
                      borderRadius: 4,
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
                    suffixIcon={dateIcon}
                    placeholder="Select lease start date"
                    style={{
                      width: "100%",
                      height: 45,
                    }}
                    onChange={(e) => {
                      const formattedDate = new Date(e).toLocaleDateString();
                      handleFormChange("lease_term_start_date", formattedDate);
                    }}
                    className="lease-date-picker"
                  />
                </Space>
              </ConfigProvider>
            </div>
          </div>
          <div className="col-md-4 ">
            <span className="fw-medium">
              Lease Term End Date<span className="sign-up-imp-star">*</span>
            </span>
            <div className="lease-date-picker-container d-flex justify-content-center align-items-end">
              <ConfigProvider
                theme={{
                  components: {
                    DatePicker: {
                      fontFamily: "Montserrat",
                      fontSize: 16,
                      colorText: "#667085",
                      colorTextPlaceholder: "#667085",
                      colorPrimaryHover: "#EF6B3E",
                      borderRadius: 4,
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
                    suffixIcon={dateIcon}
                    placeholder="Select lease start date"
                    style={{
                      width: "100%",
                      height: 45,
                    }}
                    onChange={(e) => {
                      const formattedDate = new Date(e).toLocaleDateString();
                      handleFormChange("lease_term_end_date", formattedDate);
                    }}
                    className="lease-date-picker"
                  />
                </Space>
              </ConfigProvider>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-6">
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
              <span className="d-flex gap-2">
                <Switch
                  onChange={(e) => handleFormChange("rollover_end_of_term", e)}
                />
                Rollover to "Month to Month" at the end of the term
              </span>
            </ConfigProvider>
          </div>
          <div className="col-md-6 text-center">
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
              {form.rollover_end_of_term && (
                <Radio.Group onChange={handleRadioChange} value={value}>
                  <Radio value={1} style={{ fontWeight: "500" }}>
                    Renew Lease
                  </Radio>
                  <Radio value={2} style={{ fontWeight: "500" }}>
                    Non-Renewal Notice
                  </Radio>
                </Radio.Group>
              )}
            </ConfigProvider>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-4 ">
            <span className="fw-medium">
              First Rent Date<span className="sign-up-imp-star">*</span>
            </span>
            <div className="lease-date-picker-container d-flex justify-content-center align-items-end">
              <ConfigProvider
                theme={{
                  components: {
                    DatePicker: {
                      fontFamily: "Montserrat",
                      fontSize: 16,
                      colorText: "#667085",
                      colorTextPlaceholder: "#667085",
                      colorPrimaryHover: "#EF6B3E",
                      borderRadius: 4,
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
                    suffixIcon={dateIcon}
                    style={{
                      width: "100%",
                      height: 45,
                    }}
                    format={dateFormat}
                    className="lease-date-picker"
                    onChange={(e) => {
                      const formattedDate = new Date(e).toLocaleDateString();
                      handleFormChange("first_rent_date", formattedDate);
                    }}
                    placeholder="Select Start Date"
                  />
                </Space>
              </ConfigProvider>
            </div>
          </div>
          <div className="col-md-4">
            <span className="fw-medium">Frequency</span>
            <ConfigProvider
              theme={{
                components: {
                  Select: {
                    zIndexPopupBase: 99999,
                    fontFamily: "Montserrat",
                    fontSize: 16,
                    colorText: "#667085",
                    colorTextPlaceholder: "#667085",
                    colorPrimaryHover: "#EF6B3E",
                    optionSelectedBg: "rgba(239, 107, 62, 0.16)",
                    borderRadius: 4,
                  },
                },
              }}
            >
              <Select
                suffixIcon={dropdownIcon}
                placeholder="Select Frequency"
                style={{
                  width: "100%",
                  height: 45,
                }}
                onChange={(e) => handleFormChange("frequency", e)}
                options={[
                  {
                    value: "Daily",
                    label: "Daily",
                  },
                  {
                    value: "Weekly",
                    label: "Weekly",
                  },
                  {
                    value: "Monthly",
                    label: "Monthly",
                  },
                  {
                    value: "Quarterly",
                    label: "Quarterly",
                  },
                  {
                    value: "Yearly",
                    label: "Yearly",
                  },
                ]}
              />
            </ConfigProvider>
          </div>
          <div className="col-md-4">
            <span className="fw-medium">
              Rent Amount<span className="sign-up-imp-star">*</span>
            </span>
            <div className="rent-amount-input-container position-relative">
              <input
                onChange={(e) =>
                  handleFormChange("rent_amount", e.target.value)
                }
                type="number"
                className="form-control"
                placeholder="Rent Amount"
                min="0"
                onKeyPress={preventMinus}
              />
              <div className="dollar-sign-box">$</div>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-6">
            <span className="fw-medium">Security Deposit</span>
            <ConfigProvider
              theme={{
                components: {
                  Select: {
                    zIndexPopupBase: 99999,
                    fontFamily: "Montserrat",
                    fontSize: 16,
                    colorText: "#667085",
                    colorTextPlaceholder: "#667085",
                    colorPrimaryHover: "#EF6B3E",
                    optionSelectedBg: "rgba(239, 107, 62, 0.16)",
                    borderRadius: 4,
                  },
                },
              }}
            >
              <Select
                suffixIcon={dropdownIcon}
                placeholder="Select Security Deposit"
                style={{
                  width: "100%",
                  height: 45,
                }}
                onChange={(e) => handleFormChange("security_deposit", e)}
                options={[
                  {
                    value: "Yes",
                    label: "Yes",
                  },
                  {
                    value: "No",
                    label: "No",
                  },
                ]}
              />
            </ConfigProvider>
          </div>
          <div className="col-md-6">
            <span className="fw-medium">Amount</span>
            <div className="rent-amount-input-container position-relative">
              {form.security_deposit === "Yes" ? (
                <input
                  onChange={(e) =>
                    handleFormChange("security_amount", e.target.value)
                  }
                  type="number"
                  className="form-control"
                  placeholder="Amount"
                  min="0"
                  onKeyPress={preventMinus}
                />
              ) : (
                <input
                  disabled
                  type="number"
                  className="form-control"
                  placeholder="Amount"
                />
              )}
              <div className="dollar-sign-box-2">$</div>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-6">
            <span className="fw-medium">Late Fees</span>
            <ConfigProvider
              theme={{
                components: {
                  Select: {
                    zIndexPopupBase: 99999,
                    fontFamily: "Montserrat",
                    fontSize: 16,
                    colorText: "#667085",
                    colorTextPlaceholder: "#667085",
                    colorPrimaryHover: "#EF6B3E",
                    optionSelectedBg: "rgba(239, 107, 62, 0.16)",
                    borderRadius: 4,
                  },
                },
              }}
            >
              <Select
                suffixIcon={dropdownIcon}
                placeholder="Select Late Fees"
                style={{
                  width: "100%",
                  height: 45,
                }}
                onChange={(e) => handleFormChange("late_fee", e)}
                options={[
                  {
                    value: "Yes",
                    label: "Yes",
                  },
                  {
                    value: "No",
                    label: "No",
                  },
                ]}
              />
            </ConfigProvider>
          </div>
          <div className="col-md-6">
            <span className="fw-medium">Amount</span>
            <div className="rent-amount-input-container position-relative">
              {form.late_fee === "Yes" ? (
                <input
                  onChange={(e) =>
                    handleFormChange("late_fees_amount", e.target.value)
                  }
                  type="number"
                  className="form-control"
                  placeholder="Amount"
                  min="0"
                  onKeyPress={preventMinus}
                />
              ) : (
                <input
                  disabled
                  type="number"
                  className="form-control"
                  placeholder="Amount"
                />
              )}
              <div className="dollar-sign-box-2">$</div>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <span className="fw-medium">Signed Lease</span>
          <div className="col-md-12 d-flex justify-content-center">
            <div className="dragger w-100">
              <FileUploader setImages={setImages} Images={Images} />
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-12 ">
            <button
              onClick={() => {
                addLease()
                setLoader(true)
              }}
              className="next-btn-same-class new-lease-save-btn"
            >
              Save {loader && <ModalLoader />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewLease;
