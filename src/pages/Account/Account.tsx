import React, {useState} from "react";

import {useGetAccountGamesQuery} from "../../API/igdbAPI";

import styles from "./Account.module.scss";

import GameList from "../../components/GameList/GameList";
import ErrorPage from "../../components/UI/ErrorPage/ErrorPage";
import Loader from "../../components/UI/Loader/Loader";

import {initialAccountGamesState} from "../../utils/helpers";

const Account: React.FC = () => {
    const [isLibrary, setIsLibrary] = useState<boolean>(true);

    const {
        data: games = initialAccountGamesState,
        error: isError,
        isLoading: isLoading
    } = useGetAccountGamesQuery({});

    //здесь пофиксить типы
    const gameListDefinition = (): any[] => isLibrary ? games.library : games.wishlist;

    const libraryHandler = (): void => setIsLibrary(!isLibrary);

    const buttonStylesDefinition = (isActive: boolean): string =>
        isActive ? styles.account__activeButton : styles.account__defaultButton;

    return (
        (isError)
            ?
            <ErrorPage/>
            :
            <div className={styles.account}>
                <div className={styles.account__buttons}>
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
                    isLoading
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

export default Account;
