import {IUserData} from "../types/types";

export const selectUserId = (state: {user: IUserData}): number => state.user.id;
export const selectUserUsername = (state: {user: IUserData}): string => state.user.username;
export const selectUserEmail = (state: {user: IUserData}): string => state.user.email;
