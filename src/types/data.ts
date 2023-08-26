import React from "react";

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

export interface IUserData {
    email: string;
    id: number;
    username: string;
}

export interface IUserStore extends IUserData {
    isAuth: boolean;
    isChecked: boolean;
    isFetching: boolean;
}

export interface IGameReview {
    id: number;
    username: string;
    text: string;
    likedUsers: number;
    dislikedUsers: number;
    userReaction: "like" | "dislike" | "null";
}

export interface NotificationRef {
    show: () => void;
}

export type StringChangeEvent = {
    target: {
        value: string
    }
};
