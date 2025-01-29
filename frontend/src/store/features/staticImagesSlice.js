import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Fetch static images from backend
export const fetchStaticImages = createAsyncThunk(
    "fetchStaticImages",
    async (_, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/getStaticImages`, {withCredentials: true});
            return response.data;
        } catch (e) {
            console.log("Error fetching static images:", e);
            return rejectWithValue(e.response ? e.response.data : "Network error");
        }
    }
);

const initialState = {
    status: "idle",
    error: null,
    heroSection: {
        left: "https://images.unsplash.com/photo-1520975661595-6453be3f7070?auto=format&fit=crop&q=80",
        right: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80"
    },
    brands: [
        "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80",
        "https://static.vecteezy.com/system/resources/thumbnails/020/336/375/small/nike-logo-nike-icon-free-free-vector.jpg",
        "https://images.samsung.com/is/image/samsung/assets/us/about-us/brand/logo/mo/360_197_1.png?$720_N_PNG$",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH38JNKuQMieJz8HiQSjv_Meqh06BO-wSomA&s"
    ],
    deals: [
        "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80"
    ],
    instagram: [
        "https://images.unsplash.com/photo-1520975661595-6453be3f7070",
        "https://images.unsplash.com/photo-1539109136881-3be0616acf4b",
        "https://images.unsplash.com/photo-1529139574466-a303027c1d8b",
        "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446",
        "https://images.unsplash.com/photo-1434389677669-e08b4cac3105",
        "https://images.unsplash.com/photo-1469334031218-e382a71b716b"
    ]
};

export const staticImagesSlice = createSlice({
    name: "staticImages",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchStaticImages.fulfilled, (state, action) => {
            Object.keys(action.payload).forEach((key) => {
                const payloadValue = action.payload[key];
                if (Array.isArray(payloadValue)) {
                    // Replace state array with payload array
                    state[key] = payloadValue;
                } else if (typeof payloadValue === 'object' && payloadValue !== null) {
                    // Merge objects
                    state[key] = {...state[key], ...payloadValue};
                } else {
                    // Replace primitives (string, number, boolean)
                    state[key] = payloadValue;
                }
            });
        });
    }
});

export default staticImagesSlice.reducer;