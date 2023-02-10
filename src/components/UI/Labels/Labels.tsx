import React from "react";

import styles from "./Labels.module.scss";

import {ILabel} from "../../../types/types";

interface LabelsProps {
    labels: ILabel [];
    title: string;
}

const Labels: React.FC<LabelsProps> = ({labels, title}) => {

    return (
        <div className={styles.labels}>
            <p>{title}:</p>
            <div className={styles.labels__list}>
                {labels.map((label, index) => {
                    return index === labels.length - 1
                        ? <p key={label.id}>{label.name}</p>
                        : <p key={label.id}>{label.name}, </p>
                })}
            </div>
        </div>
    );
};

export default Labels;
