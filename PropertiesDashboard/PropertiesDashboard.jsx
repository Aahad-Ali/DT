import { useState, useEffect } from "react";
import searchIcon from "assets/New icons (7).png";
import filterIcon from "assets/filter.png";
import plusIcon from "assets/plus.png";
import viewIcon from "assets/Icon.png";
import editIcon from "assets/edit-05.png";
import deleteIcon from "assets/trash-01.png";
import trashIconWhite from "assets/trash-icon-white.png";
import settingIcon from "assets/three-dots.png";
import chevronIconDown from "assets/chevron-down.png";
import { Link, useNavigate } from "react-router-dom";
import { Table, ConfigProvider } from "antd";
import UseGetHook from "Hooks/UseGetHook";
import Loader from "Helpers/Loader";
import AddPropertyEditModal from "Modals/AddPropertyEditModal/AddPropertyEditModal";
import BulkDelete from "Hooks/BulkDelete";
// import BulkDelete from "Hooks/BulkDelete";
import DeleteModal from "Modals/DeleteModal/DeleteModal";
import PropertyFilter from "Helpers/PropertyFilter";
import ConditionalFilter from "Hooks/ConditionalFilter";
import { useSelector } from "react-redux";
import UserPermission from "libs/UserPermission";
const PropertiesDashboard = () => {
  // select box icon
  let dropdownIcon;
  dropdownIcon = (
    <>
      <img src={chevronIconDown} alt="" />
    </>
  );
  const { ROLE } = UserPermission()
  // States start
  const navigate = useNavigate();
  const [hideFilter, setHideFilter] = useState(false);
  const [selectionType, setSelectionType] = useState("checkbox");
  const [openModal, setOpenModal] = useState(false);
  const [selectedTableItem, setSelectedTableItem] = useState("");
  const [component, setcomponent] = useState("");

  const [deleteId, setDeleteId] = useState("");
  const [key, setKey] = useState([]);
  const [search, setSearch] = useState("");
  const [openEditModalTask, setOpenEditModalTask] = useState(false);
  const [taskId, setTaskId] = useState("");
  const [update, setUpdate] = useState(false);
  // States end
  const states = useSelector((state) => {
    return state.FilterValue;
  });
  const property_sub_type = useSelector((state) => {
    return state.FilterValue.property_sub_type;
  });
  const status = useSelector((state) => {
    return state.FilterValue.status;
  });
  const minRent = useSelector((state) => {
    return state.FilterValue.minRent;
  });
  const maxRent = useSelector((state) => {
    return state.FilterValue.maxRent;
  });
  const bedroom = useSelector((state) => {
    return state.FilterValue.bedroom;
  });
  const bathroom = useSelector((state) => {
    return state.FilterValue.bathroom;
  });
  const state = useSelector((state) => {
    return state.FilterValue.state;
  });
  const { filters, FilterObjects } = ConditionalFilter({
    property_sub_type,
    status,
    minRent,
    maxRent,
    state,
    ...(bedroom && bedroom.length ? { "bedroom[]": bedroom } : {}),
    ...(bathroom && bathroom.length ? { "bathroom[]": bathroom } : {}),
  });
  const { fetchProperty, PropertyData, loader } = UseGetHook(
    filters(FilterObjects)
      ? `property/filter?${filters(FilterObjects)}`.replace(
        "state=",
        "address.state="
      )
      : "property"
  );
  useEffect(() => {
    fetchProperty();
  }, [property_sub_type, status, minRent, maxRent, bedroom, bathroom, state]);
  useEffect(() => {
    if (update) {
      fetchProperty();
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
  const onOpenEditModalTask = () => {
    setOpenEditModalTask(true);
  };

  const columns = [
    {
      title: "Property Name",
      dataIndex: "propertyName",
      render: (text, propertyName) => (
        <>
          <Link
            to={`/property-details-view?id=${propertyName.key}`}
            className="property-table-name-text"
          >
            <img
              className="rounded-5 property-table-image mw_40 mh_40 me-2"
              src={`${propertyName.img[0]}`}
              alt=""
            />{" "}
            <span className="properties_dashboard_table_name_text">{text}</span>
          </Link>
        </>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (text, type) => (
        <>
          <span className="type-text-multi-family rounded-4">{text.split("_").join(" ")}</span>

        </>
      ),
    },
    {
      title: "Address",
      dataIndex: "address",
      render: (text, add) => (
        <>
          <div className="properties_dashbaord_address_text">{text}</div>
          <span className="properties_dashbaord_address_text">
            {add.city} {add.state}, {add.zipcode}
          </span>
        </>
      ),
    },
    {
      title: "Rent Amount",
      dataIndex: "rentAmount",
      render: (text) => (
        <>
          <span className="properties_dashboard_table_amount_text">{text}</span>
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
              onClick={() => handleIconClick(setting.key)}
            />
            {setting.key === key && (
              <div className="task-table-setting-dropdown-prospect bg-white box-shadow">
                <ul className="p-0 d-flex flex-column gap-3">
                  <Link to={`/property-details-view?id=${setting.key}`}>
                    <li className="list-style-none table-setting-dropdown-menu">
                      {" "}
                      <img src={viewIcon} alt="" /> View
                    </li>
                  </Link>
                  {
                    localStorage.getItem("role") !== "landlord" && localStorage.getItem("role") === "user" && ROLE[0]?.properties.update ?
                      <Link>
                        <li
                          className="list-style-none table-setting-dropdown-menu"
                          onClick={() => {
                            onOpenEditModalTask();
                            setTaskId(setting.key);
                          }}
                        >
                          <img src={editIcon} alt="" /> Edit
                        </li>
                      </Link>
                      :
                      localStorage.getItem("role") === "landlord" ?
                        <Link>
                          <li
                            className="list-style-none table-setting-dropdown-menu"
                            onClick={() => {
                              onOpenEditModalTask();
                              setTaskId(setting.key);
                            }}
                          >
                            <img src={editIcon} alt="" /> Edit
                          </li>
                        </Link>
                        :
                        ""
                  }
                  {
                    localStorage.getItem("role") !== "landlord" && localStorage.getItem("role") === "user" && ROLE[0]?.properties.update ?

                      <Link>
                        <li
                          onClick={() => {
                            onOpenModal();
                            setDeleteId(setting.key);
                            setcomponent("property");
                          }}
                          className="list-style-none table-setting-dropdown-menu"
                        >
                          {" "}
                          <img src={deleteIcon} alt="" /> Delete
                        </li>
                      </Link>
                      :

                      localStorage.getItem("role") === "landlord" ?
                        <Link>
                          <li
                            onClick={() => {
                              onOpenModal();
                              setDeleteId(setting.key);
                              setcomponent("property");
                            }}
                            className="list-style-none table-setting-dropdown-menu"
                          >
                            {" "}
                            <img src={deleteIcon} alt="" /> Delete
                          </li>
                        </Link>
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
  // Get Properties

  const data = PropertyData.filter((e) =>
    e?.title?.toLowerCase().includes(search.toLowerCase())
  ).map((e) => ({
    key: e.id,
    propertyName: e.title,
    img: e.images,
    city: e.address.city,
    state: e.address.state,
    zipcode: e.address.zipcode,
    type: `${e.property_sub_type}`,
    address: e.address.address_line_1,
    rentAmount: `$${e.rent_amount.toLocaleString()}`,
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

  //Status Dropdown
  const onCloseEditModalTask = () => {
    setOpenEditModalTask(false);
  };

  const { bulkDelete } = BulkDelete(
    "property",
    selectedTableItem,
    fetchProperty
  );
  const DeleteSelectedProperty = () => {
    bulkDelete();
  };
  const fetchFun = () => {
    fetchProperty();
  };
  const isArchived = PropertyData?.filter(e => e.id === deleteId)
  console.log(isArchived, 'hhh')
  return (
    <>
      {openModal && (
        <DeleteModal
          onClose={onCloseModal}
          component={component}
          setUpdate={setUpdate}
          fetchFun={fetchFun}
          route="properties-dashboard"
          deleteBtnText={`Delete ${component}`}
          delId={deleteId}
          url={`api/propertyArchive?id=${deleteId}`}
          isArchived={isArchived[0]?.isArchived}
        />
      )}
      {openEditModalTask && (
        <AddPropertyEditModal
          setUpdate={setUpdate}
          id={taskId}
          onClose={onCloseEditModalTask}
        />
      )}
      <div className="container-fluid d-lg-block p-3">
        <div className="row">
          <div className="search-bar mt-4">
            <form>
              <div className="input-icon">
                <span className="input-icon-addon">
                  <img src={searchIcon} alt="" className="icon" />
                </span>
                <input
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="Search"
                />
              </div>
            </form>
          </div>
        </div>
        <div className="row ">
          <div className="col-md-3">
            <div
              className={hideFilter === true ? "sub-headings mt-4" : "d-none"}
            >
              <h2 className="property-sub-title ">Filters</h2>
            </div>
          </div>
          <div
            className={
              hideFilter === true
                ? "col-md-9 d-flex justify-content-between"
                : "col-md-12 d-flex justify-content-between"
            }
          >
            <div className="sub-headings mt-4 d-flex gap-2 align-items-center">
              <h2 className="property-sub-title mb-0">Property</h2>
              <span className="badge badge-gray">
                <p className="badge-base-text">{PropertyData.length}</p>
              </span>
            </div>
            <div className="properties-dashbboard-btn-main btn-list mt-4">
              <button
                onClick={() => {
                  setHideFilter(!hideFilter);
                }}
                className="filter-btn"
              >
                <img
                  src={filterIcon}
                  alt=""
                  className="properties-filter-icon"
                />{" "}
                Filter
              </button>
              {
                localStorage.getItem("role") !== "landlord" && localStorage.getItem("role") === "user" && ROLE[0]?.properties.add ?
                  <button
                    onClick={() => {
                      navigate("/add-property-details");
                    }}
                    className="add-property-btn"
                  >
                    <img src={plusIcon} alt="" className="add-property-icon" /> Add
                    Property
                  </button>
                  :
                  localStorage.getItem("role") === "landlord" ?
                    <button
                      onClick={() => {
                        navigate("/add-property-details");
                      }}
                      className="add-property-btn"
                    >
                      <img src={plusIcon} alt="" className="add-property-icon" /> Add
                      Property
                    </button>
                    : ""
              }

            </div>
          </div>
        </div>
        <div className={hideFilter === true ? "d-flex gap-4" : "d-block"}>
          <PropertyFilter hideFilter={hideFilter} />
          {selectedTableItem.length >= 1 && (
            <div className="table-delete-icon mt-3">
              <button
                onClick={DeleteSelectedProperty}
                className="table-delete-btn next-btn-main"
              >
                <img src={trashIconWhite} />
                Delete
              </button>
            </div>
          )}
          <div
            className={
              hideFilter === true
                ? "col-md-9 property-main-section mt-3"
                : "property-main-section mt-3"
            }
          >
            <div
              className={
                hideFilter === true
                  ? "scrollable-table ${isScrollActive ? 'active"
                  : ""
              }
            >
              {loader ? (
                <Loader />
              ) : (
                <ConfigProvider
                  theme={{
                    components: {
                      Table: {
                        colorTextHeading: "#667085",
                        colorText: "#667085",
                        fontSize: 14,
                        fontWeightStrong: 500,
                        fontFamily: "Montserrat",
                        zIndexPopup: 99999,
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
                    className="properties-dashboard-table-list properties-dashboard-table"
                    rowSelection={{
                      type: selectionType,
                      ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={data}
                    pagination={true}
                  />
                </ConfigProvider>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertiesDashboard;
