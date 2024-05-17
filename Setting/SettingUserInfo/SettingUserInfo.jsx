import { useEffect, useState } from "react";
import SearchBar from "Helpers/SearchBar";
import { Table, ConfigProvider, Avatar } from "antd";
import settingBtn from "assets/more-vertical.png";
import viewIcon from "assets/Icon.png";
import editIcon from "assets/edit-05.png";
import completeIcon from "assets/calendar-check-01.png";
import deleteIcon from "assets/trash-01.png";
import { useNavigate, Link } from "react-router-dom";
import UseGetHook from "Hooks/UseGetHook";
import { useSelector } from "react-redux";
import DeleteModal from "Modals/DeleteModal/DeleteModal";
import SettingAddUserDetailsModal from "Modals/SettingEditUserDetailsModal/SettingEditUserDetailsModal";
import UseUrlParamsHook from "Hooks/UseUrlParamsHook";
const SettingUserInfo = () => {
  // States start
  const [selectionType, setSelectionType] = useState("checkbox");
  const [selectedTableItem, setSelectedTableItem] = useState("");
  const [key, setKey] = useState([]);
  const [OpenDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [update, setUpdate] = useState(false);
  const [openAccountModal, setOpenAccountModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();
  const { id } = UseUrlParamsHook();
  const search = useSelector((state) => {
    return state.Search.value;
  });


  const { users, FetchLandlordUsers } = UseGetHook("users");

  // States end
  const onOpenDeleteModal = () => {
    setOpenDeleteModal(true);
  };
  const onCloseDeleteModal = () => {
    setOpenDeleteModal(false);
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
  const onCloseModal = () => {
    setOpenModal(false);
  };
  // Data Table functions
  useEffect(() => {
    FetchLandlordUsers();
  }, []);
  useEffect(() => {
    if (update) {
      FetchLandlordUsers();
      setUpdate(false);
    }
  }, [update]);
  const data = users
    .filter((e) => e.firstName.toLowerCase().includes(search.toLowerCase()))
    .map((e) => ({
      key: e.id,
      user: e.firstName,
      phone: e.phone,
      email: e.email,
      role: e?.role?.role,
      img: e.profileImage,
    }));
  const handleIconClick = (result) => {
    // Toggle the dropdownOpen state
    const filterData = data.filter((item) => {
      return item.key === result;
    });
    setKey(filterData[0].key);
    if (key === result) {
      setKey(null);
    } else {
      setKey(result);
    }
  };
  const columns = [
    {
      title: "User",
      dataIndex: "user",
      //   ellipsis: true,
      render: (text, user) => (
        <>
          <Link to={`/user-details?id=${user.key}`}>
            {user.img ? (
              <>
                <img
                  className="rounded-5 property-table-image mw_40 mh_40 me-2"
                  src={user.img}
                  alt=""
                />
                <span className="text-dark"> {text}</span>
              </>
            ) : (
              <>
                <Avatar
                  className="me-2"
                  style={{
                    backgroundColor: "#EF6B3E",
                    verticalAlign: "middle",
                  }}
                  size="large"
                >
                  {text[0]}
                </Avatar>
                <span className="text-dark"> {text}</span>
              </>
            )}
          </Link>
        </>
      ),
    },
    {
      title: "Phone No",
      dataIndex: "phone",
      render: (text) => (
        <>
          {" "}
          <span className="phone">{text}</span>
        </>
      ),
    },
    {
      title: "Email address",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (text) => <span className="fw-bold">{text}</span>,
    },
    {
      title: "",
      dataIndex: "setting",
      render: (text, setting) => (
        <>
          <div className="task-table-setting-container position-relative cursor">
            <img
              src={settingBtn}
              alt=""
              onClick={() => handleIconClick(setting.key)}
            />
            {setting.key === key && (
              <div className="task-table-setting-dropdown-prospect bg-white box-shadow">
                <ul className="p-0 d-flex flex-column gap-3">
                  <Link to={`/user-details?id=${setting.key}`}>
                    <li
                      className="list-style-none"
                    >
                      {" "}
                      <img src={viewIcon} alt="" /> View
                    </li>
                  </Link>
                  <li onClick={() => {
                    onOpenAccountModal()
                    setDeleteId(setting.key)
                  }} className="list-style-none">
                    {" "}
                    <img src={editIcon} alt="" /> Edit
                  </li>
                 

                  <li
                    onClick={() => {
                      setDeleteId(setting.key);
                      onOpenDeleteModal();
                    }}
                    className="list-style-none"
                  >
                    {" "}
                    <img src={deleteIcon} alt="" /> Delete
                  </li>
                </ul>
              </div>
            )}
          </div>
        </>
      ),
    },
  ];

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      console.log(selectedTableItem.length);
      setSelectedTableItem(selectedRowKeys);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };
  return (
    <>
      {openAccountModal === true ? (
        <SettingAddUserDetailsModal
          onOpen={onOpenModal}
          onClose={onCloseModalWorkOrder}
          id={deleteId}
          setUpdate={setUpdate}
        />
      ) : (
        ""
      )}
      {OpenDeleteModal && (
        <DeleteModal
          deleteBtnText="Delete User"
          route="settings/user-info"
          onClose={onCloseDeleteModal}
          component="user"
          fetchFun={FetchLandlordUsers}
          delId={deleteId}
          setUpdate={setUpdate}
        />
      )}
      <p className="heading">USERS</p>
      <SearchBar btnTitle="Add User" route={`./settings/add-user-details`} />
      {selectedTableItem.length >= 1 && (
        <div className="table-delete-icon text-end mt-3 border-bottom pb-3">
          <svg
            width={21}
            height={21}
            fill="none"
            stroke="red"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3 6h18" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
        </div>
      )}

      <div className="task-table-container  mt-3">
        <ConfigProvider
          theme={{
            components: {
              Table: {
                colorTextHeading: "#667085",
                //colorTextDescription: '#667085',
                colorText: "#667085",
                fontSize: 14,
                fontWeightStrong: 500,
                fontFamily: "Montserrat",
                //cellFontSize: 14,
              },
              Checkbox: {
                colorPrimary: "#EF6B3E",
                colorPrimaryHover: "#EF6B3E",
              },
            },
          }}
        >
          <Table
            className="user-info-table"
            rowSelection={{
              type: selectionType,
              ...rowSelection,
            }}
            columns={columns}
            dataSource={data}
            pagination={false}
          />
        </ConfigProvider>
      </div>
    </>
  );
};

export default SettingUserInfo;
