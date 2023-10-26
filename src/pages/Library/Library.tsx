import React, {useEffect, useState} from "react";

import {useGetAccountGamesQuery} from "../../API/igdbAPI";

import styles from "./Library.module.scss";

import RegularLoader from "../../components/UI/RegularLoader/RegularLoader";
import GameList from "../../components/GameList/GameList";

import {setIsError, setIsFetching} from "../../store/userSlice";

import {IGameCard} from "../../types/data";

import {initialAccountGamesState} from "../../utils/helpers/initialStates";
import {useAppDispatch} from "../../hooks";
import ScrollUpButton from "../../components/UI/ScrollUpButton/ScrollUpButton";

const Library = () => {
    const [showScrollUp, setShowScrollUp] = useState<boolean>(false);
    const [isLibrary, setIsLibrary] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    const {
        data: games = initialAccountGamesState,
        isError,
        isFetching,
        refetch
    } = useGetAccountGamesQuery({
        refetchOnMountOrArgChange: true,
    });

    const gameListDefinition = (): IGameCard[] => isLibrary ? games.library : games.wishlist;

    const buttonStylesDefinition = (isActive: boolean): string =>
        isActive ? styles.library__activeButton : styles.library__defaultButton;

    const idDefinition = (): string => showScrollUp ? styles.show : styles.hide;

    const libraryHandler = (): void => setIsLibrary(true);

    const wishlistHandler = (): void => setIsLibrary(false);

    const scrollHandler = (): void => {
        if (window.scrollY > 1300) {
            setShowScrollUp(true);
        } else {
            setShowScrollUp(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", scrollHandler);

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });

        return function (): void {
            window.removeEventListener("scroll", scrollHandler);
        }
    }, []);

    useEffect((): void => {
        refetch();
    }, []);

    useEffect((): void => {
        dispatch(setIsError(isError));
    }, [isError]);

    useEffect((): void => {
        setIsLibrary(!!games.library.length);
        dispatch(setIsFetching(isFetching));
    }, [isFetching]);

    return (
        <div className={styles.container}>
            <div className={styles.library__buttons}>
                {
                    !!games.library.length
                    &&
                    <h3
                        className={buttonStylesDefinition(isLibrary)}
                        onClick={libraryHandler}
                    >
                        Library
                    </h3>
                }
                {
                    !!games.wishlist.length
                    &&
                    <h3
                        className={buttonStylesDefinition(!isLibrary)}
                        onClick={wishlistHandler}
                    >
                        Wishlist
                    </h3>
                }
            </div>
            <div className={styles.library}>
                {
                    isFetching
                        ?
                        <div className={styles.loaderArea}>
                            <RegularLoader/>
                        </div>
                        :
                        <>
                            <GameList
                                games={gameListDefinition()}
                                isLimit={true}
                                isEmpty={false}
                            />
                            {
                                (!games.wishlist.length && !games.library.length)
                                &&
                                <h1 className={styles.library__emptyLists}>
                                    No games was added to the lists
                                </h1>
                            }
                        </>
                }
            </div>
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

export default Library;
