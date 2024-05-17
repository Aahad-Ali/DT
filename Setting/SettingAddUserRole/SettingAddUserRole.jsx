import { Select, Table, ConfigProvider } from "antd";
import { useNavigate } from "react-router-dom";
import chevronIcon from "assets/chevron-down.png";
import UseGetHook from "Hooks/UseGetHook";
import { useEffect, useState } from "react";
import UseUpdateHook from "Hooks/UseUpdateHook";
import UsePutHook from "Hooks/UsePutHook";
import ModalLoader from "Components/GeneralComponents/ModalLoader";
const SettingAddUserRole = () => {
  let dropdownIcon;
  dropdownIcon = (
    <>
      <img src={chevronIcon} alt="" />
    </>
  );
  const navigate = useNavigate();
  const[loader,setLoader]=useState(false)
  const [form, setForm] = useState([{
    role: "",
    users: "",
  }])
  const handleChange = (fieldName, value) => {
    setForm(prev => ({
      ...prev,
      [fieldName]: value
    }))
  }
  const columns = [
    {
      title: "USER ROLES",
      dataIndex: "userRoles",
      key: "userRoles",
    },
    {
      title: "DESCRIPTION",
      dataIndex: "description",
      key: "description",
    },
  ];
  const { users, FetchLandlordUsers } = UseGetHook("users");
  const { FetchUserRole, role } = UseGetHook("getAllUserRole");
  useEffect(() => {
    FetchLandlordUsers()
    FetchUserRole()
  }, [])
  const data = [
    {
      key: "1",
      userRoles: (
        <>
          <div className="d-flex justify-content-between align-items-center">
            <span className="text-bold">Owner/Executive  (Full Access)</span>
            <svg
              width={17}
              height={17}
              fill="none"
              stroke="#667085"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20z" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
          </div>
        </>
      ),
      description:
        "Access to all features, including properties, maintenance requests, contacts, documentation, communication and accounting. Can create and manage other user accounts and permissions",
    },
    {
      key: "2",
      userRoles: (
        <>
          <div className="d-flex justify-content-between align-items-center">
            <span>Property Manager <br /> (Full or Restricted Access)</span>
            <svg
              width={17}
              height={17}
              fill="none"
              stroke="#667085"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20z" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
          </div>
        </>
      ),
      description:
        "Access to all features related to their assigned properties, maintenance requests, contacts, documentation, communication and accounting",
    },
    {
      key: "2",
      userRoles: (
        <>
          <div className="d-flex justify-content-between align-items-center">
            <span>Leasing Agent (Restricted Access)</span>
            <svg
              width={17}
              height={17}
              fill="none"
              stroke="#667085"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20z" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
          </div>
        </>
      ),
      description:
        "Access to property listings, prospect and tenant information, leases, and communication tools.",
    },
    {
      key: "4",
      userRoles: (
        <>
          <div className="d-flex justify-content-between align-items-center">
            <span>Maintenance Technician (Restricted Access)</span>
            <svg
              width={17}
              height={17}
              fill="none"
              stroke="#667085"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20z" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
          </div>
        </>
      ),
      description:
        "Access to property information, maintenance request, including task and work orders and communication tools.",
    },
    {
      key: "5",
      userRoles: (
        <>
          <div className="d-flex justify-content-between align-items-center">
            <span>Accounting/Finance <br /> (Restricted Access)</span>
            <svg
              width={17}
              height={17}
              fill="none"
              stroke="#667085"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20z" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
          </div>
        </>
      ),
      description:
        "Access financial modules, including rent rolls, income/expense tracking, and reporting tools.",
    },
  ];
  const assignRole = () => {
    UsePutHook("api/userupdate/updaterole", {role: form.role,users: form.users}, '','',setLoader)
    form.role = ""
    form.users = ""
  }
  return (
    <>
      {/* User Roles Title Start */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <div className="heading">USER ROLES</div>
        <div>
          <button
            className="new-user-role-btn"
            onClick={() => {
              navigate("/add-user-role");
            }}
          >
            <svg
              width={20}
              height={20}
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="me-2"
            >
              <path d="M12 5v14" />
              <path d="M5 12h14" />
            </svg>
            New User Role
          </button>
        </div>
      </div>
      {/* User Roles Title End */}

      {/* User Roles Text Description Start */}
      <div className="mt-3">
        <p className="user-roles-text-description">
          These are predefined user roles.
        </p>
      </div>
      {/* User Roles Text Description End */}

      {/* Pre-defined User Roles Start */}
      <div className="">
        <ConfigProvider
          theme={{
            components: {
              Table: {
                colorBgContainer: "#F0F2F8",
                headerBg: "#F0F2F8",
                borderColor: "#E7EAEE",
                headerBorderRadius: 0,
                headerColor: "#667085",
                fontWeightStrong: 500,
                cellPaddingInline: 20,
              },
            },
          }}
        >
          <Table
            className="add-user-role-table"
            columns={columns}
            dataSource={data}
            pagination={false}
          />
        </ConfigProvider>
      </div>
      {/* Pre-defined User Roles End */}

      <p className="mb-0 mt-5">Select User Name & User Roles</p>
      <p className="normal-grey-text">Lorem ipsum dolor sit amet consectet.</p>
      <div className="row mt-3">
        <div className="col-md-12">
          <span>
            User Name<span className="sign-up-imp-star">*</span>
          </span>
          <ConfigProvider
            theme={{
              components: {
                Select: {
                  zIndexPopupBase: 99999,
                  colorPrimaryHover: "#EF6B3E",
                  optionSelectedBg: "rgba(239, 107, 62, 0.16)",
                  borderRadius: 4,
                  colorTextPlaceholder: "#667085",
                  fontFamily: "montserrat",
                },
              },
            }}
          >
            <Select
              mode="multiple"
              placeholder="User Name"
              suffixIcon={dropdownIcon}
              style={{
                width: "100%",
                height: 50,
              }}
              onChange={(e) => handleChange('users', e)}
              options={users.map((e) => {
                return { value: e.id, label: e.firstName };
              })}
            />
          </ConfigProvider>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-12">
          <span>
            User Role<span className="sign-up-imp-star">*</span>
          </span>
          <ConfigProvider
            theme={{
              components: {
                Select: {
                  zIndexPopupBase: 99999,
                  colorPrimaryHover: "#EF6B3E",
                  optionSelectedBg: "rgba(239, 107, 62, 0.16)",
                  borderRadius: 4,
                  colorTextPlaceholder: "#667085",
                  fontFamily: "montserrat",
                },
              },
            }}
          >
            <Select
              placeholder="Select User Role"
              suffixIcon={dropdownIcon}
              style={{
                width: "100%",
                height: 50,
              }}
              onChange={(e) => handleChange('role', e)}
              options={role.map((e) => {
                return { value: e._id, label: e.role };
              })}
            />
          </ConfigProvider>
        </div>
      </div>
      <div className="row my-4">
        <div className="setting-btn my-4 d-flex align-items-center gap-4">
          <button onClick={()=>{
            assignRole()
            setLoader(true)

          }} className="save-btn d-flex justify-content-center gap-3">Save{loader && <ModalLoader/>}</button>
        </div>
      </div>
    </>
  );
};

export default SettingAddUserRole;
