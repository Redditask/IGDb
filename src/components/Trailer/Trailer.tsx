import React, {useEffect} from "react";

import {useGetGameTrailersQuery} from "../../API/rawgApi";

import styles from "./Trailer.module.scss";

import {initialTrailersState} from "../../utils/helpers/initialStates";

interface TrailerProps {
    gameId: number;
    setIsError: (isError: boolean) => void;
}

const Trailer: React.FC<TrailerProps> = ({gameId, setIsError}) => {

    const {
        data: trailers = initialTrailersState,
        error: trailerError
    } = useGetGameTrailersQuery({id: gameId}, {skip: !gameId});

    useEffect((): void => {
        if (trailerError) setIsError(true);
    }, [trailerError]);

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
