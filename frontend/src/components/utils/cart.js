import axios from "axios";

const handleAddCart = (id,selectedColor)=>{
    axios.post(import.meta.env.VITE_BACKEND_URL + "/api/cart/addProduct/"+id,{selectedColor},{withCredentials: true})
        .then((res)=>{
            console.log(res);

        })
}