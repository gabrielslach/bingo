import axios from "axios";

//API URL
let WEB_SERVER_URL;
if (
  window.location.protocol === "https:" ||
  window.location.hostname === "sdddev2.treasury.gov.ph"
)
  WEB_SERVER_URL = "https://us-central1-bingo-project-2c67d.cloudfunctions.net/app/";
//TODO
else WEB_SERVER_URL = "https://us-central1-bingo-project-2c67d.cloudfunctions.net/app/";

const WEB_SERVER_API_URL = WEB_SERVER_URL + "api/";

export const postRequest = (action, dataParameters, loginToken) => {
  return axios({
    method: "post",
    url: WEB_SERVER_URL + action,
    data: dataParameters,
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + loginToken,
    },
  });
};
