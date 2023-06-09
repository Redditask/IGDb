import React, {useEffect} from "react";

import {useGetGameScreenshotsQuery} from "../../API/rawgApi";

import styles from "./Screenshots.module.scss";

import {LazyLoadImage} from "react-lazy-load-image-component";

import {regularCrop, initialScreenshotsState} from "../../utils/helpers";
import {IScreenshot} from "../../types/types";

interface ScreenshotsProps {
    gameId: number;
    setImageURL: (url: string) => void;
    setIsError: (isError: boolean) => void;
}

const Screenshots:React.FC<ScreenshotsProps> = ({gameId, setImageURL, setIsError}) => {
    const {
        data: screenshots = initialScreenshotsState,
        error: screenshotsError
    } = useGetGameScreenshotsQuery({id: gameId}, {skip: !gameId});

    useEffect((): void => {
        if (screenshotsError) setIsError(true);
    }, [screenshotsError]);

    return (
        <div className={styles.screenshots}>
            {
                screenshots.results.map((screenshot: IScreenshot) =>
                    <LazyLoadImage
                        className={styles.screenshot}
                        src={regularCrop(screenshot.image)}
                        key={screenshot.id}
                        onClick={() => setImageURL(screenshot.image)}
                        title="Open screenshot"
                        effect="blur"
                        alt="Game screenshot"
                    />
                )
            }
        </div>
    );
};

export default Screenshots;
