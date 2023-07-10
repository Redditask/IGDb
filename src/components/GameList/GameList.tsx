import React, {lazy, Suspense} from "react";

import styles from "./GameList.module.scss";

import {IGameCard} from "../../types/data";

import RegularLoader from "../UI/RegularLoader/RegularLoader";
const GameCard = lazy(()=> import("../GameCard/GameCard"));

interface BodyProps {
    games: IGameCard[];
    isLimit: boolean;
    isEmpty: boolean;
}

const GameList: React.FC<BodyProps> = ({games, isLimit, isEmpty}) => {

    return (
        <div className={styles.container}>
            {
                isEmpty
                    ?
                    <h1 className={styles.errorMessage}>No games</h1>
                    :
                    <>
                        <div className={styles.gameList}>
                            {
                                games.map((game: IGameCard) =>
                                        game.background_image
                                        &&
                                        <Suspense key={game.id} fallback={null}>
                                            <GameCard gameCard={game}/>
                                        </Suspense>
                                )
                            }
                        </div>
                        <div className={styles.loader}>
                            {!isLimit && <RegularLoader/>}
                        </div>
                    </>
            }
        </div>
    );
};

export default GameList;
