import React, { useState, useRef, useEffect } from "react";
import searchIcon from "assets/search.png";
import FilterIcon from "assets/filter.png";
import chevronIconDown from "assets/chevron-down.png";
import subtractIcon from "assets/subtract-minus-remove.png";
import calendar from "assets/calendar.png";
import calendarIcon from "assets/calendar-icon.png";
import { useNavigate } from "react-router-dom";
import { Select, ConfigProvider, Checkbox, DatePicker } from "antd";
import { useDispatch } from "react-redux";
import { getValue } from "Store/Slices/SearchSlice";
import TaskFilter from "./TaskFilter";
import CustomerQueriesFilter from "./CustomersQueriesFilter";
import FilesFilter from "./FilesFilter";
import InvoiceFilter from "./InvoiceFilter";
import UnitsFilter from "./UnitsFilter";
import NotesFilter from "./NotesFilter";
import AccountFilter from "./AccountFilter";
import LeaseFilter from "./LeaseFilter";
import ProspectsFilter from "./ProspectsFilter";
import VendorsFilter from "./VendorsFilter";
import TenantFilter from "./TenantFilter";

const SearchBarWithOutBtn = ({
  btnTitle,
  onClick,
  route,
  taskFilter,
  tenantFilter,
  vendorsFilter,
  prospectsFilter,
  leaseFilter,
  accountingFilter,
  notesFilter,
  unitsFilter,
  serviceProfessionalFilter,
  customerQueriesFilter,
  invoiceFilter,
  fileFilter,
  innerPage
}) => {
  const [search, setSearch] = useState("");
  const [taskFilterDropdown, settaskFilterDropdown] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [propertyOptions, setPropertyOptions] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);
  const [dateSelected, setDateSelected] = useState(false);
  const [dateRange, setDateRange] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);

  // Search Start
  const dispatch = useDispatch();
  dispatch(getValue(search));
  // Search End
  let dropdownIcon;
  dropdownIcon = (
    <>
      <img src={chevronIconDown} alt="" />
    </>
  );
  let swapIcon;
  swapIcon = (
    <>
      <img src={subtractIcon} alt="" />
    </>
  );
  // select date icon
  let dateIcon;
  dateIcon = (
    <>
      <img src={calendarIcon} alt="" />
    </>
  );
  const navigate = useNavigate();
  const searchClickHandler = () => {
    if (!route) {
      onClick();
    } else {
      navigate(`/${route}`);
    }
  };

  const { Option } = Select;
  const initialItems = ["Los angeles", "New york", "Dallas TX"];
  const initialItemsServices = ["Plumbing", "Carpenter", "Electrician"];
  const handleItemChange = (value) => {
    // Update the selected items when checkboxes are clicked.
    setSelectedItems(value);
  };

  // Get Properties
  const config = require("./config.json");
  useEffect(() => {
    fetch(`${config["baseUrl"]}/api/property`, {
      method: "GET",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.apiCallStatus === "success") {
          const titles = res.message.map((e) => e.title); // Extracting only the titles
          setPropertyOptions(titles);
          console.log("Fetch success");
        } else {
          console.log(res, "error");
        }
      });
  }, []);

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
    setDateRange(dates);
    // Check if both start date and end date are selected
    if (dates.length === 2) {
      setShowCalendar(false); // Close the calendar
    }
  };

  // Prevent the click event from bubbling up and closing the calendar
  const handleCalendarContainerClick = (event) => {
    event.stopPropagation();
  };
  useEffect(() => {
    console.log(unitsFilter, "UNITSSS");
  }, []);
  return (
    <>
      <div className="row d-flex">
        {serviceProfessionalFilter ? (
          <div className="search-bar d-flex align-items-center gap-3">
            <div className="task-search-input position-relative flex-grow-1 ">
              <input
                type="text"
                placeholder="Search"
                className="form-control search-form-control-task "
              />
              <div className="search-icon-task">
                <img src={searchIcon} alt="" />
              </div>
            </div>
            <button
              onClick={() => {
                settaskFilterDropdown(!taskFilterDropdown);
              }}
              className="filter-btn d-flex align-items-center"
            >
              + <img src={FilterIcon} alt="" /> Filter
            </button>
            <div
              className={
                taskFilterDropdown === true
                  ? "service-professional-filter-dropdown position-absolute"
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
                        colorPrimary: "#EF6B3E",
                        colorPrimaryHover: "#EF6B3E",
                        colorTextPlaceholder: "#ABAEB1",
                        fontFamily: "Montserrat",
                        controlItemBgActive: "rgba(239, 107, 62, 0.16)",
                        colorText: "#101828",
                        colorTextDisabled: "#101828",
                      },
                      Checkbox: {
                        colorPrimary: "#EF6B3E",
                        colorPrimaryHover: "#EF6B3E",
                      },
                    },
                  }}
                >
                  <Select
                    className="mb-3 custom-checkbox"
                    suffixIcon={dropdownIcon}
                    placeholder="Location"
                    style={{
                      width: "100%",
                    }}
                    onChange={handleItemChange}
                  >
                    {initialItems.map((item) => (
                      <Option key={item} value={item} className="custom-select">
                        <Checkbox checked={selectedItems.includes(item)} />{" "}
                        {item}
                      </Option>
                    ))}
                  </Select>
                </ConfigProvider>
                <ConfigProvider
                  theme={{
                    components: {
                      Select: {
                        zIndexPopupBase: 99999,
                        colorPrimary: "#EF6B3E",
                        colorPrimaryHover: "#EF6B3E",
                        colorTextPlaceholder: "#ABAEB1",
                        fontFamily: "Montserrat",
                        controlItemBgActive: "rgba(239, 107, 62, 0.16)",
                        colorText: "#101828",
                        colorTextDisabled: "#101828",
                      },
                      Checkbox: {
                        colorPrimary: "#EF6B3E",
                        colorPrimaryHover: "#EF6B3E",
                      },
                    },
                  }}
                >
                  <Select
                    className="mb-3 custom-checkbox"
                    suffixIcon={dropdownIcon}
                    placeholder="Services"
                    style={{
                      width: "100%",
                    }}
                    onChange={handleItemChange}
                  >
                    {initialItemsServices.map((item) => (
                      <Option key={item} value={item} className="custom-select">
                        <Checkbox checked={selectedItems.includes(item)} />{" "}
                        {item}
                      </Option>
                    ))}
                  </Select>
                </ConfigProvider>
                <p className="task-filter-dropdown-sub-title mb-1">Status</p>
                <div className="task-filter-dropdown-priority-options">
                  <div className="d-flex align-items-center mb-1">
                    <input type="checkbox" name="" id="" />{" "}
                    <span className="task-filter-dropdown-priority-options-text">
                      Accepted
                    </span>
                  </div>
                  <div className="d-flex align-items-center mb-1">
                    <input type="checkbox" name="" id="" />{" "}
                    <span className="task-filter-dropdown-priority-options-text">
                      Connected
                    </span>
                  </div>
                  <div className="d-flex align-items-center mb-1">
                    <input type="checkbox" name="" id="" />{" "}
                    <span className="task-filter-dropdown-priority-options-text">
                      Pending
                    </span>
                  </div>
                  <div className="d-flex align-items-center mb-1">
                    <input type="checkbox" name="" id="" />{" "}
                    <span className="task-filter-dropdown-priority-options-text">
                      Decline
                    </span>
                  </div>
                </div>
                <button className="task-filter-dropdown-btn w-100 mt-2">
                  Apply
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="col-lg-10 col-md-12 mb-4">
              {/* Desktop */}
              <div className="task-search-input position-relative">
                <input
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  placeholder="Search"
                  className="form-control search-form-control-task"
                />
                <div className="search-icon-task">
                  <img src={searchIcon} alt="" />
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-12 text-center">
              <div className="task-buttons d-flex gap-3 justify-content-center align-items-center">
                <div className="position-relative">
                  {taskFilter ? (
                    <TaskFilter innerPage={innerPage} />
                  ) : tenantFilter ? (
                    <TenantFilter innerPage={innerPage} />
                  ) : vendorsFilter ? (
                    <VendorsFilter />
                  ) : prospectsFilter ? (
                    <ProspectsFilter />
                  ) : leaseFilter ? (
                    <LeaseFilter />
                  ) : accountingFilter ? (
                    <AccountFilter />
                  ) : notesFilter ? (
                    <NotesFilter />
                  ) : customerQueriesFilter ? (
                    <CustomerQueriesFilter />
                  ) : unitsFilter ? (
                    <UnitsFilter />
                  ) : invoiceFilter ? (
                    <InvoiceFilter />
                  ) : fileFilter ? (
                    <FilesFilter />
                  ) :

                    customerQueriesFilter ? (
                      <CustomerQueriesFilter />
                    ) : (
                      ""
                    )}
                </div>
                {/* FIXME fix this asap */}

                {/* <SearchBtnDisplayNone
                  //   disabled={disabled}
                  //   warning="You cannot add units only landlord is allowed"
                  //   btnTitle={btnTitle}
                  searchClickHandler={searchClickHandler}
                /> */}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SearchBarWithOutBtn;
