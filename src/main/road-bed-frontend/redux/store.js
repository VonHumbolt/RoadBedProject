import { configureStore } from '@reduxjs/toolkit'
import houseSlice from './houseSlice'
import userSlice from './userSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    house: houseSlice
  },
})