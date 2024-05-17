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
import TenantFilter from "./TenantFilter";
import AccountFilter from "./AccountFilter";
import NotesFilter from "./NotesFilter";
import VendorsFilter from "./VendorsFilter";
import ProspectsFilter from "./ProspectsFilter";
import LeaseFilter from "./LeaseFilter";
import UnitsFilter from "./UnitsFilter";
import SearchButton from "./SearchButton";
import CustomerQueriesFilter from "./CustomersQueriesFilter";
import InvoiceFilter from "./InvoiceFilter";
import FilesFilter from "./FilesFilter";
import { ButtonVariant1, InputField } from "Components/GeneralComponents";
import { FilterValue } from "Store/Slices/FilterSlice";
import { useSelector } from "react-redux";

const SearchBar = ({
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
  disabled,
  innerPage,
}) => {
  const [search, setSearch] = useState("");
  const [taskFilterDropdown, settaskFilterDropdown] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [filterVal, setFilterVal] = useState([
    {
      value: "",
      property: "",
    },
  ]);
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
  const resetFilter = () => {
    dispatch(FilterValue({ reset: "reset" }));
  };
  const navigate = useNavigate();
  const searchClickHandler = () => {
    if (!route) {
      onClick();
    } else {
      navigate(`/${route}`);
    }
  };
  const range = useSelector((state) => {
    return state.FilterValue.value;
  });
  const property = useSelector((state) => {
    return state.FilterValue.property;
  });
  const fromDate = useSelector((state) => {
    return state.FilterValue.fromDate;
  });
  const toDate = useSelector((state) => {
    return state.FilterValue.toDate;
  });
  const { Option } = Select;
  const initialItems = ["Los angeles", "New york", "Dallas TX"];
  const initialItemsServices = ["Plumbing", "Carpenter", "Electrician"];
  const handleItemChange = (value) => {
    // Update the selected items when checkboxes are clicked.
    setSelectedItems(value);
  };
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
              className="filter-btn
               d-flex align-items-center"
            >
              {" "}
              <img src={FilterIcon} alt="" /> Filter
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
            <div className="col-lg-8 col-md-12 mb-4">
              {/* Desktop */}
              <div className="task-search-input position-relative">

                <InputField
                  handler={(e) => setSearch(e.target.value)}
                  type="text"
                  placeholder="Search"
                  className="form-control search-form-control-task" />
                <div className="search-icon-task">
                  <img src={searchIcon} alt="" />
                </div>
                <div className="mt-2" style={{width:'fit-content'}}> {
                  range || property || fromDate || toDate ?
                    <ButtonVariant1 handler={resetFilter} children={"Reset"} />
                    : ""
                }</div>
              </div>



            </div>
            <div className="col-lg-4 col-md-12 text-center">
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
                  ) : (
                    ""
                  )}
                </div>
                {/* FIXME fix this asap */}
                <SearchButton
                  disabled={disabled}
                  warning="You cannot add units only landlord is allowed"
                  btnTitle={btnTitle}
                  searchClickHandler={searchClickHandler}
                />
              </div>
            </div>
          </>
        )}
      </div>

    </>
  );
};

export default SearchBar;
