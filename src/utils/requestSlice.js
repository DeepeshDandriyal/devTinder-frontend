import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addRequests: (state, action) => action.payload,
    removeRequests: () => null,
    removeRequest: (state, action) => {
      const newState = state.filter(
        (request) => request._id !== action.payload
      );
      return newState;
      //here we reviewed the request(accept or reject) now we need to remove a particular request from requests of user
    },
  },
});

export const { addRequests, removeAllRequests, removeRequest } =
  requestSlice.actions;

export default requestSlice.reducer;
