import config from '../Helpers/config.json';
import { message } from 'antd';
const UsePutHook = (url, data, onClose, setUpdate,setLoader) => {
    try {
        fetch(`${config.baseUrl}/${url}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(data),
        }).then((res) => {
            return res.json();
        }).then((res) => {
            if (res.apiCallStatus === "success") {
                if (setUpdate) setUpdate(true);
                message.success(res.message)
                console.log(res.message)
                if (onClose) onClose()
            } else {
                console.log(res)
            }
            if (setLoader) setLoader(false);

        });
    } catch (error) {
        console.log(error)
    }
}

export default UsePutHook
