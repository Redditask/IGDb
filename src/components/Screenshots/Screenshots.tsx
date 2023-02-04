import React from "react";

import styles from "./Screenshots.module.scss";

import {ResponseWithScreenshots} from "../../types/types";

import {imageCrop} from "../../utils/helpers";

interface ScreenshotsProps {
    screenshots: ResponseWithScreenshots;
}

const Screenshots:React.FC<ScreenshotsProps> = ({screenshots}) => {

    return (
        <div className={styles.Screenshots}>
            {screenshots.results.map((screenshot) =>
                <img
                    className={styles.Screenshot}
                    src={imageCrop(screenshot.image)}
                    key={screenshot.id}

                    title="Open screenshot"
                />
            )}
        </div>
    );
};

export default Screenshots;
