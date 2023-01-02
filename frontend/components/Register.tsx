import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const Register = () => {
  interface IRegisterCred {
    email: string;
    password: string;
  }

  const [registerCred, setRegisterCred] = useState<IRegisterCred>({
    email: "",
    password: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(registerCred);
  };

  return (
    <>
      <h3>Register</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Email"
            value={registerCred.email}
            onChange={(e) => {
              setRegisterCred({ ...registerCred, email: e.target.value });
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={registerCred.password}
            onChange={(e) => {
              setRegisterCred({ ...registerCred, password: e.target.value });
            }}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </>
  );
};

export default Register;
