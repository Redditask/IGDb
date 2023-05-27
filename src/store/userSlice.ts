import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {IUserData, IUserStore} from "../types/types";

const initialState: IUserStore = {
    id: 0,
    email: "",
    username: "",
    isAuth: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<IUserData>){
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.username = action.payload.username;
            state.isAuth = true;
        },
        clearUser: () => {
            localStorage.removeItem("token");
            return initialState;
        },
    }
});

export const {
    setUser,
    clearUser
} = userSlice.actions;

export default userSlice.reducer;
