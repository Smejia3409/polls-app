import React, { useContext, useEffect } from "react";
import { SessionContext } from "../components/Context";

import Header from "../components/Header";
import CreatePoll from "../components/CreatePoll";

import MyPolls from "../components/MyPolls";
import Loading from "../components/Loading";
import { IPoll } from "../jsfiles/interfaces";
import { getCookie } from "../jsfiles/cookies";

const home = (props: { data: [IPoll] }) => {
  const [userContext, setUserContext] = useContext(SessionContext);

  const contextData = JSON.parse(userContext);

  useEffect(() => {
    if (!contextData) {
      setUserContext(getCookie("user_data"));
    }
  }, [contextData, props.data]);

  return <>{!contextData ? <Loading /> : <ActiveUser data={props.data} />}</>;
};

const ActiveUser = (props: { data: [IPoll] }) => {
  useEffect(() => {
    console.log(props.data);
  }, [props.data, SessionContext]);
  return (
    <>
      <Header />

      <div className=" ">
        <br />
        <CreatePoll />
      </div>

      <div>
        <MyPolls list={props.data} />
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:5000/poll/getPolls`);
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data }, // will be passed to the page component as props
  };
}

export default home;
