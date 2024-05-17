import { useEffect, useState } from "react";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import config from "Helpers/config.json";
import leaseStatusIcon from "assets/lease-status.png";
import leaseRentIcon from "assets/lease-rent.png";
import leaseBalanceIcon from "assets/lease-balance.png";
import settingIcon from "assets/three-dots.png";
import SearchBar from "Helpers/SearchBar";
import { Table, ConfigProvider } from "antd";
import viewIcon from "assets/Icon.png";
import deleteIcon from "assets/trash-01.png";
import settingIconOrange from "assets/dots-vertical.png";
import { useNavigate, Link } from "react-router-dom";
import trashIconWhite from "assets/trash-icon-white.png";
import dot from "assets/_Dot.png";
import dueDot from "assets/_red-Dot.png";
import SearchBarWithOutBtn from "Helpers/SearchBarWithOutBtn";
import UseGetHook from "Hooks/UseGetHook";
import { useSelector } from "react-redux";
import DeleteModal from "Modals/DeleteModal/DeleteModal";
import BulkDelete from "Hooks/BulkDelete";
import ConditionalFilter from "Hooks/ConditionalFilter";
import { RecordMenuPopup, ModalLayout1 } from "Components/GeneralComponents";
import UserPermission from "libs/UserPermission";

const Payment = () => {
  // States start
  const [selectionType, setSelectionType] = useState("checkbox");
  const [key, setKey] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [selectedTableItem, setSelectedTableItem] = useState("");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [component, setcomponent] = useState("");
  const [Delete, setDelete] = useState("");
  const [update, setUpdate] = useState(false);
  const [isPayNowModelOpen, setIsPayNowModelOpen] = useState(false);
  const [options, setOptions] = useState({});
  // States end
  const { ROLE } = UserPermission()
  const range = useSelector((state) => {
    return state.FilterValue.value;
  });
  const property = useSelector((state) => {
    return state.FilterValue.property;
  });
  const toDate = useSelector((state) => {
    return state.FilterValue.toDate;
  });
  const fromDate = useSelector((state) => {
    return state.FilterValue.fromDate;
  });
  const { filters, FilterObjects } = ConditionalFilter({
    range,
    property,
    fromDate,
    toDate,
  });

  // Stripe
  const stripeKey = loadStripe(config.stripe_publish_key);

  const role = localStorage.getItem("role");

  // GET API endpoint based on role and filters
  const getFilterUrl = () => {
    if (role === "tenant") {
      return filters(FilterObjects)
        ? `getInvoicesTenantFilter?${filters(FilterObjects)}`
        : "getInvoicesTenant";
    } else {
      return filters(FilterObjects)
        ? `getInvoice/filter?${filters(FilterObjects)}`
        : "getAllInvoices";
    }
  };

  const { Invoice, FetchInvoice, FetchTenantInvoice } = UseGetHook(
    getFilterUrl()
  );

  const search = useSelector((state) => {
    return state.Search.value;
  });

  // Fetch invoie data based on filters and role
  useEffect(() => {
    if (role === "tenant") {
      FetchTenantInvoice();
    } else {
      FetchInvoice();
    }
  }, [range, property, toDate, fromDate]);

  useEffect(() => {
    if (update) {
      FetchInvoice();
      setUpdate(false);
    }
  }, [update]);
  const handleIconClickCustom = () => {
    // Toggle the dropdown state when the icon is clicked
    setDropdownOpen(!isDropdownOpen);
  };

  // Data Table functions
  const data = Invoice.filter((e) =>
    e.invoice_no.toLowerCase().includes(search.toLowerCase())
  ).map((e) => ({
    key: e?._id,
    invoice: e?.invoice_no,
    name: e?.tenant?.firstName,
    start_date: new Date(e?.start_date).toLocaleDateString(),
    end_date: new Date(e?.end_date).toLocaleDateString(),
    property: e?.property_id?.title,
    due_date: new Date(e?.due_date).toLocaleDateString(),
    status: e?.status,
  }));

  const OpenDeleteModal = () => {
    setDelete(true);
  };
  const closDeleteModal = () => {
    setDelete(false);
  };

  const handleIconClick = (result) => {
    if (key === result) {
      setKey(null);
    } else {
      setKey(result);
    }
  };

  const handlePayNow = () => {
    const propertyId = Invoice.filter((tenant) => tenant._id === key)[0]
      .property_id.id;
    const fetchClientSecret = () => {
      return fetch(`${config.baseUrl}/api/stripe/paynow`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          email: localStorage.getItem("email"),
          invoiceId: key,
          propertyId: propertyId,
          returnUrl: `${process.env.REACT_APP_ENVIRONMENT === "development"
              ? process.env.REACT_APP_API_URL_DEV
              : process.env.REACT_APP_API_URL
            }/Payment`,
        }),
      })
        .then((res) => res.json())
        .then((data) => data?.message?.data?.client_secret);
    };
    setOptions({ fetchClientSecret });

    setIsPayNowModelOpen(true);
  };

  const columns = [
    {
      title: "Invoice No",
      dataIndex: "invoice",
      render: (text, name) => (
        <>
          <Link
            to={`/payable-overview?id=${name.key}`}
            className="payment-table-invoice-text"
          >
            {text}
          </Link>
        </>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Start date",
      dataIndex: "start_date",
      render: (text) => (
        <>
          <span className="phone">{text}</span>
        </>
      ),
    },
    {
      title: "End date",
      dataIndex: "end_date",
      render: (text) => (
        <>
          <span>{text}</span>
        </>
      ),
    },
    {
      title: "Related to",
      dataIndex: "property",
      render: (text) => (
        <>
          <span>{text}</span>
        </>
      ),
    },
    {
      title: "Invoice Date",
      dataIndex: "due_date",
      render: (text) => (
        <>
          <span>{text}</span>
        </>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, status) => (
        <>
          <span
            className={
              text === "unpaid"
                ? "tenant-report-due-bar"
                : "tenant-report-active-bar"
            }
          >
            <img
              src={text === "unpaid" ? dueDot : dot}
              alt=""
              className="me-1"
            />
            {text}
          </span>
        </>
      ),
    },
    {
      title: "",
      dataIndex: "setting",
      render: (text, setting) => (
        <>
          <div className="task-table-setting-container position-relative">
            <img
              className="cursor  "
              src={settingIcon}
              alt=""
              onClick={() => handleIconClick(setting.key)}
            />
            <RecordMenuPopup
              isOpen={key === setting.key}
              onClose={() => setKey(null)}
              role={role}
              item_id={setting.key}
              pay={setting.status === "Paid" ? true : false}
              handler={{
                handleDeleteRecord: () => {
                  OpenDeleteModal();
                  setcomponent("invoice");
                  setDeleteId(setting.key);
                },
                handlePayNow: handlePayNow,
              }}
            />
          </div>
        </>
      ),
    },
  ];
  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedTableItem([...selectedRowKeys]);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };
  const { bulkDelete } = BulkDelete("invoice", selectedTableItem, FetchInvoice);
  const DeleteSelectedProperty = () => {
    bulkDelete();
  };
  return (
    <>
      {Delete && (
        <DeleteModal
          setUpdate={setUpdate}
          onClose={closDeleteModal}
          component={component}
          deleteBtnText={`Delete ${component}`}
          delId={deleteId}
        />
      )}
      <div className="container-fluid bg-white p-3">
        {localStorage.getItem("token") === "landlord" && (
          <div className="row">
            <div className="col-md-12 text-end">
              <img
                onClick={handleIconClickCustom}
                src={settingIconOrange}
                alt=""
                className="cursor"
              />
              {isDropdownOpen && (
                <div className="task-table-setting-dropdown-prospect bg-white box-shadow text-start">
                  <ul className="p-0 d-flex flex-column gap-3">
                    <li className="list-style-none lease-details-dropdown-icons">
                      {" "}
                      <img src={viewIcon} alt="" className="cursor" /> View
                    </li>
                    <li className="list-style-none lease-details-dropdown-icons">
                      {" "}
                      <img src={deleteIcon} alt="" className="cursor" /> Delete
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <div className="col-md-3">
              <div className="task-overview-tab-boxes p-3 position-relative">
                <div className="overview-box-img">
                  <img src={leaseBalanceIcon} alt="" />
                </div>
                <div className="over-view-box-text">
                  <span>Total Invoices</span>
                  <h3>8,945</h3>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="task-overview-tab-boxes p-3 position-relative">
                <div className="overview-box-img">
                  <img src={leaseStatusIcon} alt="" />
                </div>
                <div className="over-view-box-text">
                  <span>Paid Invoices</span>
                  <h2>4,519</h2>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="task-overview-tab-boxes p-3 position-relative">
                <div className="overview-box-img">
                  <img src={leaseRentIcon} alt="" />
                </div>
                <div className="over-view-box-text">
                  ~<span>Pending Invoice</span>
                  <h3>2654</h3>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="task-overview-tab-boxes p-3 position-relative">
                <div className="overview-box-img">
                  <img src={leaseRentIcon} alt="" />
                </div>
                <div className="over-view-box-text">
                  <span>Overdue Invoice</span>
                  <h3>54</h3>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="row mt-3">
          <div className="col-md-12">
            {localStorage.getItem("role") === "tenant" ? (
              <SearchBarWithOutBtn
                route="create-payable"
                invoiceFilter={true}
                btnTitle="Create New Invoice"
                unitsFilter={true}
              />
            ) : (
              <SearchBar
                route="create-payable"
                invoiceFilter={true}
                btnTitle="Create New Invoice"
              />
            )}
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-12">
            {selectedTableItem.length >= 1 && (
              <div className="table-delete-icon mt-3">
                <button
                  onClick={DeleteSelectedProperty}
                  className="table-delete-btn next-btn-main"
                >
                  <img src={trashIconWhite} alt="Delete Icon" />
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
                      //colorTextDescription: '#667085',
                      colorText: "#667085",
                      fontSize: 14,
                      fontWeightStrong: 500,
                      fontFamily: "Montserrat",
                      //cellFontSize: 14,
                    },
                    Pagination: {
                      itemActiveBg: "#EF6B3E",
                    },
                    Checkbox: {
                      colorPrimary: "#EF6B3E",
                      colorPrimaryHover: "#EF6B3E",
                    },
                  },
                }}
              >
                <Table
                  pagination={true}
                  className="scroll-remove scroll-responsive-tablet"
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
        {/* Pay now Model */}
        <ModalLayout1
          isOpen={isPayNowModelOpen}
          onClose={() => setIsPayNowModelOpen(false)}
        >
          <EmbeddedCheckoutProvider stripe={stripeKey} options={options}>
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        </ModalLayout1>
      </div>
    </>
  );
};

export default Payment;
