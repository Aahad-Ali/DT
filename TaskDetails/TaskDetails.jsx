import React, { useState, useEffect } from "react";
import { Avatar, ConfigProvider, Tabs } from "antd";
import inProgressIcon from "assets/task-details-progress.png";
import DueDateIcon from "assets/task-details-due.png";
import settingIcon from "assets/three-dots.png";
import NotFound from "assets/not-found-img.png";
import FileUploader from "../FileUploader/FileUploader";
import settingIconOrange from "assets/dots-vertical.png";
import viewIcon from "assets/Icon.png";
import editIcon from "assets/edit-05.png";
import deleteIcon from "assets/trash-01.png";
import deleteIconOrange from "assets/trash-01 - Orange.png";
import trashIconWhite from "assets/trash-icon-white.png";
import { Table } from "antd";
import { useLocation, Link } from "react-router-dom";
import SearchBar from "../../Helpers/SearchBar";
import { message, Upload } from "antd";
import UseGetHook from "Hooks/UseGetHook";
import { useSelector } from "react-redux";
import DeleteModal from "Modals/DeleteModal/DeleteModal";
import EditTaskModal from "../EditTaskModal/EditTaskModal";

const { Dragger } = Upload;
const { TabPane } = Tabs;
const TaskDetails = () => {
  // States start
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [showAddNote, setShowAddNote] = useState(false);
  const [showAddFile, setShowAddFile] = useState(false);
  const [selectionType, setSelectionType] = useState("checkbox");
  const [selectedTableItem, setSelectedTableItem] = useState("");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [component, setcomponent] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [deleteNote, setDeleteNote] = useState(false);
  const [deleteFile, setDeleteFile] = useState(false);
  const [Images, setImages] = useState([]);
  const [DeletedImages, setDeletedImages] = useState([]);
  const [key, setKey] = useState([]);
  const [isHoveredView, setIsHoveredView] = useState(false);
  const [isHoveredDelete, setIsHoveredDelete] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [openEditModalTask, setOpenEditModalTask] = useState(false);
  const [update, setUpdate] = useState(false);
  const [taskId, setTaskId] = useState("");

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
  const OpenFileDeleteModal = () => {
    setDeleteFile(true);
  };
  const closeFileDeleteModal = () => {
    setDeleteFile(false);
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
  // Search Start
  const Search = useSelector((state) => {
    return state.Search.value;
  });

  // Search End
  // Fetch Data
  const formData = new FormData();
  const search = useLocation().search;
  const id = new URLSearchParams(search).get("id");
  const { fetchTask, TaskData } = UseGetHook("task", id);
  const { fetchUnit } = UseGetHook("unit");
  const { FetchTasksNotes, NoteData } = UseGetHook("notes", id);
  const { FetchTaskFile, fileData } = UseGetHook("files", id);
  const task = TaskData.filter((e) => e.id === id);
  useEffect(() => {
    fetchTask();
    // fetchTenantTask();
    fetchUnit();
    FetchTasksNotes();
    FetchTaskFile();
    console.log(TaskData, "TaskData");
  }, []);
  // Fetch Data End
  const handleMouseEnterView = () => {
    setIsHoveredView(true);
  };

  const handleMouseLeaveView = () => {
    setIsHoveredView(false);
  };

  const handleMouseEnterDelete = () => {
    setIsHoveredDelete(true);
  };

  const handleMouseLeaveDelete = () => {
    setIsHoveredDelete(false);
  };

  const handleIconClickCustom = () => {
    // Toggle the dropdown state when the icon is clicked
    setDropdownOpen(!isDropdownOpen);
  };

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
  // Form Input OnChanges
  // const handleChange = (value) => {
  //   console.log(`selected ${value}`);
  // };

  // Files Table

  const addTaskFiles = () => {
    formData.append("name", form.file_name);
    Images.forEach((file) => {
      formData.append("file", file);
    });
    formData.append("task", id);
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
      console.log(Images.length);
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
            FetchTaskFile();
          }
        })
        .catch((e) => console.log(e));
    }
    // }else {
    //   fetch(`${config["baseUrl"]}/api/file`, {
    //     method: "POST",
    //     headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    //     body: formData,
    //   })
    //     .then((res) => {
    //       return res.json();
    //     })
    //     .then((res) => {
    //       if (res.apiCallStatus === "success") {
    //         message.success("File Added Successfully");
    //         setShowAddFile(false);
    //         FetchTaskFile();
    //       }
    //     })
    //     .catch((e) => console.log(e));
    // }
  };
  const columns = [
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
                  <li className="list-style-none table-setting-dropdown-menu cursor">
                    {" "}
                    <img src={viewIcon} alt="" /> View
                  </li>
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
                    onMouseEnter={handleMouseEnterDelete}
                    onMouseLeave={handleMouseLeaveDelete}
                  >
                    {" "}
                    <img
                      src={isHoveredDelete ? deleteIconOrange : deleteIcon}
                      alt=""
                    />{" "}
                    Delete{" "}
                  </li>
                </ul>
              </div>
            )}
          </div>
        </>
      ),
    },
  ];
  const data = fileData
    .filter((data) => data.name.toLowerCase().includes(Search.toLowerCase()))
    .map((e, index) => ({
      key: index + 1,
      id: e.id,
      fileName: [e.file, e.name],
      property: "property 1",
      owner: e?.owner,
      date: new Date(e.created_at).toLocaleDateString(),
    }));
  // Files Table
  // Notes Table

  const config = require("Helpers/config.json");
  const addTaskNotes = () => {
    formData.append("name", noteForm.note_name);
    formData.append("description", noteForm.description);
    formData.append("task", id);
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
            FetchTasksNotes();
          }
        })
        .catch((e) => console.log(e));
    }

    // else {
    // fetch(`${config["baseUrl"]}/api/note`, {
    //   method: "POST",
    //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    //   body: formData,
    // })
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((res) => {
    //     if (res.apiCallStatus === "success") {
    //       message.success("Note Added Successfully");
    //       setShowAddNote(false);
    //       FetchTasksNotes();
    //     }
    //   })
    //   .catch((e) => console.log(e));
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
  // Notes Table
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
      // Column configuration not to be checked
      name: record.name,
    }),
  };
  const fetchDeleteFun = () => {
    if (component === "note") {
      FetchTasksNotes();
    } else {
      FetchTaskFile();
    }
  };
  return (
    <>
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
          route={"task-details"}
        />
      ) : (
        ""
      )}{" "}
      {openDeleteModal && (
        <DeleteModal
          onClose={onCloseDeleteModal}
          component="task"
          route="all-task"
          fetchFun={fetchTask}
          deleteBtnText="Delete Task"
          delId={id}
        />
      )}
      {openEditModalTask && (
        <EditTaskModal
          setUpdate={setUpdate}
          id={taskId}
          onClose={onCloseEditModalTask}
        />
      )}
      <div className="container-fluid bg-white p-3 ">
        <ConfigProvider
          theme={{
            components: {
              Tabs: {
                inkBarColor: "#EF6B3E",
                itemColor: "#667085",
                itemSelectedColor: "#EF6B3E",
                itemHoverColor: "#EF6B3E",
                titleFontSize: 15,
                horizontalItemGutter: window.innerWidth <= 425 ? 10 : 30,
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
              <div className="global-setting-icon">
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
                        onMouseEnter={handleMouseEnterView}
                        onMouseLeave={handleMouseLeaveView}
                      >
                        {" "}
                        <img src={editIcon} alt="" /> Edit
                      </li>
                      <li
                        onClick={setOpenDeleteModal}
                        className="list-style-none cursor lease-details-dropdown-icons"
                        onMouseEnter={handleMouseEnterDelete}
                        onMouseLeave={handleMouseLeaveDelete}
                      >
                        {" "}
                        <img
                          src={isHoveredDelete ? deleteIconOrange : deleteIcon}
                          alt=""
                        />{" "}
                        Delete
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              <div className="row mt-3">
                <div className="col-md-4">
                  <div className="task-overview-tab-boxes p-3 position-relative">
                    <div className="overview-box-img">
                      <img src={DueDateIcon} alt="" />
                    </div>
                    <div className="over-view-box-text">
                      <span>Due Date</span>
                      <h3>{new Date(task[0]?.dueDate).toLocaleDateString()}</h3>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="task-overview-tab-boxes p-3 position-relative">
                    <div className="overview-box-img">
                      <img src={inProgressIcon} alt="" />
                    </div>
                    <div className="over-view-box-text">
                      <span>Status</span>
                      <h2> {task[0]?.status}</h2>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="task-overview-tab-boxes p-3 position-relative">
                    <div className="overview-box-img">
                      <img src={DueDateIcon} alt="" />
                    </div>
                    <div className="over-view-box-text">
                      <span>Priority</span>
                      <div className="priority-box">
                        <h4>{task[0]?.priority}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-md-6">
                  <div className="task-info-heading">
                    <h4>TASK INFO</h4>
                  </div>
                  <div className="task-info-lists mt-3">
                    <p>
                      <span className="task-info-list-span me-3">Title:</span>{" "}
                      {task[0]?.title}
                    </p>
                    <p>
                      <span className="task-info-list-span me-3">
                        Assigned To :
                      </span>{" "}
                      {task[0]?.assignedTo[0]?.firstName ||
                        `${localStorage.getItem("name")} (Landlord)`}
                    </p>
                    <p>
                      <span className="task-info-list-span me-3">
                        Related To:
                      </span>{" "}
                      {task[0]?.property?.title}
                    </p>
                    <p>
                      <span className="task-info-list-span me-3">Unit:</span>{" "}
                      {task[0]?.unit?.name}
                    </p>
                    <p>
                      <span className="task-info-list-span me-3">
                        Description:
                      </span>{" "}
                      {task[0]?.description ? task[0]?.description : "-"}
                    </p>
                  </div>
                </div>
                <div className="col-md-6 text-end">
                  {
                    task[0]?.assignedTo[0]?.profileImage ?
                      <img
                        className="w-100 task-details-profileImg"
                        src={task[0]?.assignedTo[0]?.profileImage}
                        alt=""
                      />
                      :
                      <Avatar
                        style={{
                          backgroundColor: "#EF6B3E",
                          verticalAlign: "middle",
                        }}
                        size="large"
                      >
                        {task[0]?.assignedTo[0]?.firstName[0]}
                      </Avatar>
                  }

                </div>
              </div>
              <div className="row mt-3 border-top">
                <div className="task-info-heading mt-2">
                  <h4>Task HISTORY INFO</h4>
                  {TaskData[0]?.task_history?.map((data) => {
                    return (
                      <div className="task-overview-tab-boxes flex-column align-items-start p-3 position-relative mt-2">
                        <div className="over-view-box-text d-flex justify-content-between align-items-center w-100">
                          <p>
                            <span className="task-info-list-span">Status:</span>{" "}
                            <span className="ms-1 fw-semibold text-dark">
                              {data?.status ? data.status.toLocaleString() : ""}
                            </span>
                          </p>
                          <p>
                            <span className="task-info-list-span">Date:</span>{" "}
                            <span className="ms-1 fw-semibold text-dark">
                              {data?.date
                                ? new Date(data?.date).toLocaleDateString()
                                : ""}
                            </span>
                          </p>
                        </div>
                        <p>
                          <span className="task-info-list-span">
                            Description:
                          </span>{" "}
                          <span className="ms-1 fw-semibold text-dark">
                            {data?.description
                              ? data.description.toLocaleString()
                              : ""}
                          </span>
                        </p>
                      </div>
                    );
                  })}
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
                              addTaskNotes();
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
                            value={task[0]?.property?.title}
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
                          onClick={addTaskFiles}
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
                      <div className="table-container  mt-3">
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
                            className=""
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

export default TaskDetails;
