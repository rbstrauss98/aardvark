import React, { useState, useEffect } from "react";
import fakeData from "../../fakeData";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import CreateBugModal from '../Modal/CreateBugModal';


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

    function addBug(newBug){
      setFilteredData(
        [...filteredData, newBug]
      );
    }
    
    return(
    <Container >
      <Row className="my-5">
        <Col>
          <h1>Bugs</h1>
        </Col>
        <Col className="align-self-center" style={{textAlign: "right"}} xs="auto">
          <CreateBugModal addBug={addBug}></CreateBugModal>
        </Col>
      </Row>
      <Row className="d-grid gap-3 mb-4">
        
      {filteredData.map(item => (
        <Col md={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }} xl={{ span: 6, offset: 3 }} key={item.id} >
            <Link to={`/bug/${item.id}`} style={{textDecoration: "none", color: "inherit"}}>
                <Card style={{height: "200px"}} >
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