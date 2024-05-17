import { message } from "antd";
import { useNavigate } from "react-router-dom";
// BaseUrl
const config = require("../Helpers/config.json");
// Hook
const UseDeleteHook = (url, delId, route, setUpdate) => {
    const navigate = useNavigate()
    const deleteData = () => {
        fetch(`${config['baseUrl']}/api/${url}/${delId}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => {
            return res.json()
        }).then((res) => {
            if (res.apiCallStatus === "success") {
                message.success(`${url} deleted successfully`)
                if (route) navigate(`/${route}`)
                if (setUpdate) setUpdate(true)
            }
            if (res.apiCallStatus === "error") {
                if (url === "property"||url==="unit") {
                    const docs = res.relatedDocs
                    const docsType = Object.entries(docs).map(e => e[1].length + " " + e[0]);
                    message.error(`You cannot delete this you have ${docsType} connected to this property`)
                }
            }
        })
    }
    return {
        deleteData,
    }

}
export default UseDeleteHook;