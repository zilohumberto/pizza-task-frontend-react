import React, { Component, useState } from 'react';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { ContactList } from '../contact-list'
import { url_user_contact } from '../../constants/api_url'

function FormContact(props) {

    const [validated, setValidated] = useState(false);
    var Email, PhoneNumer, PhoneNumerAddicional;

    const handleSubmit = (event) => {
        
        event.preventDefault();

        const form = event.currentTarget;        
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {

            const data = { 
                email: Email.value, 
                phone_number: PhoneNumer.value, 
                phone_number_additional: PhoneNumerAddicional.value,
                user: props.user.id
            };

            const param = {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers:{
                        'Content-Type': 'application/json'
                    }
            }

            fetch(url_user_contact, param)
            .then(res => res.json())
            .then(result => {
                    props.next_contact(result);
                },
                error => {
                    console.log(error);
                }
            )
        }
        setValidated(true);
    };

    return (
        
        <Form noValidate validated={validated} onSubmit={handleSubmit}>

            <Form.Row>
                <Form.Group as={Col} md="4" controlId="validationStreet">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Email"
                        ref={input => Email = input}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please email.
                        </Form.Control.Feedback>
                </Form.Group>
            
                <Form.Group as={Col} md="4" controlId="validationDepartament">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Phone Number"
                        ref={input => PhoneNumer = input}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please phone number
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="4" controlId="validationZipCode">
                    <Form.Label>Phone Number Additional</Form.Label>
                    <InputGroup>
                        <Form.Control
                            type="text"
                            placeholder="Phone Number Additional"
                            ref={input => PhoneNumerAddicional = input}
                        />
                    </InputGroup>
                </Form.Group>
            </Form.Row>

            <Button type="submit">Save</Button>

        </Form>
    );
}

export class UserContact extends Component {


    render() {
        const { next_contact, user } = this.props;
        debugger;
        return(
            <React.Fragment>

                <Row>
                    <Col>
                        <FormContact user={user} next_contact={next_contact} />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <br></br>
                        <ContactList 
                            contacts={user.contact}
                            next_contact={next_contact}
                        />
                    </Col>
                </Row>

            </React.Fragment>
        );
    };
}
