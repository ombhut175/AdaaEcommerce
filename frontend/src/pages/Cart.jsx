import React, {useState} from 'react';
import axios from "axios";

const Cart = () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    console.log(backendUrl);
    const [cart, setCart] = useState([]);
    function getCart() {
        axios.get(`${backendUrl}/api/cart`)
            .then(res => {
                setCart(res.data);
            })
    }
    return (
        <div>
            {JSON.stringify(cart)}
        </div>
    );
};

export default Cart;
