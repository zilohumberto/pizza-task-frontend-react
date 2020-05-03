import React, { useState, Component } from 'react';
import { url_orders_order, url_orders_bill } from '../../constants/api_url'
import { Table, Button } from 'react-bootstrap';

export class OrderDetail extends Component {   
    state = {
        isLoading: true,
        orderID: this.props.order.id,
        order: {}
    }
    componentDidMount() {
        this.get_bill();
    }
    get_bill=(item)=>{
        fetch(url_orders_bill, {
            method: 'POST',
            body: JSON.stringify({"order": this.state.orderID}),
            headers:{
                'Content-Type': 'application/json'
            }
        })                   
            .then(res => res.json())
            .then((data) => {
                console.log(data);
                this.setState({ order: data, isLoading: false });
            })
    }
    confirm_order=()=>{
        this.setState({ isLoading: true });
        fetch(url_orders_order+this.state.orderID+"/", {
            method: 'PATCH',
            body: JSON.stringify({"status": 2}),
            headers:{
                'Content-Type': 'application/json'
            }
        })                   
            .then(res => res.json())
            .then((data) => {
                console.log(data);
                // TODO REDIRECT!!
            })
    }

    renderResults() {
        return (
            this.state.order.command_set.map(item => {
                return  <tr>
                    <td>{item.id}</td>
                    <td>{item.pizza_ordered.pizza.name}</td>
                    <td>{item.pizza_ordered.size.name}</td>
                    <td>{this.get_list_toppings(item.pizza_ordered.toppings)}</td>
                    <td>XXX</td>
                    <td>XXX</td>
                </tr>
            })
        );
    }

    render(){

        if (this.state.isLoading){
            return "loading"
        }else{
            return <div>
                <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Pizza</th>
                    <th>Topping</th>
                    <th>Size</th>
                    <th>Units</th>
                    <th>Total</th>
                </tr>
                </thead>
                <tbody>
                    {this.state.order.items.map(item => {
                        return <tr key={item.name}>
                            <td>{(item.is_pizza) ? item.name : ""}</td>
                            <td>{(item.is_pizza) ? "" : item.name}</td>
                            <td>{(item.is_pizza) ? item.size : ""}</td>
                            <td>{item.units}</td>
                            <td>{item.total}</td>
                        </tr>
                    })}
                </tbody>
            </Table>
            <h1>Total: {this.state.order.total}</h1>
            <Button type="submit" onClick={this.confirm_order}>Confirm order!</Button>
          </div>
        }
    }
}