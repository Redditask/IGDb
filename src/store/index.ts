import {configureStore} from "@reduxjs/toolkit";

import {rawgApi} from "../API/rawgApi";

export const store = configureStore({
    reducer: {
        [rawgApi.reducerPath]: rawgApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rawgApi.middleware),
});
