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

export default function useClassicGameAdmin(vars) { // You could use this var to set something on the local state.
  let [cookies, setCookie, removeCookie] = useCookies(['loginToken']);

  var timeOutVar;

  //states
  const [players, setPlayers] = useState([]);
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
      removeCookie('userInfo', {path: '/'});
      setIsLoading(false);
      console.log('Token reset.', cookies)
    }

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
        onRequestFail(req, (err && err.response) ? err.response.status: '');
        console.log("makePostRequest_err: ", err);
      });
  };

  /*************** Dont edit above this line ***************/

  const makeRequest = (req, vars = {}) => {
    var api = "";
    var dataparam = {};
    let onSuccess = () => {};
    const { roomId, playerId, noOfCards } = vars;
    setIsLoading(true);
    startTimeout();
    switch (req) {
      case "get-player":
        api += "get-player";
        dataparam = {playerId, userId: playerId, roomId}; // This are the parameters or arguments supplied on the post request.
        onSuccess = (data) => { // This is a callback that executes at post request success. i.e. data is the res.data returned by the server
            setCards(data.cards);
            setPlayers(data.player);
            setIsLoading(false);
        }
        break;
      case "get-player-all":
        api += "get-player-all";
        dataparam = {userId: 'admin', roomId};
        onSuccess = (data) => { // This is a callback that executes at post request success. i.e. data is the res.data returned by the server
            setPlayers(data.players.reverse());
            setIsLoading(false);
        }
        break;
    case "register-player" :
        const {
            name, 
            email, 
        } = vars;
        api += "register-player";
        dataparam = {name, email, noOfCards, roomId, userId: 'admin'};
        onSuccess = (data) => {
            makeRequest('get-player-all', {roomId})
            setIsLoading(false);
        };
        break;
    case "delete-player" :
        api += "delete-player";
        dataparam = {roomId, userId: 'admin', playerId};
        onSuccess = (data) => {
            makeRequest('get-player-all', {roomId})
            setIsLoading(false);
        };
        break;
    case "delete-card" :
        const {
            cardId
        } = vars;
        api += "delete-card";
        dataparam = {roomId, userId: 'admin', playerId, cardId};
        onSuccess = (data) => {
            makeRequest('get-player-all', {roomId})
            setIsLoading(false);
        };
        break;
    case "add-card" :
        api += "add-card";
        dataparam = {roomId, userId: 'admin', playerId, noOfCards};
        onSuccess = (data) => {
            makeRequest('get-player-all', {roomId})
            setIsLoading(false);
        };
        break;
      default:
    }
    if (req !== "" || typeof req !== "undefined") makePostRequest(req, api, dataparam, cookies.loginToken, onSuccess);
  };

  return [
    cards,
    players,
    isLoading,
    makeRequest,
  ];
}
