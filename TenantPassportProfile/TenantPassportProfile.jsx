import { useEffect, useState } from "react";
import {
  DatePicker,
  Select, ConfigProvider,
  Space, message
} from "antd";
import TenantPassportPaymentMethodModal from "Modals/TenantPassportPaymentMethodModal/TenantPassportPaymentMethodModal";
import TenantPassportInvitationSentModal from "Modals/TenantPassportInvitationSentModal/TenantPassportInvitationSentModal";
import chevronIcon from "assets/chevron-down.png";
import calendarIcon from "assets/calendar-icon.png";
import config from 'Helpers/config.json'
import UseUrlParamsHook from "Hooks/UseUrlParamsHook";
import Loader from "Helpers/Loader";
import { useNavigate } from 'react-router-dom'
import UseGetHook from "Hooks/UseGetHook";
const TenantPassportProfile = () => {
  let dropdownIcon;
  dropdownIcon = (
    <>
      <img src={chevronIcon} alt="" />
    </>
  );
  let dateIcon;
  dateIcon = (
    <>
      <img src={calendarIcon} alt="" />
    </>
  );
  const { email, id } = UseUrlParamsHook()
  // States start
  const [loader, setLoader] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openModalInvitation, setOpenModalInvitation] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate()
  const [incomeForm, setIncomeForm] = useState({
    income: "",
    incomeFrequency: "",
    otherIncome: "",
    otherIncomeFrequency: "",
    assets: "",
    employmentStatus: "",
    dob: "",
    ssn: "",
  });
  const [errors, setErrors] = useState({});
  const { user, FetchUserTenant } = UseGetHook("userinfo");
  // States end
  useEffect(() => {
    FetchUserTenant();
  }, []);
  const handleIncomeChange = (fieldName, value) => {
    setIncomeForm({
      ...incomeForm,
      [fieldName]: value,
    });
  };
  // Modal Function
  const onOpenModal = () => {
    setOpenModal(true);
  };
  const onCloseModal = () => {
    setOpenModal(false);
  };
  const url = user[0]?.isTenant ? "/api/system/transunion/verify" : "/api/renter/transunion/createRenter"
  // Modal Function
  const onOpenModalInvitation = () => {
    setOpenModalInvitation(true);
  };
  const onCloseModalInvitation = () => {
    setOpenModalInvitation(false);
  };

  // States
  const selectEmploymentStatus = [
    {
      name: "Not Employed",
      value: "NotEmployed"
    },
    {
      name: "Employed",
      value: "Employed"
    },
    {
      name: "Self Employed",
      value: "SelfEmployed"
    },
    {
      name: "Student",
      value: "Student"
    },
  ];
  const selectOtherIncomeFrequency = [
    {
      name: "Per Month",
      value: "PerMonth"
    },
    {
      name: "Per Year",
      value: "PerMonth"
    },
  ];
  const selectIncomeFrequency = [
    {
      name: "Per Month",
      value: "PerMonth"
    },
    {
      name: "Per Year",
      value: "PerMonth"
    },
  ];
  const CreateScreeningRequest = () => {
    setLoader(true)
    const newErrors = {};

    for (const key in incomeForm) {
      if (incomeForm[key] === "") {
        newErrors[key] = `${key} is required`;
        setLoader(false)
      }
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      fetch(`${config.baseUrl}${url}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(
          {
            "income": incomeForm.income,
            "incomeFrequency": incomeForm.incomeFrequency,
            "otherIncome": incomeForm.otherIncome,
            "otherIncomeFrequency": incomeForm.incomeFrequency,
            "assets": incomeForm.assets,
            "employmentStatus": incomeForm.employmentStatus,
            "dateOfBirth": incomeForm.dob,
            "nationalId": incomeForm.ssn,
            "landlordEmail": email
          }
        )
      }).then(res => {
        return res.json()
      }).then(res => {
        if (res.apiCallStatus === "success") {
          if (res.message.message === "You already have one Screening Request, Can not create an other") {
            message.error(res.message.message)
            setLoader(false)
            setTimeout(() => {
              navigate(`/tenant-passport`)
            }, 2000);
          }
          else {
            setLoader(false)
            console.log(res, 'resposnnnn')
            navigate(`/tenant-questions?id=${id || res.message.screeningRequests_._id}&ssn=${incomeForm.ssn}`)
          }

        }
        else {
          message.error(res.error.message)
          setLoader(false)
        }
      }).catch(err => {
        console.log(err, 'errorr')
        setLoader(false)
      })
    }

  };
  return (
    <>
      {openModal === true ? (
        <TenantPassportPaymentMethodModal
          onOpen={onOpenModalInvitation}
          onClose={onCloseModal}
        />
      ) : (
        ""
      )}
      {openModalInvitation === true ? (
        <TenantPassportInvitationSentModal
          success="Share Your Profile"
          route="tenant-passport"
          onClose={onCloseModalInvitation}
        />
      ) : (
        ""
      )}
      <div className="container-fluid bg-white p-3">
        <div className="stepper-container step-container-responsive">
          <div
            className={"step-4 stepper-active"}
          >
            1<div className="form-step-text">Income Info</div>
          </div>
          <div className="lines tenant-passport-edit-profile">
            <div
              className={`line ${currentStep === 2 ||
                currentStep === 3 ||
                currentStep === 4 ||
                currentStep === 5 ||
                currentStep === 6
                ? "active"
                : ""
                }`}
            ></div>
            <div
              className={`line ${currentStep === 3 ||
                currentStep === 4 ||
                currentStep === 5 ||
                currentStep === 6
                ? "active"
                : ""
                }`}
            ></div>
            <div
              className={`line ${currentStep === 4 || currentStep === 5 || currentStep === 6
                ? "active"
                : ""
                }`}
            ></div>
            <div
              className={`line ${currentStep === 5 || currentStep === 6 ? "active" : ""
                }`}
            ></div>
            <div className={`line ${currentStep === 6 ? "active" : ""}`}></div>
          </div>
        </div>
        {
          loader ?
            <Loader />
            :
            <>
              <div className="stepper-content-container mt-5">
                <div className="container-fluid">
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <span className="property-details-input-title">
                        Income<span className="sign-up-imp-star">*</span>
                      </span>
                      <input
                        type="number"
                        onChange={(e) =>
                          handleIncomeChange("income", e.target.value)
                        }
                        className="form-control"
                        placeholder="Income"
                      />
                      {errors.income && (
                        <span className="text-danger fw-bold">
                          {errors.income.split("_").join(" ")}
                        </span>
                      )}
                    </div>
                    <div className="col-md-6">
                      <span className="property-details-input-title">
                        Income Frequency
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
                          showSearch
                          onChange={(e) =>
                            handleIncomeChange("incomeFrequency", e)
                          }
                          suffixIcon={dropdownIcon}
                          placeholder="Select Income Frequency"
                          style={{
                            width: "100%",
                            height: 45,
                          }}
                          options={selectIncomeFrequency.map((e) => {
                            return { value: e.value, label: e.name };
                          })}
                        />
                      </ConfigProvider>
                      {errors.incomeFrequency && (
                        <span className="text-danger fw-bold">
                          {errors.incomeFrequency.split("_").join(" ")}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <span className="property-details-input-title">
                        Other Income<span className="sign-up-imp-star">*</span>
                      </span>
                      <input
                        type="number"
                        onChange={(e) =>
                          handleIncomeChange("otherIncome", e.target.value)
                        }
                        className="form-control"
                        placeholder="Other Income"
                      />
                      {errors.otherIncome && (
                        <span className="text-danger fw-bold">
                          {errors.otherIncome.split("_").join(" ")}
                        </span>
                      )}
                    </div>
                    <div className="col-md-6">
                      <span className="property-details-input-title">
                        Other Income Frequency
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
                          showSearch
                          onChange={(e) =>
                            handleIncomeChange("otherIncomeFrequency", e)
                          }
                          suffixIcon={dropdownIcon}
                          placeholder="Select Other Income Frequency"
                          style={{
                            width: "100%",
                            height: 45,
                          }}
                          options={selectOtherIncomeFrequency.map((e) => {
                            return { value: e.value, label: e.name };
                          })}
                        />
                      </ConfigProvider>
                      {errors.otherIncomeFrequency && (
                        <span className="text-danger fw-bold">
                          {errors.otherIncomeFrequency.split("_").join(" ")}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <span className="property-details-input-title">
                        Assets<span className="sign-up-imp-star">*</span>
                      </span>
                      <input
                        type="number"
                        onChange={(e) =>
                          handleIncomeChange("assets", e.target.value)
                        }
                        className="form-control"
                        placeholder="Assets"
                      />
                      {errors.assets && (
                        <span className="text-danger fw-bold">
                          {errors.assets.split("_").join(" ")}
                        </span>
                      )}
                    </div>
                    <div className="col-md-6">
                      <span className="property-details-input-title">
                        Employment Status
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
                          showSearch
                          onChange={(e) =>
                            handleIncomeChange("employmentStatus", e)
                          }
                          suffixIcon={dropdownIcon}
                          placeholder="Select Employment Status"
                          style={{
                            width: "100%",
                            height: 45,
                          }}
                          options={selectEmploymentStatus.map((e) => {
                            return { value: e.value, label: e.name };
                          })}
                        />
                      </ConfigProvider>
                      {errors.employmentStatus && (
                        <span className="text-danger fw-bold">
                          {errors.employmentStatus.split("_").join(" ")}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <span className="">
                        SSN<span className="sign-up-imp-star">*</span> <span style={{fontSize:'13px'}}>(Input without dashes)</span>
                      </span>
                      <input placeholder="SSN" onChange={(e) => handleIncomeChange("ssn", e.target.value)} type="number" name="" id="" className="form-control" />
                      {errors.ssn && (
                        <span className="text-danger fw-bold">
                          {errors.ssn.split("_").join(" ")}
                        </span>
                      )}
                    </div>
                    <div className="col-md-6">
                      <span className="">
                        Date Of Birth<span className="sign-up-imp-star">*</span>
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
                                handleIncomeChange("dob", formattedDate);
                              }}
                              className="lease-date-picker"
                            />
                          </Space>
                        </ConfigProvider>
                      </div>
                    </div>


                  </div>
                  <div className="stepper-first-btn d-flex justify-content-between">
                    <button
                      onClick={CreateScreeningRequest}
                      className="modal-save-btn w-100 next-btn mt-3"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </>
        }

      </div>
    </>
  );
};

export default TenantPassportProfile;
