import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setWalletPoints: (state, action) => {
      state.user.wallet = action.payload;
    },
    setRewards: (state, action) => {
      state.user.rewards = action.payload;
    },
  },
});

export const { setUser, setWalletPoints, setRewards } = userSlice.actions;

export default userSlice.reducer;
