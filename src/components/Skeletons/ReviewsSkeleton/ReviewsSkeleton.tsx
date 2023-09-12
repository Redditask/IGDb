import React from "react";

import styles from "./ReviewsSkeleton.module.scss";

const ReviewsSkeleton = () => {

    return (
        <div className={styles.container}>
            <div className={styles.skeleton__header}>
                <span className={styles.skeleton__headerItem}/>
                <span className={styles.skeleton__headerItem}/>
            </div>
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
