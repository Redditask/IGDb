import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

import {ServerResponse} from "../types/types";

import {getLastYearDates, getRecentDates, getUpcomingDates} from "../utils/helpers";

export const rawgApi = createApi({
    reducerPath: "rawgApi",
    baseQuery: fetchBaseQuery({baseUrl: `https://api.rawg.io/api/`}),
    endpoints: (builder) => ({
        getAllGames: builder.query<ServerResponse, number>({
            query: (page) => `games?key=${process.env["REACT_APP_API_KEY"]}&page=${page}`,
        }),
        getRecentReleases: builder.query<ServerResponse, number>({
            query: (page) => `games?key=${process.env["REACT_APP_API_KEY"]}&page=${page}&dates=${getRecentDates()}`,
        }),
        getUpcomingReleases: builder.query<ServerResponse, number>({
            query: (page) => `games?key=${process.env["REACT_APP_API_KEY"]}&page=${page}&dates=${getUpcomingDates()}`,
        }),
        getAllTimeTopGames: builder.query<ServerResponse, number>({
            query: (page) => `games?key=${process.env["REACT_APP_API_KEY"]}&page=${page}&metacritic=85,100`
        }),
        getLastYearTopGames: builder.query<ServerResponse, number>({
           query: (page) => `games?key=${process.env["REACT_APP_API_KEY"]}&page=${page}&metacritic=85,100&dates=${getLastYearDates()}`
        }),
    }),
});

export const {
    useGetAllGamesQuery,
    useGetRecentReleasesQuery,
    useGetUpcomingReleasesQuery,
    useGetAllTimeTopGamesQuery,
    useGetLastYearTopGamesQuery,
} = rawgApi;
