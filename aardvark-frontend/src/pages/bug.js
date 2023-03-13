import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import { useParams } from 'react-router-dom'
import AddCommentModal from '../components/Modal/AddCommentModal';
import EditBugModal from '../components/Modal/EditBugModal';
import Button from 'react-bootstrap/Button';

const BugPage = () => {
  const apiURL = process.env.REACT_APP_LOCAL_API_URL //use for developing
  const { id } = useParams();
  const [bug, setBug] = useState({});

  function updateBug(newTitle, newDescription) {
    setBug({
      ...bug,
      title: newTitle, 
      description: newDescription
    });
  }

  function deleteBug(event){
    //this does successfully delete the bug
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    };

    // Make api call and log response
    fetch(`${apiURL}/api/bugs/${bug.id}`, requestOptions)
      .then(response => console.log(response.text()))

    //once bug is deleted, we need to route back to home page
    //fixme: is this good practice?
    window.location.href = "http://localhost:3000/";

  }

  function addComment(newComment){ //pass in the new comment as an object
    setBug({
      ...bug,
      comments: [...bug.comments, newComment]
      
    });
  }

  useEffect(() => {
    const fetchBug = async () => {
      const response = await fetch(`${apiURL}/api/bugs/${id}`);
      const bug = await response.json();
      setBug(bug);
    };
    fetchBug();
  }, [id]);

  return (
    <Container>
      <h1 className="my-4">{bug.title}</h1>
      <p>{bug.description}</p>
      <img src={bug.image} alt={bug.title} />
      <Row className="my-3">
        <Col xs="auto">
          <EditBugModal title={bug.title} description={bug.description} bugID={bug.id} updateBug={updateBug}></EditBugModal>
        </Col>
        <Col xs="auto">
          <Button variant="outline-danger" onClick={(event) => deleteBug(event)}>Delete bug</Button>
        </Col>
        <Col style={{textAlign: "right"}}>
          <AddCommentModal bugID={bug.id} addComment={addComment}></AddCommentModal>
        </Col>
      </Row>
      <Row>
        {bug.comments && bug.comments.map(comment => (
            <Col xs={12} key={comment.text}>
            {comment.isSolution ? (
              <div>Solution: {comment.text}</div>
            ) : (
              <div>Comment: {comment.text}</div>
            )}
          </Col>
        ))}
      </Row>
    </Container>
  );
}
 
export default BugPage;