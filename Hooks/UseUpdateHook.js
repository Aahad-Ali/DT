import config from '../Helpers/config.json';
import { message } from 'antd';
const UseUpdateHook = (url, id, formdata, onClose, landlord, setUpdate,setLoader) => {
    try {
        fetch(`${config.baseUrl}${landlord ? `/api/${landlord}/${url}/${id}` : `/api/${url}/${id}`}`, {
            method: "PUT",
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            body: formdata,
        }).then((res) => {
                return res.json();
            }).then((res) => {
                if (res.apiCallStatus === "success") {
                    if (setUpdate) setUpdate(true);
                    if (url === "conversation/archive") {
                        message.success("Chat archived successfully")
                    } else {
                        message.success(`${url} updated successfully`);
                    }
                    if(setLoader) setLoader(false)
                    if (onClose) onClose()
                } else {
                }
            });
    } catch (error) {
        console.log(error)
    }
}

export default UseUpdateHook
