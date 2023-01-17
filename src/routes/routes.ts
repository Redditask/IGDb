import {CustomRoute} from "../types/types";

import {GAMES_ROUTE, HOME_ROUTE, RELEASES_ROUTE, TOP_ROUTE} from "../utils/consts";

import Home from "../pages/Home/Home";
import Games from "../pages/Games/Games";
import Releases from "../pages/Releases/Releases";
import Top from "../pages/Top/Top";

export const publicRoutes: CustomRoute [] = [
    {
        path: GAMES_ROUTE,
        Component: Games,
    },
    {
        path: HOME_ROUTE,
        Component: Home,
    },
    {
        path: RELEASES_ROUTE,
        Component: Releases,
    },
    {
        path: TOP_ROUTE,
        Component: Top,
    }
];
