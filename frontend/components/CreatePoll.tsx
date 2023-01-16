import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function CreatePoll() {
  interface IAnswers {
    id: number;
    anwser: string;
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
        id: answersList.length,
        anwser: answer,
        count: 0,
      };

      setAnswersList([...answersList, res]);
      setAnswer("");
    } else {
      alert("please dont leave input blank");
    }
  };

  const submitForm = (event: any) => {
    event.preventDefault();
    if (answersList.length < 2) {
      alert("At least 2 responses are needed");
    } else {
      let pollObj = {
        question: question,
        answers: answersList,
      };
      handleClose();
      alert("Poll created");
      console.log(poll);
      setPoll(pollObj);
      setAnswer("");
      setAnswersList([]);
      setQuestion("");
    }
  };

  useEffect(() => {
    console.log("render");
  }, [answersList]);

  return (
    <>
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

            <Form.Group className="mb-3" controlId="anwser">
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
                <div key={a.id + a.anwser} className="row">
                  <div className="col-9">
                    <p>{a.anwser}</p>
                  </div>
                  <div className="col">
                    <Button
                      variant="danger"
                      onClick={() => {
                        let deleted = answersList.filter(
                          (ans) => ans.id + ans.anwser != a.id + a.anwser
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
    </>
  );
}

export default CreatePoll;
