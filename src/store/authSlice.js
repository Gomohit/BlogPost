import {createSlice} from "@reduxjs/toolkit"

const initialState={
    status:false,
    userData:null,
    theme: "light",
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.status=true
            state.userData=action.payload.userData
        },
        logout:(state)=>{
            state.status=false
            state.userData=null
        },
        toggleTheme: (state) => {
            state.theme = state.theme === "light" ? "dark" : "light";
        },
    }
})
export const {login,logout,toggleTheme} = authSlice.actions;
export default authSlice.reducer