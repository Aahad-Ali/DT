import { useEffect, useRef, useState } from "react";
import { Tabs, message } from "antd";
import NotFound from "assets/not-found-img.png";
import documentIcon from "assets/document.png";
import ownerImage from "assets/tenant_table_image-01.png";
import settingIcon from "assets/three-dots.png";
import editIcon from "assets/edit-05.png";
import deleteIcon from "assets/trash-01.png";
import oval from "assets/Oval.png";
import settingBtn from "assets/more-vertical.png";
import viewIcon from "assets/Icon.png";
import completeIcon from "assets/calendar-check-01.png";
import tenantUser1 from "assets/tenant_table_image-01.png";
import tenantUser2 from "assets/tenant_table_image -02.png";
import activeDot from "assets/_Dot.png";
import inactiveDot from "assets/inactivedot.png";
import loginIcon from "assets/file-03.png";
import SearchBar from "Helpers/SearchBar";
import { Table, ConfigProvider } from "antd";
import { useNavigate, Link } from "react-router-dom";
import fileUploadIcon from "assets/upload-cloud-02-circle.png";
import { Upload } from "antd";
import UnitAddModal from "Modals/UnitAddModal/UnitAddModal";
import UseUrlParamsHook from "Hooks/UseUrlParamsHook";
import FileUploader from "Components/FileUploader/FileUploader";
import UseFormDataHook from "Hooks/UseFormDataHook";
import UseGetHook from "Hooks/UseGetHook";
import { useSelector } from "react-redux";
import ConditionalFilter from "Hooks/ConditionalFilter";
import whiteDot from "assets/_white-Dot.png";
import renewLeaseIcon from "assets/End Lease.png";
import PurchaseUnit from "Modals/PurchaseUnit/PurchaseUnit";

const { Dragger } = Upload;
const AddUnitDetails = () => {
  const { TabPane } = Tabs;
  const [unitName, setUnitName] = useState("");
  const [rentAmount, setRentAmount] = useState("");
  const [Bedroom, setBedroom] = useState("");
  const [Bathroom, setBathroom] = useState("");
  const [unitSqft, setUnitSqft] = useState("");
  const [Description, setDescription] = useState("");
  const [openModalTask, setOpenModalTask] = useState(false);
  const [Images, setImages] = useState([]);
  const [showNoteDetails, setShowNoteDetails] = useState(false);
  const [showAddNote, setShowAddNote] = useState(false);
  const [showTenantDetails, setShowTenantDetails] = useState(false);
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [selectionType, setSelectionType] = useState("checkbox");
  const [key, setKey] = useState([]);
  const [Data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [inputHeight, setInputHeight] = useState("45px"); // Initial height
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [taskId, setTaskId] = useState("");


  const [form, setForm] = useState({
    unit_name: "",
    bedroom: "",
    bathroom: "",
    unit_sqft: "",
    rent_amount: "",
  });

  const [errors, setErrors] = useState({});
  const handleChange = (fieldName, value) => {
    setForm({
      ...form,
      [fieldName]: value,
    });
  };
  // Search Start
  const Search = useSelector((state) => {
    return state.Search.value;
  });
  // Search End
  // const [noteForm, setNoteForm] = useState({
  //   note_name: "",
  //   description: "",
  // });
  // const handleNoteChange = (fieldName, value) => {
  //   setNoteForm({
  //     ...noteForm,
  //     [fieldName]: value,
  //   });
  // };
  // Modal Function
  const onOpenModalTask = () => {
    setOpenModalTask(true);
  };
  const onCloseModalTask = () => {
    setOpenModalTask(false);
  };



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
  const columns = [
    {
      title: "File Name",
      dataIndex: "filename",
      render: (text) => (
        <>
          {" "}
          <img src={documentIcon} alt="" /> <a>{text}</a>
        </>
      ),
    },
    {
      title: "Properties",
      dataIndex: "properties",
      render: (text) => (
        <>
          <span className="tenant_table_properties_main_text">
            354 Gladwell Street
          </span>
          <br />
          <span className="tenant_table_properties_sub_text">{text}</span>
        </>
      ),
    },
    {
      title: "OWNER",
      dataIndex: "owner",
      render: (text) => (
        <>
          {" "}
          <img src={ownerImage} alt="" /> <span>{text}</span>
        </>
      ),
    },
    {
      title: "DATE UPLOADED",
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
              <div className="task-table-setting-dropdown-prospect bg-white box-shadow">
                <ul className="p-0 d-flex flex-column gap-3">
                  <li className="list-style-none">
                    {" "}
                    <img src={editIcon} alt="" /> Edit
                  </li>
                  <li className="list-style-none">
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
  const data = [
    {
      key: "1",
      filename: "Document screenshot.jpg",
      properties: "PITTSBURGH, Pennsylvania(PA), 15283",
      owner: "Olivia Rhye",
      uploadedDate: "10/11/22",
    },
    {
      key: "2",
      filename: "Document screenshot.jpg",
      properties: "Phoenix, Arizona(AZ), 85003",
      owner: "Olivia Rhye",
      uploadedDate: "10/11/22",
    },
  ];

  const notesColumns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => (
        <>
          <Link to="">
            <span className="property-table-name-text">
              <img src={documentIcon} alt="" /> {text}
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
              <div className="task-table-setting-dropdown-prospect bg-white box-shadow">
                <ul className="p-0 d-flex flex-column gap-3">
                  <Link>
                    <li
                      onClick={() => {
                        setShowNoteDetails(true);
                      }}
                      className="list-style-none table-setting-dropdown-menu"
                    >
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
  const notesData = [
    {
      key: "1",
      name: "Document screenshot.jpg",
      description:
        "Youthful, adventurous and fun, treehouses hold a special place in our hearts – and those of....",
      uploadedDate: "10/11/22",
    },
    {
      key: "2",
      name: "Document screenshot.jpg",
      description:
        "Youthful, adventurous and fun, treehouses hold a special place in our hearts – and those of....",
      uploadedDate: "10/11/23",
    },
  ];

  let chevronIcon;
  chevronIcon = (
    <>
      <span className="me-2">
        <svg
          width={16}
          height={16}
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m4 9 8 8 8-8" />
        </svg>
      </span>
    </>
  );
  // Multi Select
  const [options1, setOptions1] = useState([
    { value: "Addtional Storage", label: "Addtional Storage" },
    { value: "Balcony", label: "Balcony" },
    { value: "Carport", label: "Carport" },
    { value: "Courtyard", label: "Courtyard" },
    { value: "Double Sink Vanity", label: "Double Sink Vanity" },
    { value: "Framed Mirrors", label: "Framed Mirrors" },
    { value: "Handrails", label: "Handrails" },
    { value: "Heat", label: "Heat" },
    { value: "Laminate Counter Tops", label: "Laminate Counter Tops" },
    { value: "Linen Closet", label: "Linen Closet" },
    { value: "Patio", label: "Patio" },
    { value: "Range", label: "Range" },
    { value: "Skylight", label: "Skylight" },
    { value: "View", label: "View" },
    { value: "WD Hookup", label: "WD Hookup" },
  ]);
  const [options2, setOptions2] = useState([
    { value: "Air Conditioner", label: "Air Conditioner" },
    { value: "Cable", label: "Cable" },
    { value: "Ceiling Fan", label: "Ceiling Fan" },
    { value: "Dishwasher", label: "Dishwasher" },
    { value: "Dryer", label: "Dryer" },
    { value: "Furnished", label: "Furnished" },
    { value: "Hardwood Flooring", label: "Hardwood Flooring" },
    {
      value: "Individual Climate Control",
      label: "Individual Climate Control",
    },
    { value: "Vinyl Flooring", label: "Vinyl Flooring" },
    { value: "Microwave", label: "Microwave" },
    { value: "Private Balcony", label: "Private Balcony" },
    { value: "Refrigerator", label: "Refrigerator" },
    { value: "Tile Flooring", label: "Tile Flooring" },
    { value: "Washer", label: "Washer" },
    { value: "Window Coverings", label: "Window Coverings" },
  ]);
  const [option3, setOptions3] = useState([
    { value: "Alarm", label: "Alarm" },
    { value: "Carpet", label: "Carpet" },
    { value: "Controlled Access", label: "Controlled Access" },
    { value: "Disposal", label: "Disposal" },
    { value: "Fireplace", label: "Fireplace" },
    { value: "Garage", label: "Garage" },
    { value: "Hard Surface Counter Tops", label: "Hard Surface Counter Tops" },
    { value: "Island Kitchen", label: "Island Kitchen" },
    { value: "Pantry", label: "Pantry" },
    { value: "Private Patio", label: "Private Patio" },
    { value: "Satellite", label: "Satellite" },
    { value: "Vaulted Ceiling", label: "Vaulted Ceiling" },
    { value: "Wheel Chair", label: "Wheel Chair" },
    { value: "Other", label: "Other" },
  ]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const dropdownRef = useRef(null);
  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  const [selectedOptions, setselectedOptions] = useState([]);
  const handleCheckboxChange = (value) => {
    console.log("Checkbox with value:", value, "was clicked");
    if (selectedOptions.includes(value)) {
      setselectedOptions(selectedOptions.filter((option) => option !== value));
    } else {
      setselectedOptions([...selectedOptions, value]);
    }
  };
  const removeMultiValue = (value) => {
    console.log(value);
    if (selectedOptions.includes(value)) {
      setselectedOptions(selectedOptions.filter((option) => option !== value));
    } else {
      setselectedOptions([...selectedOptions, value]);
    }
  };
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
  const search = useSelector((state) => {
    return state.Search.value;
  });
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
  // Get Property by id
  const { id } = UseUrlParamsHook();
  const { fetchProperty, PropertyData } = UseGetHook("property", id);
  const { FetchLeaseUnit, lease } = UseGetHook("leases", id);
  const propertydata = PropertyData.filter((e) => e.id === id);
  const { FetchPropertyTenant, TenantData } = UseGetHook(
    filters(FilterObjects) ? `&${filters(FilterObjects)}` : "",
    id
  );
  const { fetchTaskId, TaskData, loader } = UseGetHook(
    filters(FilterObjects) ? `&${filters(FilterObjects)}` : "",
    id
  );
  // const { FetchUnitTenant, TenantData } = UseGetHook("tenants", id);
  useEffect(() => {
    // FetchUnitTenant();
    FetchPropertyTenant();
    fetchProperty();
    fetchTaskId();
    FetchLeaseUnit();
  }, []);

  const onOpenModal = () => {
    setOpenModal(true);
  };
  const onCloseModal = () => {
    setOpenModal(false);
  };

  const config = require("Helpers/config.json");
  useEffect(() => {
    fetch(`${config["baseUrl"]}/api/property/${id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.apiCallStatus === "success") {
          let temp = [];
          let temp2 = [];
          temp = res.message;
          setData([temp]);
          console.log(res.message, "success");
        } else {
          console.log(res, "error");
        }
      });
  }, []);

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
                  <Link>
                    <li className="list-style-none table-setting-dropdown-menu">
                      {" "}
                      <img src={editIcon} alt="" /> Edit
                    </li>
                  </Link>
                  <Link>
                    <li className="list-style-none table-setting-dropdown-menu">
                      {" "}
                      <img src={loginIcon} alt="" /> Login
                    </li>
                  </Link>
                  <Link>
                    <li className="list-style-none table-setting-dropdown-menu">
                      {" "}
                      <img src={deleteIcon} alt="" /> Remove
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
                  <li className="list-style-none table-setting-dropdown-menu">
                    {" "}
                    <img src={editIcon} alt="" /> Edit
                  </li>
                  <Link>
                    <li className="list-style-none table-setting-dropdown-menu">
                      {" "}
                      <img src={completeIcon} alt="" /> Complete
                    </li>
                  </Link>
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
  const tasksData = TaskData.filter((e) =>
    e.title.toLowerCase().includes(Search.toLowerCase())
  ).map((e, index) => ({
    key: index + 1,
    id: e.id,
    title: e.title,
    img: e.image,
    assigned: e.assignedTo.map((e) => e.firstName).join(", "),
    assignedToMe: localStorage.getItem("name"),
    due: [new Date(e.dueDate).toLocaleDateString(), e.priority],
    related: e.property.title,
    status: e.status,
  }));
  // const data = lease
  // .filter((e) =>
  //   e.property.title.toLowerCase().includes(search.toLowerCase())
  // )
  // .map((e) => ({
  //   key: e.id,
  //   property: e.property.title,
  //   date: [
  //     new Date(e.lease_term_start_date).toLocaleDateString(),
  //     new Date(e.lease_term_end_date).toLocaleDateString(),
  //   ],
  //   term: e.lease_term,
  //   rent: `$${e.rent_amount.toLocaleString()}`,
  //   deposit: `$4000`,
  //   balance: "$1000",
  //   status: `Active`,
  // }));
  const leaseColumns = [
    {
      title: "Lease",
      dataIndex: "property",
      render: (text, property) => (
        <Link to={`/lease-detail?id=${property.key}`}>
          <span className="all-lease-property-text">{text}</span>
        </Link>
      ),
    },
    {
      title: "Start Date",
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
  const leaseData = lease
    .filter((e) =>
      e.property.title.toLowerCase().includes(search.toLowerCase())
    )
    .map((e) => ({
      key: e.id,
      property: e.property.title,
      date: [
        new Date(e.lease_term_start_date).toLocaleDateString(),
        // new Date(e.lease_term_end_date).toLocaleDateString(),
      ],
      term: e.lease_term,
      rent: `$${e.rent_amount.toLocaleString()}`,
      deposit: `$4000`,
      balance: "$1000",
      status: `Active`,
    }));

  // Add Unit
  const AddUnit = () => {
    const formData = new FormData();
    formData.append("property_id", id);
    formData.append("name", form.unit_name);
    formData.append("description", Description);
    formData.append("bedroom", form.bedroom);
    formData.append("bathroom", form.bathroom);
    formData.append("area", form.unit_sqft);
    formData.append("rent_amount", form.rent_amount);
    for (let i = 0; i < selectedOptions.length; i++) {
      formData.append(`amenities[${[i]}]`, selectedOptions[i]);
    }
    Images.forEach((img) => {
      formData.append("images", img);
    });
    const newErrors = {};
    for (const key in form) {
      if (form[key] === "") {
        newErrors[key] = `${key} is required`;
      }
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      UseFormDataHook("unit", formData, onOpenModal);
    }
    // if (
    //   !unitName ||
    //   !Bedroom ||
    //   !Bathroom ||
    //   !unitSqft ||
    //   Images.length === 0
    // ) {
    //   message.error("Please enter required fields to continue.");
    // } else {
    //   UseFormDataHook("unit", formData, onOpenModal);
    // }
  };

  const inputRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const preventMinus = (e) => {
    if (e.code === "Minus") {
      e.preventDefault();
    }
  };

  useEffect(() => {
    // Calculate input height based on the number of selected options
    if (inputRef.current) {
      const numSelectedOptions = selectedOptions.length;
      let inputHeightValue =
        numSelectedOptions >= 8 ? `${numSelectedOptions * 7}px` : "45px";
      if (window.innerWidth <= 375) {
        if (numSelectedOptions >= 4) {
          inputHeightValue = `${numSelectedOptions * 20}px`;
        }
      } else if (window.innerWidth <= 425) {
        if (numSelectedOptions >= 3) {
          inputHeightValue = `${numSelectedOptions * 25}px`;
        }
      } else if (window.innerWidth <= 768) {
        if (numSelectedOptions >= 4) {
          inputHeightValue = `${numSelectedOptions * 11}px`;
        }
      }

      setInputHeight(inputHeightValue);
    }
  }, [selectedOptions, windowWidth]); // Update when selectedOptions change

  return (
    <>
    
      {openModal === true ? (
        <UnitAddModal
          onClose={onCloseModal}
          route={`property-details-view?id=${id}`}
        />
      ) : (
        ""
      )}
      <div className="container-fluid bg-white p-3">
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
            centered={window.innerWidth <= 450 ? false : true}
            style={{ fontWeight: 500 }}
            className="properties_units_edit_tabs"
          >
            <TabPane tab="Overview" key="1">
              <div className="row mt-4">
                <div className="col-md-12">
                  <span className="property-details-input-title">
                    Property Title
                  </span>
                  <input
                    type="text"
                    value={Data.map((e) => e.title)}
                    className="form-control"
                    disabled
                  />
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-6">
                  <span className="property-details-input-title">
                    Unit Name<span className="sign-up-imp-star">*</span>
                  </span>
                  <input
                    onChange={(e) => handleChange("unit_name", e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Unit Name"
                  />
                  {errors.unit_name && (
                    <span className="text-danger fw-semibold mt-3">
                      {errors.unit_name.split("_").join(" ")}
                    </span>
                  )}
                </div>
                <div className="col-md-6">
                  <span className="property-details-input-title">
                    Rent Amount<span className="sign-up-imp-star">*</span>
                  </span>
                  <div className="rent-amount-input-container position-relative">
                    <input
                      onChange={(e) =>
                        handleChange("rent_amount", e.target.value)
                      }
                      type="number"
                      className="form-control"
                      placeholder="Rent Amount"
                      min="0"
                      onKeyPress={preventMinus}
                    />
                    {errors.rent_amount && (
                      <span className="text-danger fw-semibold mt-3">
                        {errors.rent_amount.split("_").join(" ")}
                      </span>
                    )}
                    <div className="dollar-sign-box">$</div>
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-4">
                  <span className="property-details-input-title">
                    Bedrooms<span className="sign-up-imp-star">*</span>
                  </span>
                  <input
                    onChange={(e) => handleChange("bedroom", e.target.value)}
                    type="number"
                    className="form-control"
                    placeholder="Bedrooms"
                    min="0"
                    onKeyPress={preventMinus}
                  />
                  {errors.bedroom && (
                    <span className="text-danger fw-semibold mt-3">
                      {errors.bedroom}
                    </span>
                  )}
                </div>
                <div className="col-md-4">
                  <span className="property-details-input-title">
                    Bathroom<span className="sign-up-imp-star">*</span>
                  </span>
                  <input
                    onChange={(e) => handleChange("bathroom", e.target.value)}
                    type="number"
                    className="form-control"
                    placeholder="Bathroom"
                    min="0"
                    onKeyPress={preventMinus}
                  />
                  {errors.bathroom && (
                    <span className="text-danger fw-semibold mt-3">
                      {errors.bathroom}
                    </span>
                  )}
                </div>
                <div className="col-md-4">
                  <span className="property-details-input-title">SqFt</span>
                  <input
                    onChange={(e) => handleChange("unit_sqft", e.target.value)}
                    type="number"
                    className="form-control"
                    placeholder="SqFt"
                    min="0"
                    onKeyPress={preventMinus}
                  />
                  {errors.unit_sqft && (
                    <span className="text-danger fw-semibold mt-3">
                      {errors.unit_sqft.split("_").join(" ")}
                    </span>
                  )}
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-12">
                  <span className="property-details-input-title">
                    Select Amenities
                  </span>
                  <div
                    className="custom-multi-select position-relative"
                    ref={dropdownRef}
                  >
                    <input
                      placeholder={
                        isOpen || selectedOptions.length > 0
                          ? ""
                          : "Select Amenities"
                      }
                      onFocus={() => toggleDropdown()}
                      type="text"
                      className="form-control"
                      style={{ height: inputHeight }}
                      ref={inputRef}
                    />
                    <span
                      onClick={toggleDropdown}
                      className="multi-chevron cursor"
                    >
                      <span className="me-2">
                        <svg
                          width={16}
                          height={16}
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="m4 9 8 8 8-8" />
                        </svg>
                      </span>
                    </span>
                    <div className="selected-data d-flex align-items-center gap-3">
                      {selectedOptions.length > 0
                        ? selectedOptions.map((data) => {
                          return (
                            <>
                              <div className="">
                                <span className="select-data-box position-relative">
                                  {data}
                                  <div
                                    onClick={() => {
                                      removeMultiValue(data);
                                    }}
                                    className="cancel-select cursor"
                                  >
                                    <svg
                                      width={16}
                                      height={16}
                                      fill="#EF6B3E"
                                      viewBox="0 0 24 24"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path d="M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0ZM8.693 7.808a.626.626 0 1 0-.885.885L11.116 12l-3.308 3.307a.626.626 0 1 0 .885.885L12 12.884l3.307 3.308a.627.627 0 0 0 .885-.885L12.884 12l3.308-3.307a.627.627 0 0 0-.885-.885L12 11.116 8.693 7.808Z" />
                                    </svg>
                                  </div>
                                </span>
                              </div>
                            </>
                          );
                        })
                        : ""}
                    </div>
                    {isOpen && (
                      <div className="dropdown-options">
                        <div className="row">
                          <div className="col-md-4">
                            <div className="multi-select-options">
                              {options1.map((option) => (
                                <div
                                  key={option.value}
                                  className="d-flex align-items-center"
                                >
                                  <input
                                    type="checkbox"
                                    id={option.value}
                                    value={option.value}
                                    checked={selectedOptions.includes(
                                      option.value
                                    )}
                                    onChange={() =>
                                      handleCheckboxChange(option.value)
                                    }
                                  />
                                  <label htmlFor={option.value}>
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="multi-select-options">
                              {options2.map((option) => (
                                <div
                                  key={option.value}
                                  className="d-flex align-items-center"
                                >
                                  <input
                                    type="checkbox"
                                    id={option.value}
                                    value={option.value}
                                    checked={selectedOptions.includes(
                                      option.value
                                    )}
                                    onChange={() =>
                                      handleCheckboxChange(option.value)
                                    }
                                  />
                                  <label htmlFor={option.value}>
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="multi-select-options">
                              {option3.map((option) => (
                                <div
                                  key={option.value}
                                  className="d-flex align-items-center"
                                >
                                  <input
                                    type="checkbox"
                                    id={option.value}
                                    value={option.value}
                                    checked={selectedOptions.includes(
                                      option.value
                                    )}
                                    onChange={() =>
                                      handleCheckboxChange(option.value)
                                    }
                                  />
                                  <label htmlFor={option.value}>
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-12">
                  <span className="property-details-input-title">
                    Description
                  </span>
                  <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    className="form-control"
                    placeholder="Description"
                  ></textarea>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <div className="dragger">
                    <FileUploader setImages={setImages} Images={Images} />

                   
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-12">
                  <div className="unit-active-check d-flex align-items-center gap-2">
                    <input type="checkbox" className="" name="" id="" />{" "}
                    <span className="">This unit is active</span>
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-12">
                  <div className="notes-btn d-flex align-items-center justify-content-center gap-1 mt-5">
                    <button className="cancel-prev-btn">Cancel</button>
                    <button onClick={AddUnit} className="save-btn-same-class">
                      Save
                      {/* <img src={arrowRight} alt="" /> */}
                    </button>
                  </div>
                </div>
              </div>
            </TabPane>
            <TabPane tab="Leases" key="2">
              <SearchBar
                btnTitle="Add New Lease"
                onClick={() => {
                  navigate("/new-lease");
                }}
                leaseFilter={true}
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
                    className="table-responsive"
                    rowSelection={{
                      type: selectionType,
                      ...rowSelection,
                    }}
                    columns={leaseColumns}
                    dataSource={leaseData}
                  />
                </ConfigProvider>
              </div>
            </TabPane>
            <TabPane tab="Tenants" key="3">
              <SearchBar
                btnTitle="Add New Tenant"
                onClick={() => {
                  navigate("/add-tenant-details");
                }}
                tenantFilter={true}
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
                    className="table-responsive"
                    rowSelection={{
                      type: selectionType,
                      ...rowSelection,
                    }}
                    columns={tenantColumns}
                    dataSource={tenantData}
                  />
                </ConfigProvider>
              </div>
            </TabPane>
            <TabPane tab="Tasks" key="4">
              <SearchBar
                onClick={onOpenModalTask}
                btnTitle="Add New Task"
                taskFilter={true}
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
                    className="table-responsive"
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
              <SearchBar
                btnTitle="Add New File"
                notesFilter={true}
                route={`new-files?id=${id}`}
              />
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
                      },
                    }}
                  >
                    <Table
                      pagination={false}
                      className="table-responsive"
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
                    <div className="dragger">
                      <ConfigProvider
                        theme={{
                          components: {
                            Upload: {
                              // actionsColor: "red"
                              colorPrimaryHover: "#EF6B3E",
                              colorFillAlter: "#F9FAFB",
                              colorBorder: "rgba(147, 145, 141, 0.52)",
                            },
                          },
                        }}
                      >
                        <Dragger
                          multiple
                          action="http://localhost:3000/"
                          listType="picture"
                          accept=".png,.jpg,svg"
                          beforeUpload={(file) => {
                            console.log(file);
                            return false;
                          }}
                          onChange={(dragger) => {
                            console.log(dragger);
                          }}
                        >
                          <p className="ant-upload-drag-icon">
                            {/* <InboxOutlined className='primary-orange-text' /> */}
                            <img src={fileUploadIcon} alt="" />
                          </p>
                          <p className="ant-upload-text property-images-file-uploader-text">
                            <span className="property-images-file-uploader-text-unique">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="ant-upload-hint property-images-file-uploader-text">
                            {" "}
                            SVG, PNG, JPG
                          </p>
                        </Dragger>
                      </ConfigProvider>
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-md-12">
                    <div className="notes-btn d-flex align-items-center justify-content-center gap-1 mt-5">
                      <button className="cancel-prev-btn">Cancel</button>
                      <button className="save-btn-same-class">Save</button>
                    </div>
                  </div>
                </div>
              </div>
            </TabPane>
            <TabPane tab="Notes" key="6">
              {showNoteDetails === true ? (
                <>
                  <div className="notes-info-title">Notes Info</div>
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
                        <p>Plumbing issues</p>
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
                        <p>
                          It is a long established fact that a reader will be
                          distracted by the readable content of a page when
                          looking at its layout. The point of using Lorem Ipsum
                          is that it has a more-or-less normal distribution of
                          letters, as opposed to using 'Content here, content
                          here', making it look like readable English.
                        </p>
                      </div>
                      <div className="col-md-2"></div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <SearchBar
                    btnTitle="Add New Notes"
                    route={`add-notes?id=${id}`}
                    onClick={() => setShowAddNote(true)}
                    notesFilter={true}
                  />
                  <div className="row mt-4">
                    {notesData.length > 0 ? (
                      <>
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
                              },
                            }}
                          >
                            <Table
                              pagination={false}
                              className="scroll-remove property-notes-table"
                              rowSelection={{
                                type: selectionType,
                                ...rowSelection,
                              }}
                              columns={notesColumns}
                              dataSource={notesData}
                            />
                          </ConfigProvider>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="not-found-container text-center ">
                          <img src={NotFound} alt="" />
                          <p>
                            <strong>No Notes found</strong>
                          </p>
                          <p>
                            No Notes were found; the folder is empty. <br />
                            Please try again.
                          </p>
                          {/* <button className="not-found-add-task-btn primary-orange-text">
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
                            </button> */}
                        </div>
                      </>
                    )}
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

export default AddUnitDetails;
