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
                    return index === labels.length - 1
                        ? <p key={label.id}>{label.name}</p>
                        : <p key={label.id}>{label.name}, </p>
                })}
            </div>
        </div>
    );
};

export default LabelRow;
