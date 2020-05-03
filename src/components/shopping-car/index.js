import React from 'react';
import { Nav, Badge } from 'react-bootstrap';
import { FaShoppingCart } from "react-icons/fa";

export
 function ShoppingCar() {
    return(
        <Nav.Link href="/" style={{ color:'white' }}>
            <FaShoppingCart size={24} /> <Badge variant="secondary">(0)</Badge>
        </Nav.Link>
    );
}