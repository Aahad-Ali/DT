import React, { useEffect, useState } from "react";
import { ConfigProvider, Select, Space } from "antd";
import oval from "assets/Oval.png";
import { DatePicker, Radio, Switch, Upload } from "antd";
import { useNavigate } from "react-router-dom";
import fileUploadIcon from "assets/upload-cloud-02-circle.png";
import chevronIcon from "assets/chevron-down.png";
import calendarIcon from "assets/calendar.png";
import UseGetHook from "Hooks/UseGetHook";
import FileUploader from "Components/FileUploader/FileUploader";
import UseFormDataHook from "Hooks/UseFormDataHook";
import ModalLoader from "Components/GeneralComponents/ModalLoader";

const { Dragger } = Upload;
const { RangePicker } = DatePicker;

const AddNewWorkOrderModal = ({ onClose, onOpen, setUpdate }) => {
  const dateFormat = "MM/DD/YYYY";
  // States
  const [Images, setImages] = useState([]);

  const [propertyId, setPropertyId] = useState("");
  const [unitId, setunitId] = useState("");
  const [assigneeChecked, setAssigneeChecked] = useState(false);
  const [Description, setDescription] = useState("");
  const [recurring, setrecurring] = useState(1);
  const [numberOfDaysUntilDue, setnumberOfDaysUntilDue] = useState("");
  const [repeatForever, setrepeatForever] = useState(false);
  const [isLandlord, setIsLandlord] = useState(false);
  const [loader, setloader] = useState(false);

  // Get Properties
  const config = require("Helpers/config.json");
  const [PropertySearch, setPropertySearch] = useState("");
  const [propertyDropdown, setpropertyDropdown] = useState(false);
  // Get Vendors
  const [VendorSearch, setVendorSearch] = useState("");
  const [VendorDropdown, setVendorDropdown] = useState(false);
  const [vendor, setVendor] = useState([]);

  // Fetch Data
  const { PropertyData, fetchProperty } = UseGetHook("property");
  const { professional, fetchServiceProfessional } = UseGetHook("serviceProviders");

  // validation

  const [form, setForm] = useState({
    subject: "",
    due_date: "",
    status: "",
    priority: "",
    description: "",
  });
  const [recurring_form, setRecurring_Form] = useState({
    start_date: "",
    end_date: "",
    frequency: "",
  });
  const [errors, setErrors] = useState({});
  const handleChange = (fieldName, value) => {
    setForm({
      ...form,
      [fieldName]: value,
    });
  };
  const handleChangeRecurring = (fieldName, value) => {
    setRecurring_Form({
      ...recurring_form,
      [fieldName]: value,
    });
  };
  // Remove Vendor
  const removeVendor = (id) => {
    const deleteItem = vendor.filter((ind) => {
      return ind !== id;
    });
    setVendor(deleteItem);
  };
  useEffect(() => {
    fetchProperty();
    fetchServiceProfessional();
  }, []);
  const AddVendor = () => {
    fetchServiceProfessional();
  };
  // Add Tasks
  const formData = new FormData();
  formData.append("property", propertyId);
  for (let i = 0; i < vendor.length; i++) {
    formData.append(`assignedTo[${[i]}]`, vendor[i]);
    console.log(vendor[i]);
  }
  formData.append("subject", form.subject);
  formData.append("dueDate", form.due_date);
  formData.append("status", form.status);
  formData.append("priority", form.priority);

  formData.append("notifyAssignee", assigneeChecked ? assigneeChecked : false);
  formData.append("description", Description);

  if (recurring === 2) {
    formData.append("startDate", recurring_form.start_date);
    formData.append("endDate", recurring_form.end_date);
    formData.append("frequency", recurring_form.frequency);
    formData.append("recurring", true);
    formData.append("numberOfDaysUntilDue", numberOfDaysUntilDue);
    formData.append("repeatForever", repeatForever);
  }
  Images.forEach((img) => {
    formData.append("images", img);
  });
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
  const onChangeSwitch = (checked) => {
    setrepeatForever(checked);
    console.log(`switch to ${repeatForever}`);
  };
  const onChangeRadio = (e) => {
    console.log("radio checked", e.target.value);
    setrecurring(e.target.value);
  };
  const preventMinus = (e) => {
    if (e.code === "Minus") {
      e.preventDefault();
    }
  };

  const addWorkOrder = () => {
    const newErrors = {};
    for (const key in form) {
      if (form[key] === "") {
        newErrors[key] = `${key} is required`;
      }
    }
    setErrors(newErrors);
    if (vendor.length === 0 && !isLandlord) {
      newErrors["assignee"] = "assignee is required";
    }
    if (!propertyId && !unitId) {
      newErrors["property"] = "property is required";
    }
    if (
      vendor.length !== 0 &&
      isLandlord &&
      Object.keys(newErrors).length === 0
    ) {
      UseFormDataHook("workorder", formData);
    } else if (recurring === 2) {
      for (const key in recurring_form) {
        if (recurring_form[key] === "") {
          newErrors[key] = `${key} is required`;
        }
      }
      if (Object.keys(newErrors).length === 0) {
        UseFormDataHook("workorder", formData);
      }
    } else {
      UseFormDataHook("workorder", formData,onClose, setloader);
      setUpdate(true)
    }
  };
  return (
    <>
      <div className="payment-modal-container">
        <div className="payment-method-modal property-details-view-task-modal">
          <div className="modal-heading d-flex justify-content-between align-items-center p-41 pt-20 property-details-view-add-task-modal-heading-main">
            <h1 className="mb-0">Add Work Order</h1>
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
            <div className="row mt-3">
              <div className="col-md-12 text-start">
                <span>
                  Select Property<span className="sign-up-imp-star">*</span>
                </span>
                <div className="task-search-property-container position-relative">
                  <input
                    value={PropertySearch}
                    onKeyUp={() => setpropertyDropdown(true)}
                    onChange={(e) => {
                      setPropertySearch(e.target.value);
                    }}
                    type="text"
                    className="form-control"
                    placeholder="Select Tenant Property/Unit/Name"
                  />
                  {errors.property && (
                    <span className="text-danger fw-bold">
                      {errors.property}
                    </span>
                  )}
                  <span
                    onClick={() => {
                      setpropertyDropdown(!propertyDropdown);
                      setVendorDropdown(false);
                    }}
                    className="multi-chevron cursor"
                  >
                    <img src={chevronIcon} alt="" />
                  </span>
                  {propertyDropdown ? (
                    <div className="dropdown-options p-2 modal-content-main-section-scroll">
                      <div className="multi-select-options ">
                        {PropertyData.length > 0
                          ? PropertyData?.filter(
                            (e) =>
                              e.title
                                .toLowerCase()
                                ?.includes(PropertySearch?.toLowerCase()) ||
                              e.units.some((u) =>
                                u?.name
                                  .toLowerCase()
                                  .includes(PropertySearch?.toLowerCase())
                              )
                          ).map((item) =>
                            item.units.map((u) => {
                              return (
                                <>
                                  <div
                                    onClick={() => {
                                      setPropertyId(item?.id);
                                      setunitId(u?.id);
                                      setpropertyDropdown(false);
                                      setPropertySearch(
                                        `${item.title}${item.units.length > 0
                                          ? ` / ${u.name}`
                                          : ""
                                        } `
                                      );
                                    }}
                                    key={item.id}
                                    className="d-flex align-items-start flex-column task-property-dropdown px-2 cursor "
                                  >
                                    <div className="owner">
                                      <p className="mb-0 create-task-owner">
                                        {item?.owner}
                                      </p>
                                    </div>
                                    <div className="address">
                                      <p className="mb-0 create-task-property">
                                        {item?.title}, {item?.address?.state},{" "}
                                        {item?.address?.zipcode}
                                      </p>
                                    </div>
                                    <div className="unit">
                                      <span className="mb-0 me-2 create-task-owner ">
                                        {u.name}
                                      </span>
                                    </div>
                                  </div>
                                </>
                              );
                            })
                          )
                          : "no Data"}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12 text-start">
                <div className="col-md-12 text-start">
                  <p className="mb-0">Select Service Professional </p>
                  <div className="task-vendor-search-container position-relative ">
                    <input
                      onChange={(e) => setVendorSearch(e.target.value)}
                      onKeyUp={() => setVendorDropdown(true)}
                      placeholder="Search here.."
                      type="text"
                      className="form-control"
                    />
                    {errors.assignee && (
                      <span className="text-danger fw-semibold">
                        {errors.assignee}
                      </span>
                    )}
                    <span
                      onClick={() => {
                        setVendorDropdown(!VendorDropdown);
                        setpropertyDropdown(false);
                      }}
                      className="multi-chevron cursor"
                    >
                      <img src={chevronIcon} alt="" />
                    </span>
                    {VendorDropdown ? (
                      <div className="dropdown-options p-3 create-task-vendor-container modal-content-main-section-scroll">
                        <div className="multi-select-options ">
                          <div className="landlord-task d-flex justify-content-between align-items-center mt-3">
                            {localStorage.getItem("name")}
                            {isLandlord ? (
                              <button
                                onClick={() => {
                                  setIsLandlord(false);
                                }}
                                className="remove-btn fw-medium"
                              >
                                Remove
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  setIsLandlord(true);
                                }}
                                className="not-found-add-task-btn primary-orange-text fw-medium"
                              >
                                Add
                              </button>
                            )}
                          </div>
                          {/* {VendorData?.filter(
                            (e) =>
                              e.firstName
                                .toLowerCase()
                                ?.includes(VendorSearch?.toLowerCase()) ||
                              e.job_title
                                ?.toLowerCase()
                                ?.includes(VendorSearch?.toLowerCase())
                          ).map((item) => {
                            return (
                              <>
                                <div
                                  key={item?.id}
                                  className="assigned-task-candidate d-flex justify-content-between align-items-center mt-3"
                                >
                                  <div className="candidate-img">
                                    <img
                                      src={`${item.profileImage}`}
                                      className="rounded-5 property-table-image mw_40 mh_40"
                                      alt=""
                                    />{" "}
                                    <span className="candidate-name ms-2">
                                      {item.firstName} {item.lastName}
                                    </span>
                                  </div>
                                  <div className="candidate-add-btn">
                                    {vendor.includes(item?.id) ? (
                                      <button
                                      onClick={() => {
                                        removeVendor(item?.id);
                                      }}
                                        className="remove-btn fw-medium"
                                      >
                                        Remove
                                      </button>
                                    ) : (
                                      <button
                                      onClick={() => {
                                        vendor.push(item?.id);
                                        AddVendor();
                                      }}
                                        className="not-found-add-task-btn primary-orange-text fw-medium"
                                      >
                                        Add
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </>
                            );
                          })
                          ) : ( */}
                          {professional.length > 0 ? (
                            professional.filter((e) =>
                              e.firstName
                                .toLowerCase()
                                .includes(VendorSearch?.toLowerCase())
                            ).map((item) => {
                              return (
                                <div key={item.id}>
                                  <div
                                    key={item?.id}
                                    className="assigned-task-candidate d-flex justify-content-between align-items-center mt-3"
                                  >
                                    <div className="candidate-img">
                                      <img
                                        src={`${item.profileImage}`}
                                        className="rounded-5 property-table-image mw_40 mh_40"
                                        alt=""
                                      />{" "}
                                      <span className="candidate-name ms-2">
                                        {item.firstName} {item.lastName}
                                      </span>
                                    </div>
                                    <div className="candidate-add-btn">
                                      {vendor.includes(item?.id) ? (
                                        <button
                                          onClick={() => {
                                            removeVendor(item?.id);
                                          }}
                                          className="remove-btn fw-medium"
                                        >
                                          Remove
                                        </button>
                                      ) : (
                                        <button
                                          onClick={() => {
                                            vendor.push(item?.id);
                                            AddVendor();
                                          }}
                                          className="not-found-add-task-btn primary-orange-text fw-medium"
                                        >
                                          Add
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <div>
                              <div className="assigned-task-candidate d-flex justify-content-between align-items-center mt-3">
                                <div className="landlord-task">
                                  {localStorage.getItem("name")}
                                </div>
                                <div className="candidate-img">
                                  {/* <img
                                    src={`${item.profileImage}`}
                                    className="rounded-5 property-table-image mw_40 mh_40"
                                    alt=""
                                  />{" "} */}
                                  <span className="candidate-name ms-2">
                                    { }
                                  </span>
                                </div>
                                <div className="candidate-add-btn">
                                  {isLandlord ? (
                                    <button
                                      onClick={() => {
                                        setIsLandlord(false);
                                      }}
                                      className="remove-btn fw-medium"
                                    >
                                      Remove
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() => {
                                        setIsLandlord(true);
                                      }}
                                      className="not-found-add-task-btn primary-orange-text fw-medium"
                                    >
                                      Add
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  {vendor.length > 0 ? (
                    <div className="selected-vendor-container d-flex gap-3 mt-3 align-items-center ">
                      {professional?.filter((e) => vendor.includes(e.id)).map(
                        (item) => {
                          return (
                            <div className="selected-vendors">
                              <img
                                src={`${item.profileImage}`}
                                className="rounded-5 property-table-image mw_40 mh_40"
                                alt=""
                              />{" "}
                              <span className="candidate-name ms-2">
                                {item.firstName} {item.lastName}
                              </span>
                            </div>
                          );
                        }
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="p-41">
            <div className="row mt-3">
              <div className="col-md-4 text-start">
                <span>
                  Due Date<span className="sign-up-imp-star">*</span>
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
                      style={{
                        width: "100%",
                        height: 45,
                      }}
                      onChange={(e, dateString) => {
                        const formattedDate = new Date(e).toLocaleDateString();
                        handleChange("due_date", formattedDate);
                      }}
                      format={dateFormat}
                    />
                  </Space>
                </ConfigProvider>
                {errors.due_date && (
                  <span className="text-danger fw-semibold mt-3">
                    {errors.due_date.split("_").join(" ")}
                  </span>
                )}
              </div>
              <div className="col-md-4 text-start">
                <span>
                  Status<span className="sign-up-imp-star">*</span>
                </span>
                <br />
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
                  <Space
                    style={{
                      width: "100%",
                    }}
                    direction="vertical"
                  >
                    <Select
                      suffixIcon={dropdownIcon}
                      placeholder="Select Status"
                      style={{
                        width: "100%",
                        height: 45,
                      }}
                      onChange={(e) => handleChange("status", e)}
                      options={[
                        {
                          value: "In Progress",
                          label: "In Progress",
                        },
                        {
                          value: "Completed",
                          label: "Completed",
                        },
                        {
                          value: "Not Started",
                          label: "Not Started",
                        },
                      ]}
                    />
                  </Space>
                </ConfigProvider>
                {errors.status && (
                  <span className="text-danger fw-semibold mt-3">
                    {errors.status}
                  </span>
                )}
              </div>
              <div className="col-md-4 text-start">
                <span>
                  Priority<span className="sign-up-imp-star">*</span>
                </span>
                <br />
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
                  <Space
                    style={{
                      width: "100%",
                    }}
                    direction="vertical"
                  >
                    <Select
                      suffixIcon={dropdownIcon}
                      placeholder="Select Priority"
                      style={{
                        width: "100%",
                        height: 45,
                      }}
                      onChange={(e) => handleChange("priority", e)}
                      options={[
                        {
                          value: "Low",
                          label: "Low",
                        },
                        {
                          value: "Medium",
                          label: "Medium",
                        },
                        {
                          value: "High",
                          label: "High",
                        },
                        /*{
                                                    value: "Very High",
                                                    label: "Very High",
                                                },*/
                      ]}
                    />
                  </Space>
                </ConfigProvider>
                {errors.priority && (
                  <span className="text-danger fw-semibold mt-3">
                    {errors.priority.split("_").join(" ")}
                  </span>
                )}
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
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
                  <Radio.Group onChange={onChangeRadio} value={recurring}>
                    <Radio value={1}>One Time Work Order</Radio>
                    <Radio value={2}>Recurring Work Order</Radio>
                  </Radio.Group>
                </ConfigProvider>
              </div>
            </div>
            {recurring === 2 ? (
              <>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <span>
                      Start Date<span className="sign-up-imp-star">*</span>
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
                          placeholder="Select Start Date"
                          style={{
                            width: "100%",
                            height: 45,
                          }}
                          onChange={(e, dateString) => {
                            const formattedDate = new Date(
                              e
                            ).toLocaleDateString();
                            handleChangeRecurring("start_date", dateString);
                            console.log(formattedDate);
                          }}
                          format={dateFormat}
                        />
                      </Space>
                    </ConfigProvider>
                    {errors.start_date && (
                      <span className="text-danger fw-semibold">
                        {errors.start_date.split("_").join(" ")}
                      </span>
                    )}
                  </div>
                  <div className="col-md-6">
                    <span>
                      End Date<span className="sign-up-imp-star">*</span>
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
                          onChange={(e, dateString) => {
                            const formattedDate = new Date(
                              e
                            ).toLocaleDateString();
                            handleChangeRecurring("end_date", dateString);
                            console.log(formattedDate);
                          }}
                          format={dateFormat}
                        />
                      </Space>
                    </ConfigProvider>
                    {errors.end_date && (
                      <span className="text-danger fw-semibold">
                        {errors.end_date.split("_").join(" ")}
                      </span>
                    )}
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <span>Number of Days until due</span>
                    <br />
                    <input
                      onChange={(e) => setnumberOfDaysUntilDue(e.target.value)}
                      type="number"
                      name=""
                      className="form-control"
                      id=""
                      placeholder="Number of due days"
                      min="0"
                      onKeyPress={preventMinus}
                    />
                  </div>
                  <div className="col-md-6">
                    <span>
                      Frequency<span className="sign-up-imp-star">*</span>
                    </span>
                    <br />
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
                      <Space
                        style={{
                          width: "100%",
                        }}
                        direction="vertical"
                      >
                        <Select
                          suffixIcon={dropdownIcon}
                          placeholder="Select Frequency"
                          style={{
                            width: "100%",
                            height: 45,
                          }}
                          onChange={(e) =>
                            handleChangeRecurring("frequency", e)
                          }
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
                      </Space>
                    </ConfigProvider>
                    {errors.frequency && (
                      <span className="text-danger fw-semibold">
                        {errors.frequency}
                      </span>
                    )}
                  </div>
                </div>
                <div className="row mt-3">
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
                      <Switch onChange={onChangeSwitch} />{" "}
                      <span>Repeat Forever</span>
                    </ConfigProvider>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
            <div className="row mt-3">
              <div className="col-md-12">
                <div className="work-modal-search-field">
                  <span>
                    Subject<span className="sign-up-imp-star">*</span>
                  </span>
                  <input
                    onChange={(e) => handleChange("subject", e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Subject"
                  />
                  {errors.subject && (
                    <span className="text-danger fw-semibold mt-3">
                      {errors.subject.split("_").join(" ")}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <span>Description</span>
                <textarea
                  onChange={(e) => setDescription(e.target.value)}
                  name=""
                  id=""
                  cols="30"
                  rows="4"
                  className="form-control"
                  placeholder="Add description"
                ></textarea>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <span>Upload Media</span>
                <div className="dragger">
                  <FileUploader setImages={setImages} Images={Images} />
                </div>
              </div>
            </div>
          </div>

          <div className="modal-content-footer-section-scroll p-custom">
            <div className="row mt-3">
              <div className="col-md-12">
                <div className="work-order-modal-last-inputs d-flex align-items-center justify-content-between">
                  <div className="work-modal-last-check-box d-flex align-items-center">
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
                    <span className="">Notify Assignee(s)</span>
                  </div>
                  <button
                    onClick={() => {
                      addWorkOrder();
                      
                      setloader(true)
                    }}
                    className="modal-save-task-btn"
                  >
                    Save {loader && <ModalLoader/>}
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

export default AddNewWorkOrderModal;
