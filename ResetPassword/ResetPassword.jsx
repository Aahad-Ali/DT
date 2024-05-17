import React, { useState } from "react";
import SignUpLeftBanner from "../SignUpLeftBanner/SignUpLeftBanner";
import ChevronLeft from "assets/chevron-left.png";
import PlayStore from "assets/Google Play Badge.png";
import AppStore from "assets/App Store Badge.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PasswordResetModal from "Modals/PasswordResetModal/PasswordResetModal";
import checkPassIconGreen from "assets/_CheckboxGreen.png";
import checkPassIconRed from "assets/_CheckboxRed.png";
import { message } from "antd";
const ResetPassword = () => {
  // States start
  const [password, setPassword] = useState("");
  const [Cpassword, setCPassword] = useState("");
  const [openModal, setOpenModal] = useState(false);
  // States end

  const navigate = useNavigate();
  const onOpenModal = () => {
    setOpenModal(true);
  };
  const onCloseModal = () => {
    setOpenModal(false);
  };
  // Regex
  const checkPasswordCriteria = (password) => {
    const hasMinimumLength = /.{8,}/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*()_+={}\[\]:;,<.>?/\\~-]/.test(
      password
    );

    return {
      hasMinimumLength,
      hasNumber,
      hasUpperCase,
      hasSpecialCharacter,
    };
  };
  const passwordCriteria = checkPasswordCriteria(password);
  const config = require("Helpers/config.json");
  const search = useLocation().search;
  const token = new URLSearchParams(search).get("token");
  const ResetPassword = () => {
    if (password === "" || Cpassword === "") {
      message.error("Please Fill mandatory fields to continue");
    } else if (Cpassword != password) {
      message.error("Password does not match");
    } else if (
      !passwordCriteria.hasMinimumLength ||
      !passwordCriteria.hasNumber ||
      !passwordCriteria.hasUpperCase ||
      !passwordCriteria.hasUpperCase ||
      !passwordCriteria.hasSpecialCharacter
    ) {
      message.error("Please choose another password");
    } else {
      fetch(`${config["baseUrl"]}/api/auth/landlord/resetpassword`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          token: token,
          newPassword: password,
          confirmPassword: Cpassword,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          if (res.apiCallStatus === "success") {
            navigate("/land-lord-sign-in");
            message.success("Password reset successful");
          } else {
            message.error(res.error.message);
          }
        });
    }
  };
  return (
    <>
      {openModal ? (
        <PasswordResetModal
          route="land-lord-sign-in"
          passwordResetBtnText="Login"
          onClose={onCloseModal}
        />
      ) : (
        ""
      )}
      <div className="container-fluid">
        <div className="row" style={{height:'100vh'}}>
        <div className="height-issue col-xl-7 col-lg-12 col-md-12 p-0" >
            <SignUpLeftBanner />

          </div>
          <div className="col-xl-5 col-lg-12 col-md-8 ps-5 pe-5">
            <div className="reset-password-heading my-5 pt-5">
              <h1>Reset Password</h1>
              <p>Create a new password for your account</p>
            </div>
            <div className="reset-password">
              <div className="row mt-4">
                <div className="col-md-12">
                  <span>
                    Create new password
                    <span className="reset-password-imp-star">*</span>
                  </span>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="form-control"
                    placeholder="Create New Password"
                  />
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-12">
                  <span>
                    Confirm Password
                    <span className="reset-password-imp-star">*</span>
                  </span>
                  <input
                    onChange={(e) => setCPassword(e.target.value)}
                    type="password"
                    className="form-control"
                    placeholder="Confirm Password"
                  />
                </div>
              </div>
              <div className="password-validation-list mt-4">
                <ul className="password-validation-list-menu p-0 d-flex flex-column gap-2">
                  <li>
                    {" "}
                    <img
                      src={
                        passwordCriteria.hasMinimumLength
                          ? checkPassIconGreen
                          : checkPassIconRed
                      }
                      className="me-2"
                      alt=""
                    />{" "}
                    Must be at least 8 characters.
                  </li>
                  <li>
                    {" "}
                    <img
                      src={
                        passwordCriteria.hasNumber
                          ? checkPassIconGreen
                          : checkPassIconRed
                      }
                      className="me-2"
                      alt=""
                    />{" "}
                    Must contain at least 1 number
                  </li>
                  <li>
                    {" "}
                    <img
                      src={
                        passwordCriteria.hasUpperCase
                          ? checkPassIconGreen
                          : checkPassIconRed
                      }
                      className="me-2"
                      alt=""
                    />{" "}
                    Must contain at least 1 upper letter
                  </li>
                  <li>
                    {" "}
                    <img
                      src={
                        passwordCriteria.hasSpecialCharacter
                          ? checkPassIconGreen
                          : checkPassIconRed
                      }
                      className="me-2"
                      alt=""
                    />{" "}
                    Must contain at least 1 special character
                  </li>
                </ul>
              </div>
              <div className="row mt-4">
                <div className="col-md-12">
                  <div className="reset-password-buttons d-flex gap-4 ">
                    <button
                      onClick={ResetPassword}
                      className="reset-password-btn w-100"
                    >
                      Reset Password
                    </button>
                  </div>
                </div>
              </div>
              <div className="already-account-text text-center mt-5">
                <span>
                  <img src={ChevronLeft} alt="" />
                  <Link
                    to="/tenant-sign-in"
                    className="custom-link-text fw-medium"
                  >
                    Back to log in
                  </Link>
                </span>
              </div>
              <div className="get-app d-flex gap-4 justify-content-center align-items-center text-center mt-5">
                <img src={PlayStore} alt="" />
                <img src={AppStore} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
