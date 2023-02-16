import React, {useState} from "react";

import {useGetGameDLCQuery, useGetSameSeriesGamesQuery} from "../../API/rawgApi";

import styles from "./AdditionalGameContent.module.scss";

import GameList from "../GameList/GameList";
import Button from "../UI/Button/Button";

import {initialDLCState, initialGamesState} from "../../utils/helpers";

interface AdditionalGameContentProps {
    gameId: number;
}

const AdditionalGameContent: React.FC<AdditionalGameContentProps> = ({gameId}) => {
    const [showGames, setShowGames] = useState<boolean>(false);
    const [showDLC, setShowDLC] = useState<boolean>(false);

    const {data: sameSeriesGames = initialGamesState, error: sameSeriesError} = useGetSameSeriesGamesQuery({id: gameId}, {skip: !gameId});
    const {data: dlc = initialDLCState, error: dlcError} = useGetGameDLCQuery({id: gameId}, {skip: !gameId});

    return (
        <div className={styles.container}>
            {
                sameSeriesGames.results.length
                    ?
                    <div className={styles.gameList}>
                        <h2>Same series games</h2>
                        {
                            showGames
                            ?
                                <GameList games={sameSeriesGames.results} isLimit={true} isEmpty={false}/>
                                :
                                <Button title="show all" onClick={()=>setShowGames(true)}/>
                        }
                    </div>
                    :
                    <></>
            }
            {
                dlc.results.length
                    ?
                    <div className={styles.gameList}>
                        <h2>DLC for this game</h2>
                        {
                            showDLC
                            ?
                                <GameList games={dlc.results} isLimit={true} isEmpty={false}/>
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
