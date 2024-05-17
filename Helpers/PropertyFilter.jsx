import { ConfigProvider, Select, Slider } from "antd";
import React, { useState } from "react";
import { FilterValue } from "../Store/Slices/FilterSlice";
import { useDispatch } from "react-redux";
import UseGetHook from "../Hooks/UseGetHook";
const PropertyFilter = ({ hideFilter }) => {
  // States
  const [minValue, setminValue] = useState("");
  const [maxValue, setmaxValue] = useState("");
  const [bedroomChecked, setBedroomChecked] = useState({
    2: false,
    3: false,
    4: false,
    5: false,
  });
  const [bathChecked, setBathChecked] = useState({
    2: false,
    3: false,
    4: false,
    5: false,
  });
  const { states, fetchStates } = UseGetHook("states");
  const bedForm = [
    {
      id: 1,
      name: "one",
      label: "Select All",
      inputId: "select_all",
    },
    {
      id: 2,
      name: "two",
      label: "2 Bedroom",
      inputId: "2_Bedroom",
    },
    {
      id: 3,
      name: "three",
      label: "3 Bedroom",
      inputId: "3_Bedroom",
    },
    {
      id: 4,
      name: "four",
      label: "4 Bedroom",
      inputId: "4_Bedroom",
    },
    {
      id: 5,
      name: "five",
      label: "5 Bedroom",
      inputId: "5_Bedroom",
    },
  ];
  const bathForm = [
    {
      id: 1,
      name: "one",
      label: "Select All",
      inputId: "select_all",
    },
    {
      id: 2,
      name: "two",
      label: "2 Bathroom",
      inputId: "2_Bathroom",
    },
    {
      id: 3,
      name: "three",
      label: "3 Bathroom",
      inputId: "3_Bathroom",
    },
    {
      id: 4,
      name: "four",
      label: "4 Bathroom",
      inputId: "4_Bathroom",
    },
    {
      id: 5,
      name: "five",
      label: "5 Bathroom",
      inputId: "5_Bathroom",
    },
  ];
  const [selectedIcon, setSelectedIcon] = useState("");
  const [filterVal, setFilterVal] = useState([
    {
      status: "",
      state: "",
    },
  ]);
  const dispatch = useDispatch();
  // States End
  const [selectedItems, setSelectedItems] = useState([]);

  const addItem = () => {
    console.log("Selected Items:", selectedItems);
  };
  const handleItemChange = (value) => {
    // Update the selected items when checkboxes are clicked.
    setSelectedItems(value);
  };

  const handleIconClickImages = (icon) => {
    setSelectedIcon(icon);
  };
  const handleChange = (fieldName, value) => {
    setFilterVal((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };
  useState(() => {
    fetchStates();
  }, []);
  const rangeHandleChange = (value) => {
    setminValue(value[0]);
    setmaxValue(value[1]);
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
  const filterHandler = () => {
    if (selectedIcon.length > 0) {
      const property_sub_type = selectedIcon;
      dispatch(FilterValue({ property_sub_type }));
    }
    if (minValue !== "") {
      const minRent = minValue;
      dispatch(FilterValue({ minRent }));
    }
    if (maxValue !== "") {
      const maxRent = maxValue;
      dispatch(FilterValue({ maxRent }));
    }
    if (filterVal.status !== "") {
      const status = filterVal.status;
      dispatch(FilterValue({ status }));
    }
    if (bedroomChecked) {
      const bedroom = bedroomChecked;
      dispatch(FilterValue({ bedroom }));
    }
    if (bathChecked) {
      const bathroom = bathChecked;
      dispatch(FilterValue({ bathroom }));
    }
    if (filterVal.state !== "") {
      const state = filterVal.state;
      dispatch(FilterValue({ state }));
    }
  };
  const handleBed = (value) => {
    if (value)
      setBedroomChecked((pre) => ({
        ...pre,
        ...Object.fromEntries([[value, !bedroomChecked[value]]]),
      }));
  };
  const handleBath = (value) => {
    if (value)
      setBathChecked((pre) => ({
        ...pre,
        ...Object.fromEntries([[value, !bathChecked[value]]]),
      }));
  };
  const resetFilter = () => {
    dispatch(FilterValue({ reset: "reset" }));
  };
  return (
    <div
      className={
        hideFilter === true ? "col-md-3 filter-main-section" : "d-none"
      }
    >
      <div className="filter-dropdown-section">
        <span className="filter-sub-title">Filter By</span>
      </div>
      <div className="row mt-4">
        <span className="property-details-input-title mt-2 mb-4">STATUS</span>
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
                zIndexPopup: 99999,
              },
            },
          }}
        >
          <Select
            suffixIcon={chevronIcon}
            className="properties-dashboard-status-dropdown"
            defaultValue={{
              value: "Active",
              label: "Active",
            }}
            style={{
              width: "100%",
            }}
            onChange={(e) => handleChange("status", e)}
            options={[
              {
                value: "Active",
                label: "Active",
              },
              {
                value: "In Active",
                label: "InActive",
              },
              {
                value: "Archived",
                label: "Archived",
              },
            ]}
          />
        </ConfigProvider>
      </div>
      <div className="row mt-4">
        <span className="property-details-input-title p-2">LOCATION</span>
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
                zIndexPopup: 99999,
              },
            },
          }}
        >
          <Select
            suffixIcon={chevronIcon}
            className="properties-dashboard-status-dropdown"
            placeholder="Location"
            style={{
              width: "100%",
            }}
            onChange={(e) => handleChange("state", e)}
            options={states.map((e) => {
              return { value: e.id, label: e.name };
            })}
          />
        </ConfigProvider>
      </div>
      <div className="location-dropdown-section mt-4  ">
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
              stroke={selectedIcon === "multi_famly" ? "#EF6B3E" : "#D0D5DD"}
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
                stroke={selectedIcon === "multi_famly" ? "active-property" : ""}
                d="M4.597 20.244a.75.75 0 1 1-.194-1.487.75.75 0 0 1 .194 1.487Z"
              />
              <path
                fill="currentColor"
                stroke={selectedIcon === "multi_famly" ? "active-property" : ""}
                d="M4.597 16.494a.75.75 0 1 1-.194-1.487.75.75 0 0 1 .194 1.487Z"
              />
              <path
                fill="currentColor"
                stroke={selectedIcon === "multi_famly" ? "active-property" : ""}
                d="M4.597 12.744a.75.75 0 1 1-.194-1.488.75.75 0 0 1 .194 1.488Z"
              />
              <path
                fill="currentColor"
                stroke={selectedIcon === "multi_famly" ? "active-property" : ""}
                d="M4.597 8.994a.75.75 0 1 1-.194-1.488.75.75 0 0 1 .194 1.488Z"
              />
              <path
                fill="currentColor"
                stroke={selectedIcon === "multi_famly" ? "active-property" : ""}
                d="M4.597 5.244a.75.75 0 1 1-.194-1.488.75.75 0 0 1 .194 1.488Z"
              />
              <path
                fill="currentColor"
                stroke={selectedIcon === "multi_famly" ? "active-property" : ""}
                d="M8.347 16.494a.75.75 0 1 1-.194-1.487.75.75 0 0 1 .194 1.487Z"
              />
              <path
                fill="currentColor"
                stroke={selectedIcon === "multi_famly" ? "active-property" : ""}
                d="M8.347 12.744a.75.75 0 1 1-.194-1.488.75.75 0 0 1 .194 1.488Z"
              />
              <path
                fill="currentColor"
                stroke={selectedIcon === "multi_famly" ? "active-property" : ""}
                d="M8.347 8.994a.75.75 0 1 1-.194-1.488.75.75 0 0 1 .194 1.488Z"
              />
              <path
                fill="currentColor"
                stroke={selectedIcon === "multi_famly" ? "active-property" : ""}
                d="M8.347 5.244a.75.75 0 1 1-.194-1.488.75.75 0 0 1 .194 1.488Z"
              />
              <path
                fill="currentColor"
                stroke={selectedIcon === "multi_famly" ? "active-property" : ""}
                d="M12.097 20.244a.75.75 0 1 1-.194-1.487.75.75 0 0 1 .194 1.487Z"
              />
              <path
                fill="currentColor"
                stroke={selectedIcon === "multi_famly" ? "active-property" : ""}
                d="M12.097 16.494a.75.75 0 1 1-.194-1.487.75.75 0 0 1 .194 1.487Z"
              />
              <path
                fill="currentColor"
                stroke={selectedIcon === "multi_famly" ? "active-property" : ""}
                d="M12.097 12.744a.75.75 0 1 1-.194-1.489.75.75 0 0 1 .194 1.489Z"
              />
              <path
                fill="currentColor"
                stroke={selectedIcon === "multi_famly" ? "active-property" : ""}
                d="M12.53 8.784a.75.75 0 0 0-.002-1.06.75.75 0 0 0-1.06-.003.75.75 0 0 0 .003 1.06.75.75 0 0 0 1.06.003Z"
              />
              <path
                fill="currentColor"
                stroke={selectedIcon === "multi_famly" ? "active-property" : ""}
                d="M12.097 5.244a.75.75 0 1 1-.194-1.488.75.75 0 0 1 .194 1.488Z"
              />
              <path
                fill="currentColor"
                stroke={selectedIcon === "multi_famly" ? "active-property" : ""}
                d="M18.75 18.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z"
              />
              <path
                fill="currentColor"
                stroke={selectedIcon === "multi_famly" ? "active-property" : ""}
                d="M18.75 15a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z"
              />
              <path
                fill="currentColor"
                stroke={selectedIcon === "multi_famly" ? "active-property" : ""}
                d="M18.75 11.25a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z"
              />
              <path
                fill="currentColor"
                stroke={selectedIcon === "multi_famly" ? "active-property" : ""}
                d="M15.75 18.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z"
              />
              <path
                fill="currentColor"
                stroke={selectedIcon === "multi_famly" ? "active-property" : ""}
                d="M15.75 15a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z"
              />
              <path
                fill="currentColor"
                stroke={selectedIcon === "multi_famly" ? "active-property" : ""}
                d="M15.75 11.25a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z"
              />
            </svg>
          </span>
        </div>
      </div>
      <span className="filter-sub-title-unique mt-4">Bedroom</span>
      <div className="location-dropdown-section row">
        {bedForm.map((bed, index) => {
          return (
            <div className="d-flex align-items-center col-md-6">
              <input
                onChange={(e) => {
                  handleBed(index + 1);
                }}
                type="checkbox"
                name=""
                id={bed.inputId}
              />
              <label htmlFor={bed.inputId}>{bed.label}</label>
            </div>
          );
        })}
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
            min={1}
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
            className="price-range-input-box"
            value={`${maxValue.toLocaleString()}`}
          />
        </span>
      </div>
      <span className="filter-sub-title mt-4">Bathroom</span>
      <div className="location-dropdown-section row">
        {bathForm.map((bath, index) => {
          return (
            <div className="d-flex align-items-center col-md-6">
              <input
                onChange={(e) => {
                  handleBath(index + 1);
                }}
                type="checkbox"
                name=""
                id={bath.inputId}
              />
              <label
                className="property-filter-bath-text"
                htmlFor={bath.inputId}
              >
                {bath.label}
              </label>
            </div>
          );
        })}
      </div>
      <div className="apply-now-filter-btn mt-4">
        <button onClick={filterHandler} className="add-new-task-btn">
          Apply Now
        </button>
      </div>
      <div className="apply-now-filter-btn mt-4">
        <button onClick={resetFilter} className="add-new-task-btn">
          Reset
        </button>
      </div>
    </div>
  );
};

export default PropertyFilter;
