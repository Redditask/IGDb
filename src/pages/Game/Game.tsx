import React, {useEffect, useState} from "react";

import {
    useGetGameDetailsQuery,
    useGetGameDLCQuery,
    useGetGameScreenshotsQuery,
    useGetGameTrailersQuery
} from "../../API/rawgApi";

import {useParams} from "react-router-dom";
import {LazyLoadImage} from "react-lazy-load-image-component";

import styles from "./Game.module.scss";

import GameDetails from "../../components/GameDetails/GameDetails";
import Screenshots from "../../components/UI/Screenshots/Screenshots";
import ImageModal from "../../components/UI/ImageModal/ImageModal";
import Trailer from "../../components/UI/Trailer/Trailer";

import {GameQueryResult} from "../../types/types";

import {dateFormatting, initialGameStateFromServer} from "../../utils/helpers";

const Game: React.FC = () => {
    const [imageURL, setImageURL] = useState<string>("");
    const [game, setGame] = useState<GameQueryResult>(initialGameStateFromServer);

    const {slug} = useParams();

    const {data: gameResponse, error: gameError, isSuccess: gameSuccess} = useGetGameDetailsQuery({slug}, {skip: !slug});
    const {data: screenshots, error: screenshotsError} = useGetGameScreenshotsQuery({id: game.id}, {skip: !game.id});
    const {data: dlc, error: dlcError} = useGetGameDLCQuery({id: game.id}, {skip: !game.id});
    const {data: trailers, error: trailersError} = useGetGameTrailersQuery({id: game.id}, {skip: !game.id});

    //console.log(screenshots, dlc)

    useEffect(() => {
        if (gameSuccess) setGame(gameResponse);
    }, [gameResponse]);

    return (
        <div
            className={styles.background}
            style={{backgroundImage: `url(${game.background_image})`}}
        >
            <div className={styles.wrapper}>
                <div className={styles.game}>
                    <div className={styles.game__main}>
                        <div className={styles.game__leftSide}>
                            <h2>{dateFormatting(game.released)}</h2>
                            <h1 className={styles.game__title}>{game.name}</h1>
                            <div className={styles.game__buttons}>
                                {/* заглушки */}
                                <p>Add to wishlist</p>
                                <p>Add to my games</p>
                            </div>
                        </div>
                        <div className={styles.game__rightSide}>
                            <Trailer trailer={trailers && trailers.results[0]}/>
                        </div>
                    </div>
                    <div className={styles.game__info}>
                        <div className={styles.game__details}>
                            <GameDetails game={game}/>
                            <Screenshots
                                setImageURL={setImageURL}
                                screenshots={screenshots}
                            />
                        </div>
                        <div>
                            <h1>About</h1>
                            <p className={styles.game__text}>{game.description_raw}</p>
                        </div>
                    </div>
                </div>
            </div>
            {
                imageURL &&
                <ImageModal imageURl={imageURL} setImageURL={setImageURL}>
                    <LazyLoadImage
                        className={styles.game__image}
                        src={imageURL}
                        effect="blur"
                        alt="Game screenshot"
                    />
                </ImageModal>
            }
        </div>
    );
};

export default Game;
