import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    authDetails: [{ token: "Adsad" }]
};

export const authentication = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        addAuthDetail: (state, action) => {
            const authDetail = action.payload;
            state.authDetails.push(authDetail); // Corrected property name
        },
        removeAuthDetail: (state, action) => {
            const tokenToRemove = action.payload;
            state.authDetails = state.authDetails.filter(
                (authDetail) => authDetail.token !== tokenToRemove
            ); // Remove the matching token
        }
    }
});

export const { addAuthDetail, removeAuthDetail } = authentication.actions;

export default authentication.reducer;
