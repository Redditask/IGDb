import React from "react";

import {useGetGameScreenshotsQuery} from "../../API/rawgApi";

import styles from "./Screenshots.module.scss";

import {LazyLoadImage} from "react-lazy-load-image-component";

import {regularCrop, initialScreenshotsState} from "../../utils/helpers";

interface ScreenshotsProps {
    gameId: number;
    setImageURL: (url: string) => void;
}

const Screenshots:React.FC<ScreenshotsProps> = ({gameId, setImageURL}) => {
    const {data: screenshots = initialScreenshotsState, error: screenshotsError} = useGetGameScreenshotsQuery({id: gameId}, {skip: !gameId});

    return (
        <div className={styles.screenshots}>
            {
                screenshots.results.map((screenshot) =>
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
