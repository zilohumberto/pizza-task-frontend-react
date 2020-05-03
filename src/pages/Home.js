import React, { Component } from 'react';
import { PizzaList } from '../components/pizza-list'
//import { DeliveryAddress } from '../components/delivery-address'
import { url_get_pizzas, url_get_sizes } from '../constants/api_url'
import { UserContact } from '../components/user-contact';

import { Spinner  } from 'react-bootstrap';

export default class Home extends Component {
    state = {
        step: 2,
        pizzas: [
            {
                "id": 1,
                "name": "4 quesos",
                "description": "4 quesos.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dignissim lectus non metus iaculis ullamcorper. Nulla facilisi. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed scelerisque faucibus velit, ut varius tellus dignissim sit amet. Maecenas blandit scelerisque dui eget suscipit. Etiam consectetur sodales pulvinar. Nulla rutrum venenatis est, et dictum massa pulvinar in. Sed eget molestie augue. Phasellus tempus ornare eleifend. Aliquam malesuada sed dolor nec tristique. Ut sit amet mollis metus, a placerat urna. Donec pulvinar molestie eleifend. Fusce non risus vitae leo efficitur congue. Pellentesque luctus nec metus congue fermentum. Proin scelerisque placerat quam non congue. Praesent ac vulputate nibh. Nam tortor odio, venenatis vel gravida id, ultricies id nibh. Donec faucibus neque quis elit vehicula, vitae ullamcorper lorem efficitur. Duis vehicula massa eu turpis commodo, ullamcorper mollis lectus finibus. Interdum et malesuada fames ac ante ipsum primis in faucibus",
                "photo": "https://www.hola.com/imagenes/cocina/recetas/20200120158504/pizza-hawaiana-o-pizza-tropical/0-770-827/pizza-hawaiana-m.jpg",
                "prices": [
                    {
                        "id": 1,
                        "pizza": 1,
                        "size": {
                            "id": 2,
                            "name": "small",
                            "description": "small"
                        },
                        "price": 50.0,
                        "is_active": true
                    },
                    {
                        "id": 2,
                        "pizza": 1,
                        "size": {
                            "id": 3,
                            "name": "medium",
                            "description": "medium"
                        },
                        "price": 250.0,
                        "is_active": true
                    },
                    {
                        "id": 3,
                        "pizza": 1,
                        "size": {
                            "id": 3,
                            "name": "big",
                            "description": "big"
                        },
                        "price": 500.0,
                        "is_active": true
                    }
                ]
            },
            {
                "id": 2,
                "name": "napo",
                "description": "Napo.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dignissim lectus non metus iaculis ullamcorper. Nulla facilisi. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed scelerisque faucibus velit, ut varius tellus dignissim sit amet. Maecenas blandit scelerisque dui eget suscipit. Etiam consectetur sodales pulvinar. Nulla rutrum venenatis est, et dictum massa pulvinar in. Sed eget molestie augue. Phasellus tempus ornare eleifend. Aliquam malesuada sed dolor nec tristique. Ut sit amet mollis metus, a placerat urna. Donec pulvinar molestie eleifend. Fusce non risus vitae leo efficitur congue. Pellentesque luctus nec metus congue fermentum. Proin scelerisque placerat quam non congue. Praesent ac vulputate nibh. Nam tortor odio, venenatis vel gravida id, ultricies id nibh. Donec faucibus neque quis elit vehicula, vitae ullamcorper lorem efficitur. Duis vehicula massa eu turpis commodo, ullamcorper mollis lectus finibus. Interdum et malesuada fames ac ante ipsum primis in faucibus",
                "photo": "https://www.hola.com/imagenes/cocina/recetas/20200120158504/pizza-hawaiana-o-pizza-tropical/0-770-827/pizza-hawaiana-m.jpg",
                "prices": [
                    {
                        "id": 4,
                        "pizza": 2,
                        "size": {
                            "id": 2,
                            "name": "small",
                            "description": "small"
                        },
                        "price": 50.0,
                        "is_active": true
                    },
                    {
                        "id": 5,
                        "pizza": 2,
                        "size": {
                            "id": 3,
                            "name": "medium",
                            "description": "medium"
                        },
                        "price": 250.0,
                        "is_active": true
                    },
                    {
                        "id": 6,
                        "pizza": 2,
                        "size": {
                            "id": 3,
                            "name": "big",
                            "description": "big"
                        },
                        "price": 500.0,
                        "is_active": true
                    }
                ]
            }
        ],
        ingredients: [
            {
                "id": 1,
                "name": "Peperoni",
                "description": "peep",
                "is_topping": true,
                "cost": 0.1,
                "creation_date": "2020-04-28T02:27:03.381732Z",
                "update_date": "2020-04-28T02:27:03.381832Z"
            },
            {
                "id": 2,
                "name": "Tomato",
                "description": "Tomato",
                "is_topping": true,
                "cost": 0.2,
                "creation_date": "2020-04-28T02:27:03.381732Z",
                "update_date": "2020-04-28T02:27:03.381832Z"
            }
        ],
        error : null,
        isLoading: false,
        pizza_to_order: {},
        sizes: [],
    }

    componentDidMount() {
        if(this.state.step === 1)
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
        fetch(url_get_sizes)                   
            .then(res => res.json())
            .catch(error => {
                this.setState({ error });
            })
            .then(data => {

                let { ingredients } = this.state;
                ingredients = ingredients.filter(ingredient => ingredient.is_topping === true);

                this.setState({ ingredients, isLoading: false });
            })
    }

    render() {

        const { isLoading, error } = this.state;

        if (error) {
            return <p>{error.message}</p>;
        }

        if (isLoading) {
            return <Spinner animation="border" />;
        }
        
        switch(this.state.step) {
            case 1:
                // list of pizzas to choose
                return <PizzaList 
                            pizzas={this.state.pizzas}
                            sizes={this.state.sizes}
                            ingredients={this.state.ingredients} />

            case 2:
                return <UserContact userId={1} />

            default:
        }
    }
}