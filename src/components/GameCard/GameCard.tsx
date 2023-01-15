import React from 'react';

import styles from "./GameCard.module.scss";

import {Game} from "../../types/types";

import PlatformsRow from "../PlatofrmsRow/PlatformsRow";
import MetacriticScore from "../MetacriticScore/MetacriticScore";

interface GameCardProps {
    game: Game;
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
                <PlatformsRow platformsArray={game.platforms}/>
                <p>Release date: {game.released}</p>
                <div className={styles.GameCard__metacriticArea}>
                    <p>Metacritic: </p>
                    <MetacriticScore score={game.metacritic}/>
                </div>
            </div>
        </div>
    );
};

export default GameCard;
