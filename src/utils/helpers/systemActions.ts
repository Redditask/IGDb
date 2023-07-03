export const regularCrop = (imageSrc: string): string => {
    const imageUrl: string = String(imageSrc).split("media/")[1];

    return `https://media.rawg.io/media/crop/600/400/${imageUrl}`;
};

export const searchCrop = (imageSrc: string): string => {
    const imageUrl: string = String(imageSrc).split("media/")[1];

    return `https://media.rawg.io/media/resize/200/-/${imageUrl}`;
};

export const scrollCheck = (event: any): boolean =>
    event.target.documentElement.scrollHeight - (event.target.documentElement.scrollTop + window.innerHeight) < 1;

export const scrollUp = (): void => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
};
