import { useCallback, useEffect, useState } from "react";
import SignUpLeftBanner from "../SignUpLeftBanner/SignUpLeftBanner";
import CheckBoxActive from "assets/_Checkbox active.png";
import ProIcon from "assets/user-check-02.png";
import PaymentSuccessModal from "Modals/PaymentSuccessModal/PaymentSuccessModal";
import UseGetHook from "Hooks/UseGetHook";
import UseUrlParamsHook from "Hooks/UseUrlParamsHook";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import config from 'Helpers/config.json'
import { loadStripe } from "@stripe/stripe-js";
const PaymentMethodSignUp = () => {
  // States start
  const [openModal, setOpenModal] = useState(false);
  // States end
  const { plan, FetchLandlordPlans } = UseGetHook("landlord");
  const { interval, email, planName, price } = UseUrlParamsHook();
  useEffect(() => {
    FetchLandlordPlans();
  }, []);
  // Modal Function
  const onOpenModal = () => {
    setOpenModal(true);
  };
  const onCloseModal = () => {
    setOpenModal(false);
  };
  // Stripe
  const stripeKey = loadStripe(config.stripe_publish_key)
  const fetchClientSecret = useCallback(() => {
    // Create a Checkout Session
    return fetch(`${config.baseUrl}/api/stripe/createNewSubscriber`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(
        {
          "email": email,
          "interval": interval,
          "productName": planName,
          "returnUrl": "https://digitalapp.technoholicasprojects.com"
        }
      )
    }).then((res) => res.json()).then((data) => data.clientSecret);
  }, []);
  const options = { fetchClientSecret };
  // Stripe End
  return (
    <>
      {openModal === true ? (
        <PaymentSuccessModal
          paymentSuccess="Successful Payment"
          success="Go To Dashboard"
          onClose={onCloseModal}
        />
      ) : (
        ""
      )}

      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 col-xl-4 col-md-12">
            <SignUpLeftBanner />
          </div>
          <div className="col-lg-12 col-xl-8 col-md-12">
            <div className="container">
              <div className="land-lord-right-heading text-start mt-5">
                <h1>Add a payment method</h1>
                <p>Create your account if not registered yet</p>
              </div>
              <div className="payment-select-boxes mt-4">
                <div className="payment-select-box active-box">
                  <div className="payment-select-box-left d-flex gap-2 align-items-center">
                    <img
                      src={ProIcon}
                      className="img-fluid object-fit-contain"
                      alt=""
                    />
                    <div className="onboarding-box-text ">
                      <span className="text-grey">{planName}</span>{" "}
                      <span className="ms-2">{`$${price}/${interval}`}</span>
                    </div>
                  </div>
                  <div className="onboarding-select-box-check-box">
                    <img src={CheckBoxActive} alt="" />
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <EmbeddedCheckoutProvider
                  stripe={stripeKey}
                  options={options}
                >
                  <EmbeddedCheckout />
                </EmbeddedCheckoutProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentMethodSignUp;
