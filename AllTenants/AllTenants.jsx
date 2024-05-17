import React, { useEffect, useState } from "react";
import CloudImg from "assets/Illustration.png";
import plusIconOrange from "assets/plus-orange.png";
import SearchBar from "Helpers/SearchBar";
import activeDot from "assets/_Dot.png";
import inactiveDot from "assets/inactivedot.png";
import viewIcon from "assets/Icon.png";
import editIcon from "assets/edit-05.png";
import deleteIcon from "assets/trash-01.png";
import trashIconWhite from "assets/trash-icon-white.png";
import settingIcon from "assets/three-dots.png";
import { Table, ConfigProvider } from "antd";
import { useNavigate, Link } from "react-router-dom";
import UseGetHook from "Hooks/UseGetHook";
import { useSelector } from "react-redux";
import ConditionalFilter from "Hooks/ConditionalFilter";
import AddTenantDetailsEditModal from "Modals/AddTenantDetailsEditModal/AddTenantDetailsEditModal";
import BulkDelete from "Hooks/BulkDelete";
import UseUrlParamsHook from "Hooks/UseUrlParamsHook";
import DeleteModal from "Modals/DeleteModal/DeleteModal";
import SearchBarWithOutBtn from "Helpers/SearchBarWithOutBtn";
import UserPermission from "libs/UserPermission";


const AllTenants = () => {
  const search = useSelector((state) => {
    return state.Search.value;
  });
  const { ROLE } = UserPermission()
  // States start
  const [selectionType, setSelectionType] = useState("checkbox");
  const [selectedTableItem, setSelectedTableItem] = useState("");
  const [key, setKey] = useState([]);
  const [openEditModalTask, setOpenEditModalTask] = useState(false);
  const [taskId, setTaskId] = useState("");
  const [update, setUpdate] = useState(false);
  const [delId, setDelId] = useState("")
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isHoveredDelete, setIsHoveredDelete] = useState(false);

  // States end

  const navigate = useNavigate();

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
  const onCloseEditModalTask = () => {
    setOpenEditModalTask(false);
  };
  const onOpenEditModalTask = () => {
    setOpenEditModalTask(true);
  };
  const onOpenDeleteModal = () => {
    setOpenDeleteModal(true);
  };
  const onCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };
  const handleMouseEnterDelete = () => {
    setIsHoveredDelete(true);
  };
  const handleMouseLeaveDelete = () => {
    setIsHoveredDelete(false);
  };
  // Fetch Data
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
  const { id } = UseUrlParamsHook();

  const { FetchTenant, TenantData } = UseGetHook(
    filters(FilterObjects)
      ? `tenants/filter?${filters(FilterObjects)}`
      : "tenants"
  );
  useEffect(() => {
    FetchTenant();
  }, [range, property, toDate, fromDate]);
  useEffect(() => {
    if (update) {
      FetchTenant();
      setUpdate(false);
    }
  }, [update]);
  const columns = [
    {
      title: "Tenant Name",
      dataIndex: "name",
      render: (text, name) => (
        <>
          <Link to={`/tenant-details-view?id=${name.key}`}>
            <span className="tenants_table_name_text">
              <img
                className="me-2 property-table-image mw_40 mh_40 me-2 rounded-5"
                src={`${name.img}`}
                alt=""
              />
              {text}
            </span>
          </Link>
        </>
      ),
    },
    {
      title: "Properties",
      dataIndex: "properties",
      render: (text, add) => (
        <>
          <span className="tenants_table_properties_text">
            {add.address_line_1}
          </span>
          <br />
          <span className="tenants_table_properties_text">{text}</span>
        </>
      ),
    },
    {
      title: "Email Address",
      dataIndex: "email",
      render: (text) => (
        <>
          <span className="tenants_table_email_text">{text}</span>
        </>
      ),
    },
    {
      title: "Phone No",
      dataIndex: "phone",
      render: (text) => (
        <>
          {" "}
          <span className="tenants_table_phone_text phone">{text}</span>
        </>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, status) => (
        <>
          <div
            className={
              status.key === "2"
                ? "prospect-inactive-bar"
                : "prospect-active-bar"
            }
          >
            <img src={status.key === "2" ? inactiveDot : activeDot} alt="" />{" "}
            <span>{text}</span>
          </div>
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

                  <Link to={`/tenant-details-view?id=${setting.key}`}>
                    <li className="list-style-none table-setting-dropdown-menu">
                      {" "}
                      <img src={viewIcon} alt="" /> View
                    </li>
                  </Link>
                  {
                    localStorage.getItem("role") !== "landlord" && localStorage.getItem("role") === "user" && ROLE[0]?.tenants?.update ?
                      <Link>
                        <li
                          className="list-style-none table-setting-dropdown-menu"
                          onClick={() => {
                            onOpenEditModalTask();
                            setTaskId(setting.key);
                          }}
                        >
                          {" "}
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
                            {" "}
                            <img src={editIcon} alt="" /> Edit
                          </li>
                        </Link>
                        :

                        ""
                  }
                  {
                    localStorage.getItem("role") !== "landlord" && localStorage.getItem("role") === "user" && ROLE[0]?.tenants?.delete ?
                      <Link>
                        <li
                          onClick={() => {
                            onOpenDeleteModal()
                            setDelId(setting.key);
                          }
                          }
                          onMouseEnter={handleMouseEnterDelete}
                          onMouseLeave={handleMouseLeaveDelete}

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
                              onOpenDeleteModal()
                              setDelId(setting.key);
                            }
                            }
                            onMouseEnter={handleMouseEnterDelete}
                            onMouseLeave={handleMouseLeaveDelete}

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

  const data = TenantData.filter((e) =>
    e.firstName.toLowerCase().includes(search.toLowerCase())
  ).map((e) => ({
    key: e.id,
    name: `${e.firstName ? e.firstName + " " : ""}${e.lastName ? e.lastName : ""
      }`.trim(),
    img: e.profileImage,
    address_line_1: e.additional_info.lease.property?.address?.address_line_1,
    properties: `${e.additional_info.lease.property?.address.city + " "}${e.additional_info.lease.property?.address.state + ", "
      }${e.additional_info.lease.property?.address.zipcode}`,
    email: e.email,
    phone: e.phone,
    status: e.additional_info.lease.property?.status,
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
  const { bulkDelete } = BulkDelete("tenants", selectedTableItem, FetchTenant);
  const DeleteSelected = () => {
    bulkDelete();
  };
  return (
    <>
      {openDeleteModal && (
        <DeleteModal
          onClose={onCloseDeleteModal}
          component="tenant"
          setUpdate={setUpdate}
          route="all-tenants"
          fetchFun={FetchTenant}
          deleteBtnText="Delete Tenant"
          delId={delId}
        />
      )}
      {openEditModalTask && (
        <AddTenantDetailsEditModal setUpdate={setUpdate} id={taskId} onClose={onCloseEditModalTask} />
      )}
      <div className="container-fluid bg-white p-3 ">
        {
          localStorage.getItem("role") !== "landlord" && localStorage.getItem("role") === "user" && ROLE[0]?.tenants?.add ?
            <SearchBar
              innerPage={false}
              onClick={() => {
                navigate("/add-tenant-details");
              }}
              btnTitle="Add New Tenant"
              tenantFilter={true}
            />
            :
            localStorage.getItem("role") === "landlord" ?
              <SearchBar
                innerPage={false}
                onClick={() => {
                  navigate("/add-tenant-details");
                }}
                btnTitle="Add New Tenant"
                tenantFilter={true}
              />
              :
              <SearchBarWithOutBtn tenantFilter={false} />
        }


        <div className="text-center main-screen-properties-content d-none">
          <img src={CloudImg} alt="" />
          <p className="property-main-text">No tenants found</p>
          <p className="property-sub-text">
            No tenants were found; the folder is empty.
            <br />
            Please try again.
          </p>
          <button className="add-property-btn-white">
            <img src={plusIconOrange} className="add-property-icon-white" alt="" /> Add
            Tenants
          </button>
        </div>
        <div className="row mt-5">
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
                    Checkbox: {
                      colorPrimary: "#EF6B3E",
                      colorPrimaryHover: "#EF6B3E",
                    },
                  },
                }}
              >
                <Table
                  pagination={false}
                  className="all-tenants-table scroll-remove scroll-responsive-tablet"
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

export default AllTenants;
