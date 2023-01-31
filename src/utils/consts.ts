import {CustomLink, CustomOption} from "../types/types";

import {getLastYearDates, getRecentDates, getUpcomingDates} from "./helpers";

export const gamesLimit: number = 20;

export const platformIconSize: number = 15;

export const HOME_ROUTE: string = "/games/home";

export const ALL_TIME_TOP_ROUTE: string = "/games/all-time-top";

export const LAST_YEAR_TOP_ROUTE: string = "/games/last-year-top";

export const RECENT_RELEASES_ROUTE: string = "/games/recent-releases";

export const UPCOMING_RELEASES_ROUTE: string = "/games/upcoming-releases";

export const GAME_ROUTE: string = "/game/:slug";

export const SideBarLinks: CustomLink [] = [
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


export const genresList: CustomOption[] = [
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

export const platformsList: CustomOption[] = [
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
        name: "Nintendo",
        value: 7,
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
