import {GamePageInfo, IDeveloper, ILabel, IPlatform} from "../../types/data";

export const platformsToLabelsConvert = (platforms: IPlatform []): ILabel[] => {
    const labels: ILabel[] = [];

    platforms.forEach((item: IPlatform): void => {
        labels.push({
            id: item.platform.id,
            name: item.platform.name,
        });
    });

    return labels;
};

export const developersToLabelsConvert = (developers: IDeveloper[]): ILabel[] => {
    const labels: ILabel[] = [];

    developers.forEach((item: IDeveloper, index: number): void => {
        labels.push({
            id: index,
            name: item.name,
        });
    });

    return labels;
};

export const gamePageInfoConvert = (userReviewId: number, slug: string | undefined): GamePageInfo => {

    return {
        userReviewId,
        slug
    };
};
