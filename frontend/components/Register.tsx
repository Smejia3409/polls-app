import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { getCookie } from "../jsfiles/cookies";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();

  interface IRegisterCred {
    email: string;
    username: string;
    password: string;
  }

  const [registerCred, setRegisterCred] = useState<IRegisterCred>({
    email: "",
    username: "",
    password: "",
  });

  const [status, setStatus] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await axios.post("http://localhost:5000/user/signup", registerCred);

      console.log("registration successful");
      setRegisterCred({
        email: "",
        username: "",
        password: "",
      });
    } catch (error: any) {
      console.log(error.response.data.data.code);
      if (error.response.data.data.code === "UsernameExistsException") {
        setStatus("This username is already in use");
      }
    }
  };

  useEffect(() => {
    if (getCookie("user_data")) {
      router.push("/home");
    }
  });

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

        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Password"
            value={registerCred.username}
            onChange={(e) => {
              setRegisterCred({ ...registerCred, username: e.target.value });
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
        <p className="text text-danger">{status}</p>
      </Form>
    </>
  );
};

export default Register;
