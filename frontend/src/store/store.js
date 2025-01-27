import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './features/themeSlice';
import userReducer from './features/userSlice.js';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
  },
});

export default store;