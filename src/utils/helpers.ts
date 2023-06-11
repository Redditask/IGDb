import {
    DLCQueryResult,
    GameQueryResult, GamesQueryResult, HowLongToBeatResult, IDeveloper,
    ILabel,
    IPlatform, LoginQueryResult,
    ScreenshotsQueryResult,
    TrailersQueryResult
} from "../types/types";

import * as Yup from "yup";

export const scrollCheck = (event: any): boolean =>
    event.target.documentElement.scrollHeight - (event.target.documentElement.scrollTop + window.innerHeight) < 1;

export const platformDefinition = (platformsArray: IPlatform[], platform: string): boolean => {
    let isOnPlatform: boolean = false;

    platformsArray.forEach((item: IPlatform): void=> {
        if (item.platform.name.includes(platform)) isOnPlatform = true;
    });

    return isOnPlatform;
};

export const regularCrop = (imageSrc: string): string => {
    const imageUrl: string = String(imageSrc).split("media/")[1];

    return `https://media.rawg.io/media/crop/600/400/${imageUrl}`;
};

export const searchCrop = (imageSrc: string): string => {
    const imageUrl: string = String(imageSrc).split("media/")[1];

    return `https://media.rawg.io/media/resize/200/-/${imageUrl}`;
};

const getStringZero = (value: number): string => value < 10 ? "0" : "";

const getDaysAmount = (year: number, month: number): number => {
    const date: Date = new Date(year, month, 1);
    date.setMinutes(-1);
    return date.getDate();
};

export const getRecentDates = ():string => {
    const today: Date = new Date();

    const currentYear: number = today.getFullYear();
    const currentMonth: number = today.getMonth();
    const currentDate: number = today.getDate();

    const [previousYear, previousMonth]: [number, number] = (currentMonth === 0) ? [currentYear-1, 11] : [currentYear, currentMonth-1];
    const previousMonthDayAmounts: number = getDaysAmount(currentYear, currentMonth);
    const previousDate: number = previousMonthDayAmounts <= currentDate ? previousMonthDayAmounts : currentDate;

    const previous: string =
        `${previousYear}-${getStringZero(previousMonth+1)}${previousMonth+1}-${getStringZero(previousDate)}${previousDate}`;

    const current: string =
        `${currentYear}-${getStringZero(currentMonth+1)}${currentMonth+1}-${getStringZero(currentDate)}${currentDate}`;

    return `${previous},${current}`;
};

export const getUpcomingDates = (): string => {
    const date: Date = new Date();

    const currentYear: number = date.getFullYear();
    const currentMonth: number = date.getMonth();
    const currentDate: number = date.getDate();

    const [nextYear, nextMonth]: [number, number] = (currentMonth === 11) ? [currentYear+1, 0] : [currentYear, currentMonth+1];
    const nextMonthDayAmounts: number = getDaysAmount(currentYear, currentMonth+2);
    const nextDate: number = nextMonthDayAmounts <= currentDate ? nextMonthDayAmounts : currentDate;

    const current: string =
        `${currentYear}-${getStringZero(currentMonth+1)}${currentMonth+1}-${getStringZero(currentDate)}${currentDate}`;

    const next: string =
        `${nextYear}-${getStringZero(nextMonth+1)}${nextMonth+1}-${getStringZero(nextDate)}${nextDate}`;

    return `${current},${next}`;
};

export const getLastYearDates = (): string => {
    const date: Date = new Date();

    const currentYear: number = date.getFullYear();
    const month: number = date.getMonth();
    const currentDate: number = date.getDate();

    const previousYear: number = currentYear-1;
    const previousYearMonthDayAmounts: number = getDaysAmount(previousYear, month+1);
    const previousDate: number = previousYearMonthDayAmounts <= currentDate ? previousYearMonthDayAmounts : currentDate;

    const previous: string =
        `${previousYear}-${getStringZero(month+1)}${month+1}-${getStringZero(previousDate)}${previousDate}`;

    const current: string =
        `${currentYear}-${getStringZero(month+1)}${month+1}-${getStringZero(currentDate)}${currentDate}`;

    return `${previous},${current}`;
};

export const scrollUp = (): void => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
};

export const initialGameState: GameQueryResult = {
    id: 0,
    background_image: "",
    description_raw: "",
    developers: [],
    metacritic: 0,
    metacritic_url: "",
    name: "",
    platforms: [],
    genres: [],
    reddit_url: "",
    released: "",
    website: ""
};

export const initialScreenshotsState: ScreenshotsQueryResult = {
    count: 0,
    results: [],
};

export const initialDLCState: DLCQueryResult = {
    count: 0,
    results: [],
};

export const initialTrailersState: TrailersQueryResult = {
    count: 0,
    results: [],
};

export const initialGamesState: GamesQueryResult = {
    count: 0,
    results: [],
};

export const initialSearchState: GamesQueryResult = {
    count: 0,
    results: [],
};

export const initialUserDataState: LoginQueryResult = {
    accessToken: "",
    refreshToken: "",
    user: {
        id: 0,
        email: "",
        username: "",
    }
};

export const monthsList: string[] = [
    "Jan", "Feb", "Mar", "Apr",
    "May", "Jun", "Jul", "Aug",
    "Sep", "Oct", "Nov", "Dec",
];

export const dateFormatting = (date: string): string => {
    if (date) {
        const [year, month, day]: string[] = date.split("-");
        const monthNumber: number = Number(month) - 1;

        return `${day} ${monthsList[monthNumber]} ${year}`;
    }else return "Unknown";
};

export const platformsToLabelsConvert = (platforms: IPlatform []): ILabel[] => {
    const labels: ILabel[] = [];

    platforms.forEach((item: IPlatform): void=>{
        labels.push({
            id: item.platform.id,
            name: item.platform.name,
        })
    });

    return labels;
};

export const developersToLabelsConvert = (developers: IDeveloper[]): ILabel[] => {
    const labels: ILabel[] = [];

    developers.forEach((item: IDeveloper, index: number): void=>{
        labels.push({
           id: index,
           name: item.name,
        });
    });

    return labels;
};

export const isHaveLinks = (game: GameQueryResult): boolean =>
    !!(game.metacritic_url || game.reddit_url || game.website);

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

export const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
        .required("Email is required")
        .email("Email is invalid"),
    password: Yup.string()
        .required("Password is required")
        .min(4, "Password must be at least 4 characters")
        .max(32, "Password must not exceed 32 characters"),
});

export const registrationValidationSchema = Yup.object().shape({
    username: Yup.string()
        .required("Username is required")
        .min(5, "Username must be at least 5 characters")
        .max(14, "Username must not exceed 14 characters"),
    email: Yup.string()
        .required("Email is required")
        .email("Email is invalid"),
    password: Yup.string()
        .required("Password is required")
        .min(4, "Password must be at least 4 characters")
        .max(32, "Password must not exceed 32 characters"),
});

export const serverErrorDetection = (error: string, errorType: string): string | null => error.toLowerCase().includes(errorType) ? error : null;

export const serverErrorHandler = (error: string, errorType: string, setError: (error: string) => void): void => {
    serverErrorDetection(error, errorType) && setError("");
};
