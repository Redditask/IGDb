import {combineReducers, configureStore} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
    persistReducer,
    persistStore,
} from "redux-persist";

import {rawgApi} from "../API/rawgApi";
import {igdbAPI} from "../API/igdbAPI";
import userReducer from "./userSlice";

import {listenerMiddleware} from "../middleware/auth";

const rootReducer = combineReducers({
    user: userReducer,
    [rawgApi.reducerPath]: rawgApi.reducer,
    [igdbAPI.reducerPath]: igdbAPI.reducer,
});

const persistConfig = {
    key: "root",
    storage: storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
    }).concat(rawgApi.middleware).concat(igdbAPI.middleware).prepend(listenerMiddleware.middleware),
});

export const persistor = persistStore(store);
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
