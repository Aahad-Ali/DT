import React, { useEffect, useMemo, useState } from "react";
import { Select } from "antd";
import { DatePicker } from "antd";
import ConvertTenantModal from "Modals/ConvertTenantModal/ConvertTenantModal";
import { message, Upload, ConfigProvider } from "antd";
import calendarIcon from "assets/calendar-icon.png";
import chevronIconDown from "assets/chevron-down.png";
import fileUploadIcon from "assets/upload-cloud-02-circle.png";
import UseGetHook from "Hooks/UseGetHook";
import UseUrlParamsHook from "Hooks/UseUrlParamsHook";
import { useNavigate } from "react-router-dom";
import FileUploader from "../FileUploader/FileUploader";
const { Dragger } = Upload;
const RenewLease = () => {
  //States start
  const Navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [LeaseFile, setLeaseFile] = useState([]);
  const [Images, setImages] = useState([]);
  const [DeletedImages, setDeletedImages] = useState([]);
  const [renewForm, setRenewForm] = useState([
    {
      securityDeposit: "",
      securityAmount: "",
      leaseTerm: "",
      leaseStartDate: "",
      leaseEndDate: "",
      firstRentDate: "",
      frequency: "",
      rentAmount: "",
    },
  ]);
  //States end
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

  // Modal Function
  const onOpenModal = () => {
    setOpenModal(true);
  };
  const onCloseModal = () => {
    setOpenModal(false);
  };
  // Form Input OnChanges
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  const { id } = UseUrlParamsHook();
  const { lease, FetchLeaseId } = UseGetHook("lease", id);
  const Lease = lease.filter((e) => e.id === id);

  const imageArray = useMemo(() => {
    return Lease[0]?.upload_lease || [];
  }, [Lease]);
  useEffect(() => {
    if (typeof imageArray === "string" && imageArray.length > 0) {
      setImages((prev) => [...prev, imageArray]);
    } else {
      setImages((prev) => [...prev, ...imageArray]);
    }
  }, [imageArray]);
  useEffect(() => {
    FetchLeaseId();
  }, []);

  // Handle Form Change

  const HandleForm = (fieldName, value) => {
    setRenewForm((prev) => {
      return {
        ...prev,
        [fieldName]: value,
      };
    });
  };
  const formData = new FormData();
  formData.append("security_deposit", renewForm.securityDeposit);
  if (renewForm.securityDeposit === "Yes") {
    formData.append("security_deposit_amount", renewForm.securityAmount);
  }
  if (renewForm.leaseTerm !== "") {
    formData.append("lease_term", renewForm.leaseTerm);
  }
  if (renewForm.leaseStartDate !== "") {
    formData.append("lease_term_start_date", renewForm.leaseStartDate);
  }
  if (renewForm.leaseEndDate !== "") {
    formData.append("lease_term_end_date", renewForm.leaseEndDate);
  }
  if (renewForm.firstRentDate !== "") {
    formData.append("first_rent_date", renewForm.firstRentDate);
  }

  if (renewForm.frequency !== "") {
    formData.append("frequency", renewForm.frequency);
  }
  if (renewForm.rentAmount !== "") {
    formData.append("rent_amount", renewForm.rentAmount);
  }
  if (LeaseFile.length > 0) {
    LeaseFile.forEach((img) => {
      formData.append("upload_lease", img.originFileObj);
    });
  }

  const config = require("Helpers/config.json");
  const renewLease = () => {
    if (
      renewForm.securityDeposit === "" ||
      renewForm.securityAmount === "" ||
      renewForm.leaseTerm === "" ||
      renewForm.leaseStartDate === "" ||
      renewForm.leaseEndDate === "" ||
      renewForm.firstRentDate === "" ||
      renewForm.frequency === "" ||
      renewForm.rentAmount === ""
    ) {
      message.error("Please fill required fields to continue");
    } else {
      fetch(`${config["baseUrl"]}/api/lease/${id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: formData,
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          if (res.apiCallStatus === "success") {
            message.success("lease Renewed successfully");
            Navigate("/all-lease");
          } else {
            message.error("Please fill required fields to continue");
            // message.error(res.error.message)
          }
        });
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
        <div className="row mt-3">
          <div className="col-md-12">
            <span className="fw-medium">
              Select Property<span className="sign-up-imp-star">*</span>
            </span>
            <input
              type="text"
              disabled
              value={lease[0]?.title}
              className="form-control"
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-12">
            <span className="fw-medium">
              Unit<span className="sign-up-imp-star">*</span>
            </span>
            <input
              type="text"
              disabled
              value={lease[0]?.unit.name}
              className="form-control"
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-12">
            <span className="fw-medium">
              Tenant<span className="sign-up-imp-star">*</span>
            </span>
            <input
              type="text"
              disabled
              value={lease[0]?.tenant.firstName}
              className="form-control"
            />
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
                style={{
                  width: "100%",
                  height: 45,
                }}
                placeholder="Select Security Deposit"
                onChange={(e) => HandleForm("securityDeposit", e)}
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
              {renewForm.securityDeposit === "Yes" ? (
                <input
                  onChange={(e) => HandleForm("securityAmount", e.target.value)}
                  type="number"
                  className="form-control"
                />
              ) : (
                <input disabled type="number" className="form-control" />
              )}
              <div className="dollar-sign-box-2">$</div>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-4">
            <span className="fw-medium">Lease Term</span>
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
                style={{
                  width: "100%",
                  height: 45,
                }}
                placeholder="Select Lease Term"
                onChange={(e) => HandleForm("leaseTerm", e)}
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
            <span className="fw-medium">Lease Term Start Date</span>
            <div className="lease-date-picker-container d-flex justify-content-center align-items-end">
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
                <DatePicker
                  suffixIcon={dateIcon}
                  className="lease-date-picker"
                  style={{
                    width: "100%",
                    height: 45,
                  }}
                  placeholder="Select Start Date"
                  onChange={(e) => {
                    const formattedDate = new Date(e).toLocaleDateString();
                    HandleForm("leaseStartDate", formattedDate);
                  }}
                />
              </ConfigProvider>
            </div>
          </div>
          <div className="col-md-4 ">
            <span className="fw-medium">Lease Term End Date</span>
            <div className="lease-date-picker-container d-flex justify-content-center align-items-end">
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
                <DatePicker
                  suffixIcon={dateIcon}
                  className="lease-date-picker"
                  style={{
                    width: "100%",
                    height: 45,
                  }}
                  placeholder="Select End Date"
                  onChange={(e) => {
                    const formattedDate = new Date(e).toLocaleDateString();
                    HandleForm("leaseEndDate", formattedDate);
                  }}
                />
              </ConfigProvider>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-4 ">
            <span className="fw-medium">First Rent Date</span>
            <div className="lease-date-picker-container d-flex justify-content-center align-items-end">
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
                <DatePicker
                  suffixIcon={dateIcon}
                  className="lease-date-picker"
                  style={{
                    width: "100%",
                    height: 45,
                  }}
                  placeholder="Select Start Date"
                  onChange={(e) => {
                    const formattedDate = new Date(e).toLocaleDateString();
                    HandleForm("firstRentDate", formattedDate);
                  }}
                />
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
                style={{
                  width: "100%",
                  height: 45,
                }}
                placeholder="Select Frequency"
                onChange={(e) => HandleForm("frequency", e)}
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
                onChange={(e) => HandleForm("rentAmount", e.target.value)}
                type="number"
                className="form-control"
                placeholder="Rent Amount"
              />
              <div className="dollar-sign-box">$</div>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <span className="fw-medium">Signed Lease</span>
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
          <div className="col-md-12 mt-5">
            <button onClick={() => renewLease()} className="save-btn">
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RenewLease;
