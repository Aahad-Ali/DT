import { useState, useRef } from "react";
import searchIcon from "assets/search.png";
import FilterIcon from "assets/filter.png";
import { Select, ConfigProvider } from "antd";
import NotFound from "assets/not-found-img.png";
import settingIcon from "assets/three-dots.png";
import viewIcon from "assets/Icon.png";
import editIcon from "assets/edit-05.png";
import completeIcon from "assets/calendar-check-01.png";
import deleteIcon from "assets/trash-01.png";
import trashIconWhite from "assets/trash-icon-white.png";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { Table, DatePicker, Space } from "antd";
import { usePDF } from "react-to-pdf";
import { CSVLink } from "react-csv";
import checkMark from "assets/check-mark.png";
import chevronIcon from "assets/chevron-down.png";
import calendarIconDate from "assets/calendar-icon.png";
import { InputField } from "Components/GeneralComponents";
import { useDispatch } from "react-redux";
import { getValue } from "Store/Slices/SearchSlice";
const { RangePicker } = DatePicker;
let calendar;
calendar = (
  <>
    <img src={calendarIconDate} alt="" />
  </>
);

const AllReports = () => {
  // States start
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
  const [selectedTableItem, setSelectedTableItem] = useState("");
  const [selectionType, setSelectionType] = useState("checkbox");
  const [exportDropdown, setExportDropdown] = useState(false);
  const [taskFilterDropdown, settaskFilterDropdown] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [key, setKey] = useState([]);
  const [search, setSearch] = useState("");

  // States end

  const navigate = useNavigate();
  // Modal Function
  const onOpenModal = () => {
    setOpenModal(true);
  };
  const onCloseModal = () => {
    setOpenModal(false);
  };
  // Data Table functions
  const data = [
    {
      key: "1",
      propertyName: "2418 Ellingwood....",
      phone: "+1 (555) 098-7654",
      type: "5/4/2023",
      address: "1500 Marilla St, TX 75201",
      rent: "$381.76",
      tenant: "Emilly Durkheim",
    },
    {
      key: "2",
      propertyName: "2418 Ellingwood....",
      phone: "+1 (555) 098-7654",
      type: "5/4/2023",
      address: "1500 Marilla St, TX 75201",
      rent: "$381.76",
      tenant: "Emilly Durkheim",
    },
    {
      key: "3",
      propertyName: "2418 Ellingwood....",
      phone: "+1 (555) 098-7654",
      type: "5/4/2023",
      address: "1500 Marilla St, TX 75201",
      rent: "$381.76",
      tenant: "Emilly Durkheim",
    },
    {
      key: "4",
      propertyName: "2418 Ellingwood....",
      phone: "+1 (555) 098-7654",
      type: "5/4/2023",
      address: "1500 Marilla St, TX 75201",
      rent: "$381.76",
      tenant: "Emilly Durkheim",
    },
  ];
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
      title: "Property Address",
      dataIndex: "propertyName",
      render: (text) => (
        <>
          <Link to="">
            <span className="property-table-name-text">{text}</span>
          </Link>
        </>
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
      render: (text) => <span className="rent-text">{text}</span>,
    },
    {
      title: "Tenants",
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
  const routeHandleChange = (route) => {
    navigate(`/${route}`);
  };

  let dropdownIcon;
  dropdownIcon = (
    <>
      <img src={chevronIcon} alt="" />
    </>
  );
  const dispatch = useDispatch();
  dispatch(getValue(search));
 
  return (
    <>
      <div className="container-fluid bg-white p-3 ">
        <div className="row">
          <div className="col-md-12">
            <div className="task-search-input position-relative">
            <InputField
                  handler={(e) => setSearch(e.target.value)}
                  type="text"
                  placeholder="Search"
                  className="form-control search-form-control-task" />
              <div className="search-icon-task">
                <img src={searchIcon} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="report-date-container mt-2 d-flex align-items-center justify-content-between flex-wrap">
          <div className="report-type-text-container mt-3">
            <span className="report-type-text ">Report Type</span>
          </div>
          <div className="">
            <Space direction="vertical" size={12}>
              <ConfigProvider
                theme={{
                  components: {
                    DatePicker: {
                      zIndexPopupBase: 99999,
                      colorPrimaryHover: "#EF6B3E",
                      borderRadius: 4,
                      fontFamily: "Montserrat",
                      colorText: "#667085",
                      colorTextPlaceholder: "#667085",
                      fontSize: 16,
                      colorPrimary: "#EF6B3E",
                      cellActiveWithRangeBg: "#FFEAD5",
                    },
                  },
                }}
              >
                <RangePicker
                  suffixIcon={calendar}
                  style={{
                    width: "100%",
                    height: 45,
                  }}
                />
              </ConfigProvider>
            </Space>
            {/* <img src={calendarIcon} alt="" />
            <span className="report-date-text">Jan 6, 2022 – Jan 13, 2022</span> */}
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-6">
            <div className="report-type-box d-flex gap-3 align-items-center">
              <ConfigProvider
                theme={{
                  components: {
                    Select: {
                      colorPrimaryHover: "#EF6B3E",
                      optionSelectedBg: "rgba(239, 107, 62, 0.16)",
                      borderRadius: 4,
                      colorTextPlaceholder: "#667085",
                      fontFamily: "montserrat",
                    },
                  },
                }}
              >
                <Select
                  suffixIcon={dropdownIcon}
                  defaultValue="Property Reports"
                  style={{
                    width: "100%",
                    height: 50,
                  }}
                  onChange={routeHandleChange}
                  options={[
                    {
                      label: "GENERAL REPORTS",
                      options: [
                        {
                          label: "Property Reports",
                          value: "all-reports/property-reports",
                        },
                        {
                          label: "Tenant Reports",
                          value: "all-reports/tenant-reports",
                        },
                        {
                          label: "Invoice Reports",
                          value: "all-reports/invoice-reports",
                        },
                        {
                          label: "Task Reports",
                          value: "all-reports/task-reports",
                        },
                      ],
                    },
                  ]}
                />
              </ConfigProvider>
              <div className="position-relative">
                <button
                  onClick={() => {
                    settaskFilterDropdown(!taskFilterDropdown);
                  }}
                  className="filter-btn d-flex align-items-center"
                >
                  {" "}
                  <img src={FilterIcon} alt="" /> Filter
                </button>
                <div
                  className={
                    taskFilterDropdown === true
                      ? "filter-dropdown reports-filter-dropdown position-absolute"
                      : "d-none"
                  }
                >
                  <div className="filter-checkbox-container">
                    <strong style={{ fontSize: "12px" }}>FILTER BY</strong>
                    <p>Name</p>
                    <p>Phone No</p>
                    <p>Type</p>
                    <p>Address</p>
                    <p>Tenant</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 text-end">
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
                    <CSVLink data={data}>
                      <li className="list-style-none">Excel</li>

                    </CSVLink>
                    <li
                      onClick={() => toPDF()}
                      className="list-style-none cursor"
                    >
                      PDF
                    </li>
                  </ul>
                </div>
              </div>

              <button className="modal-save-btn report-print-btn-responsive d-lg-flex"
                onClick={() => {

                  window.print();

                }}>Print</button>



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
        <div className="table-container mt-3" ref={targetRef}>
          <Outlet />
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
      </div >
    </>
  );
};

export default AllReports;
