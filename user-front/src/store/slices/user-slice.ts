import { createSlice } from '@reduxjs/toolkit';

interface IUserState {
  user: {
    username: string;
    role: string;
    csrfToken: string;
  } | null;
}

const initialState: IUserState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: () => {
      console.log('login slice');
    },
  },
});

export const { login } = userSlice.actions;
export default userSlice.reducer;
