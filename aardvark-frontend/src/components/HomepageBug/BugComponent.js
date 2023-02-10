import React, { useState, useEffect } from "react";
import fakeData from "../../fakeData";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

function BugComponent(){
    const apiURL = process.env.REACT_APP_LOCAL_API_URL //use for developing
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${apiURL}/api/bugs/`);
            const data = await response.json();
            setData(data);
        };

        fetchData();
    }, []);

    return(
    <Container >
      <Row className="d-grid gap-3">
        {data.map(item => (
          <Col xs={12} sm={9} md={12} key={item.id}>
            <Link to={`/bug/${item.id}`}>
                <Card >
                <Card.Img variant="left" src={item.image} height="100px" width="100px"/>
                <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>{item.description}</Card.Text>
                </Card.Body>
                </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
    )
}

export default BugComponent