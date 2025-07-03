import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { pingReducer } from './services/pingSlice';

const rootReducer = combineReducers({
  ping: pingReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
});

