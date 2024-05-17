import React, { useState } from 'react'
import masterCard from "assets/master-card.png";
import config from 'Helpers/config.json'
import UseJsonHook from 'Hooks/UseJsonHook';
import UsePostHook from 'Hooks/UsePostHook';
import ModalLoader from 'Components/GeneralComponents/ModalLoader';
const AddPaymentMethod = ({ onClose, setUpdate }) => {

    const [creditCardNumber, setCreditCardNumber] = useState("");
    const [creditCardName, setcreditCardName] = useState("");
    const [expiry, setExpiry] = useState("");
    const [loader, setLoader] = useState(false);
    const [cvc, setCvc] = useState("");
    const handleCreditCardChange = (e) => {
        let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
        if (value.length > 0) {
            value = value.match(/.{1,4}/g).join("-"); // Add hyphens every four digits
        }
        setCreditCardNumber(value);
    };

    const handleExpiryChange = (e) => {
        let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
        if (value.length > 0) {
            value = value.match(/.{1,2}/g).join("/"); // Add a slash between month and year
        }
        setExpiry(value);
    };
    const handleCvcChange = (e) => {
        let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
        setCvc(value);
    };
    const parsed = expiry.split("/")
    const month = parsed[0]
    const year = parsed[1]
    const trimCard = creditCardNumber.split("/").join("")
    const urlencoded = new URLSearchParams()
    urlencoded.append("card[number]", trimCard)
    urlencoded.append("card[exp_month]", parseInt(month))
    urlencoded.append("card[exp_year]", parseInt(year))
    urlencoded.append("card[cvc]", cvc)
    const addPaymentMethod = () => {
        fetch("https://api.stripe.com/v1/tokens", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Bearer ${config.stripe_publish_key}`,
            },
            body: urlencoded
        }).then(res => {
            return res.json()
        }).then(res => {
            UsePostHook("api/stripe/addPaymentMethod", {
                email: localStorage.getItem("email"),
                token: res.id,
                role: localStorage.getItem("role"),
            }, setLoader, onClose, setUpdate)

        }).catch(err => console.log(err, "error token"))
    }
    return (
        <>
            <div className="payment-modal-container">
                <div className="payment-method-modal property-details-view-task-modal p-4">
                    <div className="card-edit-box border p-3">
                        <div className="d-flex flex-direction-column justify-content-between">
                            <p className="heading">ADD PAYMENT METHOD DETAILS</p>
                            <button onClick={onClose} className="modal-cancel-btn">
                                <svg
                                    width={18}
                                    height={18}
                                    fill="#667085"
                                    stroke="#667085"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M18 6 6 18" />
                                    <path d="m6 6 12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="info-card-input-fields p-4">
                            <div className="name-field mt-3 position-relative">
                                <input
                                    onChange={(e) => setcreditCardName(e.target.value)}
                                    type="text"
                                    className="info-custom-field border-top-0 border-end-0 border-start-0 "
                                />
                                <span
                                    className={
                                        creditCardName.length > 0
                                            ? "translate-20 custom-place-holder"
                                            : "custom-place-holder"
                                    }
                                >
                                    Card Holder’s Name*
                                </span>
                            </div>
                            <div className="card-number-field mt-3 position-relative">
                                <input
                                    id="creditCard"
                                    value={creditCardNumber}
                                    onChange={handleCreditCardChange}
                                    maxLength="19"
                                    type="text"
                                    className="info-custom-field border-top-0 border-end-0 border-start-0 "
                                />
                                <span
                                    className={
                                        creditCardNumber.length > 0
                                            ? "translate-20 custom-place-holder"
                                            : "custom-place-holder"
                                    }
                                >
                                    Card Number*
                                </span>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="card-number-exp-field mt-3 position-relative">
                                        <input
                                            type="text"
                                            id="expiry"
                                            value={expiry}
                                            onChange={handleExpiryChange}
                                            maxLength="5"
                                            className="info-custom-field border-top-0 border-end-0 border-start-0 "
                                        />
                                        <span
                                            className={
                                                expiry.length > 0
                                                    ? "translate-20 custom-place-holder"
                                                    : "custom-place-holder"
                                            }
                                        >
                                            Expiration Date*
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="card-number-cvv-field mt-3 position-relative">
                                        <input
                                            id="cvc"
                                            value={cvc}
                                            onChange={handleCvcChange}
                                            maxLength="3"
                                            type="password"
                                            className="info-custom-field border-top-0 border-end-0 border-start-0"
                                        />
                                        <span
                                            className={
                                                cvc.length > 0
                                                    ? "translate-20 custom-place-holder"
                                                    : "custom-place-holder"
                                            }
                                        >
                                            CVV*
                                        </span>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="row my-4">
                            <div className="setting-btn my-4 d-flex align-items-center gap-4">
                                <button className="cancel-btn" onClick={(e) => {
                                    onClose()
                                }}>Cancel</button>
                                <button onClick={()=>{
                                    addPaymentMethod()
                                    setLoader(true)
                                }} className="save-btn d-flex gap-2 justify-content-center">Save {loader && <ModalLoader/>}</button>
                            </div>
                        </div>
                    </div>
                </div></div>
        </>
    )
}

export default AddPaymentMethod
