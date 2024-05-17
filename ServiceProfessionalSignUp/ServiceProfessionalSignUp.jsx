import React, { useState } from "react";
import facebookIcon from "assets/fb login.png";
import googleIcon from "assets/google login.png";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import SignUpLeftBanner from "../OnboardSignUpLeftBanner/OnboardSignUpLeftBanner";
import GoogleAuth from "Hooks/GoogleAuth";
import { LoginSocialFacebook } from "reactjs-social-login";
import Or from 'assets/login-or-image.png'
import { InputField, PasswordField } from "Components/GeneralComponents";
import DigitalTenantLogo from "assets/Dt logo.png";

const ServiceProfessionalSignUp = () => {
  // States start
  const navigate = useNavigate();
  const [agreeTermsChecked, setAgreeTermsChecked] = useState(false);
  const [formattedNumber, setFormattedNumber] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState({});
  const [facebookLogin, setFacebookLogin] = useState(null);
  const [form, setForm] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    phone: "",
  });

  // States end

  const handleChange = (fieldName, value) => {
    setForm({
      ...form,
      [fieldName]: value,
    });
  };

  const handleInputChange = (event) => {
    const input = event.target.value.replace(/\D/g, "");
    const formatted = formatPhoneNumber(input);
    setFormattedNumber(formatted);
    const unformatted = input.slice(0, 10);
    handleChange("phone", unformatted);
  };

  const formatPhoneNumber = (input) => {
    let formattedNumber = "";

    if (input.length > 0) {
      formattedNumber = `(${input.slice(0, 3)}`;

      if (input.length > 3) {
        formattedNumber += `) ${input.slice(3, 6)}`;
      }

      if (input.length > 6) {
        formattedNumber += `-${input.slice(6, 10)}`;
      }
    }

    return formattedNumber;
  };
  const googleAuth = () => {
    GoogleAuth("professional");
  };

  const resolveFacebook = (responce) => {
    console.log(responce)
    setFacebookLogin(responce.data)
  }
  const rejectFacebook = (error) => {
    console.log(error)
  }
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
  const passwordCriteria = checkPasswordCriteria(form.password);
  const config = require("Helpers/config.json");
  const serviceProfessionalSignUp = () => {
    setLoader(false);
    const newErrors = {};
    for (const key in form) {
      if (form[key] === "") {
        newErrors[key] = `${key} is required`;
      }
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length !== 0 && form.phone.length !== 10) {
      console.log("dddd");
      setLoader(false);
    } else if (form.phone?.length !== 10) {
      message.error("phone number must be 10 digits");
    } else if (
      !passwordCriteria.hasMinimumLength ||
      !passwordCriteria.hasNumber ||
      !passwordCriteria.hasUpperCase ||
      !passwordCriteria.hasUpperCase ||
      !passwordCriteria.hasSpecialCharacter
    ) {
      message.error("Please choose another password");
    } else if (agreeTermsChecked !== true) {
      message.error("please check terms and conditions to continue");
    } else {
      fetch(`${config["baseUrl"]}/api/auth/serviceprovider/signup`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          fname: form.fname,
          lname: form.lname,
          email: form.email,
          password: form.password,
          phone: form.phone,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          if (res.apiCallStatus === "success") {
            localStorage.setItem("role", res.message.role);
            localStorage.setItem("token", res.message.token);
            localStorage.setItem("name", res.message.name);
            localStorage.setItem("user_id", res.message._id);
            // OnOpenModal()
            navigate("/service-professional-sign-in");
            alert("Service Professional has been created successfully");
          } else {
            message.error("There is something wrong please try again later");
          }
        })
        .catch((err) => console.log(err, "error"));
    }
  };
  return (
    <>
      {loader && (
        <div className="loader-container">
          <span className="loader"></span>
        </div>
      )}
      <div className="container-fluid">
        <div className="row" style={{ height: '100vh' }}>
          <div className="height-issue col-xl-6 col-lg-12 col-md-12 p-0" >
            <SignUpLeftBanner />

          </div>
          <div className="col-xl-6 col-lg-12 col-md-12 ps-5 pe-3">
            <div className="onboarding-right-heading text-start mb-5">
              <div
                className="logo-container text-center" style={{ marginBottom: '100px' }}>
                <img src={DigitalTenantLogo} className="img-fluid " style={{ width: '50%' }} alt="" />
              </div>

              <h1 className="mt-5">Register as a Service Pro</h1>
              {/* <p>Create your account if not registered yet</p> */}
              <div className="col-md-12 mt-3 not-a-member">
                Not a member yet?{" "}
                <Link
                  className="primary-orange-text"
                  to="/service-professional-sign-in"
                >
                  Login Now!
                </Link>
              </div>
            </div>
            <div className="tenant-sign-up">
              <div className="row">
                <div className="col-md-6 mt-3">
                  <InputField
                    name={"first name"}
                    type={"text"}
                    placeholder={"First Name"}
                    isLabel={true}
                    label="First Name"
                    handler={(e) => handleChange("fname", e.target.value)}

                  />

                  {errors.fname && (
                    <span className="text-danger fw-bold">
                      {errors.fname.split("_").join(" ")}
                    </span>
                  )}
                </div>
                <div className="col-md-6 mt-3">
                  <InputField
                    name={"last name"}
                    type={"text"}
                    placeholder={"Last Name"}
                    isLabel={true}
                    label="Last Name"
                    handler={(e) => handleChange("lname", e.target.value)}

                  />

                  {errors.lname && (
                    <span className="text-danger fw-bold">
                      {errors.lname.split("_").join(" ")}
                    </span>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 mt-3">
                  <InputField
                    name={"email"}
                    type={"email"}
                    placeholder={"Company Email"}
                    isLabel={true}
                    label="Company Email"
                    handler={(e) => handleChange("email", e.target.value)}
                    required={true}

                  />

                  {errors.email && (
                    <span className="text-danger fw-bold">
                      {errors.email.split("_").join(" ")}
                    </span>
                  )}
                </div>
              </div>
              <div className="row ">
                <div className="col-md-6 mt-3">
                  <PasswordField
                    handler={(e) => handleChange('password', e.target.value)}
                    name={"password"}
                    type={"password"}
                    placeholder={"Password"}
                    isLabel={true}
                    label="Password"
                    required={true}
                  />

                </div>
                <div className="col-md-6 mt-3">
                  <InputField
                    handler={handleInputChange}
                    value={formattedNumber}
                    type="tel"
                    name={'phone'}
                    placeholder={'Company Phone number'}
                    className="form-control"
                    errorMessage={errors.phone}
                    isLabel={true}
                    required={true}

                    label="Company Phone No"
                  />

                  {errors.phone && (
                    <span className="text-danger fw-bold">
                      {errors.phone.split("_").join(" ")}
                    </span>
                  )}
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-12">
                  <div className="sign-up-terms-checkbox d-flex align-items-center">
                    <input
                      onChange={(e) => {
                        setAgreeTermsChecked(e.target.checked);
                      }}
                      type="checkbox"
                      name=""
                      id=""
                      checked={agreeTermsChecked}
                      className={agreeTermsChecked ? "checked" : ""}
                    />{" "}
                    <span>
                      I agree to all the{" "}
                      <span className="primary-orange-text">Terms</span> and{" "}
                      <span className="primary-orange-text">
                        Privacy policy{" "}
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-md-12">
                  <div className="sign-up-buttons d-flex justify-content-center">
                    <button
                      onClick={() => serviceProfessionalSignUp()}
                      className="create-accoutn-btn w-100"
                    >
                      Create account
                    </button>

                  </div>
                </div>
              </div>
              <div className="remember-me-checkBox d-flex justify-content-center mt-4">
                <p className="text-end">

                  <img src={Or} alt="" style={{ width: "100%" }} />

                </p>
                {/* <input type="checkbox" name="" id="" />{" "}
                <span>Remember me </span> */}
              </div>
              <div className="row mb-5 ">
                <div className="col-md-12">
                  <div className="sign-up-buttons d-flex gap-4 justify-content-center">

                    <button
                      onClick={googleAuth}
                      className="google-signup-btn"
                    >
                      <img src={googleIcon} alt="" style={{ width: '140px' }} />

                    </button>
                    <LoginSocialFacebook
                      appId="1129610314899200"
                      autoLoad={false}
                      onResolve={(response) => resolveFacebook(response)}
                      onReject={(error) => rejectFacebook(error)} >
                      <button className="facebook-signup-btn">
                        <img src={facebookIcon} alt="" style={{ width: '140px' }} />
                      </button>
                    </LoginSocialFacebook>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceProfessionalSignUp;
