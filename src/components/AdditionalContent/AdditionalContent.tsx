import React, {useEffect, useState} from "react";

import {useGetGameDLCQuery, useGetSameSeriesGamesQuery} from "../../API/rawgApi";

import styles from "./AdditionalContent.module.scss";

import {useAppDispatch} from "../../hooks";
import {setIsError, setIsFetching} from "../../store/userSlice";

import GamesCarousel from "../GamesCarousel/GamesCarousel";

import {IGameCard} from "../../types/data";

import {initialGamesState} from "../../utils/helpers/initialStates";

interface AdditionalContentProps {
    gameId: number;
    isLoading: boolean;
}

const AdditionalContent: React.FC<AdditionalContentProps> = ({gameId, isLoading}) => {
    const [sameSeriesGames, setSameSeriesGames] = useState<IGameCard []>([]);
    const [DLC, setDLC] = useState<IGameCard []>([]);

    const dispatch = useAppDispatch();

    const {
        data: sameSeriesResponse = initialGamesState,
        isError: isSameSeriesError,
        isFetching: isFetchingSameSeries,
    } = useGetSameSeriesGamesQuery({id: gameId}, {skip: !gameId});

    const {
        data: dlcResponse = initialGamesState,
        isError: isDlcError,
        isFetching: isFetchingDLC,
    } = useGetGameDLCQuery({id: gameId}, {skip: !gameId});

    useEffect((): void => {
        setDLC([...dlcResponse.results]);
        setSameSeriesGames([...sameSeriesResponse.results]);

        dispatch(setIsError(isDlcError || isSameSeriesError));
    }, [dlcResponse, sameSeriesResponse]);

    useEffect((): void => {
        dispatch(setIsFetching(isFetchingSameSeries || isFetchingDLC));
    }, [isFetchingSameSeries, isFetchingDLC]);

    return (
        <div className={styles.container}>
            {
                (!!sameSeriesGames.length || !!DLC.length)
                &&
                <div className={styles.additionalContent}>
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
