import React from "react";

import styles from "./GameTrailer.module.scss";

import {Trailer} from "../../types/types";

interface GameTrailerProps {
    trailer: Trailer;
}

const GameTrailer: React.FC<GameTrailerProps> = ({trailer}) => {

    return (
        <video
            title="Game Trailer"
            className={styles.GameTrailer}
            src={trailer.data["480"]}
            controls
            poster={trailer.preview}
        >
            Your browser doesn't support HTML5 video tag
        </video>
    );
};

export default GameTrailer;
