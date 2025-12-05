import { configureStore } from '@reduxjs/toolkit'
import recordsSlice from './slices/recordsSlice'
import authSlice from './slices/authSlice'

const store = configureStore({
  reducer: {
    records: recordsSlice,
    auth: authSlice
  },
})

export default store
