import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

import {ServerResponse} from "../types/types";

import {getLastYearDates, getRecentDates, getUpcomingDates} from "../utils/helpers";

export const rawgApi = createApi({
    reducerPath: "rawgApi",
    baseQuery: fetchBaseQuery({baseUrl: `https://api.rawg.io/api/`}),
    endpoints: (builder) => ({
        getAllGames: builder.query<ServerResponse, { page: number, genres: string, platforms: string}>({
            query: ({page, genres, platforms}) => `games?key=${process.env["REACT_APP_API_KEY"]}&page=${page}${genres}${platforms}`,
        }),
        getRecentReleases: builder.query<ServerResponse, { page: number, genres: string, platforms: string}>({
            query: ({page, genres, platforms}) => `games?key=${process.env["REACT_APP_API_KEY"]}&page=${page}&dates=${getRecentDates()}${genres}${platforms}`,
        }),
        getUpcomingReleases: builder.query<ServerResponse, { page: number, genres: string, platforms: string}>({
            query: ({page, genres, platforms}) => `games?key=${process.env["REACT_APP_API_KEY"]}&page=${page}&dates=${getUpcomingDates()}${genres}${platforms}`,
        }),
        getAllTimeTopGames: builder.query<ServerResponse, { page: number, genres: string, platforms: string}>({
            query: ({page, genres, platforms}) => `games?key=${process.env["REACT_APP_API_KEY"]}&page=${page}&metacritic=85,100${genres}${platforms}`
        }),
        getLastYearTopGames: builder.query<ServerResponse, { page: number, genres: string, platforms: string}>({
           query: ({page, genres, platforms}) => `games?key=${process.env["REACT_APP_API_KEY"]}&page=${page}&metacritic=85,100&dates=${getLastYearDates()}${genres}${platforms}`
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
