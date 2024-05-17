import React, { useState } from "react";
import FilterIcon from "assets/filter.png";
import SearchIcon from "assets/MagnifyingGlass.png";
import MapLine from "assets/MapPinLine.png";
import chevronIconDown from "assets/chevron-down.png";
import { Select, Slider, ConfigProvider } from "antd";
const LocalServiceProfessionalSearch = () => {
  let dropdownIcon;
  dropdownIcon = (
    <>
      <img src={chevronIconDown} alt="" />
    </>
  );
  const [
    localServiceProfessionalFilterDropdown,
    setLocalServiceProfessionalFilterDropdown,
  ] = useState(false);
  const [minValue, setMinValue] = useState("0");
  const [maxValue, setMaxValue] = useState("850");
  const [sliderValue, setSliderValue] = useState([0, 850]);
  const rangeHandleChange = (value) => {
    setMinValue(value[0]);
    setMaxValue(value[1]);
    setSliderValue(value);
  };
  const handleMinButtonClick = () => {
    setMinValue("0");
    setSliderValue([0, maxValue]);
  };
  const handleMaxButtonClick = () => {
    setMaxValue("1000");
    setSliderValue([minValue, 1000]);
  };
  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="local-search-bar-container d-flex align-items-center gap-3">
            <div className="local-search-bar flex-grow-2 position-relative">
              <input
                placeholder="What service you are looking for?"
                type="text"
                className="form-control local-input"
              />
              <div className="local-icon">
                <img src={SearchIcon} alt="" />
              </div>
            </div>
            <div className="local-search-bar-location flex-grow-1 position-relative">
              <input
                placeholder="Location"
                type="text"
                className="form-control local-input"
              />
              <div className="local-icon">
                <img src={MapLine} alt="" />
              </div>
            </div>
            <div className="local-search-bar-btn">
              <button className="search-btn">Search</button>
            </div>
            <div className="local-search-bar-btn position-relative">
              <button
                onClick={() => {
                  setLocalServiceProfessionalFilterDropdown(
                    !localServiceProfessionalFilterDropdown
                  );
                }}
                className="filter-btn d-flex align-items-center"
              >
                {" "}
                <img src={FilterIcon} alt="" /> Filter
              </button>
              <div
                className={
                  localServiceProfessionalFilterDropdown === true
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
                      },
                    }}
                  >
                    <Select
                      className="mb-3"
                      suffixIcon={dropdownIcon}
                      placeholder="Location"
                      style={{
                        width: "100%",
                        height: 27,
                        textAlign: "left",
                      }}
                      options={[
                        {
                          value: "Near me",
                          label: "Near me",
                        },
                        {
                          value: "Within 15 miles",
                          label: "Within 15 miles",
                        },
                        {
                          value: "Within 30 miles",
                          label: "Within 30 miles",
                        },
                        {
                          value: "Within 50 miles",
                          label: "Within 50 miles",
                        },
                      ]}
                    />
                  </ConfigProvider>
                  <p className="local-service-professional-filter-dropdown-sub-title mb-1">
                    Charges
                  </p>
                  <ConfigProvider
                    theme={{
                      components: {
                        Slider: {
                          colorPrimary: "#EF6B3E",
                          colorPrimaryBorder: "#EF6B3E",
                          colorPrimaryBorderHover: "#EF6B3E",
                        },
                        Tooltip: {
                          zIndexBase: 100000,
                        },
                      },
                    }}
                  >
                    <Slider
                      style={{
                        width: "100%",
                      }}
                      onChange={rangeHandleChange}
                      range={{
                        draggableTrack: true,
                      }}
                      max={1000}
                      min={0}
                      value={sliderValue}
                    />
                  </ConfigProvider>
                  <div className="d-flex justify-content-between w-100">
                    <span className="local-service-professional-filter-dropdown-range-picker-text">
                      ${minValue.toLocaleString()}
                    </span>
                    <span>${maxValue.toLocaleString()}</span>
                  </div>
                  <div className="d-flex w-100 mt-2">
                    <button
                      className="w-50 local-service-professional-filter-min-btn"
                      onClick={handleMinButtonClick}
                    >
                      Min
                    </button>
                    <button
                      className="w-50 local-service-professional-filter-max-btn"
                      onClick={handleMaxButtonClick}
                    >
                      Max
                    </button>
                  </div>
                  <button className="task-filter-dropdown-btn w-100 mt-3">
                    Apply
                  </button>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default LocalServiceProfessionalSearch;
