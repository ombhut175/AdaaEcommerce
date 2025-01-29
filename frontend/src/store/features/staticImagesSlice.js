import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Fetch static images from backend
export const fetchStaticImages = createAsyncThunk(
    "fetchStaticImages",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/getStaticImages`, { withCredentials: true });
            return response.data;
        } catch (e) {
            console.log("Error fetching static images:", e);
            return rejectWithValue(e.response ? e.response.data : "Network error");
        }
    }
);

// ✅ Correct initial state (removed Mongoose-style schema)
const initialState = {
    status: "idle",
    error: null,
    heroSection: {
        left: "https://images.unsplash.com/photo-1520975661595-6453be3f7070?auto=format&fit=crop&q=80",
        right: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80"
    },
    brands: [],
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

// Redux slice
export const staticImagesSlice = createSlice({
    name: "staticImages",
    initialState,
    reducers: {},  // No reducers needed since only async thunk updates state
    // staticImagesSlice.js
    extraReducers: (builder) => {
        builder.addCase(fetchStaticImages.fulfilled, (state, action) => {
            // Deep merge with existing state
            Object.keys(action.payload).forEach((key) => {
                state[key] = { ...state[key], ...action.payload[key] };
            });
        });
    }
});

// Export the reducer
export default staticImagesSlice.reducer;
