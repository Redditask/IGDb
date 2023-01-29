import React from "react";

export interface ServerResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Game[];
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
    name: string;
    released: string;
    background_image: string;
    metacritic: number;
    tags: Label[];
    genres: Label[];
    parent_platforms: Platform[];
}

export interface Label {
    id: number;
    name: string;
}

export interface Platform {
    platform: {
        id: number;
        name: string;
    };
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
