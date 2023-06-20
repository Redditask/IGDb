import Games from "../pages/Games/Games";
import Game from "../pages/Game/Game";
import Account from "../pages/Account/Account";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";

import {ICustomRoute} from "../types/types";

import {
    HOME_ROUTE,
    RECENT_RELEASES_ROUTE,
    ALL_TIME_TOP_ROUTE,
    LAST_YEAR_TOP_ROUTE,
    UPCOMING_RELEASES_ROUTE,
    queryParams, GAME_ROUTE,
    ACCOUNT_ROUTE, LOGIN_ROUTE,
    REGISTRATION_ROUTE,
} from "../utils/consts";

export const publicRoutes: ICustomRoute [] = [
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
    },
    {
        path: LOGIN_ROUTE,
        component: () => <Login/>
    },
    {
        path: REGISTRATION_ROUTE,
        component: () => <Registration/>
    }
];

export const privateRoutes: ICustomRoute[] = [
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
    },
    {
        path: ACCOUNT_ROUTE,
        component: () => <Account/>
    }
];
