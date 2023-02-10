import React, { useContext } from "react";

import {
  Container,
  Dropdown,
  Nav,
  NavDropdown,
  Navbar,
  NavbarBrand,
} from "react-bootstrap";
import { SessionContext } from "./Context";
import { useRouter } from "next/router";

const Header = () => {
  const UserContext = useContext<any>(SessionContext);
  const router = useRouter();

  if (UserContext === null) {
  }

  return (
    <Container className="bg-light">
      <Navbar expand="lg">
        <NavbarBrand href="/">Easy Polls</NavbarBrand>

        <Navbar.Collapse className="justify-content-end">
          {UserContext != null && <NavLogin />}
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};

const NavLogin = () => {
  const UserContext = useContext<any>(SessionContext);

  let data = JSON.parse(UserContext);
  let user = data.username;

  return (
    <>
      <NavDropdown title={user}>
        <NavDropdown.Item>
          <p className="text-danger">Log Out</p>
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );
};

export default Header;
