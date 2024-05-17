import React from 'react'
import config from 'Helpers/config.json'


const FacebookAuth = (user) => {
    window.open(`${config.baseUrl}/auth/facebook/${user}`, "_self")
}

export default FacebookAuth
