import React from "react";

import styles from "./GameList.module.scss";

import GameCard from "../GameCard/GameCard";
import Loader from "../UI/Loader/Loader";

import {Game} from "../../types/types";

interface BodyProps {
    games: Game[];
    isLimit: boolean;
}

const GameList: React.FC<BodyProps> = ({games, isLimit}) => {

    return (
        <div className={styles.container}>
            <div className={styles.gameList}>
                {
                    games.map(
                        (game) =>
                            game.background_image
                                ? <GameCard game={game} key={game.id}/>
                                : null
                    )
                }
            </div>
            <div className={styles.loaderArea}>
                {isLimit ? null : <Loader/>}
            </div>
        </div>
    );
};

export default GameList;
