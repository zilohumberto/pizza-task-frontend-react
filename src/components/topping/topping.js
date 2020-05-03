import React, { Component } from 'react';
import { Button, Form, Media, Badge, Card, Breadcrumb, Spinner } from 'react-bootstrap';
import { url_post_order, url_post_command } from '../../constants/api_url'

const data = { user: 1 }

export default class Topping extends Component {
    
    state={
        next_step: this.props.next_step,
        pizza_price: this.props.price,
        total: this.props.price.price,
        ingredients: this.props.ingredients,
        toppings: {},
        step: 1,
    }

    update_total=(e, item)=>{
        let extra = 0;
        let toppings = this.state.toppings;
        if (e.target.checked){
            extra = item.cost
            toppings[item.id] = true
        }else{
            extra = item.cost  * -1
            toppings[item.id] = false
        }
        this.setState({
            total: (parseFloat(this.state.total)+extra).toFixed(2),
            toppings: toppings, 
        })
    }

    HandlerCompleteOrder=()=>{

        this.setState({step:2})
        let list_toppings = []
        for (var key in this.state.toppings) {  
            if (this.state.toppings[key]){
                list_toppings.push({'ingredient_topping': key})
            }
        }
        // if has a previus orde no create a new one (TODO save order)
        fetch(url_post_order, 
                            {
                                method: 'POST',
                                body: JSON.stringify(data),
                                headers:{
                                    'Content-Type': 'application/json'
                                }
                            }
        ).then(res => res.json())
         .catch(error => console.error('Error:', error))
          .then((response) => {
                let order = response
                //TODO we need to save response.id
                let command_body = {
                                    'pizza_ordered': this.state.pizza_price.id, 
                                    'order': response.id, 
                                    'toppings': list_toppings
                                };

                fetch(url_post_command, {
                                            method: 'POST',
                                            body: JSON.stringify(command_body),
                                            headers:{
                                                'Content-Type': 'application/json'
                                            }
                                        }
                ).then(res => res.json())
                 .catch(error => console.error('Error:', error))
                 .then(response => {
                    this.state.next_step(order);
                });
          });
    }

    render() {
        const { pizza, price, ingredients } = this.props;
            switch (this.state.step) {
                case 1: return <React.Fragment>
                                    <div>
                                        <Breadcrumb>
                                            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                                            <Breadcrumb.Item active>Pizza options</Breadcrumb.Item>
                                        </Breadcrumb>
                                        <Media>
                                            <img
                                                width={400}
                                                height={400}
                                                className="mr-4"
                                                src={pizza.photo}
                                                alt={pizza.name}
                                            />
                                            <Media.Body>
                                                <h2>{pizza.name}</h2> <h5>{price.size.name}</h5>
                                                <p>
                                                {pizza.description}
                                                </p>
                                            </Media.Body>
                                        </Media>
                                        <Form>
                                            <Form.Label>Do you want add any extra ingredient?</Form.Label>
                                            {ingredients.map(item => {
                                                // TODO field to add amount and description after add a ingredient!
                                                return  <Form.Check type="checkbox" controlId="inputTopping" key={item.id}>
                                                            <Form.Check.Input type="checkbox" placeholder="units" onChange={(e) => this.update_total(e, item)} isValid />
                                                            <Form.Check.Label>{item.name} x <Badge variant="secondary">{item.cost} EUR</Badge></Form.Check.Label>
                                                        </Form.Check>
                                            })}
                                        </Form>
                                        <Card style={{ width: '48rem' }}>
                                            <Card.Body>
                                                <Card.Title>Total</Card.Title>
                                                <Card.Subtitle className="mb-2 text-muted">{this.state.total}</Card.Subtitle>
                                                <Card.Text>
                                                    Delivery cost will be added (max 10 USD / 12 EUR )
                                                </Card.Text>
                                                <Button variant="primary" onClick={this.HandlerCompleteOrder}>Complete Order</Button>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                </React.Fragment>
                                
                case 2: return <Spinner 
                                    animation="border"
                                    className="spinner-border"
                                />;

                default:
        }
    }
}