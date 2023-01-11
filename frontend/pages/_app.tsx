import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
import { SessionContext } from "../components/Context";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const [data, setData] = useState<any>(null);
  const router = useRouter();

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
    if (getSymbolCookie()) {
      router.push("/home");
    }
  }, [data]);

  return (
    <>
      <SessionContext.Provider value={data}>
        <Component {...pageProps} />;
      </SessionContext.Provider>
    </>
  );
}
