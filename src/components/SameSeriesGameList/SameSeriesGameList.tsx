import React, {lazy, Suspense} from "react";

import styles from "./SameSeriesGameList.module.scss";

import {IGame} from "../../types/types";

const GameCard = lazy(()=>import("../GameCard/GameCard"));

interface SameSeriesGameListProps {
    games: IGame [];
}

const SameSeriesGameList: React.FC<SameSeriesGameListProps> = ({games}) => {

    return (
        <>
            {
                games.length &&
                <div className={styles.container}>
                    <h1>Same series games</h1>
                    <div className={styles.sameSeriesGameList}>
                        {games.map(game =>
                            game.background_image
                            &&
                            <Suspense key={game.id} fallback={null}>
                                <GameCard game={game}/>
                            </Suspense>
                        )}
                    </div>
                </div>
            }
        </>
    );
};

export default SameSeriesGameList;
