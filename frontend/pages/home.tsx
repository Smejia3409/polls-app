import React, { useContext, useEffect } from "react";
import { SessionContext } from "../components/Context";

import Header from "../components/Header";
import CreatePoll from "../components/CreatePoll";
import axios from "axios";
import { Button, Card } from "react-bootstrap";
import MyPolls from "../components/MyPolls";

const home = ({ data }) => {
  // let myPolls = data.filter((poll: any) => {
  //   return poll.user ===
  // });

  const UserContext = useContext<any>(SessionContext);
  const username = JSON.parse(UserContext);

  console.log(data);

  useEffect(() => {
    console.log(username);
  });

  return (
    <>
      <Header />

      <div>
        <CreatePoll />
      </div>

      <div>
        <MyPolls list={data} />
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
