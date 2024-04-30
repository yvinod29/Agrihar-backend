import { createSlice } from '@reduxjs/toolkit';

 
// Define the initial state using that type
const initialState= {
  agricultureId: "",
   
};

export const agriclutureSlice = createSlice({
  name: 'agricluture',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.agricultureId = action.payload.agricultureId;
      
    },
  },
});

export const { setUserData } = agriclutureSlice.actions;

export default agriclutureSlice.reducer;
