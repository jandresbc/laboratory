import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {
    Outlet,
    Link
} from "react-router-dom";

export default function Menu() {
  return (
    <>
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">Laboratory App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {/* <Nav.Link as={Link} to="/">Home</Nav.Link> */}
                        <Nav.Link as={Link} to="/Add">Add Patient</Nav.Link>
                        <Nav.Link as={Link} to="/Evaluate">Evaluate</Nav.Link>
                        <Nav.Link as={Link} to="/Consult">Consult Result</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

        <section>
            <Outlet></Outlet>
        </section>
    </>
  );
}