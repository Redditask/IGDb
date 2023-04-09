import {
    DLCQueryResult,
    GameQueryResult, GamesQueryResult, HowLongToBeatResult, IDeveloper,
    ILabel,
    IPlatform,
    ScreenshotsQueryResult,
    TrailersQueryResult
} from "../types/types";

export const scrollCheck = (event: any): boolean =>
    event.target.documentElement.scrollHeight - (event.target.documentElement.scrollTop + window.innerHeight) < 1;

export const platformDefinition = (platformsArray: IPlatform[], platform: string): boolean => {
    let isOnPlatform = false;

    platformsArray.map((item)=>{
        if (item.platform.name.includes(platform)) isOnPlatform = true;
    });

    return isOnPlatform;
};

export const regularCrop = (imageSrc: string): string => {
    const imageUrl = String(imageSrc).split("media/")[1];

    return `https://media.rawg.io/media/crop/600/400/${imageUrl}`;
};

export const searchCrop = (imageSrc: string): string => {
    const imageUrl = String(imageSrc).split("media/")[1];

    return `https://media.rawg.io/media/resize/420/-/${imageUrl}`;
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


export const initialHowLongToBeatState: HowLongToBeatResult = {
    gameplayMain: 0,
    gameplayMainExtra: 0,
    gameplayCompletionist: 0,
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

export const platformsToLabels = (platforms: IPlatform []): ILabel[] => {
    const labels: ILabel[] = [];

    platforms.map(platforms => {
       labels.push({
           id: platforms.platform.id,
           name: platforms.platform.name,
       })
    });

    return labels;
};

export const developersToLabels = (developers: IDeveloper[]): ILabel[] => {
    const labels: ILabel[] = [];

    developers.map((developers, index)=>{
        labels.push({
           id: index,
           name: developers.name,
        });
    });

    return labels;
};

export const isHaveLinks = (game: GameQueryResult): boolean =>
    !!(game.metacritic_url || game.reddit_url || game.website);

export const getValuesFromMetacriticString = (metacritic: string): [number, number] => {
    const [word, values]: string[] = metacritic.split("=");
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

export const isHasHowLongToBeat = (apiResult: HowLongToBeatResult): boolean =>
    !!(apiResult?.gameplayMain || apiResult?.gameplayMainExtra || apiResult?.gameplayCompletionist);
