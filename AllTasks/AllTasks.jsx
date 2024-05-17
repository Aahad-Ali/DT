import { useEffect, useState } from "react";
import { Table, ConfigProvider } from "antd";
import oval from "assets/Oval.png";
import { useNavigate, Link } from "react-router-dom";
import settingIcon from "assets/three-dots.png";
import viewIcon from "assets/Icon.png";
import editIcon from "assets/edit-05.png";
import completeIcon from "assets/calendar-check-01.png";
import postUpdateIcon from "assets/edit-3.png";
import deleteIcon from "assets/trash-01.png";
import trashIconWhite from "assets/trash-icon-white.png";
import PostUpdateModal from "Modals/PostUpdateModal/PostUpdateModal";
import AddNewTaskModal from "Modals/AddNewTaskModal/AddNewTaskModal";
import PaymentSuccessModal from "Modals/PaymentSuccessModal/PaymentSuccessModal";
import SearchBar from "Helpers/SearchBar";
import { useSelector } from "react-redux";
import UseGetHook from "Hooks/UseGetHook";
import DeleteModal from "Modals/DeleteModal/DeleteModal";
import Loader from "Helpers/Loader";
import EditTaskModal from "../EditTaskModal/EditTaskModal";
import ConditionalFilter from "Hooks/ConditionalFilter";
import CompleteTask from "Helpers/CompleteTask";
import BulkDelete from "Hooks/BulkDelete";
import UserPermission from "libs/UserPermission";
import SearchBarWithOutBtn from "Helpers/SearchBarWithOutBtn";
const AllTasks = () => {
  // States start
  const [selectionType, setSelectionType] = useState("checkbox");
  const [selectedTableItem, setSelectedTableItem] = useState("");
  const [openModalPostUpdate, setOpenModalPostUpdate] = useState(false);
  const [openModalTask, setOpenModalTask] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [key, setKey] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [DeleteId, setDeleteId] = useState("");
  const [taskId, setTaskId] = useState("");
  const [openEditModalTask, setOpenEditModalTask] = useState(false);
  const [update, setUpdate] = useState(false);
  // States end
  const { ROLE } = UserPermission()
  const search = useSelector((state) => {
    return state.Search.value;
  });
  // Fetch Data
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
  const handleTaskComplete = (id) => {
    const { completeStatus } = CompleteTask(id);
    completeStatus();
  };
  const { filters, FilterObjects } = ConditionalFilter({
    range,
    property,
    fromDate,
    toDate,
  });
  const { fetchTask, TaskData, loader } = UseGetHook(
    filters(FilterObjects) ? `tasks/filter?${filters(FilterObjects)}` : "tasks"
  );
  console.log(TaskData, "task status");
  useEffect(() => {
    fetchTask();
  }, [range, property, fromDate, toDate]);
  useEffect(() => {
    if (update) {
      fetchTask();
      setUpdate(false);
    }
  }, [update]);
  // Fetch Data End
  const navigate = useNavigate();
  const onOpenDeleteModal = () => {
    setOpenDeleteModal(true);
  };
  const onCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  // Modal Function
  const onOpenModalPostUpdate = () => {
    setOpenModalPostUpdate(true);
  };
  const onCloseModalPostUpdate = () => {
    setOpenModalPostUpdate(false);
  };
  const onOpenEditModalTask = () => {
    setOpenEditModalTask(true);
  };
  const onCloseEditModalTask = () => {
    setOpenEditModalTask(false);
  };
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

  // Data Table functions

  const data = TaskData.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase())
  ).map((e) => ({
    key: e.id,
    title: e.title,
    img: e.image,
    assigned: e.assignedTo.map((e) => e.firstName).join(", "),
    assignedToMe: localStorage.getItem("name"),
    due:
      !e.due && !e.priority
        ? "Not Set"
        : [new Date(e.dueDate).toLocaleDateString(), e.priority],
    related: e?.property?.title,
    status: e.status || "N/A",
  }));
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
                  {
                    localStorage.getItem("role") !== "landlord" && localStorage.getItem("role") === "user" && ROLE[0]?.task.update ?
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
                      :
                      localStorage.getItem("role") === "landlord" ?
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
                        : ""
                  }
                  {
                    localStorage.getItem("role") !== "landlord" && localStorage.getItem("role") === "user" && ROLE[0]?.task.update ?
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
                      :
                      localStorage.getItem("role") === "landlord" ?
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
                        : ""
                  }
                  {
                    localStorage.getItem("role") !== "landlord" && localStorage.getItem("role") === "user" && ROLE[0]?.task.update ?
                      <li
                        onClick={() => handleTaskComplete(setting.key)}
                        className="list-style-none table-setting-dropdown-menu"
                      >
                        {" "}
                        <img src={completeIcon} alt="" /> Complete
                      </li>
                      :
                      localStorage.getItem("role") === "landlord" ?
                        <li
                          onClick={() => handleTaskComplete(setting.key)}
                          className="list-style-none table-setting-dropdown-menu"
                        >
                          {" "}
                          <img src={completeIcon} alt="" /> Complete
                        </li>
                        : ""
                  }
                  {

                    localStorage.getItem("role") !== "landlord" && localStorage.getItem("role") === "user" && ROLE[0]?.task.delete ?
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

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      setSelectedTableItem([...selectedRowKeys]);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };
  const { bulkDelete } = BulkDelete("task", selectedTableItem, fetchTask);
  const DeleteSelected = () => {
    bulkDelete();
  };
  return (
    <>
      {openDeleteModal === true ? (
        <DeleteModal
          onClose={onCloseDeleteModal}
          component="task"
          setUpdate={setUpdate}
          route="all-task"
          deleteBtnText="Delete Task"
          delId={DeleteId}
        />
      ) : (
        ""
      )}
      {openModalPostUpdate === true ? (
        <PostUpdateModal
          onOpen={onOpenModalPostUpdate}
          onClose={onCloseModalPostUpdate}
          id={taskId}
        />
      ) : (
        ""
      )}
      {openModalTask === true ? (
        <AddNewTaskModal setUpdate={setUpdate} onOpen={onOpenModal} onClose={onCloseModalTask}
        />
      ) : (
        ""
      )}
      {openModal === true ? (
        <PaymentSuccessModal
          onClose={onCloseModal}
          message="Task details inserted successfully"
          success="All Tasks"
        />
      ) : (
        ""
      )}
      {openEditModalTask && (
        <EditTaskModal
          setUpdate={setUpdate}
          id={taskId}
          onClose={onCloseEditModalTask}
        />
      )}
      <div className="container-fluid bg-white p-3">
        <div className="row">
          <div className="col-md-12">
            {

              localStorage.getItem("role") !== "landlord" && localStorage.getItem("role") === "user" && ROLE[0]?.task.add ?

                <SearchBar
                  innerPage={false}
                  onClick={onOpenModalTask}
                  btnTitle="Add New Task"
                  taskFilter={true}
                />
                :
                localStorage.getItem("role") === "landlord" ?
                  <SearchBar
                    innerPage={false}
                    onClick={onOpenModalTask}
                    btnTitle="Add New Task"
                    taskFilter={true}
                  />
                  : <SearchBarWithOutBtn innerPage={false} taskFilter={true} />


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
        <>
          <div className="task-table-container  mt-3">
            {loader ? (
              <>
                <Loader />
              </>
            ) : (
              <ConfigProvider
                theme={{
                  components: {
                    Table: {
                      colorTextHeading: "#667085",
                      colorText: "#667085",
                      fontSize: 12,
                      fontWeightStrong: 500,
                      fontFamily: "Montserrat",
                      padding: 10,
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
                  className="all-task-table"
                  rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                  }}
                  columns={columns}
                  dataSource={data}
                />
              </ConfigProvider>
            )}
          </div>
        </>
      </div>
    </>
  );
};

export default AllTasks;
