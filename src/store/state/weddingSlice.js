import { createSlice } from '@reduxjs/toolkit';

 
// Define the initial state using that type
const initialState= {
  weddingId: "",
   
};

export const weddingSlice = createSlice({
  name: 'wedding',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.weddingId = action.payload.weddingId;
      
    },
  },
});

export const { setUserData } = weddingSlice.actions;

export default weddingSlice.reducer;
