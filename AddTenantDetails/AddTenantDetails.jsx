import { useEffect, useState } from "react";
import {
  DatePicker,
  Select,
  Switch,
  ConfigProvider,
  Space,
  Tooltip,
  message,
} from "antd";
import { useNavigate } from "react-router-dom";
import ConvertTenantModal from "Modals/ConvertTenantModal/ConvertTenantModal";
import chevronIcon from "assets/chevron-down.png";
import calendarIcon from "assets/calendar.png";
import helpIcon from "assets/help-circle.png";
import UseGetHook from "Hooks/UseGetHook";
import Loader from "Helpers/Loader";
import FileUploader from "Components/FileUploader/FileUploader";
import ProfileUploader from "../ProfileUploader/ProfileUploader";
import TempModal from "Modals/TempModal/TempModal";
import UseFormDataHook from "Hooks/UseFormDataHook";

import moment from "moment";





const AddTenantDetails = () => {
  const dateFormat = "MM/DD/YYYY";
  // States start
  const [currentStep, setCurrentStep] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [mName, setMname] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [zipCode, setzipCode] = useState("");
  const [property, setproperty] = useState("");
  const [unit, setunit] = useState("");
  const [rollover, setrollover] = useState(false);
  const [DeletedImages, setDeletedImages] = useState([]);
  const [address2, setAddress2] = useState("");
  const [phone, setphone] = useState("");
  const [dependentnumber, setDependentNumber] = useState("");
  const [DependentFName, setDependentFName] = useState("");
  const [DependentMName, setDependentMName] = useState("");
  const [DependentLName, setDependentLName] = useState("");
  const [DependentEmail, setDependentEmail] = useState("");
  const [DependentRelation, setDependentRelation] = useState("");
  const [DependentDescription, setDependentDescription] = useState("");
  const [dependentDob, setdependentDob] = useState("");
  const [notes, setNotes] = useState("");
  const [loader, setloader] = useState(false);
  const [Images, setImages] = useState([]);
  const [ProfileImages, setProfileImages] = useState([]);
  const [formattedNumber, setFormattedNumber] = useState("");
  const [DepformattedNumber, setDepFormattedNumber] = useState("");
  const [dobs, setDob] = useState(null);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_no: "",
    dob: "",
    depositAmount: "",
    address1: "",
    rentAmount: "",
    leaseTerm: "",
    leaseStartDate: "",
    LeaseEndDate: "",
    zipCode: "",
    property: "",
    unit: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (fieldName, value) => {
    setForm({
      ...form,
      [fieldName]: value,
    });

  };
  // States end

  const handleZipCodeChange = (e) => {
    // Update the state
    if (/^\d{0,5}$/.test(e.target.value))
      handleChange("zipCode", e.target.value);
  };

  const navigate = useNavigate();


  // Fetch Data
  const { PropertyData, fetchProperty } = UseGetHook("property");
  const { fetchUnit, UnitData } = UseGetHook("unit", form.property);
  useEffect(() => {
    fetchProperty();
    if (form.property !== "") {
      fetchUnit();
    }
  }, [form.property]);
  // Fetch Data End
  // Emergency Contact Info
  const [emergencyContacts, setEmergencyContacts] = useState([
    {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      phoneNo: "",
      formattedNo: "",
      relationship: "",
      description: "",
    },
  ]);
  const handleFirstNameChange = (index, value) => {
    const newEmergencyContacts = [...emergencyContacts];
    newEmergencyContacts[index].firstName = value;
    setEmergencyContacts(newEmergencyContacts);
  };

  const handleMiddleNameChange = (index, value) => {
    const newEmergencyContacts = [...emergencyContacts];
    newEmergencyContacts[index].middleName = value;
    setEmergencyContacts(newEmergencyContacts);
  };
  const handleLastNameChange = (index, value) => {
    const newEmergencyContacts = [...emergencyContacts];
    newEmergencyContacts[index].lastName = value;
    setEmergencyContacts(newEmergencyContacts);
  };
  const handleEmailChange = (index, value) => {
    const newEmergencyContacts = [...emergencyContacts];
    newEmergencyContacts[index].email = value;
    setEmergencyContacts(newEmergencyContacts);
  };
  const handleRelationChange = (index, value) => {
    const newEmergencyContacts = [...emergencyContacts];
    newEmergencyContacts[index].relationship = value;
    setEmergencyContacts(newEmergencyContacts);
  };
  const handleDescriptionChange = (index, value) => {
    const newEmergencyContacts = [...emergencyContacts];
    newEmergencyContacts[index].description = value;
    setEmergencyContacts(newEmergencyContacts);
  };

 // Function to calculate age based on Date of Birth
 const calculateAge = (dateOfBirth) => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};


 // Function to handle Date picker change
 const handleDateChange = (date) => {
  setDob(date);
  const age = calculateAge(date);
  if (age < 18) {
    alert("You must be at least 18 years old.");
  } else if (age === 18) {
    alert("You are exactly 18 years old.");
  } else {
    alert("You are eligible.");
  }
};

  const disabledDate = (current) => {
    // Disable dates after today
    return current && current > moment().endOf("day");
  };


  const handleInputEmergencyPhoneChange = (index, value) => {
    const newEmergencyContacts = [...emergencyContacts];
    const format = value.replace(/\D/g, "").slice(0, 10);
    const formatted = formatPhoneNumber(format);

    newEmergencyContacts[index].phoneNo = format;
    newEmergencyContacts[index].formattedNo = formatted;
    setEmergencyContacts(newEmergencyContacts);
  };
  const handleAddContact = () => {
    setEmergencyContacts([
      ...emergencyContacts,
      {
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        phoneNo: "",
        relationship: "",
        description: "",
      },
    ]);
  };

  const handleRemoveContact = (indexToRemove) => {
    if (indexToRemove !== 0) {
      const updatedEmergencyContacts = emergencyContacts.filter(
        (contact, index) => index !== indexToRemove
      );
      setEmergencyContacts(updatedEmergencyContacts);
    }
  };
  // Emergency Contact Info End
  // Pet Form
  const [pets, setPets] = useState([
    {
      petType: "",
      petName: "",
      petWeight: "",
      petBreed: "",
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

  // Add Tenant
  var formdata = new FormData();
  formdata.append("firstName", form.first_name);
  formdata.append("lastName", form.last_name);
  formdata.append("email", form.email);
  formdata.append("phone", form.phone_no);
  if (mName) formdata.append("middleName", mName);
  formdata.append("additionalInfo[dob]", form.dob);
  if (ProfileImages.length !== 0) {
    formdata.append("profileImage", ProfileImages);
  }
  formdata.append("address", form.address1);
  formdata.append("zipcode", form.zipCode);
  formdata.append("state", state);
  formdata.append("country", "USA");
  if (notes) formdata.append("additionalInfo[notes]", notes);
  formdata.append("additionalInfo[lease][property]", form.property);
  formdata.append("additionalInfo[lease][unit]", form.unit);
  formdata.append("additionalInfo[lease][rent_amount]", form.rentAmount);
  formdata.append("additionalInfo[lease][deposit_amount]", form.depositAmount);
  formdata.append("additionalInfo[lease][lease_term]", form.leaseTerm);
  formdata.append(
    "additionalInfo[lease][lease_term_start_date]",
    form.leaseStartDate
  );
  formdata.append(
    "additionalInfo[lease][lease_term_end_date]",
    form.LeaseEndDate
  );
  formdata.append("additionalInfo[lease][rollover_end_of_term]", rollover);
  Images.forEach((e) => {
    formdata.append("additionalInfo[lease][upload_lease]", e);
  });
  if (pets) {
    const allFieldsFilled = pets.every(
      (items) =>
        items.description &&
        items.product_details &&
        items.category &&
        items.amount
    );
    if (allFieldsFilled) {
      pets.forEach((pet, index) => {
        formdata.append(
          `additionalInfo[pet_info][${index}][pet_type]`,
          pet.petType
        );
        formdata.append(
          `additionalInfo[pet_info][${index}][name]`,
          pet.petName
        );
        formdata.append(
          `additionalInfo[pet_info][${index}][weight]`,
          pet.petWeight
        );
        formdata.append(
          `additionalInfo[pet_info][${index}][breed]`,
          pet.petBreed
        );
      });
    }
  }
  if (vehicles) {
    const allFieldsFilled = pets.every(
      (items) =>
        items.description &&
        items.product_details &&
        items.category &&
        items.amount
    );
    if (allFieldsFilled) {
      vehicles.forEach((vehicle, index) => {
        formdata.append(
          `additionalInfo[vehicle_info][${index}][vehicle_type]`,
          vehicle.vehicleType
        );
        formdata.append(
          `additionalInfo[vehicle_info][${index}][make]`,
          vehicle.vehicleMake
        );
        formdata.append(
          `additionalInfo[vehicle_info][${index}][model]`,
          vehicle.vehicleModel
        );
        formdata.append(
          `additionalInfo[vehicle_info][${index}][year]`,
          vehicle.vehicleYear
        );
        formdata.append(
          `additionalInfo[vehicle_info][${index}][color]`,
          vehicle.vehicleColor
        );
        formdata.append(
          `additionalInfo[vehicle_info][${index}][license]`,
          vehicle.vehicleLicense
        );
      });
    }
  }
  if (emergencyContacts) {
    const allFieldsFilled = pets.every(
      (items) =>
        items.description &&
        items.product_details &&
        items.category &&
        items.amount
    );
    if (allFieldsFilled) {
      emergencyContacts.forEach((emergency, index) => {
        formdata.append(
          "additionalInfo[emergency_info][first_name]",
          emergency.firstName
        );
        formdata.append(
          "additionalInfo[emergency_info][middle_name]",
          emergency.middleName
        );
        formdata.append(
          "additionalInfo[emergency_info][last_name]",
          emergency.lastName
        );
        formdata.append(
          "additionalInfo[emergency_info][email]",
          emergency.email
        );
        formdata.append(
          "additionalInfo[emergency_info][phone]",
          emergency.phoneNo
        );
        formdata.append(
          "additionalInfo[emergency_info][relationship]",
          emergency.relationship
        );
        formdata.append(
          "additionalInfo[emergency_info][description]",
          emergency.description
        );
      });
    }
  }

  if (DependentFName) {
    formdata.append(
      "additionalInfo[dependent_info][first_name]",
      DependentFName
    );
  }
  if (DependentMName) {
    formdata.append(
      "additionalInfo[dependent_info][middle_name]",
      DependentMName
    );
  }
  if (DependentLName) {
    formdata.append(
      "additionalInfo[dependent_info][last_name]",
      DependentLName
    );
  }
  if (DependentEmail) {
    formdata.append("additionalInfo[dependent_info][email]", DependentEmail);
  }
  if (dependentnumber) {
    formdata.append("additionalInfo[dependent_info][phone]", dependentnumber);
  }
  if (dependentDob) {
    formdata.append("additionalInfo[dependent_info][dob]", dependentDob);
  }
  if (DependentRelation) {
    formdata.append(
      "additionalInfo[dependent_info][relationship]",
      DependentRelation
    );
  }
  if (DependentDescription) {
    formdata.append(
      "additionalInfo[dependent_info][description]",
      DependentDescription
    );
  }
  const AddTenant = () => {
    UseFormDataHook(
      "tenant",
      formdata,
      onOpenModal,
      setloader,
      "landLord",
      "all-tenants"
    );
    setloader(true);
  };
  // Add Tenant End

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
  // Stepper Function
  const handleNext = () => {
    if (currentStep === 1) {
      console.log(form)
      const newErrors = {};
      for (const key in form) {
        if (form[key] === "") {
          newErrors[key] = `${key} is required`;
        }
      }
      setErrors(newErrors);
      if (
        Object.keys(newErrors).length === 0 &&
        form.phone_no.length === 10 &&
        form.zipCode.length === 5 && rollover
      ) {
        setCurrentStep(currentStep + 1);
      } else {
        if (form.phone_no.length !== 10) {
          message.error("phone number must be 10 digits");
        }
        if (form.zipCode.length !== 5) {
          message.error("ZIpCode must be 5 digits");
        }
        if (!rollover) {
          newErrors['rollover'] = `Rollover is required`;
        }
      }
    }

    if (
      currentStep === 2 ||
      currentStep === 3 ||
      currentStep === 4 ||
      currentStep === 5
    ) {
      setCurrentStep(currentStep + 1);
    }
    if (currentStep === 6) {
      AddTenant();
      // createTenant();
    }
  };

  const createTenant = () => {
    UseFormDataHook("tenant", formdata, onOpenModal);
  };
  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };
  const onChangeSwitch = (check) => {
    setrollover(check);
  };
  // Modal Function
  const onOpenModal = () => {
    setOpenModal(true);
  };
  const onCloseModal = () => {
    setOpenModal(false);
  };
  // Step 1 Back Button
  const handleBackButton = () => {
    if (currentStep === 1) {
      navigate("/all-tenants");
    } else {
      handlePrev();
    }
  };
  // Formated Phone number

  const handleInputChange = (event) => {
    const input = event.target.value.replace(/\D/g, "");
    const formatted = formatPhoneNumber(input);
    setFormattedNumber(formatted);
    const unformatted = input.slice(0, 10);
    setphone(unformatted);
  };
  const handleInputChangeDependent = (event) => {
    const input = event.target.value.replace(/\D/g, "");
    const formatted = formatPhoneNumber(input);
    setDepFormattedNumber(formatted);
    const unformatted = input.slice(0, 10);
    setDependentNumber(unformatted);
  };
  const preventMinus = (e) => {
    if (e.code === "Minus") {
      e.preventDefault();
    }
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
      {/* {openModal && (
        <ConvertTenantModal
          onClose={onCloseModal}
          modalTitle="Send Invite"
          leasePara="Invite your Tenant to the Tenant Portal"
          inviteLink="https://digitalcrm.teqdeft.in/contacs/"
        />
      )} */}
      {openModal === true && (
        <TempModal
          onClose={onCloseModal}
          title="Tenant added successfully"
          success="Go To Tenants"
          route="all-tenants"
        />
      )}
      <div className="container-fluid bg-white p-3">
        <div className="container">
          <div className="stepper-container step-container-responsive tenant-stepper">
            <div
              className={
                currentStep === 1 ||
                  currentStep === 2 ||
                  currentStep === 3 ||
                  currentStep === 4 ||
                  currentStep === 5 ||
                  currentStep === 6
                  ? "step-1 personal-details stepper-active"
                  : "step-1 personal-details stepper-inactive"
              }
            >
              1<div className="form-step-text">Personal Details</div>
            </div>
            <div
              className={
                currentStep === 2 ||
                  currentStep === 3 ||
                  currentStep === 4 ||
                  currentStep === 5 ||
                  currentStep === 6
                  ? "step-2 emergency-info stepper-active"
                  : "step-2 emergency-info stepper-inactive"
              }
            >
              2<div className="form-step-text">Emergency Info</div>
            </div>
            <div
              className={
                currentStep === 3 ||
                  currentStep === 4 ||
                  currentStep === 5 ||
                  currentStep === 6
                  ? "step-3 pet-info stepper-active"
                  : "step-3 pet-info stepper-inactive"
              }
            >
              3<div className="form-step-text">Pet Info</div>
            </div>
            <div
              className={
                currentStep === 4 || currentStep === 5 || currentStep === 6
                  ? "step-4 vehicle-info stepper-active"
                  : "step-4 vehicle-info stepper-inactive"
              }
            >
              4<div className="form-step-text">Vehicle Info</div>
            </div>
            <div
              className={
                currentStep === 5 || currentStep === 6
                  ? "step-5 dependent-info stepper-active"
                  : "step-5 dependent-info stepper-inactive"
              }
            >
              5<div className="form-step-text">Dependent Info</div>
            </div>
            <div
              className={
                currentStep === 6
                  ? "step-6 notes stepper-active"
                  : "step-6 notes stepper-inactive"
              }
            >
              6<div className="form-step-text">Notes</div>
            </div>
            <div className="lines-tenant vender-tab-line">
              <div
                className={`line ${currentStep === 2 ||
                  currentStep === 3 ||
                  currentStep === 4 ||
                  currentStep === 5 ||
                  currentStep === 6
                  ? "active"
                  : ""
                  }`}
              ></div>
              <div
                className={`line ${currentStep === 3 ||
                  currentStep === 4 ||
                  currentStep === 5 ||
                  currentStep === 6
                  ? "active"
                  : ""
                  }`}
              ></div>
              <div
                className={`line ${currentStep === 4 || currentStep === 5 || currentStep === 6
                  ? "active"
                  : ""
                  }`}
              ></div>
              <div
                className={`line ${currentStep === 5 || currentStep === 6 ? "active" : ""
                  }`}
              ></div>
              <div
                className={`line ${currentStep === 6 ? "active" : ""}`}
              ></div>
            </div>
          </div>
          <div className="stepper-content-container mt-4">
            {currentStep === 1 && (
              <>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="stepper-content d-flex gap-2 align-items-center">
                        <div className="dragger">
                          <p>Your Photo</p>

                          <ProfileUploader
                            setProfileImages={setProfileImages}
                            ProfileImages={ProfileImages}
                            setDeletedImages={setDeletedImages}
                            DeletedImages={DeletedImages}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6"></div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-4">
                      <span className="tenant-personal-details-title">
                        First Name
                        <span className="input-field-imp-star">*</span>
                      </span>
                      <input
                        value={form.first_name}
                        onChange={(e) =>
                          handleChange("first_name", e.target.value)
                        }
                        type="text"
                        className="form-control"
                        placeholder="First Name"
                      />
                      {errors.first_name && (
                        <span className="text-danger fw-bold">
                          {errors.first_name.split("_").join(" ")}
                        </span>
                      )}
                    </div>
                    <div className="col-md-4">
                      <span className="tenant-personal-details-title">
                        Middle Name
                      </span>
                      <input
                        value={mName}
                        onChange={(e) => setMname(e.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="Middle Name"
                      />
                    </div>
                    <div className="col-md-4">
                      <span className="tenant-personal-details-title">
                        Last Name<span className="input-field-imp-star">*</span>
                      </span>
                      <input
                        value={form.last_name}
                        onChange={(e) =>
                          handleChange("last_name", e.target.value)
                        }
                        type="text"
                        className="form-control"
                        placeholder="Last Name"
                      />
                      {errors.first_name && (
                        <span className="text-danger fw-bold">
                          {errors.last_name.split("_").join(" ")}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-4">
                      <span className="tenant-personal-details-title">
                        Email<span className="input-field-imp-star">*</span>
                      </span>
                      <input
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        type="email"
                        className="form-control"
                        placeholder="Email"
                      />
                      {errors.email && (
                        <span className="text-danger fw-bold">
                          {errors.email.split("_").join(" ")}
                        </span>
                      )}
                    </div>
                    <div className="col-md-4">
                      <span className="tenant-personal-details-title">
                        Phone No<span className="input-field-imp-star">*</span>
                      </span>
                      <input
                        value={form.formattedNumber}
                        onChange={(e) => {
                          handleChange("phone_no", e.target.value);
                        }}
                        type="tel"
                        className="form-control"
                        placeholder="Phone number"
                        max={10}
                      />
                      {errors.phone_no && (
                        <span className="text-danger fw-bold">
                          {errors.phone_no.split("_").join(" ")}
                        </span>
                      )}
                    </div>
                    <div className="col-md-4">
                      <span className="tenant-personal-details-title">
                        Date of Birth
                        <span className="input-field-imp-star">*</span>
                      </span>
                      <br />
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
                            suffixIcon={calendar}
                            placeholder="Select Date"
                            style={{
                              width: "100%",
                              height: 45,
                            }}
                            onChange={(e) => {
                              const formattedDate = new Date(
                                e
                              ).toLocaleDateString();
                              handleChange("dob", formattedDate);
                              handleDateChange()
                            }}
                            
                            className="lease-date-picker"
                            format={dateFormat}
                            
                          // disabledDate={disabledDate}
                          />
                        </Space>
                      </ConfigProvider>
                      {errors.dob && (
                        <span className="text-danger fw-bold">
                          {errors.dob.split("_").join(" ")}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-6">
                      <span className="property-details-input-title">
                        Address Line 1
                        <span className="sign-up-imp-star">*</span>
                      </span>
                      <input
                        value={form.address1}
                        onChange={(e) =>
                          handleChange("address1", e.target.value)
                        }
                        type="text"
                        className="form-control"
                        placeholder="Address Line 1"
                      />
                      {errors.address1 && (
                        <span className="text-danger fw-bold">
                          {errors.address1.split("_").join(" ")}
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
                      <span className="tenant-personal-details-title">
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
                              value: "United States",
                              label: "United States",
                            },
                            {
                              value: "Canada",
                              label: "Canada",
                            },
                          ]}
                        />
                      </ConfigProvider>
                    </div>
                    <div className="col-md-3">
                      <span className="property-details-input-title">City</span>
                      <input
                        value={city}
                        onChange={(e) => setcity(e.target.value)}
                        type="text"
                        placeholder="City"
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-3">
                      <span className="tenant-personal-details-title">
                        State
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
                          value={state}
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
                      </ConfigProvider>
                    </div>
                    <div className="col-md-3">
                      <span className="tenant-personal-details-title">
                        Zip code
                      </span>
                      <input
                        onChange={handleZipCodeChange}
                        value={form.zipCode}
                        type="number"
                        className="form-control"
                        max={5}
                        placeholder="Zip code"
                      />
                      {errors.zipCode && (
                        <span className="text-danger fw-bold">
                          {errors.zipCode.split("_").join(" ")}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <span className="tenant-personal-details-title">
                        Property
                        <Tooltip title="User cannot add a tenant until they have added a property and units">
                          <img src={helpIcon} alt="" className="cursor ps-2" />
                        </Tooltip>
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
                          onChange={(e) => handleChange("property", e)}
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
                        <Tooltip title="User cannot add a tenant until they have added a property and units">
                          <img src={helpIcon} alt="" className="cursor ps-2" />
                        </Tooltip>
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
                      <span className="tenant-personal-details-title">
                        Rent Amount
                        <span className="input-field-imp-star">*</span>
                      </span>
                      <div className="rent-amount-input-container position-relative">
                        <input
                          value={form.rentAmount}
                          onChange={(e) =>
                            handleChange("rentAmount", e.target.value)
                          }
                          type="number"
                          className="form-control"
                          placeholder="Rent Amount"
                          min="0"
                          onKeyPress={preventMinus}
                        />
                        {errors.rentAmount && (
                          <span className="text-danger fw-bold">
                            {errors.rentAmount.split("_").join(" ")}
                          </span>
                        )}
                        <div className="dollar-sign-box">$</div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <span className="tenant-personal-details-title">
                        Deposit Amount
                        <span className="input-field-imp-star">*</span>
                      </span>
                      <div className="rent-amount-input-container position-relative">
                        <input
                          value={form.depositAmount}
                          onChange={(e) =>
                            handleChange("depositAmount", e.target.value)
                          }
                          type="number"
                          className="form-control"
                          placeholder="Rent Amount"
                          min="0"
                          onKeyPress={preventMinus}
                        />
                        {errors.depositAmount && (
                          <span className="text-danger fw-bold">
                            {errors.depositAmount.split("_").join(" ")}
                          </span>
                        )}
                        <div className="dollar-sign-box">$</div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-4">
                      <span className="tenant-personal-details-title">
                        Lease Term{" "}
                        <span className="input-field-imp-star">*</span>
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
                          value={form.leaseTerm}
                          onChange={(e) => handleChange("leaseTerm", e)}
                          suffixIcon={dropdownIcon}
                          placeholder="Select Lease Term"
                          style={{
                            width: "100%",
                            height: 45,
                          }}
                          options={[
                            {
                              value: "Fixed Term",
                              label: "Fixed Term",
                            },
                            {
                              value: "Month-to-Month",
                              label: "Month-to-Month",
                            },
                          ]}
                        />
                      </ConfigProvider>
                      {errors.leaseTerm && (
                        <span className="text-danger fw-bold">
                          {errors.leaseTerm.split("_").join(" ")}
                        </span>
                      )}
                    </div>
                    <div className="col-md-4">
                      <span className="tenant-personal-details-title">
                        Lease Term Start Date{" "}
                        <span className="input-field-imp-star">*</span>
                      </span>
                      <br />
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
                            suffixIcon={calendar}
                            placeholder="Select Start Date"
                            style={{
                              width: "100%",
                              height: 45,
                            }}
                            onChange={(e) => {
                              const formattedDate = new Date(
                                e
                              ).toLocaleDateString();
                              handleChange("leaseStartDate", formattedDate);
                            }}
                            className="lease-date-picker"
                            format={dateFormat}
                          />
                        </Space>
                      </ConfigProvider>
                      {errors.leaseStartDate && (
                        <span className="text-danger fw-bold">
                          {errors.leaseStartDate.split("_").join(" ")}
                        </span>
                      )}
                    </div>
                    <div className="col-md-4">
                      <span className="tenant-personal-details-title">
                        Lease Term End Date{" "}
                        <span className="input-field-imp-star">*</span>
                      </span>
                      <br />
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
                            suffixIcon={calendar}
                            placeholder="Select End Date"
                            style={{
                              width: "100%",
                              height: 45,
                            }}
                            onChange={(e) => {
                              const formattedDate = new Date(
                                e
                              ).toLocaleDateString();
                              handleChange("LeaseEndDate", formattedDate);
                            }}
                            className="lease-date-picker"
                            format={dateFormat}
                          />
                        </Space>
                      </ConfigProvider>
                      {errors.LeaseEndDate && (
                        <span className="text-danger fw-bold">
                          {errors.LeaseEndDate.split("_").join(" ")}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-12">
                      <ConfigProvider
                        theme={{
                          components: {
                            Switch: {
                              colorPrimary: "#EF6B3E",
                              colorPrimaryHover: "#EF6B3E",
                            },
                          },
                        }}
                      >
                        <Switch
                          value={rollover}
                          onChange={(e) => onChangeSwitch(e)}
                        />
                      </ConfigProvider>
                      <span className="tenant-personal-details-switch-text">
                        {" "}
                        Rollover to “Month to Month” at the end of the term
                      </span>
                      <br />
                      {errors.rollover && (
                        <span className="text-danger fw-bold">
                          {errors.rollover}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <span className="tenant-personal-details-title">
                        Upload documents
                      </span>
                      <div className="dragger">
                        <FileUploader setImages={setImages} />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <span className="tenant-personal-details-title ">
                        Upload lease
                      </span>
                      <div className="dragger">
                        <FileUploader setImages={setImages} Images={Images} />
                      </div>
                    </div>
                  </div>
                  <div className="stepper-first-btn property-details-next-btn-main d-flex justify-content-between gap-3 mt-5">
                    <button
                      onClick={handleNext}
                      className="modal-save-btn w-100 next-btn"
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
                  {emergencyContacts.map((contact, index) => (
                    <div key={index}>
                      <div className="row">
                        <div className="col-md-4">
                          <span className="tenant-personal-details-title">
                            First Name
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            value={contact.firstName}
                            onChange={(e) =>
                              handleFirstNameChange(index, e.target.value)
                            }
                          />
                        </div>
                        <div className="col-md-4">
                          <span className="tenant-personal-details-title">
                            Middle Name
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            value={contact.middleName}
                            onChange={(e) =>
                              handleMiddleNameChange(index, e.target.value)
                            }
                          />
                        </div>
                        <div className="col-md-4">
                          <span className="tenant-personal-details-title">
                            Last Name
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            value={contact.lastName}
                            onChange={(e) =>
                              handleLastNameChange(index, e.target.value)
                            }
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
                            className="form-control"
                            value={contact.email}
                            onChange={(e) =>
                              handleEmailChange(index, e.target.value)
                            }
                          />
                        </div>
                        <div className="col-md-6">
                          <span className="tenant-personal-details-title">
                            Phone No
                          </span>
                          <input
                            max={10}
                            type="tel"
                            className="form-control"
                            value={contact.formattedNo}
                            onChange={(e) =>
                              handleInputEmergencyPhoneChange(
                                index,
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-md-12">
                          <span className="tenant-personal-details-title">
                            Relationship
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
                              placeholder=""
                              style={{
                                width: "100%",
                                height: 45,
                              }}
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
                              value={contact.relationship}
                              onChange={(e) => handleRelationChange(index, e)}
                            />
                          </ConfigProvider>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-md-12">
                          <span className="tenant-personal-details-title">
                            Description
                          </span>
                          <textarea
                            className="form-control mt-3"
                            value={contact.description}
                            onChange={(e) =>
                              handleDescriptionChange(index, e.target.value)
                            }
                            cols="30"
                            rows="10"
                            placeholder="Description"
                          ></textarea>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-md-12">
                          {index !== 0 ? (
                            <div className="row mt-3">
                              <div className="col-md-12">
                                <button
                                  onClick={() => handleRemoveContact(index)}
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
                      </div>
                    </div>
                  ))}
                  <div className="row mt-3">
                    <div className="col-md-12">
                      <button
                        onClick={handleAddContact}
                        className="primary-orange-text add-new-btn"
                      >
                        + Add Another Emergency Contact
                      </button>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between gap-1 mt-5">
                    <button
                      onClick={handleBackButton}
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
            )}
            {currentStep === 3 && (
              <>
                <div className="container-fluid">
                  {pets.map((pet, index) => (
                    <>
                      <div key={index} className="row mt-3">
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
            {currentStep === 5 && (
              <>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-4">
                      <span className="tenant-personal-details-title">
                        First Name
                      </span>
                      <input
                        value={DependentFName}
                        onChange={(e) => setDependentFName(e.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="First Name"
                      />
                    </div>
                    <div className="col-md-4">
                      <span className="tenant-personal-details-title">
                        Middle Name
                      </span>
                      <input
                        value={DependentMName}
                        onChange={(e) => setDependentMName(e.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="Middle Name"
                      />
                    </div>
                    <div className="col-md-4">
                      <span className="tenant-personal-details-title">
                        Last Name
                      </span>
                      <input
                        value={DependentLName}
                        onChange={(e) => setDependentLName(e.target.value)}
                        type="text"
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
                        value={DependentEmail}
                        onChange={(e) => setDependentEmail(e.target.value)}
                        type="email"
                        className="form-control"
                        placeholder="Email"
                      />
                    </div>
                    <div className="col-md-6">
                      <span className="tenant-personal-details-title">
                        Phone No
                      </span>
                      <input
                        max={10}
                        onChange={handleInputChangeDependent}
                        value={DepformattedNumber}
                        type="tel"
                        className="form-control"
                        placeholder="Phone number"
                      />
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-12">
                      <span>Date of birth</span>
                      <br />
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
                              setdependentDob(formattedDate);
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
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-12">
                      <span className="tenant-personal-details-title">
                        Relationship
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
                          value={DependentRelation}
                          suffixIcon={dropdownIcon}
                          placeholder="Select Relationship"
                          style={{
                            width: "100%",
                            height: 45,
                          }}
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
                          onChange={(e) => setDependentRelation(e)}
                        />
                      </ConfigProvider>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-12">
                      <span className="tenant-personal-details-title">
                        Description
                      </span>
                      <textarea
                        value={DependentDescription}
                        onChange={(e) =>
                          setDependentDescription(e.target.value)
                        }
                        name=""
                        id=""
                        cols="30"
                        rows="10"
                        className="form-control mt-3"
                        placeholder="Description"
                      ></textarea>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between gap-1 mt-5">
                    <button
                      onClick={handleBackButton}
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
            )}
            {currentStep === 6 && (
              <>
                {loader ? (
                  <Loader />
                ) : (
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-md-12">
                        <span className="tenant-personal-details-title">
                          Add Notes
                        </span>
                        <textarea
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          name=""
                          id=""
                          cols="30"
                          rows="10"
                          className="form-control mt-3"
                          placeholder="Add your notes"
                        ></textarea>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between gap-1 mt-5">
                      <button
                        onClick={handleBackButton}
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
                )}
              </>
            )}
          </div>
        </div>
        {/*<div className="stepper-btn property-details-next-btn-main d-flex justify-content-between gap-3">
                    {
                        currentStep === 1 ? <button onClick={handleNext} className="modal-save-btn next-btn-main w-100">Next<img src={arrowRight} /></button> :
                            <>
                                <button onClick={handlePrev} className="prev-btn w-50">Back</button>
                                <button onClick={currentStep === 6 ? onOpenModal : handleNext} className="modal-save-btn w-50">{currentStep === 3 ? "Finish" : "Next"}</button>
                            </>
                    }
                </div>*/}
        {/* <div className="stepper-btn property-details-next-btn-main d-flex justify-content-between gap-3 mt-5">
                    <button onClick={handleBackButton} className="prev-btn w-50">Back</button>
                    <button onClick={currentStep === 6 ? onOpenModal : handleNext} className="modal-save-btn w-50">Next</button>
                </div> */}
      </div>
    </>
  );
};

export default AddTenantDetails;
