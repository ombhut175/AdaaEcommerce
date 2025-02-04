import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export const fetchCart = createAsyncThunk('fetchCart', async (_, rejectWithValue) => {
    axios.get(BACKEND_URL + '/api/cart', { withCredentials: true })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.error('Error fetching cart:', err));
})


export const userSlice = createSlice({
    name: 'cart',
    initialState: {
        id: '',
        cart:[]
    },
    reducers: {
        addCart(state,action){
            
        }
    },
    extraReducers: (builder) => {
        
        builder.addCase(fetchCart.fulfilled , (state,action) =>{
            return {...state, ...action.payload};
        })
    }
});


export const {addUser, logOutUser, setProfilePicture, changeName, editUser,logInUser,changeRole} = userSlice.actions;

export default userSlice.reducer;