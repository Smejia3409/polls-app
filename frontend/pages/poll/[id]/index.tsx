import React, { useEffect, useState } from "react";
import { IPoll, IpollAns } from "../../../jsfiles/interfaces";
import axios from "axios";
import { Button, Card, Col, Row } from "react-bootstrap";
import PollCard from "../../../components/PollCard";
import Graph from "../../../components/Graph";
import { useRouter } from "next/router";

const poll = (data: any) => {
  const router = useRouter();

  const [view, setView] = useState<boolean>(false);

  let poll: IPoll = data.data[0];

  let num = 0;

  if (!poll) {
    console.log("No poll");
  } else {
    poll.answers.forEach((count) => {
      num = num + count.count;
    });
    console.log("Poll is there");
  }

  const updatePoll = async (poll: IPoll) => {
    try {
      let data = await axios.put("http://localhost:5000/poll/addPoll", poll);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (poll.question == null) {
      router.push("/home");
    }
  }, [poll]);

  return (
    <div className="container h-100">
      {/* <p> This is poll page {id}</p>
      <p>{num}</p> */}

      <Card>
        <Card.Body>
          <Card.Title>{poll.question}</Card.Title>
          {poll.answers.map((question: IpollAns) => {
            return (
              <Row>
                <Col md={2}>
                  <Card.Text>{question.answer}</Card.Text>
                </Col>
                {/* {view && (
                  <Card.Text>
                    {((question.count / num) * 100).toFixed(0)}%
                  </Card.Text>
                )} */}
                {!view && (
                  <Col md={2}>
                    <Button
                      style={{ width: "100%" }}
                      onClick={() => {
                        setView(true);
                        poll.answers[question.answerId].count++;
                        num++;
                        updatePoll(poll);
                      }}
                    >
                      Vote
                    </Button>
                  </Col>
                )}

                <Col md={10}>
                  {view && (
                    <DivBar
                      percent={((question.count / num) * 100).toFixed(0)}
                    />
                  )}
                </Col>
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

const DivBar = (props: { percent: string }) => {
  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          backgroundColor: "blue",
          width: props.percent + "%",
          color: "white",
        }}
      >
        {props.percent}%
      </div>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const { id } = context.query;
  const res = await fetch(`http://localhost:5000/poll/selectedpoll/${id}`);
  const data = await res.json();

  if (data[0] === undefined) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data }, // will be passed to the page component as props
  };
}
export default poll;
