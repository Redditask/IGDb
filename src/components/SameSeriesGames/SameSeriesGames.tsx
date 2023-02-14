import React from "react";

import styles from "./SameSeriesGames.module.scss";

import GameList from "../GameList/GameList";

import {IGameCard} from "../../types/types";

interface SameSeriesGamesProps {
    games: IGameCard [];
}

const SameSeriesGames: React.FC<SameSeriesGamesProps> = ({games}) => {

    return (
        games.length
            ?
            <div className={styles.container}>
                <h1>Same series games</h1>
                <GameList games={games} isLimit={true} isEmpty={false}/>
            </div>
            :
            <></>
    );
};

export default SameSeriesGames;
