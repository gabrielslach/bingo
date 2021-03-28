import { useState } from "react";

import { toast } from "react-toastify";

import { postRequest } from "./utilityFunctions";

import { useCookies } from 'react-cookie';

const displayToast = (message, type, displayDuration) => {
  toast(message, {
    position: toast.POSITION.TOP_CENTER,
    type: type,
    autoClose: displayDuration,
  });
};

export default function useGameDrawer(vars) { // You could use this var to set something on the local state.
  let [cookies, setCookie, removeCookie] = useCookies(['loginToken', 'pickedCells']);

  var timeOutVar;

  //states
  const [pickedCells, setPickedCells] = useState([]);

  /*************** Dont edit below this line ***************/
  function startTimeout() {
    timeOutVar = setTimeout(function () {
    console.log("Server Timeout");
    }, 120000);
  }

  function stopTimeout() {
    clearTimeout(timeOutVar);
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
    if (status === 401) {
      removeCookie('loginToken', {path: '/'});
      console.log('Token reset.', cookies)
    }

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
        if (res.status !== 200 && res.status !== 201) {
          onRequestFail(req, res.status);
        } else {
          onRequestSuccess(req, res.data, onSuccess);  
        }
      })
      .catch((err) => {
        stopTimeout();
        onRequestFail(req, (err && err.response) ? err.response.status: '');
        console.log("makePostRequest_err: ", err);
      });
  };

  /*************** Dont edit above this line ***************/

  const makeRequest = (req, vars = {}) => {
    var api = "api/";
    var dataparam = {};
    let onSuccess = () => {};
    const { roomId } = vars;
    
    startTimeout();
    switch (req) {
      case "get-picked-cells":
        if (cookies.pickedCells && cookies.pickedCells.length > 0) {
          setPickedCells(cookies.pickedCells);
          return;
        };
        api += "get-picked-cells";
        dataparam = {userId: 'admin', roomId}; // This are the parameters or arguments supplied on the post request.
        onSuccess = (data) => { // This is a callback that executes at post request success. i.e. data is the res.data returned by the server
            setPickedCells(data.pickedCells);
        }
        break;
      case "pick-cell":
        api += "pick-cell";
        dataparam = {userId: 'admin', roomId};
        onSuccess = (data) => { // This is a callback that executes at post request success. i.e. data is the res.data returned by the server
            setPickedCells(data.pickedCells);
            
            const maxAge = 7 * 24 * 60 * 60;
            
            setCookie('pickedCells', data.pickedCells, { path: '/', maxAge });
        }
        break;
      default:
    }
    if (req !== "" || typeof req !== "undefined") makePostRequest(req, api, dataparam, cookies.loginToken, onSuccess);
  };

  return [
    pickedCells,
    makeRequest,
  ];
}
