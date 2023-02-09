import React from "react";

import styles from "./GameHead.module.scss";

import Trailer from "../UI/Trailer/Trailer";

import {GameQueryResult, TrailersQueryResult} from "../../types/types";

import {dateFormatting} from "../../utils/helpers";

interface GameHeadProps {
    game: GameQueryResult;
    trailers: TrailersQueryResult;
}

const GameHead: React.FC<GameHeadProps> = ({game, trailers}) => {

    return (
        <div className={styles.gameHead}>
            <div className={styles.textSide}>
                <h2>{dateFormatting(game.released)}</h2>
                <h1 className={styles.textSide__title}>{game.name}</h1>
                <div className={styles.textSide__buttons}>
                    {/* заглушки */}
                    <p>Add to wishlist</p>
                    <p>Add to my games</p>
                </div>
            </div>
            <Trailer trailer={trailers.results[0]}/>
        </div>

    );
};

export default GameHead;
