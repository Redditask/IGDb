import {createListenerMiddleware, isAnyOf} from "@reduxjs/toolkit";
import {igdbAPI} from "../API/igdbAPI";

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    matcher: isAnyOf(igdbAPI.endpoints.login.matchFulfilled, igdbAPI.endpoints.checkAuth.matchFulfilled),
    effect: async (action, listenerApi): Promise<void> => {
        listenerApi.cancelActiveListeners();

        if (!!action.payload.accessToken) {
            localStorage.setItem("token", action.payload.accessToken);
        }
    },
});
