import { useEffect, useState } from "react";
import { ConfigProvider, Select, message } from "antd";
import chevronIcon from "assets/chevron-down.png";
import uploadIcon from "assets/upload-cloud-02.png";
import infoIcon from "assets/info.png";
import { useNavigate } from "react-router-dom";
import ProfileUploader from "Components/ProfileUploader/ProfileUploader";
import config from "Helpers/config";
import UseGetHook from "Hooks/UseGetHook";
import ModalLoader from "Components/GeneralComponents/ModalLoader";
import { fireEvent } from "@testing-library/react";
const SettingAddUserDetails = () => {
  let dropdownIcon;
  dropdownIcon = (
    <>
      <img src={chevronIcon} alt="" />
    </>
  );
  // States start
  const [state, setstate] = useState("");
  const [file, setFile] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [formattedNumber, setFormattedNumber] = useState("");
  const [phone, setphone] = useState("");
  const [loader, setLoader] = useState(false);
  const [DeletedImages, setDeletedImages] = useState([]);
  const [ProfileImages, setProfileImages] = useState([]);
  const { FetchUserRole, role } = UseGetHook("getAllUserRole");
  const [errors, setErrors] = useState()
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
  const navigate = useNavigate();
  // States end
  useEffect(() => {
    FetchUserRole()
  }, [])
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
    setLoader(false)

  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
      setLoader(false)

    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
      setLoader(false)
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

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <span role="img" aria-label="plus" className="anticon anticon-plus">
        <img style={{ width: "30px" }} src={uploadIcon} />
      </span>
      <div className="upload-text">Upload photo</div>
    </button>
  );

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
    }));
  };
  var formdata = new FormData();
  formdata.append("firstName", form.firstName);
  formdata.append("middleName", form.middleName);
  formdata.append("lastName", form.lastName);
  formdata.append("email", form.email);
  formdata.append("phone", phone);
  formdata.append("address[address_line_1]", form.address1);
  formdata.append("address[city]", form.city);
  formdata.append("address[state]", form.state);
  formdata.append("address[country]", "USA");
  // formdata.append("address[zipcode]", form.zipcode)
  formdata.append("role", form.role);
  file.forEach((img) => {
    formdata.append("profileImage", img.originFileObj);
  });
  const CreateRole = () => {
    console.log(form);
    fetch(`${config.baseUrl}/api/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formdata,
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.apiCallStatus === "success") {
          message.success("User added successfully");
          navigate("/settings/user-info");
          setLoader(false)
        } else {
          message.error(res.error.validations || res.error.message)
          setLoader(false)
        }
      }).catch(err => {
        message.error(err.error.validations || err.error.message)
        setLoader(false)
      })

  };
  // Add User End

  const handlePrev = () => {
    navigate("../user-info");
  };
  return (
    <>
      <p className="heading">ADD USER DETAILS</p>
      <div className="row mt-3">
        <div className="col-md-3 d-flex align-items-center">
          <ProfileUploader
            setProfileImages={setProfileImages}
            ProfileImages={ProfileImages}
            setDeletedImages={setDeletedImages}
            DeletedImages={DeletedImages}
          />
          <span className="upload-photo-text">
            User Photo<span className="sign-up-imp-star">*</span>
          </span>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-4">
          <span>
            First Name<span className="sign-up-imp-star">*</span>
          </span>
          <input
            onChange={(e) => handleFormChange("firstName", e.target.value)}
            type="text"
            className="form-control"
            placeholder="First Name"
          />
          {
            errors.firstName && (
              <span className="">
                {
                  errors.firstName
                }
              </span>
            )
          }
        </div>
        <div className="col-md-4">
          <span>Middle Name</span>
          <input
            onChange={(e) => handleFormChange("middleName", e.target.value)}
            type="text"
            className="form-control"
            placeholder="Middle Name"
          />
        </div>
        <div className="col-md-4">
          <span>
            Last Name<span className="sign-up-imp-star">*</span>
          </span>
          <input
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
            Email<span className="sign-up-imp-star">*</span>
          </span>
          <input
            onChange={(e) => handleFormChange("email", e.target.value)}
            type="email"
            className="form-control"
            placeholder="Email"
          />
        </div>
        <div className="col-md-6">
          <span>
            Phone No<span className="sign-up-imp-star">*</span>
          </span>
          <input
            onChange={handleInputChange}
            value={formattedNumber}
            type="text"
            className="form-control"
            placeholder="Phone number"
          />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-6">
          <span>
            Address<span className="sign-up-imp-star">*</span>
          </span>
          <input
            onChange={(e) => handleFormChange("address1", e.target.value)}
            type="text"
            className="form-control"
            placeholder="Address"
          />
        </div>
        <div className="col-md-6">
          <span>
            City<span className="sign-up-imp-star">*</span>
          </span>
          <input
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
            State<span className="sign-up-imp-star">*</span>
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
              onChange={(e) => handleFormChange("state", e)}
            />
          </ConfigProvider>
        </div>
        <div className="col-md-6">
          <span>
            Country<span className="sign-up-imp-star">*</span>
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
          <button className="cancel-btn w-50" onClick={handlePrev}>
            Cancel
          </button>
          <button onClick={() => {
            CreateRole()
            setLoader(true)
          }} className="save-btn w-50 d-flex justify-content-center gap-3">
            Send Invite {loader && <ModalLoader />}
          </button>
        </div>
      </div>
    </>
  );
};

export default SettingAddUserDetails;
