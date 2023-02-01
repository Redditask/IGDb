import Games from "../pages/Games/Games";
import Game from "../pages/Game/Game";

import {CustomRoute} from "../types/types";

import {
    HOME_ROUTE,
    RECENT_RELEASES_ROUTE,
    ALL_TIME_TOP_ROUTE,
    LAST_YEAR_TOP_ROUTE,
    UPCOMING_RELEASES_ROUTE,
    queryParams, GAME_ROUTE,
} from "../utils/consts";

export const publicRoutes: CustomRoute [] = [
    {
        path: HOME_ROUTE,
        component: () => <Games
            metacritic={queryParams.allGames.metacritic}
            dates={queryParams.allGames.dates}
        />,
    },
    {
        path: RECENT_RELEASES_ROUTE,
        component: () => <Games
            metacritic={queryParams.recentReleases.metacritic}
            dates={queryParams.recentReleases.dates}
        />,
    },
    {
        path: UPCOMING_RELEASES_ROUTE,
        component: () => <Games
            metacritic={queryParams.upcomingReleases.metacritic}
            dates={queryParams.upcomingReleases.dates}
        />,
    },
    {
        path: LAST_YEAR_TOP_ROUTE,
        component: () => <Games
            metacritic={queryParams.lastYearTopGames.metacritic}
            dates={queryParams.lastYearTopGames.dates}
        />,
    },
    {
        path: ALL_TIME_TOP_ROUTE,
        component: () => <Games
            metacritic={queryParams.allTimeTopGames.metacritic}
            dates={queryParams.allTimeTopGames.dates}
        />,
    },
    {
        path: GAME_ROUTE,
        component: () => <Game/>
    }
];


//privateRoutes in future