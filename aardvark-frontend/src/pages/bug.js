import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import { useParams } from 'react-router-dom'
import AddCommentModal from '../components/Modal/AddCommentModal';
import EditBugModal from '../components/Modal/EditBugModal';

const BugPage = () => {
  const apiURL = process.env.REACT_APP_LOCAL_API_URL //use for developing
  const { id } = useParams();
  const [bug, setBug] = useState({});

  function handleTitleDescriptionChange(newTitle, newDescription) {
    setBug({
      ...bug,
      title: newTitle, 
      description: newDescription
    });
  }

  useEffect(() => {
    const fetchBug = async () => {
      const response = await fetch(`${apiURL}/api/bugs/${id}`);
      const bug = await response.json();
      setBug(bug);
      console.log(bug)
    };
    fetchBug();
  }, [id]);

  return (
    <Container>
      <Row>
        <Col xs={12}>
          <h1>{bug.title}</h1>
          <p>{bug.description}</p>
          <img src={bug.image} alt={bug.title} />
          <EditBugModal title={bug.title} description={bug.description} bugID={bug.id} updateBug={handleTitleDescriptionChange}></EditBugModal>
          <AddCommentModal bugID={bug.id}></AddCommentModal>
        </Col>
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