import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {IUserData, IUserStore} from "../types/data";

const initialState: IUserStore = {
    id: 0,
    email: "",
    username: "",
    isAuth: false,
    isChecked: false,
    isFetching: false,
    isError: false
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
        },
        setIsError: (state, action: PayloadAction<boolean>): void => {
          state.isError = action.payload;
        },
    }
});

export const {
    setUser,
    clearUser,
    setIsChecked,
    setIsFetching,
    setIsError
} = userSlice.actions;

export default userSlice.reducer;
