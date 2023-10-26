import React from "react";

import styles from "./AccountInfoSkeleton.module.scss";

const AccountInfoSkeleton = () => {

    return (
        <div className={styles.skeleton}>
            <div className={styles.leftSide}>
                <span className={styles.leftSide__profilePhoto}/>
            </div>
            <div className={styles.textSide}>
                <span className={styles.textSide__username}/>
                <span className={styles.textSide__regularText}/>
                <span className={styles.textSide__bigText}/>
                <span className={styles.textSide__currentPlatforms}/>
                <span className={styles.textSide__button}/>
            </div>
        </div>
    );
};

export default AccountInfoSkeleton;
