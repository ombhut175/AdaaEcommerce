import React, {useEffect, useState} from 'react';
import axios from "axios";
axios.defaults.withCredentials = true;

const Cart = () => {
    const BACKEND_URL    = import.meta.env.VITE_BACKEND_URL;
    const [cart, setCart] = useState([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/cart`, {withCredentials: true})
            .then(res => {
                setCart(res.data.products);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])
    return (
        <>

        </>
    );
};

export default Cart;
