import { createSlice } from '@reduxjs/toolkit';
import { CompanyProfile } from './form';

export interface CompanyDetailState {
  companyProfile: CompanyProfile | null | undefined;
}

// export const auth = getAuth(app);

const initialState: CompanyDetailState = {
  companyProfile: undefined ,
};

export const CompanySlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setCompany: (state, action) => {
      state.companyProfile = action.payload;
    },
  },
});

export const { setCompany } = CompanySlice.actions;

export default CompanySlice.reducer;
