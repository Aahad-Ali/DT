import React, { useEffect, useState } from "react";
import config from "Helpers/config.json";
import { message } from "antd";
import Loader from "Helpers/Loader";
import { useNavigate } from "react-router-dom";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import UseUrlParamsHook from "Hooks/UseUrlParamsHook";
const TenantQuestions = () => {
    const [data, setData] = useState([]);
    const [value, setValues] = useState([]);
    const [options, setOptions] = useState({});
    const { id, ssn, paid } = UseUrlParamsHook()
    const navigate = useNavigate();
    const onChange = (question, choiceKeyName) => {
        setValues({
            ...value,
            [question]: choiceKeyName,
        });
    };

    // Stripe
    const stripeKey = loadStripe(config.stripe_publish_key);

    const submitAnswer = () => {
        const answers = Object.keys(value).map((questionKeyName) => ({
            questionKeyName,
            selectedChoiceKeyName: value[questionKeyName],
        }));
        fetch(`${config.baseUrl}/api/renter/transunion/SubmitAnswers`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                answers,
                screeningId: id,
            }),
        })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                if (res.apiCallStatus === "success") {
                    message.success("Answer submitted successfully");
                    navigate("/tenant-passport");
                } else {
                    console.log(res);
                }
            })
            .catch((err) => {
                console.log(err, "Error");
            });
    };

    const handleSendClick = () => {
        // CHECK IF ALL QUESTIONS ARE ANSWERED
        if (Object.keys(value).length !== data.length) {
            message.error("Please answer all questions");
            return;
        }

        //Stripe Payment
        if (paid === "true") {
            submitAnswer()
        }
        else {
            const stripCall = () => {
                return fetch(`${config.baseUrl}/api/renter/transunion/payNow`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify({
                        email: localStorage.getItem("email"),
                        // returnUrl: `${process.env.REACT_APP_ENVIRONMENT === 'development' ? process.env.REACT_APP_API_URL_DEV : process.env.REACT_APP_API_URL}/tenant-passport`
                    }),
                }).then((res) => res.json()).then((data) => data?.message?.clientSecret);
            };
            setOptions({
                fetchClientSecret: stripCall,
                onComplete: submitAnswer,
            });
        }
    };

    useEffect(() => {
        fetch(`${config.baseUrl}/api/transunion/createExamRequest`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                screeningId: id,
                nationalId: ssn
            }),
        })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                if (res.apiCallStatus === "success") {
                    const { authenticationQuestions } = res.message.examRequest;
                    setData(authenticationQuestions);
                } else {
                    console.log(res);
                }
            })
            .catch((err) => {
                console.log(err, "Error");
            });
    }, []);
    return (
        <>
            {data.length > 0 ? (
                <>
                    <div className="bg-white p-3">
                        {options.fetchClientSecret ? (
                            <div className="row mt-4">
                                <EmbeddedCheckoutProvider stripe={stripeKey} options={options}>
                                    <EmbeddedCheckout />
                                </EmbeddedCheckoutProvider>
                            </div>
                        ) : (
                            <>
                                <div className="d-flex flex-column gap-5">
                                    {data.map((question, index) => {
                                        return (
                                            <div className="" key={index}>
                                                <p className="fw-semibold">
                                                    {question.questionDisplayName}
                                                </p>
                                                <p>{question.choices.choiceDisplayName}</p>
                                                {question.choices.map((choice, index) => {
                                                    return (
                                                        <React.Fragment key={index}>
                                                            <input
                                                                className="mx-2"
                                                                onChange={(e) =>
                                                                    onChange(
                                                                        question.questionKeyName,
                                                                        choice.choiceKeyName
                                                                    )
                                                                }
                                                                name={`answer-${question.questionKeyName}`}
                                                                value={choice.choiceKeyName}
                                                                type="radio"
                                                            />{" "}
                                                            <label htmlFor="">
                                                                {choice.choiceDisplayName}
                                                            </label>
                                                        </React.Fragment>
                                                    );
                                                })}
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="stepper-first-btn d-flex justify-content-between">
                                    <button
                                        onClick={handleSendClick}
                                        className="modal-save-btn w-100 next-btn mt-3"
                                    >
                                        Send
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </>
            ) : (
                <Loader />
            )}
        </>
    );
};

export default TenantQuestions;
