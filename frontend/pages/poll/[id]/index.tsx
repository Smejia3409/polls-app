import { useRouter } from "next/router";
import React, { useState } from "react";
import { IPoll, IpollAns } from "../../../jsfiles/interfaces";
import axios from "axios";
import { Button, Card, Row } from "react-bootstrap";
import PollCard from "../../../components/PollCard";
import Graph from "../../../components/Graph";

const poll = (data: any) => {
  const router = useRouter();
  const { id } = router.query;
  const [view, setView] = useState<boolean>(false);

  let poll: IPoll = data.data[0];
  // if (data.id) {
  //   console.log(1);
  // } else {
  //   console.log(0);
  // }
  const [voteCount, setVoteCount] = useState<number>(0);
  let num = 0;
  poll.answers.forEach((count) => {
    num = num + count.count;
  });

  const updatePoll = async (poll: IPoll) => {
    try {
      let data = await axios.put("http://localhost:5000/poll/addPoll", poll);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      {/* <p> This is poll page {id}</p>
      <p>{num}</p> */}

      <Card>
        <Card.Body>
          <Card.Title>{poll.question}</Card.Title>
          {poll.answers.map((question: IpollAns) => {
            return (
              <Row>
                <Card.Text>{question.answer}</Card.Text>
                {view && (
                  <Card.Text>
                    {((question.count / num) * 100).toFixed(0)}%
                  </Card.Text>
                )}
                {!view && (
                  <Button
                    style={{ width: "19rem" }}
                    onClick={() => {
                      setView(true);
                      poll.answers[question.answerId].count++;
                      num++;
                      updatePoll(poll);
                    }}
                  >
                    Vote
                  </Button>
                )}
              </Row>
            );
          })}
        </Card.Body>
      </Card>
      {/* <PollCard key={poll.id} list={data.data} /> */}

      {view && <Graph poll={poll} />}
    </div>
  );
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
