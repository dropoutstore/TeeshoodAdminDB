import { createSlice } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';

export type signupStatusType =
  | 'start'
  | 'signup'
  | 'details'
  | 'assessment'
  | 'enrolled'
  | 'instructions'
  | 'test completed'
  | 'test result'
  | 'interview'
  | 'bank verified'
  | 'pan verified'
  | 'completed'
  | 'preview accepted';

export type tutorType = {
  email: string;
  name: string;
  phone: string;
  password: string;
  whatsapp: string;
  marketingChannel: string;
  education:
    | 'Btech'
    | 'BE'
    | 'BSc'
    | 'Btech'
    | 'M.Tech'
    | 'Msc'
    | 'MBA'
    | 'PhD'
    | null;
  degreeName: 'Bachelors' | 'Masters' | 'PhD' | null;
  department: string;
  graduationYear: string;
  identification: string;
  college: string;
  signupStatus:signupStatusType;
};

export interface UserDetailState {
  loading: boolean;
  user: User | null | undefined;
}

// export const auth = getAuth(app);

const initialState: UserDetailState = {
  loading: true,
  user: undefined,
};

export const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    submit: (state, action) => {
      state.user = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
  },
});

export const { setUser, submit } = UserSlice.actions;

export default UserSlice.reducer;
