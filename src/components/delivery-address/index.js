import React, { useState, Component } from 'react';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { url_users_delivery } from '../../constants/api_url'
import { DeliveryAddressList } from '../delivery-address/delivery-address-list'

function DeliveryAddressForm(props) {

    const [validated, setValidated] = useState(false);
    var departament, zip_code, street, detail
    
    const handleSubmit = (event) => {
      const form = event.currentTarget;
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      if (form.checkValidity() === false){
        return ;
      }
      let data = {
            'street': street.value,
            'detail': detail.value,
            'zip_code': zip_code.value,
            'departament': departament.value,
            'user': props.user_detail.id
      };
      fetch(url_users_delivery,
        {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }
        }
        )
      .then(res => res.json())
      .then(
        (result) => {
            debugger;
            props.next_address(result);
        },
        (error) => {
          console.log(error);
        }
      )
    };
  
    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Row>

                <Form.Group as={Col} md="4" controlId="validationStreet">
                    <Form.Label>Street</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Street"
                        ref={(input) => street = input}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter a Street.
                        </Form.Control.Feedback>
                </Form.Group>
          
                <Form.Group as={Col} md="4" controlId="validationDepartament">
                    <Form.Label>Departament</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Departament"
                        ref={(input) => departament = input}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter a Departament
                        </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="4" controlId="validationZipCode">
                    <Form.Label>Zip Code</Form.Label>
                    <InputGroup>
                        <Form.Control
                            type="text"
                            placeholder="Zip Code"
                            required
                            ref={(input) => zip_code = input}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter a ZipCode.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} md="12" controlId="validationCustom03">
                    <Form.Label>Detail</Form.Label>
                    <Form.Control as="textarea" rows="3" 
                        ref={(input) => detail = input}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a Detail
                    </Form.Control.Feedback>
                </Form.Group>

            </Form.Row>
            <Button type="submit">Submit</Button>
        </Form>
    );
  }

export class DeliveryAddress extends Component {   
    
    render(){
        const { next_address, user } = this.props;
        debugger;
        return (
            <React.Fragment>
                <Row>
                    <Col>
                        <DeliveryAddressForm user_detail={user} next_address={next_address} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <br></br>
                        <DeliveryAddressList 
                            next_address={next_address}
                            address={user.delivery_address}
                        />
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}