import React from "react";

import styles from "./GameDescriptionSkeleton.module.scss";

const GameDescriptionSkeleton: React.FC = () => {

    return (
        <div className={styles.skeleton}>
            <span className={styles.skeleton__heading}/>
            <span className={styles.skeleton__text}/>
        </div>
    );
};

export default GameDescriptionSkeleton;
