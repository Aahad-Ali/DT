import { useState } from "react";
import viewIcon from "assets/Icon.png";
import editIcon from "assets/edit-05.png";
import deleteIcon from "assets/trash-01.png";
import settingIcon from "assets/three-dots.png";
import activeDot from "assets/_Dot.png";
import inactiveDot from "assets/inactivedot.png";
import phoneIcon from "assets/help-circle.png";
import SearchBar from "Helpers/SearchBar";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";

const AllLandLord = () => {
  // States start
  const [selectionType, setSelectionType] = useState("checkbox");
  const [key, setKey] = useState([]);
  // States end

  const navigate = useNavigate();

  // Data Table functions
  const data = [
    {
      key: "1",
      name: "Olivya Rhye",
      phone_no: "+1 (555) 543-2109",
      email: "olivia@untitledui.com",
      properties: "PITTSBURGH, Pennsylvania(PA), 15283",
      status: "Active",
    },
    {
      key: "2",
      name: "Phoenix Baker",
      phone_no: "+1 (555) 345-6789",
      email: "phoenix@untitledui.com",
      properties: "Phoenix, Arizona(AZ), 85003",
      status: "In active",
      setting: "",
    },
    {
      key: "3",
      name: "Lana Steiner",
      phone_no: "+1 (555) 987-6543",
      email: "lana@untitledui.com",
      properties: "Utopia, Texas(TX), 78884",
      status: "Active",
      setting: "",
    },
    {
      key: "4",
      name: "Demi Wilkinson",
      phone_no: "+1 (555) 789 0123",
      email: "demi@untitledui.com",
      properties: "San Diego, California(CA), 92121",
      status: "Active",
      setting: "",
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
      title: "NAME",
      dataIndex: "name",
      render: (text) => <span>{text}</span>,
    },
    {
      title: (
        <>
          Phone No <img src={phoneIcon} alt="Phone Icon" />
        </>
      ),
      dataIndex: "phone_no",
      render: (text) => (
        <>
          {" "}
          <span className="phone">{text}</span>
        </>
      ),
    },
    {
      title: "EMAIL ADDRESS",
      dataIndex: "email",
      render: (text) => (
        <>
          <span>{text}</span>
        </>
      ),
    },
    {
      title: "PROPERTIES",
      dataIndex: "properties",
      render: (text) => (
        <>
          <span>354 Gladwell Street</span>
          <br />
          <span>{text}</span>
        </>
      ),
    },
    {
      title: "STATUS",
      dataIndex: "status",
      render: (text, status) => (
        <>
          <div
            className={
              status.key === "2"
                ? "prospect-inactive-bar"
                : "prospect-active-bar"
            }
          >
            <img src={status.key === "2" ? inactiveDot : activeDot} alt="" />{" "}
            <span>{text}</span>
          </div>
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
              <div className="all-landlords-setting-dropdown bg-white box-shadow">
                <ul className="p-0 d-flex flex-column gap-3">
                  <li className="list-style-none">
                    {" "}
                    <img src={viewIcon} alt="" /> View
                  </li>
                  <li className="list-style-none">
                    {" "}
                    <img src={editIcon} alt="" /> Edit
                  </li>
                  <li className="list-style-none">
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

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };
  return (
    <>
      <div className="container-fluid bg-white p-3">
        <div className="row">
          <div className="col-md-12">
            <SearchBar btnTitle="Add New Task" />
          </div>
        </div>
        <div className="task-table-container mt-3">
          <Table
            pagination={false}
            className="all-landlords-main-table table-responsive"
            rowSelection={{
              type: selectionType,
              ...rowSelection,
            }}
            columns={columns}
            dataSource={data}
          />
        </div>
      </div>
    </>
  );
};

export default AllLandLord;
