
import React, { useState, useEffect } from "react";

import { Container, Row, Col, Card, Image } from "react-bootstrap";
import { useParams } from 'react-router-dom'


const BugPage = () => {
  const apiURL = process.env.REACT_APP_LOCAL_API_URL //use for developing
  const { id } = useParams();

  const bugId = id

  const [bug, setBug] = useState({});

  useEffect(() => {
    const fetchBug = async () => {
      const response = await fetch(`${apiURL}/api/bugs/${bugId}`);
      const bug = await response.json();
      setBug(bug);
    };

    fetchBug();
  }, [bugId]);

  return (
    <Container>
      <Row>
        <Col xs={12}>
          <h1>{bug.title}</h1>
          <p>{bug.description}</p>
          <img src={bug.image} alt={bug.title} />
        </Col>
        {bug.comments && bug.comments.map(comment => (
            <Col xs={12}>
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