import React, {lazy, Suspense, useEffect, useRef, useState} from "react";

import {useGetGameDetailsQuery,} from "../../API/rawgApi";
import {useCheckIsAddedQuery} from "../../API/igdbAPI";

import {useParams} from "react-router-dom";

import styles from "./Game.module.scss";

import {useAppDispatch} from "../../hooks";
import {setIsLoading} from "../../store/userSlice";

import {NotificationRef} from "../../types/types";

import {initialGameState, initialIsAddedState} from "../../utils/helpers/initialStates";

import GameLabels from "../../components/GameLabels/GameLabels";
import Screenshots from "../../components/Screenshots/Screenshots";
import ImageModal from "../../components/UI/ImageModal/ImageModal";
import GameHeader from "../../components/GameHeader/GameHeader";
import ErrorPage from "../../components/UI/ErrorPage/ErrorPage";
import GameDescription from "../../components/GameDescription/GameDescription";
import Notification from "../../components/UI/Notification/Notification";
import ScrollUpButton from "../../components/UI/ScrollUpButton/ScrollUpButton";
const AdditionalContent = lazy(()=>import("../../components/AdditionalContent/AdditionalContent"));

const Game: React.FC = () => {
    const [imageURL, setImageURL] = useState<string>("");
    const [isError, setIsError] = useState<boolean>(false);
    const [actionResponse, setActionResponse] = useState<string>("");
    const [showScrollUp, setShowScrollUp] = useState<boolean>(false);

    const {slug} = useParams();
    const notificationRef = useRef<NotificationRef>(null);
    const dispatch = useAppDispatch();

    const {
        data: game = initialGameState,
        error: gameError,
        isLoading
    } = useGetGameDetailsQuery({slug}, {skip: !slug});

    const {
        data: addedStatus = initialIsAddedState,
        isLoading: isUpdate,
        refetch
    } = useCheckIsAddedQuery({slug}, {skip: !slug});

    const idDefinition = (): string => showScrollUp ? styles.show : styles.hide;

    const scrollHandler = (): void => {
        if(window.scrollY > 1300) {
            setShowScrollUp(true);
        }else {
            setShowScrollUp(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", scrollHandler);

        return function (): void {
            window.removeEventListener("scroll", scrollHandler);
        }
    }, []);

    useEffect((): void => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        })
    }, [slug, game]);

    useEffect((): void => {
        if (gameError) setIsError(true);
    }, [gameError]);

    useEffect((): void => {
        dispatch(setIsLoading(isLoading || isUpdate));
    }, [isLoading, isUpdate]);

    return (
        isError
            ?
            <ErrorPage/>
            :
            <div className={styles.container}>
                <div
                    className={styles.background}
                    style={{backgroundImage: `url(${game.background_image})`}}
                >
                    <div className={styles.wrapper}>
                        <div className={styles.game}>
                            <GameHeader
                                game={game}
                                isLoading={isLoading}
                                setIsError={setIsError}
                                addedStatus={addedStatus}
                                refetch={refetch}
                                setActionResponse={setActionResponse}
                                ref={notificationRef}
                            />
                            <div className={styles.game__body}>
                                <div className={styles.game__info}>
                                    <GameLabels
                                        game={game}
                                        isLoading={isLoading || isUpdate}
                                    />
                                    <Screenshots
                                        setImageURL={setImageURL}
                                        gameId={game.id}
                                        setIsError={setIsError}
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
                <Suspense fallback={null}>
                    <AdditionalContent
                        gameId={game.id}
                        setIsError={setIsError}
                    />
                </Suspense>
                <ImageModal
                    imageURL={imageURL}
                    setImageURL={setImageURL}
                />
                <Notification
                    ref={notificationRef}
                    message={actionResponse}
                />
                <div className={styles.scrollUp}>
                    <div
                        className={styles.scrollUp__button}
                        id={idDefinition()}
                    >
                        <ScrollUpButton showScrollUp={showScrollUp}/>
                    </div>
                </div>
            </div>
    );
};

export default Game;
