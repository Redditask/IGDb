import React, {useState} from "react";

import {useGetGamesQuery} from "../../API/rawgApi";

import styles from "./Library.module.scss";

import GameList from "../../components/GameList/GameList";
import ErrorPage from "../../components/UI/ErrorPage/ErrorPage";

import {IGameCard} from "../../types/types";

import {initialGamesState} from "../../utils/helpers";
import Loader from "../../components/UI/Loader/Loader";

const Library: React.FC = () => {
    const [isLibrary, setIsLibrary] = useState<boolean>(true);

    //заглушка (будет новый запрос на свой бекенд)
    const {
        data: libraryResponse = initialGamesState,
        error: libraryError,
        isLoading: isLibraryLoading
    } = useGetGamesQuery({
        page: 1,
        metacritic: "",
        dates: "",
        genres: "",
        platforms: ""
    });

    //заглушка (будет новый запрос на свой бекенд)
    const {
        data: wishlistResponse = initialGamesState,
        error: wishlistError,
        isLoading: isWishlistLoading
    } = useGetGamesQuery({
        page: 2,
        metacritic: "",
        dates: "",
        genres: "",
        platforms: ""
    });

    const gameListDefinition = (): IGameCard[] => isLibrary ? libraryResponse.results : wishlistResponse.results;

    const libraryHandler = (): void => setIsLibrary(!isLibrary);

    const buttonStylesDefinition = (isActive: boolean): string =>
        isActive ? styles.library__activeButton : styles.library__defaultButton;

    return (
        (libraryError || wishlistError)
            ?
            <ErrorPage/>
            :
            <div className={styles.library}>
                <div className={styles.library__buttons}>
                    <h3
                        className={buttonStylesDefinition(isLibrary)}
                        onClick={libraryHandler}
                    >
                        My games
                    </h3>
                    <h3
                        className={buttonStylesDefinition(!isLibrary)}
                        onClick={libraryHandler}
                    >
                        Wishlist
                    </h3>
                </div>
                {
                    (isLibraryLoading || isWishlistLoading)
                        ?
                        <div className={styles.loaderArea}>
                            <Loader/>
                        </div>
                        :
                        <GameList
                            games={gameListDefinition()}
                            isLimit={true}
                            isEmpty={false}
                        />
                }
            </div>
    );
};

export default Library;
