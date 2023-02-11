import React, { useEffect, useState, useContext } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { SessionContext } from "./Context";
import axios from "axios";
const uuidv4 = require("uuid");

function CreatePoll() {
  const UserContext = useContext<any>(SessionContext);

  let data = JSON.parse(UserContext);

  let id = uuidv4.v1();

  interface IAnswers {
    answerId: number;
    answer: string;
    count: number;
  }

  interface IPoll {
    question: string;
    answers: IAnswers[];
  }

  const [show, setShow] = useState<boolean>(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [answersList, setAnswersList] = useState<IAnswers[]>([]);
  const [answer, setAnswer] = useState<string>("");
  const [question, setQuestion] = useState<string>("");
  const [poll, setPoll] = useState<IPoll>();

  const addAnswer = (event: any) => {
    event.preventDefault();
    if (answer != "") {
      const res: IAnswers = {
        answerId: answersList.length,
        answer: answer,
        count: 0,
      };

      setAnswersList([...answersList, res]);
      setAnswer("");
    } else {
      alert("please dont leave input blank");
    }
  };

  const submitForm = async (event: any) => {
    event.preventDefault();
    try {
      if (answersList.length < 2) {
        alert("At least 2 responses are needed");
      } else {
        let pollObj = {
          id: id.toString(),
          question: question,
          answers: answersList,
          user: data.username,
        };

        await axios.put("http://localhost:5000/poll/addPoll", pollObj);

        handleClose();

        alert("Poll created");

        console.log(pollObj);

        setPoll(pollObj);
        setAnswer("");
        setAnswersList([]);
        setQuestion("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, [answersList, data]);

  return (
    <div className="container d-flex flex-row-reverse">
      <Button variant="primary" onClick={handleShow}>
        Create Poll
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form>
          <Modal.Header closeButton>
            <Form.Label>Create poll</Form.Label>
          </Modal.Header>

          <Modal.Body>
            <Form.Group className="mb-3" controlId="question">
              <Form.Label>Question</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="answer">
              <Form.Control
                type="text"
                placeholder="Enter a response"
                value={answer}
                onChange={(e) => {
                  setAnswer(e.target.value);
                }}
              />
              <Button onClick={addAnswer}>Add</Button>
            </Form.Group>

            {answersList.map((a: IAnswers) => {
              return (
                <div key={a.answerId + a.answer} className="row">
                  <div className="col-9">
                    <p>{a.answer}</p>
                  </div>
                  <div className="col">
                    <Button
                      variant="danger"
                      onClick={() => {
                        let deleted = answersList.filter(
                          (ans) =>
                            a.answerId + ans.answer != a.answerId + a.answer
                        );
                        setAnswersList(deleted);
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              );
            })}
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={submitForm}>
              Create poll
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default CreatePoll;
