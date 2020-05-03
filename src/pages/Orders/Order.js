import React, { Component } from 'react';
import { Accordion, Card, Button, Badge, Breadcrumb, Spinner } from 'react-bootstrap';
import { url_orders_order } from '../../constants/api_url'
import User  from '../../components/users/users';
import { getToken } from '../../helper/auth-helper'


export default class Judge extends Component {
    state = {
        step: 0,
        user : {},
        orders: [], 
        error : null,
    }
    componentDidMount() {
        this.get_user_from_cookies()
    }
    get_user_from_cookies(){
        const token = getToken();
        if(token != null)
        {
            const token = getToken();
            this.setState({ user: token.User });
            this.get_orders(token)
        }else{
            this.setState({error:{'message': "You need to be authenticated to track your orders"}})
        }
    }
    get_orders(token){
        let header = {
            'Authorization': `Token ${token.token}`,
            'Content-Type': 'application/json'
        }
        fetch(url_orders_order, 
                    {
                        method: 'GET',
                        headers:header
                    }
        ).then(res => res.json())
        .catch(error => this.setState({error}))
        .then((response) => {
            this.setState({orders:response, step: 1})
        });
    }
    check_can_cancel_order=(item)=>{
        const {user} = this.state
        if (user.is_superuser){
            let can_cancel = ['created', 'preparing_order', 'to_delivery'];
            if (can_cancel.indexOf(item.status.name) !== -1){
                return <Button variant="warning" onClick={() => this.patchOrder(item, {"status": 6})}> Cancel order</Button>
            }
        }
        return ""
    }
    check_next_status=(item)=>{
        const {status} = item
        if (status.name == 'to_delivery'){
            return <Button variant="info" onClick={() => this.patchOrder(item, {"status": 4})}> Delivered</Button>
        }
        return ""
    }
    patchOrder=(item, data)=>{
        this.setState({step:0})
        fetch(url_orders_order+item.id+"/", 
            {
                method: 'PATCH',
                body: JSON.stringify(data),
                headers:{
                    'Content-Type': 'application/json'
                }
            }
        ).then(res => res.json()).then(data => {
            this.get_orders()
        },
        (error) => {
            this.setState({error})
          }
        )
    }
    render() {
        let breadcrumb = <Breadcrumb>
            <Breadcrumb.Item active>Orders</Breadcrumb.Item>
        </Breadcrumb>
        if (this.state.error){
            return <div>
                {breadcrumb}
                {this.state.error.message}
            </div>
        }
        switch (this.state.step) {
            case 0: return <div>
                {breadcrumb}
                <br></br>
                <Spinner 
                    animation="border"
                    className="spinner-border"
                />
            </div>
            case 1: return (
                <div>
                    {breadcrumb}
                    <br></br>
                    {this.state.orders.map(item => {
                        return <Accordion defaultActiveKey="0">
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button}  variant="link"  eventKey="1">
                                        # {item.id} 
                                    </Accordion.Toggle>
                                    <Badge variant="secondary">{item.status.description}</Badge> 
                                    {' '}
                                    {this.check_next_status(item)}
                                    {' '}
                                    {this.check_can_cancel_order(item)}
                                </Card.Header>
                                <Accordion.Collapse eventKey="1">
                                <Card.Body>
                                    <p> after all Pizzas's already in 'cooked' the order change to 'to_delivery'</p>
                                    <User order={item} contact={item.contact} address={item.address} user={item.user} need_confirm={false} step={4} />
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