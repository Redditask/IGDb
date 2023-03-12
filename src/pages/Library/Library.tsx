import React, {useState} from "react";

import {useGetGamesQuery} from "../../API/rawgApi";

import styles from "./Library.module.scss";

import GameList from "../../components/GameList/GameList";

import {IGameCard} from "../../types/types";

import {initialGamesState} from "../../utils/helpers";

const buttonStylesDefinition = (isActive: boolean) =>
    isActive ? styles.library__activeButton : styles.library__defaultButton;

const Library: React.FC = () => {
    const [isLibrary, setIsLibrary] = useState<boolean>(true);

    //заглушка (будет новый запрос на свой бекенд)
    const {data: libraryResponse = initialGamesState, error: libraryError} = useGetGamesQuery({
        page: 1,
        metacritic: "",
        dates: "",
        genres: "",
        platforms: ""
    });

    //заглушка (будет новый запрос на свой бекенд)
    const {data: wishlistResponse = initialGamesState, error: wishlistError} = useGetGamesQuery({
        page: 2,
        metacritic: "",
        dates: "",
        genres: "",
        platforms: ""
    });

    const gameListDefinition = (): IGameCard[] => isLibrary ? libraryResponse.results : wishlistResponse.results;

    const libraryHandler = (): void => setIsLibrary(true);

    const wishlistHandler = (): void => setIsLibrary(false);

    return (
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
                    onClick={wishlistHandler}
                >
                    Wishlist
                </h3>
            </div>
            <GameList
                games={gameListDefinition()}
                isLimit={true}
                isEmpty={false}
            />
        </div>
    );
};

export default Library;
