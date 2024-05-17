import { useState } from "react";
import "../../style/login.css";
import SignUpLeftBanner from "../SignUpLeftBanner/SignUpLeftBanner";
import facebookIcon from "assets/fb login.png";
import googleIcon from "assets/google login.png";
import { Link, useNavigate } from "react-router-dom";
import UseJsonHook from "Hooks/UseJsonHook";
import GoogleAuth from "Hooks/GoogleAuth";
import DigitalTenantLogo from "assets/Dt logo.png";
import Or from 'assets/login-or-image.png'
import { LoginSocialFacebook } from "reactjs-social-login";
import { InputField, PasswordField, ButtonVariant1 } from "Components/GeneralComponents";

const LandLordSignIn = () => {
  // States start
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [facebookLogin, setFacebookLogin] = useState(null);

  // const navigate = useNavigate();

  // States end
  const loginLandlord = () => {
    UseJsonHook(
      "landlord",
      email,
      password,
      setEmailError,
      setPassError,
      setLoader
    );
  };
  const googleAuth = () => {
    GoogleAuth("landlord");
  };

  const resolveFacebook = (response) => {
    console.log(response)
    setFacebookLogin(response.data)
  }
  // Completed Merge
  const rejectFacebook = (error) => {
    console.log(error)
  }

  return (
    <>
      <div className="container-fluid ">
        {loader && (
          <div className="loader-container">
            <span className="loader"></span>
          </div>
        )}
        <div className="row background-image-login" style={{ background: 'black', height: '100vh' }}>
          <div className="height-issue col-xl-7 col-lg-12 col-md-12 p-0" >
            <SignUpLeftBanner />

          </div>
          <div className="col-xl-5 col-lg-12 col-md-12 pt-5 ps-5 pe-5" style={{ background: '#fff' }}>
            <div className="land-lord-sign-in pt-2 ps-4 pe-4">
              <div className="onboarding-right-heading text-start mb-5">
                <div
                  className="logo-container text-center" style={{ marginBottom: '100px' }}>
                  <img src={DigitalTenantLogo} className="img-fluid " style={{ width: '50%' }} alt="" />
                </div>

                <h1 className="mt-5">Login to Landlord Portal</h1>
                {/* <p>Create your account if not registered yet</p> */}
                <div className="col-md-12 mt-3 not-a-member">
                  Not a member yet?{" "}
                  <Link
                    className="primary-orange-text"
                    to="/land-lord-signup"
                  >
                    Register Now!
                  </Link>
                </div>
              </div>
              <div className="sign-in-fields">
                <div className="row mt-4">
                  <div className="col-md-12">
                    <InputField
                      name={"email"}
                      type={"email"}
                      placeholder={"Email"}
                      isLabel={false}
                      value={email}
                      handler={(e) => setEmail(e.target.value)}
                      isError={emailError}
                    />
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-md-12">
                    <PasswordField
                      handler={(e) => setPassword(e.target.value)}
                      name={"password"}
                      type={"password"}
                      placeholder={"Password"}
                      isLabel={false}
                      value={password}
                      isError={passError}
                    />
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-md-12">
                    <div className="sign-up-buttons d-flex justify-content-center">
                      <ButtonVariant1 handler={loginLandlord}>Sign In</ButtonVariant1>
                    </div>
                  </div>
                </div>
                <div className="remember-me-checkBox d-flex justify-content-center align-items-center mt-4">
                  <p className="text-end">
                    <Link
                      to="/landlord-forgot-password"
                      className="sign-in-style-text"
                    >
                      Forgot Password?
                    </Link>
                  </p>
                </div>
                <div className="remember-me-checkBox d-flex justify-content-center">
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
                <div className="row mb-3" style={{ marginTop: '50px' }}>
                  <div className="col-md-12 text-center not-a-member">
                    Login as {" "}
                    <Link
                      className="primary-orange-text"
                      to="/tenant-sign-in"
                    >
                      Tenant
                    </Link>
                    <nbsp /> or {" "}
                    <Link
                      className="primary-orange-text"
                      to="/service-professional-sign-in"
                    >
                      Service Professional
                    </Link>
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

export default LandLordSignIn;
