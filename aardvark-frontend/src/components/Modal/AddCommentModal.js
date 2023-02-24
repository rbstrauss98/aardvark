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
 //fixme: hardcoded to work for bug 1
    fetch(`${apiURL}/api/bugs/${props.bugID}/comment`, requestOptions)
      .then(response => console.log(response.json()))

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