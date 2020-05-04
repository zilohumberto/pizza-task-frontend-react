import React, { Component } from 'react';
import { url_post_command, url_ingredients_by_client } from '../../constants/api_url'
import { Button, Table, Form, Breadcrumb} from 'react-bootstrap';
import User  from '../users/users';

function change_command(token, id, data, method='PATCH'){
    return new Promise((resolve, reject) => {   
        let header = {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        }
        fetch(url_post_command + id + "/", 
                    {
                        method: method,
                        headers:header,
                        body: JSON.stringify(data)
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

function change_ingredients_by_client(token, id, data, method='POST'){
    return new Promise((resolve, reject) => {   
        let header = {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        }
        let url = url_ingredients_by_client
        if(method==='DELETE'){
            url += "/" + id + "/"
        }
        fetch(url,
            {
                method: method,
                headers:header,
                body: JSON.stringify(data)
            }
        )
        .then(function(response) {
            if (!response.ok) {
                let message = 'unhandle error';
                reject(message)
            }else{
                if(method==='DELETE'){
                    resolve()
                }else{
                    resolve(response.json())
                }
            }
        })
    })
}

export class CartPizzaOptions extends Component {  
    state = {
        steps: 0,
        order: this.props.order,
        bill: this.props.bill,
        total: this.props.bill.total,
        token: this.props.token,
        user: this.props.user,
        error: null,
    }
    update_pizza=(e, item)=>{
        const {token} = this.state;
        if (e.target.value === 0){
            change_command(token, item.id, {}, 'DELETE')
            .then((data)=>{
                window.location.reload(false);
            })
            .catch((error)=>{
                this.state.setError({error})
            })
        }else{
            change_command(token, item.id, {'amount': e.target.value})
            .then((data)=>{
                window.location.reload(false);
            })
            .catch((error)=>{
                this.state.setError({error})
            })
        }
        
    }
    change_topping=(e, item)=>{
        let {total, token} = this.state;
        total = parseFloat(total)
        let data = {}
        let method = 'POST'
        if (e.target.checked){
            total += item.ingredient_topping.cost
            data = item
        }else{
            method = 'DELETE'
            total -= item.ingredient_topping.cost
        }
        change_ingredients_by_client(token, item.id, data, method)
        this.setState({total: total.toFixed(2)})
    }
    confirm_order=()=>{
        this.setState({steps:1})
    }
    render(){
        const {steps, error } = this.state
        if (error!==null){
            return {error}
        }
        switch (steps) {
            case 0:
                return <>
                <Breadcrumb>
                    <Breadcrumb.Item active>Cart</Breadcrumb.Item>
                </Breadcrumb>
                {this.state.order.command_set.map(item => {
                        return <>
                        <Table responsive striped bordered hover key={item.id}>
                            <tbody >
                                <tr >
                                    <td>{item.pizza_ordered.pizza.name}</td>
                                    <td>{item.pizza_ordered.price}</td>
                                    <td>x {item.amount}</td>
                                    <td>{item.pizza_ordered.size.name}</td>
                                    <td>
                                        <Form.Control as="select" value={item.amount} onChange={(e) => this.update_pizza(e, item)}>
                                            <option value="1" active>1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="0">Delete</option>
                                        </Form.Control>
                                    </td>
                                </tr>
                                {item.toppings.map(topping => {
                                    return <tr key={topping.id}>
                                    <td>{topping.ingredient_topping.name}</td>
                                    <td>{topping.ingredient_topping.cost}</td>
                                    <td> </td>
                                    <td> </td>
                                    <td>
                                        <Form.Check type="checkbox" controlId="inputTopping" key={topping.id}>
                                            <Form.Check.Input type="checkbox" placeholder="units" onChange={(e) => this.change_topping(e, topping)} isValid defaultChecked={true}/>
                                        </Form.Check>
                                    </td>
                                </tr>
                                })}
                            </tbody>
                        </Table>
                        </>
                    })}
                    <h1>Delivery: {this.state.bill.delivery} - Total: {this.state.total}</h1>
                    <Button type="submit" onClick={this.confirm_order}>Confirm order!</Button>
                </>
            case 1:
                return <User order={this.state.order} user={this.state.user} need_confirm={true} step={1} />
            default:
                break;
        }
    }
}


