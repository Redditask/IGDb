import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {IUserData} from "../types/types";

const initialState: IUserData = {
    id: 0,
    email: "",
    username: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login(state, action: PayloadAction<IUserData>){
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.username = action.payload.username;
        },
        logout: () => initialState,
    }
});

export const {
    login,
    logout
} = userSlice.actions;

export default userSlice.reducer;
