import {configureStore} from "@reduxjs/toolkit";

import {rawgApi} from "../API/rawgApi";
import {igdbAPI} from "../API/igdbAPI";

import {listenerMiddleware} from "../middleware/auth";

export const store = configureStore({
    reducer: {
        [rawgApi.reducerPath]: rawgApi.reducer,
        [igdbAPI.reducerPath]: igdbAPI.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
    }).concat(rawgApi.middleware).concat(igdbAPI.middleware).prepend(listenerMiddleware.middleware),
});
