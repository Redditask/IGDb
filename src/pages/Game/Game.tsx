import React, {useEffect, useState} from "react";

import {useParams} from "react-router-dom";
import {useGetGameDetailsQuery, useGetGameDLCQuery, useGetGameScreenshotsQuery} from "../../API/rawgApi";
import {LazyLoadImage} from "react-lazy-load-image-component";

import styles from "./Game.module.scss";

import {DLC, Screenshot, ServerGame} from "../../types/types";

import {imageCrop, itinitalServerGameState} from "../../utils/helpers";
import GameDetails from "../../components/GameDetails/GameDetails";

const Game = () => {
    const [game, setGame] = useState<ServerGame>(itinitalServerGameState);

    const {slug} = useParams();
    const {
        data: gameResponse,
        error: gameError,
        isSuccess: gameSuccess
    } = useGetGameDetailsQuery({slug}, {skip: !slug});
    const {data: screenshots, error: screenshotsError} = useGetGameScreenshotsQuery({id: game.id}, {skip: !game.id});
    const {data: dlc, error: dlcError} = useGetGameDLCQuery({id: game.id}, {skip: !game.id});

    //console.log(screenshots, dlc)

    useEffect(() => {
        if (gameSuccess) setGame(gameResponse);
    }, [gameResponse]);

    return (
        <div className={styles.Game}>
            <div className={styles.Game__mainInfo}>
                <LazyLoadImage
                    className={styles.Game__image}
                    src={imageCrop(game.background_image)}
                    width="600"
                    height="400"
                    effect="blur"
                    alt="Background"
                />
            <GameDetails game={game}/>
            </div>
            <div className={styles.Game__about}>
                <h1>About</h1>
                <p className={styles.Game__text}>{game.description_raw}</p>
            </div>
        </div>
    );
};

export default Game;
