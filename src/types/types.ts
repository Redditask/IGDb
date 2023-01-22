import {FC} from "react";

import {BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta, QueryDefinition} from "@reduxjs/toolkit/query";

export interface ServerResponse {
    count: number,
    next: string | null,
    previous: string | null,
    results: Game[]
}

export interface Game {
    id: number,
    name: string,
    released: string,
    background_image: string,
    metacritic: number,
    tags: Tag[],
    parent_platforms: Platform[]
}

export interface Tag {
    name: string,
    id: number
}

export interface Platform {
    platform: {
        id: number;
        name: string;
    }
}

export interface CustomRoute {
    path: string,
    Component: FC<{}>;
}

export interface CustomLink {
    path: string;
    name: string;
}

export type apiHookType =
    QueryDefinition<number, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, never, ServerResponse, "rawgApi">;
