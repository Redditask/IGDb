import React, {useEffect, useState} from "react";

import {useParams} from "react-router-dom";
import {useGetGameDetailsQuery, useGetGameDLCQuery, useGetGameScreenshotsQuery} from "../../API/rawgApi";
import {LazyLoadImage} from "react-lazy-load-image-component";

import styles from "./Game.module.scss";

import MetacriticScore from "../../components/UI/MetacriticScore/MetacriticScore";

import {DLC, Screenshot, ServerGame} from "../../types/types";

import {imageCrop, itinitalServerGameState} from "../../utils/helpers";

const Game = () => {
    const [game, setGame] = useState<ServerGame>(itinitalServerGameState);

    const {slug} = useParams();
    const {data: gameResponse, error: gameError, isSuccess: gameSuccess} = useGetGameDetailsQuery({slug});
    const {data: screenshots, error: screenshotsError} = useGetGameScreenshotsQuery({id: game.id}, {skip: !game.id});
    const {data: dlc, error: dlcError} = useGetGameDLCQuery({id: game.id}, {skip: !game.id});

    console.log(screenshots, dlc)
    //

    useEffect(() => {
        if (gameSuccess) setGame(gameResponse);
    }, [gameResponse]);

    console.log(game.platforms[0])

    return (
        <div className={styles.Game}>
            <div className={styles.Game__about}>
                <LazyLoadImage
                    className={styles.Game__image}
                    src={imageCrop(game.background_image)}
                    width="750"
                    height="500"
                    effect="blur"
                    alt="Background"
                />
                <div>
                    <h1>About</h1>
                    <p className={styles.Game__text}>{game.description_raw}</p>
                </div>
            </div>
            <div className={styles.Game__details}>
                <h1>Details about game: </h1>
                <h3>Released: {game.released}</h3>
                <div className={styles.Game__detail}>
                    <p>Metacritic: </p>
                    <MetacriticScore score={game.metacritic}/>
                </div>
                <div className={styles.Game__detail}>
                    <p>Developers: </p>
                    <div>
                        {game.developers.map((developer) =>
                            <p>{developer.name}</p>
                        )}
                    </div>
                </div>
                <div className={styles.Game__detail}>
                    <p>Platforms: </p>
                    <div>
                        {game.platforms.map((platform) =>
                            <p key={platform.platform.name}>{platform.platform.name}</p>
                        )}
                    </div>
                </div>
                <div className={styles.Game__detail}>
                    <p>Links: </p>
                    <a href={game.metacritic_url}>Metacritic</a>
                    <a href={game.reddit_url}>Reddit</a>
                    <a href={game.website}>Game Website</a>
                </div>
                {/*тут дальше скриншоты/видео и длс*/}
            </div>
        </div>
    );
};

export default Game;
