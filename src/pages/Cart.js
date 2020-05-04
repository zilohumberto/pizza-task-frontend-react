import React, { Component } from 'react';
import { Breadcrumb, Spinner } from 'react-bootstrap';
import { getToken } from '../helper/auth-helper'
import { getOrder } from '../helper/order_cookie_helper';
import { url_orders_order, url_orders_bill } from '../constants/api_url'
import { CartPizzaOptions } from '../components/cart-pizza-options'

function get_order_by_id(token, orderId){
    return new Promise((resolve, reject) => {   
        let header = {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        }
        fetch(url_orders_order + "?id="+orderId, 
                    {
                        method: 'GET',
                        headers:header
                    }
        )
        .then(function(response) {
            if (!response.ok) {
                let message = 'unhandle error';
                reject(message)
            }else{
                resolve(response.json())
            }
        })
    })
}

export default class Cart extends Component {
    state = {
        steps: 0,
        user : {},
        orderId: [],
        order: {}, 
        error : null,
        bill: {}
    }
    componentDidMount() {
        this.get_data_from_cookies()
    }
    get_data_from_cookies=()=>{
        const token = getToken();
        if(token !== null)
        {
            const order = getOrder()
            if(order===null){
                this.setState({error:{'message': "Your cart is empty"}})    
                return
            }
            this.setState({ token: token.token, user: token.User, orderId: order.orderId});
            this.getOrderById(token.token, order.orderId)        
        }else{
            this.setState({error:{'message': "You need to be authenticated to see your cart"}})
        }
    }
    getOrderById=(token, orderId)=>{
        get_order_by_id(token, orderId)
        .then((orders)=>{
            this.setState({order:orders[0]})
            this.get_bill()
        })
        .catch((error)=>{
            this.setState({error})
        })
    }
    get_bill=()=>{
        const {token} = this.state;
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        } 
        fetch(url_orders_bill, {
            method: 'POST',
            body: JSON.stringify({"id": this.state.order.id}),
            headers: headers
        })                   
        .then(res => res.json())
        .then((data) => {
            this.setState({ bill: data, steps: 1});
        })
    }
    render() {
        if (this.state.error){
            return <div>
                <Breadcrumb>
                    <Breadcrumb.Item active>Cart</Breadcrumb.Item>
                </Breadcrumb>
                {this.state.error.message}
            </div>
        }
        switch (this.state.steps) {
            case 0: return <Spinner 
                    animation="border"
                    className="spinner-border"
                />
            case 1: return <CartPizzaOptions order={this.state.order} bill={this.state.bill} token={this.state.token} user={this.state.user} />
        }   
    }
}