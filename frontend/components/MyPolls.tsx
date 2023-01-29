import React, { useState, useContext, useEffect } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { IPoll, IpollAns } from "../jsfiles/interfaces";
import { SessionContext } from "../components/Context";

import axios from "axios";
import Loading from "./Loading";

const MyPolls = (props: { list: [IPoll] }) => {
  const UserContext = useContext<any>(SessionContext);

  let data = JSON.parse(UserContext);

  return (
    <>{!data ? <Loading /> : <UserPolls list={props.list} data={data} />}</>
  );
};

export default MyPolls;

const UserPolls = (props: { list: [IPoll]; data: any }) => {
  let myPolls: IPoll[] = [];

  if (props.data) {
    myPolls = props.list.filter((poll) => {
      return poll.user === props.data.username;
    });
  }

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
      <h4>My polls</h4>
      <Row>
        {myPolls.map((poll: IPoll) => {
          let numOfAns = poll.answers.length;
          console.log(numOfAns);
          const [pollCount, setPollCount] = useState<number>(0);

          return (
            <Col sm={6} md={4}>
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>{poll.question}</Card.Title>
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

// {
//   data.map((poll: any) => {
//     let numOfAns = poll.answers.length;
//     console.log(numOfAns);

//     return (
//       <Card style={{ width: "18rem" }}>
//         <Card.Body>
//           <Card.Title>{poll.question}</Card.Title>
//           {poll.answers.map((ans: any) => {
//             const myAns = () => {
//               console.log(ans.anwser);
//             };
//             return (
//               <div className="row" key={ans.anwser}>
//                 <Button className="btn btn-success col" onClick={myAns}>
//                   {ans.anwser}
//                 </Button>
//                 <Card.Text className="col">
//                   {ans.count / numOfAns}
//                 </Card.Text>
//                 <br />
//               </div>
//             );
//           })}
//         </Card.Body>
//       </Card>
//     );
//   });
// }
