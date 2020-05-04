import React, { Component } from 'react';
import { Row, Col, Button, Card } from 'react-bootstrap';

export class PizzaItem extends Component {

    render(){

        const { pizza, handlerDetailPizza } = this.props;
        return(
            <React.Fragment>
                <Row>
                    <Col xs={12} md={3}>
                        <Card >
                            <Card.Img variant="top" src={pizza.photo} />
                            <Card.Body>
                                <Card.Title>{pizza.name}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                    
                    {pizza.prices.map(item => {
                        return  <Col key={item.id} xs={4} md={3}>
                                    <Button variant="primary" size="lg" block onClick={() => handlerDetailPizza(item, pizza)}>
                                        {item.price} EUR
                                    </Button>
                                </Col>
                    })}
                    
                </Row>
            </React.Fragment>
        );
    };

}