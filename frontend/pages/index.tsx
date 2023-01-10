import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "../components/Login";
import Register from "../components/Register";
import Template from "../components/Template";
import { SessionContext } from "../components/Context";
import { useState, useContext, useEffect } from "react";

export default function Home() {
  const [data, setData] = useState<any>(null);
  function getSymbolCookie() {
    let cookie: any = {};
    document.cookie.split(";").forEach(function (el) {
      let [key, value] = el.split("=");
      cookie[key.trim()] = value;
    });
    return cookie["user_data"];
  }

  const session_data = () => {
    if (getSymbolCookie()) {
      setData(getSymbolCookie());
    } else {
      setData(null);
    }
  };

  useEffect(() => {
    session_data();
  }, [data]);

  return (
    <>
      <Head>
        <title>Easy Polls</title>
      </Head>
      <SessionContext.Provider value={data}>
        <Template childern={<Login />}></Template>
      </SessionContext.Provider>
    </>
  );
}
