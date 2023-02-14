import React, {useEffect, useState} from "react";

import {
    useGetGameDetailsQuery,
    useGetGameDLCQuery,
    useGetGameScreenshotsQuery,
    useGetGameTrailersQuery,
    useGetSameSeriesGamesQuery
} from "../../API/rawgApi";

import {NavLink, useParams} from "react-router-dom";

import styles from "./Game.module.scss";

import GameDetails from "../../components/GameDetails/GameDetails";
import Screenshots from "../../components/UI/Screenshots/Screenshots";
import ImageModal from "../../components/UI/ImageModal/ImageModal";
import Message from "../../components/UI/Message/Message";
import GameHead from "../../components/GameHead/GameHead";
import SameSeriesGames from "../../components/SameSeriesGames/SameSeriesGames";

import {HOME_ROUTE} from "../../utils/consts";
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
            <div className={styles.notFound}>
                <Message text="Oops, something go wrong..."/>
                <NavLink
                    to={HOME_ROUTE}
                    className={styles.notFound__link}
                >
                    Back to main page
                </NavLink>
            </div>
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
