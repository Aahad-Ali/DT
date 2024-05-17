import React, { useState, useEffect } from "react";

import { Tabs, ConfigProvider, Upload, Table, Skeleton, message,Avatar } from "antd";
import chevronIconDown from "assets/chevron-down.png";
import SearchBar from "Helpers/SearchBar";
import trashIconWhite from "assets/trash-icon-white.png";
import viewIcon from "assets/Icon.png";
import editIcon from "assets/edit-05.png";
import deleteIcon from "assets/trash-01.png";
import settingIcon from "assets/three-dots.png";
import locationIcon from "assets/location.png";
import publishIcon from "assets/publish.png";
import bedroomIcon from "assets/list-icon-1.png";
import bathroomIcon from "assets/list-icon-2.png";
import sizeIcon from "assets/list-icon-3.png";
import parkingIcon from "assets/P.png";
import bedIcon from "assets/bed-icon.png";
import bathIcon from "assets/bath icon.png";
import sqftIcon from "assets/sqft-icon.png";
import { Link, useNavigate } from "react-router-dom";
import FileUploader from "Components/FileUploader/FileUploader";

// import Leaflet Map
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import SearchBarWithOutBtn from "Helpers/SearchBarWithOutBtn";
import UseGetHook from "Hooks/UseGetHook";
import UseUrlParamsHook from "Hooks/UseUrlParamsHook";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { GetPropertyId } from "Store/Slices/PropertyData";
import ConditionalFilter from "Hooks/ConditionalFilter";
import TenantTaskModal from "Modals/TenantTaskUnitModal/TenantTaskUnitModal";

const TenantPropertyDetailsView = () => {
  const navigate = useNavigate();
  const { TabPane } = Tabs;
  const { Dragger } = Upload;
  // select box icon
  let dropdownIcon;
  dropdownIcon = (
    <>
      <img src={chevronIconDown} alt="" />
    </>
  );

  // Array of Map markers
  const markers = [
    {
      geocode: [48.86, 2.3522],
      popUp: "Hello, I am pop up 1",
    },
  ];

  const customIcon = new Icon({
    iconUrl: require("assets/map-icon.png"),
    iconSize: [38, 38],
  });

  const { id, property_id } = UseUrlParamsHook();

  //States start
  const [showAddFile, setShowAddFile] = useState(false);
  const [selectedTableItem, setSelectedTableItem] = useState("");
  const [selectionType, setSelectionType] = useState("checkbox");
  const [key, setKey] = useState([]);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [Images, setImages] = useState([]);
  const dispatch = useDispatch();
  const [openModalTask, setOpenModalTask] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [component, setcomponent] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [deleteId, setDeleteId] = useState("");

  const search = useSelector((state) => {
    return state.Search.value;
  });
  const [form, setForm] = useState({
    file_name: "",
  });

  const [errors, setErrors] = useState({});
  const handleChange = (fieldName, value) => {
    setForm({
      ...form,
      [fieldName]: value,
    });
  };
  //States end

  const range = useSelector((state) => {
    return state.FilterValue.value;
  });
  const { filters, FilterObjects } = ConditionalFilter({ range });
  // const{FetchTenantPropertyFile, fileData}=UseGetHook()
  const { FetchFileId, fileData } = UseGetHook("files", id);
  // const { FetchPropertyTenant, TenantData } = UseGetHook(
  //   filters(FilterObjects) ? `&${filters(FilterObjects)}` : "",
  //   id
  // );
  const { amenities, fetchPropertyTenant, PropertyData } = UseGetHook(
    "property",
    id,
    filters(FilterObjects) ? `&${filters(FilterObjects)}` : ""
  );
  const { fetchTenantPropertyTask, TenantPropertyTaskData } = UseGetHook(
    "tasks",
    id
  );

  const { fetchTenantTaskId, TaskData, loader } = UseGetHook(
    filters(FilterObjects) ? `&${filters(FilterObjects)}` : "",
    id
  );
  // Form Input OnChanges
  // const handleChange = (value) => {
  //   console.log(`selected ${value}`);
  // };
  const { fetchTenantUnit, UnitData } = UseGetHook("property", id);
  dispatch(GetPropertyId(id));
  useEffect(() => {
    fetchPropertyTenant();
    fetchTenantUnit();
    fetchTenantTaskId();
    FetchFileId();
    fetchTenantPropertyTask();
  }, [range]);
  // fetch data==========

  const Search = useSelector((state) => {
    return state.Search.value;
  });

  // Data Table Functions
  const handleIconClick = (result) => {
    const filterData = data.filter((item) => {
      return item.key === result;
    });
    setKey(filterData[0]?.key);
    if (key === result) {
      setKey(null);
    } else {
      setKey(result);
    }
  };
  const formData = new FormData();

  const onOpenModalTask = () => {
    setOpenModalTask(true);
  };

  const onOpenModal = () => {
    setOpenModal(true);
  };
  const onCloseModal = () => {
    setOpenModal(false);
  };
  const onCloseModalTask = () => {
    setOpenModalTask(false);
  };
  const onOpenDeleteModal = () => {
    setOpenDeleteModal(true);
  };
  const onCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };
  // Units Table
  const columns = [
    {
      title: "Unit Name",
      dataIndex: "unitName",
      render: (text, unitName) => (
        <>
          <Link
            to={`/tenant-property-units-view?id=${unitName.id}&property=${id}`}
          >
            <img className="unit_table_name_img" src={""} alt="" />{" "}
            <span className="unit_table_name_text">{text}</span>
          </Link>
        </>
      ),
    },
    {
      title: "Unit Details",
      dataIndex: "details",
      //render: (text) => <><span>{text}</span></>,
      render: (text, details) => (
        <>
          <ul className="p-0 d-flex gap-3">
            <li className="list-style-none">
              <img src={bedIcon} alt="" />
              <span className="unit_table_details_text ms-2">
                {details.bed} Beds
              </span>
            </li>
            <li className="list-style-none">
              <img src={bathIcon} alt="" />
              <span className="unit_table_details_text ms-2">
                {details.bath} Bath
              </span>
            </li>
            <li className="list-style-none">
              <img src={sqftIcon} alt="" />
              <span className="unit_table_details_text ms-2">
                {details.sqft} sqft
              </span>
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "Rent Amount",
      dataIndex: "rentAmount",
      render: (text) => (
        <>
          <span className="unit_table_amount_text">{text}</span>
        </>
      ),
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
      title: "Future Status",
      dataIndex: "futureStatus",
      render: (text) => (
        <>
          <span className="unit_table_fstatus_text">{text}</span>
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
                  <li
                    onClick={() => {
                      navigate(
                        `/tenant-property-units-view?id=${setting.id}&property=${id}`
                      );
                    }}
                    className="list-style-none cursor"
                  >
                    {" "}
                    <img src={viewIcon} alt="" /> View
                  </li>
                  {/* <li
                    onClick={() => {
                      navigate("/properties-units-edit");
                    }}
                    className="list-style-none"
                  >
                    {" "}
                    <img src={editIcon} alt="" /> Edit
                  </li>
                  <li className="list-style-none">
                    {" "}
                    <img src={deleteIcon} alt="" /> Delete
                  </li> */}
                </ul>
              </div>
            )}
          </div>
        </>
      ),
    },
  ];
  const data = UnitData[0]
    ?.filter((data) => data.name.toLowerCase().includes(Search.toLowerCase()))
    .map((e, index) => ({
      key: index + 1,
      id: e.id,
      unitName: e.name,
      img: e.images[0],
      bed: e.bedroom,
      bath: e.bathroom,
      sqft: e.area,
      unitDetails: "+1 (555) 098-7654",
      rentAmount: `$${e.rent_amount}`,
      status: e.status || "N/A",
      futureStatus: "Not Rented",
    }));

  // Task Table
  const taskColumns = [
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
            {text ? ", " : "Not Set"}
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
                    <li className="list-style-none table-setting-dropdown-menu cursor">
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
  const tasksData = TenantPropertyTaskData.filter((e) =>
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
    related: e.property.title,
    status: e.status || "N/A",
  }));
  console.log(tasksData, "task status");
  const config = require("Helpers/config.json");

  const addPropertyFiles = () => {
    formData.append("name", form.file_name);
    Images.forEach((file) => {
      formData.append("file", file);
    });
    // formData.append("unit", id);
    formData.append("property", id);

    const newErrors = {};
    for (const key in form) {
      if (form[key] === "") {
        newErrors[key] = `${key} is required`;
      }
    }
    if (Images.length === 0) {
      newErrors["files"] = "file is required";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      fetch(`${config["baseUrl"]}/api/tenant/file`, {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: formData,
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          if (res.apiCallStatus === "success") {
            message.success("File Added Successfully");
            setShowAddFile(false);
            FetchFileId();
          }
        })
        .catch((e) => console.log(e));
    }
  };
  // Files Table
  const filesColumns = [
    {
      title: "File Name",
      dataIndex: "fileName",
      render: (text) => (
        <>
          <span className="property-table-name-text">
            <img
              className="rounded-5 property-table-image mw_40 mh_40 me-2"
              src={text.file}
              alt=""
            />{" "}
            {text.name}
          </span>
        </>
      ),
    },
    {
      title: "Properties",
      dataIndex: "property",
    },
    {
      title: "Owner",
      dataIndex: "owner",
      render: (text, type) => (
        <>
          <Avatar
            style={{
              backgroundColor: "#EF6B3E",
              verticalAlign: "middle",
            }}
            size="large"
          >
            {localStorage.getItem("name")[0]}
          </Avatar>
          <span className="tenant_table_name_text ms-3">
            {localStorage.getItem("name")}
          </span>
        </>
      ),
    },
    {
      title: "Date Uploaded",
      dataIndex: "date",
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
                      <img src={editIcon} alt="" /> Edit
                    </li>
                  </Link>

                  <Link>
                    <li
                      onClick={() => {
                        setDeleteId(setting.id);
                        setcomponent("file");
                        onOpenDeleteModal();
                      }}
                      className="list-style-none table-setting-dropdown-menu"
                    >
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
  const FileData = fileData
    .filter((data) => data.name.toLowerCase().includes(Search.toLowerCase()))
    .map((e, index) => ({
      key: index + 1,
      id: e.id,
      fileName: { file: e.file, name: e.name },
      property: "property 1",
      owner: e?.owner,
      date: new Date(e.created_at).toLocaleDateString(),
    }));

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
  let month = {
    0: "Jan",
    1: "Feb",
    2: "Mar",
    3: "Apr",
    4: "May",
    5: "Jun",
    6: "Jul",
    7: "Aug",
    8: "Sep",
    9: "Oct",
    10: "Nov",
    11: "Dec",
  };
  // const fetchFun = () => {
  //   if (component === "unit") {
  //     fetchTenantUnit();
  //   }  else if (component === "task") {
  //     fetchTenantPropertyTask
  //     ();
  //   }
  //     else if (component === "file") {
  //     FetchFileId();
  //   }
  // };
  return (
    <>
      {openModalTask === true ? (
        <TenantTaskModal
          id={id}
          onOpen={onOpenModal}
          onClose={onCloseModalTask}
        />
      ) : (
        ""
      )}
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
                horizontalItemGutter: window.innerWidth <= 425 ? 10 : 30,
                fontFamily: "Montserrat",
              },
            },
          }}
        >
          <Tabs
            centered
            defaultActiveKey="1"
            style={{ fontWeight: 500 }}
            className="property_details_view_tabs"
          >
            <TabPane tab="Overview" key="1">
              <div className="row d-flex justify-left-center mt-4">
                <div className="col-md-6">
                  <Swiper
                    style={{
                      "--swiper-navigation-color": "#fff",
                      "--swiper-pagination-color": "#fff",
                    }}
                    spaceBetween={10}
                    navigation={false}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper2"
                  >
                    {PropertyData[0]?.images.map((e) => {
                      return (
                        <SwiperSlide>
                          <img alt="" src={`${e}`} />
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                  <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView={4}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="property-detail-view-slider"
                  >
                    {PropertyData[0]?.images.map((e) => {
                      return (
                        <SwiperSlide>
                          <img alt="" src={`${e}`} />
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </div>
                <div className="col-md-6">
                  <div className="property-details-heading mt-3">
                    <p className="property-details-heading-title">
                      {PropertyData.length > 0 ? (
                        PropertyData[0]?.title
                      ) : (
                        <Skeleton paragraph={{ rows: 0 }} />
                      )}
                    </p>
                  </div>
                  <div className="property-details-view-title-content mt-5">
                    <div className="d-flex gap-2 pb-3">
                      {PropertyData.length > 0 ? (
                        <>
                          <img src={locationIcon} />
                          <span className="property-details-view-title-para">{`${PropertyData[0]?.address.address_line_1} , ${PropertyData[0]?.address.city}`}</span>
                        </>
                      ) : (
                        <Skeleton paragraph={{ rows: 0 }} />
                      )}
                    </div>
                    <div className="d-flex gap-2">
                      <img src={publishIcon} />
                      <span className="property-details-view-title-para">
                        <span>
                          {
                            month[
                              new Date(PropertyData[0]?.created_at).getMonth()
                            ]
                          }{" "}
                          {new Date(PropertyData[0]?.created_at).getDate()},{" "}
                          {new Date(PropertyData[0]?.created_at).getFullYear()}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <Tabs
                defaultActiveKey="2"
                className="property_details_view_sub_tabs mt-2"
              >
                <TabPane tab="Description" key="2">
                  <div className="row">
                    <div className="col-md-12">
                      <p className="properties_details_view_description_content">
                        {PropertyData.map((e) => e.description)}
                      </p>
                    </div>
                  </div>
                  <div className="row mt-5">
                    <div className="col-md-8">
                      <div className="d-flex icons-list-main">
                        <ul className="list-group tenant-property-details-overview">
                          <li className="list-group-item icons-list mb-4">
                            <img
                              src={bedroomIcon}
                              className="icons-list-image"
                            />
                            {PropertyData.map((e) => e.bedroom)} Bedrooms
                            <sup className="icons-list-sub-title">Bedrooms</sup>
                          </li>
                          <li className="list-group-item icons-list description-icon-center mb-4">
                            <img
                              src={bathroomIcon}
                              className="icons-list-image"
                            />
                            {PropertyData.map((e) => e.bathroom)} Bathrooms
                            <sup className="icons-list-sub-title">
                              Bathrooms
                            </sup>
                          </li>
                          <li className="list-group-item icons-list mb-4">
                            <img src={sizeIcon} className="icons-list-image" />
                            {PropertyData.map((e) => e.area)}sqft
                            <sup className="icons-list-sub-title-size">
                              Size
                            </sup>
                          </li>
                        </ul>
                      </div>
                      {/* <div className="d-flex icons-list-main">
                        <ul className="list-group tenant-property-details-overview">
                          <li className="list-group-item icons-list mb-4">
                            <img
                              src={rentAmountIcon}
                              className="icons-list-image"
                            />
                            {PropertyData.map((e) => e.rentAmount)} Rent
                            <sup className="icons-list-sub-title ">
                              Rent Amount
                            </sup>
                          </li>
                          <li className="list-group-item icons-list description-icon-center mb-4">
                            <img src={leaseIcon} className="icons-list-image" />
                            Month-to-Month
                            <sup className="icons-list-sub-title">Lease</sup>
                          </li>
                          <li className="list-group-item icons-list mb-4">
                            <img src={leaseIcon} className="icons-list-image" />
                            $180.00
                            <sup className="icons-list-sub-title-size">
                              Security Deposit
                            </sup>
                          </li>
                        </ul>
                      </div> */}
                    </div>
                    <div className="col-md-4">
                      <MapContainer center={[48.8566, 2.3522]} zoom={13}>
                        <TileLayer
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {markers.map((marker) => (
                          <Marker position={marker.geocode} icon={customIcon}>
                            <Popup>{marker.popUp}</Popup>
                          </Marker>
                        ))}
                      </MapContainer>
                    </div>
                  </div>
                </TabPane>
                <TabPane tab="Amenities" key="3">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="d-flex gap-5 icons-list-main">
                        <div className="row">
                          {amenities.map((amenity, index) => (
                            <div className="col-md-4 mt-4">
                              <img
                                src={parkingIcon}
                                alt=""
                                className="icons-list-image-unique me-2"
                              />
                              {amenity}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-8"></div>
                    <div className="col-md-4">
                      <MapContainer center={[48.8566, 2.3522]} zoom={13}>
                        <TileLayer
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {markers.map((marker) => (
                          <Marker position={marker.geocode} icon={customIcon}>
                            <Popup>{marker.popUp}</Popup>
                          </Marker>
                        ))}
                      </MapContainer>
                    </div>
                  </div>
                </TabPane>
              </Tabs>
            </TabPane>
            <TabPane tab="Units" key="4">
              <SearchBarWithOutBtn
                // route="/add-unit-details"
                // btnTitle="Add New Unit"
                unitsFilter={true}
              />
              {selectedTableItem.length >= 1 && (
                <div className="table-delete-icon mt-3">
                  <button className="table-delete-btn next-btn-main">
                    <img src={trashIconWhite} />
                    Delete
                  </button>
                </div>
              )}
              <div className="task-table-container mt-3">
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
                    pagination={false}
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
            </TabPane>
            <TabPane tab="Tasks" key="5">
              <SearchBar
                onClick={onOpenModalTask}
                btnTitle="Add New Task"
                innerPage={true}
                taskFilter={true}
              />
              {selectedTableItem.length >= 1 && (
                <div className="table-delete-icon mt-3">
                  <button className="table-delete-btn next-btn-main">
                    <img src={trashIconWhite} />
                    Delete
                  </button>
                </div>
              )}
              <div className="task-table-container mt-3">
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
                      Pagination: {
                        itemActiveBg: "#EF6B3E",
                      },
                    },
                  }}
                >
                  <Table
                    pagination={false}
                    className="scroll-remove scroll-responsive-tablet"
                    rowSelection={{
                      type: selectionType,
                      ...rowSelection,
                    }}
                    columns={taskColumns}
                    dataSource={tasksData}
                  />
                </ConfigProvider>
              </div>
            </TabPane>
            <TabPane tab="Files" key="6">
              {showAddFile === true ? (
                <>
                  <div className="container bg-white p-3 ">
                    <div className="row">
                      <div className="col-md-12">
                        <span className="property-details-input-title">
                          File Name<span className="sign-up-imp-star">*</span>
                        </span>
                        <input
                          onChange={(e) =>
                            handleChange("file_name", e.target.value)
                          }
                          type="text"
                          className="form-control"
                          placeholder="File Name"
                        />
                        {errors.file_name && (
                          <span className="text-danger fw-semibold mt-3">
                            {errors.file_name.split("_").join(" ")}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-12">
                        <div className="task-search-property-container position-relative">
                          <span className="property-details-input-title">
                            Property<span className="sign-up-imp-star">*</span>
                          </span>
                          <input
                            value={PropertyData[0]?.title}
                            disabled
                            type="text"
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row mt-3 text-center">
                      <div className="col-md-12">
                        <p className="text-start">
                          Upload Media
                          <span className="sign-up-imp-star">*</span>
                        </p>
                        <div className="dragger">
                          <FileUploader setImages={setImages} Images={Images} />
                          {errors.files && (
                            <span className="text-danger fw-semibold mt-3">
                              {errors.files}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="row mt-5">
                      <div className="col-md-6">
                        <button
                          className="cancel-btn"
                          onClick={() => setShowAddFile(false)}
                        >
                          Cancel
                        </button>
                      </div>
                      <div className="col-md-6">
                        <button
                          className="save-btn  w-100"
                          onClick={addPropertyFiles}
                        >
                          Add File
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <SearchBar
                    btnTitle="Add New File"
                    onClick={() => setShowAddFile(true)}
                    unitsFilter={true}
                  />
                  <div className="row">
                    <div className="col-md-12">
                      {selectedTableItem.length >= 1 && (
                        <div className="table-delete-icon mt-3">
                          <button className="table-delete-btn next-btn-main">
                            <img src={trashIconWhite} />
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
                            },
                          }}
                        >
                          <Table
                            pagination={false}
                            className="scroll-remove scroll-responsive-tablet"
                            rowSelection={{
                              type: selectionType,
                              ...rowSelection,
                            }}
                            columns={filesColumns}
                            dataSource={FileData}
                          />
                        </ConfigProvider>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </TabPane>
          </Tabs>
        </ConfigProvider>
      </div>
    </>
  );
};

export default TenantPropertyDetailsView;
