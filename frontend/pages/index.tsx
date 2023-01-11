import Head from "next/head";
import Login from "../components/Login";
import Register from "../components/Register";
import Template from "../components/Template";
import { SessionContext } from "../components/Context";
import { useState, useContext, useEffect } from "react";
import { Container, Nav } from "react-bootstrap";
import Header from "../components/Header";
import { useRouter } from "next/navigation";

export default function Home() {
  return (
    <>
      <Head>
        <title>Easy Polls</title>
      </Head>
      <Header />
      <StartPage />
    </>
  );
}

const StartPage = () => {
  const [userForm, setUserForm] = useState<boolean>(false);

  return (
    <>
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
    </>
  );
};
