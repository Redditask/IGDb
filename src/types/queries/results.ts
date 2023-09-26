import {IDeveloper, IGameCard, IGameReview, ILabel, IPlatform, IScreenshot, ITrailer, IUserData} from "../data";

export interface GamesQueryResult {
    count: number;
    results: IGameCard[];
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

export interface LoginQueryResult {
    user: IUserData;
    accessToken: string;
    refreshToken: string;
}

export interface RegistrationQueryResult extends LoginQueryResult {
}

export interface GetAccountGamesQueryResult {
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
    userReviewId: number;
}

export interface GetAccountInfoQueryResult {
    username: string;
    reviewsCount: number;
    libraryCount: number;
    wishlistCount: number;
    registrationDate: string;
    platforms: IPlatform [];
    //profileImage
}
