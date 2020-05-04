import React from 'react';
import { Navbar, Nav, Form } from 'react-bootstrap';
import { SignInSignUp } from '../signin-signup';
import { CarCounter } from '../shopping-car'

export default function Header(props) {

    const { user, log_in, log_out } = props;

    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/"></Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/orders">Orders</Nav.Link>
            </Nav>
            <Form inline>
                {
                    (user !== null) ? <div className="LogIn"><span>Welcome: {`${user.first_name} ${user.last_name}`}</span> <Nav.Link className="logOut" href="#" onClick={log_out}>Log Out</Nav.Link></div>
                    : <SignInSignUp next_step={log_in}/>
                }
                <CarCounter />
            </Form>
        </Navbar>
    );
}