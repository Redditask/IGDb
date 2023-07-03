export const monthsList: string[] = [
    "Jan", "Feb", "Mar", "Apr",
    "May", "Jun", "Jul", "Aug",
    "Sep", "Oct", "Nov", "Dec",
];

const getZeroInDate = (value: number): string => value < 10 ? "0" : "";

const getDaysAmount = (year: number, month: number): number => {
    const date: Date = new Date(year, month, 1);
    date.setMinutes(-1);
    return date.getDate();
};

export const getRecentDates = (): string => {
    const today: Date = new Date();

    const currentYear: number = today.getFullYear();
    const currentMonth: number = today.getMonth();
    const currentDate: number = today.getDate();

    const [previousYear, previousMonth]: [number, number] = (currentMonth === 0) ? [currentYear - 1, 11] : [currentYear, currentMonth - 1];
    const previousMonthDayAmounts: number = getDaysAmount(currentYear, currentMonth);
    const previousDate: number = previousMonthDayAmounts <= currentDate ? previousMonthDayAmounts : currentDate;

    const previous: string =
        `${previousYear}-${getZeroInDate(previousMonth + 1)}${previousMonth + 1}-${getZeroInDate(previousDate)}${previousDate}`;

    const current: string =
        `${currentYear}-${getZeroInDate(currentMonth + 1)}${currentMonth + 1}-${getZeroInDate(currentDate)}${currentDate}`;

    return `${previous},${current}`;
};

export const getUpcomingDates = (): string => {
    const date: Date = new Date();

    const currentYear: number = date.getFullYear();
    const currentMonth: number = date.getMonth();
    const currentDate: number = date.getDate();

    const [nextYear, nextMonth]: [number, number] = (currentMonth === 11) ? [currentYear + 1, 0] : [currentYear, currentMonth + 1];
    const nextMonthDayAmounts: number = getDaysAmount(currentYear, currentMonth + 2);
    const nextDate: number = nextMonthDayAmounts <= currentDate ? nextMonthDayAmounts : currentDate;

    const current: string =
        `${currentYear}-${getZeroInDate(currentMonth + 1)}${currentMonth + 1}-${getZeroInDate(currentDate)}${currentDate}`;

    const next: string =
        `${nextYear}-${getZeroInDate(nextMonth + 1)}${nextMonth + 1}-${getZeroInDate(nextDate)}${nextDate}`;

    return `${current},${next}`;
};

export const getLastYearDates = (): string => {
    const date: Date = new Date();

    const currentYear: number = date.getFullYear();
    const month: number = date.getMonth();
    const currentDate: number = date.getDate();

    const previousYear: number = currentYear - 1;
    const previousYearMonthDayAmounts: number = getDaysAmount(previousYear, month + 1);
    const previousDate: number = previousYearMonthDayAmounts <= currentDate ? previousYearMonthDayAmounts : currentDate;

    const previous: string =
        `${previousYear}-${getZeroInDate(month + 1)}${month + 1}-${getZeroInDate(previousDate)}${previousDate}`;

    const current: string =
        `${currentYear}-${getZeroInDate(month + 1)}${month + 1}-${getZeroInDate(currentDate)}${currentDate}`;

    return `${previous},${current}`;
};

export const dateFormatting = (date: string): string => {
    if (date) {
        const [year, month, day]: string[] = date.split("-");
        const monthNumber: number = Number(month) - 1;

        return `${day} ${monthsList[monthNumber]} ${year}`;
    } else return "Unknown";
};
