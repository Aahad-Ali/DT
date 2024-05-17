import React, { useEffect, useState } from "react";
import { Avatar, Skeleton, Tabs, message } from "antd";
import NotFound from "assets/not-found-img.png";
import FileUploader from "../FileUploader/FileUploader";
import SearchBar from "Helpers/SearchBar";
import settingIcon from "assets/three-dots.png";
import editIcon from "assets/edit-05.png";
import deleteIcon from "assets/trash-01.png";
import viewIcon from "assets/Icon.png";
import completeIcon from "assets/calendar-check-01.png";
import inactiveDot from "assets/inactivedot.png";
import homeIconTwo from "assets/home-03 (1).png";
import bedroomIcon from "assets/Vector (5).png";
import bathroomIcon from "assets/Vector (6).png";
import sizeIcon from "assets/layout-alt-04 (1).png";
import parkingIcon from "assets/P.png";
import whiteDot from "assets/_white-Dot.png";
import renewLeaseIcon from "assets/End Lease.png";
import { Table, ConfigProvider, Upload } from "antd";
import { useNavigate, Link } from "react-router-dom";
import UnitDetailsSliderModal from "Modals/UnitDetailsSliderModal/UnitDetailsSliderModal";
import UseGetHook from "Hooks/UseGetHook";
import UseUrlParamsHook from "Hooks/UseUrlParamsHook";
import { useSelector } from "react-redux";
import TenantTaskUnitModal from "Modals/TenantTaskUnitModal/TenantTaskUnitModal";

import DeleteModal from "Modals/DeleteModal/DeleteModal";
import NoteDetails from "../NoteDetails/NoteDetails";
import settingIconOrange from "assets/dots-vertical.png";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
const { Dragger } = Upload;
const TenantPropertyUnitsView = () => {
  const { TabPane } = Tabs;
  // Search Start
  const Search = useSelector((state) => {
    return state.Search.value;
  });
  // Search End

  const handleIconClickCustom = () => {
    // Toggle the dropdown state when the icon is clicked
    setDropdownOpen(!isDropdownOpen);
  };

  // States start
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [showNoteDetails, setShowNoteDetails] = useState(false);
  const [showAddNote, setShowAddNote] = useState(false);
  const [showAddFile, setShowAddFile] = useState(false);
  const [selectionType, setSelectionType] = useState("checkbox");
  const [key, setKey] = useState([]);
  const [openModalTask, setOpenModalTask] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [component, setcomponent] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [showEditUnitInfo, setShowEditUnitInfo] = useState(false);
  const [Images, setImages] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  const [form, setForm] = useState({
    file_name: "",
  });

  const [errors, setErrors] = useState({});
  const handleChange = (fieldName, value) => {
    setForm({
      ...form,
      [fieldName]: value,
    });
  };
  const [noteForm, setNoteForm] = useState({
    note_name: "",
    description: "",
  });
  const handleNoteChange = (fieldName, value) => {
    setNoteForm({
      ...noteForm,
      [fieldName]: value,
    });
  };
  // States end

  const search = useSelector((state) => {
    return state.Search.value;
  });
  // Modal Function
  const onOpenModalTask = () => {
    setOpenModalTask(true);
  };
  const onCloseModalTask = () => {
    setOpenModalTask(false);
  };
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
  const handleOpenFile = () => {
    setShowAddFile(true);
  };
  const navigate = useNavigate();

  // Get Property by id
  const { id, property_id } = UseUrlParamsHook();
  const { fetchTenantUnitId, UnitData, amenities } = UseGetHook("unit", id);
  const { FetchLeaseUnit, lease } = UseGetHook("leases", id);
  const { fetchTenantTaskUnit, TaskData } = UseGetHook("tasks", id);
  const { FetchTenantUnitFile, fileData } = UseGetHook("files", id);
  const { FetchTenantUnitNotes, NoteData } = UseGetHook("notes", id);
  useEffect(() => {
    fetchTenantUnitId();
    FetchTenantUnitNotes();
    FetchTenantUnitFile();
    fetchTenantTaskUnit();
    FetchLeaseUnit();
  }, []);
  console.log(TaskData, "due");
  // Data Table Functions
  const handleIconClick = (result) => {
    // Toggle the dropdownOpen state
    const filterData = data.filter((item) => {
      return item.key === result;
    });
    setKey(filterData.key);
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
                  <Link to="/lease-detail">
                    <li className="list-style-none table-setting-dropdown-menu">
                      {" "}
                      <img src={viewIcon} alt="" /> View
                    </li>
                  </Link>
                  <Link to="/renew-lease">
                    <li className="list-style-none table-setting-dropdown-menu">
                      {" "}
                      <img src={renewLeaseIcon} alt="" /> Renew Lease
                    </li>
                  </Link>
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
                </ul>
              </div>
            )}
          </div>
        </>
      ),
    },
  ];
  const data = lease
    .filter((e) =>
      e.property.title.toLowerCase().includes(search.toLowerCase())
    )
    .map((e) => ({
      key: e.id,
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
  // Lease Table
  const leaseColumns = [
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
                  <Link to="/lease-detail">
                    <li className="list-style-none table-setting-dropdown-menu">
                      {" "}
                      <img src={viewIcon} alt="" /> View
                    </li>
                  </Link>
                  <Link to="/renew-lease">
                    <li className="list-style-none table-setting-dropdown-menu">
                      {" "}
                      <img src={renewLeaseIcon} alt="" /> Renew Lease
                    </li>
                  </Link>
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
                </ul>
              </div>
            )}
          </div>
        </>
      ),
    },
  ];
  const leaseData = lease
    .filter((e) =>
      e.property.title.toLowerCase().includes(search.toLowerCase())
    )
    .map((e) => ({
      key: e.id,
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
  // Lease Table
  // Tenant Table
  // Tenant Table
  // Tenant Table End
  // Tasks Table
  const tasksColumns = [
    {
      title: "Title",
      dataIndex: "title",
      render: (text, task) => (
        <Link
          to={`/task-details?id=${task.id}`}
          className="all-task-table-title-text"
        >
          {text}
        </Link>
      ),
    },
    {
      title: "Assigned To",
      dataIndex: "assigned",
      render: (text, assigned) => (
        <>
          {" "}
          {/* <img className="me-2" src={oval} alt="" /> */}
          {assigned.assignedToMe ? (
            <span>
              {text}
              {text ? ", " : ""}
              {assigned.assignedToMe} (YOU)
            </span>
          ) : (
            <span>{text}</span>
          )}
        </>
      ),
    },
    {
      title: "Due At",
      dataIndex: "due",
      render: (text) => (
        <>
          <div className="assign-date-container">
            <div
              className={
                text[1] === "High"
                  ? "priority-text bg-error"
                  : text[1] === "Low"
                  ? "priority-text bg-grey"
                  : text[1] === "Medium"
                  ? "priority-text bg-yellow"
                  : text[1] === "Very High"
                  ? "priority-text bg-error"
                  : ""
              }
            >
              <span>{`${text[1]} Priority`}</span>
            </div>
            <br />
            <span className="assign-to-date">{`${text[0]} Date`}</span>
          </div>
        </>
      ),
    },
    {
      title: "Related To",
      dataIndex: "related",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <>
          <span
            className={
              status === "Completed"
                ? "completed-status text-white"
                : status === "In Progress"
                ? "in-progress-status text-white"
                : status === "Not Started"
                ? "not-started-status text-dark"
                : ""
            }
          >
            {status}
          </span>{" "}
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
                  <Link to={`/task-details?id=${setting.key}`}>
                    <li className="list-style-none table-setting-dropdown-menu">
                      {" "}
                      <img src={editIcon} alt="" /> Edit
                    </li>
                  </Link>
                  <Link>
                    <li className="list-style-none table-setting-dropdown-menu">
                      {" "}
                      <img src={completeIcon} alt="" /> Complete
                    </li>
                  </Link>
                  <li
                    onClick={() => {
                      onOpenDeleteModal();
                      setDeleteId(setting.id);
                      setcomponent("task");
                    }}
                    className="list-style-none table-setting-dropdown-menu"
                  >
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
  const tasksData = TaskData.filter((e) =>
    e.title.toLowerCase().includes(Search.toLowerCase())
  ).map((e, index) => ({
    key: index + 1,
    id: e.id,
    title: e.title,
    img: e.image,
    assigned: e.assignedTo.map((e) => e.firstName).join(", "),
    assignedToMe: localStorage.getItem("name"),
    due: [
      e.dueDate ? new Date(e.dueDate).toLocaleDateString() : "N/A",
      e.priority || "N/A",
    ],
    related: e.property.title,
    status: e.status || "N/A",
  }));
  // Task Table End
  // Notes Table
  // const [name, setName] = useState("");
  // const [description, setdescription] = useState("");
  // const [file, setfile] = useState([]);

  const config = require("Helpers/config.json");
  const addUnitNotes = () => {
    formData.append("name", noteForm.note_name);
    formData.append("description", noteForm.description);
    formData.append("unit", id);
    Images.forEach((file) => {
      formData.append("file", file);
    });
    const newErrors = {};
    for (const key in noteForm) {
      if (noteForm[key] === "") {
        newErrors[key] = `${key} is requird`;
      }
    }
    if (Images.length === 0) {
      newErrors["files"] = "file is required";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      fetch(`${config["baseUrl"]}/api/tenant/note`, {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: formData,
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          if (res.apiCallStatus === "success") {
            message.success("Note Added Successfully");
            setShowAddNote(false);
            FetchTenantUnitNotes();
          }
        })
        .catch((e) => console.log(e));
    }
  };

  const notesColumns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, name) => (
        <>
          <Link to="">
            <span
              onClick={() => setSelectedNote(name)}
              className="property-table-name-text cursor"
            >
              <img
                className="rounded-5 property-table-image mw_40 mh_40 me-2"
                src={`${text[0]}`}
                alt=""
              />{" "}
              {text[1]}
            </span>
          </Link>
        </>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (text) => (
        <>
          <span className="tenant_table_properties_sub_text">{text}</span>
        </>
      ),
    },
    {
      title: "Date uploaded",
      dataIndex: "uploadedDate",
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
              <div className="all-files-table-setting-dropdown bg-white box-shadow">
                <ul className="p-0 d-flex flex-column gap-3">
                  <li
                    onClick={() => setSelectedNote(setting)}
                    className="list-style-none cursor"
                  >
                    {" "}
                    <img src={viewIcon} alt="" /> View
                  </li>
                  <li className="list-style-none">
                    {" "}
                    <img src={editIcon} alt="" /> Edit
                  </li>
                  <li
                    onClick={() => {
                      setDeleteId(setting.id);
                      setcomponent("note");
                      onOpenDeleteModal();
                    }}
                    className="list-style-none"
                  >
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
  const notesData = NoteData.filter((data) =>
    data.name.toLowerCase().includes(Search.toLowerCase())
  ).map((e, index) => ({
    key: index + 1,
    id: e.id,
    name: [e.file, e.name],
    description: e.description,
    uploadedDate: new Date(e.modified_at).toLocaleDateString(),
  }));
  // Notes Table
  // Files Table
  const formData = new FormData();
  const addUnitFiles = () => {
    formData.append("name", form.file_name);
    Images.forEach((file) => {
      formData.append("file", file);
    });
    formData.append("unit", id);
    formData.append("property", property_id);

    const newErrors = {};
    for (const key in form) {
      if (form[key] === "") {
        newErrors[key] = `${key} is required`;
      }
    }
    if (Images.length === 0) {
      newErrors["files"] = "file is required";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      fetch(`${config["baseUrl"]}/api/tenant/file`, {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: formData,
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          if (res.apiCallStatus === "success") {
            message.success("File Added Successfully");
            setShowAddFile(false);
            FetchTenantUnitFile();
          }
        })
        .catch((e) => console.log(e));
    }
  };
  const FileColumns = [
    {
      title: "File Name",
      dataIndex: "fileName",
      render: (text) => (
        <>
          <Link to="">
            <div className="table-file-container d-flex align-items-center gap-3">
              <div className="table-file-img">
                <img
                  className="property-table-image mw_40 mh_40 me-2 rounded-5"
                  src={`${text[0]}`}
                  alt=""
                />
              </div>
              <div className="table-file-text">
                <p className="m-0 all-files-table-name-text">{text[1]}</p>
              </div>
            </div>
          </Link>
        </>
      ),
    },
    {
      title: "Properties",
      dataIndex: "property",
      render: (text) => (
        <>
          <span className="tenant_table_properties_main_text">{text}</span>
          <br />
        </>
      ),
    },
    {
      title: "Owner",
      dataIndex: "owner",
      render: (text, type) => (
        <>
          <Avatar
            style={{
              backgroundColor: "#EF6B3E",
              verticalAlign: "middle",
            }}
            size="large"
          >
            {localStorage.getItem("name")[0]}
          </Avatar>
          <span className="tenant_table_name_text ms-3">
            {localStorage.getItem("name")}
          </span>
        </>
      ),
    },
    {
      title: "Date Uploaded",
      dataIndex: "date",
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
              <div className="all-files-table-setting-dropdown bg-white box-shadow">
                <ul className="p-0 d-flex flex-column gap-3">
                  <Link to="/edit-file">
                    <li className="list-style-none table-setting-dropdown-menu">
                      {" "}
                      <img src={editIcon} alt="" /> Edit
                    </li>
                  </Link>
                  <li
                    onClick={() => {
                      setDeleteId(setting.id);
                      setcomponent("file");
                      onOpenDeleteModal();
                    }}
                    className="list-style-none table-setting-dropdown-menu"
                  >
                    {" "}
                    <img src={deleteIcon} alt="" /> Delete{" "}
                  </li>
                </ul>
              </div>
            )}
          </div>
        </>
      ),
    },
  ];
  const FileData = fileData
    .filter((data) => data.name.toLowerCase().includes(Search.toLowerCase()))
    .map((e, index) => ({
      key: index + 1,
      id: e.id,
      fileName: [e.file, e.name],
      property: "property 1",
      owner: e?.owner,
      date: new Date(e.created_at).toLocaleDateString(),
    }));
  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };
  const fetchFun = () => {
    if (component === "task") {
      fetchTenantTaskUnit();
    } else if (component === "note") {
      FetchTenantUnitNotes();
    } else if (component === "file") {
      FetchTenantUnitFile();
    }
  };
  return (
    <>
      {openModal === true && <UnitDetailsSliderModal onClose={onCloseModal} />}
      {openModalTask === true && (
        <TenantTaskUnitModal
          id={id}
          property={property_id}
          onOpen={onOpenModal}
          onClose={onCloseModalTask}
        />
      )}
      {openDeleteModal === true && (
        <DeleteModal
          deleteBtnText={`Delete ${component}`}
          route="properties-delete-view"
          onClose={onCloseDeleteModal}
          component={component}
          fetchFun={fetchFun}
          delId={deleteId}
        />
      )}
      <div className="container-fluid bg-white p-3">
        <div className="row">
          <div className="col-md-12 text-end">
            <img
              onClick={handleIconClickCustom}
              src={settingIconOrange}
              alt="Action Buttons"
              className="cursor"
            />
            {isDropdownOpen && (
              <div className="task-table-setting-dropdown-prospect bg-white box-shadow text-start">
                <ul className="p-0 d-flex flex-column gap-3">
                  <li className="list-style-none cursor lease-details-dropdown-icons">
                    {" "}
                    <img src={viewIcon} alt="" /> View
                  </li>
                  <li
                    onClick={() => {
                      navigate("/");
                    }}
                    className="list-style-none cursor lease-details-dropdown-icons"
                  >
                    {" "}
                    <img src={editIcon} alt="" /> Edit
                  </li>
                  <li className="list-style-none cursor lease-details-dropdown-icons">
                    {" "}
                    <img src={deleteIcon} alt="" /> Delete
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <ConfigProvider
          theme={{
            components: {
              Tabs: {
                inkBarColor: "#EF6B3E",
                itemColor: "#667085",
                itemSelectedColor: "#EF6B3E",
                itemHoverColor: "#EF6B3E",
                titleFontSize: 15,
                horizontalItemGutter: window.innerWidth <= 768 ? 10 : 60,
                fontFamily: "Montserrat",
              },
            },
          }}
        >
          <Tabs
            defaultActiveKey="1"
            centered
            style={{ fontWeight: 500 }}
            className="properties_units_view_tabs"
          >
            <TabPane tab="Overview" key="1">
              <div className={"row"}>
                <div className="col-md-6">
                  <>
                    <Swiper
                      style={{
                        "--swiper-navigation-color": "#fff",
                        "--swiper-pagination-color": "#fff",
                      }}
                      spaceBetween={10}
                      navigation={false}
                      thumbs={{ swiper: thumbsSwiper }}
                      modules={[FreeMode, Navigation, Thumbs]}
                      className="mySwiper2"
                    >
                      {UnitData[0]?.images.map((e) => {
                        return (
                          <SwiperSlide>
                            <img alt="" src={`${e}`} />
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                    <Swiper
                      onSwiper={setThumbsSwiper}
                      spaceBetween={10}
                      slidesPerView={4}
                      freeMode={true}
                      watchSlidesProgress={true}
                      modules={[FreeMode, Navigation, Thumbs]}
                      className="property-detail-view-slider"
                    >
                      {UnitData[0]?.images.map((e) => {
                        return (
                          <SwiperSlide>
                            <img alt="" src={`${e}`} />
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                  </>
                </div>
                <div className="col-md-6">
                  <div className="property-details-heading mt-3">
                    <p className="property-details-heading-title">
                      {UnitData.length > 0 ? (
                        UnitData[0]?.name
                      ) : (
                        <Skeleton paragraph={{ rows: 0 }} />
                      )}
                    </p>
                  </div>
                  <div className="property-details-view-title-content ">
                    <div className="d-flex gap-2 pb-3">
                      {UnitData.length > 0 ? (
                        <>
                          {/* <img src={locationIcon} /> */}
                          <span className="property-details-view-title-para">{`${UnitData[0]?.property_title}`}</span>
                        </>
                      ) : (
                        <Skeleton paragraph={{ rows: 0 }} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className={showEditUnitInfo === true ? "row" : "d-none"}>
                <div className="col-md-12 mt-5 mb-5 text-center">
                  <img src={NotFound} alt="" />
                  <p>
                    <strong>Start by uploading the image</strong>
                  </p>
                  <p>
                    Any image used in property will live here. <br />
                    Start creating by uploading your images.
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
                    Upload
                  </button>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <p className="unit-details-overview-text mt-4">
                    {UnitData[0]?.property_title}
                  </p>
                  <h2>{UnitData[0]?.name}</h2>
                </div>
              </div>

              <Tabs
                defaultActiveKey="7"
                className="property_details_view_sub_tabs"
              >
                <TabPane tab="Description" key="7">
                  <div
                    className={
                      showEditUnitInfo === true ? "row mt-5 mb-5" : "d-none"
                    }
                  >
                    <div className="col-md-12">
                      <p className="properties_details_view_description_content">
                        Not Set
                      </p>
                    </div>
                  </div>
                  <div
                    className={
                      showEditUnitInfo === false ? "row mt-5 mb-5" : "d-none"
                    }
                  >
                    <div className="col-md-12">
                      <p className="properties_details_view_description_content">
                        {UnitData[0]?.description}
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 flex-bottom">
                      <div className="row text-center">
                        <div className="col">
                          <div className="units-view-counter d-flex justify-content-center align-items-center gap-3">
                            <img
                              alt=""
                              src={homeIconTwo}
                              className="units-view-fa-2x"
                            />
                            <div className="units-view-counter-details">
                              <p className="units-view-count-text ">
                                Market Value
                              </p>
                              <p className="timer units-view-count-title count-number">
                                ${UnitData[0]?.rent_amount}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col">
                          <div className="units-view-counter d-flex justify-content-center align-items-center gap-3">
                            <img
                              alt=""
                              src={bedroomIcon}
                              className="units-view-fa-2x"
                            />
                            <div className="units-view-counter-details">
                              <p className="units-view-count-text ">Bedrooms</p>
                              <h2 className="timer units-view-count-title count-number">
                                {UnitData[0]?.bedroom}
                              </h2>
                            </div>
                          </div>
                        </div>
                        <div className="col">
                          <div className="units-view-counter d-flex justify-content-center align-items-center gap-3">
                            <img
                              alt=""
                              src={bathroomIcon}
                              className="units-view-fa-2x"
                            />
                            <div className="units-view-counter-details">
                              <p className="units-view-count-text ">
                                Bathrooms
                              </p>
                              <h2 className="timer units-view-count-title count-number">
                                {UnitData[0]?.bathroom}
                              </h2>
                            </div>
                          </div>
                        </div>
                        <div className="col">
                          <div className="units-view-counter d-flex justify-content-center align-items-center gap-3">
                            <img
                              alt=""
                              src={sizeIcon}
                              className="units-view-fa-2x"
                            />
                            <div className="units-view-counter-details">
                              <p className="units-view-count-text ">Size</p>
                              <h2 className="timer units-view-count-title count-number">
                                {UnitData[0]?.area} sqft
                              </h2>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="row mt-5 m-2">
                    <button
                      onClick={() => {
                        setShowEditUnitInfo(!showEditUnitInfo);
                        console.log(showEditUnitInfo);
                      }}
                      className="add-property-btn"
                    >
                      Edit Unit Information
                    </button>
                  </div> */}
                </TabPane>
                <TabPane tab="Amenities" key="8">
                  <div className="row">
                    {amenities.length > 0
                      ? amenities.map((amenity, index) => (
                          <div key={index} className="col-md-3">
                            <ul className="list-group">
                              <li
                                key={index}
                                className="list-group-item icons-list-amenities"
                              >
                                <img
                                  src={parkingIcon}
                                  alt=""
                                  className="icons-list-image-unique"
                                />
                                {amenity}
                              </li>
                            </ul>
                          </div>
                        ))
                      : "Not Set"}
                  </div>
                  {/* <div className="row mt-5">
                    <button
                      onClick={() => {
                        setShowEditUnitInfo(!showEditUnitInfo);
                        console.log(showEditUnitInfo);
                      }}
                      className="add-property-btn"
                    >
                      Edit Unit Information
                    </button>
                  </div> */}
                </TabPane>
              </Tabs>
            </TabPane>
            {/* <TabPane tab="Leases" key="2">
              <SearchBar
                leaseFilter={true}
                btnTitle="Add New Lease"
                onClick={() => {
                  navigate("/new-lease");
                }}
              />
              <div className="task-table-container mt-3">
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
                    },
                  }}
                >
                  <Table
                    pagination={false}
                    rowSelection={{
                      type: selectionType,
                      ...rowSelection,
                    }}
                    columns={leaseColumns}
                    dataSource={leaseData}
                    className="scroll-remove scroll-responsive-table"
                  />
                </ConfigProvider>
              </div>
            </TabPane> */}
            {/* <TabPane tab="Tenants" key="3">
              <SearchBar
                tenantFilter={true}
                disabled={tenantData.length > 0 ? true : false}
                btnTitle="Add New Tenant"
                onClick={() => {
                  navigate("/add-tenant-details");
                }}
              />
              <div className="task-table-container mt-3">
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
                    },
                  }}
                >
                  <Table
                    pagination={false}
                    className="table-responsive scroll-remove scroll-responsive-table"
                    rowSelection={{
                      type: selectionType,
                      ...rowSelection,
                    }}
                    columns={tenantColumns}
                    dataSource={tenantData}
                  />
                </ConfigProvider>
              </div>
            </TabPane> */}
            <TabPane tab="Tasks" key="4">
              <SearchBar
                onClick={onOpenModalTask}
                taskFilter={true}
                btnTitle="Add New Task"
              />
              <div className="task-table-container mt-3">
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
                    },
                  }}
                >
                  <Table
                    pagination={false}
                    className="table-responsive scroll-remove scroll-responsive-table"
                    rowSelection={{
                      type: selectionType,
                      ...rowSelection,
                    }}
                    columns={tasksColumns}
                    dataSource={tasksData}
                  />
                </ConfigProvider>
              </div>
            </TabPane>
            <TabPane tab="Files" key="5">
              {showAddFile ? (
                <div className="container bg-white p-3 ">
                  <div className="row">
                    <div className="col-md-12">
                      <span className="property-details-input-title">
                        File Name<span className="sign-up-imp-star">*</span>
                      </span>
                      <input
                        onChange={(e) =>
                          handleChange("file_name", e.target.value)
                        }
                        type="text"
                        className="form-control"
                        placeholder="File Name"
                      />
                      {errors.file_name && (
                        <span className="text-danger fw-semibold mt-3">
                          {errors.file_name.split("_").join(" ")}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-12">
                      <div className="task-search-property-container position-relative">
                        <span className="property-details-input-title">
                          Property<span className="sign-up-imp-star">*</span>
                        </span>
                        <input
                          value={TaskData[0]?.property.title}
                          disabled
                          type="text"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3 text-center">
                    <div className="col-md-12">
                      <p className="text-start">
                        Upload Media<span className="sign-up-imp-star">*</span>
                      </p>
                      <div className="dragger">
                        <FileUploader setImages={setImages} Images={Images} />
                        {errors.files && (
                          <span className="text-danger fw-semibold mt-3">
                            {errors.files}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row mt-5">
                    <div className="col-md-6">
                      <button
                        className="cancel-btn mt-3"
                        onClick={() => setShowAddFile(false)}
                      >
                        Cancel
                      </button>
                    </div>
                    <div className="col-md-6">
                      <button
                        onClick={addUnitFiles}
                        className="save-btn  w-100 mt-3"
                      >
                        Add File
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <SearchBar
                    unitsFilter={true}
                    onClick={handleOpenFile}
                    btnTitle="Add New File"
                  />
                  <div className="row mt-4">
                    <div className="col-md-12">
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
                          },
                        }}
                      >
                        <Table
                          className="table-responsive"
                          rowSelection={{
                            type: selectionType,
                            ...rowSelection,
                          }}
                          columns={FileColumns}
                          dataSource={FileData}
                          pagination={false}
                        />
                      </ConfigProvider>
                    </div>
                  </div>
                </>
              )}

              <div className="not-found-container text-center d-none">
                <img src={NotFound} alt="" />
                <p>
                  <strong>No Files found</strong>
                </p>
                <p>
                  No files were found; the folder is empty. <br />
                  Please try again.
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
                  Add Files
                </button>
              </div>
              <div className="container bg-white p-3 d-none">
                <div className="row">
                  <div className="col-md-12">
                    <span>
                      File Name<span className="sign-up-imp-star">*</span>
                    </span>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="row mt-3 text-center">
                  <div className="col-md-12">
                    <FileUploader fileHeight="height" fileWidth="width" />
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-md-12">
                    <div className="notes-btn d-flex align-items-center justify-content-center gap-3">
                      <button className="cancel-btn">Cancel</button>
                      <button className="save-btn">Save</button>
                    </div>
                  </div>
                </div>
              </div>
            </TabPane>
            <TabPane tab="Notes" key="6">
              {showNoteDetails === true ? (
                <>
                  <NoteDetails />
                </>
              ) : showAddNote === true ? (
                <>
                  <div className="container bg-white p-3">
                    <div className="row">
                      <div className="col-md-12">
                        <span className="property-details-input-title">
                          Note Name<span className="sign-up-imp-star">*</span>
                        </span>
                        <input
                          onChange={(e) =>
                            handleNoteChange("note_name", e.target.value)
                          }
                          type="text"
                          className="form-control"
                          placeholder="Note Name"
                        />
                        {errors.note_name && (
                          <span className="text-danger fw-semibold mt-3">
                            {errors.note_name.split("_").join(" ")}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-md-12">
                        <span className="property-details-input-title">
                          Write Your Note
                        </span>
                        <textarea
                          onChange={(e) =>
                            handleNoteChange("description", e.target.value)
                          }
                          name=""
                          id=""
                          cols="30"
                          rows="10"
                          className="form-control"
                          placeholder="Add your note"
                        ></textarea>
                        {errors.description && (
                          <span className="text-danger fw-semibold mt-3">
                            {errors.description.split("_").join(" ")}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="row mt-4 text-center">
                      <div className="col-md-12">
                        <div className="dragger">
                          <FileUploader setImages={setImages} Images={Images} />
                          {errors.files && (
                            <span className="text-danger fw-semibold mt-3">
                              {errors.files}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-md-12">
                        <div className="notes-btn d-flex align-items-center justify-content-center gap-3">
                          <button
                            onClick={() => {
                              setShowAddNote(false);
                            }}
                            className="cancel-btn mt-3"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => {
                              addUnitNotes();
                            }}
                            className="save-btn mt-3"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : selectedNote ? (
                <>
                  <div className="notes-info-title">
                    <span
                      onClick={() => setSelectedNote(null)}
                      style={{ cursor: "pointer" }}
                    >
                      <svg
                        width={25}
                        height={25}
                        fill="none"
                        stroke="#000000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="m15 18-6-6 6-6" />
                      </svg>
                    </span>
                    Notes Info
                  </div>
                  <div className="task-info-lists mt-5">
                    <div className="row">
                      <div className="col-md-2">
                        <p>
                          <span className="task-info-list-span me-3">
                            Notes Title:
                          </span>
                        </p>
                      </div>
                      <div className="col-md-8">
                        <p>{selectedNote.name[1]}</p>
                      </div>
                      <div className="col-md-2"></div>
                    </div>
                    <div className="row">
                      <div className="col-md-2">
                        <p>
                          <span className="task-info-list-span me-3">
                            Description:
                          </span>
                        </p>
                      </div>
                      <div className="col-md-8">
                        <p>{selectedNote.description}</p>
                      </div>
                      <div className="col-md-2"></div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <SearchBar
                    btnTitle="Add New Notes"
                    onClick={() => setShowAddNote(true)}
                    notesFilter={true}
                  />
                  <div className="row mt-4">
                    <div className="col-md-12">
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
                          },
                        }}
                      >
                        <Table
                          pagination={false}
                          className="scroll-responsive-tablet"
                          rowSelection={{
                            type: selectionType,
                            ...rowSelection,
                          }}
                          columns={notesColumns}
                          dataSource={notesData}
                        />
                      </ConfigProvider>
                    </div>
                  </div>
                  <div className="not-found-container text-center d-none">
                    <SearchBar btnTitle="Add New Note" />
                    <img src={NotFound} alt="" />
                    <p>
                      <strong>No Notes found</strong>
                    </p>
                    <p>
                      No files were found; the folder is empty. <br /> Please
                      try again.
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
                      Add Notes
                    </button>
                  </div>
                </>
              )}
            </TabPane>
          </Tabs>
        </ConfigProvider>
      </div>
    </>
  );
};

export default TenantPropertyUnitsView;
