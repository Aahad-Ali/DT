import { useEffect, useState } from "react";
import { ConfigProvider, Tabs } from "antd";
import settingIcon from "assets/three-dots.png";
import { Table, Pagination } from "antd";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "Helpers/SearchBar";
import viewIcon from "assets/Icon.png";
import deleteIcon from "assets/trash-01.png";
import prevbtn from "assets/prev-btn.png";
import nextbtn from "assets/next-btn.png";
import tenantUser1 from "assets/tenant_table_image-01.png";
import phoneIcon from "assets/help-circle.png";
import dollar from "assets/CurrencyDollar.png";
import MapLine from "assets/MapPinLineSm.png";
import resendInvite from "assets/resend-invite.png";
import trashIconWhite from "assets/trash-icon-white.png";
import LocalServiceProfessionalSearch from "Helpers/LocalServiceProfessionalSearch";
import UseGetHook from "Hooks/UseGetHook";
import UseUrlParamsHook from "Hooks/UseUrlParamsHook";
import InviteProfessionalModal from "Modals/InviteProfessionalModal/InviteProfessionalModal";
const { TabPane } = Tabs;
const AllServiceProfessional = () => {
  //States start
  const [selectionType, setSelectionType] = useState("checkbox");
  const [selectedTableItem, setSelectedTableItem] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const [key, setKey] = useState([]);
  //States end

  const { id } = UseUrlParamsHook();

  const { fetchServiceProfessionals, professional } = UseGetHook('companies', id)
  const { fetchListProfessional, listProfessional } = UseGetHook('invited-companies', id)
  useEffect(() => {
    fetchServiceProfessionals()
    fetchListProfessional()
    console.log(listProfessional, "LISTTT")
  }, [])
  const navigate = useNavigate();
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


  const onOpenModal = () => {
    setOpenModal(true);
  };
  const onCloseModal = () => {
    setOpenModal(false);
  };



  const columns = [
    {
      title: "Company Name",
      dataIndex: "name",
      render: (text, file) => (
        <>
          <Link to={`/all-service-professional-details?id=${file.id}`}>
            <img src={file.file} className="me-2" alt="" />
            <span className="tenant_table_name_text">{text}</span>
          </Link>
        </>
      ),
    },
    {
      title: (
        <>
          Services <img src={phoneIcon} alt="Phone Icon" />
        </>
      ),
      dataIndex: "services",
      render: (text) => (
        <>
          <span className="tenant_table_properties_sub_text">{text}</span>
        </>
      ),
    },
    {
      title: (
        <>
          Location <img src={phoneIcon} alt="Phone Icon" />
        </>
      ),
      dataIndex: "location",
      render: (text) => (
        <>
          <span className="tenant_table_phone_text phone">{text}</span>
        </>
      ),
    },
    {
      title: "Charges",
      dataIndex: "charges",
      render: (text) => (
        <>
          <span className="tenant_table_email_text">{text}</span>
        </>
      ),
    },
    {
      title: <>Status</>,
      dataIndex: "status",
      render: (text, status) => (
        <>

          <div className="status-active">
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
              onClick={() => {
                handleIconClick(setting.key);
              }}
            />
            {setting.key === key && (
              <div className="task-table-setting-dropdown-prospect bg-white box-shadow">
                <ul className="p-0 d-flex flex-column gap-3">
                  {/* <Link to="/all-service-professional-details">
                    <li className="list-style-none table-setting-dropdown-menu">
                      {" "}
                      <img src={viewIcon} alt="" /> View
                    </li>
                  </Link> */}
                  <Link>
                    <li className="list-style-none table-setting-dropdown-menu" onClick={onOpenModal}>
                      {" "}
                      <img src={resendInvite} alt="" /> Resend Invite
                    </li>
                  </Link>
                  <Link>
                    <li className="list-style-none table-setting-dropdown-menu">
                      {" "}
                      <img src={deleteIcon} alt="" /> cancle
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


  const data = listProfessional?.map((e, index) => ({
    key: index + 1,
    id: e._id,
    name: e?.company?.companyName,
    file: e?.company?.companyLogo,
    description: e?.queryDescription,
    status: e?.status,
    location: e?.company?.state?.name,
    services: e?.company?.services?.name ? e?.company?.services?.name : '-',
    charges: e?.charges ? e?.charges : "-",
    uploadedDate: new Date(e?.modified_at).toLocaleDateString(),
  }));
  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      setSelectedTableItem(selectedRowKeys);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };



  return (
    <>
      {openModal === true && <InviteProfessionalModal onClose={onCloseModal} />}
      <div className="container-fluid bg-white p-3">
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
          <Tabs
            centered={window.innerWidth <= 450 ? false : true}
            defaultActiveKey="1"
            style={{ fontWeight: 500 }}
          >
            <TabPane tab="List of Service Professional" key="1">

              <div key={data} className="container-fluid">
                <SearchBar serviceProfessionalFilter={true} />
                <div className="row ">
                  {selectedTableItem.length >= 1 && (
                    <div className="table-delete-icon mt-3">
                      <button className="table-delete-btn next-btn-main">
                        <img src={trashIconWhite} />
                        Delete
                      </button>
                    </div>
                  )}
                  <div className="col-md-12 mt-3">
                    <div className="table-container">
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
                          className="all-service-professional-table scroll-remove scroll-responsive-tablet"
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
                  </div>
                </div>
              </div>
            </TabPane>
            <TabPane tab="Find Local Professional" key="2">
              <LocalServiceProfessionalSearch />
              {
                professional.length > 0 ? professional.map((data) => {
                  return (
                    <>
                      <div className="local-professional-container mt-4">
                        <div className="local-professional-box d-flex align-items-start gap-3 ">
                          <div className="local-professional-image">
                            <img src={tenantUser1} alt="" />
                          </div>
                          <div className="local-professional-content">
                            <Link to={`/local-professional-details?id=${data.id}`}>
                              <div className="local-top-heading">Water Zone</div>
                            </Link>
                            {
                              data.isServiceProvider && (
                                <div className="local-main-heading d-flex align-items-center gap-2">
                                  Plumber Service <span className="new-post">New post</span>
                                </div>
                              )
                            }
                            <div className="local-info d-flex gap-3 align-items-center">
                              <div className="d-flex align-items-center gap-2">
                                <img src={MapLine} alt="" /> Chicago
                              </div>
                              <div className="d-flex align-items-center gap-2">
                                <img src={dollar} alt="" /> 50-55k
                              </div>
                            </div>
                            <div className="local-desc">
                              Lorem Ipsum is simply dummy text of the printing and
                              typesetting industry. Lorem Ipsum has been the industry's
                              standard dummy text ever since the 1500s,
                            </div>
                          </div>
                        </div>
                      </div>
                    </>

                  )

                })
                  : ""
              }


              <div className="pagination-container mt-4 text-end">
                <ConfigProvider
                  theme={{
                    components: {
                      Pagination: {
                        itemActiveBg: "#EF6B3E",
                        colorPrimary: "#fff",
                        itemSize: 50,
                        borderRadius: 2,
                        fontFamily: "montserrat",
                      },
                    },
                  }}
                >
                  <Pagination
                    size="large"
                    prevIcon={
                      <>
                        <img src={prevbtn} alt="" />
                      </>
                    }
                    nextIcon={
                      <>
                        <img src={nextbtn} alt="" />
                      </>
                    }
                    responsive={true}
                    defaultCurrent={1}
                    total={50}
                  />
                </ConfigProvider>
              </div>
            </TabPane>
          </Tabs>
        </ConfigProvider>
      </div>
    </>
  );
};

export default AllServiceProfessional;
