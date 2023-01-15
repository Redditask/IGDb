import React from 'react';

import styles from "./GameCard.module.scss";
import {GameInfo} from "../../types/types";

interface GameCardProps {
    game: GameInfo;
}

const GameCard: React.FC<GameCardProps> = ({game}) => {
    return (
        <div className={styles.GameCard}>
            <img
                className={styles.GameCard__image}
                src={game.background_image}
                width="320"
                height="180"
            />
            <div className={styles.GameCard__description}>
                <h3 className={styles.GameCard__gameTitle}>
                    {game.name}
                </h3>
                <p>Release date: {game.released}</p>
                <p>Metacritic: {game.metacritic}</p>
            </div>
        </div>
    );
};

export default GameCard;
