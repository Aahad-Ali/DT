import { useState, useEffect } from "react";
import NotFound from "assets/not-found-img.png";
import { Table, ConfigProvider } from "antd";
import { useNavigate, Link } from "react-router-dom";
import settingIcon from "assets/three-dots.png";
import viewIcon from "assets/Icon.png";
import editIcon from "assets/edit-05.png";
import deleteIcon from "assets/trash-01.png";
import trashIconWhite from "assets/trash-icon-white.png";
import convertIcon from "assets/drop-down-user-icon.png";
import activeDot from "assets/_Dot.png";
import SearchBar from "Helpers/SearchBar";
import ConvertTenantModal from "Modals/ConvertTenantModal/ConvertTenantModal";
import DeleteModal from "Modals/DeleteModal/DeleteModal";
import { useSelector } from "react-redux";
import UseGetHook from "Hooks/UseGetHook";
import AddProspectDetailsEditModal from "Modals/AddProspectDetailsEditModal/AddProspectDetailsEditModal";
import ConditionalFilter from "Hooks/ConditionalFilter";
import BulkDelete from "Hooks/BulkDelete";
import config from "Helpers/config.json";
import { message } from "antd";
import ReportViewModal from "Modals/ReportViewModal/ReportViewModal";
import SearchBarWithOutBtn from "Helpers/SearchBarWithOutBtn";
import UserPermission from "libs/UserPermission";
const AllProspect = () => {
  // States start
  const [selectionType, setSelectionType] = useState("checkbox");
  const [openModal, setOpenModal] = useState(false);
  const [selectedTableItem, setSelectedTableItem] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [DeleteId, setDeleteId] = useState("");
  const [key, setKey] = useState([]);
  const [openEditModalTask, setOpenEditModalTask] = useState(false);
  const [taskId, setTaskId] = useState("");
  const [prospectId, setProspectId] = useState("");
  const [update, setUpdate] = useState(false);
  const [openAccountModal, setOpenAccountModal] = useState(false);
  const [email, setEmail] = useState("");

  // States end

  const navigate = useNavigate();
  const search = useSelector((state) => {
    return state.Search.value;
  });
  // Modal Function
  const onOpenModal = () => {
    setOpenModal(true);
  };
  const onCloseModal = () => {
    setOpenModal(false);
  };

  const onOpenDeleteModal = () => {
    setOpenDeleteModal(true);
  };
  const onCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };
  const onOpenEditModalTask = () => {
    setOpenEditModalTask(true);
  };
  const onCloseEditModalTask = () => {
    setOpenEditModalTask(false);
  };
  const convertToTenant = (id) => {
    setProspectId(id);
    onOpenModal();
  };
  const onOpenAccountModal = () => {
    setOpenAccountModal(true);
  };
  const onCloseModalWorkOrder = () => {
    setOpenAccountModal(false);
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
  const CheckCredit = (id) => {
    fetch(`${config.baseUrl}/api/landlord/transunion/createScreeningRequest`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        prospectId: id,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.apiCallStatus === "success") {
          message.success("Invitation sent successfully");
        } else {
          message.error(res.error);
        }
      })
      .catch((err) => console.log(err, "error"));
  };

  const columns = [
    {
      title: "Prospect Name",
      dataIndex: "prospectName",
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
      title: "Phone No",
      dataIndex: "phone",
      render: (text, phone) => (
        <>
          <span className="phone">{text}</span>
        </>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (text) => (
        <>
          <span>{text}</span>
        </>
      ),
    },
    {
      title: "Date Created",
      dataIndex: "created_at",
      render: (text, created_at) => (
        <>
          <span className="all-prospect-date">{text}</span>
        </>
      ),
    },
    {
      title: <>Status</>,
      dataIndex: "status",
      render: (text) => (
        <>
          <div className="prospect-active-bar">
            <img src={activeDot} alt="" /> <span>{text}</span>
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
                  <Link to={`/prospect-details?id=${setting.key}`}>
                    <li className="list-style-none table-setting-dropdown-menu">
                      {" "}
                      <img src={viewIcon} alt="" /> View
                    </li>
                  </Link>
                  {
                    setting.status === "Report Available" && (
                      <Link>
                        <li
                          onClick={() => {
                            setEmail(setting.email)
                            onOpenAccountModal()
                          }}
                          className="list-style-none table-setting-dropdown-menu"
                        >
                          {" "}
                          <img src={viewIcon} alt="" /> View Report
                        </li>
                      </Link>
                    )
                  }
                  {
                    localStorage.getItem("role") !== "landlord" && localStorage.getItem("role") === "user" && ROLE[0]?.prospects?.update ?
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

                  <Link>
                    <li
                      className="list-style-none table-setting-dropdown-menu"
                      onClick={() => {
                        CheckCredit(setting.key);
                      }}
                    >
                      {" "}
                      <span className="me-2">
                        <svg
                          width={18}
                          height={18}
                          fill="none"
                          stroke="#808080ab"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M22 2 11 13" />
                          <path d="m22 2-7 20-4-9-9-4 20-7z" />
                        </svg>
                      </span>{" "}
                      Send Credit Check
                    </li>
                  </Link>
                  <Link onClick={() => convertToTenant(setting.key)}>
                    <li className="list-style-none table-setting-dropdown-menu">
                      {" "}
                      <img src={convertIcon} alt="" /> Convert to tenant
                    </li>
                  </Link>
                  {
                    localStorage.getItem("role") !== "landlord" && localStorage.getItem("role") === "user" && ROLE[0]?.prospects?.delete ?
                      <Link
                        onClick={() => {
                          onOpenDeleteModal();
                          setDeleteId(setting.key);
                        }}
                      >
                        <li className="list-style-none table-setting-dropdown-menu">
                          {" "}
                          <img src={deleteIcon} alt="" /> Delete
                        </li>
                      </Link>
                      :
                      localStorage.getItem("role") === "landlord" ?
                        <Link
                          onClick={() => {
                            onOpenDeleteModal();
                            setDeleteId(setting.key);
                          }}
                        >
                          <li className="list-style-none table-setting-dropdown-menu">
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
  // Get Prospects
  const range = useSelector((state) => {
    return state.FilterValue.value;
  });
  const property = useSelector((state) => {
    return state.FilterValue.property;
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
    fromDate,
    toDate,
  });
  const { ProspectData, fetchProspect } = UseGetHook(
    filters(FilterObjects)
      ? `prospects/filter?${filters(FilterObjects)}`
      : "prospects"
  );
  useEffect(() => {
    fetchProspect();
  }, [property, range, fromDate, toDate]);
  useEffect(() => {
    if (update) {
      fetchProspect();
      setUpdate(false);
    }
  }, [update]);
  const data = ProspectData.filter((e) =>
    e.firstName.toLowerCase().includes(search.toLowerCase())
  ).map((e) => ({
    key: e.id,
    prospectName: `${e.firstName ? e.firstName + " " : ""}${e.lastName ? e.lastName : ""
      }`.trim(),
    img: e.profileImage,
    status: e.verification_status,
    phone: e.phone,
    email: e.email,
    created_at: new Date(e.created_at).toLocaleDateString(),
  }));
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
  };
  const { bulkDelete } = BulkDelete(
    "prospect",
    selectedTableItem,
    fetchProspect
  );
  const DeleteSelected = () => {
    bulkDelete();
  };
  const { ROLE } = UserPermission()
  return (
    <>
      {openAccountModal === true ? (
        <ReportViewModal
          onOpen={onOpenModal}
          onClose={onCloseModalWorkOrder}
          email={email}
        // id={id}
        />
      ) : (
        ""
      )}
      {openDeleteModal === true ? (
        <DeleteModal
          onClose={onCloseDeleteModal}
          component="prospect"
          route="all-prospect"
          setUpdate={setUpdate}
          deleteBtnText="Delete Prospect"
          delId={DeleteId}
        />
      ) : (
        ""
      )}
      {openModal && (
        <ConvertTenantModal
          id={prospectId}
          onClose={onCloseModal}
          modalTitle="Create Lease"
        />
      )}
      {openEditModalTask && (
        <AddProspectDetailsEditModal
          setUpdate={setUpdate}
          id={taskId}
          onClose={onCloseEditModalTask}
        />
      )}

      <div className="container-fluid bg-white p-3">
        <div className="row">
          <div className="col-md-12 ">
            {
              localStorage.getItem("role") !== "landlord" && localStorage.getItem("role") === "user" && ROLE[0]?.prospects?.add ?
                <SearchBar
                  btnTitle="Add New Prospects"
                  route="add-prospect-details"
                  prospectsFilter={true}
                />
                :
                localStorage.getItem("role") === "landlord" ?
                  <SearchBar
                    btnTitle="Add New Prospects"
                    route="add-prospect-details"
                    prospectsFilter={true}
                  />
                  :
                  <SearchBarWithOutBtn prospectsFilter={true} />
            }

          </div>
        </div>
        {selectedTableItem.length >= 1 && (
          <div className="table-delete-icon mt-3">
            <button
              onClick={DeleteSelected}
              className="table-delete-btn next-btn-main"
            >
              <img src={trashIconWhite} />
              Delete
            </button>
          </div>
        )}
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
        <div className="not-found-container text-center d-none">
          <img src={NotFound} alt="" />
          <p>
            <strong>No prospects found</strong>
          </p>
          <p>
            No prospects were found; the folder is empty. <br /> Please try
            again.
          </p>
          <button className="not-found-add-task-btn primary-orange-text">
            <span className="plus">
              <svg
                width={21}
                height={21}
                fill="#EF6B3E"
                stroke="#EF6B3E"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 5v14" />
                <path d="M5 12h14" />
              </svg>
            </span>
            Add Tasks
          </button>
        </div>
      </div>
    </>
  );
};

export default AllProspect;
