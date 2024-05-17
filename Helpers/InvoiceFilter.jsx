import React, { useEffect, useRef, useState } from "react";
import chevronIconDown from "assets/chevron-down.png";
import FilterIcon from "assets/filter.png";
import { Select, ConfigProvider, DatePicker } from "antd";
import UseGetHook from "Hooks/UseGetHook";
import { FilterValue } from "Store/Slices/FilterSlice";
import { useDispatch } from "react-redux";
import calendar from "assets/calendar.png";
const InvoiceFilter = () => {
  let dropdownIcon;
  dropdownIcon = (
    <>
      <img src={chevronIconDown} alt="" />
    </>
  );
  // States
  const [taskFilterDropdown, settaskFilterDropdown] = useState(false);
  //   const [fromDate, setfromDate] = useState("");
  //   const [toDate, settoDate] = useState("");
  const [filterVal, setFilterVal] = useState([
    {
      value: "",
      property: "",
    },
  ]);
  const dispatch = useDispatch();
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateRange, setDateRange] = useState([]);
  // States End
  const { fetchProperty, PropertyData } = UseGetHook("property");
  useEffect(() => {
    fetchProperty();
  }, []);
  const handleOptionSelect = (fieldName, value) => {
    setFilterVal((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const arrowHandler = (fieldName) => (value) =>
    handleOptionSelect(fieldName, value);
  const handleFilter = () => {
    if (filterVal.value) {
      const value = filterVal.value;
      dispatch(FilterValue({ value }));
    }
    if (filterVal.property) {
      const property = filterVal.property;
      dispatch(FilterValue({ property }));
    }
  };
  //   FROM TO DATE FILTER HANDLERS
  const calendarRef = useRef(null);

  const handleCalendarClick = () => {
    setShowCalendar(!showCalendar);
    // Check if the calendar is currently hidden
    if (!showCalendar) {
      // If it's hidden, show the calendar
      setShowCalendar(true);
    }
  };
  const handleDateChange = (dates) => {
    const fromDate = new Date(dates[0]).toLocaleDateString();
    const toDate = new Date(dates[1]).toLocaleDateString();
    dispatch(FilterValue({ toDate }));
    dispatch(FilterValue({ fromDate }));
    if (dates.length === 2) {
      setShowCalendar(false);
    }
  };
  const handleCalendarContainerClick = (event) => {
    event.stopPropagation();
  };
  //   FROM TO DATE FILTER HANDLERS
  const resetFilter = () => {
    dispatch(FilterValue({ reset: "reset" }));
  };
  return (
    <>
      <div className="d-flex gap-3 justify-content-center align-items-center">
        <div
          onClick={handleCalendarClick}
          className="calendar cursor"
          ref={calendarRef}
        >
          <img src={calendar} alt="" />
          {showCalendar && (
            <div
              className="calendar-container"
              onClick={handleCalendarContainerClick}
            >
              <ConfigProvider
                theme={{
                  components: {
                    DatePicker: {
                      cellWidth: window.innerWidth <= 500 ? 20 : 36,
                      // padding: window.innerWidth <= 500 ? 6 : 8,
                      fontSize: window.innerWidth <= 500 ? 12 : 14,
                      cellHeight: window.innerWidth <= 500 ? 18 : 24,
                      colorPrimary: "#EF6B3E",
                      cellActiveWithRangeBg: "#FFEAD5",
                    },
                  },
                }}
              >
                <DatePicker.RangePicker
                  value={dateRange}
                  onChange={handleDateChange}
                  open={true}
                  className="searchbar-datepicker"
                />
              </ConfigProvider>
            </div>
          )}
        </div>
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
                onChange={arrowHandler("value")}
              />
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
                placeholder="Property"
                style={{
                  width: "100%",
                  height: 27,
                  textAlign: "left",
                }}
                onChange={arrowHandler("property")}
              >
                {PropertyData.map((title) => (
                  <Select.Option key={title.id} value={title.id}>
                    {title.title}
                  </Select.Option>
                ))}
              </Select>
            </ConfigProvider>
            <button
              onClick={handleFilter}
              className="task-filter-dropdown-btn w-100 mt-2"
            >
              Apply
            </button>
            <button
              onClick={resetFilter}
              className="task-filter-dropdown-btn w-100 mt-2"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceFilter;
