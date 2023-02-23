import React from "react";

import styles from "./GameHeadSkeleton.module.scss";

const GameHeadSkeleton:React.FC = () => {

    return (
        <div className={styles.skeleton}>
            <span className={styles.skeleton__released}/>
            <span className={styles.skeleton__title}/>
            <div className={styles.skeleton__buttons}>
                <span className={styles.button}/>
                <span className={styles.button}/>
            </div>
        </div>
    );
};

export default GameHeadSkeleton;
