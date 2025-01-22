import {configureStore} from '@reduxjs/toolkit';
import authentication from './slice/auth';

export const store = configureStore({
    reducer: authentication
})