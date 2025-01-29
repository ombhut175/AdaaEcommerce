import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './features/themeSlice';
import userReducer from './features/userSlice.js';
import staticImageReducer from './features/staticImagesSlice.js';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
    staticImages: staticImageReducer,
  },
});

export default store;