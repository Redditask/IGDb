import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

import {ServerResponse} from "../types/types";

import {getDates} from "../utils/helpers";

export const rawgApi = createApi({
    reducerPath: "rawgApi",
    baseQuery: fetchBaseQuery({baseUrl: `https://api.rawg.io/api/`}),
    endpoints: (builder) => ({
        getAllGames: builder.query<ServerResponse, number>({
            query: (page) => `games?key=${process.env["REACT_APP_API_KEY"]}&page=${page}`,
        }),
        getNewReleases: builder.query<ServerResponse, number>({
            query: (page) => `games?key=${process.env["REACT_APP_API_KEY"]}&page=${page}&dates=${getDates()}`,
        }),
        getTopGames: builder.query<ServerResponse, number>({
            query: (page) => `games?key=${process.env["REACT_APP_API_KEY"]}&page=${page}&metacritic=85,100`
        }),
    }),
});

export const {useGetAllGamesQuery, useGetNewReleasesQuery, useGetTopGamesQuery} = rawgApi;
