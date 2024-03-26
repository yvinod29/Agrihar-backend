import { configureStore } from '@reduxjs/toolkit';
// ...
import { setupListeners } from '@reduxjs/toolkit/query';
  import { authApi } from './api/AuthApi';
  import authReducer  from "./state/authSlice";
import weddingReducer from './state/weddingSlice'
import agricultureReducer from './state/agricultureSlice'
import { weddingApi } from './api/WeddingApi';
import { agricultureApi } from './api/AgricultureApi';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    wedding:weddingReducer,
    [weddingApi.reducerPath]:weddingApi.reducer,
    agriculture:agricultureReducer,
    [agricultureApi.reducerPath]:agricultureApi.reducer
     
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware,weddingApi.middleware,agricultureApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export var RootState = store.getState;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export var AppDispatch = store.dispatch;

setupListeners(store.dispatch);
