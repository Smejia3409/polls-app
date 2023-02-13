import Head from "next/head";
import Login from "../components/Login";
import Register from "../components/Register";
import Template from "../components/Template";
import { SessionContext } from "../components/Context";
import { useState, useContext, useEffect } from "react";
import { Col, Container, Nav, Row } from "react-bootstrap";
import Header from "../components/Header";
import { useRouter } from "next/navigation";

export default function Home() {
  return (
    <Container className="h-100">
      <Head>
        <title>Easy Polls</title>
      </Head>
      <Header />
      <Row className="">
        <Col xs={12} sm={7} md={7} lg={7}>
          <div className="d-flex justify-content-center align-items-center h-100">
            <h1>
              Easy polls <br />{" "}
              <small>Making you cast your question easy</small>
            </h1>
          </div>
        </Col>
        <Col
          xs={12}
          sm={5}
          md={5}
          lg={5}
          className=""
          style={{ height: "30rem" }}
        >
          <Container>
            <StartPage />
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

const StartPage = () => {
  const [userForm, setUserForm] = useState<boolean>(false);

  return (
    <Container>
      <Nav justify variant="tabs">
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setUserForm(true);
            }}
          >
            Sigin
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
  );
};
