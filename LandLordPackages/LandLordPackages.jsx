import FreeIcon from "assets/free-icon.png";
import ProIcon from "assets/pro-Icon.png";
import React, { useState } from "react";
import { ConfigProvider, Radio, message } from "antd";
import config from "Helpers/config.json";
const LandLordPackages = ({
  data,
  interval,
  setplanName,
  setPrice,
  selectedPlan,
  setFreePlanSelected,
  freePlanSelected,
  setUpdate,
  handlePayNow
}) => {
  const [selectedId, setSelectedId] = useState(null);
  const HandlePlanValue = (e, id, planName, price) => {
    if (id === "free") {
      setFreePlanSelected(true); // Free plan selected
      setSelectedId(id);
      setplanName(planName);
      setPrice(price);
    } else {
      setFreePlanSelected(false); // Free plan deselected
      setSelectedId(id);
      setplanName(planName);
      setPrice(price);
    }
  };
  const { monthlyPlans, yearlyPlans } = data || {};
  const UpdateSubscription = (plan, update) => {
    fetch(`${config.baseUrl}/api/stripe/updateSubscription`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        email: localStorage.getItem("email"),
        interval: !interval ? "Monthly" : "Annually",
        productName: plan,
        planUpdate: update ? "upgrade" : "downgrade",
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.apiCallStatus === "success") {
          message.success(res.message);
          setUpdate(true);
        } else {
          message.error(res.message);
        }
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };


  return (
    <>
      {
        !selectedPlan?.[0]?.plan?._id && (
          <div className="col-md-4 mt-4">
            <div className="land-lord-package rounded border">
              <div className="package-name text-start border-bottom d-flex align-items-center justify-content-between">
                <div className="package-name-and-icon-container">
                  <img src={FreeIcon} alt="" /> Free
                </div>
                {
                  !selectedPlan && (
                    <div className="package-select-radio-container">
                      <ConfigProvider
                        theme={{
                          components: {
                            Radio: {
                              colorPrimary: "#EF6B3E",
                              radioSize: 18,
                              fontSize: 16,
                              fontFamily: "Montserrat",
                            },
                          },
                        }}
                      >
                        <Radio checked={selectedId === "free"}
                          onChange={(e) => HandlePlanValue(e, "free", "Free", 0)}></Radio>
                      </ConfigProvider>
                    </div>
                  )
                }

              </div>
              <div className="package-details text-start">
                <span className="limited-time-text-subscription ">
                  Limited time only
                </span>
                <p className="mt-3">
                  <span className="package-big-text text-dark">FREE</span> per month{" "}
                  <br />
                  Includes up to 10 users, 20GB indiviual data and access to all
                  features.
                </p>
                <p className="fw-bold ">Inludes:</p>
                <p>Unlimited free viewers</p>
                <p>Unlimited items</p>
                <p>200+ templates</p>
                {
                  !selectedPlan?.[0]?.plan?._id && selectedPlan && (
                    <button className="save-btn p-2">Selected</button>
                  )
                }
              </div>
            </div>
          </div>
        )
      }

      {!interval
        ? (monthlyPlans?.[0] || []).map((item) => {
          return (
            <div key={item?._id} className="col-md-4 mt-4">
              <div className="land-lord-package rounded border ">
                <div className="package-name text-start border-bottom d-flex align-items-center justify-content-between">
                  <div className="package-name-and-icon-container">
                    <img src={ProIcon} alt="" /> {item?.planName}
                  </div>
                  {!selectedPlan && (
                    <div className="package-select-radio-container">
                      <Radio.Group
                        onChange={(e) =>
                          HandlePlanValue(
                            e.target.value,
                            item._id,
                            item.planName,
                            item.price
                          )
                        }
                        value={selectedId === item?._id ? 1 : 0}
                      >
                        <ConfigProvider
                          theme={{
                            components: {
                              Radio: {
                                colorPrimary: "#EF6B3E",
                                radioSize: 18,
                                fontSize: 16,
                                fontFamily: "Montserrat",
                              },
                            },
                          }}
                        >
                          <Radio value={1}></Radio>
                        </ConfigProvider>
                      </Radio.Group>
                    </div>
                  )
                  }
                </div>
                <div className="package-details text-start">
                  <span className="limited-time-text-subscription">
                    Limited time only
                  </span>
                  <p className="mt-3">
                    {" "}
                    <span className="package-big-text text-dark">
                      ${item?.price.toLocaleString()}
                    </span>{" "}
                    per month <br />
                    Includes up to 10 users, 20GB indiviual data and access to
                    all features.
                  </p>
                  <p className="fw-bold ">Inludes:</p>
                  <p>Unlimited free viewers</p>
                  <p>Unlimited items</p>
                  <p>200+ templates</p>

                  {
                    selectedPlan && (
                      <button onClick={() => {
                        selectedPlan && item?._id === selectedPlan?.[0]?.plan?._id ?
                          message.success("This plan is already selected")
                          :
                          !selectedPlan?.[0]?.plan?._id ?
                            handlePayNow(item?.planName)
                            :
                            UpdateSubscription(item?.planName, selectedPlan?.[0]?.plan?.price < item.price)
                      }} className={selectedPlan && item?._id === selectedPlan?.[0]?.plan?._id ? "save-btn p-2" : "table-delete-btn w-100"}>{
                          selectedPlan && item?._id === selectedPlan?.[0]?.plan?._id ?
                            "Selected" :
                            selectedPlan?.[0]?.plan?.price < item.price ?
                              "Upgrade"
                              :
                              !selectedPlan?.[0]?.plan?._id ?
                                "Upgrade"
                                :
                                "Downgrade"

                        }
                      </button>
                    )
                  }

                </div>
              </div>
            </div>
          );
        })
        : (yearlyPlans?.[0] || []).map((item) => {
          return (
            <div key={item?._id} className="col-md-4 mt-4">
              <div className="land-lord-package rounded border ">
                <div className="package-name text-start border-bottom d-flex align-items-center justify-content-between">
                  <div className="package-name-and-icon-container">
                    <img src={ProIcon} alt="" /> {item?.planName}
                  </div>
                  {!selectedPlan && (
                    <div className="package-select-radio-container">
                      <Radio.Group
                        onChange={(e) =>
                          HandlePlanValue(
                            e.target.value,
                            item._id,
                            item.planName,
                            item.price
                          )
                        }
                        value={selectedId === item?._id ? 1 : 0}
                      >
                        <ConfigProvider
                          theme={{
                            components: {
                              Radio: {
                                colorPrimary: "#EF6B3E",
                                radioSize: 18,
                                fontSize: 16,
                                fontFamily: "Montserrat",
                              },
                            },
                          }}
                        >
                          <Radio value={1}></Radio>
                        </ConfigProvider>
                      </Radio.Group>
                    </div>
                  )
                  }

                </div>
                <div className="package-details text-start">
                  <span className="limited-time-text-subscription">
                    Limited time only
                  </span>
                  <p className="mt-3">
                    {" "}
                    <span className="package-big-text text-dark">
                      ${item.price.toLocaleString()}
                    </span>{" "}
                    per Year <br />
                    Includes up to 10 users, 20GB indiviual data and access to
                    all features.
                  </p>
                  <p className="fw-bold ">Inludes:</p>
                  <p>Unlimited free viewers</p>
                  <p>Unlimited items</p>
                  <p>200+ templates</p>
                  {
                    selectedPlan && (
                      <button onClick={() => {
                        selectedPlan && item?._id === selectedPlan?.[0]?.plan?._id ?
                          message.success("This plan is already selected")
                          :
                          !selectedPlan?.[0]?.plan?._id ?
                            handlePayNow(item?.planName)
                            :
                            UpdateSubscription(item?.planName, selectedPlan?.[0]?.plan?.price < item.price)
                      }} className={selectedPlan && item?._id === selectedPlan?.[0]?.plan?._id ? "save-btn p-2" : "table-delete-btn w-100"}>{
                          selectedPlan && item?._id === selectedPlan?.[0]?.plan?._id ?
                            "Selected" :
                            selectedPlan?.[0]?.plan?.price < item.price ?
                              "Upgrade"
                              :
                              !selectedPlan?.[0]?.plan?._id ?
                                "Upgrade"
                                :
                                "Downgrade"

                        }
                      </button>
                    )
                  }
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default LandLordPackages;
