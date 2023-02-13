import React from "react";

import styles from "./SameSeriesGameList.module.scss";

import GameCard from "../GameCard/GameCard";

import {IGame} from "../../types/types";

interface SameSeriesGameListProps {
    games: IGame [];
}

const SameSeriesGameList: React.FC<SameSeriesGameListProps> = ({games}) => {

    return (
        <>
            {
                games.length &&
                <div className={styles.container}>
                    <h1>Same series games</h1>
                    <div className={styles.sameSeriesGameList}>
                        {games.map(game =>
                            <GameCard
                                key={game.id}
                                game={game}
                            />
                        )}
                    </div>
                </div>
            }
        </>
    );
};

export default SameSeriesGameList;
