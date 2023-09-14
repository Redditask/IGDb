import React from "react";

import styles from "./MetacriticScore.module.scss";

interface MetacriticScoreProps {
    score: number;
}

const MetacriticScore:React.FC<MetacriticScoreProps> = ({score}) => {
    let scoreScolor: string = styles.metacriticScore__green;

    if (score < 75) scoreScolor = styles.metacriticScore__yellow;
    else if (score < 50) scoreScolor = styles.metacriticScore__red;

    return (
        <div className={styles.metacriticScore}>
            <p>Metacritic: </p>
            {
                !!score
                    ?
                    <div
                        className={scoreScolor}
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
