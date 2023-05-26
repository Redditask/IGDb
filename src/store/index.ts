import {configureStore} from "@reduxjs/toolkit";

import {rawgApi} from "../API/rawgApi";
import {igdbAPI} from "../API/igdbAPI";
import userReducer from "./userSlice";

import {listenerMiddleware} from "../middleware/auth";

export const store = configureStore({
    reducer: {
        user: userReducer,
        [rawgApi.reducerPath]: rawgApi.reducer,
        [igdbAPI.reducerPath]: igdbAPI.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
    }).concat(rawgApi.middleware).concat(igdbAPI.middleware).prepend(listenerMiddleware.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
