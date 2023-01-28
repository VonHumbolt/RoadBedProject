import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: { }
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        save: (state, action) => {
            state.user = action.payload;
        },
        remove: (state) => {
            state.user = { };
        }
    }
})

export const {save, remove} = userSlice.actions

export const userFromRedux = (state) => state.user.user;

export default userSlice.reducer;