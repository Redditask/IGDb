import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

import {QueryArgs, ServerGame, ServerGames} from "../types/types";

export const rawgApi = createApi({
    reducerPath: "rawgApi",
    baseQuery: fetchBaseQuery({baseUrl: `https://api.rawg.io/api/`}),
    endpoints: (builder) => ({
        getGames: builder.query<ServerGames, QueryArgs>({
            query: ({page, metacritic, dates, genres, platforms}) =>
                `games?key=${process.env["REACT_APP_API_KEY"]}&page=${page}${metacritic}${dates}${genres}${platforms}`,
        }),
        getOneGame: builder.query<ServerGame, {slug: string | undefined}>({
            query: ({slug}) =>
                `games/${slug}?key=${process.env["REACT_APP_API_KEY"]}`,
        }),
    }),
});

export const {
    useGetGamesQuery,
    useGetOneGameQuery,
} = rawgApi;
