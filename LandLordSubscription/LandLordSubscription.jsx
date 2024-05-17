import { useEffect, useState } from "react";
import DigitalTenantLogo from "assets/Copy of DigitalTenant_Logo.png";
import { Switch, ConfigProvider, Radio } from "antd";
import UseGetHook from "Hooks/UseGetHook";
import FreeIcon from "assets/free-icon.png";
import ProIcon from "assets/pro-Icon.png";
import { useNavigate } from "react-router-dom";
import UseUrlParamsHook from "Hooks/UseUrlParamsHook";
import LandLordPackages from "Components/LandLordPackages/LandLordPackages";
const LandLordSubscription = () => {
  // States start
  const [interval, setInterval] = useState(false);
  const [price, setPrice] = useState("");
  const [planName, setplanName] = useState("");
  const [freePlanSelected, setFreePlanSelected] = useState(false);
  const navigate = useNavigate();
  // States end
  const { email } = UseUrlParamsHook()
  const { plan, FetchLandlordPlans } = UseGetHook("landlord");
  useEffect(() => {
    FetchLandlordPlans();
  }, []);
  const handleContinue = () => {
    if (freePlanSelected) {
      window.location.href = '/land-lord-sign-in'; // Navigate to login page if Free plan was selected
    } else {
      navigate(`/land-lord-payment-method?email=${email}&interval=${interval ? "Annually" : "Monthly"}&planName=${planName}&price=${price}`)
    }
  };
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
              <span className="landlord-package-tab-btn">Landlord Package</span>
            </div>
            <p className="text-center my-4">
              The service Pro package is for, professionals such as plumbers,
              Realtor, Lawyers that want to sign up
            </p>
            <div className="row me-1">
              <div className="border-1 subscription-box w-auto mx-auto">
                <div className="">
                  <button className={!interval ? "active-sub monthly" : "monthly"} onClick={() => setInterval(false)}>Monthly</button>
                </div>
                <div className="">
                  <button className={interval ? "active-sub annually" : " annually"} onClick={() => setInterval(true)}>Annually</button>
                </div>
              </div>
            </div>
            <div className="row text-center ">
              <LandLordPackages setFreePlanSelected={setFreePlanSelected} freePlanSelected={freePlanSelected} setPrice={setPrice} setplanName={setplanName} data={plan} interval={interval} />
            </div>
            <div className="row mt-4">
              <div className="col-md-12 text-center">
                <button
                  onClick={() =>
                    handleContinue()
                  }
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

export default LandLordSubscription;
