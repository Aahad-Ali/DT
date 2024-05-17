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
const TenantSetPassword = () => {
  // States start
  const [password, setPassword] = useState("");
  const [Cpassword, setCPassword] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showCPass, setShowCPass] = useState(false);
  const [passError, setPassError] = useState(false);
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
      fetch(`${config["baseUrl"]}/api/auth/tenant/resetpassword`, {
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
            navigate("/tenant-sign-in");
            message.success("Password set successfully");
          } else {
            console.log(res);
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
        <div className="row">
          <div className="col-md-4">
            <SignUpLeftBanner
              leftBannerHeading="Start your journey with us!"
              leftBannerText="Generate Lorem Ipsum placeholder text for use in your graphic, print and web layouts."
            />
          </div>
          <div className="col-md-8">
            <div className="reset-password-heading my-5 pt-5">
              <h1>Set Password</h1>
              <p>Create a new password for your account</p>
            </div>
            <div className="reset-password">
              <div className="row mt-4">
                <div className="col-md-12">
                  <div className="password-input position-relative">
                    <span>
                      Create new password
                      <span className="reset-password-imp-star">*</span>
                    </span>
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      type={showPass === true ? "text" : "password"}
                      className="form-control"
                      placeholder="Create New Password"
                    />
                    {showPass === true ? (
                      <span
                        onClick={() => setShowPass(false)}
                        className={
                          passError ? "eye-on me-3 cursor" : "eye-on cursor"
                        }
                      >
                        <svg
                          width={21}
                          height={21}
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <path d="M12 9a3 3 0 1 0 0 6 3 3 0 1 0 0-6z" />
                        </svg>
                      </span>
                    ) : passError ? (
                      <span
                        onClick={() => setShowPass(true)}
                        className="eye-off me-3 cursor"
                      >
                        <svg
                          width={21}
                          height={21}
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                          <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
                          <path d="m1 1 22 22" />
                          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                        </svg>
                      </span>
                    ) : (
                      <span
                        onClick={() => setShowPass(true)}
                        className="eye-off cursor"
                      >
                        <svg
                          width={21}
                          height={21}
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                          <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
                          <path d="m1 1 22 22" />
                          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                        </svg>
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-12">
                  <div className="password-input position-relative">
                    <span>
                      Confirm Password
                      <span className="reset-password-imp-star">*</span>
                    </span>
                    <input
                      onChange={(e) => setCPassword(e.target.value)}
                      type={showCPass === true ? "text" : "password"}
                      className="form-control"
                      placeholder="Confirm Password"
                    />
                    {showCPass === true ? (
                      <span
                        onClick={() => setShowCPass(false)}
                        className={
                          passError ? "eye-on me-3 cursor" : "eye-on cursor"
                        }
                      >
                        <svg
                          width={21}
                          height={21}
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <path d="M12 9a3 3 0 1 0 0 6 3 3 0 1 0 0-6z" />
                        </svg>
                      </span>
                    ) : passError ? (
                      <span
                        onClick={() => setShowCPass(true)}
                        className="eye-off me-3 cursor"
                      >
                        <svg
                          width={21}
                          height={21}
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                          <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
                          <path d="m1 1 22 22" />
                          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                        </svg>
                      </span>
                    ) : (
                      <span
                        onClick={() => setShowCPass(true)}
                        className="eye-off cursor"
                      >
                        <svg
                          width={21}
                          height={21}
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                          <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
                          <path d="m1 1 22 22" />
                          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                        </svg>
                      </span>
                    )}
                  </div>
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
              <div className="already-account-text text-center mt-4">
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
              {/* <div className="get-app d-flex gap-4 justify-content-center align-items-center text-center mt-5">
                <img src={PlayStore} alt="" />
                <img src={AppStore} alt="" />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TenantSetPassword;
