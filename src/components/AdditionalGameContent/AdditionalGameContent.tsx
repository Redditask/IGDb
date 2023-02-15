import React, {useState} from "react";

import styles from "./AdditionalGameContent.module.scss";

import GameList from "../GameList/GameList";

import {IGameCard} from "../../types/types";
import Button from "../UI/Button/Button";

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
                        <h1>Same series games</h1>
                        {
                            showGames
                            ?
                                <GameList games={games} isLimit={true} isEmpty={false}/>
                                :
                                <Button title="Show" onClick={()=>setShowGames(true)}/>
                        }
                    </div>
                    :
                    <></>
            }
            {
                dlc.length
                    ?
                    <div className={styles.gameList}>
                        <h1>DLC for this game</h1>
                        {
                            showDLC
                            ?
                                <GameList games={dlc} isLimit={true} isEmpty={false}/>
                                :
                                <Button title="Show" onClick={()=>setShowDLC(true)}/>
                        }
                    </div>
                    :
                    <></>
            }
        </div>
    );
};

export default AdditionalGameContent;
