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
        <div className={styles.metacriticScore}>
            <p>Metacritic: </p>
            {
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
                        title="Game rating is not available"
                    >
                        N/A
                    </div>
            }
        </div>
    );
};

export default MetacriticScore;
