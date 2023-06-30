import React, {useState} from "react";

import styles from "./GameHead.module.scss";

import {
    useAddGameToLibraryMutation,
    useAddGameToWishlistMutation,
    useCheckIsAddedQuery,
    useRemoveFromLibraryMutation,
    useRemoveFromWishlistMutation
} from "../../API/igdbAPI";

import {useAppSelector} from "../../hooks";
import {selectIsAuth} from "../../store/selectors";

import Trailer from "../Trailer/Trailer";
import Button from "../UI/Button/Button";
import GameHeadSkeleton from "../UI/GameHeadSkeleton/GameHeadSkeleton";

import {GameQueryResult} from "../../types/types";

import {dateFormatting, initialIsAddedState} from "../../utils/helpers";

interface GameHeadProps {
    game: GameQueryResult;
    isLoading: boolean;
    setIsError: (isError: boolean) => void;
}

const GameHead: React.FC<GameHeadProps> = ({game, isLoading, setIsError}) => {
    const [addToLibrary, {isLoading: isAddToLibraryLoading}] = useAddGameToLibraryMutation();
    const [addToWishlist, {isLoading: isAddToWishlistLoading}] = useAddGameToWishlistMutation();
    const [removeFromLibrary, {isLoading: isRemoveFromLibraryLoading}] = useRemoveFromLibraryMutation();
    const [removeFromWishlist, {isLoading: isRemoveFromWishlistLoading}] = useRemoveFromWishlistMutation();
    const [serverError, setServerError] = useState<string>("");

    const isAuth: boolean = useAppSelector(selectIsAuth);

    const {
        data: isAdded = initialIsAddedState,
        isLoading: isChecked,
        refetch
    } = useCheckIsAddedQuery({slug: game.slug}, {skip: !game.slug});

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

        if (response?.data?.message) {
            setServerError(response.data.message);
        }else {
            refetch();
        }
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

        if (response?.data?.message) {
            setServerError(response.data.message);
        }else {
            refetch();
        }
    };

    const removeFromLibraryHandler = async (): Promise<void> => {
        const response = await removeFromLibrary({
            slug: game.slug
        }).unwrap().catch((err) => err);

        if (response?.data?.message) {
            setServerError(response.data.message);
        }else {
            refetch();
        }
    };

    const removeFromWishlistHandler = async (): Promise<void> => {
        const response = await removeFromWishlist({
            slug: game.slug
        }).unwrap().catch((err) => err);

        if (response?.data?.message) {
            setServerError(response.data.message);
        }else {
            refetch();
        }
    };

    return (
        isLoading
            ?
            <GameHeadSkeleton/>
            :
            <div className={styles.gameHead}>
                <div className={styles.textSide}>
                    <h2>{dateFormatting(game.released)}</h2>
                    <h1 className={styles.textSide__title}>{game.name}</h1>
                    <div className={styles.textSide__buttons}>
                        {
                            isAdded.library
                                ?
                                <Button title="Remove from library" onClick={removeFromLibraryHandler} disabled={!isAuth}/>
                                :
                                <Button title="Add to library" onClick={addToLibraryHandler} disabled={!isAuth}/>
                        }
                        {
                            isAdded.wishlist
                                ?
                                <Button title="Remove from wishlist" onClick={removeFromWishlistHandler} disabled={!isAuth}/>
                                :
                                <Button title="Add to wishlist" onClick={addToWishlistHandler} disabled={!isAuth}/>
                        }
                    </div>
                    {
                        !isAuth
                            ?
                            <p className={styles.errorMessage}>You must be logged in</p>
                            :
                            <p className={styles.errorMessage}>{serverError}</p>
                    }
                </div>
                <Trailer
                    gameId={game.id}
                    setIsError={setIsError}
                />
            </div>
    );
};

export default GameHead;
