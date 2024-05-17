import React, { useState } from "react";
import searchIcon from "assets/search.png";
import FilterIcon from "assets/filter.png";
import { Select, ConfigProvider } from "antd";
import calendarIcon from "assets/calendar.png";
import NotFound from "assets/not-found-img.png";
import { CSVLink } from "react-csv";
import viewIcon from "assets/Icon.png";
import editIcon from "assets/edit-05.png";
import completeIcon from "assets/calendar-check-01.png";
import deleteIcon from "assets/trash-01.png";
import settingIcon from "assets/three-dots.png";
import { useNavigate, Link } from "react-router-dom";
import { Table } from "antd";
import { usePDF } from "react-to-pdf";
import chevronIcon from "assets/chevron-down.png";
import { Collapse, theme, DatePicker, Space } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import calendarIconDate from "assets/calendar-icon.png";

const { RangePicker } = DatePicker;
let calendar;
calendar = (
  <>
    <img src={calendarIconDate} alt="" />
  </>
);
const columns = [
  {
    title: "",
    dataIndex: "name",
  },
  {
    title: "",
    dataIndex: "age",
  },
  {
    title: "",
    dataIndex: "address",
  },
  {
    title: "",
    dataIndex: "status",
  },
];
const data = [];
for (let i = 0; i < 1; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
    status: `In Progress`,
  });
}

const TaskReportDetail = () => {
  // States start
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
  const [selectionType, setSelectionType] = useState("checkbox");
  const [exportDropdown, setExportDropdown] = useState(false);
  const [taskFilterDropdown, settaskFilterDropdown] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [key, setKey] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  // States end

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const navigate = useNavigate();
  // Modal Function
  const onOpenModal = () => {
    setOpenModal(true);
  };
  const onCloseModal = () => {
    setOpenModal(false);
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
  const { token } = theme.useToken();
  const panelStyle = {
    marginBottom: 24,
    background: "#EF6B3E21",
    borderRadius: "3px",
    border: "none",
  };

  const getItems = (panelStyle) => [
    {
      key: "1",
      label: "Plumbing issues",
      children: (
        <p>
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
              // rowSelection={rowSelection}
              columns={columns}
              dataSource={data}
              pagination={false}
              row={false}
              className="task-report-detail-table"
            />
          </ConfigProvider>
        </p>
      ),
      style: panelStyle,
    },
    {
      key: "2",
      label: "Electrical issue",
      children: (
        <p>
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
              // rowSelection={rowSelection}
              columns={columns}
              dataSource={data}
              pagination={false}
              className="task-report-detail-table"
            />
          </ConfigProvider>
        </p>
      ),
      style: panelStyle,
    },
    {
      key: "3",
      label: "Plumbing issues",
      children: (
        <p>
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
              // rowSelection={rowSelection}
              columns={columns}
              dataSource={data}
              pagination={false}
              className="task-report-detail-table"
            />
          </ConfigProvider>
        </p>
      ),
      style: panelStyle,
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  return (
    <>
      <div className="container-fluid bg-white p-3 ">
        <div className="row">
          <div className="col-md-12">
            <div className="task-search-input position-relative">
              <input
                type="text"
                placeholder="Search"
                className="form-control search-form-control-task"
              />
              <div className="search-icon-task">
                <img src={searchIcon} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-2">
          {/* <div className="col-md-6">
            <div className="report-type-text-container mt-3">
              <span className="report-type-text ">Report Type</span>
            </div>
          </div> */}
          {/* <div className="col-md-6 text-end">
            <div className="report-date">
              <img src={calendarIcon} alt="" />{" "}
              <span className="report-date-text">
                Jan 6, 2022 – Jan 13, 2022
              </span>
            </div>
          </div> */}
        </div>
        <div className="row mt-2">
          <div className="col-md-6">
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

              {/* <img src={calendarIcon} alt="" />{" "}
              <span className="report-date-text">
                Jan 6, 2022 – Jan 13, 2022
              </span> */}
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
                    <li className="list-style-none">Excel</li>
                    <li
                      onClick={() => toPDF()}
                      className="list-style-none cursor"
                    >
                      PDF
                    </li>
                  </ul>
                </div>
              </div>
              {/* <CSVLink
                className="modal-save-btn report-print-btn-responsive d-md-none d-lg-flex d-none"
              >
                Print
              </CSVLink> */}
            </div>
          </div>
        </div>
        <div className="report-table-container mt-3" ref={targetRef}>
          <div className="accordion-top-heading mt-5">
            <div className="head-1">TITLE</div>
            <div className="head-2">DUE DATE </div>
            <div className="head-3">RELATED TO</div>
            <div className="head-4">STATUS</div>
            <div className="head-4">
              <img src={settingIcon} alt="" />
            </div>
          </div>
          <ConfigProvider
            theme={{
              components: {
                Collapse: {
                  colorTextHeading: "#000",
                  fontSize: 16,
                  fontWeightStrong: 600,
                  fontFamily: "Montserrat",
                  padding: 20,
                  paddingSM: 23,
                },
              },
            }}
          >
            <Collapse
              bordered={false}
              defaultActiveKey={["1"]}
              expandIcon={({ isActive }) => (
                <CaretRightOutlined
                  rotate={isActive ? 90 : 0}
                  style={{ position: "none", left: "0", paddingLeft: "10px" }}
                />
              )}
              style={{
                // background: token.colorBgContainer,
                background: token.black,
                fontWeight: 600,
              }}
              items={getItems(panelStyle)}
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

export default TaskReportDetail;
