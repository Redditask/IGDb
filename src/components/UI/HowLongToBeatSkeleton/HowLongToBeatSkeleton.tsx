import React from "react";

import styles from "./HowLongToBeatSkeleton.module.scss";

const HowLongToBeatSkeleton: React.FC = () => {

    return (
        <div className={styles.skeleton}>
            <span className={styles.skeleton__heading}/>
            <span className={styles.skeleton__info}/>
        </div>
    );
};

export default HowLongToBeatSkeleton;
