import React from 'react'
import config from './config.json'
import { message } from 'antd'
const CompleteTask = (id) => {
    const completeStatus = () => {
        fetch(`${config.baseUrl}/api/taskupdate/${id}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                "status": "Completed",
            })
        }).then(res => {
            return res.json()
        }).then(res => {
            if (res.apiCallStatus === "success") {
                message.success("Task updated successfully")
            }
            else {
                message.success("Task Updated unsuccessfully")
            }
        })
    }
    return {
        completeStatus
    }
}

export default CompleteTask
