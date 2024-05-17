import React, { useEffect, useState } from "react";
import { ConfigProvider, Select, Space } from "antd";
import { DatePicker } from "antd";
import chevronIcon from "assets/chevron-down.png";
import { Upload, Radio } from "antd";
import calendarIcon from "assets/calendar.png";
import UseGetHook from "Hooks/UseGetHook";
import FileUploader from "Components/FileUploader/FileUploader";
import UseFormDataHook from "Hooks/UseFormDataHook";
import ModalLoader from "Components/GeneralComponents/ModalLoader";
const { Dragger } = Upload;
const AddNewTaskModal = ({ onClose, onOpen, setUpdate }) => {
  const [notifyTenantChecked, setNotifyTenantChecked] = useState(false);
  const [assigneeChecked, setAssigneeChecked] = useState(false);
  const [Images, setImages] = useState([]);
  const [propertyId, setPropertyId] = useState("");
  const [unitId, setunitId] = useState("");
  const [endDate, setendDate] = useState("");
  const [recurring, setrecurring] = useState(1);
  const [isLandlord, setIsLandlord] = useState(false);
  const [PropertySearch, setPropertySearch] = useState("");
  const [propertyDropdown, setpropertyDropdown] = useState(false);
  const [VendorSearch, setVendorSearch] = useState("");
  const [VendorDropdown, setVendorDropdown] = useState(false);
  const [loader, setloader] = useState(false);
  const [vendor, setVendor] = useState([]);
  const [form, setForm] = useState({
    title: "",
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
  // Fetch Data
  const { PropertyData, fetchProperty } = UseGetHook("property");
  const { VendorData, fetchVendor } = UseGetHook("vendors");
  useEffect(() => {
    fetchProperty();
    fetchVendor();
  }, []);
  const AddVendor = () => {
    fetchVendor();
  };
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
  const onChangeRadio = (e) => {
    setrecurring(e.target.value);
  };
  // Get Properties
  // Get Vendors

  // Remove Vendor
  const removeVendor = (id) => {
    const deleteItem = vendor.filter((ind) => {
      return ind !== id;
    });
    setVendor(deleteItem);
  };
  // Add Tasks
  const formData = new FormData();
  formData.append("property", propertyId);
  formData.append("unit", unitId);
  for (let i = 0; i < vendor.length; i++) {
    formData.append(`assignedTo[${[i]}]`, vendor[i]);
  }
  formData.append(`assignedToMe`, isLandlord);
  formData.append("title", form.title);
  formData.append("dueDate", form.due_date);
  formData.append("status", form.status);
  formData.append("priority", form.priority);
  formData.append("notifyAssignee", assigneeChecked ? assigneeChecked : false);
  formData.append(
    "notifyTenant",
    notifyTenantChecked ? notifyTenantChecked : false
  );
  if (recurring === 2) {
    formData.append("startDate", recurring_form.start_date);
    formData.append("endDate", recurring_form.end_date);
    formData.append("frequency", recurring_form.frequency);
    formData.append("recurring", true);
  }
  formData.append("description", form.description);
  Images.forEach((img) => {
    formData.append("images", img);
  });

  const addTask = () => {
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
      UseFormDataHook("task", formData);
    } else if (recurring === 2) {
      for (const key in recurring_form) {
        if (recurring_form[key] === "") {
          newErrors[key] = `${key} is required`;
        }
      }
      if (Object.keys(newErrors).length === 0) {
        UseFormDataHook("task", formData);
      }
    } else {
      UseFormDataHook("task", formData, onClose, setloader, "", "", setUpdate);
    }
  };
  return (
    <>
      <div className="payment-modal-container">
        <div className="payment-method-modal property-details-view-task-modal">
          <div className="modal-heading d-flex justify-content-between align-items-center p-41 pt-20 property-details-view-add-task-modal-heading-main">
            <h1>Add New Tasks</h1>
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
                  Tenant Property/Unit/Name
                  <span className="sign-up-imp-star">*</span>
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
                                <div key={item.id}>
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
                                      {/* <p className="mb-0 create-task-owner">
                                        {localStorage.getItem("name")}
                                      </p> */}
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
                                </div>
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
                <p className="mb-0">Assigned To</p>
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
                        {VendorData.length > 0 ? (
                          VendorData.filter((e) =>
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
                                <span className="candidate-name ms-2">{ }</span>
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
                    {VendorData?.filter((e) => vendor.includes(e.id)).map(
                      (item) => {
                        return (
                          <>
                            <div className="selected-vendors d-flex align-items-center position-relative">
                              {isLandlord && (
                                <div className="selected-vendors me-2">
                                  <span className="candidate-name ms-2">
                                    {localStorage.getItem("name")} (YOU)
                                  </span>
                                </div>
                              )}
                              <img
                                src={`${item.profileImage}`}
                                className="rounded-5 property-table-image mw_40 mh_40"
                                alt=""
                              />{" "}
                              <span className="candidate-name ms-2 position-relative">
                                {item.firstName} {item.lastName}
                              </span>
                              {/* <span className="candidate-remove-btn cursor">
                                {" "}
                                <svg
                                  width={18}
                                  height={18}
                                  fill="#fff"
                                  stroke="#fff"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1}
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M18 6 6 18" />
                                  <path d="m6 6 12 12" />
                                </svg>
                              </span> */}
                            </div>
                          </>
                        );
                      }
                    )}
                  </div>
                ) : (
                  <>
                    {isLandlord && (
                      <div className="selected-vendor-container d-flex gap-3 mt-3 align-items-center ">
                        <div className="selected-vendors">
                          <span className="candidate-name ms-2">
                            {localStorage.getItem("name")}
                          </span>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="p-41">
            <div className="row mt-3">
              <div className="col-md-12 text-start">
                <span>
                  Title<span className="sign-up-imp-star">*</span>
                </span>
                <input
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="Title"
                  type="text"
                  className="form-control"
                />
                {errors.title && (
                  <span className="text-danger fw-semibold mt-3">
                    {errors.title}
                  </span>
                )}
              </div>
            </div>
            <div className="task-modal-scroll">
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
                          zIndexPopup: 99999,
                          fontFamily: "Montserrat",
                          fontSize: 16,
                          colorText: "#667085",
                          colorTextPlaceholder: "#667085",
                          colorPrimaryHover: "#EF6B3E",
                          borderRadius: 4,
                          colorPrimary: "#EF6B3E",
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
                            e
                          ).toLocaleDateString();
                          handleChange("due_date", formattedDate);
                        }}
                        suffixIcon={calendar}
                        style={{
                          width: "100%",
                          height: 45,
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
                        ]}
                      />
                    </Space>
                  </ConfigProvider>
                  {errors.priority && (
                    <span className="text-danger fw-semibold mt-3">
                      {errors.priority}
                    </span>
                  )}
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-12">
                  <span>Description</span>
                  <textarea
                    onChange={(e) =>
                      handleChange("description", e.target.value)
                    }
                    name=""
                    id=""
                    cols="30"
                    rows="4"
                    className="form-control"
                    placeholder="Add description"
                  ></textarea>
                  {errors.description && (
                    <span className="text-danger fw-semibold mt-3">
                      {errors.description}
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
                      <Radio value={1}>One Time Task</Radio>
                      <Radio value={2}>Recurring Task</Radio>
                    </Radio.Group>
                  </ConfigProvider>
                </div>
              </div>
              {recurring === 2 ? (
                <>
                  <div className="row mt-3">
                    <div className="col-md-4">
                      <span>
                        Start Date<span className="sign-up-imp-star">*</span>
                      </span>
                      <ConfigProvider
                        theme={{
                          components: {
                            DatePicker: {
                              zIndexPopup: 99999,
                              fontFamily: "Montserrat",
                              fontSize: 16,
                              colorText: "#667085",
                              colorTextPlaceholder: "#667085",
                              colorPrimaryHover: "#EF6B3E",
                              borderRadius: 4,
                              colorPrimary: "#EF6B3E",
                            },
                          },
                        }}
                      >
                        <DatePicker
                          onChange={(e, dateString) => {
                            const formattedDate = new Date(
                              e
                            ).toLocaleDateString();
                            handleChangeRecurring("start_date", formattedDate);
                          }}
                          suffixIcon={calendar}
                          style={{
                            width: "100%",
                            height: 45,
                          }}
                          format={dateFormat}
                        />
                      </ConfigProvider>
                      {errors.start_date && (
                        <span className="text-danger fw-semibold">
                          {errors.start_date.split("_").join(" ")}
                        </span>
                      )}
                    </div>
                    <div className="col-md-4">
                      <span>
                        End Date<span className="sign-up-imp-star">*</span>
                      </span>
                      <ConfigProvider
                        theme={{
                          components: {
                            DatePicker: {
                              zIndexPopup: 99999,
                              fontFamily: "Montserrat",
                              fontSize: 16,
                              colorText: "#667085",
                              colorTextPlaceholder: "#667085",
                              colorPrimaryHover: "#EF6B3E",
                              borderRadius: 4,
                              colorPrimary: "#EF6B3E",
                            },
                          },
                        }}
                      >
                        <DatePicker
                          onChange={(e, dateString) => {
                            const formattedDate = new Date(
                              e
                            ).toLocaleDateString();
                            setendDate(dateString);
                            handleChangeRecurring("end_date", formattedDate);
                          }}
                          suffixIcon={calendar}
                          style={{
                            width: "100%",
                            height: 45,
                          }}
                          format={dateFormat}
                        />
                      </ConfigProvider>
                      {errors.end_date && (
                        <span className="text-danger fw-semibold">
                          {errors.end_date.split("_").join(" ")}
                        </span>
                      )}
                    </div>
                    <div className="col-md-4">
                      <span>
                        Frequency<span className="sign-up-imp-star">*</span>
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
                      </ConfigProvider>
                      {errors.frequency && (
                        <span className="text-danger fw-semibold">
                          {errors.frequency}
                        </span>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}
              <div className="row mt-3">
                <div className="col-md-12">
                  <span>Upload Media</span>
                  <div className="dragger mt-3">
                    <FileUploader setImages={setImages} Images={Images} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-content-footer-section-scroll p-custom">
            <div className="row mt-3">
              <div className="col-md-12 d-flex justify-content-between responsive-direction-column">
                <div className="modal-check-box-container d-flex align-items-center responsive-modal-checkbox">
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
                  <span className="me-2 task-checkbox-text">
                    Notify Assignee
                  </span>
                  <input
                    onChange={(e) => {
                      setNotifyTenantChecked(e.target.checked);
                    }}
                    type="checkbox"
                    name=""
                    id=""
                    checked={notifyTenantChecked}
                    className={
                      notifyTenantChecked
                        ? "checked ms-2"
                        : "me-2 mobile-resp-height-width"
                    }
                  />{" "}
                  <span className="task-checkbox-text">Notify Tenant</span>
                </div>
                <div className="task-modal-footer-btn">
                  <button
                    onClick={() => {
                      addTask();
                      setloader(true)
                    }}
                    className="modal-save-task-btn"
                  >
                    Save {loader && <ModalLoader />}
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

export default AddNewTaskModal;
