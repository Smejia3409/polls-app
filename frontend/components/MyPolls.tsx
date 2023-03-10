import React, { useState, useContext, useEffect } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { IPoll, IpollAns } from "../jsfiles/interfaces";
import { SessionContext } from "../components/Context";
import { useRouter } from "next/navigation";

import axios from "axios";
import Loading from "./Loading";
import PollCard from "./PollCard";

const MyPolls = (props: { list: [IPoll] }) => {
  const [userContext, setUserContext] = useContext<any>(SessionContext);

  let data = JSON.parse(userContext);
  let list: any = [];

  if (data) {
    list = props.list.filter((poll: IPoll) => {
      return poll.user === data.username;
    });
  } else {
    console.log("no user polls");
    console.log(data);
  }

  useEffect(() => {}, [list]);

  return <>{!list ? <Loading /> : <PollCard list={list} />}</>;
};

export default MyPolls;
