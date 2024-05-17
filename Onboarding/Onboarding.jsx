import React, { useEffect, useState } from "react";
import TenantBoxIcon from "assets/Vector.png";
import LandLordBoxIcon from "assets/fi_11558245.png";
import ServiceProBoxIcon from "assets/Vector2.png";
import CheckBox from "assets/_Checkbox base.png";
import CheckBoxActive from "assets/_Checkbox active.png";
import { useLocation, useNavigate } from "react-router-dom";
import UseUrlParamsHook from "Hooks/UseUrlParamsHook";
import LoginLine from 'assets/Line-login.png'
import SignUpLeftBanner from "../OnboardSignUpLeftBanner/OnboardSignUpLeftBanner";
import DigitalTenantLogo from "assets/Dt logo.png";

const Onboarding = () => {
  const { name, email, token, role } = UseUrlParamsHook()
  // Navigate Statetgrh
  const navigate = useNavigate();
  const location = useLocation();
  // States start
  const [tenantBox, setTenantBox] = useState(false);
  const [LandLordBox, setLandLordBox] = useState(false);
  const [ServiceProBox, setServiceProBox] = useState(false);
  // States end
  useEffect(() => {
    if (name && email && token) {
      localStorage.setItem("email", email)
      localStorage.setItem("name", name)
      localStorage.setItem("token", token)
      localStorage.setItem("role", role)
      window.location = '/'
    }
  }, [])
  return (
    <>
      <div className="container-fluid">
        <div className="row " style={{height:'100vh'}}>
          <div className="height-issue col-xl-7 col-lg-12 col-md-12 p-0" >
            <SignUpLeftBanner />

          </div>
          <div className="col-xl-5 col-lg-12 col-md-12 mb-5">
            <div className="container mt-5 pt-5">
              <div
                className="logo-container text-center" style={{ marginBottom: '50px' }}>
                <img src={DigitalTenantLogo} className="img-fluid " style={{ width: '60%' }} alt="" />
              </div>
              <div className="onboarding-right-heading text-center mb-5">
                <h1>Welcome to DigitalTenant</h1>
                <p>Lorem ipsum dolor sit amet consectetur.</p>
              </div>
              <div className="onboarding-right mt-3">
                <div
                  onClick={() => {
                    setTenantBox(false);
                    setLandLordBox(true);
                    setServiceProBox(false);
                    setTimeout(() => {
                      navigate("/land-lord-sign-in");
                    }, 500);
                  }}
                  className="onboarding-select-boxes"
                >
                  <div
                    className={
                      LandLordBox === true
                        ? "onboarding-select-box active-box"
                        : "onboarding-select-box"
                    }
                  >
                    <div className="onboarding-select-box-left d-flex align-items-center gap-2">
                      <img
                        src={LandLordBoxIcon}
                        className="img-fluid object-fit-contain"
                        alt=""
                        style={{ width: '70px' }}
                      />

                      <img
                        src={LoginLine}
                        className="img-fluid object-fit-contain ps-2 pe-2"
                        alt=""
                        style={{ height: '100px' }}
                      />

                      <div className="onboarding-box-text">
                        I am a Landlord
                        <br />
                        Lorem ipsum dolor sit amet consectetur.
                      </div>
                    </div>
                    <div className="onboarding-select-box-check-box">
                      <img
                        src={LandLordBox === true ? CheckBoxActive : CheckBox}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="onboarding-right mt-3">
                <div className="onboarding-select-boxes ">
                  <div
                    onClick={() => {
                      setTenantBox(true);
                      setLandLordBox(false);
                      setServiceProBox(false);
                      setTimeout(() => {
                        navigate("/tenant-sign-in");
                      }, 500);
                    }}
                    className={
                      tenantBox === true
                        ? "onboarding-select-box active-box"
                        : "onboarding-select-box"
                    }
                  >
                    <div className="onboarding-select-box-left d-flex align-items-center gap-2">
                      <img
                        src={TenantBoxIcon}
                        className="img-fluid object-fit-contain "
                        alt=""
                        style={{ width: '70px' }}
                      />
                      <img
                        src={LoginLine}
                        className="img-fluid object-fit-contain ps-2 pe-2"
                        alt=""
                        style={{ height: '100px' }}
                      />
                      <div className="onboarding-box-text">
                        I am a Tenant
                        <br />
                        Lorem ipsum dolor sit amet consectetur.
                      </div>
                    </div>
                    <div className="onboarding-select-box-check-box">
                      <img
                        src={tenantBox === true ? CheckBoxActive : CheckBox}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="onboarding-right mt-3"  >
                <div
                  onClick={() => {
                    setTenantBox(false);
                    setLandLordBox(false);
                    setServiceProBox(true);
                    setTimeout(() => {
                      navigate("/service-professional-sign-in");
                      /*localStorage.setItem("token", "serviceprovider")
                                        window.location = '/'
                                        window.location.reload(true);*/
                    }, 500);
                  }}
                  className="onboarding-select-boxes "

                >
                  <div
                    className={
                      ServiceProBox === true
                        ? "onboarding-select-box active-box"
                        : "onboarding-select-box"
                    }

                  >
                    <div className="onboarding-select-box-left d-flex align-items-center gap-2">
                      <img
                        src={ServiceProBoxIcon}
                        className="img-fluid object-fit-contain"
                        alt=""
                        style={{ width: '70px' }}
                      />
                      <img
                        src={LoginLine}
                        className="img-fluid object-fit-contain ps-2 pe-2"
                        alt=""
                        style={{ height: '100px' }}
                      />
                      <div className="onboarding-box-text">
                        I am a Service Professional
                        <br />
                        Lorem ipsum dolor sit amet consectetur.
                      </div>
                    </div>
                    <div className="onboarding-select-box-check-box">
                      <img
                        src={ServiceProBox === true ? CheckBoxActive : CheckBox}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="already-account-text text-center mt-5">
                <p>
                  Don`t have an account?{" "}
                  <Link className="primary-orange-text" to="/tenant-sign-in">
                    Create Account{" "}
                  </Link>{" "}
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Onboarding;
