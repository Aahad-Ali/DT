import config from '../Helpers/config.json';
import { message } from 'antd';
const UseJsonHook = (User, email, password, setEmailError, setPassError, setLoader) => {
    fetch(`${config.baseUrl}/api/auth/${User}/login`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    }).then((res) => {
        return res.json();
    }).then((res) => {
        if (res.apiCallStatus === "error") {
            if (res.error.message === "Invalid email") {
                setEmailError(true);
            } else {
                setEmailError(false);
            }
            if (res.error.message === "Invalid password") {
                setPassError(true);
            } else {
                setPassError(false);
            }
            message.error(res.error.message);
        } else {
            message.success("Login Successful");
            if (User === "serviceprovider") {
                localStorage.setItem("role", res.message.role);
            } else {
                if (res.message.userRole) {
                    localStorage.setItem("role", "user");
                    localStorage.setItem("user_role", res.message.userRole.role);
                }
                else {
                    localStorage.setItem("role", res.message.role);
                }
                localStorage.setItem("name", res.message.name);
                localStorage.setItem("user_id", res.message._id);
                localStorage.setItem("token", res.message.token);
                localStorage.setItem("email", res.message.email);
            }
            setLoader(true);
            setTimeout(() => {
                window.location.replace("/");
            }, 2000);
        }
    }).catch((err) => {
        message.error(err?.error?.message);
        console.log(err)
    });
}

export default UseJsonHook
