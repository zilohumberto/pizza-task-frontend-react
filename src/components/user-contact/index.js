import React, { Component, useState } from 'react';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { ContactList } from '../contact-list'
import { url_user_contact, url_user_contact } from '../../constants/api_url'

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
                user: 1
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
                    props.handleUpdateList();
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
                        ref={imput => Email = imput}
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
                        ref={imput => PhoneNumer = imput}
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
                            ref={imput => PhoneNumerAddicional = imput}
                        />
                    </InputGroup>
                </Form.Group>
            </Form.Row>

            <Button type="submit">Save</Button>

        </Form>
    );
}

export class UserContact extends Component {

    state = { contacts: [] }

    componentDidMount() {
        this.get_contacts();
    }

    get_contacts() {
        fetch(url_user_contact)
            .then(res => res.json())
            .then(data => {
                this.setState({ contacts: data });
            }
        )
    }

    handleUpdateList = () => {
        this.get_contacts();
    }

    render() {
        const { contacts } = this.state;
        const { next_contact } = this.props;

        return(
            <React.Fragment>

                <Row>
                    <Col>
                        <FormContact handleUpdateList={this.handleUpdateList} />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <br></br>
                        <ContactList 
                            contacts={contacts}
                            next_contact={next_contact}
                        />
                    </Col>
                </Row>

            </React.Fragment>
        );
    };
}

UserContact.propTypes = {
    userId: PropTypes.number.isRequired,
}