import React from 'react'
import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap'

export default function Navigation() {
  return (
    <div className="Navigation">
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">COVID CANADA</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <NavDropdown title="Survey" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/survey">Take Survey</NavDropdown.Item>
                            <NavDropdown.Item href="/data">Survey Data</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
  )
}
