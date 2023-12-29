import { createSlice } from "@reduxjs/toolkit";
const initialState={
    user:null,
    isAuth:false,
    token:null
}

export const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        addLoginData:(state,action)=>{
            state.user=action.payload.user;
            state.token=action.payload.token;
            state.isAuth=action.payload.isAuth;
        }
    }
})

export const {addLoginData}=authSlice.actions;
export default authSlice.reducer;