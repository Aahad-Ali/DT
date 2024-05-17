import { useEffect } from 'react';
import './App.css';
import Routing from './Routing/Routing';
import { OnlineOffline, socket } from './Store/Slices/ChatSlice';
import { useDispatch } from 'react-redux';
import Socket from './Hooks/Socket';
import {FacebookLoginButton} from 'react-social-login-buttons'
import {LoginSocialFacebook} from 'reactjs-social-login'
import { Notification } from 'Components/GeneralComponents';
import { NewPage, NewPage1 } from './Pages'


const App = () => {
  const config = require("../src/Helpers/config.json")

  const dispatch = useDispatch()
  useEffect(() => {
    if (localStorage.getItem("role") === null || localStorage.getItem("role") === "" || localStorage.getItem("role") === undefined) {
      document.body.style.background = "#fff"
    }
    else {
      const { initializeSocket } = Socket();
      initializeSocket.on("updateStatus", (data) => {
        let { id, status } = data;
        dispatch(OnlineOffline({ id, status }))
      })
      dispatch(socket(initializeSocket))
    }
  }, [])

  return (
    <>
      <Routing />
      <Notification/>
    </>
  );
}

export default App;
