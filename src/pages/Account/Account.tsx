import React, {useEffect, useState} from "react";

import {useGetAccountGamesQuery} from "../../API/igdbAPI";

import styles from "./Account.module.scss";

import GameList from "../../components/GameList/GameList";
import Error from "../Error/Error";
import RegularLoader from "../../components/UI/RegularLoader/RegularLoader";

import {setIsFetching} from "../../store/userSlice";
import {useAppDispatch} from "../../hooks";

import {IGameCard} from "../../types/data";

import {initialAccountGamesState} from "../../utils/helpers/initialStates";

const Account: React.FC = () => {
    const [isLibrary, setIsLibrary] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    const {
        data: games = initialAccountGamesState,
        error: isError,
        isFetching,
        refetch
    } = useGetAccountGamesQuery({
        refetchOnMountOrArgChange: true,
    });

    const gameListDefinition = (): IGameCard[] => isLibrary ? games.library : games.wishlist;

    const buttonStylesDefinition = (isActive: boolean): string =>
        isActive ? styles.account__activeButton : styles.account__defaultButton;

    const libraryHandler = (): void => setIsLibrary(true);

    const wishlistHandler = ():void => setIsLibrary(false);

    useEffect((): void=> {
        refetch();
    }, []);

    useEffect((): void => {
        setIsLibrary(!!games.library.length);
        dispatch(setIsFetching(isFetching));
    }, [isFetching]);

    return (
        isError
            ?
            <Error/>
            :
            <div className={styles.account}>
                <div className={styles.account__buttons}>
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
                <div className={styles.account__games}>
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
            </div>
    );
};

export default Account;
