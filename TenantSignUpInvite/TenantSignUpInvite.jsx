import React, { useState } from "react";
import SignUpLeftBanner from "../SignUpLeftBanner/SignUpLeftBanner";
import checkPassIconBase from "assets/pass-validation-check.png";
import googleIcon from "assets/iconfinder_Google_1298745 1.png";
import { Link, useNavigate } from "react-router-dom";
const TenantSignUpInvite = () => {
  // States start
  const navigate = useNavigate();
  const [rememberChecked, setRememberChecked] = useState(false);
  // States end
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4">
            <SignUpLeftBanner
              leftBannerHeading="Start your journey with us!"
              leftBannerText="Generate Lorem Ipsum placeholder text for use in your graphic, print and web layouts."
            />
          </div>
          <div className="col-md-8">
            <div className="tenant-sign-up-heading my-5 pt-5">
              <h1>Create an account</h1>
              <p>Create your account if not registered yet</p>
            </div>
            <div className="tenant-sign-up">
              <div className="row mt-4">
                <div className="col-md-12">
                  <span>
                    Create Password<span className="sign-up-imp-star">*</span>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Create Password"
                  />
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-12">
                  <span>
                    Confirm Password<span className="sign-up-imp-star">*</span>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm Password"
                  />
                </div>
              </div>
              <div className="password-validation-list mt-4">
                <ul className="password-validation-list-menu p-0">
                  <li>
                    {" "}
                    <img src={checkPassIconBase} alt="" /> Must be at least 8
                    characters.
                  </li>
                  <li>
                    {" "}
                    <img src={checkPassIconBase} alt="" /> Must contain at least
                    1 number
                  </li>
                  <li>
                    {" "}
                    <img src={checkPassIconBase} alt="" /> Must contain at least
                    1 upper letter
                  </li>
                  <li>
                    {" "}
                    <img src={checkPassIconBase} alt="" /> Must contain at least
                    1 special character
                  </li>
                </ul>
              </div>
              <div className="row mt-4">
                <div className="col-md-12">
                  <div className="sign-up-terms-checkbox">
                    <input
                      onChange={(e) => {
                        setRememberChecked(e.target.checked);
                      }}
                      type="checkbox"
                      name=""
                      id=""
                      checked={rememberChecked}
                      className={rememberChecked ? "checked" : ""}
                    />{" "}
                    <span>Remember me</span>
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-12">
                  <div className="sign-up-buttons d-flex gap-4 ">
                    <button
                      onClick={() => navigate("/")}
                      className="create-accoutn-btn w-50"
                    >
                      Create account
                    </button>
                    <button className="google-signup-btn w-50">
                      <img src={googleIcon} alt="" /> Sign up with google
                    </button>
                  </div>
                </div>
              </div>
              <div className="already-account-text text-center mt-5">
                <p className="fw-bold">
                  Already have an account?{" "}
                  <Link
                    to="/tenant-sign-in"
                    className="primary-orange-text fw-medium"
                  >
                    Log In
                  </Link>
                </p>
              </div>
              {/*<div className="get-app d-flex gap-4 justify-content-center align-items-center text-center mt-5">
                                <img src={PlayStore} alt="" />
                                <img src={AppStore} alt="" />
                            </div>*/}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TenantSignUpInvite;
