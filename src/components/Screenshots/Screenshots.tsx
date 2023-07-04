import React, {useEffect} from "react";

import {useGetGameScreenshotsQuery} from "../../API/rawgApi";

import styles from "./Screenshots.module.scss";

import {useAppDispatch} from "../../hooks";
import {setIsLoading} from "../../store/userSlice";

import {LazyLoadImage} from "react-lazy-load-image-component";

import {IScreenshot} from "../../types/types";

import {initialScreenshotsState} from "../../utils/helpers/initialStates";
import {regularCrop} from "../../utils/helpers/systemActions";

interface ScreenshotsProps {
    gameId: number;
    setImageURL: (url: string) => void;
    setIsError: (isError: boolean) => void;
}

const Screenshots:React.FC<ScreenshotsProps> = ({gameId, setImageURL, setIsError}) => {
    const dispatch = useAppDispatch();

    const {
        data: screenshots = initialScreenshotsState,
        error: screenshotsError,
        isLoading
    } = useGetGameScreenshotsQuery({id: gameId}, {skip: !gameId});

    useEffect((): void => {
        if (screenshotsError) setIsError(true);
    }, [screenshotsError]);

    useEffect((): void => {
        dispatch(setIsLoading(isLoading));
    }, [isLoading]);

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
