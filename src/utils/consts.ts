import {ICustomLink, ICustomOption} from "../types/types";

import {getLastYearDates, getRecentDates, getUpcomingDates} from "./helpers";

export const gamesLimit: number = 20;

export const platformIconSize: number = 15;

export const HOME_ROUTE: string = "/games/home";

export const ALL_TIME_TOP_ROUTE: string = "/games/all-time-top";

export const LAST_YEAR_TOP_ROUTE: string = "/games/last-year-top";

export const RECENT_RELEASES_ROUTE: string = "/games/recent-releases";

export const UPCOMING_RELEASES_ROUTE: string = "/games/upcoming-releases";

export const GAME_ROUTE: string = "/game/:slug";

export const LIBRARY_ROUTE: string = "/library";

export const LOGIN_ROUTE: string = "/login";

export const REGISTRATION_ROUTE: string = "/registration";

export const SideBarLinks: ICustomLink [] = [
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
        path: LAST_YEAR_TOP_ROUTE,
        name: "Last Year Top",
    },
    {
        path: ALL_TIME_TOP_ROUTE,
        name: "All Time Top",
    },
];


export const genresList: ICustomOption[] = [
    {
        name: "Action",
        value: "action",
    },
    {
        name: "Indie",
        value: "indie"
    },
    {
        name: "Adventure",
        value: "adventure",
    },
    {
        name: "RPG",
        value: "role-playing-games-rpg",
    },
    {
        name: "Strategy",
        value: "strategy",
    },
    {
        name: "Shooter",
        value: "shooter",
    },
    {
        name: "Casual",
        value: "casual",
    },
    {
        name: "Simulation",
        value: "simulation",
    },
    {
        name: "Puzzle",
        value: "puzzle",
    },
    {
        name: "Arcade",
        value: "arcade",
    },
    {
        name: "Platformer",
        value: "platformer",
    },
    {
        name: "Racing",
        value: "racing",
    },
    {
        name: "Massively Multiplayer",
        value: "massively-multiplayer",
    },
    {
        name: "Sports",
        value: "sports",
    },
    {
        name: "Fighting",
        value: "fighting",
    },
    {
        name: "Family",
        value: "family",
    },
    {
        name: "Board Games",
        value: "board-games",
    },
    {
        name: "Educational",
        value: "educational",
    },
    {
        name: "Card",
        value: "card",
    },
];

export const platformsList: ICustomOption[] = [
    {
        name: "PC",
        value: 1,
    },
    {
        name: "PlayStation",
        value: 2,
    },
    {
        name: "Xbox",
        value: 3,
    },
    {
        name: "iOS",
        value: 4,
    },
    {
        name: "Macintosh",
        value: 5,
    },
    {
        name: "Linux",
        value: 6,
    },
    {
        name: "Nintendo",
        value: 7,
    },
    {
        name: "Android",
        value: 8,
    },
    {
        name: "Web",
        value: 14,
    },
];

export const queryParams = {
    allGames: {
        metacritic: ``,
        dates: ``,
    },
    recentReleases: {
        metacritic: ``,
        dates: `&dates=${getRecentDates()}`,
    },
    upcomingReleases: {
        metacritic: ``,
        dates: `&dates=${getUpcomingDates()}`,
    },
    allTimeTopGames: {
        metacritic: `&metacritic=85,100`,
        dates: ``,
    },
    lastYearTopGames: {
        metacritic: `&metacritic=85,100`,
        dates: `&dates=${getLastYearDates()}`
    },
};
