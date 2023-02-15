import React, { useState } from "react";
import { Container, Nav } from "react-bootstrap";
import Login from "../components/Login";
import Register from "../components/Register";
import Header from "../components/Header";

const signin = () => {
  const [userForm, setUserForm] = useState<boolean>(false);

  return (
    <>
      <Header />;
      <Container>
        <Nav justify variant="tabs">
          <Nav.Item>
            <Nav.Link
              onClick={() => {
                setUserForm(true);
              }}
            >
              Login
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              onClick={() => {
                setUserForm(false);
              }}
            >
              Register
            </Nav.Link>
          </Nav.Item>
        </Nav>

        {userForm ? <Login /> : <Register />}
      </Container>
    </>
  );
};

export default signin;
