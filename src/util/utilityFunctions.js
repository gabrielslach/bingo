import axios from "axios";

//API URL
let WEB_SERVER_URL;
if (
  window.location.protocol === "https:" ||
  window.location.hostname === "sdddev2.treasury.gov.ph"
)
  WEB_SERVER_URL = "http://sdddev2.treasury.gov.ph:3449/"; //TODO
else WEB_SERVER_URL = "http://172.20.13.114:3449/";

const WEB_SERVER_API_URL = WEB_SERVER_URL + "api/";

export const postRequest = (action, dataParameters, loginToken) => {
    return axios({
      method: "post",
      url: WEB_SERVER_URL + action,
      data: dataParameters,
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + loginToken,
      },
    });
  };