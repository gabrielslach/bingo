import { useState, useRef } from "react";

import { toast } from "react-toastify";

import { postRequest } from "./utilityFunctions";

const displayToast = (message, type, displayDuration) => {
  toast(message, {
    position: toast.POSITION.TOP_CENTER,
    type: type,
    autoClose: displayDuration,
  });
};

export default function useCreateRoom(vars) { // You could use this var to set something on the local state.

  const timeOutVar = useRef(null);

  //states
  const [roomDetails, setRoomDetails] = useState('');
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
        console.log(req, ': ', oMessage);
    };
    
    displayToast(
        oMessage,
        oFlag ? toast.TYPE.SUCCESS : toast.TYPE.ERROR,
        2500
        );
  };

  const onRequestFail = (req, status) => {
    if (status === 401 || status === 403) {
      alert('Action failed.')
    };

    console.log(
      "Server Error: Please contact your server administrator.",
    );

    alert(status || 'Server Error. Please reload the page.');
    
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
        onRequestFail(req, (err && err.response) ? err.response.status: '');
        console.log("makePostRequest_err: ", err);
      });
  };

  /*************** Dont edit above this line ***************/

  const makeRequest = (req, vars = {}) => {
    var api = "";
    var dataparam = {};
    let onSuccess = () => {};
    setIsLoading(true);
    startTimeout();
    switch (req) {
      case "create-room":
        const {captchaToken} = vars;
        api += "create-room";
        dataparam = {captchaToken}; // This are the parameters or arguments supplied on the post request.
        onSuccess = (data) => { // This is a callback that executes at post request success. i.e. data is the res.data returned by the server
          const {roomId, password} = data;  
          setRoomDetails(`Room ID: ${roomId}\nPassword: ${password}\nRoom URL: bingo.gabrielslach.me/classic/${roomId}`);
        }
        break;
      default:
    }
    if (req !== "" || typeof req !== "undefined") makePostRequest(req, api, dataparam, null, onSuccess);
  };

  return [
    roomDetails,
    isLoading,
    makeRequest,
  ];
}
