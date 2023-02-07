import React from "react";

export interface ResponseWithGames {
    count: number;
    next: string | null;
    previous: string | null;
    results: GameFromList[];
}

export interface ResponseWithGame {
    id: number;
    name: string;
    description_raw: string;
    metacritic: number;
    released: string;
    background_image: string;
    developers: Developer[];
    website: string;
    reddit_url: string;
    metacritic_url: string;
    platforms: Platform[];
}

export interface QueryArgs {
    page: number;
    metacritic: string;
    dates: string
    genres: string;
    platforms: string;
}

export interface GameFromList {
    id: number;
    slug: string;
    name: string;
    released: string;
    background_image: string;
    metacritic: number;
    tags: Label[];
    genres: Label[];
    parent_platforms: Parent_platform[];
}

export interface DLC extends GameFromList {}

export interface ResponseWithScreenshots {
    count: number;
    results: ScreenshotFromList [];
}

export interface ResponseWithTrailers {
    count: number;
    results: Trailer [];
}

export interface Trailer {
    id: number;
    data: {
        480: string;
        max: string;
    };
    preview: string;
}

export interface ScreenshotFromList {
    id: number;
    image: string;
}

export interface Label {
    id: number;
    name: string;
}

export interface Parent_platform {
    platform: {
        id: number;
        name: string;
    };
}

export interface Platform {
    platform: {
        id: number;
        name: string;
    };
}

export interface Developer {
    name: string;
    image_background: string;
}

export interface Screenshot {
    image: string;
}

export interface CustomRoute {
    path: string;
    component: React.FC;
}

export interface CustomLink {
    path: string;
    name: string;
}

export interface CustomOption {
    name: string;
    value: string | number;
}
