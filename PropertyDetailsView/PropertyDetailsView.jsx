import { useEffect, useState } from "react";
import locationIcon from "assets/location.png";
import publishIcon from "assets/publish.png";
import bedroomIcon from "assets/list-icon-1.png";
import bathroomIcon from "assets/list-icon-2.png";
import sizeIcon from "assets/list-icon-3.png";
import homeIcon from "assets/icon_house.png";
import buildingIcon from "assets/icon_building.png";
import tickIcon from "assets/icon_tick_circle.png";
import settingBtn from "assets/more-vertical.png";
import viewIcon from "assets/Icon.png";
import editIcon from "assets/edit-05.png";
import deleteIcon from "assets/trash-01.png";
import trashIconWhite from "assets/trash-icon-white.png";
import loginIcon from "assets/file-03.png";
import activeDot from "assets/_Dot.png";
import inActiveDot from "assets/_inActive-Dot.png";
import bedIcon from "assets/bed-icon.png";
import bathIcon from "assets/bath icon.png";
import sqftIcon from "assets/sqft-icon.png";
import parkingIcon from "assets/P.png";
import depositsHeldIcon from "assets/lease-balance.png";
import depositHeldSecondIcon from "assets/Deposit Held icon second.png";
import settingBtnIcon from "assets/more-vertical.png";
import monthlyRentIcon from "assets/lease-rent.png";
import tenantUserImage from "assets/Ellipse 7.png";
import completeIcon from "assets/calendar-check-01.png";
import searchIcon from "assets/search.png";
import checkMark from "assets/check-mark.png";
import NotFound from "assets/not-found-img.png";
import settingIcon from "assets/three-dots.png";
import propertyImage from "assets/office-skyscrapers-business-district 2.png";
import assignedTasksIcon from "assets/assigned-tasks.png";
import tasksCompletedIcon from "assets/tasks-completed.png";
import pendingTasksIcon from "assets/pending-tasks.png";
import settingIconOrange from "assets/dots-vertical.png";
import propertyDummyImage from "assets/property-dummy-image.png";
import oval from "assets/Oval.png";
import { usePDF } from "react-to-pdf";
import { CSVLink } from "react-csv";
import {
  Tabs,
  Table,
  Select,
  Switch,
  ConfigProvider,
  Skeleton,
  Avatar,
  message,
} from "antd";
import dot from "assets/_Dot.png";
import dueDot from "assets/_red-Dot.png";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import SearchBar from "Helpers/SearchBar";
import { useNavigate, Link, Outlet } from "react-router-dom";
import UnitDeleteModal from "Modals/UnitDeleteModal/UnitDeleteModal";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import UseGetHook from "Hooks/UseGetHook";
import PropertyDetailsViewAddNewTaskModal from "Modals/PropertyDetailsViewAddNewTaskModal/PropertyDetailsViewAddNewTaskModal";
import DeleteModal from "Modals/DeleteModal/DeleteModal";
import UseUrlParamsHook from "Hooks/UseUrlParamsHook";
import { GetPropertyId } from "Store/Slices/PropertyData";
import postUpdateIcon from "assets/edit-3.png";
import CompleteTask from "Helpers/CompleteTask";

import ConditionalFilter from "Hooks/ConditionalFilter";
import EditTaskModal from "../EditTaskModal/EditTaskModal";
import FileUploader from "Components/FileUploader/FileUploader";
import AddPropertyEditModal from "Modals/AddPropertyEditModal/AddPropertyEditModal";
import UseFormDataHook from "Hooks/UseFormDataHook";
import AddPropertyConnectAccount from "Modals/AddPropertyConnectAccount/AddPropertyConnectAccount";
import UserPermission from "libs/UserPermission";
import SearchBarWithOutBtn from "Helpers/SearchBarWithOutBtn";

const PropertyDetailsView = () => {
  // States start
  const [showTenantDetails, setShowTenantDetails] = useState(false);
  const [showAddNote, setShowAddNote] = useState(false);
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [showaccountDetails, setShowAccountDetails] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedTableItem, setSelectedTableItem] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [component, setcomponent] = useState("");
  const [exportDropdown, setExportDropdown] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [selectionType, setSelectionType] = useState("checkbox");
  const [taskId, setTaskId] = useState("");
  const [key, setKey] = useState([]);
  const [deleteId, setDeleteId] = useState("");
  const [openModalTask, setOpenModalTask] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openEditModalTask, setOpenEditModalTask] = useState(false);
  const [Images, setImages] = useState([]);
  const [EditProperty, setEditProperty] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [update, setUpdate] = useState(false);
  const [DeletedImages, setDeletedImages] = useState([]);
  const [openAccountModal, setOpenAccountModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState([]);
  const { id } = UseUrlParamsHook();
  const [openModalPostUpdate, setOpenModalPostUpdate] = useState(false);
  const { ROLE } = UserPermission()
  const onOpenEditModalTask = () => {
    setOpenEditModalTask(true);
  };
  const onCloseEditModalTask = () => {
    setOpenEditModalTask(false);
  };
  const onOpenEditModalProperty = () => {
    setEditProperty(true);
  };
  const onCloseEditModalProperty = () => {
    setEditProperty(false);
  };
  const onOpenModalPostUpdate = () => {
    setOpenModalPostUpdate(true);
  };
  const onCloseModalPostUpdate = () => {
    setOpenModalPostUpdate(false);
  };
  const [errors, setErrors] = useState({});

  // States end
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
  const search = useSelector((state) => {
    return state.Search.value;
  });
  const { fetchAccountByProperty, accounts } = UseGetHook(
    "getAccountByProperty",
    id
  );
  useEffect(() => {
    fetchAccountByProperty();
  }, []);
  // Search Start
  const Search = useSelector((state) => {
    return state.Search.value;
  });
  // Search End
  // Fetch Data
  const range = useSelector((state) => {
    return state.FilterValue.value;
  });
  const fromDate = useSelector((state) => {
    return state.FilterValue.fromDate;
  });
  const toDate = useSelector((state) => {
    return state.FilterValue.toDate;
  });
  const { filters, FilterObjects } = ConditionalFilter({
    range,
    fromDate,
    toDate,
  });
  const handleTaskComplete = (id) => {
    const { completeStatus } = CompleteTask(id);
    completeStatus();
  };

  const dispatch = useDispatch();
  const { amenities, fetchProperty, PropertyData } = UseGetHook("property", id);
  const propertydata = PropertyData.filter((e) => e.id === id);
  const { fetchUnit, UnitData } = UseGetHook("unit", id);

  const { fetchTaskId, TaskData, loader } = UseGetHook(
    filters(FilterObjects) ? `&${filters(FilterObjects)}` : "",
    id
  );
  const { FetchFileId, fileData } = UseGetHook("files", id);
  const url = selectedReport === "invoice-reports" ? "invoice" : selectedReport === "tenant-reports" ? "tenant" : selectedReport === "task-reports" ? "task" : ""
  const { FetchPropertyReport, reportData } = UseGetHook(url, id);
  const { FetchNotes, NoteData } = UseGetHook("notes", id);
  // const { report, fetchInvoiceReport } = UseGetHook("invoice")

  const { FetchPropertyTenant, TenantData } = UseGetHook(
    filters(FilterObjects) ? `&${filters(FilterObjects)}` : "",
    id
  );
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });

  dispatch(GetPropertyId(id));
  useEffect(() => {
    fetchProperty();
    fetchUnit();
    FetchNotes();
    fetchTaskId();
    FetchFileId();
    FetchPropertyTenant();
  }, [range, fromDate, toDate]);
  useEffect(() => {
    if (update) {
      fetchProperty();
      fetchUnit();
      FetchNotes();
      fetchTaskId();
      FetchFileId();
      FetchPropertyTenant();
      setUpdate(false);
    }
  }, [update]);
  useEffect(() => {
    FetchPropertyReport()
  }, [url])
  // }, [fileData])
  // Fetch Data End
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };

  const routeHandleChange = (route) => {
    navigate(`/${route}`);
  };
  const onOpenAccountModal = () => {
    setOpenAccountModal(true);
  };
  const onCloseModalWorkOrder = () => {
    setOpenAccountModal(false);
  };
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

  const handleIconClickCustom = () => {
    // Toggle the dropdown state when the icon is clicked
    setDropdownOpen(!isDropdownOpen);
  };
  const navigate = useNavigate();
  // const navigateBtn = () => {
  //   navigate("/add-account");
  // };
  const { TabPane } = Tabs;
  const handleReportChange = (selectedOption) => {
    setSelectedReport(selectedOption);


  };
  // States
  // useEffect(() => {
  //   console.log("Component re-rendered");
  // }, [selectedReport]);
  // Data Table Functions
  // ==================================================================================?

  const invoiceReportData = reportData?.map(e => ({
    key: "1",
    invoice_no: e.data?.invoice_no,
    name: e.data?.tenant?.firstName,
    start_date: new Date(e.data?.start_date).toLocaleDateString(),
    end_date: new Date(e.data?.end_date).toLocaleDateString(),
    related_to: e.data?.property_id?.title,
    invoice_date: e.data?.invoice_date || "Not set",
    status: e.data?.status,
  }))
  const invoiceColumn = [
    {
      title: "Invoice No",
      dataIndex: "invoice_no",
      render: (text) => (
        <>
          <Link to="">
            <span className="property-table-name-text">{text}</span>
          </Link>
        </>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => (
        <>
          <Link to="">
            <span className="property-table-name-text">{text}</span>
          </Link>
        </>
      ),
    },
    {
      title: "Start date",
      dataIndex: "start_date",
      render: (text) => <span>{text}</span>,
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
      dataIndex: "related_to",
      render: (text) => (
        <>
          <span>{text}</span>
        </>
      ),
    },
    {
      title: "Invoice Date",
      dataIndex: "invoice_date",
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
              status.key === "2"
                ? "tenant-report-due-bar"
                : "tenant-report-active-bar"
            }
          >
            <img
              src={status.key === "2" ? dueDot : dot}
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
          <div className="task-table-setting-container position-relative cursor">
            <img
              src={settingIcon}
              alt=""
              onClick={() => handleIconClick(setting.key)}
            />
            {setting.key === key && (
              <div className="task-table-setting-dropdown-prospect bg-white box-shadow">
                <ul className="p-0 d-flex flex-column gap-3">
                  <Link>
                    <li className="list-style-none table-setting-dropdown-menu">
                      {" "}
                      <img src={viewIcon} alt="" /> View
                    </li>
                  </Link>
                  <Link>
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
                  <Link>
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
  const tenantReportData = reportData?.map(e => ({
    key: "1",
    name: `${e.data?.firstName} ${e.data?.lastName}`,
    property: e.data?.address,
    email: e.data?.email,
    status: "",
  }))

  const tenantColumn = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Properties",
      dataIndex: "property",
      render: (text) => (
        <>
          {" "}
          <span>{text}</span>
        </>
      ),
    },
    {
      title: "Email Address",
      dataIndex: "email",
      render: (text, type) => (
        <>
          <span>{text} </span>
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
              status.key === "2"
                ? "tenant-report-in-active-bar"
                : "tenant-report-active-bar"
            }
          >
            <img
              src={status.key === "2" ? inActiveDot : dot}
              alt=""
              className="me-1"
            />
            Active
          </span>
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
                  <Link>
                    <li className="list-style-none table-setting-dropdown-menu">
                      {" "}
                      <img src={viewIcon} alt="" /> View
                    </li>
                  </Link>
                  <Link>
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
                  <Link>
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
  const taskReportData = reportData?.filter((e) =>
    e.data.property.title?.toLowerCase().includes(search.toLowerCase())
  ).map((e) => ({
    key: e.id,
    title: e?.data?.title,
    img: e.data?.image,
    assigned: e.data?.assignedTo.map((e) => e.data?.firstName).join(", "),
    assignedToMe: localStorage?.getItem("name"),
    due:
      !e.data?.due && !e.data?.priority
        ? "Not Set"
        : [new Date(e.data?.dueDate)?.toLocaleDateString(), e.data?.priority],
    related: e.data?.property?.title,
    status: e.data?.status || "N/A",
  }));
  const taskColumn = [
    {
      title: "Title",
      dataIndex: "title",
      render: (text, task) => (
        <Link
          to={`/task-details?id=${task.key}`}
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
          <img className="me-2" src={oval} alt="" />
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
            <span className="assign-to-date">{text[0]}</span>
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
                      <img src={viewIcon} alt="" /> View
                    </li>
                  </Link>
                  <li
                    onClick={() => {
                      onOpenEditModalTask();
                      setTaskId(setting.key);
                    }}
                    className="list-style-none table-setting-dropdown-menu"
                  >
                    {" "}
                    <img src={editIcon} alt="" /> Edit
                  </li>
                  <li
                    onClick={() => handleTaskComplete(setting.key)}
                    className="list-style-none table-setting-dropdown-menu"
                  >
                    {" "}
                    <img src={completeIcon} alt="" /> Complete
                  </li>
                  <Link>
                    <li
                      onClick={() => {
                        onOpenModalPostUpdate();
                        setTaskId(setting.key);
                      }}
                      className="list-style-none table-setting-dropdown-menu"
                    >
                      {" "}
                      <img src={postUpdateIcon} alt="" /> Post an Update
                    </li>
                  </Link>
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
                </ul>
              </div>
            )}
          </div>
        </>
      ),
    },
  ];
  // =======================================================================================
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
  // Unit Table
  const columns = [
    {
      title: "Unit Name",
      dataIndex: "unitName",
      render: (text, unitName) => (
        <>
          <Link to={`/properties-units-view?id=${unitName.id}&property=${id}`}>
            {unitName.img ? (
              <img
                className="unit_table_name_img"
                src={`${unitName.img}`}
                alt=""
              />
            ) : (
              <>
                <Avatar
                  style={{
                    backgroundColor: "#EF6B3E",
                    verticalAlign: "middle",
                  }}
                  size="large"
                >
                  {text[0]}
                </Avatar>
              </>
            )}{" "}
            <span className="unit_table_name_text">{text}</span>
          </Link>
        </>
      ),
    },
    {
      title: "Unit Details",
      dataIndex: "unitDetails",
      //render: (text) => <><span>{text}</span></>,
      render: (text, details) => (
        <>
          <ul className="p-0 d-flex gap-3">
            <li className="list-style-none">
              <img src={bedIcon} alt="" />
              <span className="unit_table_details_text ms-2">
                {details.bed} Beds
              </span>
            </li>
            <li className="list-style-none">
              <img src={bathIcon} alt="" />
              <span className="unit_table_details_text ms-2">
                {details.bath} Bath
              </span>
            </li>
            <li className="list-style-none">
              <img src={sqftIcon} alt="" />
              <span className="unit_table_details_text ms-2">
                {details.sqft} sqft
              </span>
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "Rent Amount",
      dataIndex: "rentAmount",
      render: (text) => (
        <>
          <span className="unit_table_amount_text">{text}</span>
        </>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, status) => (
        <>
          <div className={"prospect-active-bar"}>
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
                  {
                    localStorage.getItem("role") !== "landlord" && localStorage.getItem("role") === "user" && ROLE[0]?.units?.view ?
                      <Link
                        to={`/properties-units-view?id=${setting.id}&property=${id}`}
                        className="list-style-none table-setting-dropdown-menu"
                      >
                        {" "}
                        <img src={viewIcon} alt="" /> View
                      </Link>
                      :
                      localStorage.getItem("role") === "landlord" ?
                        <Link
                          to={`/properties-units-view?id=${setting.id}&property=${id}`}
                          className="list-style-none table-setting-dropdown-menu"
                        >
                          {" "}
                          <img src={viewIcon} alt="" /> View
                        </Link>
                        :

                        ""
                  }
                  {
                    localStorage.getItem("role") !== "landlord" && localStorage.getItem("role") === "user" && ROLE[0]?.units?.update ?
                      <li
                        onClick={() => {
                          navigate(
                            `/properties-units-edit?id=${setting.id}&propertyId=${id}`
                          );
                        }}
                        className="list-style-none table-setting-dropdown-menu"
                      >
                        {" "}
                        <img src={editIcon} alt="" /> Edit
                      </li>
                      :
                      localStorage.getItem("role") === "landlord" ?
                        <li
                          onClick={() => {
                            navigate(
                              `/properties-units-edit?id=${setting.id}&propertyId=${id}`
                            );
                          }}
                          className="list-style-none table-setting-dropdown-menu"
                        >
                          {" "}
                          <img src={editIcon} alt="" /> Edit
                        </li>
                        :

                        ""
                  }
                  {
                    localStorage.getItem("role") !== "landlord" && localStorage.getItem("role") === "user" && ROLE[0]?.units?.delete ?
                      <li
                        onClick={() => {
                          onOpenDeleteModal();
                          setDeleteId(setting.id);
                          setcomponent("unit");
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
                            onOpenDeleteModal();
                            setDeleteId(setting.id);
                            setcomponent("unit");
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
  const data = UnitData.filter((data) =>
    data.name.toLowerCase().includes(Search.toLowerCase())
  ).map((e, index) => ({
    key: index + 1,
    id: e.id,
    unitName: e.name,
    img: e.images[0],
    bed: e.bedroom,
    bath: e.bathroom,
    sqft: e.area,
    unitDetails: "+1 (555) 098-7654",
    rentAmount: `$${e.rent_amount}`,
    status: "Month-to-Month",
    futureStatus: "Not Rented",
  }));
  // Unit Table End
  // Tenant Table
  const tenantColumns = [
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
      render: (text) => (
        <>
          <span className="tenants_table_properties_text">
            {/* 354 Gladwell Street */}
            {propertydata[0]?.address?.address_line_1}
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
            <img src={status.key === "2" ? inActiveDot : activeDot} alt="" />{" "}
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

                  <li className="list-style-none table-setting-dropdown-menu">
                    {" "}
                    <img src={editIcon} alt="" /> Edit
                  </li>


                  <li className="list-style-none table-setting-dropdown-menu">
                    {" "}
                    <img src={loginIcon} alt="" /> Login
                  </li>


                  <li className="list-style-none table-setting-dropdown-menu">
                    {" "}
                    <img src={deleteIcon} alt="" /> Remove
                  </li>

                </ul>
              </div>
            )}
          </div>
        </>
      ),
    },
  ];
  const tenantData = TenantData.filter((e) =>
    e.firstName.toLowerCase().includes(Search.toLowerCase())
  ).map((e) => ({
    key: e.id,
    name: `${e.firstName ? e.firstName + " " : ""}${e.lastName ? e.lastName : ""
      }`.trim(),
    img: e.profileImage,
    properties: `${propertydata[0]?.address.city} ${propertydata[0]?.address.state}, ${propertydata[0]?.address.zipcode}`,
    email: e.email,
    phone: e.phone,
    status: "active",
  }));
  // Tenant Table End
  // Accounts Table
  const accountColumns = [
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
      title: "Routing No",
      dataIndex: "routing_number",
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
            <button className="connect-bank-btn">{text}</button>
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

                  {/* <li
                    onClick={onOpenAccountModal}
                    className="list-style-none table-setting-dropdown-menu"
                  >
                    {" "}
                    <img src={editIcon} alt="" /> Edit
                  </li> */}

                  <li
                    onClick={() => {
                      onOpenDeleteModal();
                      setDeleteId(setting.account_id);
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
  const accountData = accounts
    ?.filter((e) => e.bank_name.toLowerCase().includes(search.toLowerCase()))
    .map((e) => ({
      key: e.id,
      account_id: e.account_id,
      account: e.bank_name,
      property: propertydata[0]?.title,
      status: e.status,
      stripeConnected: e.account,
      routing_number: e.routing_number,
      button: e.account ? "Connected" : "Connect to Bank",
    }));
  // Accounts Table End
  const tasksColumns = [
    {
      title: "Title",
      dataIndex: "title",
      render: (text, name) => (
        <Link
          to={`/task-details?id=${name.id}`}
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
            <span className="assign-to-date">{text[0]}</span>
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
              onClick={() => handleIconClick(setting.id)}
            />
            {setting.key === key && (
              <div className="task-table-setting-dropdown-prospect bg-white box-shadow">
                <ul className="p-0 d-flex flex-column gap-3">
                  <Link to={`/task-details?id=${setting.key}`}>
                    <li className="list-style-none table-setting-dropdown-menu">
                      {" "}
                      <img src={viewIcon} alt="" /> View
                    </li>
                  </Link>
                  <li
                    onClick={() => {
                      onOpenEditModalTask();
                      setTaskId(setting.id);
                    }}
                    className="list-style-none table-setting-dropdown-menu"
                  >
                    {" "}
                    <img src={editIcon} alt="" /> Edit
                  </li>
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
    title: e?.title,
    img: e?.image,
    assigned: e?.assignedTo?.map((e) => e.firstName).join(", "),
    assignedToMe: localStorage.getItem("name"),
    due: [new Date(e.dueDate).toLocaleDateString(), e.priority],
    related: e?.property?.title,
    status: e?.status,
  }));
  // Task Table End
  // Reports Table
  const reportsData = reportData.map((e, index) => ({
    key: index + 1,
    id: e.id,
    title: e?.title,
    img: e?.image,
    assigned: e?.assignedTo?.map((e) => e.firstName).join(", "),
    assignedToMe: localStorage.getItem("name"),
    due: [new Date(e.dueDate).toLocaleDateString(), e.priority],
    related: e?.property?.title,
    status: e?.status,
  }));
  const reportsColumns = [
    {
      title: "Property Name",
      dataIndex: "propertyName",
      render: (text) => (
        <span>
          <img src={propertyImage} alt="" className="mh_40 mw_40" />
          {text}
        </span>
      ),
    },
    {
      title: "Phone No",
      dataIndex: "phone",
      render: (text) => (
        <>
          {" "}
          <span className="phone">{text}</span>
        </>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (text, type) => (
        <>
          {type.key === "1" && (
            <span className="type-text-single-family rounded-4">
              Single family
            </span>
          )}
          {type.key === "2" && (
            <span className="type-text-multi-commercial rounded-4">
              Multi Commercial
            </span>
          )}
          {type.key === "3" && (
            <span className="type-text-multi-family rounded-4">
              Multi Commercial
            </span>
          )}
          {type.key === "4" && (
            <span className="type-text-single-family rounded-4">
              Single family
            </span>
          )}
        </>
      ),
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Rent Amount",
      dataIndex: "rent",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Tenant",
      dataIndex: "tenant",
      render: (text) => (
        <>
          <span>{text}</span>
          <br />
          <img src={checkMark} alt="" />{" "}
          <span className="current-tenant-text">Current Tenant</span>
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
              src={settingBtn}
              alt=""
              onClick={() => handleIconClick(setting.key)}
            />
            {setting.key === key && (
              <div className="task-table-setting-dropdown-prospect bg-white box-shadow">
                <ul className="p-0 d-flex flex-column gap-3">
                  <li
                    onClick={() => {
                      navigate("");
                    }}
                    className="list-style-none table-setting-dropdown-menu"
                  >
                    {" "}
                    <img src={viewIcon} alt="" /> View
                  </li>
                  <li className="list-style-none table-setting-dropdown-menu">
                    {" "}
                    <img src={editIcon} alt="" /> Edit
                  </li>
                  <li className="list-style-none table-setting-dropdown-menu">
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
  // Reports Table End
  // Files Table
  const filesColumns = [
    {
      title: "File Name",
      dataIndex: "fileName",
      render: (text) => (
        <>
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
        </>
      ),
    },
    {
      title: "Properties",
      dataIndex: "property",
      render: (text, property_details) => (
        <>
          <span className="tenant_table_properties_main_text">{text}</span>
          <br />
          <span className="tenant_table_properties_sub_text">
            {/* PITTSBURGH, Pennsylvania(PA), 15283 */}
            {property_details.city} {property_details.state}
            {", "}
            {property_details.zipcode}
          </span>
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
  const filesData = fileData
    .filter((data) => data.name.toLowerCase().includes(Search.toLowerCase()))
    .map((e, index) => ({
      key: index + 1,
      id: e.id,
      fileName: [e.file, e.name],
      city: `${propertydata[0]?.address.city}`,
      state: `${propertydata[0]?.address.state}`,
      zipcode: `${propertydata[0]?.address.zipcode}`,
      property: `${propertydata[0]?.address.address_line_1}`,
      owner: e?.owner,
      date: new Date(e.created_at).toLocaleDateString(),
    }));
  // Files Table End
  // Notes Table

  const formData = new FormData();
  formData.append("name", noteForm.note_name);
  formData.append("description", noteForm.description);
  Images.forEach((file) => {
    formData.append("file", file);
  });
  formData.append("property", id);
  const config = require("../../Helpers/config.json");
  const addNotes = () => {
    const newErrors = {};
    for (const key in noteForm) {
      if (noteForm[key] === "") {
        newErrors[key] = `${key} is required`;
      }
    }

    setErrors(newErrors);
    if (Images.length === 0) {
      newErrors["files"] = `file is required`;
    }
    if (Object.keys(newErrors).length === 0 && Images.length !== 0) {
      fetch(`${config["baseUrl"]}/api/note`, {
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
            FetchNotes();
          }
        })
        .catch((e) => console.log(e));
    }
  };
  const notesColumns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => (
        <>
          <span className="property-table-name-text">
            <img className="mw_40 mh_40 rounded-5" src={`${text[0]}`} alt="" />{" "}
            {text[1]}
          </span>
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
                    className="list-style-none table-setting-dropdown-menu"
                  >
                    {" "}
                    <img src={viewIcon} alt="" /> View
                  </li>
                  <li className="list-style-none table-setting-dropdown-menu">
                    {" "}
                    <img src={editIcon} alt="" /> Edit
                  </li>
                  <li
                    onClick={() => {
                      setDeleteId(setting.id);
                      setcomponent("note");
                      onOpenDeleteModal();
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
  const notesData = NoteData.filter((data) =>
    data.name.toLowerCase().includes(Search.toLowerCase())
  ).map((e, index) => ({
    key: index + 1,
    id: e.id,
    name: [e.file, e.name],
    description: e.description,
    uploadedDate: new Date(e.modified_at).toLocaleDateString(),
  }));
  // Notes Table End
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
  const fetchDeleteFun = () => {
    if (component === "file") {
      FetchFileId();
    } else if (component === "unit") {
      fetchUnit();
    } else if (component === "task") {
      fetchTaskId();
    } else if (component === "note") {
      FetchNotes();
    }
  };
  // Array of Map markers
  const markers = [
    {
      geocode: [48.86, 2.3522],
      popUp: "Hello, I am pop up 1",
    },
  ];

  const customIcon = new Icon({
    iconUrl: require("assets/map-icon.png"),
    iconSize: [38, 38],
  });
  let month = {
    0: "Jan",
    1: "Feb",
    2: "Mar",
    3: "Apr",
    4: "May",
    5: "Jun",
    6: "Jul",
    7: "Aug",
    8: "Sep",
    9: "Oct",
    10: "Nov",
    11: "Dec",
  };
  return (
    <>
      {openAccountModal === true ? (
        <AddPropertyConnectAccount
          onOpen={onOpenModal}
          onClose={onCloseModalWorkOrder}
          id={id}
          title={propertydata[0]?.title}
        />
      ) : (
        ""
      )}
      {EditProperty && (
        <AddPropertyEditModal
          id={id}
          setUpdate={setUpdate}
          onClose={onCloseEditModalProperty}
        />
      )}
      {openModalTask === true ? (
        <PropertyDetailsViewAddNewTaskModal
          id={id}
          onOpen={onOpenModal}
          onClose={onCloseModalTask}
        />
      ) : (
        ""
      )}
      {openEditModalTask && (
        <EditTaskModal id={taskId} onClose={onCloseEditModalTask} />
      )}
      {openModal === true ? (
        <UnitDeleteModal delId={deleteId} onClose={onCloseModal} />
      ) : (
        ""
      )}
      {openDeleteModal === true ? (
        <DeleteModal
          onClose={onCloseDeleteModal}
          component={component}
          fetchFun={fetchDeleteFun}
          route={`property-details-view?id=${id}`}
          deleteBtnText={`Delete ${component}`}
          delId={deleteId}
        />
      ) : (
        ""
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
                  <li
                    onClick={() => {
                      onOpenEditModalProperty();
                    }}
                    className="list-style-none cursor lease-details-dropdown-icons"
                  >
                    {" "}
                    <img src={editIcon} alt="" /> Edit
                  </li>
                  <li
                    onClick={() => {
                      onOpenDeleteModal();

                      setDeleteId(id);
                      setcomponent("property");
                    }}
                    className="list-style-none cursor lease-details-dropdown-icons"
                  >
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
            centered={window.innerWidth <= 450 ? false : true}
            defaultActiveKey="1"
            style={{ fontWeight: 500 }}
            className="property_details_view_tabs"
          >
            <TabPane tab="Overview" key="1">
              <div className="row d-flex justify-left-center mt-4">
                <div className="col-md-6">
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
                    {(PropertyData[0]?.images?.length || 0) > 0 ? (
                      PropertyData[0]?.images.map((e, index) => (
                        <SwiperSlide key={index}>
                          <img alt="" src={`${e}`} />
                        </SwiperSlide>
                      ))
                    ) : (
                      <>
                        <SwiperSlide>
                          <img alt="" src={propertyDummyImage} />
                        </SwiperSlide>
                      </>
                    )}
                    {/* {PropertyData[0]?.images.map((e) => {
                      return (
                        <SwiperSlide>
                          <img alt="" src={`${e}`} />
                        </SwiperSlide>
                      );
                    })} */}
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
                    {PropertyData[0]?.images.map((e) => {
                      return (
                        <SwiperSlide>
                          <img alt="" src={`${e}`} />
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </div>
                <div className="col-md-6">
                  <div className="property-details-heading mt-3">
                    <p className="property-details-heading-title">
                      {PropertyData.length > 0 ? (
                        propertydata[0]?.title
                      ) : (
                        <Skeleton paragraph={{ rows: 0 }} />
                      )}
                    </p>
                  </div>
                  <div className="property-details-view-title-content mt-5">
                    <div className="d-flex gap-2 pb-3">
                      {PropertyData.length > 0 ? (
                        <>
                          <img src={locationIcon} />
                          <span className="property-details-view-title-para">{`${propertydata[0]?.address.address_line_1} , ${propertydata[0]?.address.city}`}</span>
                        </>
                      ) : (
                        <Skeleton paragraph={{ rows: 0 }} />
                      )}
                    </div>
                    <div className="d-flex gap-2">
                      <img src={publishIcon} />
                      <span className="property-details-view-title-para">
                        <span>
                          {
                            month[
                            new Date(propertydata[0]?.created_at).getMonth()
                            ]
                          }{" "}
                          {new Date(propertydata[0]?.created_at).getDate()},{" "}
                          {new Date(propertydata[0]?.created_at).getFullYear()}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <Tabs
                defaultActiveKey="2"
                className="property_details_view_sub_tabs mt-2"
              >
                <TabPane tab="Description" key="2">
                  <div className="row">
                    <div className="col-md-12">
                      <p className="properties_details_view_description_content">
                        {PropertyData.map((e) => e.description)}
                      </p>
                    </div>
                  </div>
                  <div className="row mt-5">
                    <div className={window.innerWidth <= 980 ? "" : "col-md-8"}>
                      <div className="d-flex icons-list-main">
                        <ul className="list-group landlord-property-details-overview">
                          <li className="list-group-item icons-list mb-4">
                            <img
                              alt=""
                              src={bedroomIcon}
                              className="icons-list-image"
                            />
                            {PropertyData.map((e) => e.bedroom)} Bedrooms
                            <sup className="icons-list-sub-title">Bedrooms</sup>
                          </li>
                          <li className="list-group-item icons-list description-icon-center mb-4">
                            <img
                              src={bathroomIcon}
                              className="icons-list-image"
                            />
                            {PropertyData.map((e) => e.bathroom)} Bathrooms
                            <sup className="icons-list-sub-title">
                              Bathrooms
                            </sup>
                          </li>
                          <li className="list-group-item icons-list mb-4">
                            <img src={sizeIcon} className="icons-list-image" />
                            {PropertyData.map((e) => e.area)} sqft
                            <sup className="icons-list-sub-title-size">
                              Size
                            </sup>
                          </li>
                        </ul>
                      </div>
                      <div className="row text-center">
                        <div className="col">
                          <div className="counter">
                            <img src={homeIcon} className="fa-2x" />
                            <h2 className="timer count-title count-number">
                              Property Type
                            </h2>
                            <p className="count-text ">
                              {propertydata[0]?.property_sub_type
                                .split("_")
                                .join(" ")}
                            </p>
                          </div>
                        </div>
                        <div className="col">
                          <div className="counter">
                            <img src={buildingIcon} className="fa-2x" />
                            <h2 className="timer count-title count-number">
                              Active Units
                            </h2>
                            <p className="count-text ">
                              {propertydata[0]?.active_units}
                            </p>
                          </div>
                        </div>
                        <div className="col">
                          <div className="counter">
                            <img src={tickIcon} className="fa-2x" />
                            <h2 className="timer count-title count-number">
                              Status
                            </h2>
                            <p className="count-text-unique ">Active</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={window.innerWidth <= 980 ? "" : "col-md-4"}>
                      <MapContainer center={[48.8566, 2.3522]} zoom={13}>
                        <TileLayer
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {markers.map((marker) => (
                          <Marker position={marker.geocode} icon={customIcon}>
                            <Popup>{marker.popUp}</Popup>
                          </Marker>
                        ))}
                      </MapContainer>
                    </div>
                  </div>
                </TabPane>
                <TabPane tab="Amenities" key="3">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="d-flex icons-list-main">
                        <div className="row">
                          {amenities.map((amenity, index) => (
                            <div className="col-md-4 mt-4">
                              <span className="me-2">
                                <svg
                                  width={23}
                                  height={23}
                                  fill="none"
                                  stroke="#ef6b3e"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1}
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                  <path d="M22 4 12 14.01l-3-3" />
                                </svg>
                              </span>
                              {amenity}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-8 flex-bottom">
                      <div className="row text-center">
                        <div className="col">
                          <div className="counter">
                            <img src={homeIcon} className="fa-2x" />
                            <h2 className="timer count-title count-number">
                              Property Type
                            </h2>
                            <p className="count-text ">
                              {PropertyData.map((e) =>
                                e.property_sub_type.split("_").join(" ")
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="col">
                          <div className="counter">
                            <img src={buildingIcon} className="fa-2x" />
                            <h2 className="timer count-title count-number">
                              Active Units
                            </h2>
                            <p className="count-text ">
                              {propertydata[0]?.active_units}
                            </p>
                          </div>
                        </div>
                        <div className="col">
                          <div className="counter">
                            <img src={tickIcon} className="fa-2x" />
                            <h2 className="timer count-title count-number">
                              Status
                            </h2>
                            <p className="count-text-unique ">
                              {PropertyData.map((e) => e.status)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div
                        id="map-container-google-1"
                        className="z-depth-1-half map-container map-custom"
                      >
                        <iframe
                          src="https://maps.google.com/maps?q=manhatan&t=&z=13&ie=UTF8&iwloc=&output=embed"
                          frameborder="0"
                          className="map-custom-class"
                          allowfullscreen
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </TabPane>
              </Tabs>
            </TabPane>
            <TabPane tab="Units" key="4">

              {
                localStorage.getItem("role") !== "landlord" && localStorage.getItem("role") === "user" && ROLE[0]?.units?.add ?
                  <SearchBar
                    route={`add-unit-details?id=${id}`}
                    btnTitle="Add New Unit"
                    unitsFilter={false}
                  />
                  :
                  localStorage.getItem("role") === "landlord" ?
                    <SearchBar
                      route={`add-unit-details?id=${id}`}
                      btnTitle="Add New Unit"
                      unitsFilter={false}
                    />
                    :
                    <SearchBarWithOutBtn unitsFilter={false} />
              }

              {selectedTableItem.length >= 1 && (
                <div className="table-delete-icon mt-3">
                  <button className="table-delete-btn next-btn-main">
                    <img src={trashIconWhite} alt='' />
                    Delete
                  </button>
                </div>
              )}
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
                    pagination={false}
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
            </TabPane>
            <TabPane tab="Tenants" key="5">
              {showTenantDetails === true ? (
                <>
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
                            <li className="list-style-none cursor lease-details-dropdown-icons">
                              {" "}
                              <img src={viewIcon} alt="" /> View
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
                  <div className="row mt-3">
                    <div className="col-md-4">
                      <div className="task-overview-tab-boxes p-3 position-relative">
                        <div className="overview-box-img">
                          <img src={depositsHeldIcon} alt="" />
                        </div>
                        <div className="over-view-box-text">
                          <span>Deposits Held</span>
                          <h3 className="card-title-deposits">$200</h3>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="task-overview-tab-boxes p-3 position-relative">
                        <div className="overview-box-img">
                          <img src={depositHeldSecondIcon} alt="" />
                        </div>
                        <div className="over-view-box-text">
                          <span>Deposits Held</span>
                          <h3 className="card-title-all">$1000</h3>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="task-overview-tab-boxes p-3 position-relative">
                        <div className="overview-box-img">
                          <img src={monthlyRentIcon} alt="" />
                        </div>
                        <div className="over-view-box-text">
                          <span>Monthly Rent</span>
                          <h3 className="card-title-all">$1055.00</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-5">
                    <div className="col-md-10">
                      <div className="task-info-heading">
                        <h4>Personal Info</h4>
                      </div>
                      <div className="task-info-lists mt-5">
                        <div className="row">
                          <div className="col-md-4">
                            <p>
                              <span className="task-info-list-span me-3">
                                First Name:
                              </span>{" "}
                              olivia
                            </p>
                          </div>
                          <div className="col-md-4">
                            <p>
                              <span className="task-info-list-span me-3">
                                Middle Name:
                              </span>{" "}
                              Mika
                            </p>
                          </div>
                          <div className="col-md-4">
                            <p>
                              <span className="task-info-list-span me-3">
                                Last Name:
                              </span>{" "}
                              John
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <p>
                              <span className="task-info-list-span me-3">
                                Email:
                              </span>{" "}
                              olivia-johnn1997@gmail.com
                            </p>
                          </div>
                          <div className="col-md-4"></div>
                          <div className="col-md-4">
                            <p>
                              <span className="task-info-list-span me-3">
                                Phone No:
                              </span>{" "}
                              +1 (555) 456-7890
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <p>
                              <span className="task-info-list-span me-3">
                                Date of Birth:
                              </span>{" "}
                              12/02/1996
                            </p>
                          </div>
                          <div className="col-md-4"></div>
                          <div className="col-md-4">
                            <p>
                              <span className="task-info-list-span me-3">
                                Gender:
                              </span>{" "}
                              Female
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <p>
                              <span className="task-info-list-span me-3">
                                Current Address:
                              </span>{" "}
                              354 Gladwell Street, PITTSBURGH, Pennsylvania(PA),
                              15283
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <p>
                              <span className="task-info-list-span me-3">
                                Previous Address:
                              </span>{" "}
                              4570 Griffin Street Arizona 85003
                            </p>
                          </div>
                          <div className="col-md-2"></div>
                          <div className="col-md-4">
                            <p>
                              <span className="task-info-list-span me-3">
                                Rent Amount:
                              </span>{" "}
                              $ 2,500
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <p>
                              <span className="task-info-list-span me-3">
                                Lease Term:
                              </span>{" "}
                              Fixed Term
                            </p>
                          </div>
                          <div className="col-md-4">
                            <p>
                              <span className="task-info-list-span me-3">
                                Lease Term Start Date:
                              </span>{" "}
                              01/11/2021
                            </p>
                          </div>
                          <div className="col-md-4">
                            <p>
                              <span className="task-info-list-span me-3">
                                Lease Term Last Date:
                              </span>{" "}
                              12/22/2021
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-2 text-end mt-5">
                      <img src={tenantUserImage} alt="" />
                    </div>
                  </div>
                  <hr />
                  <div className="row mt-4">
                    <div className="col-md-12">
                      <div className="task-info-heading">
                        <h4>Emergency Info</h4>
                      </div>
                      <div className="task-info-lists mt-5">
                        <div className="row">
                          <div className="col-md-4">
                            <p>
                              <span className="task-info-list-span me-3">
                                First Name:
                              </span>{" "}
                              Illeana
                            </p>
                          </div>
                          <div className="col-md-4">
                            <p>
                              <span className="task-info-list-span me-3">
                                Middle Name:
                              </span>{" "}
                              Susen
                            </p>
                          </div>
                          <div className="col-md-4">
                            <p>
                              <span className="task-info-list-span me-3">
                                Last Name:
                              </span>{" "}
                              Walker
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <p>
                              <span className="task-info-list-span me-3">
                                Email:
                              </span>{" "}
                              janesmith@gmail.com
                            </p>
                          </div>
                          <div className="col-md-4">
                            <p>
                              <span className="task-info-list-span me-3">
                                Phone No:
                              </span>{" "}
                              +1 (555) 876-5432
                            </p>
                          </div>
                          <div className="col-md-4"></div>
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <p>
                              <span className="task-info-list-span me-3">
                                Relationship:
                              </span>{" "}
                              Sister
                            </p>
                          </div>
                          <div className="col-md-4">
                            <p>
                              <span className="task-info-list-span me-3">
                                Description:
                              </span>{" "}
                              -
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="row mt-4">
                    <div className="col-md-12">
                      <div className="task-info-heading">
                        <h4>Pet Info</h4>
                      </div>
                      <div className="task-info-lists mt-5">
                        <div className="row">
                          <div className="col-md-4">
                            <p>
                              <span className="task-info-list-span me-3">
                                Pet Type:
                              </span>{" "}
                              Dog
                            </p>
                          </div>
                          <div className="col-md-4">
                            <p>
                              <span className="task-info-list-span me-3">
                                Name:
                              </span>{" "}
                              Snow
                            </p>
                          </div>
                          <div className="col-md-4"></div>
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <p>
                              <span className="task-info-list-span me-3">
                                Weight:
                              </span>{" "}
                              -
                            </p>
                          </div>
                          <div className="col-md-4">
                            <p>
                              <span className="task-info-list-span me-3">
                                Bread:
                              </span>{" "}
                              -
                            </p>
                          </div>
                          <div className="col-md-4"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="row mt-4">
                    <div className="col-md-12">
                      <div className="task-info-heading">
                        <h4>Vehicle Info</h4>
                      </div>
                      <div className="task-info-lists mt-5">
                        <div className="row">
                          <div className="col-md-12">
                            <p>
                              <span className="task-info-list-span me-3">
                                Vehicle Type:
                              </span>{" "}
                              Automobile
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <p>
                              <span className="task-info-list-span me-3">
                                Make:
                              </span>{" "}
                              -
                            </p>
                          </div>
                          <div className="col-md-4">
                            <p>
                              <span className="task-info-list-span me-3">
                                Model:
                              </span>{" "}
                              -
                            </p>
                          </div>
                          <div className="col-md-4"></div>
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <p>
                              <span className="task-info-list-span me-3">
                                Year:
                              </span>{" "}
                              -
                            </p>
                          </div>
                          <div className="col-md-4">
                            <p>
                              <span className="task-info-list-span me-3">
                                Color:
                              </span>{" "}
                              -
                            </p>
                          </div>
                          <div className="col-md-4">
                            <p>
                              <span className="task-info-list-span me-3">
                                License Plate:
                              </span>{" "}
                              -
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="row mt-4">
                    <div className="col-md-12">
                      <div className="task-info-heading">
                        <h4>Dependent Info</h4>
                      </div>
                      <div className="task-info-lists mt-5">
                        <div className="row">
                          <div className="col-md-4">
                            <p>
                              <span className="task-info-list-span me-3">
                                First Name:
                              </span>{" "}
                              Tina
                            </p>
                          </div>
                          <div className="col-md-4">
                            <p>
                              <span className="task-info-list-span me-3">
                                Middle Name:
                              </span>{" "}
                              Doe
                            </p>
                          </div>
                          <div className="col-md-4">
                            <p>
                              <span className="task-info-list-span me-3">
                                Last Name:
                              </span>{" "}
                              John
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <p>
                              <span className="task-info-list-span me-3">
                                Date of Birth:
                              </span>{" "}
                              02/14/1996
                            </p>
                          </div>
                          <div className="col-md-4"></div>
                          <div className="col-md-4">
                            <p>
                              <span className="task-info-list-span me-3">
                                Relationship:
                              </span>{" "}
                              -
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="row mt-4">
                    <div className="col-md-12">
                      <div className="task-info-heading">
                        <h4>Add Notes</h4>
                      </div>
                      <div className="task-info-lists mt-5">
                        <div className="row">
                          <div className="col-md-12">
                            <p>
                              <span className="task-info-list-span"></span> -
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <SearchBar
                    btnTitle="Add New Tenant"
                    innerPage={true}
                    onClick={() => {
                      navigate("/add-tenant-details");
                    }}
                    tenantFilter={true}
                  />
                  {selectedTableItem.length >= 1 && (
                    <div className="table-delete-icon mt-3">
                      <button className="table-delete-btn next-btn-main">
                        <img src={trashIconWhite} />
                        Delete
                      </button>
                    </div>
                  )}
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
                        className="property-details-view-tenants-table scroll-remove scroll-responsive-tablet"
                        rowSelection={{
                          type: selectionType,
                          ...rowSelection,
                        }}
                        columns={tenantColumns}
                        dataSource={tenantData}
                        pagination={false}
                      />
                    </ConfigProvider>
                  </div>
                </>
              )}
            </TabPane>
            <TabPane tab="Tasks" key="6">
              {showTaskDetails === true ? (
                <>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="task-overview-tab-boxes p-3 position-relative">
                        <div className="overview-box-img">
                          <img src={assignedTasksIcon} alt="" />
                        </div>
                        <div className="over-view-box-text">
                          <span>Assigned Tasks</span>
                          <h3>13</h3>
                        </div>
                        <div className="setting-icon">
                          <img src={settingBtnIcon} alt="" />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="task-overview-tab-boxes p-3 position-relative">
                        <div className="overview-box-img">
                          <img src={tasksCompletedIcon} alt="" />
                        </div>
                        <div className="over-view-box-text">
                          <span>Tasks Completed</span>
                          <h3>22</h3>
                        </div>
                        <div className="setting-icon">
                          <img src={settingBtnIcon} alt="" />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="task-overview-tab-boxes p-3 position-relative">
                        <div className="overview-box-img">
                          <img src={pendingTasksIcon} alt="" />
                        </div>
                        <div className="over-view-box-text">
                          <span>Pending Tasks</span>
                          <h3>2</h3>
                        </div>
                        <div className="setting-icon">
                          <img src={settingBtnIcon} alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-5">
                    <div className="col-md-10">
                      <div className="task-info-heading">
                        <h4>Task Info</h4>
                      </div>
                      <div className="task-info-lists">
                        <div className="row">
                          <div className="col-md-12">
                            <p>
                              <span className="task-info-list-span me-3">
                                Ticket Title:
                              </span>{" "}
                              Plumbing issues
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <p>
                              <span className="task-info-list-span me-3">
                                Priority:
                              </span>{" "}
                              High
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <p>
                              <span className="task-info-list-span me-3">
                                Due Date:
                              </span>{" "}
                              12/12/23
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <p>
                              <span className="task-info-list-span me-3">
                                Status:
                              </span>{" "}
                              In Progress
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <p>
                              <span className="task-info-list-span me-3">
                                Property:
                              </span>{" "}
                              4570 Griffin Street Phoenix, Arizona(AZ), 85003
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <p>
                              <span className="task-info-list-span me-3">
                                Documents:
                              </span>{" "}
                              docs paper-2
                            </p>
                          </div>
                        </div>
                        <div className="row mt-3">
                          <span>
                            <div className="modal-check-box-container d-flex align-items-center">
                              <input
                                type="checkbox"
                                className="me-2"
                                name=""
                                id=""
                              />{" "}
                              <span className="ms-2">Notify Assignee(s)</span>
                              <input
                                type="checkbox"
                                className="ms-2"
                                name=""
                                id=""
                              />{" "}
                              <span className="ms-2">Notify Tenant</span>
                            </div>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-2 text-end">
                      <img src={tenantUserImage} alt="" />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <SearchBar
                    onClick={onOpenModalTask}
                    btnTitle="Add New Task"
                    innerPage={true}
                    taskFilter={true}
                  />
                  {selectedTableItem.length >= 1 && (
                    <div className="table-delete-icon mt-3">
                      <button className="table-delete-btn next-btn-main">
                        <img src={trashIconWhite} />
                        Delete
                      </button>
                    </div>
                  )}
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
                        className="property-details-view-tasks-table scroll-remove scroll-responsive-tablet"
                        rowSelection={{
                          type: selectionType,
                          ...rowSelection,
                        }}
                        columns={tasksColumns}
                        dataSource={tasksData}
                        pagination={true}
                      />
                    </ConfigProvider>
                  </div>
                </>
              )}
            </TabPane>
            <TabPane tab="Connect Account" key="7">
              {showaccountDetails === true ? (
                <>
                  <div className="container mt-5 account-details-view-main">
                    <div className="row account-details-view-title">
                      <div className="col-md-6">
                        <span className="fw-bold account-details-view-custom-title">
                          ACCOUNT INFO
                        </span>
                      </div>
                      <div className="col-md-6">
                        <div className="account-info-btn d-flex align-items-center justify-content-center gap-3">
                          <button className="connect-bank-btn w-50">
                            Connect to Bank
                          </button>
                          <button
                            onClick={onOpenAccountModal}
                            className="add-new-task-btn w-50"
                          >
                            <span>
                              <svg
                                width={21}
                                height={21}
                                fill="#fff"
                                stroke="#fff"
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
                            Add New Account
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-5">
                      <div className="col-md-12">
                        <div className="task-info-lists">
                          <p>
                            <span className="task-info-list-span me-3">
                              Lease:
                            </span>{" "}
                            Use this account to receive payments
                          </p>
                          <p>
                            <span className="task-info-list-span me-3">
                              Account:
                            </span>{" "}
                            Operating Account
                          </p>
                          <p>
                            <span className="task-info-list-span me-3">
                              Status:
                            </span>{" "}
                            Active
                          </p>
                          <p>
                            <span className="task-info-list-span me-3">
                              Description:
                            </span>{" "}
                            <span className="placeholder-custom-text">
                              Generate Lorem Ipsum placeholder text for use in
                              your graphic, print and web layouts, and discover
                              plugins for your favorite writing, design and
                              blogging tools
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-md-12">
                        <p className="primary-orange-custom-text">
                          Make this account secondary
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <p className="primary-orange-custom-sub-text">
                          This will allow you to select this account as
                          secondary.
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <ConfigProvider
                          theme={{
                            components: {
                              Switch: {
                                colorPrimary: "#EF6B3E",
                                colorPrimaryHover: "#EF6B3E",
                              },
                            },
                          }}
                        >
                          <Switch onChange={onChange} />
                        </ConfigProvider>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <SearchBar
                    onClick={onOpenAccountModal}
                    btnTitle="Add New Account"
                    accountingFilter={true}
                  />
                  {selectedTableItem.length >= 1 && (
                    <div className="table-delete-icon mt-3">
                      <button className="table-delete-btn next-btn-main">
                        <img src={trashIconWhite} />
                        Delete
                      </button>
                    </div>
                  )}
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
                        className="property-connect-account-table scroll-remove scroll-responsive-tablet"
                        rowSelection={{
                          type: selectionType,
                          ...rowSelection,
                        }}
                        columns={accountColumns}
                        dataSource={accountData}
                        pagination={false}
                      />
                    </ConfigProvider>
                  </div>
                </>
              )}
            </TabPane>
            <TabPane tab="Reports" key="8">
              <div className="container-fluid bg-white p-3">
                <div className="row">
                  <div className="col-md-12">
                    <div className="task-search-input position-relative">
                      <input
                        type="text"
                        placeholder="Search"
                        className="form-control search-form-control-task"
                      />
                      <div className="search-icon-task">
                        <img src={searchIcon} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-md-6">
                    <div className="report-type-text-container mt-3">
                      <span className="report-type-text ">Report Type</span>
                    </div>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-md-4">
                    <div className="report-type-box d-flex gap-3 align-items-center">
                      <Select
                        defaultValue={{ label: "Select Reports" }}
                        style={{
                          width: "100%",
                          height: 50,
                        }}
                        onChange={handleReportChange}
                        options={[

                          {
                            label: "Tenant Reports",
                            value: `tenant-reports`,
                          },
                          {
                            label: "Invoice Reports",
                            value: `invoice-reports`,
                          },
                          {
                            label: "Task Reports",
                            value: `task-reports`,
                          },
                        ]}
                      />
                    </div>
                  </div>
                  <div className="col-md-8 text-end">
                    <div className="report-export-buttons d-flex justify-content-end align-items-center gap-3">
                      <div className="export-btn-container position-relative">
                        <button
                          onClick={() => {
                            setExportDropdown(!exportDropdown);
                          }}
                          className="export-btn"
                        >
                          Export as{" "}
                          <span className="">
                            <svg
                              width={18}
                              height={18}
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </span>
                        </button>
                        <div
                          className={
                            exportDropdown === true
                              ? "export-dropdown box-shadow export-dropdown-show"
                              : "export-dropdown box-shadow"
                          }
                        >
                          <ul className="d-flex flex-column justify-content-start text-start gap-3 p-0 mb-0">
                            <li className="list-style-none">Excel</li>
                            <li
                              onClick={() => toPDF()}
                              className="list-style-none cursor"
                            >
                              PDF
                            </li>
                          </ul>
                        </div>
                      </div>
                      <CSVLink
                        data={data}
                        className="modal-save-btn property-details-report-download-btn"
                      >
                        Download
                      </CSVLink>
                    </div>
                  </div>
                </div>
                {selectedTableItem.length >= 1 && (
                  <div className="table-delete-icon mt-3">
                    <button className="table-delete-btn next-btn-main">
                      <img src={trashIconWhite} />
                      Delete
                    </button>
                  </div>
                )}
                <div className="report-table-container mt-3" ref={targetRef}>

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
                      pagination={false}
                      className="scroll-remove scroll-responsive-tablet property-reports-table"
                      rowSelection={{
                        type: selectionType,
                        ...rowSelection,
                      }}
                      columns={selectedReport === 'invoice-reports' ? invoiceColumn : selectedReport === 'tenant-reports' ? tenantColumn : selectedReport === 'task-reports' ? taskColumn : reportsColumns}
                      dataSource={selectedReport === 'invoice-reports' ? invoiceReportData : selectedReport === 'tenant-reports' ? tenantReportData : selectedReport === 'task-reports' ? taskReportData : reportsData}
                    />
                  </ConfigProvider>
                </div>
              </div>
            </TabPane>
            {/* FIXME : Add filter for files */}
            <TabPane tab="Files" key="9">
              <SearchBar
                btnTitle="Add New File"
                route={`new-files?id=${id}`}
                accountingFilter={true}
              />
              {filesData.length > 0 ? (
                <>
                  {selectedTableItem.length >= 1 && (
                    <div className="table-delete-icon mt-3">
                      <button className="table-delete-btn next-btn-main">
                        <img src={trashIconWhite} />
                        Delete
                      </button>
                    </div>
                  )}
                  <div className="row mt-4">
                    <div className="col-md-12">
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
                          pagination={false}
                          className="scroll-remove scroll-responsive-tablet property-files-table"
                          rowSelection={{
                            type: selectionType,
                            ...rowSelection,
                          }}
                          columns={filesColumns}
                          dataSource={filesData}
                        />
                      </ConfigProvider>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="not-found-container text-center ">
                    <img src={NotFound} alt="" />
                    <p>
                      <strong>No Files found</strong>
                    </p>
                    <p>
                      No files were found; the folder is empty. <br />
                      Please try again.
                    </p>
                  </div>
                </>
              )}

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
                    <div className="dragger">
                      <FileUploader setImages={setImages} Images={Images} />
                    </div>
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
            {/* FIXME : Add filter for Notes */}
            <TabPane tab="Notes" key="10">
              {showAddNote ? (
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
                          <FileUploader
                            setImages={setImages}
                            Images={Images}
                            setDeletedImages={setDeletedImages}
                            DeletedImages={DeletedImages}
                          />
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
                            className="cancel-btn"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => {
                              addNotes();
                            }}
                            className="save-btn"
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
                          className=""
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
                </>
              )}
            </TabPane>
          </Tabs>
        </ConfigProvider>
      </div>
    </>
  );
};

export default PropertyDetailsView;
