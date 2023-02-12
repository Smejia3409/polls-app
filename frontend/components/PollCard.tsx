import React, { useState } from "react";
import { IPoll, IpollAns } from "../jsfiles/interfaces";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Row, Col, Card, Button, Accordion } from "react-bootstrap";

const PollCard = (props: { list: [IPoll] }) => {
  const router = useRouter();

  const updatePoll = async (poll: IPoll) => {
    try {
      let data = await axios.put("http://localhost:5000/poll/addPoll", poll);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  //redirect to poll page using poll id
  const pollPage = (id: string) => {
    router.push(`/poll/${id}`);
  };

  return (
    <div className="container">
      <h4>My polls</h4>
      <Row>
        {props.list.map((poll: IPoll) => {
          //gets sum of poll votes
          let count = poll.answers.reduce((sum: number, amount: IpollAns) => {
            return sum + amount.count;
          }, 0);

          return (
            <AccordianPoll title={poll.question} id={poll.id} count={count} />
          );
        })}
      </Row>
    </div>
  );
};

const AccordianPoll = (props: { title: string; id: string; count: number }) => {
  const router = useRouter();

  const pollPage = (id: string) => {
    router.push(`/poll/${id}`);
  };

  const deletePoll = (id: string) => {
    try {
      const deletedPoll = axios.delete(
        `http://localhost:5000/poll/deletepoll/${id}`
      );

      console.log(deletedPoll);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Accordion defaultActiveKey="0" key={props.id}>
      <Accordion.Item eventKey="1">
        <Accordion.Header>{props.title}</Accordion.Header>
        <Accordion.Body>
          <div className="">
            <p> Votes: {props.count}</p>
          </div>
          <div className="d-flex flex-row-end">
            <Button
              onClick={() => {
                pollPage(props.id);
              }}
            >
              Public view
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                deletePoll(props.id);
              }}
            >
              Delete
            </Button>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default PollCard;
