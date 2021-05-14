import { useState } from "react";

import config from "../config";
import { deleteStorage, getStorage, saveStorage } from "../utils/localStorage";

function useToken() {
  const [token, setToken] = useState(getStorage(config.tokenKey));

  function saveToken(accessToken) {
    localStorage.setItem(config.tokenKey, JSON.stringify(accessToken));

    saveStorage(config.tokenKey, accessToken);
    setToken(accessToken);
  }

  function deleteToken() {
    deleteStorage(config.tokenKey);
  }

  return {
    setToken: saveToken,
    token,
    deleteToken,
  };
}

export default useToken;
