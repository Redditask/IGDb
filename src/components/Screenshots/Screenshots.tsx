import React, {useEffect} from "react";

import {useGetGameScreenshotsQuery} from "../../API/rawgApi";

import styles from "./Screenshots.module.scss";

import ScreenshotsSkeleton from "../Skeletons/ScreenshotsSkeleton/ScreenshotsSkeleton";

import {useAppDispatch} from "../../hooks";
import {setIsError, setIsFetching} from "../../store/userSlice";

import {LazyLoadImage} from "react-lazy-load-image-component";

import {IScreenshot} from "../../types/data";

import {initialScreenshotsState} from "../../utils/helpers/initialStates";
import {regularCrop} from "../../utils/helpers/systemActions";

interface ScreenshotsProps {
    gameId: number;
    setImageURL: (url: string) => void;
    isLoading: boolean;
}

const Screenshots:React.FC<ScreenshotsProps> = ({
        gameId,
        setImageURL,
        isLoading
    }) => {

    const dispatch = useAppDispatch();

    const {
        data: screenshots = initialScreenshotsState,
        isError,
        isFetching
    } = useGetGameScreenshotsQuery({id: gameId}, {skip: !gameId});

    useEffect((): void => {
       dispatch(setIsError(isError));
    }, [isError]);

    useEffect((): void => {
        dispatch(setIsFetching(isFetching));
    }, [isFetching]);

    return (
        isLoading
            ?
            <ScreenshotsSkeleton/>
            :
            <div className={styles.container}>
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
