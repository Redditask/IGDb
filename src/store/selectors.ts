import {IUserStore} from "../types/data";

export const selectUserId = (state: {user: IUserStore}): number => state.user.id;

export const selectUsername = (state: {user: IUserStore}): string => state.user.username;

export const selectEmail = (state: {user: IUserStore}): string => state.user.email;

export const selectIsAuth = (state: {user: IUserStore}): boolean => state.user.isAuth;

export const selectIsChecked = (state: {user: IUserStore}): boolean => state.user.isChecked;

export const selectIsFetching = (state: {user: IUserStore}): boolean => state.user.isFetching;

export const selectIsError = (state: {user: IUserStore}): boolean => state.user.isError;
