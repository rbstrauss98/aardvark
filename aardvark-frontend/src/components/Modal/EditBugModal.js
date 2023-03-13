import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function EditBugModal(props) {
  const apiURL = process.env.REACT_APP_LOCAL_API_URL //use for developing
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  function openModal(){
	onOpenModal()
	setTitle(props.title);
	setDescription(props.description);
  }


  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  
  // Used on form submission
  const handleSubmit = ((event) => {
	event.preventDefault();

	if (props.title == title && props.description == description){
		//fixme: is this the behavior we want when they don't change the title or description??
		onCloseModal();
		return;
	}


    console.log("Title: " + title);
    console.log("Description: " + description);


    // Create request object
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: title, description: description})
    };


    // Make api call and log response
    fetch(`${apiURL}/api/bugs/${props.bugID}`, requestOptions)
      .then(response => console.log(response.text()))

	//fix me check if the call was successful before doing this:
	props.updateBug(title, description);

    // Close modal (there might be a better way to do this)
    onCloseModal();

    // Insert call/emit event to parent copmenont (bug compenent) to
    //    make an api call to the db.
    // use effect

  });


  return (
    <div>
      <Button onClick={openModal} variant="outline-success">Edit Bug 🐜</Button>{' '}
      {/* <button onClick={onOpenModal}>Create Bug</button> */}
      <Modal open={open} onClose={onCloseModal} center>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicTitle">
              <Form.Label>Enter Title of Bug</Form.Label>
              <Form.Control type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
              <Form.Text className="text-muted">
                Use a descriptive name
              </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" value={description} onChange={(event) => setDescription(event.target.value)}/>
          </Form.Group>

          <Button variant="primary" type="submit" value="Submit">
              Submit
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default EditBugModal


//fixme: modal flashes when closing