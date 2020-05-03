import React, { Component } from 'react';
import { PizzaItem } from '../pizza-item';
import Topping from '../topping/topping';
import User  from '../users/users';
import { Row, Col, Badge } from 'react-bootstrap'


export class PizzaList extends Component {

    constructor(props){
        super(props);

        this.state = 
        { 
            step: 1,
            pizza:{},
            price:{}, 
            ingredients: props.ingredients,
            user: props.user,
        };
    }

    handlerDetailPizza = (price, pizza) =>
    {
        this.setState({ step:2, pizza, price });
    }
    next_step = (order) =>{
        this.setState({order, step: 3})
    }
    render(){

        const { pizzas, sizes } = this.props;

        switch (this.state.step) {
            case 1:
                return <React.Fragment>
                            <Row>
                                <Col xs={3}></Col>
                                {sizes.map(item => {
                                    return <Col xs={3} key={item.id}>
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
                            next_step={this.next_step} 
                            pizza={this.state.pizza} 
                            price={this.state.price} 
                        />;
            case 3:
                return <User order={this.state.order} user={this.state.user} />
            default:
        }
    };

}