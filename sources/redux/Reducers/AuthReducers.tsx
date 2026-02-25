import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuth: false,
  AsyncValue: {},
};

const Authentication = createSlice({
  name: 'Authentication',
  initialState: initialState,
  reducers: {
    onAuthChange: (state, action) => {
      state.isAuth = action.payload;
    },
    setUserDataRedux: (state, action) => {
      state.AsyncValue = action.payload;
    },
  },
});

export const {
  onAuthChange,
  setUserDataRedux,
} = Authentication.actions;

export default Authentication.reducer;