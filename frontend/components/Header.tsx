import React, { useContext } from "react";

import { Container, Nav, Navbar, NavbarBrand } from "react-bootstrap";
import { SessionContext } from "./Context";

const Header = () => {
  const UserContext = useContext<any>(SessionContext);
  return (
    <div className="bg-light">
      <Navbar>
        <NavbarBrand href="/">Easy Polls</NavbarBrand>
        <Container>{UserContext != null && <NavLogin />}</Container>
      </Navbar>
    </div>
  );
};

const NavLogin = () => {
  return <Nav.Link>Home</Nav.Link>;
};

export default Header;
