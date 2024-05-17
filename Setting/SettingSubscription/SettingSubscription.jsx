import { useEffect, useState } from "react";
import blackBoxStar from "assets/star.png";
import whiteBoxWallet from "assets/wallet-03.png";
import LandLordPackages from "Components/LandLordPackages/LandLordPackages";
import UseGetHook from "Hooks/UseGetHook";
import plusIconOrange from "assets/plus-orange.png";
import { Link } from "react-router-dom";
import UserPermission from "libs/UserPermission";
import { ConfigProvider, Table, message } from "antd";
import settingIcon from "assets/three-dots.png";
import viewIcon from "assets/Icon.png";
import editIcon from "assets/edit-05.png";
import deleteIcon from "assets/trash-01.png";
import config from 'Helpers/config.json';
import AddPaymentMethod from "Modals/AddPaymentMethod/AddPaymentMethod";
import { ModalLayout1 } from "Components/GeneralComponents";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const SettingSubscription = () => {
  // States start
  const [editCard, setEditCard] = useState(false);
  const [changePlan, SetChangePlan] = useState(false);
  const [managePayment, setManagePayment] = useState(false);
  const [upgradePlan, setupgradePlan] = useState(false);
  const [key, setKey] = useState([]);
  const [openAccountModal, setOpenAccountModal] = useState(false);
  const [update, setUpdate] = useState(false);
  const [selectionType, setSelectionType] = useState("checkbox");
  const [interval, setInterval] = useState(false)
  const [isPayNowModelOpen, setIsPayNowModelOpen] = useState(false);
  const [options, setOptions] = useState({});
  const { FetchUser, user, FetchUserTenant, FetchUserLandlordUser } =
    UseGetHook("userinfo");
  const [selectedTableItem, setSelectedTableItem] = useState("");
  const { FetchUserRole, role, ROLE } = UserPermission();
  useEffect(() => {
    if (localStorage.getItem("role") === "tenant") {
      FetchUserTenant();
    } else if (localStorage.getItem("role") === "landlord") {
      FetchUser();
      FetchUserRole();
    } else {
      FetchUserLandlordUser();
      FetchUserRole();
    }
  }, []);
  // States end
  const { plan, FetchLandlordPlans } = UseGetHook("landlord");
  const { payment, FetchPaymentMethod } = UseGetHook("getCustomerPaymentMethod", localStorage.getItem("email"));
  useEffect(() => {
    FetchLandlordPlans();
    FetchPaymentMethod();
  }, []);
  useEffect(() => {
    if (update) {
      FetchLandlordPlans();
      FetchUserRole();
      FetchPaymentMethod();
      setUpdate(false)
    }
  }, [update]);
  const changePaymentMethod = (id) => {
    fetch(`${config.baseUrl}/api/stripe/makeDefaultPaymentMethod`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        paymentMethodId: id,
        role: localStorage.getItem("role")
      })
    }).then(res => {
      return res.json()
    }).then(res => {
      if (res.apiCallStatus === "success") {
        message.success("Payment method edit successful")
        setUpdate(true)
      }
    }).catch(err => console.log(err, "error"))
  }
  const deletePaymentMethod = (id) => {
    fetch(`${config.baseUrl}/api/stripe/payment-method/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    }).then(res => {
      return res.json()
    }).then(res => {
      if (res.apiCallStatus === "success") {
        message.success(res.message.message)
        setUpdate(true)
      }
      else {
        console.log(res, "ERRor")
      }
    })
  }
  const onOpenAccountModal = () => {
    setOpenAccountModal(true);
  };
  const onCloseAddPaymentModal = () => {
    setOpenAccountModal(false);
  };
  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(selectedTableItem.length);
      setSelectedTableItem([...selectedRowKeys]);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  }; const handleIconClick = (result) => {
    // Toggle the dropdownOpen state
    const filterData = data.filter((item) => {
      return item.key === result;
    });
    setKey(filterData[0].key);
    if (key === result) {
      setKey(null);
    } else {
      setKey(result);
    }
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, prospectName) => (
        <>
          <Link to={`/prospect-details?id=${prospectName.key}`}>
            <span className="property-table-name-text ">
              <img
                src={`${prospectName.img}`}
                alt=""
                className="me-2 property-table-image mw_40 mh_40 me-2 rounded-5"
              />
              {text}
            </span>
          </Link>
        </>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (text, phone) => (
        <>
          <span className="phone">{text}</span>
        </>
      ),
    },
    {
      title: "Card",
      dataIndex: "card_number",
      render: (text) => (
        <>
          <span>*******{text}</span>
        </>
      ),
    },
    {
      title: "Card type",
      dataIndex: "card",
      render: (text) => (
        <>
          <span>{text}</span>
        </>
      ),
    },
    {
      title: "Expiry",
      dataIndex: "exp",
      render: (text, exp) => (
        <>
          <span>{`${exp.exp_month}/${exp.exp_year}`}</span>
        </>
      ),
    },
    {
      title: "Payment method type",
      dataIndex: "type",
      render: (text, exp) => (
        <>
          <span>{text ? "Primary" : "Secondary"}</span>
        </>
      ),
    },
    {
      title: "",
      dataIndex: "setting",
      render: (text, setting) => (
        <>
          <div className="task-table-setting-container position-relative cursor">
            <img
              onClick={() => {
                handleIconClick(setting.key);
              }}
              src={settingIcon}
              alt=""
            />
            {setting.key === key && (
              <div className="task-table-setting-dropdown-prospect bg-white box-shadow">
                <ul className="p-0 d-flex flex-column gap-3">
                  {/* <Link to={`/prospect-details?id=${setting.key}`}>
                    <li className="list-style-none table-setting-dropdown-menu">
                      {" "}
                      <img src={viewIcon} alt="" /> View
                    </li>
                  </Link> */}
                  {
                    !setting.type && (
                      <li onClick={() => changePaymentMethod(setting.key)} className="list-style-none table-setting-dropdown-menu">

                        <img src={editIcon} alt="" /> Set as primary

                      </li>
                    )
                  }


                  {/* <Link>
                    <li
                      className="list-style-none table-setting-dropdown-menu"
                    >
                      {" "}
                      <img src={editIcon} alt="" /> Edit
                    </li>
                  </Link> */}
                  <li onClick={() => deletePaymentMethod(setting.key)} className="list-style-none table-setting-dropdown-menu">
                    {" "}
                    <img src={deleteIcon} alt="" /> Delete
                  </li>
                </ul>
              </div>
            )}
          </div>
        </>
      ),
    },
  ];
  useEffect(() => {
    if (user[0]?.plan?.interval !== 'Annually') {
      setInterval(false)
    }
    if (user[0]?.plan?.interval !== 'Monthly') {
      setInterval(true)
    }
    else {
      setInterval(false)
    }
  }, [user[0]?.plan?.interval])
  const data = payment.map((e) => ({
    key: e.id,
    name: localStorage.getItem('name'),
    email: localStorage.getItem('email'),
    card_number: e.card.last4,
    card: e.card.brand,
    exp_month: e.card.exp_month,
    exp_year: e.card.exp_year,
    type: e.default_payment_method,
  }));
  const stripeKey = loadStripe(config.stripe_publish_key);
  const handlePayNow = (planName) => {
    const fetchClientSecret = () => {
      return fetch(`${config.baseUrl}/api/stripe/selectPlan`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          email: localStorage.getItem("email"),
          "interval": !interval ? "Monthly" : "Annually",
          "productName": planName,
        }),
      })
        .then((res) => res.json())
        .then((data) => data?.clientSecret)
    };
    setOptions({
      fetchClientSecret: fetchClientSecret,
      onComplete: () => {
        setIsPayNowModelOpen(false)
        FetchLandlordPlans();
        FetchUserLandlordUser()
        setTimeout(() => {
          message.success("Subscription updated successfully")
        }, 2000)
      },
    });

    setIsPayNowModelOpen(true);
  };
  return (
    <>
      {openAccountModal && (
        <AddPaymentMethod
          onOpen={onOpenAccountModal}
          onClose={onCloseAddPaymentModal}
          setUpdate={setUpdate}
        />
      )}
      <p className="heading">SUBSCRIPTION</p>
      <div className="setting-sub-box-container d-flex align-items-center gap-5 mt-4 justify-content-between">
        <div className="setting-sub-black-box">
          <div className="sub-black-box-upper d-flex justify-content-between align-items-start p-3">
            <div className="sub-black-box-text">
              <span>Current Subscription Plan</span>
              <p>${user[0]?.plan?.price?.toLocaleString() || "Free"}</p>
              <button
                onClick={() => {
                  setupgradePlan(true);
                  SetChangePlan(!changePlan);
                  setManagePayment(false);
                }}
                className="sub-black-box-btn mt-5"
              >
                Change Plan
              </button>
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
                ${user[0]?.plan?.price?.toLocaleString()}
                <span className="primary-orange-text"> ({user[0]?.plan?.planName || "Free"})</span>{" "}
              </p>
              <button
                onClick={() => {
                  setManagePayment(!managePayment);
                  SetChangePlan(false);
                  setEditCard(false);
                }}
                className="sub-white-box-btn mt-5"
              >
                Manage Payment{" "}
              </button>
            </div>
            <div className="sub-black-box-img">
              <img src={whiteBoxWallet} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="sub-payment-box mt-3">
        <div className="sub-payment-heading row">
          {changePlan && (
            <>
              <div className="d-flex justify-content-between">
                <p className="heading">SUBSCRIPTION</p>
                <div className="row me-1">
                  <div className="border-1 subscription-box ">
                    <div className="">
                      <button className={!interval ? "active-sub monthly" : "monthly"} onClick={() => setInterval(false)}>Monthly</button>
                    </div>
                    <div className="">
                      <button className={interval ? "active-sub annually" : " annually"} onClick={() => setInterval(true)}>Annually</button>
                    </div>
                  </div>
                </div>
              </div>
              <LandLordPackages data={plan} handlePayNow={handlePayNow} setUpdate={setUpdate} selectedPlan={user} interval={interval} />
            </>
          )}
        </div>
        {managePayment && (
          <>
            <div className="d-flex justify-content-between mt-2">
              <p className="heading mb-5">PAYMENT</p>
              {
                data.length < 2 && (
                  <button className="add-subscription-btn-white" onClick={onOpenAccountModal} >
                    <img src={plusIconOrange} className="add-property-icon-white" alt="" />{" "}
                    Add Payment Method
                  </button>
                )
              }

            </div>
            <div className="task-table-container  mt-3">
              <ConfigProvider
                theme={{
                  components: {
                    Table: {
                      colorTextHeading: "#667085",

                      colorText: "#667085",
                      fontSize: 14,
                      fontWeightStrong: 500,
                      fontFamily: "Montserrat",
                    },
                    Checkbox: {
                      colorPrimary: "#EF6B3E",
                      colorPrimaryHover: "#EF6B3E",
                    },
                  },
                }}
              >
                <Table
                  pagination={false}
                  className="all-prospects-table-list scroll-remove scroll-responsive-tablet"
                  rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                  }}
                  columns={columns}
                  dataSource={data}
                />
              </ConfigProvider>
            </div>
          </>
        )}
      </div>
      {/* Create Subscriber now Model */}
      <ModalLayout1
        isOpen={isPayNowModelOpen}
        onClose={() => setIsPayNowModelOpen(false)}
      >
        <EmbeddedCheckoutProvider stripe={stripeKey} options={options}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </ModalLayout1>
    </>
  );
};

export default SettingSubscription;
