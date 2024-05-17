import React, { useEffect, useState } from "react";
import { ConfigProvider, Upload, Select, DatePicker, Radio } from "antd";
import chevronIconDown from "assets/chevron-down.png";
import calendarIcon from "assets/calendar-icon.png";
import chevronIcon from "assets/chevron-down.png";
import UseGetHook from "Hooks/UseGetHook";
import FileUploader from "Components/FileUploader/FileUploader";
import ModalLoader from "Components/GeneralComponents/ModalLoader";

const { Dragger } = Upload;
const { RangePicker } = DatePicker;

const AddNewTenantTaskModal = ({ onOpen, onClose, id }) => {
  const [notifyTenantChecked, setNotifyTenantChecked] = useState(false);
  const [assigneeChecked, setAssigneeChecked] = useState(false);
  const [title, setTitle] = useState("");
  const [dueDate, setdueDate] = useState("");
  const [status, setstatus] = useState("");
  const [priority, setpriority] = useState("");
  const [unitId, setunitId] = useState("");
  const [Description, setDescription] = useState("");
  const [startDate, setstartDate] = useState("");
  const [endDate, setendDate] = useState("");
  const [Frequency, setFrequency] = useState("");
  const [recurring, setrecurring] = useState(1);
  const [isLandlord, setIsLandlord] = useState(false);
  // Get Vendors
  const [VendorSearch, setVendorSearch] = useState("");
  const [VendorDropdown, setVendorDropdown] = useState(false);
  const [vendor, setVendor] = useState([]);
  const [Images, setImages] = useState([]);
  const [propertyId, setPropertyId] = useState("");
  const [loader, setLoader] = useState("");
  const [form, setForm] = useState({
    property_unit_name: "",
    title: "",
   
  });
  const [errors, setErrors] = useState({});
  const handleChange = (fieldName, value) => {
    setForm({
      ...form,
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
  // Fetch Data
  const { PropertyData, fetchPropertyTenant } = UseGetHook("properties");
  const { VendorData, fetchVendor } = UseGetHook("vendors");
  useEffect(() => {
    fetchPropertyTenant();
    fetchVendor();
  }, []);
  const AddVendor = () => {
    fetchVendor();
  };
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

  const onChangeRadio = (e) => {
    setrecurring(e.target.value);
  };
  // Add Tasks
  const formData = new FormData();
  formData.append("property", propertyId);
  if (unitId) formData.append("unit", unitId);
  for (let i = 0; i < vendor.length; i++) {
    formData.append(`assignedTo[${[i]}]`, vendor[i]);
  }
  formData.append("title", form.title);
  formData.append("dueDate", dueDate);
  formData.append("status", status);
  formData.append("priority", priority);
  formData.append("notifyAssignee", assigneeChecked ? assigneeChecked : false);
  formData.append(
    "notifyTenant",
    notifyTenantChecked ? notifyTenantChecked : false
  );
  if (recurring === 2) {
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("frequency", Frequency);
    formData.append("recurring", true);
  }

  formData.append("description", Description);

  Images.forEach((img) => {
    formData.append("images", img);
  });
  const config = require("Helpers/config.json");
  // const addTask = () => {
  //   if (
  //     (vendor.length === 0 && !isLandlord) ||
  //     title === "" ||
  //     dueDate === "" ||
  //     status === "" ||
  //     priority === ""
  //   ) {
  //     alert("Please fill required Fields");
  //   } else if (recurring === 2) {
  //     if (startDate === "" || endDate === "" || Frequency === "") {
  //       alert("Please fill required recurring Fields");
  //     } else {
  //       UseFormDataHook("task", formData, "", "", "", "","tenant")
  //     }
  //   } else {
  //     UseFormDataHook("task", formData, "", "", "", "","tenant")

  //   }
  // };

  const addTask = () => {
    const newErrors = {};
    for (const key in form) {
      if (form[key] === "") {
        newErrors[key] = `${key} is required`;
      }
    }
    setErrors(newErrors);
   
    if (!propertyId && !unitId) {
      newErrors["property"] = "property is required";
    
    } if (Object.keys(newErrors).length === 0) {
      fetch(`${config["baseUrl"]}/api/tenant/task`, {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: formData,
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          if (res.apiCallStatus === "success") {
            console.log(res, "success");
            setLoader(true)
          } else {
            console.log(res, "error");
          }
        });
    }
  };

  return (
    <>
      <div className="payment-modal-container">
        <div className="payment-method-modal property-details-view-task-modal">
          <div className="modal-heading d-flex justify-content-between align-items-center p-41 pt-20 property-details-view-add-task-modal-heading-main">
            <h1>Add New Task</h1>
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
              <div className="col-md-12">
                <span>
                  Tenant Property/Unit/Name
                  <span className="sign-up-imp-star">*</span>
                </span>
                <input
                  type="text"
                  value={PropertyData[0]?.title}
                  disabled
                  className="form-control"
                />
                {errors.property && (
                    <span className="text-danger fw-bold">
                      {errors.property}
                    </span>
                  )}
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
                  <span
                    onClick={() => {
                      setVendorDropdown(!VendorDropdown);
                    }}
                    className="multi-chevron cursor"
                  >
                    <img src={chevronIcon} alt="" />
                  </span>
                  {VendorDropdown ? (
                    <div className="dropdown-options p-3 create-task-vendor-container modal-content-main-section-scroll">
                      <div className="multi-select-options ">
                        {VendorData.length > 0 ? (
                          VendorData.filter((e) =>
                            e.firstName
                              .toLowerCase()
                              .includes(VendorSearch?.toLowerCase())
                          ).map((item) => {
                            return (
                              <div key={item.id}>
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
                                <span className="candidate-name ms-2">{}</span>
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
                            <div className="selected-vendors d-flex align-items-center">
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
                              <span className="candidate-name ms-2">
                                {item.firstName} {item.lastName}
                              </span>
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
              <div className="col-md-12">
                <span>
                  Ticket Title<span className="sign-up-imp-star">*</span>
                </span>
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  className="form-control"
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-4">
                <span>
                  Due Date<span className="sign-up-imp-star">*</span>
                </span>
                <ConfigProvider
                  theme={{
                    components: {
                      DatePicker: {
                        zIndexPopupBase: 99999,
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
                  <DatePicker
                    onChange={(e, dateString) => {
                      const formattedDate = new Date(e).toLocaleDateString();
                      setdueDate(formattedDate);
                    }}
                    suffixIcon={dateIcon}
                    style={{
                      width: "100%",
                      height: 45,
                    }}
                  />
                </ConfigProvider>
              </div>
              <div className="col-md-4">
                <span>
                  Status<span className="sign-up-imp-star">*</span>
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
                    placeholder="Select Status"
                    style={{
                      width: "100%",
                      height: 45,
                    }}
                    onChange={(e) => setstatus(e)}
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
                </ConfigProvider>
              </div>
              <div className="col-md-4">
                <span>
                  Priority<span className="sign-up-imp-star">*</span>
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
                    placeholder="Select Priority"
                    style={{
                      width: "100%",
                      height: 45,
                    }}
                    onChange={(e) => setpriority(e)}
                    options={[
                      {
                        value: "Medium",
                        label: "Medium",
                      },
                      {
                        value: "Low",
                        label: "Low",
                      },
                      {
                        value: "High",
                        label: "High",
                      },
                    ]}
                  />
                </ConfigProvider>
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
                ></textarea>
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
                          setstartDate(formattedDate);
                        }}
                        suffixIcon={dateIcon}
                        style={{
                          width: "100%",
                          height: 45,
                        }}
                      />
                    </ConfigProvider>
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
                      {" "}
                      <DatePicker
                        onChange={(e, dateString) => {
                          const formattedDate = new Date(
                            e
                          ).toLocaleDateString();
                          setendDate(dateString);
                          console.log(formattedDate);
                        }}
                        suffixIcon={dateIcon}
                        style={{
                          width: "100%",
                          height: 45,
                        }}
                      />
                    </ConfigProvider>
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
                        onChange={(e) => setFrequency(e)}
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
                </div>
              </>
            ) : (
              ""
            )}
            <div className="row mt-3">
              <div className="col-md-12">
                <span>Upload Media</span>
                <div className="dragger">
                  <FileUploader setImages={setImages} Images={Images} />
                  {/* <Dragger
                    multiple
                    action="http://localhost:3000/"
                    listType="picture"
                    accept=".png,.jpg,svg"
                    beforeUpload={(file) => {
                      console.log(file);
                      return false;
                    }}
                    onChange={(dragger) => {
                      console.log(dragger);
                      setimages(dragger.fileList);
                    }}
                  >
                    <p className="ant-upload-drag-icon">
                      <img src={fileUploadIcon} alt="" />
                    </p>
                    <p className="ant-upload-text property-images-file-uploader-text">
                      <span className="property-images-file-uploader-text-unique">
                        Click to upload
                      </span>{" "}
                      or drag and drop
                    </p>
                    <p className="ant-upload-hint property-images-file-uploader-text">
                      {" "}
                      SVG, PNG, JPG
                    </p>
                  </Dragger>
                </ConfigProvider> */}
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
                  <span className="ms-2 task-checkbox-text">Assignee</span>
                  <br />
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
                  <span className="ms-2 task-checkbox-text">Notify Tenant</span>
                </div>
                <div className="save-btn-main">
                  <button
                    onClick={() => {
                      addTask();
                      setLoader(true)
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

export default AddNewTenantTaskModal;
