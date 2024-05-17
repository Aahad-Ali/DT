import React, { useState, useEffect } from "react";
import CloudImg from "assets/Illustration.png";
import plusIconOrange from "assets/plus-orange.png";
import SearchBar from "Helpers/SearchBar";
import viewIcon from "assets/Icon.png";
import editIcon from "assets/edit-05.png";
import loginIcon from "assets/file-03.png";
import deleteIcon from "assets/trash-01.png";
import trashIconWhite from "assets/trash-icon-white.png";
import settingIcon from "assets/three-dots.png";
import { Table, ConfigProvider } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import UseGetHook from "Hooks/UseGetHook";
import DeleteModal from "Modals/DeleteModal/DeleteModal";
import AddVendorsDetailsEditModal from "Modals/AddVendorsDetailsEditModal/AddVendorsDetailsEditModal";
import ConditionalFilter from "Hooks/ConditionalFilter";
import BulkDelete from "Hooks/BulkDelete";
const AllVendors = () => {
  // States start
  const [selectionType, setSelectionType] = useState("checkbox");
  const [selectedTableItem, setSelectedTableItem] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [DeleteId, setDeleteId] = useState("");
  const [openEditModalTask, setOpenEditModalTask] = useState(false);
  const [taskId, setTaskId] = useState("");
  const [key, setKey] = useState([]);
  const [update, setUpdate] = useState(false);
  // States end

  const navigate = useNavigate();
  const search = useSelector((state) => {
    return state.Search.value;
  });
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
      title: "Vendor Name",
      dataIndex: "vendorName",
      render: (text, vendorName) => (
        <>
          <Link to={`/vendor-detail-view?id=${vendorName.key}`}>
            <span className="tenants_table_name_text">
              <img
                className="me-2 rounded-5 property-table-image mw_40 mh_40"
                src={`${vendorName.img}`}
                alt=""
              />
              {text}
            </span>
          </Link>
        </>
      ),
    },
    {
      title: "Email Address",
      dataIndex: "email",
      render: (text, email) => (
        <>
          <span className="tenants_table_email_text">{text}</span>
        </>
      ),
    },
    {
      title: "Phone No",
      dataIndex: "phone",
      render: (text, phone) => (
        <>
          {" "}
          <span className="tenants_table_phone_text phone">{text}</span>
        </>
      ),
    },
    {
      title: "Open Balance",
      dataIndex: "balance",
      render: (text) => (
        <>
          {" "}
          <span className="fw-medium">{text}</span>
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
                  <Link to="/vendor-detail-view">
                    <li className="list-style-none table-setting-dropdown-menu">
                      {" "}
                      <img src={viewIcon} alt="" /> View
                    </li>
                  </Link>
                  <Link>
                    <li
                      className="list-style-none table-setting-dropdown-menu
                  "
                      onClick={() => {
                        onOpenEditModalTask();
                        setTaskId(setting.key);
                      }}
                    >
                      {" "}
                      <img src={editIcon} alt="" /> Edit
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
  // Get Vendors
  const range = useSelector((state) => {
    return state.FilterValue.value;
  });
  const property = useSelector((state) => {
    return state.FilterValue.property;
  });
  const toDate = useSelector((state) => {
    return state.FilterValue.toDate;
  });
  const fromDate = useSelector((state) => {
    return state.FilterValue.fromDate;
  });
  const { filters, FilterObjects } = ConditionalFilter({
    range,
    property,
    fromDate,
    toDate,
  });
  const { VendorData, fetchVendor } = UseGetHook(
    filters(FilterObjects)
      ? `vendors/filter?${filters(FilterObjects)}`
      : "vendors"
  );
  useEffect(() => {
    fetchVendor();
  }, [property, range, toDate, fromDate]);
  useEffect(() => {
    if (update) {
      fetchVendor();
      setUpdate(false);
    }
  }, [update]);
  const data = VendorData.filter((e) =>
    e.firstName.toLowerCase().includes(search.toLowerCase())
  ).map((e) => ({
    key: e.id,
    vendorName: `${e.firstName ? e.firstName + " " : ""}${e.lastName ? e.lastName : ""
      }`.trim(),
    img: e.profileImage,
    email: e.email,
    phone: e.phone,
    balance: "$0.1200",
  }));

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedTableItem([...selectedRowKeys]);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };
  const { bulkDelete } = BulkDelete("vendor", selectedTableItem, fetchVendor);
  const DeleteSelected = () => {
    bulkDelete();
  };
  const fetchFunc = () => {
    fetchVendor();
  };
  return (
    <>
      {openDeleteModal === true ? (
        <DeleteModal
          setUpdate={setUpdate}
          onClose={onCloseDeleteModal}
          component="vendor"
          route="all-vendor"
          deleteBtnText="Delete Vendor"
          delId={DeleteId}
        />
      ) : (
        ""
      )}
      {openEditModalTask && (
        <AddVendorsDetailsEditModal
          id={taskId}
          setUpdate={setUpdate}
          onClose={onCloseEditModalTask}
        />
      )}
      <div className="container-fluid bg-white p-3">
        <SearchBar
          onClick={() => {
            navigate("/add-vendor-details");
          }}
          btnTitle="Add New Vendor"
          vendorsFilter={true}
        />
        <div className="text-center  d-none">
          <img src={CloudImg} alt="" />
          <p className="property-main-text">No vendors found</p>
          <p className="property-sub-text">
            No vendor were found; the folder is empty.
            <br />
            Please try again.
          </p>
          <button className="add-property-btn-white">
            <img src={plusIconOrange} className="add-property-icon-white" alt='' /> Add
            Vendors
          </button>
        </div>
        <div className="row mt-3">
          <div className="col-md-12">
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
            <div className="">
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
                  className="all-vendors-table scroll-remove scroll-responsive-tablet"
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
      </div>
    </>
  );
};

export default AllVendors;
