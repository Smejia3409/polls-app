import React, { useState } from "react";
import { IPoll, IpollAns } from "../jsfiles/interfaces";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Row, Col, Card, Button } from "react-bootstrap";

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
          let numOfAns = poll.answers.length;
          console.log(numOfAns);
          const [pollCount, setPollCount] = useState<number>(0);

          return (
            <Col sm={6} md={4}>
              <Card>
                <Card.Body>
                  <Row>
                    <Col sm={8}>
                      <Card.Title>{poll.question}</Card.Title>
                    </Col>
                    <Col sm={4}>
                      <Button
                        onClick={() => {
                          pollPage(poll.id);
                        }}
                      >
                        Graph
                      </Button>
                    </Col>
                  </Row>

                  <p>Votes: {pollCount}</p>

                  {poll.answers.map((ans: IpollAns) => {
                    let [count, setCount] = useState<number>(ans.count);
                    const [vote, setVote] = useState({
                      voteCount: ans.count,
                      totalVotes: numOfAns,
                    });
                    const myAns = () => {
                      poll.answers[ans.answerId].count++;
                      console.log(poll);
                      updatePoll(poll);
                      setCount(count + 1);
                      setPollCount(pollCount + ans.count);
                    };

                    return (
                      <div className="row" key={ans.answer}>
                        <Button className="btn btn-success col" onClick={myAns}>
                          {ans.answer}
                        </Button>
                        <Card.Text className="col">{count}</Card.Text>
                        <br />
                      </div>
                    );
                  })}
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default PollCard;
