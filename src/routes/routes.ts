import {CustomRoute} from "../types/types";

import Home from "../pages/Home/Home";
import RecentReleases from "../pages/Releases/RecentReleases/RecentReleases";
import UpcomingReleases from "../pages/Releases/UpcomingReleases/UpcomingReleases";
import AllTimeTop from "../pages/TopGames/AllTimeTop/AllTimeTop";
import LastYearTop from "../pages/TopGames/LastYearTop/LastYearTop";

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
