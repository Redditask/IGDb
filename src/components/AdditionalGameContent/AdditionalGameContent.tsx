import React, {useEffect, useState} from "react";

import {useGetGameDLCQuery, useGetSameSeriesGamesQuery} from "../../API/rawgApi";

import styles from "./AdditionalGameContent.module.scss";

import GameList from "../GameList/GameList";
import Button from "../UI/Button/Button";

import {IGameCard} from "../../types/types";

import {initialDLCState, initialGamesState} from "../../utils/helpers";

interface AdditionalGameContentProps {
    gameId: number;
}

const AdditionalGameContent: React.FC<AdditionalGameContentProps> = ({gameId}) => {
    const [games, setGames] = useState<IGameCard []>([]);
    const [DLC, setDLC] = useState<IGameCard []>([]);
    const [isAllGames, setIsAllGames] = useState<boolean>(false);
    const [isAllDLC, setIsAllDLC] = useState<boolean>(false);

    const {data: sameSeriesGames = initialGamesState, error: sameSeriesError, isSuccess: gameSuccess} = useGetSameSeriesGamesQuery({id: gameId}, {skip: !gameId});
    const {data: dlcResponse = initialDLCState, error: dlcError, isSuccess: dlcSuccess} = useGetGameDLCQuery({id: gameId}, {skip: !gameId});

    useEffect(() => {
        if(gameSuccess) {
            if (sameSeriesGames.results.length > 3) {
                setGames([...sameSeriesGames.results.slice(0, 3)]);
            } else {
                setGames([...sameSeriesGames.results]);
                setIsAllGames(true);
            }
        }
    }, [sameSeriesGames]);

    useEffect(() => {
        if(dlcSuccess) {
            if (dlcResponse.results.length > 3) {
                setDLC([...dlcResponse.results.slice(0, 3)]);
            } else {
                setDLC([...dlcResponse.results]);
                setIsAllDLC(true);
            }
        }
    }, [dlcResponse]);

    console.log(dlcResponse.results.length)

    const showAllGames = () => {
        setGames([...games, ...sameSeriesGames.results.slice(3)]);
        setIsAllGames(true);
    };

    const showAllDLC = () => {
        setDLC([...DLC, ...dlcResponse.results.slice(3)]);
        setIsAllDLC(true);
    };

    return (
        <div className={styles.container}>
            {
                games.length
                    ?
                    <div className={styles.gameList}>
                        <h2>Same series games</h2>
                        <GameList games={games} isLimit={true} isEmpty={false}/>
                        {
                            isAllGames
                                ?
                                <></>
                                :
                                <div className={styles.showButton}>
                                    <Button title="show all" onClick={showAllGames}/>
                                </div>
                        }
                    </div>
                    :
                    <></>
            }
            {
                DLC.length
                    ?
                    <div className={styles.gameList}>
                        <h2>DLC for this game</h2>
                        <GameList games={DLC} isLimit={true} isEmpty={false}/>
                        {
                            isAllDLC
                                ?
                                <></>
                                :
                                <div className={styles.showButton}>
                                    <Button title="show all" onClick={showAllDLC}/>
                                </div>
                        }
                    </div>
                    :
                    <></>
            }
        </div>
    );
};

export default AdditionalGameContent;
