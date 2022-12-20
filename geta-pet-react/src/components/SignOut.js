import React from "react";
import { useAuthentication } from "../firebase/AuthContext";
import { Navigate } from "react-router-dom";

import { Button } from "react-bootstrap";

const SignOutButton = () => {
  const { currentUser, doSignOut } = useAuthentication();

  if (!currentUser) {
    return <Navigate to="/signin" />;
  }

  return (
    <div>
      <p>Really want to leave? </p>
      <p>Press the Sign Out button</p>
      <Button type="button" onClick={doSignOut}>
        Sign Out
      </Button>
    </div>
  );
};

export default SignOutButton;
