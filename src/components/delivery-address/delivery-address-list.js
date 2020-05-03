import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, ListGroup } from 'react-bootstrap';

export class DeliveryAddressList extends Component {

    handlerSelectAddress(contact) {
        this.props.next_address(contact);
    }

    render(){

        const { addresses } = this.props;

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
                    {addresses.map(item =>{
                        return(
                            <ListGroup.Item 
                                action 
                                key={item.id}
                                onClick={() => this.handlerSelectAddress(item)}>
                                {`${item.street} - Departament: ${item.departament} - Zip Code: ${item.zip_code}`}
                            </ListGroup.Item>
                        )
                    })}
                </ListGroup>

            </React.Fragment>
        )
    };
}

DeliveryAddressList.proptype = {
    addresses: PropTypes.object.isRequired,
}