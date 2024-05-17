import React, { useEffect, useState } from "react";
import { ConfigProvider, Select, message } from "antd";
import chevronIcon from "assets/chevron-down.png";
import UseGetHook from "Hooks/UseGetHook";
import { useNavigate } from "react-router-dom";
import cancelIcon from "assets/x-circle.png";
import config from 'Helpers/config.json'
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";

const AddPropertyAccountingModal = ({ onClose, tenantPassport, id }) => {
  const [property, setProperty] = useState("");
  const [email, setEmail] = useState("")
  const [options, setOptions] = useState({});

  const { fetchAccountProperty, PropertyData, fetchLandlordEmail, landlordEmail } = UseGetHook(tenantPassport ? "getLandlords" : "propertiesAvailableToAddAccount");
  useEffect(() => {
    if (tenantPassport) {
      fetchLandlordEmail()
    } else {
      fetchAccountProperty();
    }
  }, []);
  const { fetchTenantScreening, tenantScreen } = UseGetHook("viewScreeningStatus")

  useEffect(() => {
    fetchTenantScreening()

  }, [])



  const stripeKey = loadStripe(config.stripe_publish_key);

  const data = tenantScreen?.map(e => ({
    key: e._id,
    name: localStorage.getItem("name"),
    status: e.report_status,
    landlord_email: e.landlordEmail,
    expiry_date: e.reportsDeliveryStatus,
    passportButtons: e.report_status === "Process Forwarded" || e.report_status === "Questionaire has been attempted and Failed" ? "Verify" : e.report_status === "Questionaire has been attempted and Passed" ? "Request Report Generation" : e.report_status === "Waiting for Report" ? "Share passport" : e.report_status === "Report Available" ? "Share passport" : "Confirm Credit Check",
    paid: e.paid
  }))



  const navigate = useNavigate();

  let dropdownIcon;
  dropdownIcon = (
    <>
      <img src={chevronIcon} alt="" />
    </>
  );

  const shareReport = () => {
    fetch(`${config.baseUrl}/api/renter/transunion/shareReport`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        landlordEmail: email,
        screeningId: id,
      })
    }).then(res => {
      return res.json()
    }).then(res => {
      if (res.apiCallStatus === "success") {
        message.success("Passport shared successfully")
        onClose()
      }
      else {
        message.error("Something went wrong please try again later")
        onClose()
      }
    }).catch(err => { console.log(err, "Error") })
  }

  const onCompletePayment = () => {
    shareReport()
    onClose();
  }

  const sendReport = () => {
    const scReq = tenantScreen.filter((e) => {
      return e._id === id; // Return true only if _id matches the given id
    });

    if (!email) {
      message.error("Please enter email to continue")
    }
    else if (scReq[0].share_counts > 10) {
      const stripCall = () => {
        return fetch(`${config.baseUrl}/api/renter/transunion/payNowForShare`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            email: localStorage.getItem("email"),
          }),
        }).then((res) => res.json()).then((data) => {
          return data?.message?.clientSecret
        });
      }
      setOptions({
        fetchClientSecret: stripCall,
        onComplete: onCompletePayment,
      });

    }
    else {
      shareReport();
    }
  }




  return (
    <>
      <div className="payment-modal-container">
        <div className="payment-method-modal property-details-view-task-modal p-5" style={{ position: 'relative', top: '0px', right: '0px' }}>
          {options?.fetchClientSecret ?
            <EmbeddedCheckoutProvider stripe={stripeKey} options={options}>
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
            : <>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12 p-0">
                    {
                      tenantPassport ?
                        <>
                          <div className="stepper-content">
                            <span>Landlord's Email<span className="sign-up-imp-star">*</span>
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
                                mode="tags"
                                placeholder="User Name"
                                suffixIcon={dropdownIcon}
                                style={{
                                  width: "100%",
                                  height: 50,
                                }}
                                onChange={(e) => setEmail(e)}
                                options={landlordEmail.map((e) => {
                                  return { value: e, label: e };
                                })}
                              />
                            </ConfigProvider>
                          </div>
                        </>
                        :
                        <>
                          <div className="stepper-content">
                            <span>
                              Property<span className="sign-up-imp-star">*</span>
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
                                mode="multiple"
                                placeholder="Select property"
                                suffixIcon={dropdownIcon}
                                style={{
                                  width: "100%",
                                  height: 50,
                                }}
                                onChange={(e) => setProperty(e)}
                                options={PropertyData.map((e) => {
                                  return { value: e.id, label: e.title };
                                })}
                              />
                            </ConfigProvider>
                          </div>
                        </>
                    }

                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="stepper-btn d-flex justify-content-between mt-5 gap-1 pb-3">
                    <button
                      onClick={() => {
                        sendReport()
                      }}
                      className="next-btn-same-class w-100 mt-3">Save</button>
                  </div>
                </div>
              </div>
              <div
                onClick={() => {
                  onClose();
                }}
                className="cancel-modal-icon-account cursor"
              >
                <img src={cancelIcon} alt="" />
              </div>
            </>}
        </div>
      </div>
    </>
  );
}


export default AddPropertyAccountingModal;
