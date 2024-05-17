import { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { conversation } from 'Store/Slices/ChatSlice';
import config from 'Helpers/config'

const UseGetHook = (url, id, property_id, search) => {
    // States
    const [PropertyData, setPropertyData] = useState([])
    const [UnitData, setUnitData] = useState([])
    const [TaskData, setTaskData] = useState([])
    const [reportData, setReportData] = useState([])
    const [WorkOrderData, setWorkOrderData] = useState([])
    const [ProspectData, setProspectData] = useState([])
    const [VendorData, setVendorData] = useState([])
    const [MileageData, setMileageData] = useState([])
    const [unitId, setUnitId] = useState([])
    const [amenities, setAmenities] = useState([]);
    const [fileData, setFileData] = useState([]);
    const [NoteData, setNoteData] = useState([]);
    const [TenantData, setTenantData] = useState([]);
    const [loader, setLoader] = useState(false)
    const [user, setuser] = useState([])
    const [lease, setlease] = useState([])
    const [company, setcompany] = useState([])
    const [convo, setconvo] = useState([])
    const [messages, setmessage] = useState([])
    const [plan, setplan] = useState([])
    const [users, setUsers] = useState([])
    const [states, setStates] = useState([])
    const [LandlordCount, setLandlordCount] = useState([{
        Property: "",
        Tenant: "",
        Money: ""
    }])
    const [LandlordTaskCount, setLandlordTaskCount] = useState([]);
    const [invoiceCat, setInvoiceCat] = useState([]);
    const [TenantTaskData, setTenantTaskData] = useState([]);
    const [TenantPropertyTaskData, setTenantPropertyTaskData] = useState([]);
    const [Invoice, setInvoice] = useState([])
    const [role, setRole] = useState([])
    const [accounts, setAccount] = useState([])
    const [tenantScreen, setTenantScreening] = useState([])
    const [report, setReport] = useState([])
    const [payment, setPayment] = useState([])
    const [unit, setUnit] = useState([])
    const [landlordEmail, setlandlordEmail] = useState([])
    const [professional, setProfessional] = useState([])
    const [listProfessional, setListProfessional] = useState([])
    const dispatch = useDispatch()
    // Controller
    const controller = new AbortController()

    // Fetch Property Data
    const fetchProperty = () => {
        setLoader(true)
        fetch(`${config['baseUrl']}/api/${url}${id ? `/${id}` : ""}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` },
            signal: controller.signal
        }).then(res => {
            return res.json()
        })
            .then((res) => {
                if (res.apiCallStatus === "success") {
                    if (!id) {
                        const { message } = res
                        setLoader(false)
                        setPropertyData(message)
                        console.log(message, 'property success')
                    }
                    else {
                        setLoader(false)
                        const { message } = res
                        setAmenities([...message.amenities])
                        setPropertyData([message])
                        console.log(res.message, 'property id success')
                    }

                } else {

                    //console.log(res, 'error')
                }
            })
            .catch(error => {
                //console.log(error)
            });

    }
    const fetchAccountProperty = () => {
        setLoader(true)
        fetch(`${config['baseUrl']}/api/stripe/${url}?landlordId=${localStorage.getItem("user_id")}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` },
            signal: controller.signal
        }).then(res => {
            return res.json()
        })
            .then((res) => {
                if (res.apiCallStatus === "success") {
                    if (!id) {
                        const { message } = res
                        setLoader(false)
                        setPropertyData(message)
                        console.log(message, 'Account property id success')
                    }
                    else {
                        setLoader(false)
                        const { message } = res
                        setAmenities([...message.amenities])
                        setPropertyData([message])
                        console.log(res.message, 'Account property id success')
                    }

                } else {

                    //console.log(res, 'error')
                }
            })
            .catch(error => {
                //console.log(error)
            });

    }
    // Fetch Property Tenant Data
    const fetchPropertyTenant = () => {
        setLoader(true)
        fetch(`${config['baseUrl']}/api/tenant/${url}${id ? `/${id}` : ""}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` },
            signal: controller.signal
        }).then(res => {
            return res.json()
        })
            .then((res) => {
                if (res.apiCallStatus === "success") {
                    if (!id) {
                        setLoader(false)
                        const { message } = res
                        setPropertyData([...message])
                        console.log(message, 'property success')
                    }
                    else {
                        setLoader(false)
                        const { message } = res
                        setAmenities([...message.amenities])
                        setPropertyData([message])
                        console.log(res.message, 'property id success')
                    }

                } else {

                    //console.log(res, 'error')
                }
            })
            .catch(error => {
                //console.log(error)
            });

    }
    // Fetch Unit Data
    const fetchUnit = () => {
        fetch(`${config['baseUrl']}/api/${url}/property${id ? `/${id}` : ""}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        })
            .then((res) => {
                if (res.apiCallStatus === "success") {
                    if (!id) {
                        let temp = []
                        let temp2 = []
                        temp = res.message;
                        temp2 = res.message.amenities;
                        setAmenities([...temp2])
                        setUnitData([temp])
                    }
                    else {
                        let temp = []
                        let temp2 = []
                        temp = res.message;
                        setUnitData([...temp])
                    }

                } else {

                    //console.log(res, 'error')
                }
            })
    }
    // Fetch Unit Data
    const fetchTenantUnit = () => {
        fetch(`${config['baseUrl']}/api/tenant/${url}/${id}/units`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        })
            .then((res) => {
                if (res.apiCallStatus === "success") {
                    let temp = []
                    let temp2 = []
                    temp = res.message;
                    temp2 = res.message.amenities;
                    setAmenities([temp2])
                    setUnitData([temp])
                    console.log(temp, 'tenant unit success')
                }
            })
    }
    // Fetch Vacant Unit Data
    const fetchVacantUnit = () => {
        fetch(`${config['baseUrl']}/api/${url}/vacant/property/${id}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        })
            .then((res) => {
                if (res.apiCallStatus === "success") {
                    let temp = []
                    temp = res.message;
                    setUnitData([...temp])
                    console.log(temp, 'vacant Unit')

                } else {

                    console.log(res, 'error')
                }
            })
    }
    // Fetch Unit by Id Data
    const fetchUnitId = () => {
        fetch(`${config['baseUrl']}/api/${url}${id ? `/${id}` : ""}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        })
            .then((res) => {
                if (res.apiCallStatus === "success") {
                    console.log(res, "unit dataa")
                    let temp = []
                    let temp2 = []
                    temp = res.message;
                    temp2 = res.message.amenities;
                    setAmenities([...temp2])
                    setUnitData([temp])
                    console.log(temp, 'unit')

                } else {

                    //console.log(res, 'error')
                }
            })
    }
    const fetchTenantUnitId = () => {
        fetch(`${config['baseUrl']}/api/tenant/${url}/${id}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        })
            .then((res) => {
                if (res.apiCallStatus === "success") {
                    let temp = []
                    let temp2 = []
                    temp = res.message;
                    temp2 = res.message.amenities;
                    setAmenities([...temp2])
                    setUnitData([temp])
                    console.log(temp, 'Unit dataaaa success')

                } else {

                    //console.log(res, 'error')
                }
            })
    }
    // Fetch Task Data
    const fetchTask = () => {
        setLoader(true)
        fetch(`${config['baseUrl']}/api/${url}${id ? `/${id}` : ""}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        })
            .then((res) => {
                if (res.apiCallStatus === "success") {
                    if (!id) {
                        setLoader(false)
                        let temp = []
                        let temp2 = []
                        temp = res.message;
                        setTaskData([...temp])
                        console.log(temp, 'task success')
                    }
                    else {
                        let temp = []
                        temp = res.message;
                        setTaskData([temp])
                        setUnitId(res.message.unit)
                        console.log(temp, 'task id success')
                    }


                } else {

                    //console.log(res, 'error')
                }
            })
    }
    // Fetch Tenant Task Data
    const fetchTenantTask = () => {
        setLoader(true)
        fetch(`${config['baseUrl']}/api/tenant/${url}${id ? `/${id}` : ""}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        })
            .then((res) => {
                if (res.apiCallStatus === "success") {
                    if (id) {

                        let temp = []
                        temp = res.message;
                        setTenantTaskData([temp])
                        console.log(temp, 'tenannnnn')
                    } else {
                        let temp = []
                        temp = res.message;
                        setTenantTaskData([...temp])
                        console.log(temp, 'tenannnnn')
                    }

                } else {

                    //console.log(res, 'error')
                }
            })
    }
    const purchaseUnit = () => {
        // setLoader(true)
        fetch(`${config['baseUrl']}/api/stripe/${url}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        })
            .then((res) => {
                if (res.apiCallStatus === "success") {
                    if (id) {

                        let temp = []
                        temp = res.message;
                        setTenantTaskData([temp])
                        console.log(temp, 'tenannnnn')
                    } else {
                        let temp = []
                        temp = res.message;
                        setUnit([...temp])
                        console.log(temp, 'tenannnnn')
                    }

                } else {

                    //console.log(res, 'error')
                }
            })
    }
    // Fetch Tenant Property Task Data
    const fetchTenantPropertyTask = () => {
        setLoader(true)
        fetch(`${config['baseUrl']}/api/tenant/${url}/property/${id}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        })
            .then((res) => {
                if (res.apiCallStatus === "success") {
                    if (!id) {
                        setLoader(false)
                        let temp = []
                        let temp2 = []
                        temp = res.message;
                        setTenantPropertyTaskData([...temp])
                        console.log(temp, 'success')
                    }
                    else {
                        let temp = []
                        temp = res.message;
                        setTenantPropertyTaskData([...temp])
                        // setTaskData([temp])
                        // setUnitId(res.message.unit)
                        console.log(temp, 'success')
                    }


                } else {

                    //console.log(res, 'error')
                }
            })
    }
    // Fetch Task Data
    const fetchTaskId = () => {
        fetch(`${config['baseUrl']}/api/tasks/filter?property=${id}${url}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        })
            .then((res) => {
                if (res.apiCallStatus === "success") {
                    let temp = []
                    temp = res.message;
                    setTaskData([...temp])
                    setUnitId(res.message.unit)
                    // console.log(temp, 'task Sucess')

                } else {

                    //console.log(res, 'error')
                }
            })
    }
    const fetchTenantTaskId = () => {
        fetch(`${config['baseUrl']}/api/tenant/tasks/filter?property=${id}${url}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        })
            .then((res) => {
                if (res.apiCallStatus === "success") {
                    let temp = []
                    temp = res.message;
                    setTenantPropertyTaskData([...temp])
                    setUnitId(res.message.unit)
                    console.log(temp, 'task Sucess')

                } else {

                    //console.log(res, 'error')
                }
            })
    }
    // Fetch Unit Task Data
    const fetchTaskUnit = () => {
        fetch(`${config['baseUrl']}/api/${url}/unit/${id}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        })
            .then((res) => {
                if (res.apiCallStatus === "success") {
                    let temp = []
                    temp = res.message;
                    setTaskData([...temp])
                    //console.log(temp, 'task Success')

                } else {

                    //console.log(res, 'error')
                }
            })
    }
    const fetchTenantTaskUnit = () => {
        fetch(`${config['baseUrl']}/api/tenant/${url}/unit/${id}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        })
            .then((res) => {
                if (res.apiCallStatus === "success") {
                    let temp = []
                    temp = res.message;
                    setTaskData([...temp])
                    console.log(temp, 'task Success')

                } else {

                    //console.log(res, 'error')
                }
            })
    }
    // Fetch Work Order Data
    const fetchWorkOrder = () => {
        fetch(`${config['baseUrl']}/api/${url}${id ? `/${id}` : ""}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        })
            .then((res) => {
                if (res.apiCallStatus === "success") {
                    if (!id) {
                        let temp = []
                        let temp2 = []
                        temp = res.message;
                        setWorkOrderData([...temp])
                        // console.log(temp, 'success')
                    }
                    else {
                        let temp = []
                        temp = res.message;
                        setWorkOrderData([temp])
                        // console.log(temp, 'success')
                    }


                } else {

                    //console.log(res, 'error')
                }
            })
    }
    // Fetch Work Order By Id Data
    const fetchWorkOrderId = () => {
        fetch(`${config['baseUrl']}/api/${url}/${id}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        })
            .then((res) => {
                if (res.apiCallStatus === "success") {
                    let temp = []
                    let temp2 = []
                    temp = res.message;
                    setWorkOrderData([temp])
                    // console.log(temp, 'success')


                } else {

                    //console.log(res, 'error')
                }
            })
    }
    // Fetch Prospect Data
    const fetchProspect = () => {
        fetch(`${config['baseUrl']}/api/${url}${id ? `/${id}` : ""}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        })
            .then((res) => {
                if (res.apiCallStatus === "success") {
                    let temp = []
                    let temp2 = []
                    temp = res.message;
                    setProspectData([...temp])
                    //setData([...temp])
                    // console.log(temp, 'success')

                } else {

                    //console.log(res, 'error')
                }
            })
    }
    // Fetch Prospect Data
    // Fetch Vendor Data
    const fetchProspectId = () => {
        fetch(`${config['baseUrl']}/api/${url}${id ? `/${id}` : ""}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        })
            .then((res) => {
                if (res.apiCallStatus === "success") {
                    let temp = []
                    let temp2 = []
                    temp = res.message;
                    setProspectData([temp])
                    console.log(temp, 'prospect id success')

                } else {

                    //console.log(res, 'error')
                }
            })
    }

    const fetchVendor = () => {
        fetch(`${config['baseUrl']}/api/${url}${id ? `/${id}` : ""}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        }).then((res) => {
            if (res.apiCallStatus === "success") {
                if (!id) {
                    const { message } = res
                    setVendorData([...message])
                    // console.log(temp, 'success')
                }
                else {
                    const { message } = res
                    setVendorData([message])
                    console.log(message, 'vendor id success')
                }

            }
        })
    }
    const fetchVendorId = () => {
        fetch(`${config['baseUrl']}/api/${url}${id ? `/${id}` : ""}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        })
            .then((res) => {
                if (res.apiCallStatus === "success") {
                    let temp = []
                    let temp2 = []
                    temp = res.message;
                    setVendorData([temp])
                    console.log(temp, 'Vendor id success')

                } else {

                    //console.log(res, 'error')
                }
            })
    }
    // Fetch Mileage Data
    const fetchMileage = () => {
        fetch(`${config['baseUrl']}/api/${url}${id ? `/${id}` : ""}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        })
            .then((res) => {
                if (res.apiCallStatus === "success") {
                    let temp = []
                    let temp2 = []
                    temp = res.message;
                    setMileageData([...temp])
                    // console.log(temp, 'success')

                } else {

                    //console.log(res, 'error')
                }
            })
    }
    // Fetch Mileage Data
    const fetchMileageId = () => {
        fetch(`${config['baseUrl']}/api/${url}${id ? `/${id}` : ""}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        })
            .then((res) => {
                if (res.apiCallStatus === "success") {
                    let temp = []
                    let temp2 = []
                    temp = res.message;
                    setMileageData([temp])
                    // console.log(temp, 'success')

                } else {

                    //console.log(res, 'error')
                }
            })
    }
    // Fetch File Data
    const FetchFile = async () => {
        await fetch(`${config['baseUrl']}/api/${url}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        }).then((res) => {
            if (res.apiCallStatus === "success") {
                let temp = []
                temp = res.message;
                setFileData([...temp])
                // console.log([...temp], 'success')

            } else {

                //console.log(res, 'error')
            }
        })
    }
    const FetchFileByID = async () => {
        await fetch(`${config['baseUrl']}/api/${url}/${id}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        }).then((res) => {
            if (res.apiCallStatus === "success") {
                let temp = []
                temp = res.message;
                setFileData([temp])
                console.log(temp, 'file Id success')

            } else {

                //console.log(res, 'error')
            }
        })
    }
    // Fetch File by Property Data
    const FetchFileId = () => {
        fetch(`${config['baseUrl']}/api/tenant/${url}/property/${id}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        }).then((res) => {
            if (res.apiCallStatus === "success") {
                let temp = []
                temp = res.message;
                setFileData([...temp])
                // console.log(temp, 'File id success')

            } else {

                //console.log(res, 'error')
            }
        })
    }
    // Fetch File Tasks Data
    const FetchTaskFile = () => {
        fetch(`${config['baseUrl']}/api/tenant/${url}/task/${id}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        }).then((res) => {
            if (res.apiCallStatus === "success") {
                let temp = []
                temp = res.message;
                setFileData([...temp])
                console.log(temp, 'File id success')

            } else {

                //console.log(res, 'error')
            }
        })
    }
    // Fetch File Tasks Data
    const FetchUnitFile = () => {
        fetch(`${config['baseUrl']}/api/${url}/task/${id}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        }).then((res) => {
            if (res.apiCallStatus === "success") {
                let temp = []
                temp = res.message;
                setFileData([...temp])
                // console.log(temp, 'File id success')

            } else {

                //console.log(res, 'error')
            }
        })
    }
    const FetchTenantUnitFile = () => {
        fetch(`${config['baseUrl']}/api/tenant/${url}/unit/${id}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        }).then((res) => {
            if (res.apiCallStatus === "success") {
                let temp = []
                temp = res.message;
                setFileData([...temp])
                // console.log(temp, 'File id success')

            } else {

                //console.log(res, 'error')
            }
        })
    }

    // Fetch File Work Order Data
    const FetchWorkOrderFile = () => {
        fetch(`${config['baseUrl']}/api/${url}/workorder/${id}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        }).then((res) => {
            if (res.apiCallStatus === "success") {
                let temp = []
                temp = res.message;
                setFileData([...temp])
                // console.log(temp, 'File id success')

            } else {

                //console.log(res, 'error')
            }
        })
    }
    // Fetch Note by Property Data
    const FetchNotes = () => {
        fetch(`${config['baseUrl']}/api/${url}/property/${id}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        }).then((res) => {
            if (res.apiCallStatus === "success") {
                let temp = []
                temp = res.message;
                setNoteData([...temp])
                // console.log(temp, 'Notes id success')

            } else {

                //console.log(res, 'error')
            }
        })
    }
    // Fetch Note by Tasks Data
    const FetchTasksNotes = () => {
        fetch(`${config['baseUrl']}/api/${url}/task/${id}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        }).then((res) => {
            if (res.apiCallStatus === "success") {
                let temp = []
                temp = res.message;
                setNoteData([...temp])
                // console.log(temp, 'Notes id success')

            } else {

                //console.log(res, 'error')
            }
        })
    }
    // Fetch Note by Tasks Data
    const FetchUnitNotes = () => {
        fetch(`${config['baseUrl']}/api/${url}/task/${id}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        }).then((res) => {
            if (res.apiCallStatus === "success") {
                let temp = []
                temp = res.message;
                setNoteData([...temp])
                // console.log(temp, 'Notes id success')

            } else {

                //console.log(res, 'error')
            }
        })
    }
    const FetchTenantUnitNotes = () => {
        fetch(`${config['baseUrl']}/api/tenant/${url}/unit/${id}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        }).then((res) => {
            if (res.apiCallStatus === "success") {
                let temp = []
                temp = res.message;
                setNoteData([...temp])
                // console.log(temp, 'Notes id success')

            } else {

                //console.log(res, 'error')
            }
        })
    }
    // Fetch Note by work order Data
    const FetchWorkOrderNotes = () => {
        fetch(`${config['baseUrl']}/api/${url}/workorder/${id}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        }).then((res) => {
            if (res.apiCallStatus === "success") {
                let temp = []
                temp = res.message;
                setNoteData([...temp])
                // console.log(temp, 'Notes id success')

            } else {

                //console.log(res, 'error')
            }
        })
    }
    // Fetch All Tenant Data
    const FetchTenant = () => {
        fetch(`${config['baseUrl']}/api/landlord/${url}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        }).then((res) => {
            if (res.apiCallStatus === "success") {
                let temp = []
                temp = res.message;
                setTenantData([...temp])
                console.log(temp, 'Tenant success')

            } else {

                console.log(res, 'error')
            }
        })
    }
    // Fetch Property Tenant Data
    const FetchPropertyTenant = () => {

        fetch(`${config['baseUrl']}/api/landlord/tenants/filter?property=${id}${url}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        }).then((res) => {
            if (res.apiCallStatus === "success") {
                let temp = []
                temp = res.message;
                setTenantData([...temp])
                console.log(temp, 'Propert Tenant success')

            } else {

                //console.log(res, 'error')
            }
        })
    }
    // Fetch Unit Tenant Data
    const FetchUnitTenant = () => {
        fetch(`${config['baseUrl']}/api/landlord/${url}/unit/${id}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        }).then((res) => {
            if (res.apiCallStatus === "success") {
                let temp = []
                temp = res.message;
                setTenantData([...temp])
                console.log(temp, 'unit Tenant success')

            } else {

                //console.log(res, 'error')
            }
        })
    }
    // Fetch All Tenant Data
    const FetchTenantId = () => {
        fetch(`${config['baseUrl']}/api/landlord/${url}/${id}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        }).then((res) => {
            if (res.apiCallStatus === "success") {
                let temp = []
                temp = res.message;
                setTenantData([temp])
                console.log(temp, 'Tenant Id success')

            } else {
                //console.log(res, 'error')
            }
        })
    }
    // Fetch File tenant Data
    const FetchTenantFile = () => {
        fetch(`${config['baseUrl']}/api/${url}/tenant/${id}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        }).then((res) => {
            if (res.apiCallStatus === "success") {
                let temp = []
                temp = res.message;
                setFileData([...temp])
                // console.log(temp, 'File id success')

            } else {

                //console.log(res, 'error')
            }
        })
    }
    const FetchVendorFiles = () => {
        fetch(`${config['baseUrl']}/api/${url}/vendor/${id}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        }).then((res) => {
            if (res.apiCallStatus === "success") {
                let temp = []
                temp = res.message;
                setFileData([...temp])
                // console.log(temp, 'File id success')

            } else {

                //console.log(res, 'error')
            }
        })
    }
    const FetchProspectFile = () => {
        fetch(`${config['baseUrl']}/api/${url}/prospect/${id}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        }).then((res) => {
            if (res.apiCallStatus === "success") {
                let temp = []
                temp = res.message;
                setFileData([...temp])
                // console.log(temp, 'File id success')

            } else {

                //console.log(res, 'error')
            }
        })
    }
    // Fetch Note by Tasks Data
    const FetchTenantNotes = () => {
        fetch(`${config['baseUrl']}/api/${url}/tenant/${id}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        }).then((res) => {
            if (res.apiCallStatus === "success") {
                let temp = []
                temp = res.message;
                setNoteData([...temp])
                // console.log(temp, 'Notes id success')

            } else {

                //console.log(res, 'error')
            }
        })
    }
    const FetchVendorNotes = () => {
        fetch(`${config['baseUrl']}/api/${url}/vendor/${id}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        }).then((res) => {
            if (res.apiCallStatus === "success") {
                let temp = []
                temp = res.message;
                setNoteData([...temp])
                // console.log(temp, 'Notes id success')

            } else {

                //console.log(res, 'error')
            }
        })
    }
    const FetchProspectNotes = () => {
        fetch(`${config['baseUrl']}/api/${url}/prospect/${id}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        }).then((res) => {
            if (res.apiCallStatus === "success") {
                let temp = []
                temp = res.message;
                setNoteData([...temp])
                // console.log(temp, 'Notes id success')

            } else {

                //console.log(res, 'error')
            }
        })
    }
    // Fetch User Data
    const FetchUser = () => {
        fetch(`${config['baseUrl']}/api/auth/landlord/${url}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        }).then((res) => {
            if (res.apiCallStatus === "success") {
                let temp = []
                temp = res.message;
                setuser([temp])
                console.log(temp, 'user info success')

            } else {
            }
        })
    }
    const FetchUserTenant = () => {
        fetch(`${config['baseUrl']}/api/auth/tenant/${url}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        }).then((res) => {
            if (res.apiCallStatus === "success") {
                let temp = []
                temp = res.message;
                setuser([temp])
                console.log(temp, 'user info success')

            } else {

                //console.log(res, 'error')
            }
        })
    }
    const FetchUserLandlordUser = () => {
        fetch(`${config['baseUrl']}/api/auth/landlord/user/${url}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        }).then((res) => {
            if (res.apiCallStatus === "success") {
                let temp = []
                temp = res.message;
                setuser([temp])
                console.log(temp, 'user info success')

            } else {

                //console.log(res, 'error')
            }
        })
    }
    // Fetch Lease Data
    const FetchLease = () => {
        fetch(`${config['baseUrl']}/api/${url}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        }).then((res) => {
            if (res.apiCallStatus === "success") {
                let temp = []
                temp = res.message;
                setlease([...temp])
                console.log(temp, 'lease success')

            } else {

                //console.log(res, 'error')
            }
        })
    }
    // Fetch Unit Lease Data
    const FetchLeaseUnit = () => {
        fetch(`${config['baseUrl']}/api/${url}/unit/${id}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        }).then((res) => {
            if (res.apiCallStatus === "success") {
                let temp = []
                temp = res.message;
                setlease([...temp])
                //console.log(temp, 'lease Unit success')

            } else {

                //console.log(res, 'error')
            }
        })
    }
    // Fetch Unit Lease Data
    const FetchLeaseId = () => {
        fetch(`${config['baseUrl']}/api/${url}/${id}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        }).then((res) => {
            if (res.apiCallStatus === "success") {
                let temp = []
                temp = res.message;
                setlease([temp])
                console.log(temp, 'lease id success')

            } else {

                //console.log(res, 'error')
            }
        })
    }
    const FetchLeaseNotes = () => {
        fetch(`${config['baseUrl']}/api/${url}/lease/${id}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        }).then((res) => {
            if (res.apiCallStatus === "success") {
                console.log(res)
                const { message } = res;
                setNoteData(message)
                console.log(message, 'lease notes success')

            } else {

                //console.log(res, 'error')
            }
        })
    }
    const FetchLeaseFiles = () => {
        fetch(`${config['baseUrl']}/api/${url}/lease/${id}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        }).then((res) => {
            if (res.apiCallStatus === "success") {
                let temp = []
                temp = res.message;
                setFileData(temp)
                console.log(temp, 'lease file success')

            } else {

                //console.log(res, 'error')
            }
        })
    }
    // Fetch Company Data
    const FetchCompany = () => {
        fetch(`${config['baseUrl']}/api/${url}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        }).then((res) => {
            if (res.apiCallStatus === "success") {
                let temp = []
                temp = res.message;
                setcompany([...temp])
                console.log(temp, 'company success')

            } else {

                //console.log(res, 'error')
            }
        })
    }
    // Fetch Landlord Conversation
    const FetchCoversationLandlord = () => {
        // alert("Hello")
        fetch(`${config['baseUrl']}/api/landlord/${url}/${id}?search=${search}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        }).then((res) => {
            if (res.apiCallStatus === "success") {
                let temp = []
                temp = res.message;
                setconvo([...temp])
                console.log(temp, 'conversation success')
                dispatch(conversation(temp))

            } else {

                //console.log(res, 'error')
            }
        })
    }
    // Fetch Tenant Conversation
    const FetchCoversationTenant = () => {
        fetch(`${config['baseUrl']}/api/tenant/${url}/${id}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        }).then((res) => {
            if (res.apiCallStatus === "success") {
                let temp = []
                temp = res.message;
                setconvo([...temp])
                console.log(temp, 'conversation success')

            } else {

                console.log(res, 'error')
            }
        })
    }
    // Fetch Landlord Messages
    const FetchLandlordMessage = () => {
        fetch(`${config['baseUrl']}/api/landlord/${url}/${id}/1`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        }).then((res) => {
            if (res.apiCallStatus === "success") {
                let temp = []
                temp = res.message;
                setmessage([...temp])

                console.log(temp, 'Messages success')


            } else {

                console.log(res, 'error')
            }
        })
    }
    // Fetch Tenant Messages
    const FetchTenantMessage = () => {
        fetch(`${config['baseUrl']}/api/tenant/${url}/${id}/1`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        }).then((res) => {
            if (res.apiCallStatus === "success") {
                let temp = []
                temp = res.message;
                setmessage([...temp])
                console.log(temp, 'Messages success')

            } else {

                console.log(res, 'error')
            }
        })
    }
    // Fetch Archive Chats
    const FetchLandlordArchive = () => {
        fetch(`${config['baseUrl']}/api/landlord/archived/${url}/1`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        }).then((res) => {
            if (res.apiCallStatus === "success") {
                const { message } = res;
                setmessage(message)
                console.log(res, 'archive successfully')
            } else {
                console.log(res, 'error')
            }
        })
    }
    // Fetch Landlord plan
    const FetchLandlordPlans = () => {
        fetch(`${config['baseUrl']}/api/${url}/plans`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        }).then((res) => {
            if (res.apiCallStatus === "success") {
                let temp = []
                temp = res.message;
                setplan(temp)
                console.log(temp, 'LANDLORD PLANS SUCCESS')

            } else {

                console.log(res, 'error')
            }
        })

    }
    // Fetch Landlord Users
    // Fetch Landlord plan
    const FetchPaymentMethod = () => {
        fetch(`${config['baseUrl']}/api/stripe/${url}?email=${id}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        }).then((res) => {
            if (res.apiCallStatus === "success") {
                const { message } = res
                setPayment(message.data)
                console.log(message.data, "payment method success")
            } else {

                console.log(res, 'error')
            }
        })

    }
    // Fetch Landlord Users

    const FetchLandlordUsers = () => {
        fetch(`${config['baseUrl']}/api/${url}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        }).then((res) => {
            if (res.apiCallStatus === "success") {
                let temp = []
                temp = res.message;
                setUsers([...temp])
                console.log(temp, 'User success')

            } else {

                console.log(res, 'error')
            }
        })
    }
    const FetchUserRole = () => {
        fetch(`${config['baseUrl']}/api/userRole/${url}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        }).then((res) => {
            if (res.apiCallStatus === "success") {
                const { message } = res
                setRole(message)
                console.log(message, 'User role success')

            } else {

                console.log(res, 'error')
            }
        })
    }
    const FetchEditUserRole = () => {
        fetch(`${config['baseUrl']}/api/user/${id}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        }).then((res) => {
            if (res.apiCallStatus === "success") {
                const { message } = res
                setRole(message)
                console.log(message, ' Edit User role success')

            } else {

                console.log(res, 'error')
            }
        })
    }
    // Fetch Landlord Users

    const fetchStates = () => {
        fetch(`${config['baseUrl']}/api/${url}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        }).then((res) => {
            if (res.apiCallStatus === "success") {
                let temp = []
                temp = res.message;
                setStates([...temp])
                // console.log(temp, 'states success')
            } else {
                console.log(res, 'error')
            }
        })
    }
    // Fetch Landlord Count
    const fetchLandlordCount = () => {
        fetch(`${config['baseUrl']}/api/${url}/counts`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        }).then((res) => {
            if (res.apiCallStatus === "success") {
                const { Property, Tenant, Money } = res.message
                setLandlordCount((prev) => ({
                    ...prev,
                    ["Property"]: Property,
                    ["Tenant"]: Tenant,
                    ["Money"]: Money,
                }))
                console.log(LandlordCount, "Data")
            } else {
                console.log(res, 'error')
            }
        })
    }
    // Fetch Landlord Count Task Chart
    const fetchLandlordTaskCount = () => {
        fetch(`${config['baseUrl']}/api/dashboard/count/${url}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        }).then((res) => {
            if (res.apiCallStatus === "success") {
                const totalTasks = res.message.totalTasks
                //setLandlordTaskCount([...totalTasks]);
                let taskData = [...totalTasks];

                // Define the possible _id values you want to have
                const possibleIds = ['Completed', 'In Progress', 'Not Started'];

                // Create a map from _id to count
                const countMap = taskData.reduce((acc, task) => {
                    acc[task._id] = task.count;
                    console.log(task._id, "Tasks Id & Count")
                    return acc;
                }, {});

                // Ensure all possible _id values have a count, if not set count to 0
                const landlordTaskCountCharts = possibleIds.map(id => ({
                    _id: id,
                    count: countMap[id] || 0
                }));
                setLandlordTaskCount(landlordTaskCountCharts);

                console.log(landlordTaskCountCharts, "Tasks Data")

            } else {
                console.log(res, 'error')
            }
        })
    }
    // Fetch Invoice
    const InvoiceCategory = () => {
        fetch(`${config['baseUrl']}/api/invoice/${url}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        }).then((res) => {
            if (res.apiCallStatus === "success") {
                console.log(res)
                const { message } = res
                let temp = message
                setInvoiceCat([...temp])
                console.log(temp, 'Category success')
            } else {
                console.log(res, 'error')
            }
        })
    }
    const FetchInvoice = () => {
        fetch(`${config['baseUrl']}/api/invoice/${url}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        }).then((res) => {
            if (res.apiCallStatus === "success") {
                console.log(res)
                const { message } = res
                setInvoice([...message])
                console.log(message, 'Invoice success')
            } else {
                console.log(res, 'error')
            }
        })
    }
    const FetchInvoiceById = () => {
        fetch(`${config['baseUrl']}/api/invoice/${url}?_id=${id}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        }).then((res) => {
            if (res.apiCallStatus === "success") {
                console.log(res)
                const { message } = res
                setInvoice(message)
                console.log(message, 'Invoice success')
            } else {
                console.log(res, 'error')
            }
        })
    }
    const FetchTenantInvoice = () => {
        fetch(`${config['baseUrl']}/api/invoice/${url}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        }).then((res) => {
            if (res.apiCallStatus === "success") {
                console.log(res)
                const { message } = res
                setInvoice(message)
                console.log(message, 'Invoice success')
            } else {
                console.log(res, 'error')
            }
        })
    }
    // Fetch Account
    const fetchAccount = () => {
        fetch(`${config['baseUrl']}/api/stripe/${url}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        }).then((res) => {
            if (res.apiCallStatus === "success") {
                console.log(res)
                const { message } = res
                setAccount(message)
                console.log(message, 'Accounts success')
            } else {
                console.log(res, 'error')
            }
        })
    }
    const fetchAccountByProperty = () => {
        fetch(`${config['baseUrl']}/api/stripe/${url}?property=${id}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        }).then((res) => {
            if (res.apiCallStatus === "success") {
                console.log(res)
                const { message } = res
                setAccount(message.landlordAccount.stripeAccountDetails)
                console.log(message.landlordAccount.stripeAccountDetails, 'Property Accounts success')
            } else {
                console.log(res, 'error')
            }
        })
    }
    const FetchPropertyReport = () => {
        fetch(`${config['baseUrl']}/api/getReport/property?type=${url}&property=${id}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        }).then((res) => {
            if (res.apiCallStatus === "success") {
                console.log(res)
                const { message } = res
                setReportData(message)
                console.log(message, 'Property Report success')
            } else {
                console.log(res, 'error')
            }
        })
    }
    // Fetch Tenant Screening requests
    const fetchTenantScreening = () => {
        fetch(`${config['baseUrl']}/api/renter/transunion/${url}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        }).then((res) => {
            if (res.apiCallStatus === "success") {
                console.log(res)
                const { message } = res
                setTenantScreening(message)
                console.log(message, 'tenant Screening success')
            } else {
                console.log(res, 'error')
            }
        })
    }

    const fetchLandlordEmail = () => {
        fetch(`${config['baseUrl']}/api/renter/transunion/${url}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        }).then((res) => {
            if (res.apiCallStatus === "success") {
                console.log(res)
                const { message } = res
                setlandlordEmail(message)
                console.log(message, 'landlord email success')
            } else {
                console.log(res, 'error')
            }
        })
    }
    // Fetch reports
    const fetchPropertyReport = () => {
        fetch(`${config['baseUrl']}/api/getReport?type=${url}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        }).then((res) => {
            if (res.apiCallStatus === "success") {
                console.log(res)
                const { message } = res
                setReport(message)
                console.log(message, `${url} report success`)
            } else {
                console.log(res, 'error')
            }
        })
    }
    const fetchTenantReport = () => {
        fetch(`${config['baseUrl']}/api/getReport?type=${url}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        }).then((res) => {
            if (res.apiCallStatus === "success") {
                console.log(res)
                const { message } = res
                setReport(message)
                console.log(message, `${url} report success`)
            } else {
                console.log(res, 'error')
            }
        })
    }
    const fetchInvoiceReport = () => {
        fetch(`${config['baseUrl']}/api/getReport?type=${url}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        }).then((res) => {
            if (res.apiCallStatus === "success") {
                console.log(res)
                const { message } = res
                setReport(message)
                console.log(message, `${url} report success`)
            } else {
                console.log(res, 'error')
            }
        })
    }
    const fetchTaskReport = () => {
        fetch(`${config['baseUrl']}/api/getReport?type=${url}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        }).then((res) => {
            if (res.apiCallStatus === "success") {
                console.log(res)
                const { message } = res
                setReport(message)
                console.log(message, `${url} report success`)
            } else {
                console.log(res, 'error')
            }
        })
    }
    const fetchServiceProfessional = () => {
        fetch(`${config['baseUrl']}/api/${url}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        }).then((res) => {
            if (res.apiCallStatus === "success") {
                console.log(res)
                const { message } = res
                setProfessional(message.ServiceProviders)
                // console.log(message, `${url} report success`)
            } else {
                console.log(res, 'error')
            }
        })
    }
    const fetchServiceProfessionals = () => {
        fetch(`${config['baseUrl']}/api/services/${url}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        }).then((res) => {
            if (res.apiCallStatus === "success") {
                console.log(res)
                const { message } = res
                setProfessional(message.ServiceProviders)
                console.log(message, `${url} service pro success`)
            } else {
                console.log(res, 'error')
            }
        })
    }
    const fetchListProfessional = () => {
        fetch(`${config['baseUrl']}/api/services/${url}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }).then(res => {
            return res.json()
        }).then((res) => {
            if (res.apiCallStatus === "success") {
                // console.log(res)
                const { message } = res
                setListProfessional(message.customerQueries)
                console.log(message.customerQueries, `${url} service pro success22222`)
            } else {
                console.log(res, 'error')
            }
        })
    }
    return {
        InvoiceCategory,
        fetchProperty,
        fetchUnit,
        fetchUnitId,
        fetchListProfessional,
        fetchTenantUnitId,
        fetchTask,
        fetchVendor,
        fetchMileage,
        fetchWorkOrder,
        fetchProspect,
        fetchWorkOrderId,
        fetchTaskId,
        fetchTenantTaskId,
        FetchFile,
        FetchFileByID,
        FetchFileId,
        fetchVendorId,
        FetchNotes,
        FetchTasksNotes,
        FetchTaskFile,
        FetchTenant,
        FetchTenantId,
        FetchWorkOrderNotes,
        FetchWorkOrderFile,
        FetchUser,
        FetchUserTenant,
        fetchProspectId,
        FetchLease,
        FetchTenantFile,
        FetchTenantNotes,
        FetchLeaseUnit,
        fetchTaskUnit,
        fetchTenantTaskUnit,
        FetchPropertyTenant,
        FetchUnitTenant,
        FetchUnitFile,
        FetchTenantUnitFile,
        FetchUnitNotes,
        fetchVacantUnit,
        FetchCompany,
        FetchCoversationLandlord,
        FetchCoversationTenant,
        FetchLandlordMessage,
        FetchLeaseId,
        FetchTenantMessage,
        fetchPropertyTenant,
        fetchAccountProperty,
        setmessage,
        setconvo,
        FetchLandlordPlans,
        FetchLandlordUsers,
        fetchStates,
        fetchLandlordCount,
        fetchLandlordTaskCount,
        fetchTenantTask,
        fetchTenantUnit,
        FetchInvoice,
        FetchProspectNotes,
        FetchProspectFile,
        FetchInvoiceById,
        FetchLeaseNotes,
        FetchTenantUnitNotes,
        FetchVendorFiles,
        FetchVendorNotes,
        FetchLeaseFiles,
        fetchMileageId,
        fetchTenantPropertyTask,
        FetchLandlordArchive,
        FetchUserRole,
        fetchAccount,
        fetchTenantScreening,
        fetchAccountByProperty,
        fetchPropertyReport,
        fetchTenantReport,
        fetchInvoiceReport,
        FetchPaymentMethod,
        FetchEditUserRole,
        FetchPropertyReport,
        setReportData,
        fetchTaskReport,
        purchaseUnit,
        FetchTenantInvoice,
        fetchLandlordEmail,
        fetchServiceProfessional,
        fetchServiceProfessionals,
        listProfessional,
        professional,
        landlordEmail,
        report,
        payment,
        unit,
        reportData,
        tenantScreen,
        accounts,
        role,
        Invoice,
        states,
        users,
        convo,
        messages,
        plan,
        company,
        lease,
        user,
        TenantData,
        NoteData,
        fileData,
        PropertyData,
        ProspectData,
        UnitData,
        amenities,
        WorkOrderData,
        TaskData,
        VendorData,
        MileageData,
        unitId,
        ProspectData,
        invoiceCat,
        loader,
        controller,
        LandlordCount,
        LandlordTaskCount,
        TenantTaskData,
        TenantPropertyTaskData,
        FetchUserLandlordUser,

    }
}
export default UseGetHook;