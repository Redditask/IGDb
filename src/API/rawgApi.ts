import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

import {
    GameQueryResult,
    GamesQueryArgs, GamesQueryResult, NumberQueryArg,
    ScreenshotsQueryResult, StringQueryArg,
    TrailersQueryResult
} from "../types/queries";

export const rawgApi = createApi({
    reducerPath: "rawgApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env["REACT_APP_RAWG_API_URL"]}`
    }),
    endpoints: (builder) => ({
        getGames: builder.query<GamesQueryResult, GamesQueryArgs>({
            query: ({page, pageSize, metacritic, dates, genres, platforms}) =>
                `games?key=${process.env["REACT_APP_API_KEY"]}&page=${page}&page_size=${pageSize}${metacritic}${dates}${genres}${platforms}`,
        }),
        getGameDetails: builder.query<GameQueryResult, { slug: StringQueryArg }>({
            query: ({slug}) =>
                `games/${slug}?key=${process.env["REACT_APP_API_KEY"]}`,
        }),
        getGameDLC: builder.query<GamesQueryResult, { id: NumberQueryArg }>({
            query: ({id}) =>
                `games/${id}/additions?key=${process.env["REACT_APP_API_KEY"]}`,
        }),
        getGameScreenshots: builder.query<ScreenshotsQueryResult, { id: NumberQueryArg }>({
            query: ({id}) =>
                `games/${id}/screenshots?key=${process.env["REACT_APP_API_KEY"]}`,
        }),
        getGameTrailers: builder.query<TrailersQueryResult, { id: NumberQueryArg }>({
            query: ({id}) =>
                `games/${id}/movies?key=${process.env["REACT_APP_API_KEY"]}`,
        }),
        getSameSeriesGames: builder.query<GamesQueryResult, { id: NumberQueryArg }>({
            query: ({id}) =>
                `games/${id}/game-series?key=${process.env["REACT_APP_API_KEY"]}`,
        }),
        getSearchResults: builder.query<GamesQueryResult, { searchText: StringQueryArg }>({
            query: ({searchText}) =>
                `games?key=${process.env["REACT_APP_API_KEY"]}&search=${searchText}`,
        }),
    }),
});

export const {
    useGetGamesQuery,
    useGetGameDetailsQuery,
    useGetGameDLCQuery,
    useGetGameScreenshotsQuery,
    useGetGameTrailersQuery,
    useGetSameSeriesGamesQuery,
    useGetSearchResultsQuery,
} = rawgApi;
