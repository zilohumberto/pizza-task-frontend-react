import React, { Component } from 'react';
import { PizzaItem } from '../pizza-item';
import Topping from '../topping/topping';
import User  from '../users/users';
import { Row, Col, Badge, Button } from 'react-bootstrap'


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
            order:null,
        };
    }

    handlerDetailPizza = (price, pizza) => {
        this.setState({ step:2, pizza, price, });
    }

    next_step = (order) =>{
        this.setState({ order, step: 1 })
    }

    handleFinalizePurchase = () =>{
        this.setState({ step: 3 })
    }
    
    render(){

        const { pizzas, sizes } = this.props;
        let finalize
        if (this.state.order !== null){
            debugger;
            finalize = <Button 
                size="sm"
                variant="primary" 
                onClick={this.handleFinalizePurchase}>
                    Finalize purchase
            </Button>
        }
        switch (this.state.step) {
            case 1:
                return <React.Fragment>

                            <Row>
                                <Col style={{ textAlign:"Right" }}>
                                    <br></br>
                                    {finalize}
                                </Col>
                            </Row>
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
                            user={this.state.user}
                            order={this.state.order}
                        />;
            case 3:
                return <User order={this.state.order} user={this.state.user} need_confirm={true} step={1} />
            default:
        }
    };

}