import { useState } from "react";
import OnboardSignUpLeftBanner from "../OnboardSignUpLeftBanner/OnboardSignUpLeftBanner";
import checkPassIconGreen from "assets/_CheckboxGreen.png";
import checkPassIconRed from "assets/_CheckboxRed.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { message, ConfigProvider, Select } from "antd";
import PaymentSuccessModal from "Modals/PaymentSuccessModal/PaymentSuccessModal";
import chevronIcon from "assets/chevron-down.png";
import SignUpLeftBanner from "../OnboardSignUpLeftBanner/OnboardSignUpLeftBanner";
import DigitalTenantLogo from "assets/Dt logo.png";
import { ButtonVariant1, InputField, PasswordField } from "Components/GeneralComponents";
import facebookIcon from "assets/fb login.png";
import googleIcon from "assets/google login.png";
import GoogleAuth from "Hooks/GoogleAuth";
import Or from 'assets/login-or-image.png'
import { LoginSocialFacebook } from "reactjs-social-login";

const LandLordSignUp = () => {
  // States start

  const [showPass, setShowPass] = useState(false);
  const [Open, setOpen] = useState(false);
  const [agreeTermsChecked, setAgreeTermsChecked] = useState(false);
  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState({});
  const [facebookLogin, setFacebookLogin] = useState(null);
  const [form, setForm] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    phone: "",
    phoneType: "",
    locality: "",
    region: "",
    postalCode: "",
    country: "",
    businessName: "",
    address: "",
  });

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

  // Formated Phone number
  const [formattedNumber, setFormattedNumber] = useState("");

  // States end


  const usaStates = [
    { name: "Alabama", abbreviation: "AL" },
    { name: "Alaska", abbreviation: "AK" },
    { name: "Arizona", abbreviation: "AZ" },
    { name: "Arkansas", abbreviation: "AR" },
    { name: "California", abbreviation: "CA" },
    { name: "Colorado", abbreviation: "CO" },
    { name: "Connecticut", abbreviation: "CT" },
    { name: "Delaware", abbreviation: "DE" },
    { name: "Florida", abbreviation: "FL" },
    { name: "Georgia", abbreviation: "GA" },
    { name: "Hawaii", abbreviation: "HI" },
    { name: "Idaho", abbreviation: "ID" },
    { name: "Illinois", abbreviation: "IL" },
    { name: "Indiana", abbreviation: "IN" },
    { name: "Iowa", abbreviation: "IA" },
    { name: "Kansas", abbreviation: "KS" },
    { name: "Kentucky", abbreviation: "KY" },
    { name: "Louisiana", abbreviation: "LA" },
    { name: "Maine", abbreviation: "ME" },
    { name: "Maryland", abbreviation: "MD" },
    { name: "Massachusetts", abbreviation: "MA" },
    { name: "Michigan", abbreviation: "MI" },
    { name: "Minnesota", abbreviation: "MN" },
    { name: "Mississippi", abbreviation: "MS" },
    { name: "Missouri", abbreviation: "MO" },
    { name: "Montana", abbreviation: "MT" },
    { name: "Nebraska", abbreviation: "NE" },
    { name: "Nevada", abbreviation: "NV" },
    { name: "New Hampshire", abbreviation: "NH" },
    { name: "New Jersey", abbreviation: "NJ" },
    { name: "New Mexico", abbreviation: "NM" },
    { name: "New York", abbreviation: "NY" },
    { name: "North Carolina", abbreviation: "NC" },
    { name: "North Dakota", abbreviation: "ND" },
    { name: "Ohio", abbreviation: "OH" },
    { name: "Oklahoma", abbreviation: "OK" },
    { name: "Oregon", abbreviation: "OR" },
    { name: "Pennsylvania", abbreviation: "PA" },
    { name: "Rhode Island", abbreviation: "RI" },
    { name: "South Carolina", abbreviation: "SC" },
    { name: "South Dakota", abbreviation: "SD" },
    { name: "Tennessee", abbreviation: "TN" },
    { name: "Texas", abbreviation: "TX" },
    { name: "Utah", abbreviation: "UT" },
    { name: "Vermont", abbreviation: "VT" },
    { name: "Virginia", abbreviation: "VA" },
    { name: "Washington", abbreviation: "WA" },
    { name: "West Virginia", abbreviation: "WV" },
    { name: "Wisconsin", abbreviation: "WI" },
    { name: "Wyoming", abbreviation: "WY" },
  ];


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
  const OnOpenModal = () => {
    setOpen(true);
  };
  const OnCloseModal = () => {
    setOpen(false);
  };
  // Navigation State
  const navigate = useNavigate();
  // Regex

  let dropdownIcon;
  dropdownIcon = (
    <>
      <img src={chevronIcon} alt="" />
    </>
  );

  const selectPhoneType = [
    { name: "Mobile" },
    { name: "Home" },
    { name: "Office" },
  ];

  // const usaStates = [
  //   { name: "Alabama", abbreviation: "AL" },
  //   { name: "Alaska", abbreviation: "AK" },
  //   { name: "Arizona", abbreviation: "AZ" },
  //   { name: "Arkansas", abbreviation: "AR" },
  //   { name: "California", abbreviation: "CA" },
  //   { name: "Colorado", abbreviation: "CO" },
  //   { name: "Connecticut", abbreviation: "CT" },
  //   { name: "Delaware", abbreviation: "DE" },
  //   { name: "Florida", abbreviation: "FL" },
  //   { name: "Georgia", abbreviation: "GA" },
  //   { name: "Hawaii", abbreviation: "HI" },
  //   { name: "Idaho", abbreviation: "ID" },
  //   { name: "Illinois", abbreviation: "IL" },
  //   { name: "Indiana", abbreviation: "IN" },
  //   { name: "Iowa", abbreviation: "IA" },
  //   { name: "Kansas", abbreviation: "KS" },
  //   { name: "Kentucky", abbreviation: "KY" },
  //   { name: "Louisiana", abbreviation: "LA" },
  //   { name: "Maine", abbreviation: "ME" },
  //   { name: "Maryland", abbreviation: "MD" },
  //   { name: "Massachusetts", abbreviation: "MA" },
  //   { name: "Michigan", abbreviation: "MI" },
  //   { name: "Minnesota", abbreviation: "MN" },
  //   { name: "Mississippi", abbreviation: "MS" },
  //   { name: "Missouri", abbreviation: "MO" },
  //   { name: "Montana", abbreviation: "MT" },
  //   { name: "Nebraska", abbreviation: "NE" },
  //   { name: "Nevada", abbreviation: "NV" },
  //   { name: "New Hampshire", abbreviation: "NH" },
  //   { name: "New Jersey", abbreviation: "NJ" },
  //   { name: "New Mexico", abbreviation: "NM" },
  //   { name: "New York", abbreviation: "NY" },
  //   { name: "North Carolina", abbreviation: "NC" },
  //   { name: "North Dakota", abbreviation: "ND" },
  //   { name: "Ohio", abbreviation: "OH" },
  //   { name: "Oklahoma", abbreviation: "OK" },
  //   { name: "Oregon", abbreviation: "OR" },
  //   { name: "Pennsylvania", abbreviation: "PA" },
  //   { name: "Rhode Island", abbreviation: "RI" },
  //   { name: "South Carolina", abbreviation: "SC" },
  //   { name: "South Dakota", abbreviation: "SD" },
  //   { name: "Tennessee", abbreviation: "TN" },
  //   { name: "Texas", abbreviation: "TX" },
  //   { name: "Utah", abbreviation: "UT" },
  //   { name: "Vermont", abbreviation: "VT" },
  //   { name: "Virginia", abbreviation: "VA" },
  //   { name: "Washington", abbreviation: "WA" },
  //   { name: "West Virginia", abbreviation: "WV" },
  //   { name: "Wisconsin", abbreviation: "WI" },
  //   { name: "Wyoming", abbreviation: "WY" },
  // ];


  const handlePostalCodeChange = (e) => {
    // Update the state
    if (/^\d{0,5}$/.test(e.target.value)) handleChange("postalCode", e.target.value);
  };

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
  const landLordSignUp = () => {
    setLoader(false);
    const newErrors = {};
    for (const key in form) {
      if (form[key] === "") {
        newErrors[key] = `${key} is required`;
      }
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0 && form.phone.length === 10 && form.postalCode.length === 5) {
      console.log("dddd")
      setLoader(false);
    } else if (form.phone?.length !== 10) {
      message.error("phone number must be 10 digits");
    } else if (form.postalCode?.length !== 5) {
      message.error("Postal Code must be 5 digits");
    } else if (
      !passwordCriteria.hasMinimumLength ||
      !passwordCriteria.hasNumber ||
      !passwordCriteria.hasUpperCase ||
      !passwordCriteria.hasUpperCase ||
      !passwordCriteria.hasSpecialCharacter
    ) {
      message.error("Please choose another password");
      setLoader(false);
    } else if (agreeTermsChecked !== true) {
      message.error("please check terms and conditions to continue");
      setLoader(false);
    } else {
      fetch(`${config["baseUrl"]}/api/auth/landlord/signup`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          fname: form.fname,
          lname: form.lname,
          email: form.email,
          password: form.password,
          phone: form.phone,
          phoneType: form.phoneType,
          locality: form.locality,
          region: form.region,
          postalCode: form.postalCode,
          country: "USA",
          businessName: form.businessName,
          address: form.address,
        }),
      })

        .then((res) => {
          setLoader(true);

          return res.json();
        })
        .then((res) => {
          if (res.apiCallStatus === "success") {
            localStorage.setItem("token", res.message.token);
            setLoader(false);
            navigate(`/land-lord-subscription?email=${form.email}`);
            setLoader(true);

          } else {
            message.error(res.error.message);
            setLoader(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setLoader(false);
        });
    }
  };
  const googleAuth = () => {
    GoogleAuth("landlord");
  };


  return (
    <>
      {Open ? (
        <PaymentSuccessModal
          message="Account created successfully"
          success="Go to Dashboard"
          onClose={OnCloseModal}
          route="/"
        />
      ) : (
        ""
      )}
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

              <h1 className="mt-5">Register as a Landlord</h1>
              {/* <p>Create your account if not registered yet</p> */}
              <div className="col-md-12 mt-3 not-a-member">
                Not a member yet?{" "}
                <Link
                  className="primary-orange-text"
                  to="/land-lord-sign-in"
                >
                  Login Now!
                </Link>
              </div>
            </div>
            <div className="land-lord-sign-up">
              <div className="row">
                <div className="col-md-6 mt-3">

                  <InputField
                    name={"first name"}
                    type={"text"}
                    placeholder={"First Name"}
                    isLabel={true}
                    label="First Name"
                    handler={(e) => handleChange("fname", e.target.value)}
                    required={true}
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
                    required={true}
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
                    placeholder={"Email"}
                    isLabel={true}
                    label="Email"
                    handler={(e) => handleChange("email", e.target.value)}
                    required={true}

                  />
                  {errors.email && <span className="text-danger fw-bold">{errors.email}</span>}
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
                  />
                </div>
                <div className="col-md-6 mt-3">
                  <InputField
                    name={"email"}
                    type={"tel"}
                    placeholder={"Phone number"}
                    isLabel={true}
                    label="Phone"
                    handler={handleInputChange}
                    required={true}
                    value={formattedNumber}
                  />

                  {errors.phone && (
                    <span className="text-danger fw-bold">
                      {errors.phone.split("_").join(" ")}
                    </span>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mt-3">
                  <span>
                    Phone Type<span className="sign-up-imp-star">*</span>
                  </span>
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
                    <Select
                      showSearch
                      onChange={(e) => handleChange("phoneType", e)}
                      suffixIcon={dropdownIcon}
                      placeholder="Select Phone Type"
                      style={{
                        width: "100%",
                        height: 45,
                      }}
                      options={selectPhoneType.map((e) => {
                        return { value: e.name, label: e.name };
                      })}
                    />
                  </ConfigProvider>
                  {errors.phoneType && (
                    <span className="text-danger fw-bold">
                      {errors.phoneType.split("_").join(" ")}
                    </span>
                  )}
                </div>
                <div className="col-md-6 mt-3">
                  <InputField
                    name={"city"}
                    type={"text"}
                    placeholder={"Locality"}
                    isLabel={true}
                    label="City"
                    handler={(e) => handleChange("locality", e.target.value)}
                    required={true}
                  />

                  {errors.locality && (
                    <span className="text-danger fw-bold">{errors.locality}</span>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mt-3">
                  <span>
                    State<span className="sign-up-imp-star">*</span>
                  </span>
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
                    <Select
                      showSearch
                      onChange={(e) => handleChange("region", e)}
                      suffixIcon={dropdownIcon}
                      placeholder="Select State"
                      style={{
                        width: "100%",
                        height: 45,
                      }}
                      options={usaStates.map((e) => {
                        return { value: e.name, label: e.name };
                      })}
                    />
                  </ConfigProvider>
                  {errors.region && <span className="text-danger fw-bold">{errors.region}</span>}
                </div>

                <div className="col-md-6 mt-3">
                  <InputField
                    name={"zipcode"}
                    type={"number"}
                    placeholder={"Zip Code"}
                    isLabel={true}
                    label="Zip Code"
                    handler={handlePostalCodeChange}
                    required={true}
                    value={form.postalCode}

                  />

                  {errors.postalCode && (
                    <span className="text-danger fw-bold">
                      {errors.postalCode.split("_").join(" ")}
                    </span>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mt-3">
                  <InputField
                    name={"country"}
                    type={"text"}
                    placeholder={"country"}
                    isLabel={true}
                    label="Country"
                    required={true}
                    value={'USA'}
                    disabled

                  />

                </div>
                <div className="col-md-6 mt-3">
                  <InputField
                    name={"Business Name"}
                    type={"text"}
                    placeholder={"Business Name"}
                    isLabel={true}
                    label="Business Name"
                    handler={(e) => handleChange("businessName", e.target.value)}
                    required={true}
                  />

                  {errors.businessName && (
                    <span className="text-danger fw-bold">
                      {errors.businessName.split("_").join(" ")}
                    </span>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 mt-3">
                  <InputField
                    name={"Address"}
                    type={"text"}
                    placeholder={"Address"}
                    isLabel={true}
                    label="Address"
                    handler={(e) => handleChange("address", e.target.value)}
                    required={true}
                  />

                  {errors.address && <span className="text-danger fw-bold">{errors.address}</span>}
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-12 mt-3">
                  <div className="password-validation-list">
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
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-12" mt-3>
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
                      handler={landLordSignUp}>Create Account</ButtonVariant1>

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
export default LandLordSignUp;
