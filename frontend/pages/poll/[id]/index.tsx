import { useRouter } from "next/router";
import React from "react";

const poll = (data: any) => {
  const router = useRouter();
  const { id } = router.query;

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
