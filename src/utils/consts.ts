import {CustomLink} from "../types/types";

export const platformIconSize: number = 15;

export const HOME_ROUTE: string = "/home";

export const TOP_GAMES_ROUTE: string = "/top_games";

export const RECENT_RELEASES_ROUTE: string = "/recent_releases";

export const UPCOMING_RELEASES_ROUTE: string = "/upcoming_releases";

export const AsideLinks: CustomLink [] = [
    {
        path: HOME_ROUTE,
        name: "Home",
    },
    {
        path: RECENT_RELEASES_ROUTE,
        name: "Recent Releases",
    },
    {
        path: UPCOMING_RELEASES_ROUTE,
        name: "Upcoming Releases",
    },
    {
        path: TOP_GAMES_ROUTE,
        name: "Top Games",
    },
];
