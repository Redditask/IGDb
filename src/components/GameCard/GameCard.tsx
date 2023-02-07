import React, {memo} from "react";

import styles from "./GameCard.module.scss";

import {LazyLoadImage} from "react-lazy-load-image-component";
import {NavLink} from "react-router-dom";
import "react-lazy-load-image-component/src/effects/blur.css";

import PlatformsRow from "../UI/PlatofrmsRow/PlatformsRow";
import MetacriticScore from "../UI/MetacriticScore/MetacriticScore";
import LabelRow from "../UI/LabelRow/LabelRow";

import {GameFromList} from "../../types/types";

import {dateFormatting, imageCrop} from "../../utils/helpers";

interface GameCardProps {
    game: GameFromList;
}

const GameCard: React.FC<GameCardProps> = memo(({game}) => {

    return (
        <NavLink
            className={styles.gameCard}
            to={`/game/${game.slug}`}
        >
            <LazyLoadImage
                className={styles.gameCard__image}
                src={imageCrop(game.background_image)}
                effect="blur"
                alt="Background"
            />
            <div className={styles.gameCard__description}>
                <h3 className={styles.gameCard__title}>
                    {game.name}
                </h3>
                <PlatformsRow platformsArray={game.parent_platforms}/>
                <p>Release date: {dateFormatting(game.released)}</p>
                <div className={styles.gameCard__metacritic}>
                    <p>Metacritic: </p>
                    <MetacriticScore score={game.metacritic}/>
                </div>
                <div className={styles.gameCard__genres}>
                    <p>Genres: </p>
                    <LabelRow labels={game.genres}/>
                </div>
            </div>
        </NavLink>
    );
});

export default GameCard;
