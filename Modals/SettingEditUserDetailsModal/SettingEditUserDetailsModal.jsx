import { useEffect, useMemo, useState } from "react";
import { ConfigProvider, Select, message } from "antd";
import chevronIcon from "assets/chevron-down.png";
import uploadIcon from "assets/upload-cloud-02.png";
import infoIcon from "assets/info.png";
import { useNavigate } from "react-router-dom";
import ProfileUploader from "Components/ProfileUploader/ProfileUploader";
import config from "Helpers/config";
import UseGetHook from "Hooks/UseGetHook";
import UseUpdateHook from "Hooks/UseUpdateHook";
import ModalLoader from "Components/GeneralComponents/ModalLoader";



const SettingAddUserDetails = ({ id, onClose, setUpdate }) => {
  let dropdownIcon;
  dropdownIcon = (
    <>
      <img src={chevronIcon} alt="" />
    </>
  );
  // States start
  const [file, setFile] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [formattedNumber, setFormattedNumber] = useState("");
  const [phone, setphone] = useState("");
  const [DeletedImages, setDeletedImages] = useState([]);
  const [ProfileImages, setProfileImages] = useState([]);
  const [loader, setLoader] = useState(false);
  const { FetchEditUserRole, role } = UseGetHook("getAllUserRole");
  const [form, setForm] = useState([
    {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zipcode: "",
      role: "",
    },
  ]);
  const { users, FetchLandlordUsers } = UseGetHook("users");
  const userData = users.filter((e) => e.id === id);

  const navigate = useNavigate();
  const imageArray = useMemo(() => {

    return userData[0]?.profileImage || [];
  }, [userData]);
  useEffect(() => {
    if (imageArray.length !== 0) {
      setProfileImages((prev) => [...prev, imageArray]);
    }
  }, [imageArray]);
  // States end
  useEffect(() => {
    FetchEditUserRole();
    FetchLandlordUsers()
  }, []);
  const usaStates = [
    { name: "Alabama", abbreviation: "AL" },
    { name: "Alaska", abbreviation: "AK" },
    { name: "Arizona", abbreviation: "AZ" },
    { name: "Arkansas", abbreviation: "AR" },
    { name: "California", abbreviation: "CA" },
    { name: "Colorado", abbreviation: "CO" },
    { name: "Connecticut", abbreviation: "CT" },
    { name: "Delaware", abbreviation: "DE" },
    { name: "Florida", abbreviation: "FL" },
    { name: "Georgia", abbreviation: "GA" },
    { name: "Hawaii", abbreviation: "HI" },
    { name: "Idaho", abbreviation: "ID" },
    { name: "Illinois", abbreviation: "IL" },
    { name: "Indiana", abbreviation: "IN" },
    { name: "Iowa", abbreviation: "IA" },
    { name: "Kansas", abbreviation: "KS" },
    { name: "Kentucky", abbreviation: "KY" },
    { name: "Louisiana", abbreviation: "LA" },
    { name: "Maine", abbreviation: "ME" },
    { name: "Maryland", abbreviation: "MD" },
    { name: "Massachusetts", abbreviation: "MA" },
    { name: "Michigan", abbreviation: "MI" },
    { name: "Minnesota", abbreviation: "MN" },
    { name: "Mississippi", abbreviation: "MS" },
    { name: "Missouri", abbreviation: "MO" },
    { name: "Montana", abbreviation: "MT" },
    { name: "Nebraska", abbreviation: "NE" },
    { name: "Nevada", abbreviation: "NV" },
    { name: "New Hampshire", abbreviation: "NH" },
    { name: "New Jersey", abbreviation: "NJ" },
    { name: "New Mexico", abbreviation: "NM" },
    { name: "New York", abbreviation: "NY" },
    { name: "North Carolina", abbreviation: "NC" },
    { name: "North Dakota", abbreviation: "ND" },
    { name: "Ohio", abbreviation: "OH" },
    { name: "Oklahoma", abbreviation: "OK" },
    { name: "Oregon", abbreviation: "OR" },
    { name: "Pennsylvania", abbreviation: "PA" },
    { name: "Rhode Island", abbreviation: "RI" },
    { name: "South Carolina", abbreviation: "SC" },
    { name: "South Dakota", abbreviation: "SD" },
    { name: "Tennessee", abbreviation: "TN" },
    { name: "Texas", abbreviation: "TX" },
    { name: "Utah", abbreviation: "UT" },
    { name: "Vermont", abbreviation: "VT" },
    { name: "Virginia", abbreviation: "VA" },
    { name: "Washington", abbreviation: "WA" },
    { name: "West Virginia", abbreviation: "WV" },
    { name: "Wisconsin", abbreviation: "WI" },
    { name: "Wyoming", abbreviation: "WY" },
  ];

  const userRoles = [
    { name: "Full Access" },
    { name: "Manager" },
    { name: "Staff" },
    { name: "Tech Support" },
    { name: "Maintenance Team" },
  ];

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  // const uploadButton = (
  //   <button
  //     style={{
  //       border: 0,
  //       background: "none",
  //     }}
  //     type="button"
  //   >
  //     <span role="img" aria-label="plus" className="anticon anticon-plus">
  //       <img style={{ width: "30px" }} src={uploadIcon} />
  //     </span>
  //     <div className="upload-text">Upload photo</div>
  //   </button>
  // );

  const handleInputChange = (event) => {
    const input = event.target.value.replace(/\D/g, "");
    const formatted = formatPhoneNumber(input);
    setFormattedNumber(formatted);
    const unformatted = input.slice(0, 10);
    setphone(unformatted);
  };

  const formatPhoneNumber = (input) => {
    let formattedNumber = "";

    if (input.length > 0) {
      formattedNumber = `(${input.slice(0, 3)}`;

      if (input.length > 3) {
        formattedNumber += `) ${input.slice(3, 6)}`;
      }

      if (input.length > 6) {
        formattedNumber += `-${input.slice(6, 10)}`;
      }
    }

    return formattedNumber;
  };
  // Add User
  const handleFormChange = (fieldName, value) => {
    setForm((prev) => ({
      ...prev,
      [fieldName]: value,
      state: userData[0]?.address?.state || "",
      role: userData[0]?.role || "",
    }));
  };
  var formdata = new FormData();
  if (form.firstName) formdata.append("firstName", form.firstName);
  if (form.middleName) formdata.append("middleName", form.middleName);
  if (form.lastName) formdata.append("lastName", form.lastName);
  if (form.email) formdata.append("email", form.email);
  if (phone) formdata.append("phone", phone);
  if (form.address1) formdata.append("address[address_line_1]", form.address1);
  if (form.city) formdata.append("address[city]", form.city);
  if (form.state) formdata.append("address[state]", form.state);
  if (form.role) formdata.append("role", form.role);
  formdata.append("address[country]", "USA");
  // formdata.append("address[zipcode]", form.zipcode)
  file.forEach((img) => {
    formdata.append("profileImage", img.originFileObj);
  });
  // Add User End

  const EditUser = () => {
    UseUpdateHook("user", id, formdata, onClose, "", setUpdate, setLoader);

  };
  const handlePrev = () => {
    navigate("../user-info");
  };
  return (
    <>
      <div className="payment-modal-container">
        <div className="payment-method-modal property-details-view-task-modal p-5" style={{ position: 'relative', top: '0px', right: '0px' }}>
          <div className="d-flex flex-direction-column justify-content-between">
            <p className="heading">ADD USER DETAILS</p>
            <button onClick={onClose} className="modal-cancel-btn">
              <svg
                width={18}
                height={18}
                fill="#667085"
                stroke="#667085"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
          <div className="row mt-3">
            <div className="col-md-3 d-flex align-items-center">
              <ProfileUploader
                setProfileImages={setProfileImages}
                ProfileImages={ProfileImages}
                setDeletedImages={setDeletedImages}
                DeletedImages={DeletedImages}
              />
              <span className="upload-photo-text">
                User Photo
              </span>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-4">
              <span>
                First Name
              </span>
              <input
                defaultValue={userData[0]?.firstName}
                onChange={(e) => handleFormChange("firstName", e.target.value)}
                type="text"
                className="form-control"
                placeholder="First Name"
              />
            </div>
            <div className="col-md-4">
              <span>Middle Name</span>
              <input
                defaultValue={userData[0]?.middleName}
                onChange={(e) => handleFormChange("middleName", e.target.value)}
                type="text"
                className="form-control"
                placeholder="Middle Name"
              />
            </div>
            <div className="col-md-4">
              <span>
                Last Name
              </span>
              <input
                defaultValue={userData[0]?.lastName}
                onChange={(e) => handleFormChange("lastName", e.target.value)}
                type="text"
                className="form-control"
                placeholder="Last Name"
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-6">
              <span>
                Email
              </span>
              <input
                defaultValue={userData[0]?.email}
                onChange={(e) => handleFormChange("email", e.target.value)}
                type="email"
                className="form-control"
                placeholder="Email"
              />
            </div>
            <div className="col-md-6">
              <span>
                Phone No
              </span>
              <input
                defaultValue={userData[0]?.phone}
                onChange={handleInputChange}
                // value={formattedNumber}
                type="text"
                className="form-control"
                placeholder="Phone number"
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-6">
              <span>
                Address
              </span>
              <input
                defaultValue={userData[0]?.address?.address_line_1}
                onChange={(e) => handleFormChange("address1", e.target.value)}
                type="text"
                className="form-control"
                placeholder="Address"
              />
            </div>
            <div className="col-md-6">
              <span>
                City
              </span>
              <input
                defaultValue={userData[0]?.address?.city}
                onChange={(e) => handleFormChange("city", e.target.value)}
                type="text"
                className="form-control"
                placeholder="City"
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-6">
              <span>
                State
              </span>
              <ConfigProvider
                theme={{
                  components: {
                    Select: {
                      zIndexPopupBase: 99999,
                      colorPrimaryHover: "#EF6B3E",
                      optionSelectedBg: "rgba(239, 107, 62, 0.16)",
                      colorTextPlaceholder: "#667085",
                      fontFamily: "montserrat",
                    },
                  },
                }}
              >
                <Select
                  showSearch
                  //defaultValue={user.map(e => e.state)}
                  placeholder="Select State"
                  suffixIcon={dropdownIcon}
                  style={{
                    width: "100%",
                    height: 45,
                  }}
                  options={usaStates.map((e) => {
                    return { value: e.name, label: e.name };
                  })}
                  defaultValue={userData[0]?.address.state}
                  onChange={(e) => handleFormChange("state", e)}
                />
              </ConfigProvider>
            </div>
            <div className="col-md-6">
              <span>
                Country
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
                      colorTextDisabled: "#667085",
                      fontFamily: "montserrat",
                    },
                  },
                }}
              >
                <Select
                  //onChange={(e) => setPropertyCountry(e)}
                  suffixIcon={""}
                  placeholder="Select Country"
                  defaultValue={"USA"}
                  style={{
                    width: "100%",
                    height: 45,
                  }}
                  disabled
                  options={[
                    {
                      value: "USA",
                      label: "USA",
                    },
                    {
                      value: "Canada",
                      label: "Canada",
                    },
                  ]}
                />
              </ConfigProvider>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-6">
              <span>
                User Role
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
                    Tooltip: {
                      colorBgSpotlight: "#FFFFFF",
                      colorTextLightSolid: "#344054",
                    },
                  },
                }}
              >
                <Select
                  showSearch
                  placeholder="Select Role"
                  suffixIcon={dropdownIcon}
                  style={{
                    width: "100%",
                    height: 45,
                  }}
                  options={role.map((e) => {
                    return { value: e._id, label: e.role };
                  })}
                  defaultValue={
                    userData[0]?.role?.role
                  }
                  onChange={(e) => handleFormChange("role", e)}
                />
              </ConfigProvider>
            </div>
            <div className="col-md-6 d-flex align-items-center mt-3">
              <span className="property-details-input-title">
                <img src={infoIcon} alt="" className="cursor info-icon me-2" />
                What parts of DigitalTenant they can access.
              </span>
            </div>
          </div>
          <div className="setting-btn add-user-details-btn row mt-3">
            <div className="col-md-12 d-flex gap-4">
              {/* <button className="cancel-btn w-50" onClick={onClose}>
                Cancel
              </button> */}
              <button onClick={(e) => {
                EditUser()
                setLoader(true)

              }} className="save-btn d-flex justify-content-center gap-3">
                Save {loader && <ModalLoader />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingAddUserDetails;
