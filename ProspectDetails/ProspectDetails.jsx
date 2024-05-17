import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ConfigProvider, Tabs, Avatar } from "antd";
import leaseStatusIcon from "assets/lease-status.png";
import leaseRentIcon from "assets/lease-rent.png";
import leaseBalanceIcon from "assets/lease-balance.png";
import settingIcon from "assets/three-dots.png";
import settingIconOrange from "assets/dots-vertical.png";
import ownerImage from "assets/Oval.png";
import NotFound from "assets/not-found-img.png";
import { Table } from "antd";
import { useNavigate, Link } from "react-router-dom";
import trashIconWhite from "assets/trash-icon-white.png";
import SearchBar from "Helpers/SearchBar";
import viewIcon from "assets/Icon.png";
import editIcon from "assets/edit-05.png";
import deleteIcon from "assets/trash-01.png";
import endLeaseIcon from "assets/End Lease.png";
import { message } from "antd";
import UseGetHook from "Hooks/UseGetHook";
import UseUrlParamsHook from "Hooks/UseUrlParamsHook";
import FileUploader from "Components/FileUploader/FileUploader";
import AddProspectDetailsEditModal from "Modals/AddProspectDetailsEditModal/AddProspectDetailsEditModal";
import DeleteModal from "Modals/DeleteModal/DeleteModal";
const { TabPane } = Tabs;

const ProspectDetails = () => {
  // States start
  const [showNoteDetails, setShowNoteDetails] = useState(false);
  const [showAddNotes, setShowAddNote] = useState(false);
  const [showAddFile, setShowAddFile] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectionType, setSelectionType] = useState("checkbox");
  const [filename, setFileName] = useState("");
  const [selectedTableItem, setSelectedTableItem] = useState("");
  const [Images, setImages] = useState([]);
  const [openEditModalTask, setOpenEditModalTask] = useState(false);
  const [taskId, setTaskId] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isHoveredDelete, setIsHoveredDelete] = useState(false);
  const [description, setdescription] = useState("");
  const [name, setName] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [component, setcomponent] = useState("");
  const [deleteNote, setDeleteNote] = useState(false);
  const [deleteFile, setDeleteFile] = useState(false);
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
  const OpenNoteDeleteModal = () => {
    setDeleteNote(true);
  };
  const closeNoteDeleteModal = () => {
    setDeleteNote(false);
  };
  const onOpenEditModalTask = () => {
    setOpenEditModalTask(true);
  };
  const onCloseEditModalTask = () => {
    setOpenEditModalTask(false);
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
  const OpenFileDeleteModal = () => {
    setDeleteFile(true);
  };
  const handleMouseLeaveDelete = () => {
    setIsHoveredDelete(false);
  };
  const closeFileDeleteModal = () => {
    setDeleteFile(false);
  };
  const Search = useSelector((state) => {
    return state.Search.value;
  });
  // Fetch Data
  const formData = new FormData();

  const { id } = UseUrlParamsHook();
  const { fetchProspectId, ProspectData } = UseGetHook("prospect", id);
  const { FetchProspectNotes, NoteData } = UseGetHook("notes", id);
  const { FetchProspectFile, fileData } = UseGetHook("files", id);

  useEffect(() => {
    fetchProspectId();
    FetchProspectFile();
    FetchProspectNotes();
  }, []);
  const [value, setValue] = useState();
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
    if (e.target.value === 1) {
      navigate("/renew-lease");
    } else {
      navigate("/non-renew-lease");
    }
  };

  const config = require("Helpers/config.json");

  const addProspectNotes = () => {
    formData.append("name", noteForm.note_name);
    formData.append("description", noteForm.description);
    formData.append("prospect", id);
    Images.forEach((file) => {
      formData.append("file", file);
    });
    // console.log(name, description, Images.length);
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
            FetchProspectNotes();
          } else {
            message.error(res.error.message);
          }
        })
        .catch((e) => console.log(e));
    }
  };
  const [key, setKey] = useState([]);
  const navigate = useNavigate();
  const handleIconClickCustom = () => {
    // Toggle the dropdown state when the icon is clicked
    setDropdownOpen(!isDropdownOpen);
  };
  // Data Table Functions
  const handleIconClick = (result) => {
    // Toggle the dropdownOpen state
    const filterData = notesData.filter((item) => {
      return item.key === result;
    });
    setKey(filterData[0].key);
    if (key === result) {
      setKey(null);
    } else {
      setKey(result);
    }
  };
  const notesColumns = [
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

  const notesData = NoteData.filter((data) =>
    data.name.toLowerCase().includes(Search.toLowerCase())
  ).map((e, index) => ({
    key: index + 1,
    id: e.id,
    name: [e.file, e.name],
    description: e.description,
    uploadedDate: new Date(e.modified_at).toLocaleDateString(),
  }));

  const addProspectFiles = () => {
    formData.append("name", form.file_name);
    Images.forEach((file) => {
      formData.append("file", file);
    });
    formData.append("prospect", id);
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
            FetchProspectFile();
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
      render: (text, fileName) => (
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
      render: (text, property) => (
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
  // Drag Drop Function
  const props = {
    name: "file",
    multiple: true,
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    onChange(info) {
      const { status } = info.file;
      console.log(status);
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file uploopenDeleteModald failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  const fetchDeleteFun = () => {
    if (component === "note") {
      FetchProspectNotes();
    } else {
      FetchProspectFile();
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
      )}
      {deleteFile ? (
        <DeleteModal
          onClose={closeFileDeleteModal}
          component={component}
          fetchFun={fetchDeleteFun}
          deleteBtnText={`Delete ${component}`}
          delId={deleteId}
          route={"prospect-details"}
        />
      ) : (
        ""
      )}
      {openEditModalTask && (
        <AddProspectDetailsEditModal
          id={taskId}
          onClose={onCloseEditModalTask}
        />
      )}
      ,
      {openDeleteModal && (
        <DeleteModal
          onClose={onCloseDeleteModal}
          component={component}
          route="all-prospect"
          fetchFun={fetchProspectId}
          deleteBtnText={`Delete ${component}`}
          delId={id}
        />
      )}
      <div className="container-fluid bg-white p-3">
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
                  <li
                    onClick={() => {
                      onOpenEditModalTask();
                      setTaskId(id);
                    }}
                    className="list-style-none cursor lease-details-dropdown-icons"
                  >
                    {" "}
                    <img src={endLeaseIcon} alt="" /> Edit
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
          <Tabs centered defaultActiveKey="1" style={{ fontWeight: 500 }}>
            <TabPane tab="Overview" key="1">
              <div className="row mt-3">
                <div className="col-md-4">
                  <div className="task-overview-tab-boxes p-3 position-relative">
                    <div className="overview-box-img">
                      <img src={leaseBalanceIcon} alt="" />
                    </div>
                    <div className="over-view-box-text">
                      <span>Balance</span>
                      <h3>$1200</h3>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="task-overview-tab-boxes p-3 position-relative">
                    <div className="overview-box-img">
                      <img src={leaseStatusIcon} alt="" />
                    </div>
                    <div className="over-view-box-text">
                      <span>Lease Status</span>
                      <p className="active-label pb-0 mb-0"></p>
                      <h2>Active</h2>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="task-overview-tab-boxes p-3 position-relative">
                    <div className="overview-box-img">
                      <img src={leaseRentIcon} alt="" />
                    </div>
                    <div className="over-view-box-text">
                      <span>Rent</span>
                      <h3>$4000</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-md-6">
                  <div className="task-info-heading">
                    <h4>LEASE INFO</h4>
                  </div>
                  <div className="task-info-lists mt-4">
                    <p>
                      <span className="task-info-list-span me-3">
                        Tenant Name:
                      </span>{" "}
                      {ProspectData.map((e) => e.firstName)}
                    </p>
                    <p>
                      <span className="task-info-list-span me-3">Address:</span>
                      {ProspectData.map((e) => e.address.address_line_1)}
                    </p>
                    <p>
                      <span className="task-info-list-span me-3">Unit:</span>{" "}
                      4570 Griffin Street{" "}
                    </p>
                    <p>
                      <span className="task-info-list-span me-3">
                        Lease Term:
                      </span>{" "}
                      Month-to-Month{" "}
                    </p>
                    <p>
                      <span className="task-info-list-span me-3">
                        Lease Term Start Date:
                      </span>{" "}
                      12/12/23
                    </p>
                    <p>
                      <span className="task-info-list-span me-3">
                        Lease Term End Date:
                      </span>{" "}
                      12/12/23
                    </p>
                    <p>
                      <span className="task-info-list-span me-3">Deposit:</span>{" "}
                      $1900.00
                    </p>
                    <p>
                      <span className="task-info-list-span me-3">
                        Documents:
                      </span>{" "}
                      Lease paper-2
                    </p>
                  </div>
                </div>
                <div className="col-md-6 text-end image-size-reduce ">
                  <img
                    src={`${ProspectData.map((e) => e.profileImage)}`}
                    alt=""
                  />
                </div>
              </div>
            </TabPane>
            {/* <TabPane tab="Rent" key="2">
              <SearchBar btnTitle="Add New File" />
              <div className="row mt-2">
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
            </TabPane>
            <TabPane tab="Deposit" key="3">
              <SearchBar btnTitle="Add New File" />
              <div className="row mt-2">
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
            </TabPane> */}
            <TabPane tab="Notes" key="4">
              {showAddNotes ? (
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
                            className="cancel-btn"
                            onClick={() => setShowAddNote(false)}
                          >
                            Cancel
                          </button>
                          <button
                            className="save-btn"
                            onClick={addProspectNotes}
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
            <TabPane tab="Files" key="6">
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
                          onClick={addProspectFiles}
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
                            className=""
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

export default ProspectDetails;
