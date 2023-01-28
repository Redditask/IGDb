import {
    useGetAllGamesQuery,
    useGetAllTimeTopGamesQuery,
    useGetLastYearTopGamesQuery,
    useGetRecentReleasesQuery,
    useGetUpcomingReleasesQuery
} from "../API/rawgApi";

import PageWithGames from "../pages/PageWithGames/PageWithGames";

import {CustomRoute} from "../types/types";

import {
    HOME_ROUTE,
    RECENT_RELEASES_ROUTE,
    ALL_TIME_TOP_ROUTE,
    LAST_YEAR_TOP_ROUTE,
    UPCOMING_RELEASES_ROUTE,
} from "../utils/consts";

export const publicRoutes: CustomRoute [] = [
    {
        path: HOME_ROUTE,
        component: () => <PageWithGames apiHook={useGetAllGamesQuery}/>,
    },
    {
        path: RECENT_RELEASES_ROUTE,
        component: () => <PageWithGames apiHook={useGetRecentReleasesQuery}/>,
    },
    {
        path: UPCOMING_RELEASES_ROUTE,
        component: () => <PageWithGames apiHook={useGetUpcomingReleasesQuery}/>,
    },
    {
        path: ALL_TIME_TOP_ROUTE,
        component: () => <PageWithGames apiHook={useGetAllTimeTopGamesQuery}/>,
    },
    {
        path: LAST_YEAR_TOP_ROUTE,
        component: () => <PageWithGames apiHook={useGetLastYearTopGamesQuery}/>,
    }
];


//privateRoutes in future
