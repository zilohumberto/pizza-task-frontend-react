import React, { useState, Component } from 'react';
import { Form, Button, Row, Col, Badge, Modal} from 'react-bootstrap';
import { url_users_user, url_login } from '../../constants/api_url'

function LoginIn(data){
    return new Promise((resolve, reject) => {
        fetch(url_login, {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(function(response) {
            if (!response.ok) {
                let message = 'unhandle error';
                if (response.status === 400){
                    message ='Unable to log in with provided credentials.'
                }
                reject(message)
            }
            resolve(response.json())
        })
    })
}

function SignInForm(props) {

    const [errorLogin, setErrorLogin] = useState(false);
    const [validated, setValidated] = useState(false);
    var username, password
    
    const handleSubmit = (event) => {

        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        setValidated(true);
        
        if (form.checkValidity()===false){
            return ;
        }

        let data = {
            'username': username.value,
            'password': password.value
        };

        LoginIn(data).then(function(result) {
            props.handleClose();
            props.next_step(result['token'], true);
        })
        .catch(function(error) {
            setErrorLogin(true);
        })
    };
    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Row>
                <Form.Group as={Col} md="6" controlId="validationUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Username"
                        ref={(input) => username = input}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter a Username.
                        </Form.Control.Feedback>
                </Form.Group>
          
                <Form.Group as={Col} md="6" controlId="validationPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        placeholder="Password"
                        ref={(input) => password = input}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter a Password
                        </Form.Control.Feedback>
                </Form.Group>
            </Form.Row>
            {
                errorLogin ? <Form.Row>Invalid Credentials</Form.Row> : ""
            }
            <Button type="submit">Sing In</Button>
        </Form>
    );
  }

function SignUpForm(props) {
    const [errorLogin, setErrorLogin] = useState(false);
    const [validated, setValidated] = useState(false);
    var username, password, first_name, last_name
    
    const handleSubmit = (event) => {

        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        setValidated(true);
        if (form.checkValidity()===false){
            return ;
        }

        let data = {
            'username': username.value,
            'password': password.value,
            'first_name': first_name.value,
            'last_name': last_name.value
        };
        fetch(url_users_user, {
                method: 'POST',
                body: JSON.stringify(data),
                headers:{
                    'Content-Type': 'application/json'
                }
        })
        .then(function(response) {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json()
        })
        .then((result) => {
            LoginIn(data).then(function(result) {
                props.handleClose();
                props.next_step(result['token'], true);
            })
            .catch(function(error) {
                // TODO Show error
                console.error(error);
            })
        })
        .catch((error) => {
            setErrorLogin(true);
        })
    };
  
    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Row>
                <Form.Group as={Col} md="6" controlId="validationFirstname">
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="First name"
                        ref={(input) => first_name = input}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter a First name.
                        </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationLastname">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Last name"
                        ref={(input) => last_name = input}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter a Last name.
                        </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Username"
                        ref={(input) => username = input}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter a Username.
                        </Form.Control.Feedback>
                </Form.Group>
          
                <Form.Group as={Col} md="6" controlId="validationPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        placeholder="password"
                        ref={(input) => password = input}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter a Password
                        </Form.Control.Feedback>
                </Form.Group>
            </Form.Row>
            {
                errorLogin ? <Form.Row>Invalid Username</Form.Row> : ""
            }
            <Button type="submit">Sing Up</Button>
        </Form>
    );
  }

function ModalLog(props) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
        <span className="login-information"> 
            You can order without login. If you want <Badge variant="secondary">Track Your Order</Badge> 
            {' '}
            <Button variant="primary" size="sm" onClick={handleShow}>SignIn or SignUp</Button>
        </span>
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
            <Modal.Title>Sign In or Sign Up</Modal.Title>
            </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <SignUpForm next_step={props.next_step} handleClose={handleClose}/>
                        </Col>
                        <Col>
                            <SignInForm  next_step={props.next_step} handleClose={handleClose}/>
                        </Col>
                    </Row>
                </Modal.Body>
        </Modal>
        </>
    );
}

export class SignInSignUp extends Component {  
    render(){
        const { next_step } = this.props;
        return <ModalLog next_step={next_step}/>
    }
}