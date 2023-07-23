import React, {useEffect, useState} from "react";

import {useGetGameDLCQuery, useGetSameSeriesGamesQuery} from "../../API/rawgApi";

import styles from "./AdditionalContent.module.scss";

import {useAppDispatch} from "../../hooks";
import {setIsFetching} from "../../store/userSlice";

import GamesCarousel from "../GamesCarousel/GameCarousel";

import {IGameCard} from "../../types/data";

import {initialGamesState} from "../../utils/helpers/initialStates";

interface AdditionalContentProps {
    gameId: number;
    setIsError: (isError: boolean) => void;
    isLoading: boolean;
}

const AdditionalContent: React.FC<AdditionalContentProps> = ({gameId, setIsError, isLoading}) => {
    const [sameSeriesGames, setSameSeriesGames] = useState<IGameCard []>([]);
    const [DLC, setDLC] = useState<IGameCard []>([]);

    const dispatch = useAppDispatch();

    const {
        data: sameSeriesResponse = initialGamesState,
        error: sameSeriesError,
        isFetching: isFetchingSameSeries,
        isSuccess: sameSeriesSuccess
    } = useGetSameSeriesGamesQuery({id: gameId}, {skip: !gameId});

    const {
        data: dlcResponse = initialGamesState,
        error: dlcError,
        isFetching: isFetchingDLC,
        isSuccess: dlcSuccess
    } = useGetGameDLCQuery({id: gameId}, {skip: !gameId});

    useEffect((): void => {
        setDLC([...dlcResponse.results]);

        setSameSeriesGames([...sameSeriesResponse.results]);

        if (dlcError || sameSeriesError) setIsError(true);
    }, [dlcResponse, sameSeriesResponse]);

    useEffect((): void => {
        dispatch(setIsFetching(isFetchingSameSeries || isFetchingDLC));
    }, [isFetchingSameSeries, isFetchingDLC]);

    return (
        <div className={styles.additionalContent}>
            {
                (!!sameSeriesGames.length || !!DLC.length)
                &&
                <div className={styles.container}>
                    <GamesCarousel
                        title="DLC"
                        games={DLC}
                        isLoading={isLoading}
                    />
                    <GamesCarousel
                        title="You may be interested"
                        games={sameSeriesGames}
                        isLoading={isLoading}
                    />
                </div>
            }
        </div>
    );
};

export default AdditionalContent;
