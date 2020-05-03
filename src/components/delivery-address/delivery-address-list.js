import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, ListGroup } from 'react-bootstrap';

export class DeliveryAddressList extends Component {

    handlerSelectAddress(address) {
        this.props.next_address(address);
    }

    render(){
        const { address } = this.props;
        return(
            <React.Fragment>
                <Row>
                    <Col>
                        <h1>
                            List Adrress
                        </h1>
                    </Col>
                </Row>
                <ListGroup>
                    {address.map(item =>{
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
    address: PropTypes.object.isRequired,
}