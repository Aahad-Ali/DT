import React, { useState, useEffect } from "react";
import { Avatar, ConfigProvider, Tabs } from "antd";
import inProgressIcon from "assets/task-details-progress.png";
import DueDateIcon from "assets/task-details-due.png";
import settingIcon from "assets/three-dots.png";
import userImg from "assets/over-user-img.png";
import NotFound from "assets/not-found-img.png";
import { Table } from "antd";
import viewIcon from "assets/Icon.png";
import editIcon from "assets/edit-05.png";
import deleteIcon from "assets/trash-01.png";
import trashIconWhite from "assets/trash-icon-white.png";
import { Link } from "react-router-dom";
import settingIconOrange from "assets/dots-vertical.png";
import SearchBar from "Helpers/SearchBar";
import chevronIconDown from "assets/chevron-down.png";
import { Upload } from "antd";
import UseGetHook from "Hooks/UseGetHook";
import UseUrlParamsHook from "Hooks/UseUrlParamsHook";
import UseFormDataHook from "Hooks/UseFormDataHook";
import { useSelector } from "react-redux";
import DeleteModal from "Modals/DeleteModal/DeleteModal";
import FileUploader from "Components/FileUploader/FileUploader";

const { Dragger } = Upload;
const { TabPane } = Tabs;

const WorkOrder = () => {
  // select box icon
  let dropdownIcon;
  dropdownIcon = (
    <>
      <img src={chevronIconDown} alt="" />
    </>
  );
  // States start
  const [showAddNote, setShowAddNote] = useState(false);
  const [showAddFile, setShowAddFile] = useState(false);
  const [selectionType, setSelectionType] = useState("checkbox");
  const [selectedTableItem, setSelectedTableItem] = useState("");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [component, setcomponent] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [deleteNote, setDeleteNote] = useState(false);
  const [deleteFile, setDeleteFile] = useState(false);
  const [key, setKey] = useState([]);
  const [description, setdescription] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isHoveredDelete, setIsHoveredDelete] = useState(false);
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

  const handleMouseEnterDelete = () => {
    setIsHoveredDelete(true);
  };

  const handleMouseLeaveDelete = () => {
    setIsHoveredDelete(false);
  };

  // Search Start
  const Search = useSelector((state) => {
    return state.Search.value;
  });
  // Search End
  // Fetch Data
  const formData = new FormData();
  const { id } = UseUrlParamsHook();
  const { fetchWorkOrderId, WorkOrderData } = UseGetHook("workorder", id);
  const { FetchWorkOrderNotes, NoteData } = UseGetHook("notes", id);
  const { FetchWorkOrderFile, fileData } = UseGetHook("files", id);
  useEffect(() => {
    fetchWorkOrderId();
    FetchWorkOrderNotes();
    FetchWorkOrderFile();
  }, []);

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
  // Files Table

  const addWorkOrderFiles = () => {
    formData.append("name", form.file_name);
    Images.forEach((file) => {
      formData.append("file", file);
    });
    formData.append("workOrder", id);
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
      UseFormDataHook("file", formData);
    }
  };
  const columns = [
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
  // Notes Data
  const addWorkOrderNotes = () => {
    formData.append("name", noteForm.note_name);
    formData.append("description", noteForm.description);
    formData.append("workOrder", id);
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
      UseFormDataHook("note", formData);
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
  // Notes Data
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
      // Column configuration not to be checked
      name: record.name,
    }),
  };
  const fetchDeleteFun = () => {
    if (component === "note") {
      FetchWorkOrderNotes();
    } else {
      FetchWorkOrderFile();
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
          route={"work-order"}
        />
      ) : (
        ""
      )}
      {openDeleteModal && (
        <DeleteModal
          onClose={onCloseDeleteModal}
          component="workorder"
          route="all-work-order"
          fetchFun={fetchWorkOrderId}
          deleteBtnText="Delete Word Order"
          delId={id}
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
                horizontalItemGutter: window.innerWidth <= 768 ? 10 : 60,
                fontFamily: "Montserrat",
              },
            },
          }}
        >
          <Tabs centered defaultActiveKey="1">
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
                      <li className="list-style-none cursor lease-details-dropdown-icons">
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
              <div className="row mt-3">
                <div className="col-md-4">
                  <div className="task-overview-tab-boxes p-3 position-relative">
                    <div className="overview-box-img">
                      <img src={DueDateIcon} alt="" />
                    </div>
                    <div className="over-view-box-text">
                      <span>Due Date</span>
                      <h3>
                        {WorkOrderData.map((e) =>
                          new Date(e.dueDate).toLocaleDateString()
                        )}
                      </h3>
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
                      <h2>{WorkOrderData.map((e) => e.status)}</h2>
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
                      <div className="priority-box mt-2">
                        <h4>{WorkOrderData.map((e) => e.priority)}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-5 work-order-profile-image">
                <div className="col-md-6">
                  <div className="task-info-heading">
                    <h4>TASK INFO</h4>
                  </div>
                  <div className="task-info-lists">
                    <p>
                      <span className="task-info-list-span me-3">Title:</span>{" "}
                      {WorkOrderData.map((e) => e.subject)}
                    </p>
                    {
                      console.log(WorkOrderData, 'wO get')
                    }
                    <p>
                      <span className="task-info-list-span me-3">
                        Assigned To :
                      </span>{" "}
                      {WorkOrderData.map((e) =>
                        e.assignedTo.map((f) => f.firstName)
                      )}
                    </p>
                    <p>
                      <span className="task-info-list-span me-3">
                        Related To:
                      </span>{" "}
                      {WorkOrderData.map((e) => e.property.title)}
                    </p>
                    <p>
                      <span className="task-info-list-span me-3">Unit:</span>{" "}
                      {WorkOrderData.map((e) => e.property.unit)}
                    </p>
                    <p>
                      <span className="task-info-list-span me-3">
                        Description:
                      </span>{" "}
                      {WorkOrderData.map((e) =>
                        e.description ? e.description : "-"
                      )}
                    </p>
                  </div>
                </div>
                <div className="col-md-6 text-end work-order-profile-image-alignment d-flex justify-content-end">
                  {/* <img src={userImg} alt="" /> */}

                  <Avatar
                    style={{
                      backgroundColor: "#ef6b3e",
                      verticalAlign: "middle",
                      border: '2px solid #fff',
                      width: '100px',
                      height: '100px',
                      display: 'flex',
                      alignItems: 'center'

                    }}
                    size="large"
                  >
                    {WorkOrderData.map((e) => (
                      e?.Images?.image ? (
                        <img src={e?.Images?.image} alt="Profile" />
                      ) : (
                        e?.assignedTo[0]?.firstName[0].toUpperCase()
                      )
                    ))}
                  </Avatar>
                </div>
              </div>
            </TabPane>
            <TabPane tab="Notes" key="2">
              {selectedNote !== null ? (
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
                        <p> {selectedNote.name[1]}</p>
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
                            className="cancel-btn"
                            onClick={() => setShowAddNote(false)}
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => {
                              addWorkOrderNotes();
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
                            value={WorkOrderData.map((e) => e.property.title)}
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
                          onClick={addWorkOrderFiles}
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

export default WorkOrder;
