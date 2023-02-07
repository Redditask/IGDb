import React from "react";

import styles from "./LabelRow.module.scss";

import {ILabel} from "../../../types/types";

interface LabelRowProps {
    labels: ILabel [];
}

const LabelRow: React.FC<LabelRowProps> = ({labels}) => {

    return (
        <div className={styles.row}>
            {labels.map((label, index) => {
                if (index === 0) return <p key={label.id}>{label.name}</p>
                else if (index === 1) return <p key={label.id}>, {label.name}</p>
            })}
        </div>
    );
};

export default LabelRow;
