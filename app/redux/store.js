import { configureStore } from '@reduxjs/toolkit'
import { shiftsSlice } from './slice'
// ...
const store = configureStore({
    reducer: {
        shift: shiftsSlice.reducer
    },
})

export default store