import React from "react";

import styles from "./HowLongToBeat.module.scss";

interface HowLongToBeatProps {
    gameName: string;
}

const HowLongToBeat: React.FC<HowLongToBeatProps> = ({gameName}) => {

    return (
        <div className={styles.howLongToBeat}>
            <h2>How long to beat</h2>
            <div className={styles.howLongToBeat__cells}>
                <div className={styles.howLongToBeat__cell}>
                    <p className={styles.howLongToBeat__type}>Main story</p>
                    <p className={styles.howLongToBeat__value}>* hours</p>
                </div>
                <div className={styles.howLongToBeat__cell}>
                    <p className={styles.howLongToBeat__type}>Main + Sides</p>
                    <p className={styles.howLongToBeat__value}>* hours</p>
                </div>
                <div className={styles.howLongToBeat__cell}>
                    <p className={styles.howLongToBeat__type}>Completionist</p>
                    <p className={styles.howLongToBeat__value}>* hours</p>
                </div>
            </div>
        </div>
    );
};

export default HowLongToBeat;
