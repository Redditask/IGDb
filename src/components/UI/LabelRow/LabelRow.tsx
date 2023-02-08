import React from "react";

import styles from "./LabelRow.module.scss";

import {ILabel} from "../../../types/types";

interface LabelRowProps {
    labels: ILabel [];
    title: string;
}

const LabelRow: React.FC<LabelRowProps> = ({labels, title}) => {

    return (
        <div className={styles.labelRow}>
            <p>{title}: </p>
            <div className={styles.labelRow__list}>
                {labels.map((label, index) => {
                    if (index === 0)
                        return <p key={label.id}>{label.name}</p>
                    else if (index < 3)
                        return <p key={label.id}>, {label.name}</p>
                })}
            </div>
        </div>
    );
};

export default LabelRow;
