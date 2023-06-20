import React, {useState} from "react";

import styles from "./GameHead.module.scss";

import Trailer from "../Trailer/Trailer";
import Button from "../UI/Button/Button";
import GameHeadSkeleton from "../UI/GameHeadSkeleton/GameHeadSkeleton";

import {GameQueryResult} from "../../types/types";

import {dateFormatting} from "../../utils/helpers";
import {useAddGameToLibraryMutation, useAddGameToWishlistMutation} from "../../API/igdbAPI";

interface GameHeadProps {
    game: GameQueryResult;
    isLoading: boolean;
    setIsError: (isError: boolean) => void;
}

const GameHead: React.FC<GameHeadProps> = ({game, isLoading, setIsError}) => {
    const [addToLibrary, {isLoading: isAddToLibraryLoading}] = useAddGameToLibraryMutation();
    const [addToWishlist, {isLoading: isAddToWishlistLoading}] = useAddGameToWishlistMutation();
    const [serverError, setServerError] = useState<string>("");

    const addToLibraryHandler = async () => {
      const response = await addToLibrary({
          id: game.id,
          slug: game.slug,
          name: game.name,
          released: game.released,
          background_image: game.background_image,
          metacritic: game.metacritic,
          genres: game.genres,
          parent_platforms: game.platforms,
      }).unwrap().catch((err)=>err);

      if (response?.data?.message) {
          setServerError(response.data.message);
      }
    };

    const addToWishlistHandler = async () => {
        const response = await addToWishlist({
            id: game.id,
            slug: game.slug,
            name: game.name,
            released: game.released,
            background_image: game.background_image,
            metacritic: game.metacritic,
            genres: game.genres,
            parent_platforms: game.platforms,
        }).unwrap().catch((err)=>err);

        if (response?.data?.message) {
            setServerError(response.data.message);
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
                        <Button title="Add to library" onClick={addToLibraryHandler}/>
                        <Button title="Add to wishlist" onClick={addToWishlistHandler}/>
                    </div>
                    {/*где-то тут ошибку впихнуть*/}
                    {/*если игра уже добавлена - кнопки удаления*/}
                </div>
                <Trailer
                    gameId={game.id}
                    setIsError={setIsError}
                />
            </div>
    );
};

export default GameHead;
