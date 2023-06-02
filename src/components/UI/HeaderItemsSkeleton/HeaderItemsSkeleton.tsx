import React from "react";

import styles from "./HeaderItemsSkeleton.module.scss";

const HeaderItemsSkeleton: React.FC = () => {

    return (
        <span className={styles.skeleton}/>
    );
};

export default HeaderItemsSkeleton;
