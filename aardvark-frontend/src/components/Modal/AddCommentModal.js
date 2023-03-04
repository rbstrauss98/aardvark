import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

//fixme: the comment doesn't appear in the list until refresh

function AddCommentModal(props) {

  const apiURL = process.env.REACT_APP_LOCAL_API_URL //use for developing
  const [open, setOpen] = useState(false); 

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const [title, setTitle] = useState("");

  // Used on form submission
  const handleSubmit = ((event) => {
    event.preventDefault();
    console.log("Title: " + title)


    // Create request object
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: title})
    };



    // Make api call and log response
    fetch(`${apiURL}/api/bugs/${props.bugID}/comment`, requestOptions)
      .then(response => console.log(response.json()))

      //fixme: how to get the new comment? it's in the promiseResult!

      //fixme: this works bc title is the only thing we're displaying, but
          //make this not hardcoded:
      let newComment = {
        "id": 99,
        "text": title,
        "isSolution": 0,
        "createdAt": "2023-02-13T23:21:46.109Z",
        "updatedAt": "2023-02-13T23:21:46.109Z",
        "bugId": 1
      }
      props.addComment(newComment);
  });


 //fixme: how to make the width bigger??

  return (
    <div>
      <button onClick={onOpenModal}>Add Comment</button>
      <Modal open={open} onClose={onCloseModal} center>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicTitle">
              <Form.Label>Enter your solution</Form.Label>
              <Form.Control type="text" placeholder="Write something that solves the bug"
			   onChange={(event) => setTitle(event.target.value)} />
          </Form.Group>

          <Button variant="primary" type="submit">
              Submit
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default AddCommentModal