import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const NavbarComponent = () => {
    return (
        <Navbar sticky="top" bg="light" expand="lg">
            <Navbar.Brand as={Link} to="/">Car Market</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    
                    {/* <Nav.Link as={Link} to="/pages/HighlightPage">HighLighted</Nav.Link> */}
                    <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
                    <Nav.Link as={Link} to="/pages/CarListingPage">Highlighted Car</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavbarComponent;
