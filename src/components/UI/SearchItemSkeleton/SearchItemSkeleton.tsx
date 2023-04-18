import React from "react";

import styles from "./SearchItemSkeleton.module.scss";

const SearchItemSkeleton: React.FC = () => {

    return (
        <div className={styles.skeleton}>
            <span className={styles.skeleton__image}/>
            <div className={styles.skeleton__about}>
                <span className={styles.skeleton__name}/>
                <span className={styles.skeleton__date}/>
            </div>
        </div>
    );
};

export default SearchItemSkeleton;
