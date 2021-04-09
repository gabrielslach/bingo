import { useState, useRef } from "react";

import { toast } from "react-toastify";

import { useCookies } from 'react-cookie';

import { postRequest } from "./utilityFunctions";

const displayToast = (message, type, displayDuration) => {
  toast(message, {
    position: toast.POSITION.TOP_CENTER,
    type: type,
    autoClose: displayDuration,
  });
};

export default function useClassicGameAdmin(vars) { // You could use this var to set something on the local state.

  const timeOutVar = useRef(null);

  //states
  
  const [cookies, setCookie, removeCookie] = useCookies(['loginToken', 'userInfo']);
  const [isLoading, setIsLoading] = useState(false);

  /*************** Dont edit below this line ***************/
  function startTimeout() {
    timeOutVar.current = setTimeout(function () {
    console.log("Server Timeout");
    }, 120000);
  }

  function stopTimeout() {
    clearTimeout(timeOutVar.current);
  }

  const onRequestSuccess = (req, resData, onSuccess) => {
    const { data, oFlag, oMessage } = resData;
    if (oFlag) {
        onSuccess(data);
    } else {
        alert(oMessage);
        console.log(req, ': ', oMessage);
    };
    
    displayToast(
        oMessage,
        oFlag ? toast.TYPE.SUCCESS : toast.TYPE.ERROR,
        2500
        );
  };

  const onRequestFail = (req, status) => {
    console.log(
      "Server Error: Please contact your server administrator.",
    );
    alert(status);
    displayToast(
        status || 'Server Error',
        toast.TYPE.ERROR,
        2500
        );
  };

  const makePostRequest = (req, api, dataparam, loginToken, onSuccess) => {
    postRequest(api, dataparam, loginToken)
      .then((res) => {
        stopTimeout();
        setIsLoading(false);
        if (res.status !== 200 && res.status !== 201) {
          onRequestFail(req, res.status);
        } else {
          onRequestSuccess(req, res.data, onSuccess);  
        }
      })
      .catch((err) => {
        stopTimeout();
        setIsLoading(false);
        onRequestFail(req,'Login Failed');
        console.log("makePostRequest_err: ", err);
      });
  };

  /*************** Dont edit above this line ***************/

  const makeRequest = (req, vars = {}) => {
    var api = "";
    var dataparam = {};
    let onSuccess = () => {};

    const {
      roomId = '',
      playerId = '',
      password
  } = vars;

    startTimeout();
    setIsLoading(true);
    switch (req) {
      // case "get-player":
      //   const {playerId} = vars;
      //   api = "get-player";
      //   dataparam = {playerId}; // This are the parameters or arguments supplied on the post request.
      //   onSuccess = (data) => { // This is a callback that executes at post request success. i.e. data is the res.data returned by the server
            
      //   }
      //   break;
    case "login" :
        api = "login";
        dataparam = {roomId, password};
        onSuccess = (data) => {
            const {loginToken} = data;
            const maxAge = 24 * 60 * 60;
            
            setCookie('loginToken', loginToken, { path: '/', maxAge });
            setCookie('userInfo', {roomId, userId: 'admin'}, { path: '/', maxAge });
            window.location.reload();
        };
        break;
    case "player-login" :
        api = "player-login";
        dataparam = {roomId, userId : playerId};
        onSuccess = (data) => {
            const {loginToken, roomId, userId} = data;
            const maxAge = 7 * 24 * 60 * 60;
            
            setCookie('loginToken', loginToken, { path: '/', maxAge });
            setCookie('userInfo', {roomId, userId}, { path: '/', maxAge });
        };
        break;
        case "logout" :
          removeCookie('loginToken', {path: '/'});
          removeCookie('userInfo', {path: '/'});
          setIsLoading(false);
          window.location.reload();
          return;
          break;
      default:
    }
    if (req !== "" || typeof req !== "undefined") makePostRequest(req, api, dataparam, '', onSuccess);
  };

  return [
    cookies,
    isLoading,
    makeRequest,
  ];
}
