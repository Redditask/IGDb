import {FC} from "react";

import {BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta, QueryDefinition} from "@reduxjs/toolkit/query";

export interface ServerResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Game[];
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
    Component: React.LazyExoticComponent<React.FC<{}>>;
}

export interface CustomLink {
    path: string;
    name: string;
}

export interface CustomOption {
    name: string;
    value: string | number;
}

export type apiHookType =
    QueryDefinition<
        {page: number, genres: string, platforms: string},
        BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, never, ServerResponse, "rawgApi"
    >;
