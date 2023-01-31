import React, {useEffect, useState} from "react";

import {useParams} from "react-router-dom";
import {useGetOneGameQuery} from "../../API/rawgApi";

import styles from "./Game.module.scss";

import {ServerGame} from "../../types/types";

import {imageCrop, itinitalServerGameState} from "../../utils/helpers";
import {LazyLoadImage} from "react-lazy-load-image-component";
import MetacriticScore from "../../components/UI/MetacriticScore/MetacriticScore";

const Game = () => {
    const [game, setGame] = useState<ServerGame>(itinitalServerGameState);

    const {slug} = useParams();
    const {data: response, error, isSuccess} = useGetOneGameQuery({slug});

    useEffect(() => {
        if (isSuccess) setGame(response);
    }, [response]);

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
            </div>
        </div>
    );
};

export default Game;
