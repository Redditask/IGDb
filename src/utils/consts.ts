import {CustomLink} from "../types/types";

export const platformIconSize: number = 15;

export const HOME_ROUTE: string = "/home";

export const GAMES_ROUTE: string = "/games";

export const TOP_ROUTE: string = "/top";

export const RELEASES_ROUTE: string = "/releases";

export const AsideLinks: CustomLink [] = [
    {
        path: HOME_ROUTE,
        name: "Home"
    },
    {
        path: RELEASES_ROUTE,
        name: "New Releases"
    },
    {
        path: TOP_ROUTE,
        name: "Top"
    },
    {
        path: GAMES_ROUTE,
        name: "All Games"
    }
];
