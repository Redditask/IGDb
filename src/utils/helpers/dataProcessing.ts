import {serverErrorValidation} from "./validation";

import {GameQueryResult} from "../../types/queries/results";

export const getValuesFromMetacriticString = (metacritic: string): [number, number] => {
    const [, values]: string[] = metacritic.split("=");
    const [left, right]: string[] = values.split(",");

    return [Number(left), Number(right)];
};

export const createMetacriticString = (minValue: number, maxValue: number): string => {
    if (minValue === 0 && maxValue === 100) return "";
    else if (minValue === 0) return `&metacritic=-1,${maxValue}`;
    else return `&metacritic=${minValue},${maxValue}`;
};

export const getMinRangeValue = (metacritic: string): number =>
    metacritic.length ? getValuesFromMetacriticString(metacritic)[0] : 0;

export const getMaxRangeValue = (metacritic: string): number =>
    metacritic.length ? getValuesFromMetacriticString(metacritic)[1] : 100;

export const serverErrorHandler = (error: string, errorType: string, setError: (error: string) => void): void => {
    serverErrorValidation(error, errorType) && setError("");
};

export const isHaveLinks = (game: GameQueryResult): boolean =>
    !!(game.metacritic_url || game.reddit_url || game.website);
