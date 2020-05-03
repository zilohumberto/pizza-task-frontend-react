import React, { Component } from 'react';
import { url_orders_order, url_orders_bill } from '../../constants/api_url'
import { Table, Button, Modal, Spinner, Badge } from 'react-bootstrap';
import { Redirect } from 'react-router-dom'
import { getToken } from '../../helper/auth-helper'

function ModelConfirmOrder(props) {
    
    return (
        <Modal
            show={props.show}
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Purchase completed
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <h4>Important Information</h4>
                <p>
                    Your order was sent. The deliverer contacted you when He arrives in the place indicated.
                </p>
                <h5>Thanks for choosing us.</h5>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={props.setRedirect}>OK</Button>
            </Modal.Footer>

        </Modal>
    );
  }

export class OrderDetail extends Component {   

    constructor(props) {
        super(props);

        this.state = {
            steps:1,
            isLoading: true,
            order: this.props.order,
            showModal: false,
            bill: {},
            need_confirm: this.props.need_confirm,
        }
    }

    componentDidMount() {
        const token = getToken();
        if(token != null)
        {
            const token = getToken();
            this.get_bill(token);    
        }else{
            this.get_bill();
        }
    }
    get_bill=(token)=>{
        let headers = {
            'Content-Type': 'application/json'
        }
        if (token !== undefined){
            headers['Authorization'] = `Token ${token.token}`
        }
        fetch(url_orders_bill, {
            method: 'POST',
            body: JSON.stringify({"id": this.state.order.id}),
            headers: headers
        })                   
            .then(res => res.json())
            .then((data) => {
                this.setState({ bill: data, isLoading: false });
            })
    }

    confirm_order=()=>{
        this.setState({ isLoading: true });
        fetch(url_orders_order+this.state.order.id+"/", {
            method: 'PATCH',
            body: JSON.stringify({
                "status": 2,
                "contact": this.state.order.contact.id,
                "address": this.state.order.address.id,
                "id": this.state.order.id,
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        })                   
            .then(res => res.json())
            .then((data) => {
                this.setState({ isLoading: false, steps: 2 });
            })
    }

    setRedirect = () => {
        window.location.reload(false);
        //this.setState({ steps:3 });
    }

    get_pizza_name=(item)=>{
        if(item.is_pizza===false){
            return ""
        }
        return (this.state.need_confirm) ? item.name : <div>{item.name} {'  '}<Badge variant="secondary">{item.status}</Badge></div>
    }

    render(){
        const { steps, isLoading, need_confirm } = this.state;
        let confirm_button
        if (need_confirm){
            confirm_button = <Button type="submit" onClick={this.confirm_order}>Confirm order!</Button>
        } 
        if(isLoading)
            return <Spinner 
                        animation="border"
                        className="spinner-border"
                    />;
        switch(steps) {
            case 1:
                return (
                    <div>
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
                                {this.state.bill.items.map(item => {
                                    return <tr key={item.name}>
                                        <td>{this.get_pizza_name(item)}</td>
                                        <td>{(item.is_pizza) ? "" : item.name}</td>
                                        <td>{(item.is_pizza) ? item.size : ""}</td>
                                        <td>{item.units}</td>
                                        <td>{item.total}</td>
                                    </tr>
                                })}
                            </tbody>
                        </Table>
                        <h1>Total: {this.state.bill.total}</h1>
                        {confirm_button}
                    </div>
                )
            case 2:
                return <ModelConfirmOrder show={true} setRedirect={this.setRedirect} />;

            case 3:
                return <Redirect to='/' />;
        }
    }
}