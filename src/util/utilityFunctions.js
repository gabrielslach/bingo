import axios from "axios";

//API URL
let WEB_SERVER_URL;
if (
  window.location.protocol === "https:" ||
  window.location.hostname === "bingo.gabrielslach.me"
) {
    WEB_SERVER_URL = window.location.origin;
  }
else {
  WEB_SERVER_URL = "http://localhost:5000"
  };

const WEB_SERVER_API_URL = WEB_SERVER_URL + "/api/";

export const postRequest = (action, dataParameters, loginToken) => {
  return axios({
    method: "post",
    url: WEB_SERVER_API_URL + action,
    data: dataParameters,
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + loginToken,
    },
  });
};
