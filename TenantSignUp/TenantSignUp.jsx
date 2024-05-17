import { useState } from "react";
import OnboardSignUpLeftBanner from "../OnboardSignUpLeftBanner/OnboardSignUpLeftBanner";
import { message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import GoogleAuth from "Hooks/GoogleAuth";
import SignUpLeftBanner from "../OnboardSignUpLeftBanner/OnboardSignUpLeftBanner";
import Or from 'assets/login-or-image.png'
import { LoginSocialFacebook } from "reactjs-social-login";
import { ButtonVariant1, InputField, PasswordField } from "Components/GeneralComponents";
import facebookIcon from "assets/fb login.png";
import googleIcon from "assets/google login.png";
import DigitalTenantLogo from "assets/Dt logo.png";


const TenantSignUp = () => {
  // States start
  const [showPass, setShowPass] = useState(false);
  const [showPassc, setShowPassc] = useState(false);
  const navigate = useNavigate();
  const [agreeTermsChecked, setAgreeTermsChecked] = useState(false);
  const [formattedNumber, setFormattedNumber] = useState("");
  const [loader, setLoader] = useState(false);
  const [facebookLogin, setFacebookLogin] = useState(null);

  const [form, setForm] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    cpassword: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  // States end

  const handleChange = (fieldName, value) => {
    setForm({
      ...form,
      [fieldName]: value,
    });
  };
  const resolveFacebook = (response) => {
    console.log(response)
    setFacebookLogin(response.data)
  }

  const rejectFacebook = (error) => {
    console.log(error)
  }

  const config = require("Helpers/config.json");
  const tenantSignUp = () => {
    const newErrors = {};
    for (const key in form) {
      if (form[key] === "") {
        newErrors[key] = `${key} is required`;
      }
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length !== 0 && form.phone.length !== 10 && form.cpassword !== form.password) {
      setLoader(false);
    } else if (form.phone?.length !== 10) {
      console.log("object1")
      message.error("phone number must be 10 digits");
    } else if (form.cpassword != form.password) {
      console.log("object2")
      message.error("Password and Confirm Password must be same");
    } else if (agreeTermsChecked !== true) {
      console.log("object3")
      message.error("Please agree to terms & conditions");
    } else {
      fetch(`${config["baseUrl"]}/api/auth/tenant/signup`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          fname: form.fname,
          lname: form.lname,
          email: form.email,
          password: form.password,
          cpassword: form.cpassword,
          phone: form.phone,
        }),
      })
        .then(async (res) => {
          return [res.status, await res.json()];
        })
        .then((res) => {
          let [status, json] = res;
          if (json.apiCallStatus === "success") {
            message.success("SignUp Successful");
            navigate("/tenant-sign-in");
          } else if (status == 409) {
            message.error("User Already Exists");
          }
        })
        .catch((err) => console.log(err, "error"));
    }
  };

  // Formated Phone number

  const handleInputChange = (event) => {
    const input = event.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    const formatted = formatPhoneNumber(input);
    setFormattedNumber(formatted); // Update state with formatted number
    const unformatted = input.slice(0, 10);
    handleChange("phone", unformatted); // Update state with unformatted number
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
    GoogleAuth("tenant");
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
          <div className=" col-xl-6 col-lg-12 col-md-12 ps-5 pe-3">
            <div className="onboarding-right-heading text-start mb-5">
              <div
                className="logo-container text-center" style={{ marginBottom: '100px' }}>
                <img src={DigitalTenantLogo} className="img-fluid " style={{ width: '50%' }} alt="" />
              </div>

              <h1 className="mt-5">Register as a Tenant</h1>
              {/* <p>Create your account if not registered yet</p> */}
              <div className="col-md-12 mt-3 not-a-member">
                Not a member yet?{" "}
                <Link
                  className="primary-orange-text"
                  to="/tenant-sign-in"
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
                    <span className="text-danger fw-bold">{errors.fname}</span>
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
                    <span className="text-danger fw-bold">{errors.lname}</span>
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
                    <span className="text-danger fw-bold">{errors.email}</span>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mt-3">
                  <PasswordField
                    handler={(e) => handleChange('password', e.target.value)}
                    name={"password"}
                    type={"password"}
                    placeholder={"Password"}
                    isLabel={true}
                    label="Password"
                    required={true}
                    errorMessage={errors.password}
                  />
                  {errors.password && (
                    <span className="text-danger fw-bold">
                      {errors.password}
                    </span>
                  )}
                </div>
                <div className="col-md-6 mt-3">
                  <PasswordField
                    handler={(e) =>
                      handleChange("cpassword", e.target.value)}
                    name={"cpassword"}
                    type={"password"}
                    placeholder={"Confirm Password"}
                    isLabel={true}
                    label="Confirm Password"
                    required={true}
                    errorMessage={errors.cpassword}
                  />
                  {errors.cpassword && (
                    <span className="text-danger fw-bold">
                      {errors.cpassword}
                    </span>
                  )}
                  {/* <div className="password-input position-relative">
                    <span>
                      Confirm Password
                      <span className="sign-up-imp-star">*</span>
                    </span>
                    <input
                      onChange={(e) =>
                        handleChange("cpassword", e.target.value)
                      }
                      type={showPassc === true ? "text" : "password"}
                      className={"form-control"}
                      placeholder="Confirm Password"
                    />
                    {errors.cpassword && (
                      <span className="text-danger fw-bold">
                        {errors.cpassword}
                      </span>
                    )}
                    {showPassc === true ? (
                      <span
                        onClick={() => setShowPassc(false)}
                        className={"eye-on cursor"}
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
                    ) : (
                      <span
                        onClick={() => setShowPassc(true)}
                        className="eye-off-signup cursor"
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
                  </div> */}
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 mt-3">
                  <InputField
                    handler={handleInputChange}
                    value={formattedNumber}
                    type="tel"
                    name={'phone'}
                    placeholder={'Phone number'}
                    className="form-control"
                    errorMessage={errors.phone}
                    isLabel={true}
                    required={true}

                    label="Phone No"
                  />
                </div>
              </div>
              <div className="row mt-3">
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

                    <ButtonVariant1
                      className="create-accoutn-btn w-100"
                      handler={tenantSignUp}>Create Account</ButtonVariant1>

                  </div>
                </div>
              </div>
              <div className="remember-me-checkBox d-flex justify-content-center mt-4">
                <p className="text-end">

                  <img src={Or} alt="" style={{ width: "100%" }} />

                </p>

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

export default TenantSignUp;
