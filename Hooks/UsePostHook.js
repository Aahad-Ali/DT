import { message } from 'antd';
import config from '../Helpers/config.json';
const UsePostHook = (url, data, setLoader, modal, setUpdate) => {
    fetch(`${config.baseUrl}/${url}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((res) => {
        return res.json();
    })
        .then((res) => {
            if (res.apiCallStatus === "success") {
                if (setLoader) setLoader(true);
                setTimeout(() => {
                    if (setLoader) setLoader(false);
                    if (modal) modal();
                    if (setUpdate) setUpdate(true);
                }, 2000);
                console.log(res, "success");
            } else {
                message.error(res.error.validations || res.error.message)
                if (setLoader) setLoader(false);
            }
        }).catch(err => {
            message.error(err.error.validations || err.error.message)
            if (setLoader) setLoader(false);
        })
}

export default UsePostHook
