import { useEffect, useMemo, useState } from "react";
import { Upload, ConfigProvider, message } from "antd";
import { Select } from "antd";
import chevronIcon from "assets/chevron-down.png";
import Loader from "Helpers/Loader";
import UseGetHook from "Hooks/UseGetHook";
import ProfileUploader from "Components/ProfileUploader/ProfileUploader";
import config from "Helpers/config";
import ModalLoader from "Components/GeneralComponents/ModalLoader";


const SettingCompanyInfo = () => {
  let dropdownIcon;
  dropdownIcon = (
    <>
      <img src={chevronIcon} alt="" />
    </>
  );
  // States
  const [DeletedImages, setDeletedImages] = useState([]);
  const [ProfileImages, setProfileImages] = useState([]);
  const [formattedNumber, setFormattedNumber] = useState("");
  const [loader, setLoader] = useState(false);
  const [phone, setphone] = useState("");
  const [file, setFile] = useState([]);
  const [form, setForm] = useState({
    default_company_name: "",
    company_name: "",
    company_email: "",
    address: "",
    state: "",
    zipcode: "",
  });
  const formdata = new FormData();
  formdata.append("companyName", form.company_name);
  formdata.append("email", form.company_email);
  formdata.append("phone", phone);
  formdata.append("address", form.address);
  formdata.append("zipcode", form.zipcode);
  formdata.append("state", form.state);
  formdata.append("country", "USA");
  file.forEach((img) => {
    formdata.append("companyLogo", img.originFileObj);
  });
  const { company, FetchCompany } = UseGetHook("companies");
  useEffect(() => {
    FetchCompany();
  }, []);
  const handleInputChange = (event) => {
    const input = event.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    const formatted = formatPhoneNumber(input);
    setFormattedNumber(formatted); // Update state with formatted number
    const unformatted = input.slice(0, 10);
    setphone(unformatted); // Update state with unformatted number
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
  const handleCompanyForm = (fieldName, value) => {
    setForm((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };
  const imageArray = useMemo(() => {
    return company[0]?.profileImage || [];
  }, [company]);
  useEffect(() => {
    if (imageArray.length !== 0) {
      setProfileImages((prev) => [...prev, imageArray]);
    }
  }, [imageArray]);
  const url = company[0]?.id ? `/${company[0]?.id}` : ""
  const addCompanyInfo = () => {
    setLoader(true);
    fetch(`${config.baseUrl}/api/company/${company[0]?.id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      body: formdata,
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.apiCallStatus === "success") {
          message.success("Company profile updated successfully");
          window.location.reload(true);
          setLoader(false);
        } else {
          message.error(res.error.message);
          setLoader(false);
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <p className="heading">COMPANY info</p>
          <p className="mb-0">
            Your Company Logo<span className="sign-up-imp-star">*</span>
          </p>
          <p className="normal-grey-text">
            Lorem ipsum dolor sit amet consectetur.
          </p>
          <div className="row mt-3 d-flex justify-content-start">
            <div className="col-md-12 ">
              <div className="dragger-company-logo">
                <ProfileUploader
                  setProfileImages={setProfileImages}
                  ProfileImages={ProfileImages}
                  setDeletedImages={setDeletedImages}
                  DeletedImages={DeletedImages}
                />
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-12">
              <span>
                Company Name<span className="sign-up-imp-star">*</span>
              </span>
              <input
                defaultValue={company[0]?.companyName}
                onChange={(e) => {
                  handleCompanyForm("company_name", e.target.value);
                }}
                type="text"
                className="form-control"
                placeholder="Company Name"
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-6">
              <span>Company Email Address</span>
              <input
                defaultValue={company[0]?.email}
                onChange={(e) =>
                  handleCompanyForm("company_email", e.target.value)
                }
                type="email"
                className="form-control"
                placeholder="Company Email Address"
              />
            </div>
            <div className="col-md-6">
              <span>Company Phone No</span>
              <input
                defaultValue={company.map((phone) => {
                  return phone.phone.length > 0
                    ? formatPhoneNumber(phone.phone)
                    : formattedNumber;
                })}
                onChange={handleInputChange}
                type="text"
                className="form-control"
                placeholder="Phone number"
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-6">
              <span>Address</span>
              <input
                defaultValue={company[0]?.address}
                onChange={(e) => handleCompanyForm("address", e.target.value)}
                type="text"
                className="form-control"
                placeholder="Address"
              />
            </div>
            <div className="col-md-6">
              <span>State</span>
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
                  suffixIcon={dropdownIcon}
                  placeholder="Select State"
                  style={{
                    width: "100%",
                    height: 50,
                  }}
                  options={usaStates.map((e) => {
                    return { value: e.name, label: e.name };
                  })}
                  onChange={(e) => handleCompanyForm("state", e)}
                />
              </ConfigProvider>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-6">
              <span>Zip code</span>
              <input
                defaultValue={company[0]?.zipcode}
                onChange={(e) => handleCompanyForm("zipcode", e.target.value)}
                type="number"
                className="form-control"
                placeholder="Zip code"
              />
            </div>
            <div className="col-md-6">
              <span>Country</span>
              <Select
                defaultValue="USA"
                style={{
                  width: "100%",
                  height: 50,
                }}
                disabled
                options={[
                  {
                    value: "jack",
                    label: "Jack",
                  },
                  {
                    value: "lucy",
                    label: "Lucy",
                  },
                  {
                    value: "Yiminghe",
                    label: "yiminghe",
                  },
                  {
                    value: "disabled",
                    label: "Disabled",
                    disabled: true,
                  },
                ]}
              />
            </div>
          </div>
          <div className="row my-4">
            <div className="setting-btn my-4 d-flex align-items-center gap-3">
              <button onClick={() => {
                addCompanyInfo()
                setLoader(true)

              }} className="save-btn">
                Save{loader && <ModalLoader />}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SettingCompanyInfo;
