import {CustomRoute} from "../types/types";

import Home from "../pages/Home/Home";
import RecentReleases from "../pages/Releases/RecentReleases/RecentReleases";
import UpcomingReleases from "../pages/Releases/UpcomingReleases/UpcomingReleases";
import TopGames from "../pages/TopGames/TopGames";

import {
    HOME_ROUTE,
    RECENT_RELEASES_ROUTE,
    TOP_GAMES_ROUTE,
    UPCOMING_RELEASES_ROUTE
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
        path: TOP_GAMES_ROUTE,
        Component: TopGames,
    }
];
