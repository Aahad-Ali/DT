import React from 'react'
import { io } from 'socket.io-client'

const Socket = () => {
    const config = require("../Helpers/config.json")
    const role = localStorage.getItem("role")
    const token = localStorage.getItem("token")
    const initializeSocket = io.connect(`${config['socketUrl']}/message`, {
        auth: {
            role: role,
            token: token
        }
    });
    return {
        initializeSocket
    }
}

export default Socket
