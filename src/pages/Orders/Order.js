import React, { Component } from 'react';
import { Accordion, Card, Button, Badge } from 'react-bootstrap';
import { url_orders_order } from '../../constants/api_url'
import User  from '../../components/users/users';

export default class Judge extends Component {
    state = {
        step: 0,
        user : {},
        orders: []
    }
    componentDidMount() {
        this.get_user_from_cookies()
        this.get_orders()
    }
    get_user_from_cookies(){
        //TODO
    }

    get_orders(){
        fetch(url_orders_order, 
                    {
                        method: 'GET',
                        headers:{
                            'Content-Type': 'application/json'
                        }
                    }
        ).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then((response) => {
            console.log(response);
            this.setState({orders:response, step: 1})
        });
    }
    render() {
        switch (this.state.step) {
            case 0: return "loading"
            case 1: return (
                <div>
                    {this.state.orders.map(item => {
                        return <Accordion defaultActiveKey="0">
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button}  variant="link"  eventKey="1">
                                    # {item.id} 
                                    </Accordion.Toggle>
                                    <Badge variant="secondary">{item.status.description}</Badge> 
                                </Card.Header>
                                <Accordion.Collapse eventKey="1">
                                <Card.Body>
                                        <User order={item} user={item.user} need_confirm={false} step={4} />
                                </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    })}
                </div>
            );
        }   
    }
}