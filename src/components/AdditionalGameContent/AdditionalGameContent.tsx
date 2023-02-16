import React, {useState} from "react";

import styles from "./AdditionalGameContent.module.scss";

import GameList from "../GameList/GameList";
import Button from "../UI/Button/Button";

import {IGameCard} from "../../types/types";

interface AdditionalGameContentProps {
    games: IGameCard [];
    dlc: IGameCard[];
}

const AdditionalGameContent: React.FC<AdditionalGameContentProps> = ({games, dlc}) => {
    const [showGames, setShowGames] = useState<boolean>(false);
    const [showDLC, setShowDLC] = useState<boolean>(false);

    return (
        <div className={styles.container}>
            {
                games.length
                    ?
                    <div className={styles.gameList}>
                        <h2>Same series games</h2>
                        {
                            showGames
                            ?
                                <GameList games={games} isLimit={true} isEmpty={false}/>
                                :
                                <Button title="show all" onClick={()=>setShowGames(true)}/>
                        }
                    </div>
                    :
                    <></>
            }
            {
                dlc.length
                    ?
                    <div className={styles.gameList}>
                        <h2>DLC for this game</h2>
                        {
                            showDLC
                            ?
                                <GameList games={dlc} isLimit={true} isEmpty={false}/>
                                :
                                <Button title="show all" onClick={()=>setShowDLC(true)}/>
                        }
                    </div>
                    :
                    <></>
            }
        </div>
    );
};

export default AdditionalGameContent;
