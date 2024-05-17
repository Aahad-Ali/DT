import React, { useState } from "react";
import searchIcon from "assets/New icons (7).png";
import filterIcon from "assets/filter.png";
import propertyImage from "assets/office-skyscrapers-business-district 2.png";
import propertyImage2 from "assets/office-skyscrapers-business-district 2-1.png";
import propertyImage3 from "assets/office-skyscrapers-business-district 2-2.png";
import homeIconOrange from "assets/home-icon.png";
import buildingIcon from "assets/building-07.png";
import buildingIconTwo from "assets/building-05.png";
import viewIcon from "assets/Icon.png";
import editIcon from "assets/edit-05.png";
import archiveIcon from "assets/archive.png";
import deleteIcon from "assets/trash-01.png";
import settingIcon from "assets/three-dots.png";
import typeIcon from "assets/help-circle.png";
import checkMark from "assets/check-mark.png";
import { useNavigate } from "react-router-dom";
import {
  Slider,
  Table,
  TreeSelect,
  Select,
  Button,
  Space,
  Divider,
  Checkbox,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import PropertyDeleteModal from "Modals/PropertyDeleteModal/PropertyDeleteModal";
import PropertyRestoredModal from "Modals/PropertyRestoredModal/PropertyRestoredModal";
const PropertiesDeleteView = () => {
  // States start
  const [hideFilter, setHideFilter] = useState(false);
  const [minValue, setminValue] = useState("");
  const [maxValue, setmaxValue] = useState("");
  const [selectionType, setSelectionType] = useState("checkbox");
  const [openModal, setOpenModal] = useState(false);
  const [openModalRestored, setOpenModalRestored] = useState(false);
  const [key, setKey] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isScrollActive, setIsScrollActive] = useState(false);
  const [value, setValue] = useState();
  const [selectedIcon, setSelectedIcon] = useState(null);
  const navigate = useNavigate();
  // States end

  // Modal Function
  const onOpenModal = () => {
    setOpenModal(true);
  };
  const onCloseModal = () => {
    setOpenModal(false);
  };
  const onOpenModalRestored = () => {
    setOpenModalRestored(true);
  };
  const onCloseModalRestored = () => {
    setOpenModalRestored(false);
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
      title: "Property Name",
      dataIndex: "propertyName",
      render: (text, propertyName) => (
        <>
          {propertyName.key === "1" && (
            <img
              className="property-table-image mw_40 mh_40"
              src={propertyImage}
            />
          )}
          {propertyName.key === "2" && (
            <img
              className="property-table-image mw_40 mh_40"
              src={propertyImage2}
            />
          )}
          {propertyName.key === "3" && (
            <img
              className="property-table-image mw_40 mh_40"
              src={propertyImage3}
            />
          )}
          {propertyName.key === "4" && (
            <img
              className="property-table-image mw_40 mh_40"
              src={propertyImage}
            />
          )}{" "}
          <span className="properties_dashboard_table_name_text">{text}</span>
        </>
      ),
    },
    {
      title: "Phone No",
      dataIndex: "phone",
      render: (text) => (
        <>
          <span className="properties_dashbaord_table_phone_text">{text}</span>
        </>
      ),
    },
    {
      title: (
        <>
          TYPE <img src={typeIcon} alt="Type Icon" />
        </>
      ),
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
              Multi family
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
      title: "ADDRESS",
      dataIndex: "address",
      render: (text) => (
        <>
          <div className="properties_dashbaord_address_text">{text}</div>
          <span className="properties_dashbaord_address_text">TX 75201</span>
        </>
      ),
    },
    {
      title: "RENT AMOUNT",
      dataIndex: "rentAmount",
      render: (text) => (
        <>
          <span className="properties_dashboard_table_amount_text">{text}</span>
        </>
      ),
    },
    {
      title: "TENANTS",
      dataIndex: "tenants",
      render: (text) => (
        <>
          <div>{text}</div>
          <span className="current-tenant-text">
            <img src={checkMark} alt="" /> Current Tenant
          </span>
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
                      navigate("/property-details-view");
                    }}
                    className="list-style-none"
                  >
                    {" "}
                    <img src={viewIcon} alt="" /> View
                  </li>
                  <li className="list-style-none">
                    {" "}
                    <img src={editIcon} alt="" /> Edit
                  </li>
                  <li onClick={onOpenModalRestored} className="list-style-none">
                    {" "}
                    <img src={archiveIcon} alt="" /> Restore
                  </li>
                  <li onClick={onOpenModal} className="list-style-none">
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
  const data = [
    {
      key: "1",
      propertyName: "2418 Ellingwood...",
      phone: "+1 (555) 098-7654",
      type: "Single family",
      address: "1500 Marilla St,",
      rentAmount: "$381.76",
      tenants: "Emily Durkheim",
    },
    {
      key: "2",
      propertyName: "735 Pennington...",
      phone: "+1 (555) 567-8901",
      type: "Multi Commercial",
      address: "1500 Marilla St,",
      rentAmount: "$359.77",
      tenants: "Emily Durkheim",
    },
    {
      key: "3",
      propertyName: "735 Pennington...",
      phone: "+1 (555) 321-0987",
      type: "Multi family",
      address: "1500 Marilla St,",
      rentAmount: "$276.18",
      tenants: "Emily Durkheim",
    },
    {
      key: "4",
      propertyName: "735 Pennington...",
      phone: "+1 (555) 432-1098",
      type: "Single family",
      address: "1500 Marilla St,",
      rentAmount: "$509.34",
      tenants: "Emily Durkheim",
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
    placeholder: "Please select",
    style: {
      width: "100%",
      height: "45px",
    },
    treeDefaultExpandAll: false,
    treeDefaultExpandedKeys: ["0-1"],
  };

  //Status Dropdown
  const handleChange = (value) => {
    console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
  };

  //Location Dropdown
  /*let index = 0;
    const [items, setItems] = useState(['Los angeles', 'New york', 'Dallas TX']);
    const [name, setName] = useState('');
    const inputRef = useRef(null);
    const addItem = (e) => {
        e.preventDefault();
        setItems([...items, name || `New item ${index++}`]);
        setName('');
        setTimeout(() => {
          inputRef.current?.focus();
        }, 0);
    };*/
  const { Option } = Select;

  const initialItems = ["Los angeles", "Location 2", "Dallas TX"];

  const addItem = () => {
    // Handle the action when the "Selected Location" button is clicked.
    // For example, you can add the selected items to another list.
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

  return (
    <>
      {openModal && (
        <PropertyDeleteModal
          deleteBtnText="Delete Property"
          onClose={onCloseModal}
        />
      )}
      {openModalRestored && (
        <PropertyRestoredModal
          propertyRestoredBtnText="Go To Properties"
          route="properties-dashboard"
          onClose={onCloseModalRestored}
        />
      )}
      <div className="container-fluid bg-white p-3">
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
        <div className="row">
          <div className="col-md-3">
            <div
              className={hideFilter === true ? "sub-headings mt-4" : "d-none"}
            >
              <h2 className="property-sub-title">Filters</h2>
            </div>
          </div>
          <div
            className={
              hideFilter === true
                ? "col-md-9 d-flex justify-content-between"
                : "col-md-12 d-flex justify-content-between"
            }
          >
            <div className="sub-headings mt-4 d-flex gap-2 align-items-center">
              <h2 className="property-sub-title">Property</h2>
              <span className="badge badge-gray">
                <p className="badge-base-text">241</p>
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
            </div>
          </div>
        </div>
        <div className={hideFilter === true ? "d-flex gap-4" : "d-block"}>
          <div
            className={
              hideFilter === true ? "col-md-3 filter-main-section" : "d-none"
            }
          >
            <div className="filter-dropdown-section">
              <span className="filter-sub-title">Filter By</span>
            </div>
            <div className="row mt-4">
              <TreeSelect {...tProps} />
            </div>
            <div className="row mt-4">
              <span className="property-details-input-title mt-2 mb-4">
                STATUS
              </span>
              <Select
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
            </div>
            <div className="row mt-4">
              <span className="property-details-input-title mt-2 mb-4">
                LOCATION
              </span>
              <Select
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
                <input
                  type="checkbox"
                  id="property_type1"
                  name="property_type1"
                  value="Select All"
                />
                <label for="property_type1"> Select All</label>
                <br />
                <input
                  type="checkbox"
                  id="property_type2"
                  name="property_type2"
                  value="3 Bedroom"
                />
                <label for="property_type2"> 3 Bedroom</label>
                <br />
                <input
                  type="checkbox"
                  id="property_type3"
                  name="property_type3"
                  value="5 Bedroom"
                  checked
                />
                <label for="property_type3"> 5 Bedroom</label>
                <br />
                <br />
              </div>
              <div className="dropdown-sub-section">
                <input
                  type="checkbox"
                  id="property_type4"
                  name="property_type4"
                  value="2 Bedroom"
                  checked
                />
                <label for="property_type4"> 2 Bedroom</label>
                <br />
                <input
                  type="checkbox"
                  id="property_type5"
                  name="property_type5"
                  value="4 Bedroom"
                />
                <label for="property_type5"> 4 Bedroom</label>
                <br />
              </div>
            </div>
            <div className="location-dropdown-section mt-4">
              <span className="filter-sub-title">Rent Amount Range</span>
              <Slider
                onChange={rangeHandleChange}
                range={{
                  draggableTrack: true,
                }}
                max={6000}
                min={0}
                defaultValue={[500, 3800]}
              />
            </div>
            <div className="price-range-value d-flex gap-3 mb-4">
              <input
                onChange={(e) => setminValue(e.target.value)}
                type="text"
                className="w-50"
                value={`$ ${minValue.toLocaleString()}`}
              />
              <div className="range-icon">-</div>
              <input
                onChange={(e) => setmaxValue(e.target.value)}
                type="text"
                className="w-50"
                value={`$ ${maxValue.toLocaleString()}`}
              />
            </div>
            <span className="filter-sub-title mt-4">Bathroom</span>
            <div className="location-dropdown-section d-flex gap-5 mt-4">
              <div className="dropdown-sub-section">
                <input
                  type="checkbox"
                  id="vehicle1"
                  name="vehicle1"
                  value="Bike"
                />
                <label for="vehicle1"> Select All</label>
                <br />
                <input
                  type="checkbox"
                  id="vehicle2"
                  name="vehicle2"
                  value="Car"
                />
                <label for="vehicle2"> 3 Bathroom</label>
                <br />
                <input
                  type="checkbox"
                  id="vehicle3"
                  name="vehicle3"
                  value="Boat"
                  checked
                />
                <label for="vehicle3"> 5 Bathroom</label>
                <br />
                <br />
              </div>
              <div className="dropdown-sub-section">
                <input
                  type="checkbox"
                  id="vehicle1"
                  name="vehicle1"
                  value="Bike"
                  checked
                />
                <label for="vehicle1"> 2 Bathroom</label>
                <br />
                <input
                  type="checkbox"
                  id="vehicle2"
                  name="vehicle2"
                  value="Car"
                />
                <label for="vehicle2"> 4 Bathroom</label>
                <br />
              </div>
            </div>
          </div>
          <div
            className={
              hideFilter === true
                ? "col-md-9 property-main-section mt-3"
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
              <Table
                className="properties-dashboard-table-list"
                rowSelection={{
                  type: selectionType,
                  ...rowSelection,
                }}
                columns={columns}
                dataSource={data}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertiesDeleteView;
