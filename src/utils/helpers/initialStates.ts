import {
    CheckIsAddedQueryResult, GameQueryResult, GamesQueryResult, GetAccountGamesQueryResult,
    GetAccountInfoQueryResult,
    GetGameReviewsQueryResult, GetAccountReviewsQueryResult, LoginQueryResult,
    MessageQueryResult, ScreenshotsQueryResult, TrailersQueryResult
} from "../../types/queries/results";
import {IReviewInfo} from "../../types/data";

export const initialGameState: GameQueryResult = {
    id: 0,
    slug: "",
    background_image: "",
    background_image_additional: "",
    description_raw: "",
    developers: [],
    metacritic: 0,
    metacritic_url: "",
    name: "",
    platforms: [],
    genres: [],
    reddit_url: "",
    released: "",
    website: ""
};

export const initialScreenshotsState: ScreenshotsQueryResult = {
    count: 0,
    results: [],
};

export const initialTrailersState: TrailersQueryResult = {
    count: 0,
    results: [],
};

export const initialGamesState: GamesQueryResult = {
    count: 0,
    results: [],
};

export const initialUserDataState: LoginQueryResult = {
    accessToken: "",
    refreshToken: "",
    user: {
        id: 0,
        email: "",
        username: "",
    }
};

export const initialAccountGamesState: GetAccountGamesQueryResult = {
    library: [],
    wishlist: [],
};

export const initialIsAddedState: CheckIsAddedQueryResult = {
    library: false,
    wishlist: false,
};

export const initialActivateState: MessageQueryResult = {
    message: "",
};

export const initialGameReviewsState: GetGameReviewsQueryResult = {
    reviews: [],
    userReviewId: 0,
    medianRating: 0
};

export const initialAccountReviewsState: GetAccountReviewsQueryResult = {
    medianRating: 0,
    reviews: []
};

export const initialAccountInfoState: GetAccountInfoQueryResult = {
    username: "",
    libraryCount: 0,
    platforms: [],
    registrationDate: "",
    reviewsCount: 0,
    wishlistCount: 0
};

export const initialReviewInfoState: IReviewInfo = {
    text: "",
    rating: 0
};
