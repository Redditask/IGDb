import React from "react";

import styles from "./ScreenshotsSkeleton.module.scss";

const ScreenshotsSkeleton = () => {

    return (
        <div className={styles.skeleton}>
            <span className={styles.skeleton__item}/>
            <span className={styles.skeleton__item}/>
            <span className={styles.skeleton__item}/>
            <span className={styles.skeleton__item}/>
            <span className={styles.skeleton__item}/>
        </div>
    );
};

export default ScreenshotsSkeleton;
