import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

import {QueryArgs, ResponseWithGame, ResponseWithGames, ResponseWithScreenshots} from "../types/types";

export const rawgApi = createApi({
    reducerPath: "rawgApi",
    baseQuery: fetchBaseQuery({baseUrl: `https://api.rawg.io/api/`}),
    endpoints: (builder) => ({
        getGames: builder.query<ResponseWithGames, QueryArgs>({
            query: ({page, metacritic, dates, genres, platforms}) =>
                `games?key=${process.env["REACT_APP_API_KEY"]}&page=${page}${metacritic}${dates}${genres}${platforms}`,
        }),
        getGameDetails: builder.query<ResponseWithGame, {slug: string | undefined}>({
            query: ({slug}) =>
                `games/${slug}?key=${process.env["REACT_APP_API_KEY"]}`,
        }),
        getGameDLC: builder.query<ResponseWithGames, {id: number | undefined}>({
            query: ({id}) =>
                `games/${id}/additions?key=${process.env["REACT_APP_API_KEY"]}`,
        }),
        getGameScreenshots: builder.query<ResponseWithScreenshots, {id: number | undefined}>({
            query: ({id}) =>
                `games/${id}/screenshots?key=${process.env["REACT_APP_API_KEY"]}`,
        }),
    }),
});

export const {
    useGetGamesQuery,
    useGetGameDetailsQuery,
    useGetGameDLCQuery,
    useGetGameScreenshotsQuery,
} = rawgApi;
