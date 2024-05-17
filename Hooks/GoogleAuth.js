import config from 'Helpers/config.json'
const GoogleAuth = (user) => {
    window.open(`${config.baseUrl}/auth/google/${user}`, "_self")
}

export default GoogleAuth
