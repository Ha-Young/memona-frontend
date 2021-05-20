import { useState } from "react";

import config from "../config";
import { deleteCookie, getCookie, saveCookie } from "../utils/cookieController";

function useToken() {
  const [token, setToken] = useState(getCookie(config.tokenKey));

  function saveToken(accessToken) {
    localStorage.setItem(config.tokenKey, JSON.stringify(accessToken));

    saveCookie(config.tokenKey, accessToken, config.tokenExpiryDay);
    setToken(accessToken);
  }

  function deleteToken() {
    deleteCookie(config.tokenKey);
  }

  return {
    setToken: saveToken,
    token,
    deleteToken,
  };
}

export default useToken;
