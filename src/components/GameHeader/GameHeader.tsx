import React, {forwardRef, useEffect, useState} from "react";

import styles from "./GameHeader.module.scss";

import {
    useAddGameToLibraryMutation,
    useAddGameToWishlistMutation,
    useRemoveFromLibraryMutation,
    useRemoveFromWishlistMutation
} from "../../API/igdbAPI";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {setIsFetching} from "../../store/userSlice";
import {selectIsAuth} from "../../store/selectors";

import Trailer from "../Trailer/Trailer";
import Button from "../UI/Button/Button";
import GameHeadSkeleton from "../Skeletons/GameHeadSkeleton/GameHeadSkeleton";

import {NotificationRef} from "../../types/data";

import {dateFormatting} from "../../utils/helpers/dates";

import {CheckIsAddedQueryResult, GameQueryResult} from "../../types/queries/results";

interface GameHeaderProps {
    game: GameQueryResult;
    isLoading: boolean;
    addedStatus: CheckIsAddedQueryResult;
    refetch: () => void;
}

const GameHeader = forwardRef<NotificationRef, GameHeaderProps>(({
        game,
        isLoading,
        addedStatus,
        refetch
    }, ref) => {

    const [addToLibrary,{isLoading: isLoadingAddToLibrary}] = useAddGameToLibraryMutation();
    const [addToWishlist,{isLoading: isLoadingAddToWishlist}] = useAddGameToWishlistMutation();
    const [removeFromLibrary,{isLoading: isLoadingRemoveFromLibrary}] = useRemoveFromLibraryMutation();
    const [removeFromWishlist,{isLoading: isLoadingRemoveFromWishlist}] = useRemoveFromWishlistMutation();
    const [serverError, setServerError] = useState<string>("");

    const dispatch = useAppDispatch();
    const isAuth: boolean = useAppSelector(selectIsAuth);

    const showNotification = (message: string): void => {
        refetch();
        if (ref && "current" in ref && ref.current) ref.current.show(message);
    };

    const addToLibraryHandler = async (): Promise<void> => {
        const response = await addToLibrary({
            id: game.id,
            slug: game.slug,
            name: game.name,
            released: game.released,
            background_image: game.background_image,
            metacritic: game.metacritic,
            genres: game.genres,
            parent_platforms: game.platforms,
        }).unwrap().catch((err) => err);

        !!response?.data?.message
            ? setServerError(response.data.message)
            : showNotification("Game was added to library");
    };

    const addToWishlistHandler = async (): Promise<void> => {
        const response = await addToWishlist({
            id: game.id,
            slug: game.slug,
            name: game.name,
            released: game.released,
            background_image: game.background_image,
            metacritic: game.metacritic,
            genres: game.genres,
            parent_platforms: game.platforms,
        }).unwrap().catch((err) => err);

        !!response?.data?.message
            ? setServerError(response.data.message)
            : showNotification("Game was added to wishlist");
    };

    const removeFromLibraryHandler = async (): Promise<void> => {
        const response = await removeFromLibrary({
            slug: game.slug
        }).unwrap().catch((err) => err);

        !!response?.data?.message
            ? setServerError(response.data.message)
            : showNotification("Game was removed from library");
    };

    const removeFromWishlistHandler = async (): Promise<void> => {
        const response = await removeFromWishlist({
            slug: game.slug
        }).unwrap().catch((err) => err);

        !!response?.data?.message
            ? setServerError(response.data.message)
            : showNotification("Game was removed from wishlist");
    };

    useEffect((): void => {
        dispatch(setIsFetching(
            isLoadingAddToLibrary
            || isLoadingRemoveFromLibrary
            || isLoadingAddToWishlist
            || isLoadingRemoveFromWishlist
        ));
    }, [
        isLoadingAddToLibrary,
        isLoadingRemoveFromLibrary,
        isLoadingAddToWishlist,
        isLoadingRemoveFromWishlist
    ]);

    return (
        isLoading
            ?
            <GameHeadSkeleton/>
            :
            <div className={styles.container}>
                <div className={styles.gameHeader}>
                    <h2>{dateFormatting(game.released)}</h2>
                    <h1 className={styles.gameHeader__title}>{game.name}</h1>
                    <div className={styles.gameHeader__buttons}>
                        {
                            addedStatus.library
                                ?
                                <Button
                                    title="Remove from library"
                                    onClick={removeFromLibraryHandler}
                                    disabled={!isAuth}
                                />
                                :
                                <Button
                                    title="Add to library"
                                    onClick={addToLibraryHandler}
                                    disabled={!isAuth}
                                />
                        }
                        {
                            addedStatus.wishlist
                                ?
                                <Button
                                    title="Remove from wishlist"
                                    onClick={removeFromWishlistHandler}
                                    disabled={!isAuth}
                                />
                                :
                                <Button
                                    title="Add to wishlist"
                                    onClick={addToWishlistHandler}
                                    disabled={!isAuth}
                                />
                        }

                    </div>
                    {
                        !isAuth
                            ? <p className={styles.gameHeader__errorMessage}>You must be logged in to add games</p>
                            : <p className={styles.gameHeader__errorMessage}>{serverError}</p>
                    }
                </div>
                <Trailer gameId={game.id}/>
            </div>
    );
});

export default GameHeader;
