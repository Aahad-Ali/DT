import React, { useState } from "react";
import chevronIconDown from "../assets/chevron-down.png";
import FilterIcon from "../assets/filter.png";
import { Select, ConfigProvider, DatePicker } from "antd";

const AccountFilter = () => {
  let dropdownIcon;
  dropdownIcon = (
    <>
      <img src={chevronIconDown} alt="" />
    </>
  );

  const [taskFilterDropdown, settaskFilterDropdown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);
  const [dateSelected, setDateSelected] = useState(false);

  const handleOptionSelect = (value) => {
    // Check if the selected option is the one to show the date picker for
    if (value === "Custom") {
      setShowDatePicker(true);
    } else {
      setShowDatePicker(false);
      // Handle other selected values here if needed
    }
  };

  const handleDateSelection = (dates) => {
    if (!dateSelected) {
      setSelectedDates(dates);
      setDateSelected(true);
    } else {
      setDateSelected(false);
    }
  };
  return (
    <>
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
            ? "filter-dropdown position-absolute"
            : "d-none"
        }
      >
        <div className="filter-checkbox-container">
          <p className="task-filter-dropdown-title mb-2">FILTER BY</p>
          <p className="task-filter-dropdown-sub-title mb-1">Default</p>
          <ConfigProvider
            theme={{
              components: {
                Select: {
                  zIndexPopupBase: 99999,
                  colorPrimaryHover: "#EF6B3E",
                  optionSelectedBg: "rgba(239, 107, 62, 0.16)",
                  borderRadius: 4,
                  colorTextPlaceholder: "#ABAEB1",
                  fontFamily: "Montserrat",
                  colorBorder: "#d9d9d9",
                  optionSelectedFontWeight: 400,
                  optionSelectedColor: "#000",
                  colorText: "#000",
                },
                DatePicker: {
                  zIndexPopup: 99999,
                  //fontFamily: 'Montserrat',
                  //fontSize: 16,
                  colorText: "#667085",
                  colorTextPlaceholder: "#667085",
                  colorPrimaryHover: "#EF6B3E",
                  borderRadius: 4,
                  colorPrimary: "#EF6B3E",
                },
              },
            }}
          >
            <Select
              className="mb-3"
              suffixIcon={dropdownIcon}
              placeholder="Custom"
              style={{
                width: "100%",
                height: 27,
                textAlign: "left",
              }}
              options={[
                {
                  value: "Custom",
                  label: "Custom",
                },
                {
                  value: "Today",
                  label: "Today",
                },
                {
                  value: "This Week",
                  label: "This Week",
                },
                {
                  value: "This Month",
                  label: "This Month",
                },
                {
                  value: "Quarterly",
                  label: "Quarterly",
                },
                {
                  value: "Yearly",
                  label: "Yearly",
                },
              ]}
              onChange={handleOptionSelect}
            />
            {(showDatePicker || dateSelected) && (
              <>
                <DatePicker.RangePicker
                  suffixIcon={""}
                  className="mb-3"
                  style={{ width: "100%" }}
                  onChange={handleDateSelection}
                  value={selectedDates}
                  placeholder={["Start Date", "End Date"]}
                />
              </>
            )}
          </ConfigProvider>
          <ConfigProvider
            theme={{
              components: {
                Select: {
                  zIndexPopupBase: 99999,
                  colorPrimaryHover: "#EF6B3E",
                  optionSelectedBg: "rgba(217, 104, 65, 0.22)",
                  borderRadius: 4,
                  colorTextPlaceholder: "#ABAEB1",
                  fontFamily: "Montserrat",
                  colorBorder: "#d9d9d9",
                  optionSelectedFontWeight: 400,
                  optionSelectedColor: "#000",
                  colorText: "#000",
                },
              },
            }}
          >
            <Select
              className="mb-3"
              suffixIcon={dropdownIcon}
              placeholder="Type"
              style={{
                width: "100%",
                height: 27,
                textAlign: "left",
              }}
              options={[
                {
                  value: "Current",
                  label: "Current",
                },
                {
                  value: "Savings",
                  label: "Savings",
                },
              ]}
            />
          </ConfigProvider>
          <p className="task-filter-dropdown-sub-title mb-1">Status</p>
          <div className="task-filter-dropdown-priority-options">
            <div className="d-flex align-items-center mb-1">
              <input type="checkbox" name="" id="" />{" "}
              <span className="task-filter-dropdown-priority-options-text">
                Active
              </span>
            </div>
            <div className="d-flex align-items-center mb-1">
              <input type="checkbox" name="" id="" />{" "}
              <span className="task-filter-dropdown-priority-options-text">
                Not Started
              </span>
            </div>
          </div>
          <button className="task-filter-dropdown-btn w-100 mt-2">Apply</button>
        </div>
      </div>
    </>
  );
};

export default AccountFilter;
