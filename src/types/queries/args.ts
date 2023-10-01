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

export interface AddReviewQueryArgs extends IReviewInfo{
    slug: string;
}

export interface GetReviewsQueryArgs {
    slug: StringQueryArg;
    username: string;
    sortOption: string;
}

export interface EditReviewQueryArgs extends IReviewInfo{
    reviewId: number;
}
