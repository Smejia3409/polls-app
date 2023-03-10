import React, { useContext, useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

import { useRouter } from "next/navigation";
import { getCookie } from "../jsfiles/cookies";
import { SessionContext } from "./Context";

const Login = () => {
  const router = useRouter();
  const [userContext, setUserContext] = useContext(SessionContext);

  interface IloginCred {
    username: string;
    password: string;
  }

  const [loginCred, setLoginCred] = useState<IloginCred>({
    username: "",
    password: "",
  });

  const [status, setStatus] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      let login = await axios.post(
        "http://localhost:5000/user/login",
        loginCred
      );

      console.log("login successful");

      setLoginCred({
        username: "",
        password: "",
      });

      const user_data = login.data.accessToken.payload;

      document.cookie = `user_data=${JSON.stringify(user_data)}`;
      sessionStorage.setItem("user_data", JSON.stringify(user_data));
      setUserContext(JSON.stringify(user_data));

      setStatus("");
      router.push("/home");
      console.log("Login successful");
    } catch (error) {
      setStatus("Invalid credentials, please try again");
      console.log(error);
    }
  };

  useEffect(() => {
    if (getCookie("user_data")) {
      router.push("/home");
    }
  });

  return (
    <>
      <h3>Login</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username or Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Username or Email"
            value={loginCred.username}
            onChange={(e) => {
              setLoginCred({ ...loginCred, username: e.target.value });
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

        <p className="text text-danger">{status}</p>
      </Form>
    </>
  );
};

export default Login;
