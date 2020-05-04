import React, { Component } from 'react';
import { Nav, Badge } from 'react-bootstrap';
import { FaShoppingCart } from "react-icons/fa";
import { getOrder } from '../../helper/order_cookie_helper';

export class CarCounter extends Component {

    state = { amount_commands: 0 }

    interval = setInterval(() => {
        const cookieOrder = getOrder();
        if (cookieOrder === null || cookieOrder.amount === this.state.amount_commands )
            return
        this.setState({ amount_commands: cookieOrder.amount });
    } , 2000);

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        return(
            <Nav.Link href="/cart" style={{ color:'white' }}>
                <FaShoppingCart size={24} /> <Badge variant="secondary">({this.state.amount_commands})</Badge>
            </Nav.Link>
        )
    }
}