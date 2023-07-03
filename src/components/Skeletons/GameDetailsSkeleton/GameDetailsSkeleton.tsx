import React from "react";

import styles from "./GameDetailsSkeleton.module.scss";

const GameDetailsSkeleton: React.FC = () => {

    return (
        <div className={styles.skeleton}>
            <span className={styles.skeleton__heading}/>
            <span className={styles.skeleton__detail}/>
            <span className={styles.skeleton__detail}/>
            <span className={styles.skeleton__detail}/>
            <span className={styles.skeleton__metacritic}/>
            <span className={styles.skeleton__detail}/>
        </div>
    );
};

export default GameDetailsSkeleton;
