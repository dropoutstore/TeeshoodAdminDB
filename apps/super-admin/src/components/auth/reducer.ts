import { createSlice } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

export interface UserDetailState {
    user: User | null | undefined;
  }


  const initialState: UserDetailState = {
    user: undefined,
  };
  
  export const UserSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
      setUser: (state, action) => {
        state.user = action.payload;
      },
    },
  });
  
  export const { setUser } = UserSlice.actions;
  
  export default UserSlice.reducer;