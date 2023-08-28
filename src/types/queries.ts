import {IDeveloper, IGameCard, IGameReview, ILabel, IPlatform, IScreenshot, ITrailer, IUserData} from "./data";

export interface GamesQueryResult {
    count: number;
    results: IGameCard[];
}

export interface GamesQueryArgs {
    page: number;
    pageSize: number;
    metacritic: string;
    dates: string
    genres: string;
    platforms: string;
}

export interface GameQueryResult {
    id: number;
    slug: string;
    name: string;
    description_raw: string;
    metacritic: number;
    released: string;
    background_image: string;
    background_image_additional: string;
    developers: IDeveloper[];
    website: string;
    reddit_url: string;
    metacritic_url: string;
    genres: ILabel[];
    platforms: IPlatform[];
}

export interface ScreenshotsQueryResult {
    count: number;
    results: IScreenshot [];
}

export interface TrailersQueryResult {
    count: number;
    results: ITrailer [];
}

export interface LoginQueryArgs {
    email: string;
    password: string;
}

export interface RegistrationQueryArgs extends LoginQueryArgs {
    username: string;
}

export interface AddReviewQueryArgs {
    slug: string;
    text: string;
}

export interface GetReviewsQueryArgs {
    slug: StringQueryArg;
    username: string;
}

export interface EditReviewQueryArgs {
  slug: StringQueryArg;
  text: string;
}

export interface LoginQueryResult {
    user: IUserData;
    accessToken: string;
    refreshToken: string;
}

export interface RegistrationQueryResult extends LoginQueryResult {
}

export interface AccountGamesQueryResult {
    library: IGameCard[];
    wishlist: IGameCard[];
}

export interface CheckIsAddedQueryResult {
    library: boolean;
    wishlist: boolean;
}

export interface MessageQueryResult {
    message: string;
}

export interface GetReviewsQueryResult {
    reviews: IGameReview [];
    isUserReviewThere: boolean;
}

export type NumberQueryArg = number | undefined;

export type StringQueryArg = string | undefined;
