import React, { useState } from "react";
import settingIcon from "assets/three-dots.png";
import viewIcon from "assets/Icon.png";
import editIcon from "assets/edit-05.png";
import deleteIcon from "assets/trash-01.png";


import AddPropertyAccountingModal from "Modals/AddPropertyAccountingModal/AddPropertyAccountingModal";
const AccountDetails = () => {
  // States start
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isDropdownOpenTwo, setDropdownOpenTwo] = useState(false);
  const [openAccountModal, setOpenAccountModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  // States end

  const handleIconClickCustom = () => {
    // Toggle the dropdown state when the icon is clicked
    setDropdownOpen(!isDropdownOpen);
  };
  const onOpenAccountModal = () => {
    setOpenAccountModal(true);
  };
  const onCloseModalWorkOrder = () => {
    setOpenAccountModal(false);
  };
  const onOpenModal = () => {
    setOpenModal(true);
  };
  const handleIconClickCustomTwo = () => {
    // Toggle the dropdown state when the icon is clicked
    setDropdownOpenTwo(!isDropdownOpenTwo);
  };


  
  return (
    <>
      {openAccountModal === true ? (
        <AddPropertyAccountingModal
          onOpen={onOpenModal}
          onClose={onCloseModalWorkOrder}
        />
      ) : (
        ""
      )}
      <div className="container-fluid bg-white p-3">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between mt-2 flex-wrap">
            <div className="flex-grow-2 mb-3">
              <span className="fw-bold ">OPERATING ACCOUNT</span>
            </div>
            <div className="account-info-btn d-flex align-items-center justify-content-center gap-3 flex-grow-1">
              <button className="back-prev-btn">Connect to Bank</button>
              <button
                onClick={onOpenAccountModal}
                className="next-btn-same-class"
              >
                {" "}
                <span>
                  <svg
                    width={21}
                    height={21}
                    fill="#fff"
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 5v14" />
                    <path d="M5 12h14" />
                  </svg>
                </span>
                Add New Property
              </button>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-md-12 content-border">
              <div className="div content-inner-image">
                <span className="account-info-action-btn cursor">
                  <img
                    onClick={handleIconClickCustom}
                    src={settingIcon}
                    alt=""
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
                          <img src={editIcon} alt="" /> Inactive
                        </li>
                        <li className="list-style-none cursor lease-details-dropdown-icons">
                          {" "}
                          <img src={deleteIcon} alt="" /> Delete
                        </li>
                      </ul>
                    </div>
                  )}
                </span>
              </div>
              <div className="main-accounting-content">
                <div className="account-info-lists">
                  <div className="property-head d-flex">
                    <p>
                      <span className="task-info-list-span me-3">
                        Property:
                      </span>{" "}
                    </p>
                    <p>The Tree House</p>
                  </div>
                  <div className="p-address-head d-flex">
                    <span className="task-info-list-span me-3">
                      Property Address:
                    </span>{" "}
                    <p>1100 Welker LnJersey Shore, Pennsylvania(PA), 17740 </p>
                  </div>
                  <div className="status-head d-flex">
                    <p>
                      <span className="task-info-list-span me-3">Status:</span>{" "}
                    </p>
                    <p>Active</p>
                  </div>
                  <div className="description-head d-flex">
                    <p>
                      <span className="task-info-list-span me-3">
                        Description:
                      </span>{" "}
                    </p>
                    <p>
                      Generate Lorem Ipsum placeholder text for use in your
                      graphic, print and web layouts, and discover plugins for
                      your favorite writing, design and blogging tools
                    </p>
                  </div>
                </div>
                <div className="account-info-lists-content"></div>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-12 content-border">
              <div className="div content-inner-image">
                <span className="account-info-action-btn cursor">
                  <img
                    onClick={handleIconClickCustom}
                    src={settingIcon}
                    alt=""
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
                          <img src={editIcon} alt="" /> Inactive
                        </li>
                        <li className="list-style-none cursor lease-details-dropdown-icons">
                          {" "}
                          <img src={deleteIcon} alt="" /> Delete
                        </li>
                      </ul>
                    </div>
                  )}
                </span>
              </div>
              <div className="main-accounting-content">
                <div className="account-info-lists">
                  <div className="property-head d-flex">
                    <p>
                      <span className="task-info-list-span me-3">
                        Property:
                      </span>{" "}
                    </p>
                    <p>The Tree House</p>
                  </div>
                  <div className="p-address-head d-flex">
                    <span className="task-info-list-span me-3">
                      Property Address:
                    </span>{" "}
                    <p>1100 Welker LnJersey Shore, Pennsylvania(PA), 17740 </p>
                  </div>
                  <div className="status-head d-flex">
                    <p>
                      <span className="task-info-list-span me-3">Status:</span>{" "}
                    </p>
                    <p>Active</p>
                  </div>
                  <div className="description-head d-flex">
                    <p>
                      <span className="task-info-list-span me-3">
                        Description:
                      </span>{" "}
                    </p>
                    <p>
                      Generate Lorem Ipsum placeholder text for use in your
                      graphic, print and web layouts, and discover plugins for
                      your favorite writing, design and blogging tools
                    </p>
                  </div>
                </div>
                <div className="account-info-lists-content"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountDetails;
