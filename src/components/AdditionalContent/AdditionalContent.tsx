import React, {useEffect, useState} from "react";

import {useGetGameDLCQuery, useGetSameSeriesGamesQuery} from "../../API/rawgApi";

import {NavigateFunction, useNavigate} from "react-router-dom";

import styles from "./AdditionalContent.module.scss";

import AdditionalContentItem from "../AdditionalContentItem/AdditionalContentItem";
import Button from "../UI/Button/Button";

import {IGameCard} from "../../types/types";

import {initialDLCState, initialGamesState} from "../../utils/helpers";

interface AdditionalContentProps {
    gameId: number;
    setIsError: (isError: boolean) => void;
}

const AdditionalContent: React.FC<AdditionalContentProps> = ({gameId, setIsError}) => {
    const [games, setGames] = useState<IGameCard []>([]);
    const [DLC, setDLC] = useState<IGameCard []>([]);
    const [isAllGames, setIsAllGames] = useState<boolean>(false);
    const [isAllDLC, setIsAllDLC] = useState<boolean>(false);

    const nav: NavigateFunction = useNavigate();

    const backToMainGame = (): void => nav(-1);

    const {
        data: sameSeriesGames = initialGamesState,
        error: sameSeriesError,
        isSuccess: gameSuccess
    } = useGetSameSeriesGamesQuery({id: gameId}, {skip: !gameId});

    const {
        data: dlcResponse = initialDLCState,
        error: dlcError,
        isSuccess: dlcSuccess
    } = useGetGameDLCQuery({id: gameId}, {skip: !gameId});

    useEffect((): void => {
        setIsAllGames(false);

        if (gameSuccess) {
            if (sameSeriesGames.results.length > 3) {
                setGames([...sameSeriesGames.results.slice(0, 3)]);
            } else {
                setGames([...sameSeriesGames.results]);
                setIsAllGames(true);
            }
        }

        if (sameSeriesError) setIsError(true);
    }, [sameSeriesGames]);

    useEffect((): void => {
        setIsAllDLC(false);

        if (dlcSuccess) {
            if (dlcResponse.results.length > 3) {
                setDLC([...dlcResponse.results.slice(0, 3)]);
            } else {
                setDLC([...dlcResponse.results]);
                setIsAllDLC(true);
            }
        }

        if (dlcError) setIsError(true);
    }, [dlcResponse]);

    const showAllGames = (): void => {
        setGames([...games, ...sameSeriesGames.results.slice(3)]);
        setIsAllGames(true);
    };

    const showAllDLC = (): void => {
        setDLC([...DLC, ...dlcResponse.results.slice(3)]);
        setIsAllDLC(true);
    };

    return (
        <div className={styles.additionalContent}>
            {
                (games.length>0 || DLC.length>0)
                &&
                <div className={styles.container}>
                    <AdditionalContentItem
                        title="Same series games"
                        content={games}
                        onClickAction={showAllGames}
                        isAll={isAllGames}
                    />
                    <AdditionalContentItem
                        title="DLC for this game"
                        content={DLC}
                        onClickAction={showAllDLC}
                        isAll={isAllDLC}
                    />
                </div>
            }
            {
                (games.length === 0 && DLC.length === 0)
                &&
                <div className={styles.backButton}>
                    <Button title="Return" onClick={backToMainGame}/>
                </div>
            }
        </div>
    );
};

export default AdditionalContent;
