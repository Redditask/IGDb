import React, {useEffect, useState} from "react";

import {useGetGameDLCQuery, useGetSameSeriesGamesQuery} from "../../API/rawgApi";

import styles from "./AdditionalContent.module.scss";

import {useAppDispatch} from "../../hooks";
import {setIsFetching} from "../../store/userSlice";

import AdditionalContentItem from "../AdditionalContentItem/AdditionalContentItem";

import {IGameCard} from "../../types/types";

import {initialGamesState} from "../../utils/helpers/initialStates";

interface AdditionalContentProps {
    gameId: number;
    setIsError: (isError: boolean) => void;
}

const AdditionalContent: React.FC<AdditionalContentProps> = ({gameId, setIsError}) => {
    const [sameSeriesGames, setSameSeriesGames] = useState<IGameCard []>([]);
    const [DLC, setDLC] = useState<IGameCard []>([]);

    const [isAllSameSeries, setIsAllSameSeries] = useState<boolean>(false);
    const [isAllDLC, setIsAllDLC] = useState<boolean>(false);

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
        setIsAllDLC(false);
        setIsAllSameSeries(false);

        if (dlcSuccess) {
            if (dlcResponse.results.length > 3) {
                setDLC([...dlcResponse.results.slice(0, 3)]);
            } else {
                setDLC([...dlcResponse.results]);
                setIsAllDLC(true);
            }
        }

        if (sameSeriesSuccess) {
            if (sameSeriesResponse.results.length > 3) {
                setSameSeriesGames([...sameSeriesResponse.results.slice(0, 3)]);
            } else {
                setSameSeriesGames([...sameSeriesResponse.results]);
                setIsAllSameSeries(true);
            }
        }

        if (dlcError || sameSeriesError) setIsError(true);
    }, [dlcResponse, sameSeriesResponse]);

    const showAllSameSeries = (): void => {
        setSameSeriesGames([...sameSeriesGames, ...sameSeriesResponse.results.slice(3)]);
        setIsAllSameSeries(true);
    };

    const showAllDLC = (): void => {
        setDLC([...DLC, ...dlcResponse.results.slice(3)]);
        setIsAllDLC(true);
    };

    useEffect((): void => {
        dispatch(setIsFetching(isFetchingSameSeries || isFetchingDLC));
    }, [isFetchingSameSeries, isFetchingDLC]);

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
        </div>
    );
};

export default AdditionalContent;
