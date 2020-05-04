import React, { Component } from 'react';
import { PizzaItem } from '../pizza-item';
import Topping from '../topping/topping';
import User  from '../users/users';
import { Row, Col, Badge, Button } from 'react-bootstrap'
import { getOrder, deleteOrder } from '../../helper/order_cookie_helper';
import { url_orders_order } from '../../constants/api_url';


export class PizzaList extends Component {

    constructor(props){
        super(props);

        this.state = { 
            step: 1,
            pizza:{},
            price:{},
            ingredients: props.ingredients,
            user: props.user,
            order: null,
        };
    }

    componentDidMount() {
        if(this.props.user.id === null){
            deleteOrder();
            return ;
        }
        const cookieOrder = getOrder();
        if(cookieOrder !== null && cookieOrder !== undefined) {
            fetch(`${url_orders_order}?id=${cookieOrder.orderId}`)
                .then(res => res.json())
                .catch(error => {
                    console.log("Error");
                })
                .then((response) => {
                    if(response.length > 0) {
                        this.setState({ order:response[0] });
                    } else {
                        deleteOrder();
                    }
                });
        }
    }

    handlerDetailPizza = (price, pizza) => {
        this.setState({ step:2, pizza, price, });
    }

    continue_order = (order) =>{
        this.setState({ order, step: 1 })
    }

    complete_order = (order) => {
        this.setState({order, step: 3})
    }
    
    render(){
        const { pizzas, sizes } = this.props;
        switch (this.state.step) {
            case 1:
                return <React.Fragment>
                            <Row>
                                <Col xs={12} md={3} ></Col>
                                {sizes.map(item => {
                                    return <Col xs={4} md={3} key={item.id}>
                                                <Badge pill variant="success">{item.name}</Badge>
                                            </Col>
                                })}
                            </Row>

                            {pizzas.map(item => {
                                return <PizzaItem 
                                                key={item.id} 
                                                pizza={item}
                                                handlerDetailPizza={this.handlerDetailPizza} />
                            })}
                        </React.Fragment>;

            case 2:
                // after select a pizza... now you can select your ingredients!
                // TODO remove a ingredient for default in a pizza
                return <Topping 
                            ingredients={this.state.ingredients}
                            continue_order={this.continue_order} 
                            complete_order={this.complete_order}
                            pizza={this.state.pizza} 
                            price={this.state.price} 
                            user={this.state.user}
                            order={this.state.order}
                        />;
            case 3:
                return <User order={this.state.order} user={this.state.user} need_confirm={true} step={1} />
            default:
        }
    };

}