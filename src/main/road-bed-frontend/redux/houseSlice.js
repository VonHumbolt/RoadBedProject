const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  house: {},
};

export const houseSlice = createSlice({
  name: "house",
  initialState,
  reducers: {
    add: (state, action) => {
      state.house = action.payload;
    },
    remove: (state) => {
      state.house = {};
    },
  },
});

export const {add, remove} = houseSlice.actions;

export const houseFromRedux = (state) => state.house.house;

export default houseSlice.reducer;
