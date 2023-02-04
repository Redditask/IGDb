import React, {useState} from "react";

import styles from "./Screenshots.module.scss";

import {LazyLoadImage} from "react-lazy-load-image-component";

import {ResponseWithScreenshots} from "../../types/types";

import {imageCrop} from "../../utils/helpers";

interface ScreenshotsProps {
    screenshots: ResponseWithScreenshots;
    setImageURL: (url: string) => void;
}

const Screenshots:React.FC<ScreenshotsProps> = ({screenshots, setImageURL}) => {

    return (
        <div className={styles.Screenshots}>
            {screenshots.results.map((screenshot, index) =>
                <LazyLoadImage
                    className={styles.Screenshot}
                    src={imageCrop(screenshot.image)}
                    key={screenshot.id}
                    onClick={()=>setImageURL(screenshot.image)}
                    title="Open screenshot"
                    effect="blur"
                    alt="Game screenshot"
                />
            )}
        </div>
    );
};

export default Screenshots;
