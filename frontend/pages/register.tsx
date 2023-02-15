import React from "react";
import Header from "../components/Header";
import Register from "../components/Register";
import { Container } from "react-bootstrap";

const register = () => {
  return (
    <Container>
      <Header />
      <Register />
    </Container>
  );
};

export default register;
