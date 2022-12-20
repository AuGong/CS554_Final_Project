import React, { useState, useRef } from "react";
import { useAuthentication } from "../firebase/AuthContext";
import { Navigate } from "react-router-dom";

import { Form, Button, Card, Alert } from "react-bootstrap";

const ChangePassword = () => {
  const [error, setError] = useState("");
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();
  const newPasswordConfirmRef = useRef();
  const { currentUser, doChangePassword } = useAuthentication();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPasswordRef.current.value !== newPasswordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      await doChangePassword(
        currentUser.email,
        oldPasswordRef.current.value,
        newPasswordRef.current.value,
      );
    } catch {
      setError("Failed to Change the Password");
    }
  };

  if (!currentUser) {
    return <Navigate to="/signin" />;
  }

  return (
    <div className="w-100" style={{ maxWidth: "450px" }}>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Change Password</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleChangePassword}>
            <Form.Group id="old-password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={oldPasswordRef} required />
            </Form.Group>
            <Form.Group id="new-password">
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password" ref={newPasswordRef} required />
            </Form.Group>
            <Form.Group id="new-password-confirm">
              <Form.Label>Repeat your new password</Form.Label>
              <Form.Control
                type="password"
                ref={newPasswordConfirmRef}
                required
              />
            </Form.Group>
            <Button className="w-100" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ChangePassword;
