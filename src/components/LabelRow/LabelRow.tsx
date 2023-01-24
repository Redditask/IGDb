import React from "react";

import styles from "./LabelRow.module.scss";

import {Label} from "../../types/types";

interface LabelRowProps {
    labels: Label [];
}

const LabelRow: React.FC<LabelRowProps> = ({labels}) => {
    return (
        <div className={styles.LabelRow}>
            {labels.map((label, index) => {
                if (index === labels.length - 1) return <p key={label.id}>{label.name}</p>
                else if (index < 1) return <p key={label.id}>{label.name},</p>
            })}
        </div>
    );
};

export default LabelRow;
