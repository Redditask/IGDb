import React, {useEffect, useState} from "react";

import {
    useGetGameDetailsQuery,
    useGetGameDLCQuery,
    useGetGameScreenshotsQuery,
    useGetGameTrailersQuery
} from "../../API/rawgApi";

import {useParams} from "react-router-dom";

import styles from "./Game.module.scss";

import GameDetails from "../../components/GameDetails/GameDetails";
import Screenshots from "../../components/UI/Screenshots/Screenshots";
import ImageModal from "../../components/UI/ImageModal/ImageModal";
import Message from "../../components/UI/Mesage/Message";

import {initialGameStateFromServer} from "../../utils/helpers";
import GameHead from "../../components/GameHead/GameHead";

const Game: React.FC = () => {
    const [imageURL, setImageURL] = useState<string>("");

    const {slug} = useParams();

    const {data: game = initialGameStateFromServer, error: gameError} = useGetGameDetailsQuery({slug}, {skip: !slug});
    const {data: screenshots, error: screenshotsError} = useGetGameScreenshotsQuery({id: game.id}, {skip: !game.id});
    const {data: dlc, error: dlcError} = useGetGameDLCQuery({id: game.id}, {skip: !game.id});
    const {data: trailers, error: trailersError} = useGetGameTrailersQuery({id: game.id}, {skip: !game.id});

    //console.log(dlc)

    useEffect(() => window.scrollTo(0, 0), []);

    const isError = (): boolean => !!(gameError || screenshotsError || dlcError || trailersError);

    return (
        isError()
            ?
            <Message text="Oops, something go wrong..."/>
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
