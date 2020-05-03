import React, { Component } from 'react';
import { PizzaList } from '../components/pizza-list'
import { url_get_pizzas, url_get_sizes, url_ingredients } from '../constants/api_url'
import { Spinner  } from 'react-bootstrap';


export default class Home extends Component {

    state = {
        step: 0,
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
        pizza_to_order: {},
        sizes: [],
        authenticated: false,
        token: null,
        user: {
            "first_name": "Anony", "last_name": "Mous", id: null, 
            "username": "anonymous", "delivery_address":[], "contact": []
        }
    }

    componentDidMount() {
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
        
        switch(this.state.step) {
            case 0: return <Spinner 
                                animation="border"
                                className="spinner-border"
                            />
            case 1:
                // list of pizzas to choose
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