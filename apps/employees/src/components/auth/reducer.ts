import { createSlice } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

export interface UserDetailState {
    user: User | null | undefined;
    claims: {
      [key: string]: string;
    };
  }


  const initialState: UserDetailState = {
    user: undefined,
    claims:{}
  };
  
  export const UserSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
      setUser: (state, action) => {
        return action.payload;
      },
    },
  });
  
  export const { setUser } = UserSlice.actions;
  
  export default UserSlice.reducer;