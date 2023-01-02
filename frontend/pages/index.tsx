import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "../components/Login";
import Register from "../components/Register";

export default function Home() {
  return (
    <>
      <Head>
        <title>Easy Polls</title>
      </Head>

      <Login />

      <br />

      <Register />
    </>
  );
}
