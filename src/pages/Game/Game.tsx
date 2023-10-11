import React, {lazy, Suspense, useEffect, useRef, useState} from "react";

import {useGetGameDetailsQuery,} from "../../API/rawgApi";
import {useCheckIsAddedQuery} from "../../API/igdbAPI";

import {useParams} from "react-router-dom";

import styles from "./Game.module.scss";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {setIsError, setIsFetching} from "../../store/userSlice";
import {selectIsError} from "../../store/selectors";

import {NotificationRef} from "../../types/data";

import {initialGameState, initialIsAddedState} from "../../utils/helpers/initialStates";

import GameLabels from "../../components/GameLabels/GameLabels";
import Screenshots from "../../components/Screenshots/Screenshots";
import ImageModal from "../../components/UI/ImageModal/ImageModal";
import GameHeader from "../../components/GameHeader/GameHeader";
import Error from "../Error/Error";
import GameDescription from "../../components/GameDescription/GameDescription";
import Notification from "../../components/UI/Notification/Notification";
import ScrollUpButton from "../../components/UI/ScrollUpButton/ScrollUpButton";
import GameReviews from "../../components/GameReviews/GameReviews";
const AdditionalContent = lazy(()=>import("../../components/AdditionalContent/AdditionalContent"));

const Game: React.FC = () => {
    const [imageURL, setImageURL] = useState<string>("");
    const [showScrollUp, setShowScrollUp] = useState<boolean>(false);

    const {slug} = useParams();
    const notificationRef = useRef<NotificationRef>(null);
    const dispatch = useAppDispatch();
    const isError: boolean = useAppSelector(selectIsError);

    const {
        data: game = initialGameState,
        isError: isGameError,
        isFetching
    } = useGetGameDetailsQuery({slug}, {skip: !slug});

    const {
        data: addedStatus = initialIsAddedState,
        isFetching: isUpdating,
        refetch
    } = useCheckIsAddedQuery({slug}, {skip: !slug});

    const idDefinition = (): string => showScrollUp ? styles.show : styles.hide;

    const scrollHandler = (): void => {
        if (window.scrollY > 1300) {
            setShowScrollUp(true);
        } else {
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
        });
    }, [slug, game]);

    useEffect((): void => {
        dispatch(setIsError(isGameError));
    }, [isGameError]);

    useEffect((): void => {
        dispatch(setIsFetching(isFetching || isUpdating));
    }, [isFetching, isUpdating]);

    return (
        isError
            ?
            <Error/>
            :
            <>
                <div
                    className={styles.background__header}
                    style={{backgroundImage: `url(${game.background_image})`}}
                >
                    <div className={styles.wrapper__header}>
                        <div className={styles.game}>
                            <GameHeader
                                game={game}
                                isLoading={isFetching}
                                addedStatus={addedStatus}
                                refetch={refetch}
                                ref={notificationRef}
                            />
                            <div className={styles.game__body}>
                                <div className={styles.game__info}>
                                    <GameLabels
                                        game={game}
                                        isLoading={isFetching}
                                    />
                                    <Screenshots
                                        setImageURL={setImageURL}
                                        gameId={game.id}
                                        isLoading={isFetching}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <GameDescription
                    description={game.description_raw}
                    isLoading={isFetching}
                />
                <div
                    className={styles.background__footer}
                    style={{backgroundImage: `url(${game.background_image_additional})`}}
                >
                    <div className={styles.wrapper__footer}>
                        <Suspense fallback={null}>
                            <AdditionalContent
                                gameId={game.id}
                                isLoading={isFetching}
                            />
                        </Suspense>
                    </div>
                </div>
                <Suspense fallback={null}>
                    <GameReviews
                        slug={slug}
                        isLoading={isFetching}
                        ref={notificationRef}
                    />
                </Suspense>
                <ImageModal
                    imageURL={imageURL}
                    setImageURL={setImageURL}
                />
                <Notification
                    ref={notificationRef}
                />
                <div className={styles.scrollUp}>
                    <div
                        className={styles.scrollUp__button}
                        id={idDefinition()}
                    >
                        <ScrollUpButton showScrollUp={showScrollUp}/>
                    </div>
                </div>
            </>
    );
};

export default Game;
