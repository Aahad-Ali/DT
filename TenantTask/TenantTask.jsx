import { ConfigProvider, Table } from "antd";
import React, { useEffect, useState } from "react";
import SearchBar from "Helpers/SearchBar";
import trashIconWhite from "assets/trash-icon-white.png";
import UseGetHook from "Hooks/UseGetHook";
import { Link } from "react-router-dom";
import settingIcon from "assets/three-dots.png";
import viewIcon from "assets/Icon.png";
import { useSelector } from "react-redux";
import TenantTaskModal from "Modals/TenantTaskModal/TenantTaskModal";
const TenantTask = () => {
  // States
  const [selectedTableItem, setSelectedTableItem] = useState("");
  const [openModalTask, setOpenModalTask] = useState(false);
  const [openEditModalTask, setOpenEditModalTask] = useState(false);
  const [selectionType, setSelectionType] = useState("checkbox");
  const [key, setKey] = useState([]);
  const search = useSelector((state) => {
    return state.Search.value;
  });

  const onOpenModalTask = () => {
    setOpenModalTask(true);
  };
  const onCloseModalTask = () => {
    setOpenModalTask(false);
  };
  const onOpenEditModalTask = () => {
    setOpenEditModalTask(true);
  };
  const onCloseEditModalTask = () => {
    setOpenEditModalTask(false);
  };
  // States End
  // Fetch Data
  const { fetchTask, fetchTenantTask, TenantTaskData, loader } =
    UseGetHook("tasks");
  useEffect(() => {
    fetchTenantTask();
    // if (localStorage.getItem("role") === "") {
    //   fetchTask();
    // } else {
    //   fetchTenantTask();
    // }
  }, []);
  // Fetch Data End
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
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      render: (text, task) => (
        <Link
          to={`/tenant-task-details?id=${task.key}`}
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
          <img className="me-2" src={""} alt="" />
          <span>
            {text}
            {assigned?.assignedToMe ? "(LANDLORD)" : "Not set"}
            {/* {text ? ", " : "Not Set"} */}
          </span>
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
            <span>{text[0]}</span>
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
                  <Link to={`/tenant-task-details?id=${setting.key}`}>
                    <li className="list-style-none table-setting-dropdown-menu">
                      {" "}
                      <img src={viewIcon} alt="" /> View
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
  const data = TenantTaskData.filter((e) =>
    e.title?.toLowerCase().includes(search.toLowerCase())
  ).map((e) => ({
    key: e.id,
    title: e.title,
    img: e.image,
    assigned: e.assignedTo.map((e) => e.firstName).join(", "),
    assignedToMe: e?.assignedToMe,
    due:
      !e.due && !e.priority
        ? "Not Set"
        : [new Date(e.dueDate).toLocaleDateString(), e.priority],
    related: e.property.title,
    status: e.status || "N/A",
  }));
  return (
    <>
      {openModalTask && <TenantTaskModal onClose={onCloseModalTask} />}

      <div className="container-fluid bg-white p-3 ">
        <div className="row">
          <div className="col-md-12">
            <SearchBar
              onClick={onOpenModalTask}
              btnTitle="Add New Task"
              taskFilter={true}
            />
          </div>
        </div>
        {selectedTableItem.length >= 1 && (
          <div className="table-delete-icon mt-3">
            <button className="table-delete-btn next-btn-main">
              <img src={trashIconWhite} alt="" />
              Delete
            </button>
          </div>
        )}
        <>
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
                  Pagination: {
                    itemActiveBg: "#EF6B3E",
                  },
                },
              }}
            >
              <Table
                pagination={true}
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
        </>
      </div>
    </>
  );
};

export default TenantTask;
