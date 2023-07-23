import React from "react";

import styles from "./GameLabelsSkeleton.module.scss";

const GameLabelsSkeleton: React.FC = () => {

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

export default GameLabelsSkeleton;
