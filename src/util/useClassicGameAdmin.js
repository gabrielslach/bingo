import { useContext, useState, useEffect } from "react";

import { toast } from "react-toastify";

import AppContext from "./appContext";
import { postRequest } from "./utilityFunctions";

const displayToast = (message, type, displayDuration) => {
  toast(message, {
    position: toast.POSITION.TOP_CENTER,
    type: type,
    autoClose: displayDuration,
  });
};

export default function useClassicGameAdmin(vars) { // You could use this var to set something on the local state.
  let appContext = useContext(AppContext);

  var timeOutVar;

  //states
  const [players, setPlayers] = useState([]);
  const [cards, setCards] = useState([]);

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
    console.log(
      "Server Error: Please contact your server administrator.",
    );
    
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
        console.log("makePostRequest_err: ", err);
      });
  };

  /*************** Dont edit above this line ***************/

  const makeRequest = (req, vars = {}) => {
    var api = "";
    var dataparam = {};
    let onSuccess = () => {};

    startTimeout();
    switch (req) {
      case "get-player":
        const {playerId} = vars;
        api = "get-player";
        dataparam = {playerId}; // This are the parameters or arguments supplied on the post request.
        onSuccess = (data) => { // This is a callback that executes at post request success. i.e. data is the res.data returned by the server
            setCards(data.cards);
            setPlayers(data.player);
        }
        break;
      case "get-player-all":
        api = "get-player-all";
        onSuccess = (data) => { // This is a callback that executes at post request success. i.e. data is the res.data returned by the server
            setPlayers(data.players);
        }
        break;
    case "register-player" :
        const {
            name, 
            email, 
            noOfCards
        } = vars;
        api = "register-player";
        dataparam = {name, email, noOfCards};
        onSuccess = (data) => {
            console.log(data)
            makeRequest('get-player-all')
        };
        break;
      default:
    }
    if (req !== "" || typeof req !== "undefined") makePostRequest(req, api, dataparam, appContext.loginToken, onSuccess);
  };

  return [
    cards,
    players,
    makeRequest,
  ];
}
