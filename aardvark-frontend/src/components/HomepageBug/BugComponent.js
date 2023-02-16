import React, { useState, useEffect } from "react";
import fakeData from "../../fakeData";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

function BugComponent(props){
    const apiURL = process.env.REACT_APP_LOCAL_API_URL //use for developing
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${apiURL}/api/bugs/`);
            const data = await response.json();
            setData(data);
            setFilteredData(data);
            
        };
        fetchData();
        
    }, []);

    useEffect(() => {
      if (props.searchQuery === "") {
        setFilteredData(data);
      } else {
        const filtered = data.filter((item) =>
          item.title.toLowerCase().includes(props.searchQuery.toLowerCase())
        );
        setFilteredData(filtered);
      }
    }, [props.searchQuery, data]);
    
    
    return(
    <Container >
      <Col className="d-grid gap-3" style={{height: "550px",overflowY: "scroll"}}>
        
      {filteredData.map(item => (
        <Row xs={12} sm={9} md={12} key={item.id} >
            <Link to={`/bug/${item.id}`}>
                <Card >
                <Card.Img variant="left" src={item.image} height="150px" width="150px"/>
                <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>{item.description}</Card.Text>
                </Card.Body>
                </Card>
            </Link>
        </Row>
        ))}
      </Col>

    </Container>
    )
}

export default BugComponent