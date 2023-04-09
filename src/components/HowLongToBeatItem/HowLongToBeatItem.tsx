import React from "react";

import styles from "./HowLongToBeatItem.module.scss";

interface HowLongToBeatItemProps {
    title: string;
    value: number;
}

const HowLongToBeatItem: React.FC<HowLongToBeatItemProps> = ({title, value}) => {

    return (
        value
            ?
            <div className={styles.HowLongToBeatItem}>
                <p className={styles.HowLongToBeatItem__title}>{title}</p>
                <p className={styles.HowLongToBeatItem__value}>
                <span className={styles.HowLongToBeatItem__digit}>
                    {value}
                </span>
                    hours
                </p>
            </div>
            :
            <></>
    );
};

export default HowLongToBeatItem;
