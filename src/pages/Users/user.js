import React, { Component } from 'react';
import { url_users_detail, url_users_delivery } from '../../constants/api_url'
import { DeliveryAddress } from '../../components/delivery-address'
import { OrderDetail } from '../../components/order-detail'
import { ListGroup, Breadcrumb, Card, Button } from 'react-bootstrap';
import { UserContact } from '../../components/user-contact'

export default class User extends Component {

    state = {
        step: 1,
        inside_step: 1,
        error : null,
        isLoading: false,
        user: {},
        data_contact: {},
        orderID: 5,
        user: this.props.user,
    }

    componentDidMount() {
        this.get_user(this.props.user.id);
    }

    get_user(user_id){
        fetch(url_users_detail)                   
            .then(res => res.json())
            .then(data => {
                this.setState({ user: data[0] });
            })
    }
    updates_inside=()=>{
        this.setState({
            inside_step:this.state.inside_step +1 
        })
    }
    resume_detail=()=>{
        return " - " + this.state.user.last_name;
    }
    resume_contact=()=>{
    }
    resume_address=()=>{
    }
    next_delivery=()=>{
        this.updates_inside();
    }
    next_address=()=>{
        this.updates_inside();
    } 

    next_contact=(data_contact)=>{
        this.setState({ data_contact, inside_step:this.state.inside_step +1  });
    }

    render() {

        const { isLoading, error } = this.state;

        if (error) {
            return <p>{error.message}</p>;
        }

        if (isLoading) {
            return <p>Loading ...</p>;
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
                        <Button variant="primary" onClick={this.next_delivery} >Confirm</Button>
                    </Card.Body>
                </Card>
            );
        }
        let address
        if (this.state.inside_step === 2){
            address = (
                // TODO LIST OF ADDRESS TO HERE
                <Card>
                    <Card.Header>Insert an address to delivery</Card.Header>
                    <Card.Body>
                        <DeliveryAddress next_address={this.next_address}/>
                    </Card.Body>
                </Card>
            )
        }
        
        let contact 
        if (this.state.inside_step === 3){
            contact = (
                <Card>
                    <Card.Header>Select a contact to delivery</Card.Header>
                    <Card.Body>
                        <UserContact 
                            userId={1}
                            next_contact={this.next_contact}
                        />
                    </Card.Body>
                </Card>
            )
        }
        let confirm_order
        if (this.state.inside_step === 4){
            confirm_order = (
                <Card>
                    <Card.Header>Confirm details of your order</Card.Header>
                    <Card.Body>
                        <OrderDetail order={{"id": this.state.orderID}}/>
                    </Card.Body>
                </Card>
            )
        }

        switch(this.state.step) {
            case 1: return (
                <div>
                    <Breadcrumb>
                        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                        <Breadcrumb.Item >Pizza options</Breadcrumb.Item>
                        <Breadcrumb.Item active>Complete order</Breadcrumb.Item>
                    </Breadcrumb>
                    <ListGroup>
                        <ListGroup.Item variant={(this.state.inside_step>1) ? "success" : ""}><h3>1. User Detail {(this.state.inside_step==1) ? "" : this.resume_detail()}</h3> 
                        </ListGroup.Item>
                        {detail}
                        <ListGroup.Item variant={(this.state.inside_step>2) ? "success" : ""}><h3>2. Delivery Address {(this.state.inside_step==2) ? "" : this.resume_contact()}</h3></ListGroup.Item>
                        {address}
                        <ListGroup.Item variant={(this.state.inside_step>3) ? "success" : ""}><h3>3. Contact {(this.state.inside_step==3) ? "" : this.resume_contact()}</h3></ListGroup.Item>
                        {contact}
                        <ListGroup.Item ><h3>4. Order # {this.state.orderID}</h3></ListGroup.Item>
                        {confirm_order}
                    </ListGroup>
                </div>
            )             
            default: return "not found"
        }
    }
}