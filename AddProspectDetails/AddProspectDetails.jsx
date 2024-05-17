// FIXED : Get Profile image adder reference from this module
import { useEffect, useMemo, useState } from "react";
import { ConfigProvider, Select, Space } from "antd";
import { DatePicker } from "antd";
import AddProspectModal from "Modals/AddProspectModal/AddProspectModal";
import { message, Upload } from "antd";
import chevronIcon from "assets/chevron-down.png";
import calendarIcon from "assets/calendar.png";
import ProfileUploader from "../ProfileUploader/ProfileUploader";
import UseFormDataHook from "Hooks/UseFormDataHook";
import config from "Helpers/config.json";
import UseGetHook from "Hooks/UseGetHook";
import moment from "moment";



const AddProspectDetails = () => {
  const dateFormat = "MM/DD/YYYY";
  // States start
  const [currentStep, setCurrentStep] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [phone, setphone] = useState("");
  const [mName, setMname] = useState("");
  const [email, setEmail] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipCode, setZipCode] = useState();
  const [notes, setNotes] = useState("");
  const [ProfileImages, setProfileImages] = useState([]);
  const [formattedNumber, setFormattedNumber] = useState("");
  const [DeletedImages, setDeletedImages] = useState([]);
  const [tenant, setTenant] = useState([]);
  const [loader, setLoader] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_no: "",
    company: "",
    job_title: "",
    address: "",
    city: "",
    state: "",
    phoneType: "",
    property: '',
    unit: '',
  });
  const [errors, setErrors] = useState({});
  const imageArray = useMemo(() => {
    return tenant?.profileImage || [];
  }, [tenant]);
  useEffect(() => {
    if (imageArray.length !== 0) {
      setProfileImages((prev) => [...prev, imageArray]);
    }
  }, [imageArray]);
  // Fetch Data

  const handleChange = (fieldName, value) => {
    setForm({
      ...form,
      [fieldName]: value,
    });
    if (fieldName === "email") {
      setForm({ ...form, email: value });
    }
  };


  const { PropertyData, fetchProperty } = UseGetHook("property");
  const { fetchUnit, UnitData } = UseGetHook("unit", form.property);
  useEffect(() => {
    fetchProperty();
    if (form.property !== "") {
      fetchUnit();
    }
  }, [form.property]);
  // Fetch Data End
  // Fetch Tenant

  // States end

  const handleZipCodeChange = (e) => {
    // Update the state
    if (/^\d{0,5}$/.test(e.target.value)) setZipCode(e.target.value);
  };

  const selectPhoneType = [
    { name: "Mobile" },
    { name: "Home" },
    { name: "Office" },
  ];

  // Pet Form
  const [pets, setPets] = useState([
    {
      petType: "",
      petName: "",
      petWeight: "",
      petBreed: "",
    },
  ]);

  const handlePetTypeChange = (index, value) => {
    const newPets = [...pets];
    newPets[index].petType = value;
    setPets(newPets);
  };

  const handlePetNameChange = (index, value) => {
    const newPets = [...pets];
    newPets[index].petName = value;
    setPets(newPets);
  };

  const handlePetWeightChange = (index, value) => {
    const newPets = [...pets];
    newPets[index].petWeight = value;
    setPets(newPets);
  };

  const handlePetBreedChange = (index, value) => {
    const newPets = [...pets];
    newPets[index].petBreed = value;
    setPets(newPets);
  };

  const addAnotherPet = () => {
    setPets([
      ...pets,
      { petType: "", petName: "", petWeight: "", petBreed: "" },
    ]);
  };

  const removePet = (indexToRemove) => {
    if (indexToRemove !== 0) {
      const updatedPets = pets.filter((pet, index) => index !== indexToRemove);
      setPets(updatedPets);
    }
  };
  // Pet Form End
  // Vehicles Form End
  const [vehicles, setVehicles] = useState([
    {
      vehicleType: "",
      vehicleMake: "",
      vehicleModel: "",
      vehicleYear: "",
      vehicleColor: "",
      vehicleLicense: "",
    },
  ]);


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

  const handleVehicleTypeChange = (index, value) => {
    const newVehicles = [...vehicles];
    newVehicles[index].vehicleType = value;
    setVehicles(newVehicles);
  };

  const handleVehicleMakeChange = (index, value) => {
    const newVehicles = [...vehicles];
    newVehicles[index].vehicleMake = value;
    setVehicles(newVehicles);
  };

  const handleVehicleModelChange = (index, value) => {
    const newVehicles = [...vehicles];
    newVehicles[index].vehicleModel = value;
    setVehicles(newVehicles);
  };

  const handleVehicleYearChange = (index, value) => {
    const newVehicles = [...vehicles];
    newVehicles[index].vehicleYear = value;
    setVehicles(newVehicles);
  };

  const handleVehicleColorChange = (index, value) => {
    const newVehicles = [...vehicles];
    newVehicles[index].vehicleColor = value;
    setVehicles(newVehicles);
  };

  const handleVehicleLicenseChange = (index, value) => {
    const newVehicles = [...vehicles];
    newVehicles[index].vehicleLicense = value;
    setVehicles(newVehicles);
  };

  const addAnotherVehicle = () => {
    setVehicles([
      ...vehicles,
      {
        vehicleType: "",
        vehicleMake: "",
        vehicleModel: "",
        vehicleYear: "",
        vehicleColor: "",
        vehicleLicense: "",
      },
    ]);
  };

  const removeVehicle = (indexToRemove) => {
    if (indexToRemove !== 0) {
      const updatedVehicles = vehicles.filter(
        (vehicle, index) => index !== indexToRemove
      );
      setVehicles(updatedVehicles);
    }
  };
  // Vehicles Form End
  // Dependencies Info Form End
  const [dependents, setDependents] = useState([
    {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      phoneNo: "",
      dateOfBirth: "",
      relationship: "",
      formattedPhoneNo: "",
    },
  ]);

  const handleFirstNameChange = (index, value) => {
    const newDependents = [...dependents];
    newDependents[index].firstName = value;
    setDependents(newDependents);
  };

  const handleMiddleNameChange = (index, value) => {
    const newDependents = [...dependents];
    newDependents[index].middleName = value;
    setDependents(newDependents);
  };

  const handleLastNameChange = (index, value) => {
    const newDependents = [...dependents];
    newDependents[index].lastName = value;
    setDependents(newDependents);
  };

  const handleEmailChange = (index, value) => {
    const newDependents = [...dependents];
    newDependents[index].email = value;
    setDependents(newDependents);
  };

  const handlePhoneNoChange = (index, value) => {
    const format = value.replace(/\D/g, "").slice(0, 10);
    const formatted = formatPhoneNumber(format);
    const newDependents = [...dependents];
    newDependents[index].phoneNo = format;
    newDependents[index].formattedPhoneNo = formatted;
    setDependents(newDependents);
  };
  const handleDateOfBirthChange = (index, value) => {
    const newDependents = [...dependents];
    newDependents[index].dateOfBirth = value;
    setDependents(newDependents);
    setSelectedDate(value); // Update selected date to the new value

    // Check if the user is at least 18 years old
    if (value) {
      const today = moment();
      const minDate = moment(today).subtract(18, "years");
      if (moment(value).isBefore(minDate, "day")) {
        // Proceed with the selected date
        message.success("You are eligible.");
      } else {
        // Show error message and reset selected date
        message.error("You must be at least 18 years old.");
        // Revert to the previous selected date
        const prevDependent = dependents[index];
        const prevDate = prevDependent ? prevDependent.dateOfBirth : null;
        setSelectedDate(prevDate);
      }
    }
  };
  const disabledDate = (current) => {
    // Disable dates after today
    return current && current > moment().endOf("day");
  };
  const handleRelationshipChange = (index, value) => {
    const newDependents = [...dependents];
    newDependents[index].relationship = value;
    setDependents(newDependents);

  };

  const addAnotherDependent = () => {
    setDependents([
      ...dependents,
      {
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        phoneNo: "",
        dateOfBirth: "",
        relationship: "",
      },
    ]);
  };

  const removeDependent = (indexToRemove) => {
    if (indexToRemove !== 0) {
      const updatedDependents = dependents.filter(
        (dependent, index) => index !== indexToRemove
      );
      setDependents(updatedDependents);
    }
  };
  // Dependencies Info Form End

  let dropdownIcon;
  dropdownIcon = (
    <>
      <img src={chevronIcon} alt="" />
    </>
  );
  let calendar;
  calendar = (
    <>
      <img src={calendarIcon} alt="" />
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
    if (currentStep === 1) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email.trim() === "") {
        message.error("Please fill in the required email field to continue");
      } else if (!emailRegex.test(email)) {
        message.error("Please enter a valid email address");
      } else {
        fetch(`${config.baseUrl}/api/prospect/checkTenant?email=${email}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            if (res.apiCallStatus === "success") {
              if (res.message === "No tenant found with the provided email.") {
                // message.info(res.message);
                setCurrentStep(currentStep + 1);
                // setTimeout(() => {
                // }, 2000);
              } else {
                setTenant(res.message);
                message.info("Tenant is already exist in this email");
                setTimeout(() => {
                  setCurrentStep(currentStep + 1);
                }, 2000);
              }
            } else {
              console.log(res, "error");
            }
          });
      }
    }
    if (currentStep === 2) {
      const newErrors = {};
      console.log(tenant.length);
      if (tenant.length === 0) {
        for (const key in form) {
          if (form[key] === "") {
            newErrors[key] = `${key} is required`;
          }
        }
        setErrors(newErrors);
        if (
          Object.keys(newErrors).length === 0 &&
          form.phone_no.length === 10 &&
          zipCode.length === 5
        ) {
          setCurrentStep(currentStep + 1);
        } else {
          if (form.phone_no?.length !== 10) {
            message.error("phone number must be 10 digits");
          }
          if (zipCode?.length !== 5) {
            message.error("ZipCode must be 5 digits");
          }
          if (currentStep === 1) {
            handleChange("email", email);
          }
        }
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
    if (currentStep === 3) {
      setCurrentStep(currentStep + 1);
    }
    if (currentStep === 4) {
      setCurrentStep(currentStep + 1);
    }
    if (currentStep === 5) {
      createProspect();
    }
  };
  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  // Create Prospect
  const formData = new FormData();
  if (tenant?.firstName) {
    formData.append("firstName", tenant?.firstName);
  } else {
    formData.append("firstName", form.first_name);
  }
  if (tenant?.middleName) {
    formData.append("middleName", tenant?.middleName);
  } else {
    formData.append("middleName", mName);
  }
  if (tenant?.lastName) {
    formData.append("lastName", tenant?.lastName);
  } else {
    formData.append("lastName", form.last_name);
  }
  if (tenant?.email) {
    formData.append("email", tenant?.email);
  } else {
    formData.append("email", form.email);
  }
  if (tenant?.phone) {
    formData.append("phone", tenant?.phone);
  } else {
    formData.append("phone", form.phone_no);
  }
  formData.append("phoneType", form.phoneType);
  formData.append("company", form.company);
  if (tenant?.job_title) {
    formData.append("job_title", tenant?.job_title);
  } else {
    formData.append("job_title", form.job_title);
  }
  if (tenant?.address) {
    formData.append("address[address_line_1]", tenant?.address);
  } else {
    formData.append("address[address_line_1]", form.address);
  }
  if (tenant?.address2) {
    formData.append("address[address_line_2]", tenant?.address2);
  } else {
    formData.append("address[address_line_2]", form.address);
  }
  if (tenant?.city) {
    formData.append("address[city]", tenant?.city?.name);
  } else {
    formData.append("address[city]", form.city);
  }
  if (tenant?.state?.name) {
    formData.append("address[state]", tenant?.state?.name);
  } else {
    formData.append("address[state]", form.state);
  }
  if (tenant?.zipcode?.number) {
    formData.append("address[zipcode]", tenant?.zipcode?.number);
  } else {
    formData.append("address[zipcode]", zipCode);
  }
  if (tenant?.additional_info?.notes) {
    formData.append("notes", tenant?.additional_info?.notes);
  } else {
    formData.append("notes", notes);
  }
  pets.forEach((pet, index) => {
    formData.append(`pet_info[${index}][pet_type]`, pet.petType);
    formData.append(`pet_info[${index}][name]`, pet.petName);
    formData.append(`pet_info[${index}][weight]`, pet.petWeight);
    formData.append(`pet_info[${index}][breed]`, pet.petBreed);
  });
  formData.append("property_id", form.property);
  formData.append("unit_id", form.unit);

  vehicles.forEach((vehicle, index) => {
    formData.append(
      `vehicle_info[${index}][vehicle_type]`,
      vehicle.vehicleType
    );
    formData.append(`vehicle_info[${index}][make]`, vehicle.vehicleMake);
    formData.append(`vehicle_info[${index}][model]`, vehicle.vehicleModel);
    formData.append(`vehicle_info[${index}][year]`, vehicle.vehicleYear);
    formData.append(`vehicle_info[${index}][color]`, vehicle.vehicleColor);
    formData.append(`vehicle_info[${index}][license]`, vehicle.vehicleLicense);
  });
  dependents.forEach((dependent, index) => {
    formData.append(
      `dependent_info[${index}][first_name]`,
      dependent.firstName
    );
    formData.append(
      `dependent_info[${index}][middle_name]`,
      dependent.middleName
    );
    formData.append(`dependent_info[${index}][last_name]`, dependent.lastName);
    formData.append(`dependent_info[${index}][email]`, dependent.email);
    formData.append(`dependent_info[${index}][phone]`, dependent.phoneNo);
    formData.append(
      `dependent_info[${index}][relationship]`,
      dependent.relationship
    );
    formData.append(`dependent_info[${index}][dob]`, dependent.dateOfBirth);
  });
  formData.append("profileImage", ProfileImages);
  formData.append("address[country]", "USA");
  if (tenant?.verification_status) {
    formData.append("verification_status", tenant?.verification_status);
  }
  const createProspect = () => {
    UseFormDataHook("prospect", formData, onOpenModal, setLoader);
  };

  // Formated Phone number

  const handleInputChange = (event) => {
    const input = event.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    const formatted = formatPhoneNumber(input);
    setFormattedNumber(formatted); // Update state with formatted number
    const unformatted = input.slice(0, 10);
    setphone(unformatted); // Update state with unformatted number
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
  return (
    <>
      {openModal && (
        <AddProspectModal
          onClose={onCloseModal}
          modalProspectTitle="Prospect Added Successfully"
          modalTitle="Send"
          modalTitle2="Not now"
          prospectModalText="Send credit check request"
        />
      )}
      <div className="container-fluid bg-white p-3">
        <div className="">
          <div className="stepper-container step-container-responsive">
            <div
              className={
                currentStep === 1 ||
                  currentStep === 2 ||
                  currentStep === 3 ||
                  currentStep === 4 ||
                  currentStep === 5
                  ? "step-1 personal-details stepper-active"
                  : "step-1 personal-details stepper-inactive"
              }
            >
              1<div className="form-step-text">Email</div>
            </div>
            <div
              className={
                currentStep === 2 ||
                  currentStep === 3 ||
                  currentStep === 4 ||
                  currentStep === 5
                  ? "step-1 personal-details stepper-active"
                  : "step-1 personal-details stepper-inactive"
              }
            >
              2<div className="form-step-text">Personal Details</div>
            </div>
            <div
              className={
                currentStep === 3 || currentStep === 4 || currentStep === 5
                  ? "step-2 pet-info stepper-active"
                  : "step-2 pet-info stepper-inactive"
              }
            >
              3<div className="form-step-text">Pet Info</div>
            </div>
            <div
              className={
                currentStep === 4 || currentStep === 5
                  ? "step-3 vehicle-info stepper-active"
                  : "step-3 vehicle-info stepper-inactive"
              }
            >
              4<div className="form-step-text">Vehicle Info</div>
            </div>
            <div
              className={
                currentStep === 5
                  ? "step-4 dependent-info stepper-active"
                  : "step-4 dependent-info stepper-inactive"
              }
            >
              5<div className="form-step-text">Dependent Info</div>
            </div>
            <div className="lines-prospects">
              <div
                className={`line ${currentStep === 2 || currentStep === 3 || currentStep === 4
                  ? "active"
                  : ""
                  }`}
              ></div>
              <div
                className={`line ${currentStep === 3 || currentStep === 4 ? "active" : ""
                  }`}
              ></div>
              <div
                className={`line ${currentStep === 4 ? "active" : ""}`}
              ></div>
              {/* Add more lines as needed */}
            </div>
          </div>
          <div className="stepper-content-container mt-4">
            {currentStep === 1 && (
              <>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-12">
                      <span className="property-details-input-title">
                        Email<span className="sign-up-imp-star">*</span>
                      </span>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          // Update form state with email for the next step
                          handleChange("email", e.target.value);
                        }}
                        className="form-control"
                        placeholder="Email"
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                      />
                    </div>
                  </div>

                  <div className="stepper-first-btn d-flex justify-content-between">
                    <button
                      onClick={handleNext}
                      className="modal-save-btn w-100 next-btn mt-3"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </>
            )}
            {currentStep === 2 && (
              <>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="stepper-content d-flex gap-5 align-items-center">
                        <div className="dragger">
                          <ProfileUploader
                            setProfileImages={setProfileImages}
                            ProfileImages={ProfileImages}
                            setDeletedImages={setDeletedImages}
                            DeletedImages={DeletedImages}
                          />
                        </div>
                        <p>Your Photo</p>
                      </div>
                    </div>
                    <div className="col-md-6"></div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-4">
                      <span className="property-details-input-title">
                        First Name<span className="sign-up-imp-star">*</span>
                      </span>
                      {tenant?.firstName ? (
                        <input
                          value={tenant?.firstName}
                          onChange={(e) =>
                            handleChange("first_name", e.target.value)
                          }
                          disabled
                          type="text"
                          className="form-control"
                          placeholder="First Name"
                        />
                      ) : (
                        <input
                          value={form.first_name}
                          onChange={(e) =>
                            handleChange("first_name", e.target.value)
                          }
                          type="text"
                          className="form-control"
                          placeholder="First Name"
                        />
                      )}

                      {errors.first_name && (
                        <span className="text-danger fw-bold">
                          {errors.first_name.split("_").join(" ")}
                        </span>
                      )}
                    </div>
                    <div className="col-md-4">
                      <span className="property-details-input-title">
                        Middle Name
                      </span>
                      {tenant?.middleName ? (
                        <input
                          value={tenant?.middleName}
                          onChange={(e) => setMname(e.target.value)}
                          disabled
                          type="text"
                          className="form-control"
                          placeholder="Middle Name"
                        />
                      ) : (
                        <input
                          value={mName}
                          onChange={(e) => setMname(e.target.value)}
                          type="text"
                          className="form-control"
                          placeholder="Middle Name"
                        />
                      )}
                    </div>
                    <div className="col-md-4">
                      <span className="property-details-input-title">
                        Last Name<span className="sign-up-imp-star">*</span>
                      </span>
                      {tenant?.lastName ? (
                        <input
                          value={tenant?.lastName}
                          onChange={(e) =>
                            handleChange("last_name", e.target.value)
                          }
                          type="text"
                          disabled
                          className="form-control"
                          placeholder="Last Name"
                        />
                      ) : (
                        <input
                          value={form.last_name}
                          onChange={(e) =>
                            handleChange("last_name", e.target.value)
                          }
                          type="text"
                          className="form-control"
                          placeholder="Last Name"
                        />
                      )}
                      {errors.last_name && (
                        <span className="text-danger fw-bold">
                          {errors.last_name.split("_").join(" ")}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-12">
                      <span className="property-details-input-title">
                        Email<span className="sign-up-imp-star">*</span>
                      </span>
                      {tenant?.email ? (
                        <input
                          value={tenant?.email}
                          onChange={(e) =>
                            handleChange("email", e.target.value)
                          }
                          disabled
                          type="email"
                          className="form-control"
                          placeholder="Email"
                        />
                      ) : (
                        <input
                          value={form.email}
                          onChange={(e) =>
                            handleChange("email", e.target.value)
                          }
                          type="email"
                          className="form-control"
                          placeholder="Email"
                        />
                      )}

                      {errors.email && (
                        <span className="text-danger fw-bold">
                          {errors.email}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-md-6 mt-3">
                      <span className="property-details-input-title">
                        Phone No<span className="sign-up-imp-star">*</span>
                      </span>
                      {tenant?.phone ? (
                        <input
                          value={tenant?.phone}
                          disabled
                          onChange={(e) =>
                            handleChange("phone_no", e.target.value)
                          }
                          type="tel"
                          maxLength="10"
                          className="form-control"
                          placeholder="Phone number"
                        />
                      ) : (
                        <input
                          onChange={(e) =>
                            handleChange("phone_no", e.target.value)
                          }
                          value={form.phone_no}
                          type="tel"
                          max={10}
                          className="form-control"
                          placeholder="Phone number"
                        />
                      )}

                      {errors.phone_no && (
                        <span className="text-danger fw-bold">
                          {errors.phone_no.split("_").join(" ")}
                        </span>
                      )}
                    </div>
                    <div className="col-md-6 mt-3">
                      <span className="property-details-input-title">
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
                          onChange={(e) => handleChange("phoneType", e)}
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
                      {errors.phoneType && (
                        <span className="text-danger fw-bold">
                          {errors.phoneType.split("_").join(" ")}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <span className="property-details-input-title">
                        Company<span className="sign-up-imp-star">*</span>
                      </span>
                      {tenant?.company ? (
                        <input
                          value={tenant?.company}
                          onChange={(e) =>
                            handleChange("company", e.target.value)
                          }
                          disabled
                          type="text"
                          className="form-control"
                          placeholder="Company"
                        />
                      ) : (
                        <input
                          value={form.company}
                          onChange={(e) =>
                            handleChange("company", e.target.value)
                          }
                          type="text"
                          className="form-control"
                          placeholder="Company"
                        />
                      )}

                      {errors.company && (
                        <span className="text-danger fw-bold">
                          {errors.company}
                        </span>
                      )}
                    </div>
                    <div className="col-md-6">
                      <span className="property-details-input-title">
                        Job Title<span className="sign-up-imp-star">*</span>
                      </span>
                      {tenant?.job_title ? (
                        <input
                          value={tenant?.job_title}
                          onChange={(e) =>
                            handleChange("job_title", e.target.value)
                          }
                          disabled
                          type="text"
                          className="form-control"
                          placeholder="Job Title"
                        />
                      ) : (
                        <input
                          value={form.job_title}
                          onChange={(e) =>
                            handleChange("job_title", e.target.value)
                          }
                          type="text"
                          className="form-control"
                          placeholder="Job Title"
                        />
                      )}

                      {errors.job_title && (
                        <span className="text-danger fw-bold">
                          {errors.job_title.split("_").join(" ")}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <span className="property-details-input-title">
                        Property<span className="sign-up-imp-star">*</span>
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
                          suffixIcon={dropdownIcon}
                          placeholder="Select Property"
                          style={{
                            width: "100%",
                            height: 45,
                          }}
                          options={PropertyData.map((e) => {
                            return { value: e.id, label: e.title };
                          })}
                          onChange={(e) => handleChange('property', e)}
                        />
                      </ConfigProvider>
                      {
                        errors.property && (
                          <span className="text-danger fw-bold">{
                            errors.property
                          }</span>
                        )
                      }
                    </div>
                    <div className="col-md-6">
                      <span className="tenant-personal-details-title">
                        Units
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
                          suffixIcon={dropdownIcon}
                          placeholder="Select units"
                          style={{
                            width: "100%",
                            height: 45,
                          }}
                          options={UnitData.map((e) => {
                            return { value: e.id, label: e.name };
                          })}
                          onChange={(e) => handleChange("unit", e)}
                        />
                      </ConfigProvider>
                      {
                        errors.unit && (
                          <span className="text-danger fw-bold">{
                            errors.unit
                          }</span>
                        )
                      }
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <span className="property-details-input-title">
                        Address Line 1
                        <span className="sign-up-imp-star">*</span>
                      </span>

                      {tenant?.address ? (
                        <input
                          value={tenant?.address}
                          disabled
                          onChange={(e) =>
                            handleChange("address", e.target.value)
                          }
                          type="text"
                          className="form-control"
                          placeholder="Address Line 1"
                        />
                      ) : (
                        <input
                          value={form.address}
                          onChange={(e) =>
                            handleChange("address", e.target.value)
                          }
                          type="text"
                          className="form-control"
                          placeholder="Address Line 1"
                        />
                      )}

                      {errors.address && (
                        <span className="text-danger fw-bold">
                          {errors.address}
                        </span>
                      )}
                    </div>
                    <div className="col-md-6">
                      <span className="property-details-input-title">
                        Address Line 2
                      </span>
                      <input
                        value={address2}
                        onChange={(e) => setAddress2(e.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="Address Line 2"
                      />
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-3">
                      <span className="property-details-input-title">
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
                      </ConfigProvider>
                    </div>
                    <div className="col-md-3">
                      <span className="property-details-input-title">
                        City<span className="sign-up-imp-star">*</span>
                      </span>
                      {tenant?.city ? (
                        <input
                          type="text"
                          className="form-control"
                          value={tenant?.city?.name}
                          onChange={(e) => handleChange("city", e.target.value)}
                          disabled
                          placeholder="City"
                        />
                      ) : (
                        <input
                          type="text"
                          className="form-control"
                          value={form.city}
                          onChange={(e) => handleChange("city", e.target.value)}
                          placeholder="City"
                        />
                      )}

                      {errors.city && (
                        <span className="text-danger fw-bold">
                          {errors.city}
                        </span>
                      )}
                    </div>
                    <div className="col-md-3">
                      <span className="property-details-input-title">
                        State<span className="sign-up-imp-star">*</span>
                      </span>
                      {tenant?.state ? (
                        <input
                          className="form-control"
                          disabled
                          onChange={(e) =>
                            handleChange("state", e.target.value)
                          }
                          value={tenant?.state?.name}
                        />
                      ) : (
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
                            value={form.state}
                            placeholder="Select State"
                            style={{
                              width: "100%",
                              height: 45,
                            }}
                            onChange={(e) => handleChange("state", e)}
                            options={usaStates.map((e) => {
                              return { value: e.name, label: e.name };
                            })}
                          />
                        </ConfigProvider>
                      )}

                      {errors.state && (
                        <span className="text-danger fw-bold">
                          {errors.state}
                        </span>
                      )}
                    </div>
                    <div className="col-md-3">
                      <span className="property-details-input-title">
                        Zip code<span className="sign-up-imp-star">*</span>
                      </span>
                      {tenant?.zipcode ? (
                        <input
                          disabled
                          value={tenant?.zipcode?.number}
                          className="form-control"
                          placeholder="Zip code"
                        />
                      ) : (
                        <input
                          maxLength={5}
                          onChange={handleZipCodeChange}
                          value={zipCode}
                          type="number"
                          className="form-control"
                          placeholder="Zip code"
                        />
                      )}
                    </div>
                  </div>
                  <div className="row my-3">
                    <div className="col-md-12">
                      <span className="property-details-input-title">
                        Notes
                      </span>
                      {tenant?.notes ? (
                        <textarea
                          value={tenant?.additional_info?.notes}
                          onChange={(e) => setNotes(e.target.value)}
                          disabled
                          name=""
                          id=""
                          cols="30"
                          rows="10"
                          className="form-control"
                          placeholder="Add your notes"
                        ></textarea>
                      ) : (
                        <textarea
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          name=""
                          id=""
                          cols="30"
                          rows="10"
                          className="form-control"
                          placeholder="Add your notes"
                        ></textarea>
                      )}
                    </div>
                  </div>
                  <div className=" d-flex justify-content-between gap-1 pb-3 mt-5">
                    <button onClick={handlePrev} className="back-prev-btn mt-3">
                      Back
                    </button>
                    <button
                      onClick={handleNext}
                      className="next-btn-same-class mt-3"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </>
            )}
            {currentStep === 3 && (
              <>
                <>
                  <div className="container-fluid">
                    {pets.map((pet, index) => (
                      <>
                        <div key={index} className="row top-padd-add">
                          <div className="col-md-6">
                            <span className="property-details-input-title">
                              Pet Type
                            </span>
                            <ConfigProvider
                              theme={{
                                components: {
                                  Select: {
                                    zIndexPopupBase: 99999,
                                    colorPrimaryHover: "#EF6B3E",
                                    optionSelectedBg:
                                      "rgba(239, 107, 62, 0.16)",
                                    borderRadius: 4,
                                    colorTextPlaceholder: "#667085",
                                    fontFamily: "montserrat",
                                  },
                                },
                              }}
                            >
                              <Select
                                suffixIcon={dropdownIcon}
                                placeholder="Select Pet Type"
                                style={{
                                  width: "100%",
                                  height: 45,
                                }}
                                onChange={(e) => handlePetTypeChange(index, e)}
                                options={[
                                  {
                                    value: "Dogs",
                                    label: "Dogs",
                                  },
                                  {
                                    value: "Cats",
                                    label: "Cats",
                                  },
                                  {
                                    value: "Fish",
                                    label: "Fish",
                                  },
                                  {
                                    value: "Birds",
                                    label: "Birds",
                                  },
                                  {
                                    value: "Small Mammals",
                                    label: "Small Mammals",
                                  },
                                  {
                                    value: "Reptiles",
                                    label: "Reptiles",
                                  },
                                  {
                                    value: "Exotic Pets",
                                    label: "Exotic Pets",
                                  },
                                ]}
                              />
                            </ConfigProvider>
                          </div>
                          <div className="col-md-6">
                            <span className="property-details-input-title">
                              Name
                            </span>
                            <input
                              type="text"
                              value={pet.petName}
                              onChange={(e) =>
                                handlePetNameChange(index, e.target.value)
                              }
                              className="form-control"
                              placeholder="Name"
                            />
                          </div>
                        </div>
                        <div className="row mt-3">
                          <div className="col-md-6">
                            <span className="property-details-input-title">
                              Weight
                            </span>
                            <input
                              type="number"
                              value={pet.petWeight}
                              onChange={(e) =>
                                handlePetWeightChange(index, e.target.value)
                              }
                              className="form-control"
                              placeholder="Weight"
                            />
                          </div>
                          <div className="col-md-6">
                            <span className="property-details-input-title">
                              Breed
                            </span>
                            <input
                              type="text"
                              value={pet.petBreed}
                              onChange={(e) =>
                                handlePetBreedChange(index, e.target.value)
                              }
                              className="form-control"
                              placeholder="Breed"
                            />
                          </div>
                          {index !== 0 ? (
                            <div className="row mt-3">
                              <div className="col-md-12">
                                <button
                                  onClick={() => removePet(index)}
                                  className="primary-orange-text add-new-btn"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </>
                    ))}

                    <div className="row mt-3">
                      <div className="col-md-12">
                        <button
                          onClick={addAnotherPet}
                          className="primary-orange-text add-new-btn"
                        >
                          + Add Another Pet
                        </button>
                      </div>
                    </div>

                    <div className=" d-flex justify-content-between gap-1 pb-3 mt-5">
                      <button
                        onClick={handlePrev}
                        className="back-prev-btn mt-3"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleNext}
                        className="next-btn-same-class mt-3"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </>
                {/* <div className="container-fluid">
                    <div className="row">
                      <div className="col-md-6">
                        <span className="property-details-input-title">Pet Type</span>
                      
                      </div>
                      <div className="col-md-6">
                        <span className="property-details-input-title">Name</span>
                        <input onChange={(e) => setPetName(e.target.value)} type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-6">
                        <span className="property-details-input-title">Weight</span>
                        <input onChange={(e) => setPetWeight(e.target.value)} type="number" className="form-control" />
                      </div>
                      <div className="col-md-6">
                        <span className="property-details-input-title">Breed</span>
                        <input onChange={(e) => setPetBreed(e.target.value)} type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-12">
                        <Link className='primary-orange-text'>+ Add Another Pet</Link>
                      </div>
                    </div>
                    <div className="stepper-btn d-flex justify-content-between gap-1 pb-3 mt-5">

                      <button onClick={handlePrev} className="back-prev-btn ">Back</button>
                      <button onClick={handleNext} className="next-btn-same-class">Next</button>

                    </div>
                  </div> */}
              </>
            )}
            {currentStep === 4 && (
              <>
                <div className="container-fluid">
                  {vehicles.map((vehicle, index) => (
                    <div key={index} className="vehicle-container">
                      <div className="row top-padd-add">
                        <div className="col-md-12">
                          <span className="property-details-input-title">
                            Vehicle Type
                          </span>
                          {/*<input
                            type="text"
                            value={vehicle.vehicleType}
                            onChange={(e) =>
                              handleVehicleTypeChange(index, e.target.value)
                            }
                            className="form-control"
                            placeholder="Vehicle Type"
                          />*/}
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
                              suffixIcon={dropdownIcon}
                              placeholder="Select Vehicle Type"
                              style={{
                                width: "100%",
                                height: 45,
                              }}
                              onChange={(e) =>
                                handleVehicleTypeChange(index, e)
                              }
                              options={[
                                {
                                  value: "Car/Sedan",
                                  label: "Car/Sedan",
                                },
                                {
                                  value: "SUV (Sport Utility Vehicle)",
                                  label: "SUV (Sport Utility Vehicle)",
                                },
                                {
                                  value: "Truck",
                                  label: "Truck",
                                },
                                {
                                  value: "Van/Minivan",
                                  label: "Van/Minivan",
                                },
                                {
                                  value: "Motorcycle/Scooter",
                                  label: "Motorcycle/Scooter",
                                },
                                {
                                  value: "Bus",
                                  label: "Bus",
                                },
                                {
                                  value: "RV (Recreational Vehicle)",
                                  label: "RV (Recreational Vehicle)",
                                },
                                {
                                  value: "Commercial Vehicle",
                                  label: "Commercial Vehicle",
                                },
                                {
                                  value: "Electric Vehicle (EV) or Hybrid",
                                  label: "Electric Vehicle (EV) or Hybrid",
                                },
                              ]}
                            />
                          </ConfigProvider>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-md-6">
                          <span className="property-details-input-title">
                            Make
                          </span>
                          <input
                            type="text"
                            value={vehicle.vehicleMake}
                            onChange={(e) =>
                              handleVehicleMakeChange(index, e.target.value)
                            }
                            className="form-control"
                            placeholder="Make"
                          />
                        </div>
                        <div className="col-md-6">
                          <span className="property-details-input-title">
                            Model
                          </span>
                          <input
                            type="text"
                            value={vehicle.vehicleModel}
                            onChange={(e) =>
                              handleVehicleModelChange(index, e.target.value)
                            }
                            className="form-control"
                            placeholder="Model"
                          />
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-md-4">
                          <span className="property-details-input-title">
                            Year
                          </span>
                          <input
                            type="number"
                            value={vehicle.vehicleYear}
                            onChange={(e) =>
                              handleVehicleYearChange(index, e.target.value)
                            }
                            className="form-control"
                            placeholder="Year"
                          />
                        </div>
                        <div className="col-md-4">
                          <span className="property-details-input-title">
                            Color
                          </span>
                          <input
                            type="text"
                            value={vehicle.vehicleColor}
                            onChange={(e) =>
                              handleVehicleColorChange(index, e.target.value)
                            }
                            className="form-control"
                            placeholder="Color"
                          />
                        </div>
                        <div className="col-md-4">
                          <span className="property-details-input-title">
                            License Plate
                          </span>
                          <input
                            type="text"
                            value={vehicle.vehicleLicense}
                            onChange={(e) =>
                              handleVehicleLicenseChange(index, e.target.value)
                            }
                            className="form-control"
                            placeholder="License Plate"
                          />
                        </div>
                        {index !== 0 && (
                          <div className="row mt-3">
                            <div className="col-md-12">
                              <button
                                onClick={() => removeVehicle(index)}
                                className="primary-orange-text add-new-btn"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  <div className="row mt-3">
                    <div className="col-md-12">
                      <button
                        onClick={addAnotherVehicle}
                        className="primary-orange-text add-new-btn"
                      >
                        + Add Another Vehicle
                      </button>
                    </div>
                  </div>

                  <div className=" d-flex justify-content-between gap-1 pb-3 mt-5">
                    <button onClick={handlePrev} className="back-prev-btn mt-3">
                      Back
                    </button>
                    <button
                      onClick={handleNext}
                      className="next-btn-same-class mt-3"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </>
            )}
            {currentStep === 5 && (
              <>
                <div className="container-fluid">
                  {dependents.map((dependent, index) => (
                    <div key={index} className="dependent-container">
                      <div className="row mt-3">
                        <div className="col-md-4">
                          <span className="property-details-input-title">
                            First Name
                          </span>
                          <input
                            type="text"
                            value={dependent.firstName}
                            onChange={(e) =>
                              handleFirstNameChange(index, e.target.value)
                            }
                            className="form-control"
                            placeholder="First Name"
                          />
                        </div>
                        <div className="col-md-4">
                          <span className="property-details-input-title">
                            Middle Name
                          </span>
                          <input
                            type="text"
                            value={dependent.middleName}
                            onChange={(e) =>
                              handleMiddleNameChange(index, e.target.value)
                            }
                            className="form-control"
                            placeholder="Middle Name"
                          />
                        </div>
                        <div className="col-md-4">
                          <span className="property-details-input-title">
                            Last Name
                          </span>
                          <input
                            type="text"
                            value={dependent.lastName}
                            onChange={(e) =>
                              handleLastNameChange(index, e.target.value)
                            }
                            className="form-control"
                            placeholder="Last Name"
                          />
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-md-6">
                          <span className="tenant-personal-details-title">
                            Email
                          </span>
                          <input
                            type="email"
                            value={dependent.email}
                            onChange={(e) =>
                              handleEmailChange(index, e.target.value)
                            }
                            className="form-control"
                            placeholder="Email"
                          />
                        </div>
                        <div className="col-md-6">
                          <span className="tenant-personal-details-title">
                            Phone No
                          </span>
                          <input
                            maxLength="10"
                            type="tel"
                            value={dependent.formattedPhoneNo}
                            onChange={(e) =>
                              handlePhoneNoChange(index, e.target.value)
                            }
                            className="form-control"
                            placeholder="Phone number"
                          />
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-md-6">
                          <span className="property-details-input-title">
                            Date of Birth
                          </span>
                          <br />
                        </div>
                        <ConfigProvider
                          theme={{
                            components: {
                              DatePicker: {
                                zIndexPopupBase: 99999,
                                colorPrimaryHover: "#EF6B3E",
                                borderRadius: 4,
                                fontFamily: "montserrat",
                              },
                            },
                          }}
                        >
                          <Space
                            style={{
                              width: "100%",
                            }}
                            direction="vertical"
                          >
                            <DatePicker
                              onChange={(e) => {
                                const formattedDate = new Date(
                                  e
                                ).toLocaleDateString();
                                handleDateOfBirthChange(index, formattedDate);
                              }}
                              suffixIcon={calendar}
                              style={{
                                width: "100%",
                                height: 45,
                              }}
                              format={dateFormat}
                              disabledDate={disabledDate}
                            />
                          </Space>
                        </ConfigProvider>
                        <div className="col-md-12 mt-3">
                          <span className="property-details-input-title">
                            Relationship to Tenant
                          </span>
                          {/*<input
                            type="text"
                            value={dependent.relationship}
                            onChange={(e) =>
                              handleRelationshipChange(index, e.target.value)
                            }
                            className="form-control "
                            placeholder="Relationship"
                          />*/}
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
                              suffixIcon={dropdownIcon}
                              placeholder="Select Relationship to Tenant"
                              style={{
                                width: "100%",
                                height: 45,
                              }}
                              onChange={(e) =>
                                handleRelationshipChange(index, e)
                              }
                              options={[
                                {
                                  value: "Children",
                                  label: "Children",
                                },
                                {
                                  value: "Spouse",
                                  label: "Spouse",
                                },
                                {
                                  value: "Elderly Dependents",
                                  label: "Elderly Dependents",
                                },
                                {
                                  value: "Siblings",
                                  label: "Siblings",
                                },
                              ]}
                            />
                          </ConfigProvider>
                        </div>
                      </div>
                      {index !== 0 && (
                        <div className="row mt-3">
                          <div className="col-md-12">
                            <button
                              onClick={() => removeDependent(index)}
                              className="primary-orange-text add-new-btn"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  <div className="row mt-3">
                    <div className="col-md-12">
                      <button
                        onClick={addAnotherDependent}
                        className="primary-orange-text add-new-btn"
                      >
                        + Add Another Dependent
                      </button>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between gap-1 pb-3 mt-5">
                    <button onClick={handlePrev} className="back-prev-btn mt-3">
                      Back
                    </button>
                    <button
                      onClick={handleNext}
                      className="next-btn-same-class mt-3"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProspectDetails;
