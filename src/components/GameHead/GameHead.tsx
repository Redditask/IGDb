import React from "react";

import styles from "./GameHead.module.scss";

import Trailer from "../Trailer/Trailer";
import Button from "../UI/Button/Button";
import GameHeadSkeleton from "../UI/GameHeadSkeleton/GameHeadSkeleton";

import {GameQueryResult} from "../../types/types";

import {dateFormatting} from "../../utils/helpers";

interface GameHeadProps {
    game: GameQueryResult;
    isLoading: boolean;
    setIsError: (isError: boolean) => void;
}

const GameHead: React.FC<GameHeadProps> = ({game, isLoading, setIsError}) => {

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
                        {/* заглушки */}
                        <Button title="Add to wishlist" onClick={() => ""}/>
                        <Button title="Add to my games" onClick={() => ""}/>
                    </div>
                </div>
                <Trailer
                    gameId={game.id}
                    setIsError={setIsError}
                />
            </div>
    );
};

export default GameHead;
