import { useEffect, useState } from "react";
import SearchBar from "Helpers/SearchBar";
import { Table, ConfigProvider, message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import settingIcon from "assets/three-dots.png";
import viewIcon from "assets/Icon.png";
import editIcon from "assets/edit-05.png";
import deleteIcon from "assets/trash-01.png";
import trashIconWhite from "assets/trash-icon-white.png";
import UseGetHook from "Hooks/UseGetHook";
import { useSelector } from "react-redux";
import DeleteModal from "Modals/DeleteModal/DeleteModal";
import AddPropertyAccountingModal from "Modals/AddPropertyAccountingModal/AddPropertyAccountingModal";
import { ModalLayout1 } from "Components/GeneralComponents";
import { ConnectAccountOnboarding, ConnectComponentsProvider } from "@stripe/react-connect-js";
import config from "Helpers/config.json";
import { loadConnectAndInitialize } from "@stripe/connect-js";
const Accounting = () => {
  // States start
  const [selectionType, setSelectionType] = useState("checkbox");
  const [openModal, setOpenModal] = useState(false);
  const [selectedTableItem, setSelectedTableItem] = useState("");
  const [key, setKey] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [DeleteId, setDeleteId] = useState("");
  const [openAccountModal, setOpenAccountModal] = useState(false);
  const [update, setUpdate] = useState(false);
  const [connectStripe, setConnectStripe] = useState(null);
  const [isPayNowModelOpen, setIsPayNowModelOpen] = useState(false);
  const [account_id, setAccount_id] = useState("");
  const [property, setProperty] = useState("")
  const search = useSelector((state) => {
    return state.Search.value;
  });
  // States end
  const { fetchAccount, accounts } = UseGetHook("accounts");
  useEffect(() => {
    fetchAccount();
  }, []);
  const onOpenAccountModal = () => {
    setOpenAccountModal(true);
  };
  const onCloseModalWorkOrder = () => {
    setOpenAccountModal(false);
  };
  const onOpenModal = () => {
    setOpenModal(true);
  };
  const navigate = useNavigate();
  // Modal Function

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const onOpenDeleteModal = () => {
    setOpenDeleteModal(true);
  };
  const onCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };
  // Data Table Functions
  const handleIconClick = (result) => {
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
  const connectAgain = () => {
    setIsPayNowModelOpen(true)
    const fetchClientSecret = async () => {
      // Fetch the AccountSession client secret
      const response = await fetch(`${config.baseUrl}/api/stripe/connect`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          properties: property,
        }),
      });
      if (!response.ok) {
        // Handle errors on the client side here
        const { error } = await response.json();
        console.log("An error occurred: ", error);
        return undefined;
      } else {
        const { message } = await response.json();
        setAccount_id(message.account_id);
        return message.client_secret;
      }
    };
    const instance = loadConnectAndInitialize({
      publishableKey: process.env.REACT_APP_STRIPE_PUBLIC_KEY,
      fetchClientSecret: fetchClientSecret,
    });
    setConnectStripe(instance);
  }
  const columns = [
    {
      title: "Account",
      dataIndex: "account",
      render: (text) => (
        <Link to="/account-details">
          <span className="accounting-table-account-text">{text}</span>
        </Link>
      ),
    },
    {
      title: "Property",
      dataIndex: "property",
      render: (text) => (
        <>
          <span className="accounting-table-property-sub-text">{text}</span>
        </>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, status) => (
        <>
          <span>{text}</span>
        </>
      ),
    },
    {
      title: "",
      dataIndex: "button",
      render: (text, button) => (
        <>
          {button.stripeConnected ? (
            <button disabled className="connect-bank-btn">
              {text}
            </button>
          ) : (
            <button onClick={() => {
              setProperty(button.propertyID)
              setAccount_id(button.account_id)
              connectAgain()
            }} className="connect-bank-btn">{text}</button>

          )}
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
              src={settingIcon}
              alt=""
              onClick={() => {
                handleIconClick(setting.key);
              }}
            />
            {setting.key === key && (
              <div className="task-table-setting-dropdown-prospect bg-white box-shadow">
                <ul className="p-0 d-flex flex-column gap-3">
                  <Link to="/account-details">
                    <li className="list-style-none table-setting-dropdown-menu">
                      {" "}
                      <img src={viewIcon} alt="" /> View
                    </li>
                  </Link>
                  <Link
                    onClick={onOpenAccountModal}>
                    <li className="list-style-none table-setting-dropdown-menu">
                      {" "}
                      <img src={editIcon} alt="" /> Edit
                    </li>
                  </Link>
                  <Link
                    onClick={() => {
                      onOpenDeleteModal();
                      setDeleteId(setting.account_id);
                    }}
                  >
                    <li className="list-style-none table-setting-dropdown-menu">
                      {" "}
                      <img src={deleteIcon} alt="" /> Delete
                    </li>
                  </Link>
                </ul>
              </div>
            )}
          </div>
        </>
      ),
    },
  ];
  const data = accounts
    .filter((e) =>
      e.property.title.toLowerCase().includes(search.toLowerCase())
    )
    .map((e) => ({
      key: e._id,
      account_id: e.landlordAccount.account_id,
      account: "Operating Account",
      property: e.property.title,
      propertyID: e.property.id,
      status: e.property.status,
      stripeConnected: e.landlordAccount.stripeConnected,
      button: e.landlordAccount.stripeConnected
        ? "Connected"
        : "Connect to Bank",
    }));
  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      setSelectedTableItem(selectedRowKeys);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };
  const navigateBtn = () => {
    navigate("/add-account");
  };
  return (
    <>
      {openAccountModal === true ? (
        <AddPropertyAccountingModal
          onOpen={onOpenModal}
          onClose={onCloseModalWorkOrder}
        />
      ) : (
        ""
      )}
      {openDeleteModal === true ? (
        <DeleteModal
          onClose={onCloseDeleteModal}
          component="stripe/Account"
          setUpdate={setUpdate}
          route="all-accounts"
          deleteBtnText="Delete Account"
          delId={DeleteId}
        />
      ) : (
        ""
      )}
      <div className="container-fluid bg-white p-3">
        <SearchBar
          onClick={navigateBtn}
          btnTitle="Add New Account"
          accountingFilter={true}
        />
        <div className="container-fluid mt-3">
          {selectedTableItem.length >= 1 && (
            <div className="table-delete-icon mt-3">
              <button className="table-delete-btn next-btn-main">
                <img src={trashIconWhite} />
                Delete
              </button>
            </div>
          )}
          <div className="table-container">
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
                  Pagination: {
                    itemActiveBg: "#EF6B3E",
                  },
                },
              }}
            >
              <Table
                className="scroll-remove scroll-responsive-tablet"
                pagination={true}
                rowSelection={{
                  type: selectionType,
                  ...rowSelection,
                }}
                columns={columns}
                dataSource={data}
              />
            </ConfigProvider>
          </div>
        </div>
      </div>

      {/* Connect again */}
      <ModalLayout1
        isOpen={isPayNowModelOpen}
        onClose={() => setIsPayNowModelOpen(false)}
      >
        <ConnectComponentsProvider connectInstance={connectStripe}>
          <ConnectAccountOnboarding
            onExit={() => {
              message.success("Account added");
              fetch(`${config.baseUrl}/api/stripe/connectConfirm`, {
                method: "PUT",
                headers: {
                  "content-type": "application/json",
                  "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                  account_id: "account_id",
                }),
              })
                .then((res) => {
                  return res.json();
                })
                .then((res) => {
                  console.log(res);
                })
                .catch((e) => console.log(e, "error"));
              setTimeout(() => {
                navigate("/all-accounts");
              }, 1000);
            }}
          />
        </ConnectComponentsProvider>
      </ModalLayout1>
      {/* Connect again */}
    </>
  );
};

export default Accounting;
