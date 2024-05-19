import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Shift } from "../services/apiservices"; // Assuming you have a Shift interface
import { bookShift, cancel, getShifts } from "../services/apiservices";

export interface ShiftsState {
  shiftsData: Shift[];
  isfetching: boolean;
  isupdating: boolean;
}

const initialState: ShiftsState = {
  shiftsData: [],
  isfetching: false,
  isupdating: false,
};

export const fetchShifts = createAsyncThunk<Shift[]>(
  "shifts/fetchShifts",
  async () => {
    const response = await getShifts();
    return response;
  }
);

export const updateShifts = createAsyncThunk<Shift, string>( // Update type to string (id)
  "shifts/updateShifts",
  async (id, thunkAPI) => {
    const { getState } = thunkAPI;
    const response = await bookShift(id);
    return response;
  }
);

export const cancelShifts = createAsyncThunk<Shift, string>( // Update type to string (id)
  "shifts/cancelShifts",
  async (id) => {
    const response = await cancel(id);
    return response;
  }
);

export const shiftsSlice = createSlice({
  name: "shifts",
  initialState,
  reducers: {}, // No reducers defined yet
  extraReducers: (builder) => {
    builder.addCase(fetchShifts.pending, (state) => {
      state.isfetching = true;
    });
    builder.addCase(fetchShifts.fulfilled, (state, action) => {
      state.isfetching = false;
      state.shiftsData = action.payload;
    });
    builder.addCase(fetchShifts.rejected, (state) => {
      state.isfetching = false;
    });
    builder.addCase(updateShifts.pending, (state) => {
      state.isupdating = true;
    });
    builder.addCase(updateShifts.fulfilled, (state, action) => {
      const { id, booked } = action.payload;
      const shiftIndex = state.shiftsData.findIndex((shift) => shift.id === id);
      if (shiftIndex !== -1) {
        state.shiftsData[shiftIndex].booked = booked;
      }
      state.isupdating = false;
    });
    builder.addCase(updateShifts.rejected, (state) => {
      state.isupdating = false;
    });
    builder.addCase(cancelShifts.pending, (state) => {
      state.isupdating = true;
    });
    builder.addCase(cancelShifts.fulfilled, (state, action) => {
      const { id, booked } = action.payload;
      const shiftIndex = state.shiftsData.findIndex((shift) => shift.id === id);
      if (shiftIndex !== -1) {
        state.shiftsData[shiftIndex].booked = booked;
      }
      state.isupdating = false;
    });
    builder.addCase(cancelShifts.rejected, (state) => {
      state.isupdating = false;
    });
  },
});

export default shiftsSlice.reducer;
