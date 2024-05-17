import React, { useState } from "react";
import creationDateIcon from "assets/lease-balance.png";
import tenantUserImage from "assets/Avatar_0009.png";
import activeDot from "assets/_Dot.png";
import settingIconOrange from "assets/dots-vertical.png";
import viewIcon from "assets/Icon.png";
import viewIconOrange from "assets/Icon - Orange.png";
import deleteIcon from "assets/trash-01.png";
import deleteIconOrange from "assets/trash-01 - Orange.png";
import { Radio, ConfigProvider } from "antd";

const TenantPassportDetailsView = () => {
  // States start
  const [value, setValue] = useState();
  const [value2, setValue2] = useState();
  const [value3, setValue3] = useState();
  const [value4, setValue4] = useState();
  const [value5, setValue5] = useState();
  const [value6, setValue6] = useState();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  // States end

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const onChange2 = (e) => {
    console.log("radio checked", e.target.value);
    setValue2(e.target.value);
  };
  const onChange3 = (e) => {
    console.log("radio checked", e.target.value);
    setValue3(e.target.value);
  };
  const onChange4 = (e) => {
    console.log("radio checked", e.target.value);
    setValue4(e.target.value);
  };
  const onChange5 = (e) => {
    console.log("radio checked", e.target.value);
    setValue5(e.target.value);
  };
  const onChange6 = (e) => {
    console.log("radio checked", e.target.value);
    setValue6(e.target.value);
  };
  const handleIconClickCustom = () => {
    // Toggle the dropdown state when the icon is clicked
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <div className="container-fluid bg-white p-3">
        <div className="row mt-3">
          <div className="col-md-12 text-end">
            <img
              onClick={handleIconClickCustom}
              src={settingIconOrange}
              alt=""
              className="cursor"
            />
            {isDropdownOpen && (
              <div className="task-table-setting-dropdown-prospect bg-white box-shadow text-start">
                <ul className="p-0 d-flex flex-column gap-3">
                  <li className="list-style-none cursor lease-details-dropdown-icons">
                    {" "}
                    <img src={viewIcon} alt="" /> View
                  </li>
                  <li className="list-style-none cursor lease-details-dropdown-icons">
                    {" "}
                    <img src={deleteIcon} alt="" /> Delete
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-4">
            <div className="task-overview-tab-boxes p-3 position-relative">
              <div className="overview-box-img">
                <img src={creationDateIcon} alt="" />
              </div>
              <div className="over-view-box-text">
                <span>Creation Date</span>
                <h2 className="tenant-passport-details-cards-sub-title">
                  12/5/23
                </h2>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="task-overview-tab-boxes p-3 position-relative">
              <div className="overview-box-img">
                <img src={creationDateIcon} alt="" />
              </div>
              <div className="over-view-box-text">
                <span>Expiration Date</span>
                <h2 className="tenant-passport-details-cards-sub-title">
                  11/5/23
                </h2>
              </div>
              <div className="expiration-date-icon">
                <span className="priority-text ten-pass-expire-date">
                  7 Days left
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="task-overview-tab-boxes p-3 position-relative">
              <div className="overview-box-img">
                <img src={creationDateIcon} alt="" />
              </div>
              <div className="over-view-box-text">
                <span>Status</span>
                <span className="prospect-active-bar">
                  <img src={activeDot} alt="" />
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-10">
            <div className="task-info-heading">
              <h4>Personal Info</h4>
            </div>
            <div className="task-info-lists">
              <div className="row">
                <div className="col-md-4">
                  <p>
                    <span className="task-info-list-span me-3">
                      First Name:
                    </span>{" "}
                    olivia
                  </p>
                </div>
                <div className="col-md-4">
                  <p>
                    <span className="task-info-list-span me-3">
                      Middle Name:
                    </span>{" "}
                    Mika
                  </p>
                </div>
                <div className="col-md-4">
                  <p>
                    <span className="task-info-list-span me-3">Last Name:</span>{" "}
                    John
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <p>
                    <span className="task-info-list-span me-3">Email:</span>{" "}
                    olivia-johnn1997@gmail.com
                  </p>
                </div>
                <div className="col-md-4"></div>
                <div className="col-md-4">
                  <p>
                    <span className="task-info-list-span me-3">Phone No:</span>{" "}
                    +1 (555) 456-7890
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <p>
                    <span className="task-info-list-span me-3">
                      Date of Birth:
                    </span>{" "}
                    12/02/1996
                  </p>
                </div>
                <div className="col-md-4"></div>
                <div className="col-md-4">
                  <p>
                    <span className="task-info-list-span me-3">Gender:</span>{" "}
                    Female
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <p>
                    <span className="task-info-list-span me-3">Address:</span>{" "}
                    354 Gladwell Street, PITTSBURGH, Pennsylvania(PA), 15283
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <p>
                    <span className="task-info-list-span me-3">SSN:</span> ****
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <p>
                    <span className="task-info-list-span me-3">
                      Driver License:
                    </span>{" "}
                    CA
                  </p>
                </div>
                <div className="col-md-4"></div>
                <div className="col-md-4">
                  <p>
                    <span className="task-info-list-span me-3">
                      Driver License Number:
                    </span>{" "}
                    AB-54980
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-2 text-end">
            <img src={tenantUserImage} className="img-fluid" alt="" />
          </div>
        </div>
        <hr />
        <div className="row mt-5">
          <div className="col-md-12">
            <div className="task-info-heading">
              <h4>Employment Info</h4>
            </div>
            <div className="task-info-lists">
              <div className="row">
                <div className="col-md-12">
                  <p>
                    <span className="task-info-list-span me-3">Job Title:</span>{" "}
                    Employed
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <p>
                    <span className="task-info-list-span me-3">
                      Company Name:
                    </span>{" "}
                    Janesmith Technologies
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <p>
                    <span className="task-info-list-span me-3">
                      Start Date:
                    </span>{" "}
                    12/3/22
                  </p>
                </div>
                <div className="col-md-4">
                  <p>
                    <span className="task-info-list-span me-3">End Date:</span>{" "}
                    3/25/23
                  </p>
                </div>
                <div className="col-md-4"></div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <p>
                    <span className="task-info-list-span me-3">
                      Supervisor Name:
                    </span>{" "}
                    Ana Jackson
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <p>
                    <span className="task-info-list-span me-3">Email:</span>{" "}
                    Ana900jackson@gmail.com
                  </p>
                </div>
                <div className="col-md-4">
                  <p>
                    <span className="task-info-list-span me-3">Phone No:</span>{" "}
                    +1 (555) 456-7890
                  </p>
                </div>
                <div className="col-md-4"></div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="row mt-5">
          <div className="col-md-12">
            <div className="task-info-heading">
              <h4>Rental Info</h4>
            </div>
            <div className="task-info-lists">
              <div className="row">
                <div className="col-md-12">
                  <p>
                    <span className="task-info-list-span me-3">
                      Residence Type:
                    </span>
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <p>
                    <span className="task-info-list-span me-3">
                      Street Address:
                    </span>
                  </p>
                </div>
                <div className="col-md-4">
                  <p>
                    <span className="task-info-list-span me-3">
                      Apt or Unit:
                    </span>
                  </p>
                </div>
                <div className="col-md-4"></div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <p>
                    <span className="task-info-list-span me-3">
                      Move-in-Date:
                    </span>{" "}
                    12/3/22
                  </p>
                </div>
                <div className="col-md-4">
                  <p>
                    <span className="task-info-list-span me-3">
                      Expected Move-out-Date:
                    </span>{" "}
                    3/25/23
                  </p>
                </div>
                <div className="col-md-4"></div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="rental-info-option col-md-12 d-flex align-items-center gap-3">
                    <p className="tenant-details-view-custom-text">
                      Is this reference an individual landlord or a property
                      management company?
                      <span className="input-field-imp-star">*</span>
                    </p>
                    <ConfigProvider
                      theme={{
                        components: {
                          Radio: {
                            colorText: "#344054",
                            colorPrimary: "#EF6B3E",
                            fontFamily: "Montserrat",
                            fontSize: 16,
                          },
                        },
                      }}
                    >
                      <Radio.Group
                        onChange={onChange}
                        value={value}
                        className="screening-questions-options"
                      >
                        <Radio value={1}>Individual Landlord</Radio>
                      </Radio.Group>
                    </ConfigProvider>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <p>
                    <span className="task-info-list-span me-3">
                      First Name:
                    </span>{" "}
                    Emily Walker
                  </p>
                </div>
                <div className="col-md-4">
                  <p>
                    <span className="task-info-list-span me-3">
                      Monthly Rent Amount:
                    </span>{" "}
                    $500
                  </p>
                </div>
                <div className="col-md-4"></div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <p>
                    <span className="task-info-list-span me-3">Email:</span>{" "}
                    Emillywalker0900@gmail.com
                  </p>
                </div>
                <div className="col-md-4">
                  <p>
                    <span className="task-info-list-span me-3">Phone No:</span>{" "}
                    +1 (555) 456-7890
                  </p>
                </div>
                <div className="col-md-4"></div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="row mt-5">
          <div className="col-md-12">
            <div className="task-info-heading">
              <h4>Credit & Background Check</h4>
            </div>
            <div className="task-info-lists">
              <div className="row">
                <div className="col-md-12">
                  <p>
                    <span className="task-info-list-span me-3">
                      Yearly Income:
                    </span>{" "}
                    $5000
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <p>
                    <span className="task-info-list-span me-3">
                      Add Details:
                    </span>{" "}
                    -
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <p>
                    <span className="task-info-list-span me-3">Documents:</span>{" "}
                    -
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="row mt-5">
          <div className="col-md-12">
            <div className="task-info-heading">
              <h4>Screening Questions</h4>
            </div>
            <div className="task-info-lists">
              <div className="row">
                <div className="col-md-12 d-flex justify-content-between">
                  <p className="task-info-list-span me-3">
                    Do you or anyone else living in the property smoke?
                    <span className="input-field-imp-star">*</span>
                  </p>
                  <ConfigProvider
                    theme={{
                      components: {
                        Radio: {
                          colorText: "#344054",
                          colorPrimary: "#EF6B3E",
                          fontFamily: "Montserrat",
                          fontSize: 16,
                        },
                      },
                    }}
                  >
                    <Radio.Group
                      onChange={onChange2}
                      value={value2}
                      className="screening-questions-options d-flex justify-content-center align-items-center gap-3"
                    >
                      <Radio value={2} name="question1">
                        Yes
                      </Radio>
                      <Radio value={3}>No </Radio>
                    </Radio.Group>
                  </ConfigProvider>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 d-flex justify-content-between">
                  <p className="task-info-list-span me-3">
                    Have you declared bankruptcy in the last 7 years?
                    <span className="input-field-imp-star">*</span>
                  </p>
                  <ConfigProvider
                    theme={{
                      components: {
                        Radio: {
                          colorText: "#344054",
                          colorPrimary: "#EF6B3E",
                          fontFamily: "Montserrat",
                          fontSize: 16,
                        },
                      },
                    }}
                  >
                    <Radio.Group
                      onChange={onChange3}
                      value={value3}
                      className="screening-questions-options d-flex justify-content-center align-items-center gap-3"
                    >
                      <Radio value={4}>Yes</Radio>
                      <Radio value={5}>No</Radio>
                    </Radio.Group>
                  </ConfigProvider>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 d-flex justify-content-between">
                  <p className="task-info-list-span me-3">
                    Have you ever been convicted of a felony?
                    <span className="input-field-imp-star">*</span>
                  </p>
                  <ConfigProvider
                    theme={{
                      components: {
                        Radio: {
                          colorText: "#344054",
                          colorPrimary: "#EF6B3E",
                          fontFamily: "Montserrat",
                          fontSize: 16,
                        },
                      },
                    }}
                  >
                    <Radio.Group
                      onChange={onChange4}
                      value={value4}
                      className="screening-questions-options d-flex justify-content-center align-items-center gap-3"
                    >
                      <Radio value={6}>Yes</Radio>
                      <Radio value={7}>No</Radio>
                    </Radio.Group>
                  </ConfigProvider>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 d-flex justify-content-between">
                  <p className="task-info-list-span me-3">
                    Have you ever been evicted?
                    <span className="input-field-imp-star">*</span>
                  </p>
                  <ConfigProvider
                    theme={{
                      components: {
                        Radio: {
                          colorText: "#344054",
                          colorPrimary: "#EF6B3E",
                          fontFamily: "Montserrat",
                          fontSize: 16,
                        },
                      },
                    }}
                  >
                    <Radio.Group
                      onChange={onChange5}
                      value={value5}
                      className="screening-questions-options d-flex justify-content-center align-items-center gap-3"
                    >
                      <Radio value={8}>Yes</Radio>
                      <Radio value={9}>No</Radio>
                    </Radio.Group>
                  </ConfigProvider>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 d-flex justify-content-between">
                  <p className="task-info-list-span me-3">
                    Have you ever refused to pay rent when due ?
                    <span className="input-field-imp-star">*</span>
                  </p>
                  <ConfigProvider
                    theme={{
                      components: {
                        Radio: {
                          colorText: "#344054",
                          colorPrimary: "#EF6B3E",
                          fontFamily: "Montserrat",
                          fontSize: 16,
                        },
                      },
                    }}
                  >
                    <Radio.Group
                      onChange={onChange6}
                      value={value6}
                      className="screening-questions-options d-flex justify-content-center align-items-center gap-3"
                    >
                      <Radio value={10}>Yes</Radio>
                      <Radio value={11}>No</Radio>
                    </Radio.Group>
                  </ConfigProvider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TenantPassportDetailsView;
