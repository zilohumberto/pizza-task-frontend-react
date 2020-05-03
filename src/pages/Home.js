import React, { Component } from 'react';
import { PizzaList } from '../components/pizza-list'
import { url_get_pizzas, url_get_sizes, url_ingredients } from '../constants/api_url'
import { Spinner, Breadcrumb   } from 'react-bootstrap';
import { getToken } from '../helper/auth-helper'


export default class Home extends Component {

    constructor() {
        super();

        this.state = {
            step: 0,
            error : null,
            pizza_to_order: {},
            sizes: [],
            authenticated: false,
            token: null,
            user: {
                "first_name": "Anony", "last_name": "Mous", id: null, 
                "username": "anonymous", "delivery_address":[], "contact": []
            }
        }
    }

    componentDidMount() {

        const token = getToken();
        if(token != null && token.User != null)
        {
            this.setState({ user: token.User });
        }

        if(this.state.step === 0)
            this.get_pizzas();
    }

    get_pizzas() {

        fetch(url_get_pizzas)                   
            .then(res => res.json())
            .catch(error => {
                this.setState({ error });
            })
            .then(data => {
                this.setState({ pizzas:data });
                this.get_sizes();
            })
    }

    get_sizes() {
        
        fetch(url_get_sizes)                   
            .then(res => res.json())
            .catch(error => {
                this.setState({ error });
            })
            .then(data => {
                this.setState({ sizes: data });
                this.get_toppings();
            })
    }

    get_toppings(){
        fetch(url_ingredients)                   
            .then(res => res.json())
            .catch(error => {
                this.setState({ error });
            })
            .then(data => {
                let ingredients = data.filter(ingredient => ingredient.is_topping === true);
                this.setState({ ingredients, step: 1 });
            })
    }

    render() {       
        
        const { error } = this.state;

        if (error) {
            return <p>{error.message}</p>;
        }
        let breadcrumb = <Breadcrumb>
            <Breadcrumb.Item active>Home</Breadcrumb.Item>
        </Breadcrumb>
        switch(this.state.step) {
            case 0: return <div>
                    {breadcrumb}
                    <Spinner 
                                animation="border"
                                className="spinner-border"
                            />
                </div>
            case 1:
                return <React.Fragment>
                                <PizzaList 
                                pizzas={this.state.pizzas}
                                sizes={this.state.sizes}
                                ingredients={this.state.ingredients}
                                user={this.state.user}
                            />
                        </React.Fragment>
            default: return <h1>Not found</h1>
        }
    }
}