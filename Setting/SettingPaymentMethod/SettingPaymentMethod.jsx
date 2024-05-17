import React from "react";
import blackBoxStar from "assets/star.png";
import whiteBoxWallet from "assets/wallet-03.png";
import ProIcon from "assets/pro-Icon.png";
import PremiumIcon from "assets/premium-icon.png";
import { Switch, ConfigProvider } from "antd";
const SettingPaymentMethod = () => {
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };
  return (
    <>
      <p className="heading">SUBSCRIPTION</p>
      <div className="setting-sub-box-container d-flex align-items-center justify-content-between gap-5 mt-4">
        <div className="setting-sub-black-box">
          <div className="sub-black-box-upper d-flex justify-content-between align-items-start p-3">
            <div className="sub-black-box-text">
              <span>Current Subscription Plan</span>
              <p>$25.00</p>
              <button className="sub-black-box-btn mt-5">Change Plan</button>
            </div>
            <div className="sub-black-box-img">
              <img src={blackBoxStar} alt="" />
            </div>
          </div>
        </div>
        <div className="setting-sub-white-box">
          <div className="sub-white-box-upper d-flex justify-content-between align-items-start p-3">
            <div className="sub-black-box-text">
              <span>Current Subscription Plan</span>
              <p>
                $15.00{" "}
                <span className="primary-orange-text">(Pros Service)</span>{" "}
              </p>
              <button className="sub-white-box-btn mt-5">
                Manage Payment{" "}
              </button>
            </div>
            <div className="sub-black-box-img">
              <img src={whiteBoxWallet} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="sub-payment-heading mt-3">
        <div className="row">
          <div className="col-md-6">
            <p className="heading">SELECT A PLAN</p>
          </div>
          <div className="col-md-6 text-end">
            <span className="me-3">Yearly </span>

            <ConfigProvider
              theme={{
                components: {
                  Switch: {
                    colorPrimary: "#EF6B3E",
                    colorPrimaryHover: "#EF6B3E",
                  },
                },
              }}
            >
              <Switch defaultChecked onChange={onChange} />
            </ConfigProvider>

            <span className="ms-3"> Monthly</span>
          </div>
        </div>
      </div>
      <div className="upgrade-place-container mt-3">
        <div className="row">
          <div className="col-md-6">
            <div className="land-lord-package rounded border ">
              <div className="package-name text-start border-bottom d-flex align-items-center justify-content-between">
                <div className="package-name-and-icon-container">
                  <img src={ProIcon} alt="" /> Pro Service
                </div>
                <div className="package-select-radio-container">
                  <input type="radio" name="pro" id="pro" />
                </div>
              </div>
              <div className="package-details text-start">
                <span className="limited-time-text-subscription">
                  Limited time only
                </span>
                <p className="mt-3">
                  {" "}
                  <span className="package-big-text text-dark">$99</span> per
                  month <br />
                  Includes up to 10 users, 20GB indiviual data and access to all
                  features.
                </p>
                <p className="fw-bold ">Inludes:</p>
                <p>Unlimited free viewers</p>
                <p>Unlimited items</p>
                <p>200+ templates</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 ">
            <div className="land-lord-package rounded border ms-auto setting-package-box">
              <div className="package-name text-start border-bottom d-flex align-items-center justify-content-between">
                <div className="package-name-and-icon-container">
                  <img src={PremiumIcon} alt="" /> Platinum Service
                </div>
                <div className="package-select-radio-container">
                  <input type="radio" name="premium" id="premium" />
                </div>
              </div>
              <div className="package-details text-start">
                <span className="limited-time-text-subscription">
                  Limited time only
                </span>
                <p className="mt-3">
                  <span className="package-big-text text-dark">$149</span> per
                  month <br />
                  Includes up to 10 users, 20GB indiviual data and access to all
                  features.
                </p>
                <p className="fw-bold ">Inludes:</p>
                <p>Unlimited free viewers</p>
                <p>Unlimited items</p>
                <p>200+ templates</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-4">
        <div className="setting-btn my-4 d-flex align-items-center gap-4">
          <button className="cancel-btn">Cancel</button>
          <button className="save-btn">Save</button>
        </div>
      </div>
    </>
  );
};

export default SettingPaymentMethod;
