import React, { useContext, useEffect } from "react";
import { SessionContext } from "../components/Context";

import Header from "../components/Header";
import CreatePoll from "../components/CreatePoll";
import axios from "axios";

const home = ({ data }) => {
  // let myPolls = data.filter((poll: any) => {
  //   return poll.user ===
  // });

  const UserContext = useContext<any>(SessionContext);
  const username = JSON.parse(UserContext);

  console.log(data);

  return (
    <>
      <Header />

      <div>
        <CreatePoll />
      </div>

      <div>
        {data.map((poll: any) => {
          return <p>{poll.user}</p>;
        })}
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
