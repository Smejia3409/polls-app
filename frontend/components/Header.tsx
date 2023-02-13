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
import Router, { useRouter } from "next/router";
import { delete_cookie } from "../jsfiles/cookies";

const Header = () => {
  const [userContext, setUserContext] = useContext<any>(SessionContext);
  const router = useRouter();

  const logoClick = () => {
    if (userContext) {
      router.push("/home");
    } else {
      router.push("/");
    }
  };

  return (
    <Container className="bg-light">
      <Navbar>
        <NavbarBrand
          onClick={() => {
            logoClick();
            console.log("logo clicked");
          }}
        >
          Easy Polls
        </NavbarBrand>

        <Navbar.Collapse className="justify-content-end">
          {userContext != null && <NavLogin />}
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};

const NavLogin = () => {
  // const UserContext = useContext<any>(SessionContext);
  let router = useRouter();

  interface IcontextChange {
    setContext: () => void;
  }

  const [userContext, setUserContext] = useContext(SessionContext);

  let data = JSON.parse(userContext);
  let user = data.username;

  const logout = () => {
    delete_cookie("user_data");
    router.push("/");
  };

  return (
    <>
      <NavDropdown title={user}>
        <NavDropdown.Item>
          <p
            className="text-danger"
            onClick={() => {
              logout();
              setUserContext(null);
            }}
          >
            Logout
          </p>
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );
};

export default Header;
