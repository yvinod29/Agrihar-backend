import { createSlice } from '@reduxjs/toolkit';

 
// Define the initial state using that type
const initialState= {
  userId: "",
  firstName: "",
  lastName: "",
  email: "",
};

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userId = action.payload.userId;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
    },
  },
});

export const { setUserData } = authSlice.actions;

export default authSlice.reducer;
