import { createSlice } from "@reduxjs/toolkit";

const activitySlice = createSlice({
    name : "activity",
    initialState :{
        activityData : null
    },
    reducers : {
        setActivityData :(state,action)=>{
            state.activityData = action.payload
        }
    }
})

export const {setActivityData} = activitySlice.actions
export default activitySlice.reducer