import React, {useEffect, useState} from "react";

import {useGetAccountGamesQuery} from "../../API/igdbAPI";

import styles from "./AccountGames.module.scss";

import RegularLoader from "../UI/RegularLoader/RegularLoader";
import GameList from "../GameList/GameList";

import {setIsError, setIsFetching} from "../../store/userSlice";

import {IGameCard} from "../../types/data";

import {initialAccountGamesState} from "../../utils/helpers/initialStates";
import {useAppDispatch} from "../../hooks";

const AccountGames: React.FC = () => {
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
        isActive ? styles.accountGames__activeButton : styles.accountGames__defaultButton;

    const libraryHandler = (): void => setIsLibrary(true);

    const wishlistHandler = ():void => setIsLibrary(false);

    useEffect((): void=> {
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
        <>
            <div className={styles.accountGames__buttons}>
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
            <div className={styles.accountGames}>
                {
                    isFetching
                        ?
                        <div className={styles.loaderArea}>
                            <RegularLoader/>
                        </div>
                        :
                        <GameList
                            games={gameListDefinition()}
                            isLimit={true}
                            isEmpty={false}
                        />
                }
            </div>
        </>
    );
};

export default AccountGames;
