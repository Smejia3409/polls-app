import { useRouter } from "next/router";
import React from "react";
import { IPoll } from "../../../jsfiles/interfaces";
import axios from "axios";

const poll = (data: [IPoll]) => {
  console.log(data);
  const router = useRouter();
  const { id } = router.query;

  return <div>This is poll page {id}</div>;
};

export async function getServerSideProps(context: any) {
  const { id } = context.query;
  const res = await fetch(`http://localhost:5000/poll/selectedpoll/${id}`);

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
export default poll;
