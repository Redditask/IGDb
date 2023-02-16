import React from "react";

import {useGetGameTrailersQuery} from "../../API/rawgApi";

import styles from "./Trailer.module.scss";

import {initialTrailersState} from "../../utils/helpers";

interface TrailerProps {
    gameId: number;
}

const Trailer: React.FC<TrailerProps> = ({gameId}) => {
    const {data: trailers = initialTrailersState, error: trailersError} = useGetGameTrailersQuery({id: gameId}, {skip: !gameId});

    return (
        <>
            {
                trailers.results[0]
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
