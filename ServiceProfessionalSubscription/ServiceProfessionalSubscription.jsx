import React from "react";
import DigitalTenantLogo from "assets/Copy of DigitalTenant_Logo.png";
import { Switch, ConfigProvider } from "antd";
import ServiceProPackages from "../ServiceProPackages/ServiceProPackages";
import { useNavigate } from "react-router-dom";

const ServiceProfessionalSubscription = () => {
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };
  const navigate = useNavigate();
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12 ">
            <div className="land-lord-subscribe-heading text-center mt-3">
              <img src={DigitalTenantLogo} className="mb-3" alt="" />
              <h1>Select a subscription plan</h1>
            </div>
            <div className="land-lord-subscribe-tabs text-center mt-3">
              <span className="service-professional-package-tab-btn">
                Service Professionals
              </span>
            </div>
            <p className="text-center my-4 service-professional-package-text">
              The service Pro package is for, professionals such as plumbers,
              Realtor, Lawyers that want to sign up
            </p>
            <div className="row">
              {/* <div className="col-md-4"></div>
                            <div className="col-md-4"></div> */}
              <div className="col-md-12 text-center">
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
            <div className="row text-center mt-4">
              <ServiceProPackages />
            </div>
            <div className="row mt-4">
              <div className="col-md-12 text-center">
                <button
                  onClick={() => {
                    navigate(`/service-professional-payment-method`);
                  }}
                  className="create-accoutn-btn"
                >
                  Continue{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceProfessionalSubscription;
