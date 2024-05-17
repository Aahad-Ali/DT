import { useState } from "react";
import { ConfigProvider } from "antd";
import arrowLeft from "assets/chevron-left.png";
import AccountAddSuccessModal from "Modals/AccountAddSuccessModal/AccountAddSuccessModal";
import chevronIcon from "assets/chevron-down.png";
import { Table } from "antd";
import UsePostHook from "Hooks/UsePostHook";
import Loader from "Helpers/Loader";
const AddUserRole = () => {
  // States start
  const [currentStep, setCurrentStep] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [form, setForm] = useState([{
    role: "",
    description: ""
  }])
  const [check, setCheck] = useState({
    view: "",
    update: "",
    add: "",
    delete: ""
  })
  const handleChange = (module, fieldName, value) => {
    setCheck(prev => ({
      ...prev,
      [module]: {
        ...prev[module],
        [fieldName]: value
      }
    }))
  }
  const handleChangeForm = (fieldName, value) => {
    setForm(prev => ({
      ...prev,
      [fieldName]: value
    }))
  }

  // States end
  let dropdownIcon;
  dropdownIcon = (
    <>
      <img src={chevronIcon} alt="" />
    </>
  );
  // Modal Function
  const onOpenModal = () => {
    setOpenModal(true);
  };
  const onCloseModal = () => {
    setOpenModal(false);
  };
  // Stepper Function
  const handleNext = () => {
    setCurrentStep(currentStep + 1);
    if (currentStep === 4) {
      setCurrentStep(1);
    }
  };
  const handlePrev = () => {
    if (currentStep <= 1) {
      setCurrentStep(1);
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  const columns = [
    {
      title: "Modules",
      dataIndex: "module",
    },
    {
      title: "View",
      dataIndex: "age",
      render: (head, index) => (
        <a>
          <input onChange={(e) => handleChange(index.name, "view", e.target.checked)} type="checkbox" />
        </a>
      ),
    },
    {
      title: "Create",
      dataIndex: "address",
      render: (head1, index) => (
        <a>
          <input onChange={(e) => handleChange(index.name, "add", e.target.checked)} type="checkbox" />
        </a>
      ),
    },
    {
      title: "Edit",
      dataIndex: "address",
      render: (head2, index) => (
        <a>
          <input onChange={(e) => handleChange(index.name, "update", e.target.checked)} type="checkbox" />
        </a>
      ),
    },
    {
      title: "Delete",
      dataIndex: "address",
      render: (head3, index) => (
        <a>
          <input onChange={(e) => handleChange(index.name, "delete", e.target.checked)} type="checkbox" />
        </a>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      name: "LL_Dashboard",
      module: "LL Dashboard",
    },
    {
      key: "2",
      name: "properties",
      module: "Properties",
    },
    {
      key: "3",
      name: "units",
      module: "Units",
    },
    {
      key: "4",
      name: "tenants",
      module: "Tenants ",
    },
    {
      key: "5",
      name: "task",
      module: "Tasks ",
    },
    {
      key: "6",
      name: "invoicing",
      module: " Invoices",
    },
    {
      key: "7",
      name: "prospects",
      module: " Prospect",
    },
    {
      key: "8",
      name: "profileManagement",
      module: " Profile Management (LL)",
    },
    {
      key: "9",
      name: "settings_profile",
      module: " Settings - Profile",
    },
    {
      key: "10",
      name: "settings_changePassword",
      module: " Settings - Change Password",
    },

    {
      key: "11",
      name: "settings_Subscription",
      module: "Settings - Subscription ",
    },
    {
      key: "12",
      name: "settings_ManageUsers",
      module: " Settings - Manage Users",
    },
    {
      key: "13",
      name: "reports",
      module: " LL Reports ",
    },
    {
      key: "14",
      name: "workOrders",
      module: " Work Orders ",
    },
    {
      key: "15",
      name: "leases",
      module: " Leases ",
    },
    {
      key: "16",
      name: "accounting",
      module: " Accounting ",
    },
    {
      key: "17",
      name: "mileage",
      module: " Mileage ",
    },
  ];
  let addUserRole = () => {
    // console.log([...check])
    // return
    UsePostHook("api/userRole/addUserRole", {
      role: form.role,
      description: form.description,
      ...check,

    },
      setLoader,
      onOpenModal

    )
  }
  return (
    <>
      {openModal && (
        <AccountAddSuccessModal
          successAccount="Go to User Role"
          onClose={onCloseModal}
          userRole={true}
        />
      )}
      <div className="container-fluid bg-white  p-3">
        <div className="stepper-container step-container-responsive property-account-stepper">
          <div
            className={
              currentStep === 1 || currentStep === 2
                ? "step-1 stepper-active"
                : "step-1 stepper-inactive"
            }
          >
            1 <div className="form-step-text">General Info</div>
          </div>
          <div
            className={
              currentStep === 2
                ? "step-2 stepper-active"
                : "step-2 stepper-inactive"
            }
          >
            2 <div className="form-step-text">Permission Level</div>
          </div>
          <div className="lines-property">
            <div className={`line ${currentStep === 2 ? "active" : ""}`}></div>
          </div>
        </div>
        <div className="stepper-content-container mt-4 add-account-details-stepper-content">
          {currentStep === 1 && (
            <>
              <div className="container-fluid">
                <div className="row mt-3">
                  <div className="col-md-12">
                    <span className="property-details-input-title">
                      Role Name
                    </span>
                    <input onChange={(e) => handleChangeForm("role", e.target.value)} type="text" className="form-control" />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <span className="property-details-input-title">
                      Role Description
                    </span>
                    <textarea onChange={(e) => handleChangeForm("description", e.target.value)}
                      name=""
                      id=""
                      cols="30"
                      rows="8"
                      className="form-control"
                    ></textarea>
                  </div>
                </div>
                <div className="stepper-btn step-btn-responsive-tab d-flex justify-content-between gap-3 mt-5 pb-3">
                  <button onClick={handlePrev} className="back-prev-btn mt-3">
                    <img src={arrowLeft} />
                    Cancel{" "}
                  </button>
                  <button
                    onClick={handleNext}
                    className="next-btn-same-class mt-3"
                  >
                    {currentStep === 2 ? "Save" : "Next"}
                  </button>
                </div>
              </div>
            </>
          )}
          {currentStep === 2 && (
            <>
              <div className="container-fluid">
                <div className="row mt-5">
                  <div className="col-md-12">
                    <p className="property-accounts-lease-options-text">
                      You can set custom access levels.{" "}
                    </p>
                  </div>
                </div>
                <div className="row mt-5">
                  <div className="col-md-12">
                    {
                      loader ? <Loader />
                        :
                        <ConfigProvider>
                          <Table
                            columns={columns}
                            dataSource={data}
                            className="scroll-remove"
                            pagination={false}
                          />
                        </ConfigProvider>
                    }

                  </div>
                </div>

                <div className="stepper-btn d-flex justify-content-between gap-3 mt-5 pb-3">
                  <button onClick={handlePrev} className="back-prev-btn mt-3">
                    {/* <img src={arrowLeft} /> */}
                    Back
                  </button>
                  <button
                    onClick={addUserRole}
                    className="next-btn-same-class mt-3"
                  >
                    Save
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AddUserRole;