import React, { useEffect, useState } from "react";
import CloudImg from "assets/Illustration.png";
import plusIconOrange from "assets/plus-orange.png";
import viewIcon from "assets/Icon.png";
import editIcon from "assets/edit-05.png";
import deleteIcon from "assets/trash-01.png";
import settingIcon from "assets/three-dots.png";
import activeDot from "assets/_Dot.png";
import inactiveDot from "assets/inactivedot.png";
import tenantUser1 from "assets/tenant_table_image-01.png";
import tenantUser2 from "assets/tenant_table_image -02.png";
import { Table, ConfigProvider, message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import SearchBar from "Helpers/SearchBar";
import UseGetHook from "Hooks/UseGetHook";
import UseJsonHook from "Hooks/UseJsonHook";
import config from 'Helpers/config.json'
import PropertyAddAccount from "Components/PropertyAddAccount/PropertyAddAccount";
import AddPropertyAccountingModal from "Modals/AddPropertyAccountingModal/AddPropertyAccountingModal";
import DeleteModal from "Modals/DeleteModal/DeleteModal";
const TenantPassport = () => {
  const [selectionType, setSelectionType] = useState("checkbox");
  const [key, setKey] = useState([]);
  const [loader, setLoader] = useState(false)
  const [component, setComponent] = useState("")
  const [open, setOpen] = useState(false)
  const [id, setId] = useState("")
  const [deleteId, setDeleteId] = useState("")
  const [update, setUpdate] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  // States start
  const navigate = useNavigate();
  // States end
  const { fetchTenantScreening, tenantScreen } = UseGetHook("viewScreeningStatus")
  useEffect(() => {
    fetchTenantScreening()
  }, [])
  useEffect(() => {
    if (update) {
      fetchTenantScreening()
      setUpdate(false)
    }
  }, [update])
  console.log(tenantScreen,"jhghfdbgvdg")
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
  const onClose = () => {
    setOpen(false)
  }
  const onOpen = () => {
    setOpen(true)
  }
  const onCloseModal = () => {
    setOpenModal(false)
  }
  const onOpenModal = () => {
    setOpenModal(true)
  }
  const passportFunction = (status, id, email, paid) => {
    if (status === "Process Forwarded" || status === "Questionaire has been attempted and Failed") {
      navigate(`/tenant-questions?id=${id}&paid=${paid}`);
    }
    else if (status === "Report Available") {
      setId(id)
      onOpen()
    }
    else if (status === "Questionaire has been attempted and Passed") {
      GenerateRequest(id)
    }
    else {
      navigate(`/tenant-passport-profile?email=${email}&id=${id}`)
    }
  }
  const GenerateRequest = (id) => {
    fetch(`${config.baseUrl}/api/renter/transunion/createReport`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        screeningId: id,
      })
    }).then(res => {
      return res.json()
    }).then(res => {
      message.success(res.message.message)
      setUpdate(true)
    }).catch(err => { console.log(err, "Error") })
  }
  const columns = [
    {
      title: "You",
      dataIndex: "name",
      render: (text, name) => (
        <>
          {" "}
          <Link to="/tenant-passport-details-view">
            <img
              className="me-2"
              src={name.key === "2" ? tenantUser2 : tenantUser1}
              alt=""
            />{" "}
            <span className="tenant_table_name_text">{text}</span>
          </Link>
        </>
      ),
    },
    {
      title: "Landlord's email",
      dataIndex: "landlord_email",
      render: (text) => (
        <>
          <span className="tenant_table_phone_text">{text}</span>
        </>
      ),
    },
    {
      title: "Application status",
      dataIndex: "expiry_date",
      render: (text, expiry_date) => (
        <>
          <div className="assign-date-container">

            <span className="assign-to-date">{text}</span>
          </div>
        </>
      ),
    },
    {
      title: "Status",
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
      dataIndex: "passportButtons",
      render: (text, passportButtons) => (
        <>
          <div className="position-relative cursor tab-resp-button">
            {
              passportButtons.status === "Waiting for Report" || passportButtons.status === "Manual Verification Required" || passportButtons.status === "Exam Limit Exceeded" ?
                <button disabled
                  className={"tanent-passport-module disableBtn cursor-not-allowed prospect-inactive-bar"}
                >
                  {" "}
                  <span>{text}</span>
                </button>
                :
                <button
                  onClick={() => {
                    passportFunction(passportButtons.status, passportButtons.key, passportButtons.landlord_email, passportButtons.paid)
                  }}
                  className={"connect-to-bank-btn-white"
                  }
                >
                  {" "}
                  <span>{text}</span>
                </button>
            }

          </div>
        </>
      ),
    },
    {
      title: "",
      dataIndex: "setting",
      render: (text, setting) => (
        <>
          <div className="task-table-setting-container position-relative cursor tab-resp-button">
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
                  <li
                    onClick={() => {
                      navigate("/tenant-passport-details-view");
                    }}
                    className="list-style-none"
                  >
                    {" "}
                    <img src={viewIcon} alt="" /> View
                  </li>
                  <li
                    onClick={() => {
                      setDeleteId(setting.key)
                      setComponent("screening")
                      onOpenModal()
                    }}
                    className="list-style-none">
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
  const data = tenantScreen?.map(e => ({
    key: e._id,
    name: localStorage.getItem("name"),
    status: e.report_status,
    landlord_email: e.landlordEmail,
    expiry_date: e.reportsDeliveryStatus,
    passportButtons: e.report_status === "Process Forwarded" || e.report_status === "Questionaire has been attempted and Failed" ? "Verify" : e.report_status === "Questionaire has been attempted and Passed" ? "Request Report Generation" : e.report_status === "Waiting for Report" ? "Share passport" : e.report_status === "Report Available" ? "Share passport" : e.report_status === "Report Available" ? "Share passport" : "Confirm Credit Check",
    paid: e.paid
  }))

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
      name: record.name,
    }),
  };

  return (
    <>
      {
        open && (
          <AddPropertyAccountingModal id={id} tenantPassport={true} onClose={onClose} />
        )
      }
      {
        openModal && (
          <DeleteModal
            onClose={onCloseModal}
            component={component}
            setUpdate={setUpdate}
            deleteBtnText={`Delete ${component}`}
            delId={deleteId}
          />
        )

      }
      <div className="container-fluid bg-white p-3">
        <SearchBar
          route="tenant-passport-profile"
          btnTitle="Create New"
          TenantPassport={true}
        />
        <div className="row mt-3">
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
              className="tenant-passport-list scroll-remove scroll-responsive-tablet mt-4"
              rowSelection={{
                type: selectionType,
                ...rowSelection,
              }}
              columns={columns}
              dataSource={data}
              pagination={false}
            />
          </ConfigProvider>
        </div>
        <div className="text-center main-screen-properties-content d-none">
          <img src={CloudImg} alt="" />
          <p className="property-main-text">No Tenant Passport Found</p>
          <p className="property-sub-text">
            No tenant passport were found; the folder is empty.
            <br />
            Please try again.
          </p>
          <button className="add-property-btn-white">
            <img src={plusIconOrange} className="add-property-icon-white" alt="" />{" "}
            Create New
          </button>
        </div>
      </div>
    </>
  );
};

export default TenantPassport;
