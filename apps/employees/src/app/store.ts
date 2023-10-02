import { configureStore } from '@reduxjs/toolkit'
import userReduser from '../components/auth/reducer'
export const store = configureStore({
  reducer: {
    user: userReduser
  },
  middleware: (getDefaultMiddleware:any) => getDefaultMiddleware({
    serializableCheck: false
  })
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch