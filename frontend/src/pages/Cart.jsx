import React, {useEffect, useState} from 'react';
import axios from "axios";

const Cart = () => {
    const BACKEND_URL    = import.meta.env.VITE_BACKEND_URL;
    const [cart, setCart] = useState([]);

    useEffect(() => {
        console.log(BACKEND_URL);
        axios.get(`${BACKEND_URL}/api/cart`)
            .then(res => {
                setCart(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])
    return (
        <div>
            {JSON.stringify(cart)}
        </div>
    );
};

export default Cart;
