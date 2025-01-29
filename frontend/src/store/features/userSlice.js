import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export const fetchUser = createAsyncThunk('fetchUser', async (_, rejectWithValue) => {
    try {
        console.log("Fetching user...");
        const response = await axios.get(`${BACKEND_URL}/api/user/userInfo`, {withCredentials: true});
        return response.data;
    } catch (e) {
        console.log('error ', e);
        return rejectWithValue(e.response ? e.response.data : 'Network error');
    }
})

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        id: '',
        email: '',
        name: '',
        profilePicture: '',
        userType: 'normal',
        role: []
    },
    reducers: {
        addUser: (state, action) => {
            Object.assign(state, action.payload);
        },
        logOutUser: (state) => {
            Object.keys(state).forEach(key => delete state[key]);
        },
        setProfilePicture: (state, action) => {
            state.profilePicture = action.payload;
        },
        changeName: (state, action) => {
            state.name = action.payload;
        },
        editUser: (state, action) => {
            state.name = action.payload.name;
            state.profilePicture = action.payload.profilePicture;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            return {...state, ...action.payload};
        })
    }
});


export const {addUser, logOutUser, setProfilePicture, changeName, editUser} = userSlice.actions;

export default userSlice.reducer;