import React, { useState } from "react";
import { useAuthentication } from "../firebase/AuthContext";

import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap/dist/css/bootstrap.css";
import { Alert } from "react-bootstrap";

const SocialSignIn = () => {
  const [error, setError] = useState("");
  const { doSocialSignIn } = useAuthentication();

  const signInWithProvider = async (provider) => {
    try {
      await doSocialSignIn(provider);
    } catch {
      setError("Failed to Sign In with social account");
    }
  };

  return (
    <div className="mb-1 mt-2 text-center">
      {error && <Alert variant="danger">{error}</Alert>}
      <img
        onClick={() => signInWithProvider("google")}
        alt="google_signin"
        src="/images/btn_google_signin.png"
      />
    </div>
  );
};

export default SocialSignIn;