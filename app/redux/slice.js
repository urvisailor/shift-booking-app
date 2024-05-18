import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getShifts } from "../services/apiservices"

const initialState = {
    shiftsData: [],
    isfetching: false
}

export const fetchShifts = createAsyncThunk(
    'shifts/fetchShifts',
    async () => {
        const response = await getShifts()
        return response
    },
)

export const shiftsSlice = createSlice({
    name: 'shifts',
    initialState,
    reducers: {
        // fill in primary logic here
    },
    extraReducers: (builder) => {
        builder.addCase(fetchShifts.pending, (state, action) => {
            state.isfetching = true
        })
        builder.addCase(fetchShifts.fulfilled, (state, action) => {
            state.isfetching = false
            state.shiftsData = action.payload
        })
    },
})