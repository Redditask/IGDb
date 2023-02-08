import React from "react";

import styles from "./Trailer.module.scss";

import {ITrailer} from "../../../types/types";

interface TrailerProps {
    trailer: ITrailer | undefined;
}

const Trailer: React.FC<TrailerProps> = ({trailer}) => {

    return (
        <>
            {
                trailer
                &&
                <video
                    title="Game Trailer"
                    className={styles.trailer}
                    src={trailer.data["480"]}
                    controls
                    poster={trailer.preview}
                >
                    Your browser doesn't support HTML5 video tag
                </video>
            }
        </>
    );
};

export default Trailer;
