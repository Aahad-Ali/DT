import { message } from "antd";
import React, { useState } from "react";
import config from "Helpers/config";
import ModalLoader from "Components/GeneralComponents/ModalLoader";
const SettingLoginInfo = () => {
  // States start
  const [oldPass, setoldPass] = useState("");
  const [newPass, setnewPass] = useState("");
  const [cnewPass, setcnewPass] = useState("");
  const [loader, setLoader] = useState(false);
  const [form, setForm] = useState({
    file_name: "",
  });

  const [errors, setErrors] = useState({});
  const handleChange = (fieldName, value) => {
    setForm({
      ...form,
      [fieldName]: value,
    });
  };
  // States end
  const updatepasswordLandlord = () => {
    if (cnewPass !== newPass) {
      setLoader(false)
      message.error("New password does not match");
    } 
    if(oldPass===""){
      setLoader(false)
      message.error("Old password is required");
    }
    if(newPass===""){
      setLoader(false)
      message.error("New password is required");
    }
    if(cnewPass===""){
      setLoader(false)
      message.error("Confirm password is required");
    }
    else {
      fetch(`${config.baseUrl}/api/auth/landlord/updatepassword`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          oldPassword: oldPass,
          newPassword: newPass,
          confirmPassword: cnewPass,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          if (res.apiCallStatus === "success") {

            setoldPass("");
            setnewPass("");
            setcnewPass("");
            message.success("Password updated successfully");
            setLoader(false)
          } else {
            setLoader(false)

            message.error(res.error.message);
          }
        })
        .catch((e) => console.log(e, "error"));
    }
  };

  // =====================================================================================================
  const updatepasswordTenant = () => {
    if (cnewPass !== newPass) {
      message.error("New Password does not match");
    } else {
      fetch(`${config["baseUrl"]}/api/auth/tenant/updatepassword`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          oldPassword: oldPass,
          newPassword: newPass,
          confirmPassword: cnewPass,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          if (res.apiCallStatus === "success") {
            setoldPass("");
            setnewPass("");
            setcnewPass("");
            setLoader(false)

            message.success("Password updated successfully");
          } else {
            setLoader(false)

            message.error(res.error.message);
          }
        })
        .catch((e) => console.log(e, "error"));
    }
  };
  return (
    <>
      <p className="heading">LOGIN & PASSWORD</p>
      <p className="mb-0">Change Password</p>
      <p className="normal-grey-text">
        Lorem ipsum dolor sit amet consectetur.
      </p>
      <div className="row mt-3">
        <div className="col-md-12">
          <span>
            Current Password<span className="sign-up-imp-star">*</span>
          </span>
          <input
            value={oldPass}
            onChange={(e) => setoldPass(e.target.value)}
            type="password"
            className="form-control"
            placeholder="Current Password"
          />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-12">
          <span>
            New Password<span className="sign-up-imp-star">*</span>
          </span>
          <input
            value={newPass}
            onChange={(e) => setnewPass(e.target.value)}
            type="password"
            className="form-control"
            placeholder="New Password"
          />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-12">
          <span>
            Confirm Password<span className="sign-up-imp-star">*</span>
          </span>
          <input
            value={cnewPass}
            onChange={(e) => setcnewPass(e.target.value)}
            type="password"
            className="form-control"
            placeholder="Confirm Password"
          />
        </div>
      </div>
      <div className="row my-4">
       
        <div className="col-md-6 w-100">
          <button
            onClick={() => {
              setLoader(true)
              localStorage.getItem("role") === "tenant"
                ? updatepasswordTenant()
                : updatepasswordLandlord();
                
            }}
            className="save-btn d-flex justify-content-center gap-3"
          >
            Save{loader && <ModalLoader/>}
          </button>
        </div>
      </div>
    </>
  );
};

export default SettingLoginInfo;
