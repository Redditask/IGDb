import React from "react";

export interface GamesQueryResult {
    count: number;
    results: IGameCard[];
}

export interface GameQueryResult {
    id: number;
    name: string;
    description_raw: string;
    metacritic: number;
    released: string;
    background_image: string;
    developers: IDeveloper[];
    website: string;
    reddit_url: string;
    metacritic_url: string;
    genres: ILabel[];
    platforms: IPlatform[];
}

export interface DLCQueryResult extends GamesQueryResult {}

export interface SameSeriesGamesQueryResult extends GamesQueryResult {}

export interface ScreenshotsQueryResult {
    count: number;
    results: IScreenshot [];
}

export interface TrailersQueryResult {
    count: number;
    results: ITrailer [];
}

export interface HowLongToBeatResult {
    gameplayMain: number;
    gameplayMainExtra: number;
    gameplayCompletionist: number;
}

export interface GamesQueryArgs {
    page: number;
    metacritic: string;
    dates: string
    genres: string;
    platforms: string;
}

export type IdQueryArg = number | undefined;

export type SlugQueryArg = string | undefined;

export interface IGameCard {
    id: number;
    slug: string;
    name: string;
    released: string;
    background_image: string;
    metacritic: number;
    genres: ILabel[];
    parent_platforms: IPlatform[];
}

export interface ITrailer {
    id: number;
    data: {
        480: string;
        max: string;
    };
    preview: string;
}

export interface IScreenshot {
    id: number;
    image: string;
}

export interface ILabel {
    id: number;
    name: string;
}

export interface IPlatform {
    platform: {
        id: number;
        name: string;
    };
}

export interface IDeveloper {
    name: string;
}

export interface ICustomRoute {
    path: string;
    component: React.FC;
}

export interface ICustomLink {
    path: string;
    name: string;
}

export interface ICustomOption {
    name: string;
    value: string | number;
}

export interface ILibraryGame {
    slug: string;
}

export interface IUserData {
    email: string;
    id: number;
    username: string;
}

export interface LoginQueryArgs {
    email: string;
    password: string;
}

export interface LoginQueryResult {
    user: IUserData;
    accessToken: string;
    refreshToken: string;
}

export interface RegistrationQueryArgs extends LoginQueryArgs{
    username: string;
}

export interface RegistrationQueryResult extends LoginQueryResult {}

export interface IUserStore extends IUserData {
    isAuth: boolean;
    isChecked: boolean;
}
