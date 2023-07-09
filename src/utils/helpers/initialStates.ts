import {
    AccountGamesQueryResult, ActivateQueryResult,
    CheckIsAddedQueryResult,
    GameQueryResult,
    GamesQueryResult,
    LoginQueryResult,
    ScreenshotsQueryResult,
    TrailersQueryResult
} from "../../types/types";

export const initialGameState: GameQueryResult = {
    id: 0,
    slug: "",
    background_image: "",
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

export const initialAccountGamesState: AccountGamesQueryResult = {
    library: [],
    wishlist: [],
};

export const initialIsAddedState: CheckIsAddedQueryResult = {
    library: false,
    wishlist: false,
};

export const initialActivateState: ActivateQueryResult = {
    activationMessage: "",
};
