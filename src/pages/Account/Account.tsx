import React, {useEffect, useState} from "react";

import {useGetAccountGamesQuery} from "../../API/igdbAPI";

import styles from "./Account.module.scss";

import GameList from "../../components/GameList/GameList";
import ErrorPage from "../../components/UI/ErrorPage/ErrorPage";
import Loader from "../../components/UI/Loader/Loader";

import {IGameCard} from "../../types/types";

import {initialAccountGamesState} from "../../utils/helpers";

const Account: React.FC = () => {
    const [isLibrary, setIsLibrary] = useState<boolean>(true);

    const {
        data: games = initialAccountGamesState,
        error: isError,
        isLoading: isLoading,
        refetch,
    } = useGetAccountGamesQuery({
        refetchOnMountOrArgChange: true,
    });

    const gameListDefinition = (): IGameCard[] => isLibrary ? games.library : games.wishlist;

    const libraryHandler = (): void => setIsLibrary(true);

    const wishlistHandler = ():void => setIsLibrary(false);

    const buttonStylesDefinition = (isActive: boolean): string =>
        isActive ? styles.account__activeButton : styles.account__defaultButton;

    useEffect((): void=>{
        refetch();
    }, []);

    return (
        isError
            ?
            <ErrorPage/>
            :
            <div className={styles.account}>
                <div className={styles.account__buttons}>
                    {
                        (games.library.length > 0)
                        &&
                        <h3
                            className={buttonStylesDefinition(isLibrary)}
                            onClick={libraryHandler}
                        >
                            My games
                        </h3>
                    }
                    {
                        (games.wishlist.length > 0)
                        &&
                        <h3
                            className={buttonStylesDefinition(!isLibrary)}
                            onClick={wishlistHandler}
                        >
                            Wishlist
                        </h3>
                    }
                </div>
                <div className={styles.account__games}>
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
            </div>
    );
};

export default Account;
