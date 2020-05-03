import React from 'react';
import { Navbar, Nav, Form, Badge } from 'react-bootstrap';
import { FaShoppingCart } from "react-icons/fa";

export const Header = () => (
    <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/"></Navbar.Brand>
        <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/">Features</Nav.Link>
        </Nav>
        <Form inline>
            <Nav.Link href="/" style={{ color:'white' }}>
                <FaShoppingCart size={24} /> <Badge variant="secondary">(0)</Badge>
            </Nav.Link>
        </Form>
    </Navbar>
)