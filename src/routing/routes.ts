import {PageWithGamesRoute} from "../types/types";

import {
    HOME_ROUTE,
    RECENT_RELEASES_ROUTE,
    ALL_TIME_TOP_ROUTE,
    LAST_YEAR_TOP_ROUTE,
    UPCOMING_RELEASES_ROUTE,
} from "../utils/consts";

import {
    useGetAllGamesQuery,
    useGetAllTimeTopGamesQuery,
    useGetLastYearTopGamesQuery,
    useGetRecentReleasesQuery,
    useGetUpcomingReleasesQuery
} from "../API/rawgApi";

export const publicRoutes: PageWithGamesRoute [] = [
    {
        path: HOME_ROUTE,
        apiHook: useGetAllGamesQuery,
    },
    {
        path: RECENT_RELEASES_ROUTE,
        apiHook: useGetRecentReleasesQuery,
    },
    {
        path: UPCOMING_RELEASES_ROUTE,
        apiHook: useGetUpcomingReleasesQuery,
    },
    {
        path: ALL_TIME_TOP_ROUTE,
        apiHook: useGetAllTimeTopGamesQuery,
    },
    {
        path: LAST_YEAR_TOP_ROUTE,
        apiHook: useGetLastYearTopGamesQuery,
    }
];

//privateRoutes in future
