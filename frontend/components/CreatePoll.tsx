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

  const [show, setShow] = useState<boolean>(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [answersList, setAnswersList] = useState<IAnswers[]>([]);
  const [answer, setAnswer] = useState<string>("");
  const [question, setQuestion] = useState<string>("");

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
                placeholder="Enter a answer"
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
            <Button variant="primary" onClick={handleClose}>
              Create poll
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default CreatePoll;
