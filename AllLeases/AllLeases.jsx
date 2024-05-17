import { useEffect, useState } from "react";
import SearchBar from "Helpers/SearchBar";
import { Table, ConfigProvider } from "antd";
import settingIcon from "assets/three-dots.png";
import viewIcon from "assets/Icon.png";
import renewLeaseIcon from "assets/End Lease.png";
import whiteDot from "assets/_white-Dot.png";
import deleteIcon from "assets/trash-01.png";
import trashIconWhite from "assets/trash-icon-white.png";
import { useNavigate, Link } from "react-router-dom";
import UseGetHook from "Hooks/UseGetHook";
import { useSelector } from "react-redux";
import DeleteModal from "Modals/DeleteModal/DeleteModal";
import ConditionalFilter from "Hooks/ConditionalFilter";
import BulkDelete from "Hooks/BulkDelete";
import UserPermission from "libs/UserPermission";
import SearchBarWithOutBtn from "Helpers/SearchBarWithOutBtn";
const AllLeases = ({ onClick, route, ...props }) => {
  // States start
  const [selectionType, setSelectionType] = useState("checkbox");
  const [taskFilterDropdown, settaskFilterDropdown] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTableItem, setSelectedTableItem] = useState("");
  const [key, setKey] = useState([]);
  const [component, setcomponent] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [update, setUpdate] = useState(false);
  // States end

  const navigate = useNavigate();

  const search = useSelector((state) => {
    return state.Search.value;
  });
  const range = useSelector((state) => {
    return state.FilterValue.value;
  });
  const property = useSelector((state) => {
    return state.FilterValue.property;
  });
  const lease_term = useSelector((state) => {
    return state.FilterValue.lease_term;
  });
  const rollover_end_of_term = useSelector((state) => {
    return state.FilterValue.rollover_end_of_term;
  });
  const fromDate = useSelector((state) => {
    return state.FilterValue.fromDate;
  });
  const toDate = useSelector((state) => {
    return state.FilterValue.toDate;
  });
  const { filters, FilterObjects } = ConditionalFilter({
    range,
    property,
    lease_term,
    rollover_end_of_term,
    fromDate,
    toDate,
  });
  const { FetchLease, lease } = UseGetHook(
    filters(FilterObjects)
      ? `leases/filter?${filters(FilterObjects)}`
      : "leases"
  );
  useEffect(() => {
    FetchLease();
  }, [range, property, lease_term, rollover_end_of_term, fromDate, toDate]);
  useEffect(() => {
    if (update) {
      FetchLease();
      setUpdate(false);
    }
  }, [update]);
  // Modal Function
  const onOpenModal = () => {
    setOpenModal(true);
  };
  const onCloseModal = () => {
    setOpenModal(false);
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
  const columns = [
    {
      title: "Property Address",
      dataIndex: "property",
      render: (text, property) => (
        <Link to={`/lease-detail?id=${property.key}`}>
          <span className="all-lease-property-text">{text}</span>
        </Link>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => (
        <>
          <span className="all-lease-date-text">{text[0]}</span>
          <br />
          <span className="all-lease-date-text">{text[1]}</span>
        </>
      ),
    },
    {
      title: "Term",
      dataIndex: "term",
      render: (text, term) => (
        <>
          <div className="table-status-bar lease-status">
            <>
              <img src={whiteDot} alt="" /> <span>{text}</span>
            </>
          </div>
        </>
      ),
    },
    {
      title: "Rent",
      dataIndex: "rent",
    },
    {
      title: "Deposit",
      dataIndex: "deposit",
      render: (text) => (
        <>
          <span>{text}</span>
        </>
      ),
    },
    {
      title: "Balance",
      dataIndex: "balance",
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
          {status.key === "1" && (
            <>
              <p className="expire-label pb-0 mb-0"></p>
              <span className="about-to-expire-text">About to Expire</span>
              <br />
              <span className="error-text ">23 days remaining</span>
            </>
          )}
          <>
            <p className="active-label pb-0 mb-0"></p>
            <span className="primary-orange-text">{text}</span>
          </>
          {status.key === "3" && (
            <>
              <p className="expired-label pb-0 mb-0"></p>
              <span className="expired-text">Expired</span>
            </>
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

                  <Link to={`/lease-detail?id=${setting.key}`}>
                    <li className="list-style-none table-setting-dropdown-menu">
                      {" "}
                      <img src={viewIcon} alt="" /> View
                    </li>
                  </Link>
                  {setting.renew === true ? (
                    <Link to={`/renew-lease?id=${setting.key}`}>
                      <li className="list-style-none table-setting-dropdown-menu">
                        {" "}
                        <img src={renewLeaseIcon} alt="" /> Renew Lease
                      </li>
                    </Link>
                  ) : (
                    ""
                  )}
                  {
                    localStorage.getItem("role") !== "landlord" && localStorage.getItem("role") === "user" && ROLE[0]?.leases?.delete ?
                      <li
                        onClick={() => {
                          setcomponent("lease");
                          onOpenModal();
                          setDeleteId(setting.key);
                        }}
                        className="list-style-none table-setting-dropdown-menu"
                      >
                        {" "}
                        <img src={deleteIcon} alt="" /> Delete
                      </li>
                      :
                      localStorage.getItem("role") === "landlord" ?
                        <li
                          onClick={() => {
                            setcomponent("lease");
                            onOpenModal();
                            setDeleteId(setting.key);
                          }}
                          className="list-style-none table-setting-dropdown-menu"
                        >
                          {" "}
                          <img src={deleteIcon} alt="" /> Delete
                        </li>
                        :
                        ""
                  }
                </ul>
              </div>
            )}
          </div>
        </>
      ),
    },
  ];
  const data = lease
    ?.filter((e) =>
      e?.property?.title?.toLowerCase()?.includes(search.toLowerCase())
    )
    ?.map((e) => ({
      key: e.id,
      renew: e.renew,
      property: e.property.title,
      date: [
        new Date(e.lease_term_start_date).toLocaleDateString(),
        new Date(e.lease_term_end_date).toLocaleDateString(),
      ],
      term: e.lease_term,
      rent: `$${e.rent_amount.toLocaleString()}`,
      deposit: `$4000`,
      balance: "$1000",
      status: `Active`,
    }));
  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedTableItem([...selectedRowKeys]);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };
  const { bulkDelete } = BulkDelete("lease", selectedTableItem, FetchLease);
  const DeleteSelected = () => {
    bulkDelete();
  };
  const fetchDeleteFun = () => {
    FetchLease();
  };
  const { ROLE } = UserPermission()
  return (
    <>
      {openModal === true ? (
        <DeleteModal
          onClose={onCloseModal}
          component={component}
          setUpdate={setUpdate}
          deleteBtnText={`Delete ${component}`}
          delId={deleteId}
        />
      ) : (
        ""
      )}
      <div className="container-fluid bg-white p-3 ">
        <div className="row">
          <div className="col-md-12">
            {
              localStorage.getItem("role") !== "landlord" && localStorage.getItem("role") === "user" && ROLE[0]?.leases?.add ?
                <SearchBar
                  btnTitle="Add New Lease"
                  route="new-lease"
                  leaseFilter={true}
                />
                :
                localStorage.getItem("role") === "landlord" ?
                  <SearchBar
                    btnTitle="Add New Lease"
                    route="new-lease"
                    leaseFilter={true}
                  />
                  : <SearchBarWithOutBtn leaseFilter={true} />
            }

          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-12">
            {selectedTableItem.length >= 1 && (
              <div className="table-delete-icon mt-3">
                <button
                  onClick={DeleteSelected}
                  className="table-delete-btn next-btn-main"
                >
                  <img src={trashIconWhite} alt="" />
                  Delete
                </button>
              </div>
            )}
            <div className="table-container ">
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
                  className="all-lease-table-main scroll-remove scroll-responsive-tablet"
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
      </div>
    </>
  );
};

export default AllLeases;
