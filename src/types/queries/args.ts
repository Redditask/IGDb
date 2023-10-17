import {IReviewInfo} from "../data";

export type NumberQueryArg = number | undefined;

export type StringQueryArg = string | undefined;

export interface GamesQueryArgs {
    page: number;
    pageSize: number;
    metacritic: string;
    dates: string
    genres: string;
    platforms: string;
}

export interface LoginQueryArgs {
    email: string;
    password: string;
}

export interface RegistrationQueryArgs extends LoginQueryArgs {
    username: string;
}

export interface AddGameReviewQueryArgs extends IReviewInfo{
    slug: string;
}

export interface GetGameReviewsQueryArgs {
    slug: StringQueryArg;
    username: string;
    sortOption: string;
}

export interface GetAccountReviewsQueryArgs {
    username: StringQueryArg;
    viewer: string;
    sortOption: string;
}

export interface EditGameReviewQueryArgs extends IReviewInfo{
    reviewId: number;
}
