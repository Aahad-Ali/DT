import { message } from 'antd';
import config from 'Helpers/config.json';
const UseFormDataHook = (url, formdata, modal, setLoader, landlord, route,setUpdate) => {
    var status;
    fetch(`${config.baseUrl}${landlord ? `/api/${landlord}/${url}` : `/api/${url}`}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: formdata,
    })
        .then((res) => {
            status = res.status
            return res.json();
        })
        .then((res) => {
            if (res.apiCallStatus === "success") {
                if (setLoader) setLoader(false);
                if (modal) modal();
                if(setUpdate)setUpdate(true)
            } else {
                message.error(res?.error?.validations || res?.error?.message)
                if (setLoader) setLoader(false);
            }
        }).catch(err => {
            err.error.validations.map((error) => {
                message.error(err.error.validations)
            })
            if (setLoader) setLoader(false);
        })

}

export default UseFormDataHook
