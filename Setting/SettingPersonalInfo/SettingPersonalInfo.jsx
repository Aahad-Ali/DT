import { useEffect, useMemo, useState } from "react";
import { Select } from "antd";
import { message, ConfigProvider } from "antd";
import chevronIcon from "assets/chevron-down.png";
import UseGetHook from "Hooks/UseGetHook";
import ProfileUploader from "Components/ProfileUploader/ProfileUploader";
import config from "Helpers/config";
import ModalLoader from "Components/GeneralComponents/ModalLoader";
const SettingPersonalInfo = () => {
  // States start
  const [formattedNumber, setFormattedNumber] = useState("");
  const [phone, setphone] = useState("");
  const [fName, setFname] = useState("");
  const [mName, setMname] = useState("");
  const [lName, setLname] = useState("");
  const [address, setaddress] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [zipcode, setzipcode] = useState("");
  const [ProfileImages, setProfileImages] = useState([]);
  const [phoneType, setPhoneType] = useState([]);
  const [loader, setLoader] = useState(false);

  // States end

  const handleZipCodeChange = (e) => {
    // Update the state
    if (/^\d{0,5}$/.test(e.target.value)) setzipcode(e.target.value);
  };

  const handleInputChange = (event) => {
    const input = event.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    const formatted = formatPhoneNumber(input);
    setFormattedNumber(formatted); // Update state with formatted number
    const unformatted = input.slice(0, 10);
    setphone(unformatted); // Update state with unformatted number
  };
  let dropdownIcon;
  dropdownIcon = (
    <>
      <img src={chevronIcon} alt="" />
    </>
  );
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
  const selectPhoneType = [
    { name: "Mobile" },
    { name: "Home" },
    { name: "Office" },
  ];
  // Fetch Data
  const { FetchUser, user, FetchUserTenant } = UseGetHook("userinfo");
  const imageArray = useMemo(() => {
    return user[0]?.profileImage || [];
  }, [user]);
  useEffect(() => {
    if (imageArray.length !== 0) {
      setProfileImages((prev) => [...prev, imageArray]);
    }
  }, [imageArray]);
  useEffect(() => {
    if (localStorage.getItem("role") === "tenant") {
      FetchUserTenant();
    } else {
      FetchUser();
    }
  }, []);
  // Update Personal info
  var formdata = new FormData();
  if (fName) formdata.append("firstName", fName);
  if (mName) formdata.append("middleName", mName);
  if (lName) formdata.append("lastName", lName);
  if (user[0]?.email) formdata.append("email", user[0]?.email);
  if (phone) formdata.append("phone", phone);
  if (address) formdata.append("address", address);
  if (state) formdata.append("state", state);
  formdata.append("country", "US");
  if (zipcode) formdata.append("zipcode", zipcode);
  if (city) formdata.append("city", city);
  if (ProfileImages) formdata.append("profileImage", ProfileImages);
  if (localStorage.getItem("role") === "tenant") formdata.append("phoneType", phoneType);
  const updateProfileLandlord = () => {
    fetch(`${config["baseUrl"]}/api/auth/landlord/updateprofile`, {
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      body: formdata,
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.apiCallStatus === "success") {
          message.success("Profile updated successfully");
          window.location.reload(true);
          setLoader(false)
        } else {
          setLoader(false)
          message.error(res.error.message);
        }
      })
      .catch((e) => console.log(e));
  };
  const updateProfileTenant = () => {
    fetch(`${config["baseUrl"]}/api/auth/tenant/updateprofile`, {
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      body: formdata,
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.apiCallStatus === "success") {
          message.success("Profile updated successfully");
          window.location.reload(true);

          setLoader(false)
        } else {
          setLoader(false)

          message.error(res.error.message);
        }
      })
      .catch((e) => console.log(e));
  };
  // const values=options
  return (
    <>
      <p className="heading">Personal info</p>
      <p className="mb-0">Your Photo</p>
      <p className="normal-grey-text">
        This will be displayed on your profile.
      </p>
      <div className="photo-container d-flex align-items-start  gap-4">
        <div className="dragger">
          <ProfileUploader
            setProfileImages={setProfileImages}
            ProfileImages={ProfileImages}
          />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-4">
          <span>
            First Name<span className="sign-up-imp-star">*</span>
          </span>
          <input
            defaultValue={user[0]?.firstName}
            onChange={(e) => setFname(e.target.value)}
            type="text"
            className="form-control"
            placeholder="First Name"
          />
        </div>
        <div className="col-md-4">
          <span>Middle Name</span>
          <input
            defaultValue={user[0]?.middleName}
            onChange={(e) => setMname(e.target.value)}
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
            defaultValue={user[0]?.lastName}
            onChange={(e) => setLname(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Last Name"
          />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-12">
          <span>
            Email<span className="sign-up-imp-star">*</span>
          </span>
          <input
            defaultValue={user[0]?.email}
            disabled
            type="email"
            className="form-control"
            placeholder="Email"
          />
        </div>

      </div>
      <div className="row mt-3">
        <div className="col-md-6">
          <span>
            Phone No<span className="sign-up-imp-star">*</span>
          </span>
          <input
            onChange={handleInputChange}
            defaultValue={user.map((phone) => {
              return phone.phone.length > 0
                ? formatPhoneNumber(phone.phone)
                : formattedNumber;
            })}
            type="text"
            className="form-control"
            placeholder="Phone number"
          />
        </div>
        <div className="col-md-6">
          <span>
            Phone Type<span className="sign-up-imp-star">*</span>
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
              onChange={(e) => setPhoneType(e)}
              suffixIcon={dropdownIcon}
              placeholder="Select Phone Type"
              style={{
                width: "100%",
                height: 45,
              }}
              options={selectPhoneType.map((e) => {
                return { value: e.name, label: e.name };
              })}
            />
          </ConfigProvider>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-6">
          <span>
            Address<span className="sign-up-imp-star">*</span>
          </span>
          {
            console.log(user,'hhuf')
          }
          <input
            defaultValue={user[0]?.address}
            onChange={(e) => setaddress(e.target.value)}
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
            defaultValue={user[0]?.city?.name}
            onChange={(e) => setcity(e.target.value)}
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
        {
          user.length>0?
          <>
          <Select
          showSearch
          defaultValue={`${user[0]?.state?.name}`}
          placeholder="Select State"
          suffixIcon={dropdownIcon}
          style={{
            width: "100%",
            height: 45,
          }}
          options={usaStates.map((e) => {
            return { value: e.name, label: e.name };
          })}
          onChange={(e) => setstate(e)}
        />
        </>
        :
        <Select
        showSearch
        placeholder="Select State"
        suffixIcon={dropdownIcon}
        style={{
          width: "100%",
          height: 45,
        }}
        options={usaStates.map((e) => {
          return { value: e.name, label: e.name };
        })}
        onChange={(e) => setstate(e)}
      />
        }
        </ConfigProvider>
       
        </div>
        <div className="col-md-6">
          <span>
            Zip code<span className="sign-up-imp-star">*</span>
          </span>
          <input
            // defaultValue={user[0]?.zipcode?.number}
            //onChange={(e) => setzipcode(e.target.value)}
            onChange={handleZipCodeChange}
            defaultValue={user[0]?.zipcode?.number !== undefined ? user[0]?.zipcode?.number : zipcode}
            type="text"
            className="form-control"
            placeholder="Zip code"
          />
        </div>
      </div>
      <div className="setting-btn my-4 d-flex align-items-center gap-4">
        <button
          onClick={() => {
          setLoader(true)

            localStorage.getItem("role") === "tenant" 
              ? updateProfileTenant()
              : updateProfileLandlord();
          }}
          className="save-btn d-flex justify-content-center gap-3"
        >
          Save{loader && <ModalLoader/>}
        </button>
      </div>
    </>
  );
};

export default SettingPersonalInfo;
