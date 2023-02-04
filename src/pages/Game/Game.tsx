import React, {useEffect, useState} from "react";

import {useParams} from "react-router-dom";
import {useGetGameDetailsQuery, useGetGameDLCQuery, useGetGameScreenshotsQuery} from "../../API/rawgApi";

import styles from "./Game.module.scss";

import GameDetails from "../../components/GameDetails/GameDetails";
import Screenshots from "../../components/Screenshots/Screenshots";

import {DLC, Screenshot, ResponseWithGame} from "../../types/types";

import {imageCrop, initialGameStateFromServer} from "../../utils/helpers";

const Game = () => {
    const [game, setGame] = useState<ResponseWithGame>(initialGameStateFromServer);

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
        <div
            className={styles.Background}
            style={{backgroundImage: `url(${imageCrop(game.background_image)})`}}
        >
            <div className={styles.Container}>
                <div className={styles.Game}>
                    <div className={styles.Game__openingInfo}>
                        <h2>{game.released}</h2>
                        <h1>{game.name}</h1>
                        <div className={styles.Game__buttons}>
                            {/* заглушки */}
                            <p>Add to wishlist</p>
                            <p>Add to my games</p>
                        </div>
                    </div>
                    <div className={styles.Game__mainInfo}>
                        <div className={styles.Game__details}>
                            <GameDetails game={game}/>
                            {screenshots && <Screenshots screenshots={screenshots}/>}
                        </div>
                        <div>
                            <h1>About</h1>
                            <p className={styles.Game__text}>{game.description_raw}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Game;
