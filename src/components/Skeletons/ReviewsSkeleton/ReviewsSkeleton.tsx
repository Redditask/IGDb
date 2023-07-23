import React from "react";

import styles from "./ReviewsSkeleton.module.scss";

const ReviewsSkeleton = () => {

    return (
        <div className={styles.container}>
            <span className={styles.skeleton__header}/>
            <div className={styles.skeleton}>
                <span className={styles.skeleton__item}/>
                <span className={styles.skeleton__item}/>
                <span className={styles.skeleton__item}/>
                <span className={styles.skeleton__item}/>
                <span className={styles.skeleton__item}/>
            </div>
        </div>
    );
};

export default ReviewsSkeleton;
