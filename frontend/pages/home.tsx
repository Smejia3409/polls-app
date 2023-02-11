import React, { useContext, useEffect } from "react";
import { SessionContext } from "../components/Context";

import Header from "../components/Header";
import CreatePoll from "../components/CreatePoll";
import axios from "axios";
import { Button, Card } from "react-bootstrap";
import MyPolls from "../components/MyPolls";
import Loading from "../components/Loading";
import { IPoll } from "../jsfiles/interfaces";

const home = (props: { data: [IPoll] }) => {
  // let myPolls = data.filter((poll: any) => {
  //   return poll.user ===
  // });

  const UserContext = useContext<any>(SessionContext);
  const contextData = JSON.parse(UserContext);

  console.log(contextData);

  useEffect(() => {
    console.log(contextData);
  }, [contextData]);

  return <>{!contextData ? <Loading /> : <ActiveUser data={props.data} />}</>;
};

const ActiveUser = (props: { data: [IPoll] }) => {
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
