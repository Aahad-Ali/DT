import React from 'react'
import config from 'Helpers/config.json'
import { message } from 'antd'
const ArchiveHook = (url, setUpdate,setLoader) => {
    fetch(`${config.baseUrl}/${url}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
            archive: true
        })
    }).then(res => {
        return res.json()
    }).then(res => {
        if (res.apiCallStatus === "success") {
            setUpdate(true)
            setLoader(true)
            message.info("Property has moved to archive")
        }
        else {
            console.log(res)
        }
    }).catch(err => console.log(err, 'erro'))
}

export default ArchiveHook