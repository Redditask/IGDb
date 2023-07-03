import React, {useEffect, useState} from "react";

import {useGetGameDLCQuery, useGetSameSeriesGamesQuery} from "../../API/rawgApi";

import {NavigateFunction, useNavigate} from "react-router-dom";

import styles from "./AdditionalContent.module.scss";

import AdditionalContentItem from "../AdditionalContentItem/AdditionalContentItem";
import Button from "../UI/Button/Button";

import {IGameCard} from "../../types/types";

import {initialDLCState, initialGamesState} from "../../utils/helpers/initialStates";

interface AdditionalContentProps {
    gameId: number;
    setIsError: (isError: boolean) => void;
}

const AdditionalContent: React.FC<AdditionalContentProps> = ({gameId, setIsError}) => {
    const [sameSeriesGames, setSameSeriesGames] = useState<IGameCard []>([]);
    const [DLC, setDLC] = useState<IGameCard []>([]);

    const [isAllSameSeries, setIsAllSameSeries] = useState<boolean>(false);
    const [isAllDLC, setIsAllDLC] = useState<boolean>(false);

    const nav: NavigateFunction = useNavigate();

    const backToMainGame = (): void => nav(-1);

    const {
        data: sameSeriesResponse = initialGamesState,
        error: sameSeriesError,
        isSuccess: sameSeriesSuccess
    } = useGetSameSeriesGamesQuery({id: gameId}, {skip: !gameId});

    const {
        data: dlcResponse = initialDLCState,
        error: dlcError,
        isSuccess: dlcSuccess
    } = useGetGameDLCQuery({id: gameId}, {skip: !gameId});

    useEffect((): void => {
        setIsAllSameSeries(false);

        if (sameSeriesSuccess) {
            if (sameSeriesResponse.results.length > 3) {
                setSameSeriesGames([...sameSeriesResponse.results.slice(0, 3)]);
            } else {
                setSameSeriesGames([...sameSeriesResponse.results]);
                setIsAllSameSeries(true);
            }
        }

        if (sameSeriesError) setIsError(true);
    }, [sameSeriesResponse]);

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

    const showAllSameSeries = (): void => {
        setSameSeriesGames([...sameSeriesGames, ...sameSeriesResponse.results.slice(3)]);
        setIsAllSameSeries(true);
    };

    const showAllDLC = (): void => {
        setDLC([...DLC, ...dlcResponse.results.slice(3)]);
        setIsAllDLC(true);
    };

    return (
        <div className={styles.additionalContent}>
            {
                (!!sameSeriesGames.length || !!DLC.length)
                &&
                <div className={styles.container}>
                    <AdditionalContentItem
                        title="DLC"
                        content={DLC}
                        onClickAction={showAllDLC}
                        isAll={isAllDLC}
                    />
                    <AdditionalContentItem
                        title="You may be interested"
                        content={sameSeriesGames}
                        onClickAction={showAllSameSeries}
                        isAll={isAllSameSeries}
                    />
                </div>
            }
            <div className={styles.backButton}>
                <Button title="Go back" onClick={backToMainGame}/>
            </div>
        </div>
    );
};

export default AdditionalContent;
