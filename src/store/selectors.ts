import {IUserStore} from "../types/types";

export const selectUserId = (state: {user: IUserStore}): number => state.user.id;
export const selectUsername = (state: {user: IUserStore}): string => state.user.username;
export const selectEmail = (state: {user: IUserStore}): string => state.user.email;
export const selectIsAuth = (state: {user: IUserStore}): boolean => state.user.isAuth;
