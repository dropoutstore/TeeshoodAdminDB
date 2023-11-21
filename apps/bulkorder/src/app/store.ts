import { configureStore } from '@reduxjs/toolkit';
import userReduser from '../components/AdminAuth/redux-slice';
import CompanyReduser from '../MIDL/companyProfile/reduxSlice';
export const store = configureStore({
  reducer: {
    user: userReduser,
    Company: CompanyReduser,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
