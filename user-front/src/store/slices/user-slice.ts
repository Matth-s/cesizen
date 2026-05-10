import type { userType } from "@/features/auth/schemas/current-user-schema";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface IUserState {
  user: userType | null;
}

const initialState: IUserState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<userType | null>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
