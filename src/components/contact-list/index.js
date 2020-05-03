import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, ListGroup } from 'react-bootstrap';

export class ContactList extends Component {

    handlerSelectContact(contact) {
        this.props.next_contact(contact);
    }

    render(){

        const { contacts } = this.props;

        return(
            <React.Fragment>
                <Row>
                    <Col>
                        <h1>
                            List constacts
                        </h1>
                    </Col>
                </Row>
                <ListGroup>
                    {contacts.map(item =>{
                        return(
                            <ListGroup.Item 
                                action 
                                key={item.id}
                                onClick={() => this.handlerSelectContact(item)}>
                                {`${item.email} - Phone Number: ${item.phone_number} - Phone Additional: ${item.phone_number_additional}`}
                            </ListGroup.Item>
                        )
                    })}
                </ListGroup>

            </React.Fragment>
        );
    }
}

ContactList.proptype = {
    contacts: PropTypes.object.isRequired,
}