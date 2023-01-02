import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const Login = () => {
  interface IloginCred {
    email: string;
    password: string;
  }

  const [loginCred, setLoginCred] = useState<IloginCred>({
    email: "",
    password: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(loginCred);
  };

  return (
    <>
      <h3>Login</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Email"
            value={loginCred.email}
            onChange={(e) => {
              setLoginCred({ ...loginCred, email: e.target.value });
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={loginCred.password}
            onChange={(e) => {
              setLoginCred({ ...loginCred, password: e.target.value });
            }}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </>
  );
};

export default Login;
