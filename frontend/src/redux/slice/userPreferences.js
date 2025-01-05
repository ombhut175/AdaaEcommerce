import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isDarkMode:false,
    language:'en',
}

export  const  userPreferences = createSlice({
    name:'userPreferences',
    initialState,
    reducers:{
        setMode:(state,action)=>{
            state.isDarkMode = action.payload
        },
        setLanguage:(state,action)=>{
            state.language = action.payload
        }
    }
})

export const {setMode,setLanguage} = userPreferences.actions;

export default userPreferences.reducer;