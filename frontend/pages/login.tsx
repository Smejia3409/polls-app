import React, { useState } from "react";
import { Container, Nav } from "react-bootstrap";
import Login from "../components/Login";
import Register from "../components/Register";
import Header from "../components/Header";

const signin = () => {
  const [userForm, setUserForm] = useState<boolean>(false);

  return (
    <Container>
      <Header />
      <Login />
    </Container>
  );
};

export default signin;
