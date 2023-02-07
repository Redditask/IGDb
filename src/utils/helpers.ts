import {IPlatform, GameQueryResult} from "../types/types";

export const scrollCheck = (event: any): boolean =>
    event.target.documentElement.scrollHeight - (event.target.documentElement.scrollTop + window.innerHeight) < 1;

export const scrollUpCheck = (event: any): boolean => event.target.documentElement.scrollTop > 2500;

export const platformDefinition = (platformsArray: IPlatform[], platform: string): boolean => {
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

export const getUpcomingDates = ():string => {
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

export const initialGameStateFromServer: GameQueryResult = {
    id: 0,
    background_image: "",
    description_raw: "",
    developers: [],
    metacritic: 0,
    metacritic_url: "",
    name: "",
    platforms: [],
    reddit_url: "",
    released: "",
    website: ""
};

export const monthsList: string[] = [
    "Jan", "Feb", "Mar", "Apr",
    "May", "Jun", "Jul", "Aug",
    "Sep", "Oct", "Nov", "Dec",
];

export const dateFormatting = (date: string): string => {
    const [year, month, day]: string[] = date.split("-");
    const monthNumber = Number(month) - 1;

    return `${day} ${monthsList[monthNumber]} ${year}`;
};
