import React from "react";

import styles from "./GameList.module.scss";

import GameCard from "../GameCard/GameCard";
import SmallLoader from "../UI/SmallLoader/SmallLoader";

import {Game} from "../../types/types";

interface BodyProps {
    games: Game[];
}

const GameList: React.FC<BodyProps> = ({games}) => {

    return (
        <div className={styles.container}>
            <div className={styles.gameList}>
                {
                    games.map(
                        (game) =>
                            game.background_image
                            ? <GameCard game={game} key={game.name}/>
                            : null
                    )
                }
            </div>
            <div className={styles.loaderArea}>
                <SmallLoader/>
            </div>
        </div>
    );
};

export default GameList;
