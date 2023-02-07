import React, {useState} from "react";

import styles from "./Screenshots.module.scss";

import {LazyLoadImage} from "react-lazy-load-image-component";

import {ScreenshotsQueryResult} from "../../../types/types";

import {imageCrop} from "../../../utils/helpers";

interface ScreenshotsProps {
    screenshots: ScreenshotsQueryResult | undefined;
    setImageURL: (url: string) => void;
}

const Screenshots:React.FC<ScreenshotsProps> = ({screenshots, setImageURL}) => {

    return (
        screenshots
            ?
            <div className={styles.screenshots}>
                {
                    screenshots.results.map((screenshot) =>
                        <LazyLoadImage
                            className={styles.screenshot}
                            src={imageCrop(screenshot.image)}
                            key={screenshot.id}
                            onClick={() => setImageURL(screenshot.image)}
                            title="Open screenshot"
                            effect="blur"
                            alt="Game screenshot"
                        />
                    )
                }
            </div>
            :
            <></>
    );
};

export default Screenshots;
