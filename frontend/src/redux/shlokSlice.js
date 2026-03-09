import { createSlice } from "@reduxjs/toolkit";

const shlokSlice = createSlice({
    name : "shlok",
    initialState :{
        shlokData : null
    },
    reducers : {
        setShlokData :(state,action)=>{
            state.shlokData = action.payload
        }
    }
})

export const {setShlokData} = shlokSlice.actions
export default shlokSlice.reducer