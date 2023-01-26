import {lazy} from "react";

import {CustomRoute} from "../types/types";

import {
    HOME_ROUTE,
    RECENT_RELEASES_ROUTE,
    ALL_TIME_TOP_ROUTE,
    LAST_YEAR_TOP_ROUTE,
    UPCOMING_RELEASES_ROUTE,
} from "../utils/consts";

const Home = lazy(()=> import("../pages/Home/Home"));
const RecentReleases = lazy(()=> import("../pages/Releases/RecentReleases/RecentReleases"));
const UpcomingReleases = lazy(()=> import("../pages/Releases/UpcomingReleases/UpcomingReleases"));
const AllTimeTop = lazy(()=> import("../pages/TopGames/AllTimeTop/AllTimeTop"));
const LastYearTop = lazy(()=> import("../pages/TopGames/LastYearTop/LastYearTop"));

export const publicRoutes: CustomRoute [] = [
    {
        path: HOME_ROUTE,
        Component: Home,
    },
    {
        path: RECENT_RELEASES_ROUTE,
        Component: RecentReleases,
    },
    {
        path: UPCOMING_RELEASES_ROUTE,
        Component: UpcomingReleases,
    },
    {
        path: ALL_TIME_TOP_ROUTE,
        Component: AllTimeTop,
    },
    {
        path: LAST_YEAR_TOP_ROUTE,
        Component: LastYearTop,
    }
];
