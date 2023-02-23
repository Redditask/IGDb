import React from "react";

import styles from "./AboutSkeleton.module.scss";

const AboutSkeleton: React.FC = () => {

    return (
        <div className={styles.skeleton}>
            <span className={styles.skeleton__heading}/>
            <span className={styles.skeleton__text}/>
        </div>
    );
};

export default AboutSkeleton;
