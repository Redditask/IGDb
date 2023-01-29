import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

import {QueryArgs, ServerResponse} from "../types/types";

export const rawgApi = createApi({
    reducerPath: "rawgApi",
    baseQuery: fetchBaseQuery({baseUrl: `https://api.rawg.io/api/`}),
    endpoints: (builder) => ({
        getGames: builder.query<ServerResponse, QueryArgs>({
            query: ({page, metacritic, dates, genres, platforms}) =>
                `games?key=${process.env["REACT_APP_API_KEY"]}&page=${page}${metacritic}${dates}${genres}${platforms}`,
        }),
    }),
});

export const {
    useGetGamesQuery,
} = rawgApi;
