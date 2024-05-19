import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { bookShift, cancel, getShifts } from "../services/apiservices"

const initialState = {
    shiftsData: [],
    isfetching: false,
    isupdating: false
}

export const fetchShifts = createAsyncThunk(
    'shifts/fetchShifts',
    async () => {
        const response = await getShifts()
        return response
    },
)

export const updateShifts = createAsyncThunk(
    'shifts/updateShifts',
    async (id, thunkAPI) => {
        const { getState } = thunkAPI
        const response = await bookShift(id)
        return response
    },
)

export const cancelShifts = createAsyncThunk(
    'shifts/cancelShifts',
    async (id) => {
        const response = await cancel(id)
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
        builder.addCase(fetchShifts.rejected, (state, action) => {
            state.isfetching = false
        })
        builder.addCase(updateShifts.pending, (state, action) => {
            state.isupdating = true
        })
        builder.addCase(updateShifts.fulfilled, (state, action) => {
            const { id, booked } = action.payload;
            const shiftIndex = state.shiftsData.findIndex((shift) => shift.id === id);
            if (shiftIndex !== -1) {
              state.shiftsData[shiftIndex].booked = booked;
            }
            state.isupdating = false
        })
        builder.addCase(updateShifts.rejected, (state, action) => {
            state.isupdating = false
        })
        builder.addCase(cancelShifts.pending, (state, action) => {
            state.isupdating = true
        })
        builder.addCase(cancelShifts.fulfilled, (state, action) => {
            const { id, booked } = action.payload;
            const shiftIndex = state.shiftsData.findIndex((shift) => shift.id === id);
            if (shiftIndex !== -1) {
              state.shiftsData[shiftIndex].booked = booked;
            }
            state.isupdating = false
        })
        builder.addCase(cancelShifts.rejected, (state, action) => {
            state.isupdating = false
        })
    },
})