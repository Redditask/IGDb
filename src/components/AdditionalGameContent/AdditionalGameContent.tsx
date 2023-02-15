import React from "react";

import styles from "./AdditionalGameContent.module.scss";

import GameList from "../GameList/GameList";

import {IGameCard} from "../../types/types";

interface AdditionalGameContentProps {
    games: IGameCard [];
    dlc: IGameCard[];
}

const AdditionalGameContent: React.FC<AdditionalGameContentProps> = ({games, dlc}) => {

    return (
        <div className={styles.container}>
            {
                games.length
                    ?
                    <div className={styles.gameList}>
                        <h1>Same series games</h1>
                        <GameList games={games} isLimit={true} isEmpty={false}/>
                    </div>
                    :
                    <></>
            }
            {
                dlc.length
                    ?
                    <div className={styles.gameList}>
                        <h1>DLC for this game</h1>
                        <GameList games={dlc} isLimit={true} isEmpty={false}/>
                    </div>
                    :
                    <></>
            }
        </div>
    );
};

export default AdditionalGameContent;
