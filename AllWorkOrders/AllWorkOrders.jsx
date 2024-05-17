import React, { useEffect, useState } from "react";
import NotFound from "assets/not-found-img.png";
import { ConfigProvider, Table } from "antd";
import oval from "assets/Oval.png";
import { useNavigate, Link } from "react-router-dom";
import settingIcon from "assets/three-dots.png";
import viewIcon from "assets/Icon.png";
import editIcon from "assets/edit-05.png";
import completeIcon from "assets/calendar-check-01.png";
import deleteIcon from "assets/trash-01.png";
import trashIconWhite from "assets/trash-icon-white.png";
import PaymentSuccessModal from "Modals/PaymentSuccessModal/PaymentSuccessModal";
import AddNewWorkOrderModal from "Modals/AddNewWorkOrderModal/AddNewWorkOrderModal";
import SearchBar from "Helpers/SearchBar";
import UseGetHook from "Hooks/UseGetHook";
import { useSelector } from "react-redux";
import DeleteModal from "Modals/DeleteModal/DeleteModal";
import SearchBarWithOutBtn from "Helpers/SearchBarWithOutBtn";
import UserPermission from "libs/UserPermission";
const AllWorkOrders = () => {
  // States start
  const [selectionType, setSelectionType] = useState("checkbox");
  const [selectedTableItem, setSelectedTableItem] = useState("");
  const [openModalWorkOrder, setOpenModalWorkOrder] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [DeleteId, setDeleteId] = useState("");
  const [key, setKey] = useState([]);
  const [update, setUpdate] = useState(false)
  // States end

  const navigate = useNavigate();
  const search = useSelector((state) => {
    return state.Search.value;
  });
  // Modal Function
  const onOpenModalWorkOrder = () => {
    setOpenModalWorkOrder(true);
  };
  const onCloseModalWorkOrder = () => {
    setOpenModalWorkOrder(false);
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
  // Fetch Data
  const { WorkOrderData, fetchWorkOrder } = UseGetHook("workorders");
  useEffect(() => {
    fetchWorkOrder();
  }, []);
  useEffect(() => {
    if (update) {
      fetchWorkOrder();
      setUpdate(false)

    }
  }, [update]);

  // Data Table Functions
  const handleIconClick = (result) => {
    // Toggle the dropdownOpen state
    const filterData = data.filter((item) => {
      return item.key === result;
    });
    setKey(filterData[0].key);
    if (key === result) {
      setKey(null); // Close the dropdown
    } else {
      // Open the dropdown for the clicked icon
      setKey(result);
    }
  };
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      render: (text, title) => (
        <Link
          to={`/work-order?id=${title.key}`}
          className="all-task-table-title-text"
        >
          {text}
        </Link>
      ),
    },
    {
      title: "Assigned To",
      dataIndex: "assigned",
      render: (text) => (
        <>
          {" "}
          <img className="me-2" src={oval} alt="" /> <span>{text}</span>
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
              onClick={() => {
                handleIconClick(setting.key);
              }}
            />
            {setting.key === key && (
              <div className="task-table-setting-dropdown-prospect bg-white box-shadow">
                <ul className="p-0 d-flex flex-column gap-3">
                  <Link to={`/work-order?id=${setting.key}`}>
                    <li className="list-style-none table-setting-dropdown-menu">
                      {" "}
                      <img src={viewIcon} alt="" /> View
                    </li>
                  </Link>
                  {
                    localStorage.getItem("role") !== "landlord" && localStorage.getItem("role") === "user" && ROLE[0]?.workOrders?.update ?
                      <Link>
                        <li className="list-style-none table-setting-dropdown-menu">
                          {" "}
                          <img src={editIcon} alt="" /> Edit
                        </li>
                      </Link>
                      :
                      localStorage.getItem("role") === "landlord" ?
                        <Link>
                          <li className="list-style-none table-setting-dropdown-menu">
                            {" "}
                            <img src={editIcon} alt="" /> Edit
                          </li>
                        </Link>
                        : ""
                  }
                  {
                    localStorage.getItem("role") !== "landlord" && localStorage.getItem("role") === "user" && ROLE[0]?.workOrders?.update ?
                      <Link>
                        <li className="list-style-none table-setting-dropdown-menu">
                          {" "}
                          <img src={completeIcon} alt="" /> Complete
                        </li>
                      </Link>
                      :
                      localStorage.getItem("role") === "landlord" ?
                        <Link>
                          <li className="list-style-none table-setting-dropdown-menu">
                            {" "}
                            <img src={completeIcon} alt="" /> Complete
                          </li>
                        </Link>
                        : ""
                  }
                  {
                    localStorage.getItem("role") !== "landlord" && localStorage.getItem("role") === "user" && ROLE[0]?.workOrders?.delete ?
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
                        : ""
                  }
                </ul>
              </div>
            )}
          </div>
        </>
      ),
    },
  ];
  const data = WorkOrderData.filter((e) =>
    e.subject.toLowerCase().includes(search.toLowerCase())
  ).map((e) => ({
    key: e.id,
    title: e.subject,
    img: e.image,
    assigned: e.assignedTo.map((e) => e.firstName).join(", "),
    due: [new Date(e.dueDate).toLocaleDateString(), e.priority],
    related: e.property?.title,
    status: e.status,
  }));
  // rowSelection object indicates the need for row selection
  const { ROLE } = UserPermission()
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
  return (
    <>
      {openModalWorkOrder === true ? (
        <AddNewWorkOrderModal
          onOpen={onOpenModal}
          onClose={onCloseModalWorkOrder}
          setUpdate={setUpdate}
        />
      ) : (
        ""
      )}
      {openModal === true ? (
        <PaymentSuccessModal
          onClose={onCloseModal}
          message="Work order inserted successfully"
          success="All Work Orders"
        />
      ) : (
        ""
      )}
      {openDeleteModal === true ? (
        <DeleteModal
          onClose={onCloseDeleteModal}
          route="all-work-order"
          component="workorder"
          deleteBtnText="Delete Work order"
          delId={DeleteId}
        />
      ) : (
        ""
      )}
      <div className="container-fluid bg-white p-3">
        <div className="row">
          <div className="col-md-12">
            {

              localStorage.getItem("role") !== "landlord" && localStorage.getItem("role") === "user" && ROLE[0]?.workOrders?.add ?
                <SearchBar
                  onClick={onOpenModalWorkOrder}
                  btnTitle="Add Work Order"
                  taskFilter={true}
                />
                :
                localStorage.getItem("role") === "landlord" ?
                  <SearchBar
                    onClick={onOpenModalWorkOrder}
                    btnTitle="Add Work Order"
                    taskFilter={true}
                  />
                  : <SearchBarWithOutBtn innerPage={false} taskFilter={true} />


            }

          </div>
        </div>
        {selectedTableItem.length >= 1 && (
          <div className="table-delete-icon mt-3">
            <button className="table-delete-btn next-btn-main">
              <img src={trashIconWhite} alt='' />
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
              className="all-work-order-table scroll-remove"
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
            <strong>No tasks found</strong>
          </p>
          <p>
            No tasks were found; the folder is empty. <br /> Please try again.
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

export default AllWorkOrders;
