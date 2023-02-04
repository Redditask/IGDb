import React, {lazy, Suspense} from "react";

import styles from "./GameList.module.scss";

import {GameFromList} from "../../types/types";

import Loader from "../UI/Loader/Loader";
import Message from "../UI/Mesage/Message";
const GameCard = lazy(()=> import("../GameCard/GameCard"));

interface BodyProps {
    games: GameFromList[];
    isLimit: boolean;
    isEmpty: boolean;
}

const GameList: React.FC<BodyProps> = ({games, isLimit, isEmpty}) => {

    return (
        <div className={styles.container}>
            {
                isEmpty
                    ?
                    <Message text="No games"/>
                    :
                    <>
                        <div className={styles.gameList}>
                            {
                                games.map(
                                    (game) =>
                                        game.background_image
                                        &&
                                        <Suspense key={game.id} fallback={null}> {/* loader is already below */}
                                            <GameCard game={game}/>
                                        </Suspense>
                                )
                            }
                        </div>
                        <div className={styles.loader}>
                            {!isLimit && <Loader/>}
                        </div>
                    </>
            }
        </div>
    );
};

export default GameList;
