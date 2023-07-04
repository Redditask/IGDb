import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {IUserData, IUserStore} from "../types/types";

const initialState: IUserStore = {
    id: 0,
    email: "",
    username: "",
    isAuth: false,
    isChecked: false,
    isFetching: false
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUserData>): void => {
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.username = action.payload.username;
            state.isAuth = true;
        },
        clearUser: (): IUserStore => {
            localStorage.removeItem("token");
            return initialState;
        },
        setIsChecked: (state, action: PayloadAction<boolean>): void => {
            state.isChecked = action.payload;
        },
        setIsFetching: (state, action: PayloadAction<boolean>): void => {
            state.isFetching = action.payload;
        }
    }
});

export const {
    setUser,
    clearUser,
    setIsChecked,
    setIsFetching
} = userSlice.actions;

export default userSlice.reducer;
