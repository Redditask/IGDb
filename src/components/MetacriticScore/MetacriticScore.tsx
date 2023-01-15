import React from 'react';

import styles from "./MetacriticScore.module.scss";

interface MeracriticScoreProps {
    score: number;
}

const MetacriticScore:React.FC<MeracriticScoreProps> = ({score}) => {
    let className = styles.green;

    if (score < 75) className = styles.yellow;
    else if (score < 50) className = styles.red;

    return (
        score
            ?
            <div className={className} title="Game rating on metacritic">
                {score}
            </div>
            :
            <div className={styles.notAvailable}>Not available</div>
    );
};

export default MetacriticScore;
