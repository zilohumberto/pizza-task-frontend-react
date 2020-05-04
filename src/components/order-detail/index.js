import React, { Component } from 'react';
import { url_orders_order, url_orders_bill } from '../../constants/api_url'
import { Table, Button, Modal, Spinner, Badge } from 'react-bootstrap';
import { Redirect } from 'react-router-dom'
import { getToken } from '../../helper/auth-helper'
import { deleteOrder } from '../../helper/order_cookie_helper'


function get_order_by_id(orderId){
    return new Promise((resolve, reject) => {   
        let header = {
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

        deleteOrder();

        this.state = {
            steps: 0,
            isLoading: false,
            order: this.props.order,
            contact: this.props.order.contact,
            address: this.props.order.address,
            showModal: false,
            bill: {},
            need_confirm: this.props.need_confirm,
            no_pizza: false,
            cookie_token: null,
            error: null,
        }
    }

    componentDidMount() {
        const token = getToken();
        if(token != null)
        {
            this.setState({cookie_token:token})
        }
        if(this.state.order.command_set !==undefined ){
            if(this.state.need_confirm === true){
                this.get_bill()
            }else{
                this.setState({ steps: 1 });
            }
            return 
        }
        get_order_by_id(this.state.order.id)
        .then((data)=>{
            let order = data[0]
            this.setState({order})
            if(this.state.need_confirm === true){
                this.get_bill()
            }else{
                this.setState({ steps: 1 });
            }
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    get_bill=()=>{
        const {cookie_token} = this.state;
        this.setState({ isLoading: true });
        let headers = {
            'Content-Type': 'application/json'
        }
        if (cookie_token !== null){
            if (cookie_token !== undefined){
                headers['Authorization'] = `Token ${cookie_token.token}`
            }
        }
        fetch(url_orders_bill, {
            method: 'POST',
            body: JSON.stringify({"id": this.state.order.id}),
            headers: headers
        })                   
            .then(res => res.json())
            .then((data) => {
                this.setState({ bill: data, isLoading: false, steps: 2});
            })
    }

    confirm_order=()=>{
        this.setState({ isLoading: true });
        fetch(url_orders_order+this.state.order.id+"/", {
            method: 'PATCH',
            body: JSON.stringify({
                "status": 2,
                "contact": this.state.contact.id,
                "address": this.state.address.id,
                "id": this.state.order.id,
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        })                   
            .then(res => res.json())
            .then((data) => {
                this.setState({ isLoading: false, steps: 3 });
            })
    }

    setRedirect = () => {
        window.location.reload(false);
    }

    get_pizza_name=(item)=>{
        if(item.is_pizza===false){
            return ""
        }
        return (this.state.need_confirm) ? item.name : <div>{item.name} {'  '}<Badge variant="secondary">{item.status}</Badge></div>
    }

    render(){
        const { steps, isLoading, need_confirm, error } = this.state;
        let confirm_button
        if (need_confirm){
            confirm_button = <Button type="submit" onClick={this.confirm_order}>Confirm order!</Button>
        } 
        if(isLoading)
            return <Spinner 
                        animation="border"
                        className="spinner-border"
                    />;
        if (error){
            return {error}
        }
        switch(steps) {
            default:
                return <><h1>No pizza </h1></>
            case 1:
                return <><button onClick={this.get_bill}> Show Bill</button></>
            case 2: 
                return <>
                    <Table responsive striped bordered hover>
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
                                    <td>x {item.units}</td>
                                    <td>{item.total}</td>
                                </tr>
                            })}
                        </tbody>
                    </Table>
                    <h1>Delivery: {this.state.bill.delivery} - Total: {this.state.bill.total}</h1>
                    {confirm_button}
                </>
            case 3:
                return <ModelConfirmOrder show={true} setRedirect={this.setRedirect} />;
            case 4:
                return <Redirect to='/' />;


        }
    }
}