import { useState } from "react";

export default function useToken() {
  const [token, setToken] = useState(getToken());

  function getToken() {
    const tokenString = localStorage.getItem("authorization"); // todo. key값 바꾸기? .env로?
    const accessToken = JSON.parse(tokenString);

    return accessToken;
  }

  function saveToken(accessToken) {
    localStorage.setItem("authorization", JSON.stringify(accessToken));

    setToken(accessToken);
  }

  function deleteToken() {
    localStorage.removeItem("authorization");
  }

  return {
    setToken: saveToken,
    token,
    deleteToken,
  };
}
