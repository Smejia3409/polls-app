import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
import { SessionContext } from "../components/Context";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const [userContext, setUserContext] = useState<any>(null);
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
      setUserContext(getSymbolCookie());
    } else {
      setUserContext(null);
    }
  };

  useEffect(() => {
    session_data();
    // if (getSymbolCookie()) {
    //   router.push("/home");
    // }
  }, [userContext]);

  return (
    <>
      <SessionContext.Provider value={[userContext, setUserContext]}>
        <Component {...pageProps} />
      </SessionContext.Provider>
    </>
  );
}
