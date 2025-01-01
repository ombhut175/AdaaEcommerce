import { configureStore } from '@reduxjs/toolkit'
import userPreferences from "./slice/userPreferences.js";

export const store = configureStore({
    reducer: {
        userPreferences,
    },
})