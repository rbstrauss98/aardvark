import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function CreateBugModal(props) {
  const apiURL = process.env.REACT_APP_LOCAL_API_URL //use for developing
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);


  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  
  // Used on form submission
  const handleSubmit = ((event) => {
    event.preventDefault();
    console.log("Title: " + title);
    console.log("Description: " + description);


    // Create request object
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: title, description: description})
    };


    // Make api call and log response
    fetch(`${apiURL}/api/bugs/`, requestOptions)
      .then(response => {
        response = response.json()
        response.then((result)=>{
          console.log(result)
          props.addBug(result)
          onCloseModal()
        })
      })

  });


  return (
    <div>
      <Button onClick={onOpenModal} variant="outline-success">Create Bug 🐜</Button>{' '}
      {/* <button onClick={onOpenModal}>Create Bug</button> */}
      <Modal open={open} onClose={onCloseModal} center>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicTitle">
              <Form.Label>Enter Title of Bug</Form.Label>
              <Form.Control type="text" placeholder="Bug" onChange={(event) => setTitle(event.target.value)} />
              <Form.Text className="text-muted">
                Use a descriptive name
              </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" placeholder="Description" onChange={(event) => setDescription(event.target.value)}/>
          </Form.Group>

          <Button variant="primary" type="submit" value="Submit">
              Submit
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateBugModal