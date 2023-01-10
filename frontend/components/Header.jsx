import React from "react";
import Nav from "react-bootstrap/Nav";

const Header = () => {
  return (
    <div className="bg-light">
      <Nav justify variant="tabs" defaultActiveKey="/">
        <p>header</p>
        <Nav.Item>
          <Nav.Link href="/">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/">Test</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default Header;
