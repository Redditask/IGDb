import React from "react";

import {Platform} from "../types/types";

export const scrollCheck = (event: any): boolean =>
    event.target.documentElement.scrollHeight - (event.target.documentElement.scrollTop + window.innerHeight) < 250;

export const scrollHandler = (event: any, setPage: React.Dispatch<React.SetStateAction<number>>): void => {
    if (scrollCheck(event)) {
        setPage((prevState: number) => prevState + 1);
    }
};

export const platformDefinition = (platformsArray: Platform[], platform: string): boolean => {
    let isOnPlatform = false;

    platformsArray.map((item)=>{
        if (item.platform.name.includes(platform)) isOnPlatform = true;
    });

    return isOnPlatform;
};

export const imageCrop = (imageSrc: string): string => {
    const imageUrl = String(imageSrc).split("media/")[1];

    return `https://media.rawg.io/media/crop/600/400/${imageUrl}`;
};

export const getDates = ():string => {
    const date: Date = new Date();

    const currYear: number = date.getFullYear();
    const currMonth: number = date.getMonth();

    const [prevYear, prevMonth]: [number, number] = (currMonth === 0) ? [currYear-1, 11] : [currYear, currMonth-1];

    const prevMonthZero: string = prevMonth+1 < 10 ? "0" : "";
    const currMonthZero: string = currMonth+1 < 10 ? "0" : "";

    return `${prevYear}-${prevMonthZero}${prevMonth+1}-01,${currYear}-${currMonthZero}${currMonth+1}-01`;
}
