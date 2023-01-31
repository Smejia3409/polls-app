import { useRouter } from "next/router";
import React from "react";
import { IPoll } from "../../../jsfiles/interfaces";

const poll = (data: [IPoll]) => {
  const router = useRouter();
  const { id } = router.query;

  console.log(data);

  return <div>This is poll page {id}</div>;
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
export default poll;
