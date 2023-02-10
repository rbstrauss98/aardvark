import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../images/aardvark.png'
import { Router, Routes, Route, Link } from 'react-router-dom';

function NavbarComponent() {
  return (
      <Navbar bg="dark" variant={"dark"} expand="lg">
        <Container>
          <Navbar.Brand><img src={logo} width="140" height="80"/></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-5">
              <Nav.Link as={Link} to={"/"}>Home</Nav.Link>
            </Nav>
            <Form className="d-flex w-100">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}

export default NavbarComponent;