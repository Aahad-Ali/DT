import React, { useState, useEffect } from "react";
import searchIcon from "assets/New icons (7).png";
import filterIcon from "assets/filter.png";
import plusIcon from "assets/plus.png";
import homeIconOrange from "assets/home-icon.png";
import buildingIcon from "assets/building-07.png";
import buildingIconTwo from "assets/building-05.png";
import viewIcon from "assets/Icon.png";
import editIcon from "assets/edit-05.png";
import deleteIcon from "assets/trash-01.png";
import trashIconWhite from "assets/trash-icon-white.png";
import settingIcon from "assets/three-dots.png";
import checkMark from "assets/check-mark.png";
import chevronIconDown from "assets/chevron-down.png";
import { Link, useNavigate } from "react-router-dom";
import {
  Slider,
  Table,
  TreeSelect,
  Select,
  Button,
  Space,
  Divider,
  Checkbox,
  ConfigProvider,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import UseGetHook from "Hooks/UseGetHook";
import ConditionalFilter from "Hooks/ConditionalFilter";
import { useSelector } from "react-redux";
import Loader from "Helpers/Loader";

const TenantProperties = () => {
  // select box icon
  let dropdownIcon;
  dropdownIcon = (
    <>
      <img src={chevronIconDown} alt="" />
    </>
  );
  // States start
  const navigate = useNavigate();
  const [hideFilter, setHideFilter] = useState(false);
  const [minValue, setminValue] = useState("");
  const [maxValue, setmaxValue] = useState("");
  const [selectionType, setSelectionType] = useState("checkbox");
  const [selectedTableItem, setSelectedTableItem] = useState("");
  const [bedroomSelectAllChecked, setBedroomSelectAllChecked] = useState(false);
  const [bedroomTwoChecked, setBedroomTwoChecked] = useState(false);
  const [bedroomThreeChecked, setBedroomThreeChecked] = useState(false);
  const [bedroomFourChecked, setBedroomFourChecked] = useState(false);
  const [bedroomFiveChecked, setBedroomFiveChecked] = useState(false);
  const [bathroomSelectAllChecked, setBathroomSelectAllChecked] =
    useState(false);
  const [bathroomTwoChecked, setBathroomTwoChecked] = useState(false);
  const [bathroomThreeChecked, setBathroomThreeChecked] = useState(false);
  const [bathroomFourChecked, setBathroomFourChecked] = useState(false);
  const [bathroomFiveChecked, setBathroomFiveChecked] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [key, setKey] = useState([]);
  const [search, setSearch] = useState("");
  const [value, setValue] = useState();
  const [selectedItems, setSelectedItems] = useState([]);
  const [isScrollActive, setIsScrollActive] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);

  // States end

  const property_sub_type = useSelector((state) => {
    return state.FilterValue.property_sub_type;
  });
  const status = useSelector((state) => {
    return state.FilterValue.status;
  });
  const minRent = useSelector((state) => {
    return state.FilterValue.minRent;
  });
  const maxRent = useSelector((state) => {
    return state.FilterValue.maxRent;
  });
  const bedroom = useSelector((state) => {
    return state.FilterValue.bedroom;
  });
  const bathroom = useSelector((state) => {
    return state.FilterValue.bathroom;
  });
  const state = useSelector((state) => {
    return state.FilterValue.state;
  });

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

  const { filters, FilterObjects } = ConditionalFilter({
    property_sub_type,
    status,
    minRent,
    maxRent,
    state,
    ...(bedroom && bedroom.length ? { "bedroom[]": bedroom } : {}),
    ...(bathroom && bathroom.length ? { "bathroom[]": bathroom } : {}),
  });
  // Get Properties
  const { fetchPropertyTenant, PropertyData, loader } =
    UseGetHook("properties");
  useEffect(() => {
    fetchPropertyTenant();
  }, [property_sub_type, status, minRent, maxRent, bedroom, bathroom, state]);
  const columns = [
    {
      title: "Property Name",
      dataIndex: "propertyName",
      render: (text, propertyName) => (
        <>
          <Link
            to={`/tenant-property-details-view?id=${propertyName.key}`}
            className="property-table-name-text"
          >
            <img
              className="rounded-5 property-table-image mw_40 mh_40 me-2"
              src={`${propertyName.img[0]}`}
              alt=""
            />{" "}
            <span className="properties_dashboard_table_name_text">{text}</span>
          </Link>
        </>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (text, type) => (
        <>
          <span className="type-text-single-family rounded-4">
            {text.split("_").join(" ")}
          </span>
          {/* {type.key === '1' && <span className='type-text-single-family rounded-4'>Single family</span>}
                {type.key === '2' && <span className='type-text-multi-commercial rounded-4'>Multi Commercial</span>}
                {type.key === '3' && <span className='type-text-multi-family rounded-4'>Multi family</span>}
                {type.key === '4' && <span className='type-text-single-family rounded-4'>Single family</span>} */}
        </>
      ),
    },
    {
      title: "Address",
      dataIndex: "address",
      render: (text, add) => (
        <>
          <div className="properties_dashbaord_address_text">{text}</div>
          <span className="properties_dashbaord_address_text">
            {add.city} {add.state}, {add.zipcode}
          </span>
        </>
      ),
    },
    {
      title: "Rent Amount",
      dataIndex: "rentAmount",
      render: (text) => (
        <>
          <span className="properties_dashboard_table_amount_text">{text}</span>
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
                  <Link to={`/tenant-property-details-view?id=${setting.key}`}>
                    <li className="list-style-none table-setting-dropdown-menu">
                      {" "}
                      <img src={viewIcon} alt="" /> View
                    </li>
                  </Link>
                  {/* <Link>
                    <li
                      className="list-style-none table-setting-dropdown-menu"
                      onClick={() => {
                        //  onOpenEditModalTask();
                        //  setTaskId(setting.key);
                      }}
                    >
                      <img src={editIcon} alt="" /> Edit
                    </li>
                  </Link>
                  <Link>
                    <li
                      onClick={() => {
                        //  onOpenModal();
                        setDeleteId(setting.key);
                        //  setcomponent("property");
                      }}
                      className="list-style-none table-setting-dropdown-menu"
                    >
                      {" "}
                      <img src={deleteIcon} alt="" /> Delete
                    </li>
                  </Link> */}
                </ul>
              </div>
            )}
          </div>
        </>
      ),
    },
  ];
 

  const data = PropertyData.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase())
  ).map((e) => ({
    key: e.id,
    propertyName: e.title,
    img: e.images,
    city: e.address.city,
    state: e.address.state,
    zipcode: e.address.zipcode,
    type: `${e.property_sub_type}`,
    address: e.address.address_line_1,
    rentAmount: `$${e.rent_amount}`,
  }));
  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys} keys`);
      console.log(selectedTableItem.length);
      setSelectedTableItem(selectedRowKeys);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };

  //Filter By Dropdown
  const { SHOW_PARENT } = TreeSelect;
  const treeData = [
    {
      title: "Portfolio",
      value: "0-0",
      key: "0-0",
    },
    {
      title: "Clients",
      value: "0-1",
      key: "0-1",
      children: [
        {
          title: "Client 1",
          value: "0-1-0",
          key: "0-1-0",
        },
        {
          title: "Client 2",
          value: "0-1-1",
          key: "0-1-1",
        },
      ],
    },
  ];

  const onChange = (newValue) => {
    console.log("onChange ", value);
    setValue(newValue);
  };
  const tProps = {
    treeData,
    value,
    onChange,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: "Portfolio",
    treeDefaultExpandAll: false,
    treeDefaultExpandedKeys: ["0-1"],
  };

  //Status Dropdown
  const handleChange = (value) => {
    console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
  };
  const { Option } = Select;

  const initialItems = ["Los angeles", "Location 2", "Dallas TX"];

  const addItem = () => {
    console.log("Selected Items:", selectedItems);
  };

  const handleItemChange = (value) => {
    // Update the selected items when checkboxes are clicked.
    setSelectedItems(value);
  };

  const toggleScroll = () => {
    setIsScrollActive(!isScrollActive);
  };

  const rangeHandleChange = (value) => {
    setminValue(value[0]);
    setmaxValue(value[1]);
  };
  const handleIconClickImages = (icon) => {
    setSelectedIcon(icon);
  };

  let chevronIcon;
  chevronIcon = (
    <>
      <span className="me-2">
        <svg
          width={16}
          height={16}
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m4 9 8 8 8-8" />
        </svg>
      </span>
    </>
  );

  return (
    <>
      <div className="container-fluid d-lg-block p-3">
        <div className="row">
          <div className="search-bar mt-4">
            <form>
              <div className="input-icon">
                <span className="input-icon-addon">
                  <img src={searchIcon} alt="" className="icon" />
                </span>
                <input
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="Search"
                />
              </div>
            </form>
          </div>
        </div>
        <div className="row ">
          <div className="col-md-3">
            <div
              className={hideFilter === true ? "sub-headings mt-4" : "d-none"}
            >
              <h2 className="property-sub-title ">Filters</h2>
            </div>
          </div>
          <div
            className={
              hideFilter === true
                ? "col-md-12 d-flex justify-content-between"
                : "col-md-12 d-flex justify-content-between"
            }
          >
            <div className="sub-headings mt-4 d-flex gap-2 align-items-center">
              <h2 className="property-sub-title mb-0">Property</h2>
              <span className="badge badge-gray">
                <p className="badge-base-text">{PropertyData.length}</p>
              </span>
            </div>
            <div className="properties-dashbboard-btn-main btn-list mt-4">
              <button
                onClick={() => {
                  setHideFilter(!hideFilter);
                }}
                className="filter-btn"
              >
                <img
                  src={filterIcon}
                  alt=""
                  className="properties-filter-icon"
                />{" "}
                Filter
              </button>
              {/* <button
                onClick={() => {
                  navigate("/add-property-details");
                }}
                className="add-property-btn"
              >
                <img src={plusIcon} alt="" className="add-property-icon" /> Add
                Property
              </button> */}
            </div>
          </div>
        </div>
        <div
          className={
            hideFilter === true
              ? "direction-change-responsive col-md-12 d-flex gap-4"
              : "d-block"
          }
        >
          <div
            className={hideFilter === true ? "filter-main-section" : "d-none"}
          >
            <div className="filter-dropdown-section">
              <span className="filter-sub-title">Filter By</span>
            </div>
            <div className="row mt-4">
              <ConfigProvider
                theme={{
                  components: {
                    TreeSelect: {
                      zIndexPopupBase: 99999,
                      nodeHoverBg: "rgba(239, 107, 62, 0.16)",
                      colorBorder: "rgba(239, 107, 62, 0.16)",
                      nodeSelectedBg: "rgba(239, 107, 62, 0.16)",
                      borderRadius: 4,
                      colorTextPlaceholder: "#667085",
                      fontFamily: "montserrat",
                    },
                  },
                }}
              >
                <TreeSelect
                  style={{
                    width: "100%",
                    height: 45,
                    borderRadius: 4,
                  }}
                  suffixIcon={chevronIcon}
                  {...tProps}
                  className="properties-filter-by-dropdown"
                />
              </ConfigProvider>
            </div>
            <div className="row mt-4">
              <span className="property-details-input-title mt-2 mb-4">
                STATUS
              </span>
              <ConfigProvider
                theme={{
                  components: {
                    Select: {
                      colorPrimary: "#EF6B3E",
                      colorPrimaryHover: "#EF6B3E",
                      controlHeight: "45",
                      colorText: "#667085",
                      fontFamily: "Montserrat",
                      fontWeightStrong: 500,
                      colorTextPlaceholder: "#667085",
                      optionSelectedColor: "#000000",
                      controlItemBgHover: "#F2F4F7",
                      paddingSM: 16,
                      optionSelectedBg: "rgba(239, 107, 62, 0.16)",
                      borderRadius: 4,
                    },
                  },
                }}
              >
                <Select
                  suffixIcon={chevronIcon}
                  className="properties-dashboard-status-dropdown"
                  labelInValue
                  defaultValue={{
                    value: "Active",
                    label: "Active",
                  }}
                  style={{
                    width: "100%",
                  }}
                  onChange={handleChange}
                  options={[
                    {
                      value: "Active",
                      label: "Active",
                    },
                    {
                      value: "Inactive",
                      label: "Inactive",
                    },
                    {
                      value: "Archive",
                      label: "Archive",
                    },
                  ]}
                />
              </ConfigProvider>
            </div>
            <div className="row mt-4">
              <span className="property-details-input-title mt-2 mb-4">
                LOCATION
              </span>
              <ConfigProvider
                theme={{
                  components: {
                    Select: {
                      colorPrimary: "#EF6B3E",
                      colorPrimaryHover: "#EF6B3E",
                      controlHeight: "45",
                      fontFamily: "Montserrat",
                      colorTextPlaceholder: "#667085",
                      paddingSM: 16,
                      zIndexPopupBase: 99999,
                      optionSelectedBg: "rgba(239, 107, 62, 0.16)",
                      borderRadius: 4,
                    },
                  },
                }}
              >
                <Select
                  suffixIcon={chevronIcon}
                  className="properties-dashboard-location-dropdown"
                  mode="multiple" // Use mode="multiple" to enable selecting multiple items
                  placeholder="Select Location"
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <Divider
                        style={{
                          margin: "8px 0",
                        }}
                      />
                      <Space
                        style={{
                          padding: "0 8px 4px",
                        }}
                      >
                        <Button
                          type="text"
                          icon={<PlusOutlined />}
                          onClick={addItem}
                        >
                          Selected Location
                        </Button>
                      </Space>
                    </>
                  )}
                  onChange={handleItemChange} // Handle changes to the selected items
                >
                  {initialItems.map((item) => (
                    <Option key={item} value={item}>
                      <Checkbox checked={selectedItems.includes(item)} /> {item}
                    </Option>
                  ))}
                </Select>
              </ConfigProvider>
            </div>
            <div className="location-dropdown-section mt-4">
              <span className="filter-sub-title">Property Type</span>
              <br />
              <div className="icon-main-apan">
                <span
                  className={
                    selectedIcon === "single"
                      ? "active-property property-type-icons p-2 cursor"
                      : "property-type-icons p-2 cursor"
                  }
                >
                  <svg
                    className=""
                    onClick={() => handleIconClickImages("single")}
                    width={27}
                    height={27}
                    // fill="none"
                    stroke={selectedIcon === "single" ? "#EF6B3E" : "#D0D5DD"}
                    fill={"none"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <path d="M9 22V12h6v10" />
                  </svg>
                  {/* FIXED */}
                </span>
                <span
                  className={
                    selectedIcon === "multi_famly"
                      ? "active-property property-type-icons p-2 cursor"
                      : "property-type-icons p-2 cursor"
                  }
                >
                  <svg
                    className=""
                    onClick={() => handleIconClickImages("multi_famly")}
                    width={27}
                    height={27}
                    fill="none"
                    stroke={
                      selectedIcon === "multi_famly" ? "#EF6B3E" : "#D0D5DD"
                    }
                    background-color="#EF6B3E29"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8.25 19.5v3" />
                    <path d="M3.75 1.5h9a1.5 1.5 0 0 1 1.5 1.5v19.313a.188.188 0 0 1-.188.187H2.25V3a1.5 1.5 0 0 1 1.5-1.5v0Z" />
                    <path d="M15 9h5.25a1.5 1.5 0 0 1 1.5 1.5v12h-7.5V9.75A.75.75 0 0 1 15 9Z" />
                    <path
                      fill="currentColor"
                      stroke={
                        selectedIcon === "multi_famly" ? "active-property" : ""
                      }
                      d="M4.597 20.244a.75.75 0 1 1-.194-1.487.75.75 0 0 1 .194 1.487Z"
                    />
                    <path
                      fill="currentColor"
                      stroke={
                        selectedIcon === "multi_famly" ? "active-property" : ""
                      }
                      d="M4.597 16.494a.75.75 0 1 1-.194-1.487.75.75 0 0 1 .194 1.487Z"
                    />
                    <path
                      fill="currentColor"
                      stroke={
                        selectedIcon === "multi_famly" ? "active-property" : ""
                      }
                      d="M4.597 12.744a.75.75 0 1 1-.194-1.488.75.75 0 0 1 .194 1.488Z"
                    />
                    <path
                      fill="currentColor"
                      stroke={
                        selectedIcon === "multi_famly" ? "active-property" : ""
                      }
                      d="M4.597 8.994a.75.75 0 1 1-.194-1.488.75.75 0 0 1 .194 1.488Z"
                    />
                    <path
                      fill="currentColor"
                      stroke={
                        selectedIcon === "multi_famly" ? "active-property" : ""
                      }
                      d="M4.597 5.244a.75.75 0 1 1-.194-1.488.75.75 0 0 1 .194 1.488Z"
                    />
                    <path
                      fill="currentColor"
                      stroke={
                        selectedIcon === "multi_famly" ? "active-property" : ""
                      }
                      d="M8.347 16.494a.75.75 0 1 1-.194-1.487.75.75 0 0 1 .194 1.487Z"
                    />
                    <path
                      fill="currentColor"
                      stroke={
                        selectedIcon === "multi_famly" ? "active-property" : ""
                      }
                      d="M8.347 12.744a.75.75 0 1 1-.194-1.488.75.75 0 0 1 .194 1.488Z"
                    />
                    <path
                      fill="currentColor"
                      stroke={
                        selectedIcon === "multi_famly" ? "active-property" : ""
                      }
                      d="M8.347 8.994a.75.75 0 1 1-.194-1.488.75.75 0 0 1 .194 1.488Z"
                    />
                    <path
                      fill="currentColor"
                      stroke={
                        selectedIcon === "multi_famly" ? "active-property" : ""
                      }
                      d="M8.347 5.244a.75.75 0 1 1-.194-1.488.75.75 0 0 1 .194 1.488Z"
                    />
                    <path
                      fill="currentColor"
                      stroke={
                        selectedIcon === "multi_famly" ? "active-property" : ""
                      }
                      d="M12.097 20.244a.75.75 0 1 1-.194-1.487.75.75 0 0 1 .194 1.487Z"
                    />
                    <path
                      fill="currentColor"
                      stroke={
                        selectedIcon === "multi_famly" ? "active-property" : ""
                      }
                      d="M12.097 16.494a.75.75 0 1 1-.194-1.487.75.75 0 0 1 .194 1.487Z"
                    />
                    <path
                      fill="currentColor"
                      stroke={
                        selectedIcon === "multi_famly" ? "active-property" : ""
                      }
                      d="M12.097 12.744a.75.75 0 1 1-.194-1.489.75.75 0 0 1 .194 1.489Z"
                    />
                    <path
                      fill="currentColor"
                      stroke={
                        selectedIcon === "multi_famly" ? "active-property" : ""
                      }
                      d="M12.53 8.784a.75.75 0 0 0-.002-1.06.75.75 0 0 0-1.06-.003.75.75 0 0 0 .003 1.06.75.75 0 0 0 1.06.003Z"
                    />
                    <path
                      fill="currentColor"
                      stroke={
                        selectedIcon === "multi_famly" ? "active-property" : ""
                      }
                      d="M12.097 5.244a.75.75 0 1 1-.194-1.488.75.75 0 0 1 .194 1.488Z"
                    />
                    <path
                      fill="currentColor"
                      stroke={
                        selectedIcon === "multi_famly" ? "active-property" : ""
                      }
                      d="M18.75 18.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z"
                    />
                    <path
                      fill="currentColor"
                      stroke={
                        selectedIcon === "multi_famly" ? "active-property" : ""
                      }
                      d="M18.75 15a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z"
                    />
                    <path
                      fill="currentColor"
                      stroke={
                        selectedIcon === "multi_famly" ? "active-property" : ""
                      }
                      d="M18.75 11.25a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z"
                    />
                    <path
                      fill="currentColor"
                      stroke={
                        selectedIcon === "multi_famly" ? "active-property" : ""
                      }
                      d="M15.75 18.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z"
                    />
                    <path
                      fill="currentColor"
                      stroke={
                        selectedIcon === "multi_famly" ? "active-property" : ""
                      }
                      d="M15.75 15a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z"
                    />
                    <path
                      fill="currentColor"
                      stroke={
                        selectedIcon === "multi_famly" ? "active-property" : ""
                      }
                      d="M15.75 11.25a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <span className="filter-sub-title-unique mt-4">Bedroom</span>
            <div className="location-dropdown-section d-flex gap-5 mt-4">
              <div className="dropdown-sub-section">
                <p className="bedroom-select-multi-options mt-2">
                  <input
                    onChange={(e) => {
                      setBedroomSelectAllChecked(e.target.checked);
                    }}
                    type="checkbox"
                    name=""
                    id=""
                    checked={bedroomSelectAllChecked}
                    className={bedroomSelectAllChecked ? "checked" : ""}
                  />{" "}
                  Select All
                </p>
                <p className="bedroom-select-multi-options mt-2">
                  <input
                    onChange={(e) => {
                      setBedroomThreeChecked(e.target.checked);
                    }}
                    type="checkbox"
                    name=""
                    id=""
                    checked={bedroomThreeChecked}
                    className={bedroomThreeChecked ? "checked" : ""}
                  />{" "}
                  3 Bedroom
                </p>
                <p className="bedroom-select-multi-options mt-2">
                  <input
                    onChange={(e) => {
                      setBedroomFiveChecked(e.target.checked);
                    }}
                    type="checkbox"
                    name=""
                    id=""
                    checked={bedroomFiveChecked}
                    className={bedroomFiveChecked ? "checked" : ""}
                  />{" "}
                  5 Bedroom
                </p>
              </div>
              <div className="dropdown-sub-section">
                <p className="bedroom-select-multi-options mt-2">
                  <input
                    onChange={(e) => {
                      setBedroomTwoChecked(e.target.checked);
                    }}
                    type="checkbox"
                    name=""
                    id=""
                    checked={bedroomTwoChecked}
                    className={bedroomTwoChecked ? "checked" : ""}
                  />{" "}
                  2 Bedroom
                </p>
                <p className="bedroom-select-multi-options mt-2">
                  <input
                    onChange={(e) => {
                      setBedroomFourChecked(e.target.checked);
                    }}
                    type="checkbox"
                    name=""
                    id=""
                    checked={bedroomFourChecked}
                    className={bedroomFourChecked ? "checked" : ""}
                  />{" "}
                  4 Bedroom
                </p>
              </div>
            </div>
            <div className="location-dropdown-section mt-4">
              <span className="filter-sub-title">Rent Amount Range</span>
              <ConfigProvider
                theme={{
                  components: {
                    Slider: {
                      colorPrimary: "#000000",
                      colorPrimaryBorder: "#000000",
                      colorPrimaryBorderHover: "#000000",
                      colorBgElevated: "#000000",
                    },
                  },
                }}
              >
                <Slider
                  onChange={rangeHandleChange}
                  range={{
                    draggableTrack: true,
                  }}
                  max={6000}
                  min={0}
                  defaultValue={[500, 3800]}
                />
              </ConfigProvider>
            </div>
            <div className="price-range-value d-flex gap-3 mb-4">
              <span className="dollar-sign">
                $&nbsp;
                <input
                  onChange={(e) => setminValue(e.target.value)}
                  type="text"
                  className="price-range-input-box"
                  value={`${minValue.toLocaleString()}`}
                />
              </span>
              <div className="range-icon">-</div>
              <span className="dollar-sign">
                $&nbsp;
                <input
                  onChange={(e) => setmaxValue(e.target.value)}
                  type="text"
                  className="w-50 price-range-input-box"
                  value={`${maxValue.toLocaleString()}`}
                />
              </span>
            </div>
            <span className="filter-sub-title mt-4">Bathroom</span>
            <div className="location-dropdown-section d-flex gap-5 mt-4">
              <div className="dropdown-sub-section">
                <p className="bedroom-select-multi-options mt-2">
                  <input
                    onChange={(e) => {
                      setBathroomSelectAllChecked(e.target.checked);
                    }}
                    type="checkbox"
                    name=""
                    id=""
                    checked={bathroomSelectAllChecked}
                    className={bathroomSelectAllChecked ? "checked" : ""}
                  />{" "}
                  Select All
                </p>
                <p className="bedroom-select-multi-options mt-2">
                  <input
                    onChange={(e) => {
                      setBathroomThreeChecked(e.target.checked);
                    }}
                    type="checkbox"
                    name=""
                    id=""
                    checked={bathroomThreeChecked}
                    className={bathroomThreeChecked ? "checked" : ""}
                  />{" "}
                  3 Bathroom
                </p>
                <p className="bedroom-select-multi-options mt-2">
                  <input
                    onChange={(e) => {
                      setBathroomFiveChecked(e.target.checked);
                    }}
                    type="checkbox"
                    name=""
                    id=""
                    checked={bathroomFiveChecked}
                    className={bathroomFiveChecked ? "checked" : ""}
                  />{" "}
                  5 Bathroom
                </p>
              </div>
              <div className="dropdown-sub-section">
                <p className="bedroom-select-multi-options mt-2">
                  <input
                    onChange={(e) => {
                      setBathroomTwoChecked(e.target.checked);
                    }}
                    type="checkbox"
                    name=""
                    id=""
                    checked={bathroomTwoChecked}
                    className={bathroomTwoChecked ? "checked" : ""}
                  />{" "}
                  2 Bathroom
                </p>
                <p className="bedroom-select-multi-options mt-2">
                  <input
                    onChange={(e) => {
                      setBathroomFourChecked(e.target.checked);
                    }}
                    type="checkbox"
                    name=""
                    id=""
                    checked={bathroomFourChecked}
                    className={bathroomFourChecked ? "checked" : ""}
                  />{" "}
                  4 Bathroom
                </p>
              </div>
            </div>
            <div className="apply-now-filter-btn mt-4">
              <button className="add-new-task-btn">Apply Now</button>
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
          <div
            className={
              hideFilter === true
                ? "property-main-section mt-3"
                : "property-main-section mt-3"
            }
          >
            <div
              className={
                hideFilter === true
                  ? "scrollable-table ${isScrollActive ? 'active"
                  : ""
              }
            >
              {loader ? (
                <Loader />
              ) : (
                <ConfigProvider
                  theme={{
                    components: {
                      Table: {
                        colorTextHeading: "#667085",
                        colorText: "#667085",
                        fontSize: 14,
                        fontWeightStrong: 500,
                        fontFamily: "Montserrat",
                        zIndexPopup: 99999,
                      },
                      Pagination: {
                        itemActiveBg: "#EF6B3E",
                      },
                    },
                  }}
                >
                  <Table
                    className="properties-dashboard-table-list properties-dashboard-table"
                    rowSelection={{
                      type: selectionType,
                      ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={data}
                    pagination={true}
                  />
                </ConfigProvider>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <div className="container-fluid position-relative d-md-block d-lg-none d-sm-block p-3">
        <div className="row">
          <div className="search-bar mt-4">
            <form>
              <div className="input-icon">
                <span className="input-icon-addon">
                  <img src={searchIcon} alt="" className="icon" />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                />
              </div>
            </form>
          </div>
        </div>
        <div className="properties-dashbboard-btn-main btn-list mt-4">
          <button
            onClick={() => {
              setHideFilter(!hideFilter);
            }}
            className="filter-btn"
          >
            <img src={filterIcon} alt="" className="properties-filter-icon" />{" "}
            Filter
          </button>
          <button
            onClick={() => {
              navigate("/add-property-details");
            }}
            className="add-property-btn"
          >
            <img src={plusIcon} alt="" className="add-property-icon" /> Add
            Property
          </button>
        </div>
        <div
          className={
            hideFilter === true
              ? " filter-main-section-res-open "
              : "filter-main-section-res-close"
          }
        >
          <div className="filter-dropdown-section">
            <span className="filter-sub-title">Filter By</span>
            <span
              onClick={() => {
                setHideFilter(false);
              }}
              className="filter-sub-title float-end cursor"
            >
              <svg
                width={30}
                height={30}
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </span>
          </div>
          <div className="row mt-4">
            <ConfigProvider
              theme={{
                components: {
                  TreeSelect: {
                    zIndexPopupBase: 99999,
                    colorPrimaryHover: "#EF6B3E",
                    optionSelectedBg: "rgba(239, 107, 62, 0.16)",
                    borderRadius: 4,
                    colorTextPlaceholder: "#667085",
                    fontFamily: "montserrat",
                  },
                },
              }}
            >
              <TreeSelect
                {...tProps}
                className="properties-filter-by-dropdown"
              />
            </ConfigProvider>
          </div>
          <div className="row mt-4">
            <span className="property-details-input-title mt-2 mb-4">
              STATUS
            </span>
            <ConfigProvider
              theme={{
                components: {
                  Select: {
                    colorPrimary: "#EF6B3E",
                    colorPrimaryHover: "#EF6B3E",
                    controlHeight: "45",
                    colorText: "#667085",
                    fontFamily: "Montserrat",
                    fontWeightStrong: 500,
                    colorTextPlaceholder: "#667085",
                    optionSelectedColor: "#000000",
                    controlItemBgHover: "#F2F4F7",
                    paddingSM: 16,
                    optionSelectedBg: "#F2F4F7",
                    zIndexPopup: 99999,
                  },
                },
              }}
            >
              <Select
                className="properties-dashboard-status-dropdown"
                labelInValue
                defaultValue={{
                  value: "Active",
                  label: "Active",
                }}
                style={{
                  width: "100%",
                }}
                onChange={handleChange}
                options={[
                  {
                    value: "Active",
                    label: "Active",
                  },
                  {
                    value: "Inactive",
                    label: "Inactive",
                  },
                  {
                    value: "Archive",
                    label: "Archive",
                  },
                ]}
              />
            </ConfigProvider>
          </div>
          <div className="row mt-4">
            <span className="property-details-input-title mt-2 mb-4">
              LOCATION
            </span>
            <ConfigProvider
              theme={{
                components: {
                  Select: {
                    colorPrimary: "#EF6B3E",
                    colorPrimaryHover: "#EF6B3E",
                    controlHeight: "45",
                    fontFamily: "Montserrat",
                    colorTextPlaceholder: "#667085",
                    paddingSM: 16,
                    zIndexPopup: 99999,
                  },
                },
              }}
            >
              <Select
                className="properties-dashboard-location-dropdown"
                mode="multiple" // Use mode="multiple" to enable selecting multiple items
                placeholder="Select Location"
                dropdownRender={(menu) => (
                  <>
                    {menu}
                    <Divider
                      style={{
                        margin: "8px 0",
                      }}
                    />
                    <Space
                      style={{
                        padding: "0 8px 4px",
                      }}
                    >
                      <Button
                        type="text"
                        icon={<PlusOutlined />}
                        onClick={addItem}
                      >
                        Selected Location
                      </Button>
                    </Space>
                  </>
                )}
                onChange={handleItemChange} // Handle changes to the selected items
              >
                {initialItems.map((item) => (
                  <Option key={item} value={item}>
                    <Checkbox checked={selectedItems.includes(item)} /> {item}
                  </Option>
                ))}
              </Select>
            </ConfigProvider>
          </div>
          <div className="location-dropdown-section mt-4">
            <span className="filter-sub-title">Property Type</span>
            <br />
            <span className="property-type-icons mt-4 mb-4">
              <img
                className={`p-2 cursor ${
                  selectedIcon === "home" ? "property-type-icons-active" : ""
                }`}
                src={homeIconOrange}
                alt=""
                onClick={() => handleIconClickImages("home")}
              />
              <img
                className={`p-2 cursor ${
                  selectedIcon === "building"
                    ? "property-type-icons-active"
                    : ""
                }`}
                src={buildingIcon}
                alt=""
                onClick={() => handleIconClickImages("building")}
              />
              <img
                className={`p-2 cursor ${
                  selectedIcon === "buildingTwo"
                    ? "property-type-icons-active"
                    : ""
                }`}
                src={buildingIconTwo}
                alt=""
                onClick={() => handleIconClickImages("buildingTwo")}
              />
            </span>
          </div>
          <span className="filter-sub-title-unique mt-4">Bedroom</span>
          <div className="location-dropdown-section d-flex gap-5 mt-4">
            <div className="dropdown-sub-section">
              <p className="bedroom-select-multi-options">
                <input
                  onChange={(e) => {
                    setBedroomSelectAllChecked(e.target.checked);
                  }}
                  type="checkbox"
                  name=""
                  id=""
                  checked={bedroomSelectAllChecked}
                  className={bedroomSelectAllChecked ? "checked" : ""}
                />{" "}
                Select All
              </p>
              <p className="bedroom-select-multi-options">
                <input
                  onChange={(e) => {
                    setBedroomThreeChecked(e.target.checked);
                  }}
                  type="checkbox"
                  name=""
                  id=""
                  checked={bedroomThreeChecked}
                  className={bedroomThreeChecked ? "checked" : ""}
                />{" "}
                3 Bedroom
              </p>
              <p className="bedroom-select-multi-options">
                <input
                  onChange={(e) => {
                    setBedroomFiveChecked(e.target.checked);
                  }}
                  type="checkbox"
                  name=""
                  id=""
                  checked={bedroomFiveChecked}
                  className={bedroomFiveChecked ? "checked" : ""}
                />{" "}
                5 Bedroom
              </p>
            </div>
            <div className="dropdown-sub-section">
              <p className="bedroom-select-multi-options">
                <input
                  onChange={(e) => {
                    setBedroomTwoChecked(e.target.checked);
                  }}
                  type="checkbox"
                  name=""
                  id=""
                  checked={bedroomTwoChecked}
                  className={bedroomTwoChecked ? "checked" : ""}
                />{" "}
                2 Bedroom
              </p>
              <p className="bedroom-select-multi-options">
                <input
                  onChange={(e) => {
                    setBedroomFourChecked(e.target.checked);
                  }}
                  type="checkbox"
                  name=""
                  id=""
                  checked={bedroomFourChecked}
                  className={bedroomFourChecked ? "checked" : ""}
                />{" "}
                4 Bedroom
              </p>
            </div>
          </div>
          <div className="location-dropdown-section mt-4">
            <span className="filter-sub-title">Rent Amount Range</span>
            <ConfigProvider
              theme={{
                components: {
                  Slider: {
                    colorPrimary: "#000000",
                    colorPrimaryBorder: "#000000",
                    colorPrimaryBorderHover: "#000000",
                    colorBgElevated: "#000000",
                  },
                },
              }}
            >
              <Slider
                onChange={rangeHandleChange}
                range={{
                  draggableTrack: true,
                }}
                max={6000}
                min={0}
                defaultValue={[500, 3800]}
              />
            </ConfigProvider>
          </div>
          <div className="price-range-value d-flex gap-3 mb-4">
            <input
              onChange={(e) => setminValue(e.target.value)}
              type="text"
              className="w-50 price-range-input-box"
              value={`$ ${minValue.toLocaleString()}`}
            />
            <div className="range-icon">-</div>
            <input
              onChange={(e) => setmaxValue(e.target.value)}
              type="text"
              className="w-50 price-range-input-box"
              value={`$ ${maxValue.toLocaleString()}`}
            />
          </div>
          <span className="filter-sub-title mt-4">Bathroom</span>
          <div className="location-dropdown-section d-flex gap-5 mt-4">
            <div className="dropdown-sub-section">
              <p className="bedroom-select-multi-options">
                <input
                  onChange={(e) => {
                    setBathroomSelectAllChecked(e.target.checked);
                  }}
                  type="checkbox"
                  name=""
                  id=""
                  checked={bathroomSelectAllChecked}
                  className={bathroomSelectAllChecked ? "checked" : ""}
                />{" "}
                Select All
              </p>
              <p className="bedroom-select-multi-options">
                <input
                  onChange={(e) => {
                    setBathroomThreeChecked(e.target.checked);
                  }}
                  type="checkbox"
                  name=""
                  id=""
                  checked={bathroomThreeChecked}
                  className={bathroomThreeChecked ? "checked" : ""}
                />{" "}
                3 Bathroom
              </p>
              <p className="bedroom-select-multi-options">
                <input
                  onChange={(e) => {
                    setBathroomFiveChecked(e.target.checked);
                  }}
                  type="checkbox"
                  name=""
                  id=""
                  checked={bathroomFiveChecked}
                  className={bathroomFiveChecked ? "checked" : ""}
                />{" "}
                5 Bathroom
              </p>
            </div>
            <div className="dropdown-sub-section">
              <p className="bedroom-select-multi-options">
                <input
                  onChange={(e) => {
                    setBathroomTwoChecked(e.target.checked);
                  }}
                  type="checkbox"
                  name=""
                  id=""
                  checked={bathroomTwoChecked}
                  className={bathroomTwoChecked ? "checked" : ""}
                />{" "}
                2 Bathroom
              </p>
              <p className="bedroom-select-multi-options">
                <input
                  onChange={(e) => {
                    setBathroomFourChecked(e.target.checked);
                  }}
                  type="checkbox"
                  name=""
                  id=""
                  checked={bathroomFourChecked}
                  className={bathroomFourChecked ? "checked" : ""}
                />{" "}
                4 Bathroom
              </p>
            </div>
          </div>
          <div className="apply-now-filter-btn mt-4">
            <button className="add-new-task-btn w-100 p-2">Apply Now</button>
          </div>
        </div>
        <div className="property-res-table mt-3">
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
              className="properties-dashboard-table-list scrollable-table table-responsive"
              rowSelection={{
                type: selectionType,
                ...rowSelection,
              }}
              columns={columns}
              dataSource={data}
              pagination={true}
            />
          </ConfigProvider>
        </div>
      </div> */}
    </>
  );
};

export default TenantProperties;
