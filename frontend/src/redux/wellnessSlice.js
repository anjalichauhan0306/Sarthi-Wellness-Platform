import { createSlice } from "@reduxjs/toolkit";

const wellnessSlice = createSlice({
    name : "wellness",
    initialState : {
        wellnessData : null
    },
    reducers : {
        setWellnessData : (state ,  action)  => {
            state.wellnessData = action.payload
        }
    }
})

export const {setWellnessData} =  wellnessSlice.actions
export default wellnessSlice.reducer