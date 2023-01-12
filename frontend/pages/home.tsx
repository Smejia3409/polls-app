import React from "react";
import Header from "../components/Header";
import CreatePoll from "../components/CreatePoll";

const home = () => {
  return (
    <>
      <Header />

      <div>
        <CreatePoll />
      </div>
    </>
  );
};

export default home;
