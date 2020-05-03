import React, { Component } from 'react';
import { DeliveryAddress } from '../delivery-address'
import { OrderDetail } from '../order-detail'
import { ListGroup, Breadcrumb, Card, Button, Spinner } from 'react-bootstrap';
import { UserContact } from '../user-contact'

export default class User extends Component {

    

    constructor(props) {
        super(props);

        console.log(this.props.user);
        this.state = {
            step: 1,
            inside_step: this.props.step,
            error : null,
            isLoading: false,
            order: this.props.order,
            contact: this.props.contact,
            address: this.props.address,
            user: this.props.user,
            need_confirm: this.props.need_confirm,
        }
    }

    updates_inside=()=>{
        this.setState({
            inside_step:this.state.inside_step +1 
        })
    }
    resume_detail=()=>{
        if (this.state.user!== null){
            return ": " + this.state.user.username;
        }
        return "- "
    }
    resume_contact=()=>{   
        const { contact } = this.state;
        if (contact!==null && contact !== undefined){
            return ": " + contact.email + " " + contact.phone_number
        } 
        return ""
    }
    resume_address=()=>{
        const { address } = this.state;
        if(address !== null && address !== undefined){
            return ": " + address.street + " - " + address.departament
        }
        return ""
    }
    next_detail=()=>{
        this.updates_inside();
    }
    next_address=(address)=>{
        this.setState({address})
        this.updates_inside()
    } 

    next_contact=(contact)=>{
        this.setState({contact})
        this.updates_inside()
    }

    render() {

        const { isLoading, error } = this.state;

        if (error) {
            return <p>{error.message}</p>;
        }

        if (isLoading) {
            return <Spinner 
                        animation="border"
                        className="spinner-border"
                    />;
        }
        let detail;
        if (this.state.inside_step === 1){
            detail = (
                <Card>
                    <Card.Body>
                        <blockquote className="blockquote mb-0">
                            <p>
                                First name: {' '} {this.state.user.first_name} 
                            </p>
                            <p>
                                Last name: {' '} {this.state.user.last_name}
                            </p>
                            <footer className="blockquote-footer">
                                This information will be add to the bill 
                            </footer>
                        </blockquote>
                        <br></br>
                        <Button variant="primary" onClick={this.next_detail} >Confirm</Button>
                    </Card.Body>
                </Card>
            );
        }
        let address
        if (this.state.inside_step === 2){
            address = (
                <Card>
                    <Card.Header>Insert an address to delivery</Card.Header>
                    <Card.Body>
                        <DeliveryAddress 
                            next_address={this.next_address}
                            user={this.state.user}
                        />
                    </Card.Body>
                </Card>
            )
        }
        
        let contact 
        
        if (this.state.inside_step === 3){
            contact = (
                <Card>
                    <Card.Header>Select a contact details</Card.Header>
                    <Card.Body>
                        <UserContact 
                            user={this.state.user}
                            next_contact={this.next_contact}
                        />
                    </Card.Body>
                </Card>
            )
        }
        
        let confirm_order
        let message
        let breadcrumb
        if (this.state.need_confirm){
            message = "Confirm details of your order"
            breadcrumb = <Breadcrumb>
                            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                            <Breadcrumb.Item >Pizza options</Breadcrumb.Item>
                            <Breadcrumb.Item active>Complete order</Breadcrumb.Item>
                        </Breadcrumb>
                
        }else{
            message = "Order Details"
        }
        if (this.state.inside_step === 4){

            const { order } = this.state;
            order.contact = this.state.contact
            order.address = this.state.address
            confirm_order = (
                <Card>
                    <Card.Header>{message}</Card.Header>
                    <Card.Body>
                        <OrderDetail order={order} need_confirm={this.state.need_confirm}/>
                    </Card.Body>
                </Card>
            )
        }

        switch(this.state.step) {
            case 1: return (
                <div>
                    {breadcrumb}
                    <ListGroup>
                        <ListGroup.Item variant={(this.state.inside_step>1) ? "success" : ""}><h3>1. User Detail {(this.state.inside_step === 1) ? "" : this.resume_detail()}</h3> 
                        </ListGroup.Item>
                        {detail}
                        <ListGroup.Item variant={(this.state.inside_step>2) ? "success" : ""}><h3>2. Delivery Address {(this.state.inside_step === 2) ? "" : this.resume_address()}</h3></ListGroup.Item>
                        {address}
                        <ListGroup.Item variant={(this.state.inside_step>3) ? "success" : ""}><h3>3. Contact {(this.state.inside_step === 3) ? "" : this.resume_contact()}</h3></ListGroup.Item>
                        {contact}
                        <ListGroup.Item ><h3>4. Order # {this.state.order.id}</h3></ListGroup.Item>
                        {confirm_order}
                    </ListGroup>
                </div>
            )             
            default: return "not found"
        }
    }
}