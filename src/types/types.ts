import React from "react";

export interface ServerGames {
    count: number;
    next: string | null;
    previous: string | null;
    results: Game[];
}

export interface ServerGame{
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

export interface Game {
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
