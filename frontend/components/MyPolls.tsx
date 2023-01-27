import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { IPoll, IpollAns } from "../jsfiles/interfaces";
import axios from "axios";

const MyPolls = (props: { list: [IPoll] }) => {
  const updatePoll = async (poll: IPoll) => {
    try {
      let data = await axios.put("http://localhost:5000/poll/addPoll", poll);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h4>My polls</h4>
      {props.list.map((poll: IPoll) => {
        let numOfAns = poll.answers.length;
        console.log(numOfAns);
        let pollCount = 0;

        return (
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>{poll.question}</Card.Title>
              <p>Votes: {pollCount}</p>

              {poll.answers.map((ans: IpollAns) => {
                let [count, setCount] = useState<number>(ans.count);
                pollCount = pollCount + ans.count;
                const [vote, setVote] = useState({
                  voteCount: ans.count,
                  totalVotes: numOfAns,
                });
                const myAns = () => {
                  poll.answers[ans.answerId].count++;
                  console.log(poll);
                  updatePoll(poll);
                  setCount(count + 1);
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
        );
      })}
    </div>
  );
};

export default MyPolls;

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
