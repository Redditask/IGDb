import React from "react";

import styles from "./MetacriticScore.module.scss";

interface MetacriticScoreProps {
    score: number;
}

const MetacriticScore:React.FC<MetacriticScoreProps> = ({score}) => {
    let className = styles.green;

    if (score < 75) className = styles.yellow;
    else if (score < 50) className = styles.red;

    return (
        score
            ?
            <div
                className={className}
                title="Game rating on metacritic"
            >
                {score}
            </div>
            :
            <div
                className={styles.notAvailable}
                title="Game rating not available"
            >
                N/A
            </div>
    );
};

export default MetacriticScore;
