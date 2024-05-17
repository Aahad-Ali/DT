import React, { useEffect, useState } from "react";
import { ConfigProvider } from "antd";
import NotFound from "assets/not-found-img.png";
import { useNavigate, Link } from "react-router-dom";
import { Table, DatePicker, Space } from "antd";
import { usePDF } from "react-to-pdf";
import chevronIcon from "assets/chevron-down.png";
import calendarIconDate from "assets/calendar-icon.png";
import trashIconWhite from "assets/trash-icon-white.png";
import UseGetHook from "Hooks/UseGetHook";
import { useSelector } from "react-redux";

const { RangePicker } = DatePicker;
let calendar;
calendar = (
  <>
    <img src={calendarIconDate} alt="" />
  </>
);

const PropertyReport = ({ children }) => {
  // States start
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
  const [selectionType, setSelectionType] = useState("checkbox");
  const [openModal, setOpenModal] = useState(false);
  const [selectedTableItem, setSelectedTableItem] = useState("");
  const { report, fetchPropertyReport } = UseGetHook("property")
  // States end
  const search = useSelector((state) => {
    return state.Search.value;
  });
  const navigate = useNavigate();
  // Modal Function
  const onOpenModal = () => {
    setOpenModal(true);
  };
  const onCloseModal = () => {
    setOpenModal(false);
  };
  useEffect(() => {
    fetchPropertyReport()
  }, [])
  // Data Table functions
  const data = report.filter((e) =>
    e?.data?.title.toLowerCase().includes(search.toLowerCase())
  ).map(e => ({
    key: "1",
    propertyName: e.data.title,
    type: e.data.property_sub_type,
    address: e.data.address.address_line_1,
    rent: `$${e.data.rent_amount.toLocaleString()}`,
  }))



  const columns = [
    {
      title: "Property Name",
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
      title: "Type",
      dataIndex: "type",
      render: (text, type) => (
        <>
          {type.type === "single_family" && (
            <span className="type-text-single-family rounded-4">
              Single family
            </span>
          )}
          {type.type === "multi_family" && (
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
  return (
    <>
      <div className="container-fluid">

        {/* <SearchBar
          value={searchKeyword}
          onChange={handleSearch}
          reportsFilter={true}

        /> */}

        {selectedTableItem.length >= 1 && (
          <div className="table-delete-icon mt-3">
            <button className="table-delete-btn next-btn-main">
              <img src={trashIconWhite} />
              Delete
            </button>
          </div>
        )}

        <div className="report-table-container mt-3" ref={targetRef}>
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
              className="scroll-remove scroll-responsive-tablet"
              pagination={false}
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

export default PropertyReport;
