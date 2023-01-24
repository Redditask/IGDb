import React, {memo} from "react";

import styles from "./GameCard.module.scss";

import {LazyLoadImage} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import PlatformsRow from "../PlatofrmsRow/PlatformsRow";
import MetacriticScore from "../MetacriticScore/MetacriticScore";

import {Game} from "../../types/types";

import {imageCrop} from "../../utils/helpers";
import LabelRow from "../LabelRow/LabelRow";

interface GameCardProps {
    game: Game;
}

const GameCard: React.FC<GameCardProps> = memo(({game}) => {

    return (
        <div className={styles.gameCard}>
            <LazyLoadImage
                className={styles.gameCard__image}
                src={imageCrop(game.background_image)}
                width="380"
                height="240"
                effect="blur"
                alt="Background"
            />
            <div className={styles.gameCard__description}>
                <h3 className={styles.gameCard__title}>
                    {game.name}
                </h3>
                <PlatformsRow platformsArray={game.parent_platforms}/>
                <p>Release date: {game.released}</p>
                <div className={styles.gameCard__metacritic}>
                    <p>Metacritic: </p>
                    <MetacriticScore score={game.metacritic}/>
                </div>
                <div className={styles.gameCard__genres}>
                    <p>Genres: </p>
                    <LabelRow labels={game.genres}/>
                </div>
            </div>
        </div>
    );
});

export default GameCard;
