import React, {useEffect} from "react";

import {useGetGameTrailersQuery} from "../../API/rawgApi";

import styles from "./Trailer.module.scss";

import {setIsError, setIsFetching} from "../../store/userSlice";
import {useAppDispatch} from "../../hooks";

import {initialTrailersState} from "../../utils/helpers/initialStates";

interface TrailerProps {
    gameId: number;
}

const Trailer: React.FC<TrailerProps> = ({gameId}) => {
    const dispatch = useAppDispatch();

    const {
        data: trailers = initialTrailersState,
        isError,
        isFetching
    } = useGetGameTrailersQuery({id: gameId}, {skip: !gameId});

    useEffect((): void => {
        dispatch(setIsError(isError));
    }, [isError]);

    useEffect((): void => {
        dispatch(setIsFetching(isFetching));
    }, [isFetching]);

    return (
        <>
            {
                !!trailers.results[0]
                &&
                <video
                    title="Game Trailer"
                    className={styles.trailer}
                    src={trailers.results[0].data["480"]}
                    controls
                    poster={trailers.results[0].preview}
                >
                    Your browser doesn't support HTML5 video tag
                </video>
            }
        </>
    );
};

export default Trailer;
