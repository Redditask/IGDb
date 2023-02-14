import React, {memo} from "react";

import styles from "./GameCard.module.scss";

import {LazyLoadImage} from "react-lazy-load-image-component";
import {NavLink} from "react-router-dom";
import "react-lazy-load-image-component/src/effects/blur.css";

import PlatformIcons from "../UI/PlatofrmIcons/PlatformIcons";
import MetacriticScore from "../UI/MetacriticScore/MetacriticScore";
import Labels from "../UI/Labels/Labels";

import {IGameCard} from "../../types/types";

import {dateFormatting, imageCrop} from "../../utils/helpers";

interface GameCardProps {
    gameCard: IGameCard;
}

const GameCard: React.FC<GameCardProps> = memo(({gameCard}) => {
    const genres = gameCard.genres.filter(genre => genre.id !== 59);

    return (
        <NavLink
            className={styles.card}
            to={`/game/${gameCard.slug}`}
        >
            <LazyLoadImage
                className={styles.card__image}
                src={imageCrop(gameCard.background_image)}
                effect="blur"
                alt="Background"
            />
            <div className={styles.card__description}>
                <h3 className={styles.card__title}>
                    {gameCard.name}
                </h3>
                <PlatformIcons platformsArray={gameCard.parent_platforms}/>
                <p>Release date: {dateFormatting(gameCard.released)}</p>
                <MetacriticScore score={gameCard.metacritic}/>
                <Labels labels={genres} title="Genres"/>
            </div>
        </NavLink>
    );
});

export default GameCard;
