import React from "react";
import GoogleLogin from "react-google-login";

const GoogleLoginButton = ({ onSuccess, onFailure }) => {
  function handleLoginSuccess(data) {
    onSuccess({
      token: data.tokenObj.id_token,
      type: "google",
    });
  }

  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      buttonText="Log in with Google"
      onSuccess={handleLoginSuccess}
      onFailure={onFailure}
    />
  );
};

export default GoogleLoginButton;
