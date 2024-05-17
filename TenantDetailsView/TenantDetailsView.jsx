import React, { useEffect, useState } from "react";
import { Tabs, ConfigProvider, Table, Upload, message, Avatar } from "antd";
import depositsHeldIcon from "assets/lease-balance.png";
import monthlyRentIcon from "assets/lease-rent.png";
import depositHeldSecondIcon from "assets/Deposit Held icon second.png";
import NotFound from "assets/not-found-img.png";
import editIcon from "assets/edit-05.png";
import viewIcon from "assets/Icon.png";
import deleteIcon from "assets/trash-01.png";
import settingIcon from "assets/three-dots.png";
import trashIconWhite from "assets/trash-icon-white.png";
import SearchBar from "Helpers/SearchBar";
import { Link, useNavigate } from "react-router-dom";
import UseGetHook from "Hooks/UseGetHook";
import UseUrlParamsHook from "Hooks/UseUrlParamsHook";
import { useSelector } from "react-redux";
import settingIconOrange from "assets/dots-vertical.png";
import FileUploader from "Components/FileUploader/FileUploader";
import AddTenantDetailsEditModal from "Modals/AddTenantDetailsEditModal/AddTenantDetailsEditModal";
import DeleteModal from "Modals/DeleteModal/DeleteModal";

const { Dragger } = Upload;

const TenantDetailsView = () => {
  // States start
  const [showNoteDetails, setShowNoteDetails] = useState(false);
  const [showAddNote, setShowAddNote] = useState(false);
  const [selectionType, setSelectionType] = useState("checkbox");
  const [showAddFile, setShowAddFile] = useState(false);
  const [selectedTableItem, setSelectedTableItem] = useState("");
  const [key, setKey] = useState([]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [component, setcomponent] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [deleteNote, setDeleteNote] = useState(false);
  const [deleteFile, setDeleteFile] = useState(false);
  const [filename, setFileName] = useState("");
  const [name, setName] = useState("");
  const [description, setdescription] = useState("");
  const [Images, setImages] = useState([]);
  const [openEditModalTask, setOpenEditModalTask] = useState(false);
  const [taskId, setTaskId] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isHoveredDelete, setIsHoveredDelete] = useState(false);
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

  const { TabPane } = Tabs;

  const formData = new FormData();
  const OpenNoteDeleteModal = () => {
    setDeleteNote(true);
  };
  const closeNoteDeleteModal = () => {
    setDeleteNote(false);
  };
  const OpenFileDeleteModal = () => {
    setDeleteFile(true);
  };
  const closeFileDeleteModal = () => {
    setDeleteFile(false);
  }; // Search Start
  const Search = useSelector((state) => {
    return state.Search.value;
  });
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
  // Search End

  const handleIconClickCustom = () => {
    // Toggle the dropdown state when the icon is clicked
    setDropdownOpen(!isDropdownOpen);
  };
  const navigate = useNavigate();
  // Fetch Data
  const { id } = UseUrlParamsHook();
  const { FetchTenantId, TenantData } = UseGetHook("tenant", id);
  const { FetchTenantNotes, NoteData } = UseGetHook("notes", id);
  const { FetchTenantFile, fileData } = UseGetHook("files", id);
  useEffect(() => {
    FetchTenantId();
    FetchTenantNotes();
    FetchTenantFile();
  }, []);
  // Data Table Functions
  const handleIconClick = (result) => {
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
  // Notes Table
  const config = require("Helpers/config.json");

  const addTenantNotes = () => {
    formData.append("name", noteForm.note_name);
    formData.append("description", noteForm.description);
    formData.append("tenant", id);
    Images.forEach((file) => {
      formData.append("file", file);
    });
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
            FetchTenantNotes();
          } else {
            message.error(res.error.message);
          }
        })
        .catch((e) => console.log(e));
    }
  };
  const notescolumns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, name) => (
        <>
          <span
            onClick={() => setSelectedNote(name)}
            className="property-table-name-text cursor"
          >
            <img className="mh_40 mw_40 rounded-5" src={`${text[0]}`} alt="" />{" "}
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
      render: (text, record) => (
        <>
          <div className="task-table-setting-container position-relative cursor">
            <img
              src={settingIcon}
              alt=""
              onClick={() => handleIconClick(record.key)}
            />
            {record.key === key && (
              <div className="all-files-table-setting-dropdown bg-white box-shadow">
                <ul className="p-0 d-flex flex-column gap-3">
                  <li
                    onClick={() => setSelectedNote(record)}
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
                      setDeleteId(record.id);
                      setcomponent("note");
                      OpenFileDeleteModal();
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
  const data = NoteData.filter((data) =>
    data.name.toLowerCase().includes(Search.toLowerCase())
  ).map((e, index) => ({
    key: index + 1,
    id: e.id,
    name: [e.file, e.name],
    description: e.description,
    uploadedDate: new Date(e.modified_at).toLocaleDateString(),
  }));
  // Notes Table End
  // Files table

  const addTenantFiles = () => {
    formData.append("name", form.file_name);
    Images.forEach((file) => {
      formData.append("file", file);
    });
    formData.append("tenant", id);
    const newErrors = {};
    for (const key in form) {
      if (form[key] === "") {
        newErrors[key] = `${key} is required`;
      }
    }
    setErrors(newErrors);
    if (Images.length === 0) {
      newErrors["files"] = `file is required`;
    }
    if (Object.keys(newErrors).length === 0 && Images.length !== 0) {
      fetch(`${config["baseUrl"]}/api/file`, {
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
            FetchTenantFile();
          } else {
            message.error(res.error.message);
          }
        })
        .catch((e) => console.log(e));
    }
  };
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
                      OpenFileDeleteModal();
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
      property: "property 1",
      owner: e?.owner,
      date: new Date(e.created_at).toLocaleDateString(),
    }));
  // Files table end
  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      console.log(selectedTableItem.length);
      setSelectedTableItem(selectedRowKeys);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };
  const fetchDeleteFun = () => {
    if (component === "note") {
      FetchTenantNotes();
    } else {
      FetchTenantFile();
    }
  };
  return (
    <>
      {" "}
      {deleteNote ? (
        <DeleteModal
          onClose={closeNoteDeleteModal}
          component={component}
          fetchFun={fetchDeleteFun}
          deleteBtnText={`Delete ${component}`}
          delId={deleteId}
        />
      ) : (
        ""
      )}{" "}
      {deleteFile ? (
        <DeleteModal
          onClose={closeFileDeleteModal}
          component={component}
          fetchFun={fetchDeleteFun}
          deleteBtnText={`Delete ${component}`}
          delId={deleteId}
          route={"tenant-details-view"}
        />
      ) : (
        ""
      )}
      {openEditModalTask && (
        <AddTenantDetailsEditModal id={taskId} onClose={onCloseEditModalTask} />
      )}{" "}
      {openDeleteModal && (
        <DeleteModal
          onClose={onCloseDeleteModal}
          component="tenant"
          route="all-tenants"
          fetchFun={FetchTenantId}
          deleteBtnText="Delete Tenant"
          delId={id}
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
                  <li
                    onClick={() => {
                      onOpenEditModalTask();
                      setTaskId(id);
                    }}
                    className="list-style-none cursor lease-details-dropdown-icons"
                  >
                    {" "}
                    <img src={editIcon} alt="" /> Edit
                  </li>
                  <li
                    onClick={setOpenDeleteModal}
                    onMouseEnter={handleMouseEnterDelete}
                    onMouseLeave={handleMouseLeaveDelete}
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
            centered
            defaultActiveKey="1"
            style={{ fontWeight: 500 }}
            className="property_details_view_tabs"
          >
            <TabPane tab="Overview" key="1">
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
              {
                console.log(TenantData
                  ,'dsgfsty'
                )
              }
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
                          {TenantData[0]?.firstName}
                        </p>
                      </div>
                      <div className="col-md-4">
                        <p>
                          <span className="task-info-list-span me-3">
                            Middle Name:
                          </span>{" "}
                          {TenantData[0]?.middleName}
                        </p>
                      </div>
                      <div className="col-md-4">
                        <p>
                          <span className="task-info-list-span me-3">
                            Last Name:
                          </span>{" "}
                          {TenantData[0]?.lastName}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <p>
                          <span className="task-info-list-span me-3">
                            Email:
                          </span>
                          {TenantData[0]?.email}
                        </p>
                      </div>
                      <div className="col-md-4"></div>
                      <div className="col-md-4">
                        <p>
                          <span className="task-info-list-span me-3">
                            Phone No:
                          </span>{" "}
                          {TenantData[0]?.phone}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <p>
                          <span className="task-info-list-span me-3">
                            Date of Birth:
                          </span>{" "}
                          {new Date(TenantData[0]?.additional_info?.dob).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="col-md-4"></div>
                      <div className="col-md-4">
                        <p>
                          <span className="task-info-list-span me-3">
                            Gender:
                          </span>{" "}
                          {TenantData[0]?.gender}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <p>
                          <span className="task-info-list-span me-3">
                            Current Address:
                          </span>{" "}
                          {TenantData[0]?.address}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <p>
                          <span className="task-info-list-span me-3">
                            Previous Address:
                          </span>{" "}
                          N/A
                        </p>
                      </div>
                      <div className="col-md-2"></div>
                      <div className="col-md-4">
                        <p>
                          <span className="task-info-list-span me-3">
                            Rent Amount:
                          </span>{" "}
                          ${TenantData[0]?.additional_info?.lease?.rent_amount?.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <p>
                          <span className="task-info-list-span me-3">
                            Lease Term:
                          </span>{" "}
                          {TenantData[0]?.additional_info?.lease?.lease_term}
                        </p>
                      </div>
                      <div className="col-md-4">
                        <p>
                          <span className="task-info-list-span me-3">
                            Lease Term Start Date:
                          </span>
                          {new Date(TenantData[0]?.additional_info?.lease?.lease_term_start_date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="col-md-4">
                        <p>
                          <span className="task-info-list-span me-3">
                            Lease Term Last Date:
                          </span>{" "}
                          {new Date(TenantData[0]?.additional_info?.lease?.lease_term_end_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-2 text-end mt-5">
                  <img
                    className="img-fluid rounded-5"
                    src={`${TenantData[0]?.profileImage}`}
                    alt=""
                  />
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
                          {TenantData[0]?.additional_info?.dependent_info?.first_name}
                        </p>
                      </div>
                      <div className="col-md-4">
                        <p>
                          <span className="task-info-list-span me-3">
                            Middle Name:
                          </span>{" "}
                          {TenantData[0]?.additional_info?.dependent_info?.middle_name}
                        </p>
                      </div>
                      <div className="col-md-4">
                        <p>
                          <span className="task-info-list-span me-3">
                            Last Name:
                          </span>{" "}
                          {TenantData[0]?.additional_info?.dependent_info?.last_name}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <p>
                          <span className="task-info-list-span me-3">
                            Email:
                          </span>{" "}
                          {TenantData[0]?.additional_info?.emergency_info[0]?.email}
                        </p>
                      </div>
                      <div className="col-md-4">
                        <p>
                          <span className="task-info-list-span me-3">
                            Phone No:
                          </span>{" "}
                          {TenantData[0]?.additional_info?.emergency_info[0]?.phone}
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
                          {TenantData[0]?.additional_info?.emergency_info[0]?.relationship}
                        </p>
                      </div>
                      <div className="col-md-8">
                        <p>
                          <span className="task-info-list-span me-3">
                            Description:
                          </span>{" "}
                          {TenantData[0]?.additional_info?.emergency_info[0]?.description}
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
                          {TenantData[0]?.additional_info?.pet_info?.map((f) => f?.pet_type)}
                        </p>
                      </div>
                      <div className="col-md-4">
                        <p>
                          <span className="task-info-list-span me-3">
                            Name:
                          </span>{" "}
                          {TenantData[0]?.additional_info?.pet_info?.map((f) => f?.name)}
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
                          {TenantData[0]?.additional_info?.pet_info?.map((f) => f?.breed)}
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
                          {TenantData[0]?.additional_info?.vehicle_info?.map((f) => f?.vehicle_type)}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <p>
                          <span className="task-info-list-span me-3">
                            Make:
                          </span>{" "}
                          {TenantData[0]?.additional_info?.vehicle_info?.map((f) => f?.make)}
                        </p>
                      </div>
                      <div className="col-md-4">
                        <p>
                          <span className="task-info-list-span me-3">
                            Model:
                          </span>{" "}
                          {TenantData[0]?.additional_info?.vehicle_info?.map((f) => f?.model)}
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
                          {TenantData[0]?.additional_info?.vehicle_info?.map((f) => f?.year)}
                        </p>
                      </div>
                      <div className="col-md-4">
                        <p>
                          <span className="task-info-list-span me-3">
                            Color:
                          </span>{" "}
                          {TenantData[0]?.additional_info?.vehicle_info?.map((f) => f?.color)}
                        </p>
                      </div>
                      <div className="col-md-4">
                        <p>
                          <span className="task-info-list-span me-3">
                            License Plate:
                          </span>{" "}
                          {TenantData[0]?.additional_info?.vehicle_info?.map((f) => f?.license)}
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
                          {TenantData[0]?.additional_info?.dependent_info?.first_name}
                        </p>
                      </div>
                      <div className="col-md-4">
                        <p>
                          <span className="task-info-list-span me-3">
                            Middle Name:
                          </span>{" "}
                          {TenantData[0]?.additional_info?.dependent_info?.middle_name}
                        </p>
                      </div>
                      <div className="col-md-4">
                        <p>
                          <span className="task-info-list-span me-3">
                            Last Name:
                          </span>{" "}
                          {TenantData[0]?.additional_info?.dependent_info?.last_name}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <p>
                          <span className="task-info-list-span me-3">
                            Date of Birth:
                          </span>{" "}
                          {new Date(TenantData[0]?.additional_info?.dependent_info?.dob).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="col-md-4"></div>
                      <div className="col-md-4">
                        <p>
                          <span className="task-info-list-span me-3">
                            Relationship:
                          </span>{" "}
                          {TenantData[0]?.additional_info?.dependent_info?.relationship}
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
                          <span className="task-info-list-span"></span>{" "}
                          {TenantData[0]?.additional_info?.notes}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabPane>
            <TabPane tab="Notes" key="2">
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
                            className="back-prev-btn"
                            onClick={() => setShowAddNote(false)}
                          >
                            Cancel
                          </button>
                          <button
                            className="save-btn-same-class"
                            onClick={addTenantNotes}
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
                    {selectedTableItem.length >= 1 && (
                      <div className="table-delete-icon mt-3">
                        <button className="table-delete-btn next-btn-main">
                          <img src={trashIconWhite} />
                          Delete
                        </button>
                      </div>
                    )}
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
                          columns={notescolumns}
                          dataSource={data}
                        />
                      </ConfigProvider>
                    </div>
                  </div>
                </>
              )}
            </TabPane>
            <TabPane tab="Files" key="3">
              {showAddFile === true ? (
                <>
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
                            value="ABC Property"
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
                          Upload Media
                          <span className="sign-up-imp-star">*</span>
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
                          className="cancel-btn"
                          onClick={() => setShowAddFile(false)}
                        >
                          Cancel
                        </button>
                      </div>
                      <div className="col-md-6">
                        <button
                          onClick={addTenantFiles}
                          className="save-btn  w-100"
                        >
                          Add File
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <SearchBar
                    btnTitle="Add New File"
                    onClick={() => setShowAddFile(true)}
                    notesFilter={true}
                  />
                  <div className="row">
                    <div className="col-md-12">
                      {selectedTableItem.length >= 1 && (
                        <div className="table-delete-icon mt-3">
                          <button className="table-delete-btn next-btn-main">
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
                                //colorTextDescription: '#667085',
                                colorText: "#667085",
                                fontSize: 14,
                                fontWeightStrong: 500,
                                fontFamily: "Montserrat",
                                //cellFontSize: 14,
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
                            columns={filesColumns}
                            dataSource={filesData}
                          />
                        </ConfigProvider>
                      </div>
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
            </TabPane>
          </Tabs>
        </ConfigProvider>
      </div>
    </>
  );
};

export default TenantDetailsView;
