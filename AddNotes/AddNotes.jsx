import React, { useState } from "react";
import UseUrlParamsHook from "Hooks/UseUrlParamsHook";
import { useNavigate } from "react-router-dom";
import FileUploader from "Components/FileUploader/FileUploader";
import UseFormDataHook from "Hooks/UseFormDataHook";

const AddNotes = () => {
  // States start
  const [Images, setImages] = useState([]);
  const [form, setForm] = useState({
    note_name: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const handleChange = (fieldName, value) => {
    setForm({
      ...form,
      [fieldName]: value,
    });
  };
  // States end

  const navigate = useNavigate();
  const { id } = UseUrlParamsHook();
  const formData = new FormData();
  formData.append("name", form.note_name);
  formData.append("description", form.description);
  Images.forEach((file) => {
    formData.append("file", file);
  });
  formData.append("property", id);
  const config = require("../../Helpers/config.json");
  const addNotes = () => {
    const newErrors = {};
    for (const key in form) {
      if (form[key] === "") {
        newErrors[key] = `${key} is required`;
      }
    }

    setErrors(newErrors);
    if (Images.length === 0) {
      newErrors["files"] = `file is required`;
    }
    if (Object.keys(newErrors).length === 0 && Images.length !== 0) {
      UseFormDataHook("note", formData);
    }
  };
  return (
    <>
      <div className="container bg-white p-3">
        <div className="row">
          <div className="col-md-12">
            <span className="property-details-input-title">
              Note Name<span className="sign-up-imp-star">*</span>
            </span>
            <input
              onChange={(e) => handleChange("note_name", e.target.value)}
              type="text"
              className="form-control"
            />
            {errors.note_name && (
              <span className="text-danger fw-semibold mt-3">
                {errors.note_name.split("_").join(" ")}
              </span>
            )}
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-12">
            <span className="property-details-input-title">
              Write Your Note<span className="sign-up-imp-star">*</span>
            </span>
            <textarea
              onChange={(e) => handleChange("description", e.target.value)}
              name=""
              id=""
              cols="30"
              rows="10"
              className="form-control"
            ></textarea>
            {errors.description && (
              <span className="text-danger fw-semibold mt-3">
                {errors.description.split("_").join(" ")}
              </span>
            )}
          </div>
        </div>
        <div className="row mt-4 text-center">
          <div className="col-md-12">
            <p className="property-details-input-title text-start">
              Note Image<span className="sign-up-imp-star">*</span>
            </p>
            <div className="dragger">
              <FileUploader setImages={setImages} Images={Images} />
              {errors.files && (
                <span className="text-danger fw-semibold mt-3">
                  {errors.files}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-12">
            <div className="notes-btn d-flex align-items-center justify-content-center gap-3">
              <button className="back-prev-btn">Cancel</button>
              <button
                to={"all-task"}
                onClick={addNotes}
                className="save-btn-same-class"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNotes;
