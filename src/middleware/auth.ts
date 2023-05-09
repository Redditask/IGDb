import { createListenerMiddleware } from "@reduxjs/toolkit";
import {igdbAPI} from "../API/igdbAPI";

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    matcher: igdbAPI.endpoints.login.matchFulfilled,
    effect: async (action, listenerApi) => {
        listenerApi.cancelActiveListeners();

        if (action.payload.accessToken) {
            localStorage.setItem("token", action.payload.accessToken);
        }
    },
});
