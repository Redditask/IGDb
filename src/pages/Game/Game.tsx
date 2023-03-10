import React, {lazy, Suspense, useEffect, useState} from "react";

import {useGetGameDetailsQuery,} from "../../API/rawgApi";

import {useParams} from "react-router-dom";

import styles from "./Game.module.scss";

import {initialGameState} from "../../utils/helpers";

import GameDetails from "../../components/GameDetails/GameDetails";
import Screenshots from "../../components/Screenshots/Screenshots";
import ImageModal from "../../components/UI/ImageModal/ImageModal";
import GameHead from "../../components/GameHead/GameHead";
import GamePageError from "../../components/UI/GamePageError/GamePageError";
import HowLongToBeat from "../../components/HowLongToBeat/HowLongToBeat";
import GameDescription from "../../components/GameDescription/GameDescription";
const AdditionalContent = lazy(()=>import("../../components/AdditionalContent/AdditionalContent"));

const Game: React.FC = () => {
    const [imageURL, setImageURL] = useState<string>("");

    const {slug} = useParams();

    const {data: game = initialGameState, error: gameError, isLoading} = useGetGameDetailsQuery({slug}, {skip: !slug});

    useEffect(() =>
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        }), [slug, game]);

    return (
        gameError
            ?
            <GamePageError/>
            :
            <div className={styles.container}>
                <div
                    className={styles.background}
                    style={{backgroundImage: `url(${game.background_image})`}}
                >
                    <div className={styles.wrapper}>
                        <div className={styles.game}>
                            <GameHead
                                game={game}
                                isLoading={isLoading}
                            />
                            <div className={styles.game__body}>
                                <div className={styles.game__info}>
                                    <GameDetails
                                        game={game}
                                        isLoading={isLoading}
                                    />
                                    <Screenshots
                                        setImageURL={setImageURL}
                                        gameId={game.id}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <GameDescription
                    description={game.description_raw}
                    isLoading={isLoading}
                />
                <div className={styles.game__about}>
                    <HowLongToBeat
                        gameName={game.name}
                        isLoading={isLoading}
                    />
                </div>
                <Suspense fallback={null}>
                    <AdditionalContent gameId={game.id}/>
                </Suspense>
                <ImageModal
                    imageURL={imageURL}
                    setImageURL={setImageURL}
                />
            </div>
    );
};

export default Game;
