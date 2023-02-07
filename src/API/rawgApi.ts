import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

import {
    GamesQueryArgs,
    GameQueryResult,
    GamesQueryResult,
    ScreenshotsQueryResult,
    TrailersQueryResult, DLCQueryResult, SlugQueryArg, IdQueryArg
} from "../types/types";

export const rawgApi = createApi({
    reducerPath: "rawgApi",
    baseQuery: fetchBaseQuery({baseUrl: `https://api.rawg.io/api/`}),
    endpoints: (builder) => ({
        getGames: builder.query<GamesQueryResult, GamesQueryArgs>({
            query: ({page, metacritic, dates, genres, platforms}) =>
                `games?key=${process.env["REACT_APP_API_KEY"]}&page=${page}${metacritic}${dates}${genres}${platforms}`,
        }),
        getGameDetails: builder.query<GameQueryResult, {slug: SlugQueryArg}>({
            query: ({slug}) =>
                `games/${slug}?key=${process.env["REACT_APP_API_KEY"]}`,
        }),
        getGameDLC: builder.query<DLCQueryResult, {id: IdQueryArg}>({
            query: ({id}) =>
                `games/${id}/additions?key=${process.env["REACT_APP_API_KEY"]}`,
        }),
        getGameScreenshots: builder.query<ScreenshotsQueryResult, {id: IdQueryArg}>({
            query: ({id}) =>
                `games/${id}/screenshots?key=${process.env["REACT_APP_API_KEY"]}`,
        }),
        getGameTrailers: builder.query<TrailersQueryResult, {id: IdQueryArg}>({
           query: ({id}) =>
               `games/${id}/movies?key=${process.env["REACT_APP_API_KEY"]}`,
        }),
    }),
});

export const {
    useGetGamesQuery,
    useGetGameDetailsQuery,
    useGetGameDLCQuery,
    useGetGameScreenshotsQuery,
    useGetGameTrailersQuery,
} = rawgApi;
