import React, { useEffect, useState } from "react";
import { Upload } from "antd";
import FileUploader from "Components/FileUploader/FileUploader";
import UseGetHook from "Hooks/UseGetHook";
import UseUrlParamsHook from "Hooks/UseUrlParamsHook";
import chevronIcon from "assets/chevron-down.png";
import ModalLoader from "Components/GeneralComponents/ModalLoader";


const { Dragger } = Upload;
const TenantTaskModal = ({ onClose }) => {
  const [Description, setDescription] = useState("");
  const [Owner, setOwner] = useState("");
  const [Images, setImages] = useState([]);
  const [DeletedImages, setDeletedImages] = useState([]);
  const [PropertySearch, setPropertySearch] = useState("");
  const [propertyDropdown, setpropertyDropdown] = useState(false);
  const [VendorDropdown, setVendorDropdown] = useState(false);
  const [propertyId, setPropertyId] = useState("");
  const [unitId, setunitId] = useState("");
  const [loader, setLoader] = useState(false);

  const [form, setForm] = useState({
    title: "",
  });
  const { id } = UseUrlParamsHook();
  const [errors, setErrors] = useState({});
  const handleChange = (fieldName, value) => {
    setForm({
      ...form,
      [fieldName]: value,
    });
  };
  // Fetch Data
  const { PropertyData, fetchPropertyTenant } = UseGetHook("properties");
  useEffect(() => {
    fetchPropertyTenant();
  }, []);
  // Fetch Data End
  // Get Properties
  const config = require("Helpers/config.json");
  // Add Tasks

  const formData = new FormData();
  formData.append("property", propertyId);
  // formData.append("unit", unitId);
  formData.append("title", form.title);
  formData.append("owner", Owner);
  // formData.append("status", "Unassigned");
  formData.append("description", Description);

  Images.forEach((img) => {
    formData.append("images", img);
  });

  const addTask = () => {
    const newErrors = {};
    for (const key in form) {
      if (form[key] === "") {
        newErrors[key] = `${key} is required`;
        setLoader(false);

      }
    }
    setErrors(newErrors);

    // if (!propertyId && !unitId) {
    //   newErrors["property"] = "property is required";
    // }
    if (Object.keys(newErrors).length === 0) {
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
            window.location.reload(true);
            setLoader(false);

          } else {
            console.log(res, "error");
            setLoader(false);

          }
        });
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
                  Property/Unit/Name
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
                                      setOwner(item.owner);
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
                                      {<p className="mb-0 create-task-owner">
                                        {localStorage.getItem("name")}
                                      </p>}

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
                  <span className="text-danger fw-bold">
                    {errors.title.split("_").join(" ")}
                  </span>
                )}
              </div>
            </div>
            <div className="task-modal-scroll">
              <div className="row mt-2">
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
                    <FileUploader
                      setImages={setImages}
                      Images={Images}
                      setDeletedImages={setDeletedImages}
                      DeletedImages={DeletedImages}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-content-footer-section-scroll p-custom">
            <div className="row mt-3">
              <div className="col-md-12 d-flex justify-content-between">
                <div className="modal-check-box-container d-flex align-items-center"></div>
                <div className="task-modal-footer-btn">
                  <button
                    onClick={() => {
                      addTask();
                      setLoader(true)
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

export default TenantTaskModal;
