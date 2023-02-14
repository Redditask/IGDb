import React, {useEffect, useState} from "react";

import {
    useGetGameDetailsQuery,
    useGetGameDLCQuery,
    useGetGameScreenshotsQuery,
    useGetGameTrailersQuery,
    useGetSameSeriesGamesQuery
} from "../../API/rawgApi";

import {useParams} from "react-router-dom";

import styles from "./Game.module.scss";

import GameDetails from "../../components/GameDetails/GameDetails";
import Screenshots from "../../components/UI/Screenshots/Screenshots";
import ImageModal from "../../components/UI/ImageModal/ImageModal";
import GameHead from "../../components/GameHead/GameHead";
import SameSeriesGames from "../../components/SameSeriesGames/SameSeriesGames";
import GamePageError from "../../components/UI/GamePageError/GamePageError";

import {
    initialDLCState,
    initialGamesState,
    initialGameState,
    initialScreenshotsState,
    initialTrailersState
} from "../../utils/helpers";

const Game: React.FC = () => {
    const [imageURL, setImageURL] = useState<string>("");

    const {slug} = useParams();

    const {data: game = initialGameState, error: gameError} = useGetGameDetailsQuery({slug}, {skip: !slug});
    const {data: screenshots = initialScreenshotsState, error: screenshotsError} = useGetGameScreenshotsQuery({id: game.id}, {skip: !game.id});
    const {data: dlc = initialDLCState, error: dlcError} = useGetGameDLCQuery({id: game.id}, {skip: !game.id});
    const {data: trailers = initialTrailersState, error: trailersError} = useGetGameTrailersQuery({id: game.id}, {skip: !game.id});
    const {data: sameSeriesGames = initialGamesState, error: sameSeriesError} = useGetSameSeriesGamesQuery({id: game.id}, {skip: !game.id});

    useEffect(() =>
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        }), [slug, game]);

    const isError = (): boolean => !!(
        gameError
        || screenshotsError
        || dlcError
        || trailersError
        || sameSeriesError
    );

    return (
        isError()
            ?
            <GamePageError/>
            :
            <div
                className={styles.background}
                style={{backgroundImage: `url(${game.background_image})`}}
            >
                <div className={styles.wrapper}>
                    <div className={styles.game}>
                        <GameHead game={game} trailers={trailers}/>
                        <div className={styles.game__body}>
                            <div className={styles.game__info}>
                                <GameDetails game={game}/>
                                <Screenshots
                                    setImageURL={setImageURL}
                                    screenshots={screenshots}
                                />
                            </div>
                            <div>
                                {/* тут как-то вынести */}
                                <h1>About</h1>
                                <p className={styles.game__text}>{game.description_raw}</p>
                            </div>
                        </div>
                        <SameSeriesGames games={sameSeriesGames.results}/>
                    </div>
                </div>
                <ImageModal
                    imageURL={imageURL}
                    setImageURL={setImageURL}
                />
            </div>
    );
};

export default Game;
