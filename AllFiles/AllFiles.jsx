import { useEffect, useState } from "react";
import { Table, ConfigProvider, Avatar, message } from "antd";
import settingIcon from "assets/three-dots.png";
import editIcon from "assets/edit-05.png";
import deleteIcon from "assets/trash-01.png";
import trashIconWhite from "assets/trash-icon-white.png";
import { Link, useNavigate } from "react-router-dom";
import downloadIcon from "assets/Download Icon.png";
import SearchBar from "Helpers/SearchBar";
import DeleteModal from "Modals/DeleteModal/DeleteModal";
import UseGetHook from "Hooks/UseGetHook";
import { useSelector } from "react-redux";
import ConditionalFilter from "Hooks/ConditionalFilter";
import BulkDelete from "Hooks/BulkDelete";
import config from 'Helpers/config.json'
import pdfIcon from "assets/pdf.jpg";
import excelIcon from "assets/excel.jpg";
import wordIcon from "assets/word.jpg";
const AllFiles = () => {
  // States start
  const [taskFilterDropdown, settaskFilterDropdown] = useState(false);
  const [selectionType, setSelectionType] = useState("checkbox");
  const [selectedTableItem, setSelectedTableItem] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [key, setKey] = useState([]);
  const [deleteId, setDeleteId] = useState("");
  const [component, setcomponent] = useState("");
  const [update, setUpdate] = useState(false);
  // States end

  const navigate = useNavigate();
  const search = useSelector((state) => {
    return state.Search.value;
  });

  // Modal Function
  const onOpenModal = () => {
    setOpenModal(true);
  };
  const onCloseModal = () => {
    setOpenModal(false);
  };

  // Fetch Data
  const range = useSelector((state) => {
    return state.FilterValue.value;
  });
  const fromDate = useSelector((state) => {
    return state.FilterValue.fromDate;
  });
  const toDate = useSelector((state) => {
    return state.FilterValue.toDate;
  });
  const { filters, FilterObjects } = ConditionalFilter({
    range,
    fromDate,
    toDate,
  });
  const { fileData, FetchFile } = UseGetHook(
    filters(FilterObjects) ? `files/filter?${filters(FilterObjects)}` : "files"
  );
  useEffect(() => {
    FetchFile();
  }, [range, fromDate, toDate]);
  useEffect(() => {
    if (update) {
      FetchFile();
      setUpdate(false);
    }
  }, [update]);
  // Data Table functions
  const data = fileData
    ?.filter((e) => e?.name?.toLowerCase()?.includes(search?.toLowerCase()))
    ?.map((e) => ({
      key: e?.id,
      fileName: [e.file, e.name],
      property: "property 1",
      owner: localStorage.getItem("name"),
      date: new Date(e?.created_at).toLocaleDateString(),
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

  const downloadFiles = (filename) => {
    const split_file = filename.split("https://digital-tenant-bucket.s3.us-east-1.amazonaws.com/")[1];
    fetch(`${config['baseUrl']}/api/file/download/${split_file}`, {
      method: "GET",
      headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` },
      responseType: 'blob'
    })
      .then(response => response.blob())
      .then(blob => {
        const fileURL = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = fileURL;
        a.download = split_file;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(fileURL);
        message.success('File download successful');
      })
      .catch(error => {
        console.error('Error fetching file:', error);
        message.error('Error downloading file');
      });
  };

  const columns = [
    {
      title: "File Name",
      dataIndex: "fileName",
      render: (text, file) => (
        <>
          <Link to="">
            <div className="table-file-container d-flex align-items-center gap-3">
              <div className="table-file-img">
                <img
                  className="property-table-image mw_40 mh_40 me-2 rounded-3"
                  src={`${text[0].includes("pdf") ? pdfIcon : text[0].includes("xlsx") ? excelIcon : text[0].includes("docx") ? wordIcon : text[0]}`}
                  alt=""
                />
              </div>
              <div className="table-file-text">
                <p onClick={() => downloadFiles(text[0])} className="m-0 all-files-table-name-text">{text[1]}</p>
              </div>
            </div>
          </Link>
        </>
      ),
    },

    {
      title: "Properties",
      dataIndex: "property",
      render: (text) => (
        <>
          <span className="tenant_table_properties_main_text">{text}</span>
          <br />
        </>
      ),
    },
    {
      title: "Owner",
      dataIndex: "owner",
      render: (text, type) => (
        <>
          <Avatar
            style={{
              backgroundColor: "#EF6B3E",
              verticalAlign: "middle",
            }}
            size="large"
          >
            {localStorage.getItem("name")[0]}
          </Avatar>
          <span className="tenant_table_name_text ms-3">{text}</span>
        </>
      ),
    },
    {
      title: "Date Uploaded",
      dataIndex: "date",
    },
    {
      title: "",
      dataIndex: "setting",
      render: (text, setting) => (
        <>
          <div className="task-table-setting-container position-relative cursor">
            <img
              src={settingIcon}
              alt=""
              onClick={() => handleIconClick(setting.key)}
            />
            {setting.key === key && (
              <div className="all-files-table-setting-dropdown bg-white box-shadow">
                <ul className="p-0 d-flex flex-column gap-3">
                  <Link to={`/edit-file?id=${setting.key}`}>
                    <li className="list-style-none table-setting-dropdown-menu">
                      {" "}
                      <img src={editIcon} alt="" /> Edit
                    </li>
                  </Link>
                  <Link>
                    <li className="list-style-none table-setting-dropdown-menu">
                      {" "}
                      <img src={downloadIcon} alt="" /> Download
                    </li>
                  </Link>
                  <Link>
                    <li
                      onClick={() => {
                        setcomponent("file");
                        onOpenModal();
                        setDeleteId(setting.key);
                      }}
                      className="list-style-none table-setting-dropdown-menu"
                    >
                      {" "}
                      <img src={deleteIcon} alt="" /> Delete
                    </li>
                  </Link>
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
      setSelectedTableItem([...selectedRowKeys]);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };
  const { bulkDelete } = BulkDelete("file", selectedTableItem, FetchFile);
  const DeleteSelected = () => {
    bulkDelete();
  };
  const fetchDeleteFun = () => {
    FetchFile();
  };

  return (
    <>
      {openModal === true ? (
        <DeleteModal
          onClose={onCloseModal}
          component={component}
          setUpdate={setUpdate}
          route="all-files"
          deleteBtnText={`Delete ${component}`}
          delId={deleteId}
        />
      ) : (
        ""
      )}
      <div className="container-fluid bg-white p-3 ">
        <SearchBar
          btnTitle="Add New File"
          route="new-files"
          fileFilter={true}
        />
        <div className="row mt-3">
          <div className="col-md-12">
            {selectedTableItem.length >= 1 && (
              <div className="table-delete-icon mt-3">
                <button
                  onClick={DeleteSelected}
                  className="table-delete-btn next-btn-main"
                >
                  <img src={trashIconWhite} alt='' />
                  Delete
                </button>
              </div>
            )}
            <div className="table-container">
              <ConfigProvider
                theme={{
                  components: {
                    Table: {
                      colorTextHeading: "#667085",
                      colorText: "#667085",
                      fontSize: 14,
                      fontWeightStrong: 500,
                      fontFamily: "Montserrat",
                    },
                    Pagination: {
                      itemActiveBg: "#EF6B3E",
                    },
                    Checkbox: {
                      colorPrimary: "#EF6B3E",
                      colorPrimaryHover: "#EF6B3E",
                    },
                  },
                }}
              >
                <Table
                  pagination={true}
                  className="all-files-table scroll-remove scroll-responsive-tablet"
                  rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                  }}
                  columns={columns}
                  dataSource={data}
                />
              </ConfigProvider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllFiles;
