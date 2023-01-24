import React from "react";

import styles from "./GameList.module.scss";

import GameCard from "../GameCard/GameCard";
import Loader from "../UI/Loader/Loader";
import Message from "../UI/ErrorMesage/Message";

import {Game} from "../../types/types";

interface BodyProps {
    games: Game[];
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
                                        ? <GameCard game={game} key={game.id}/>
                                        : null
                            )
                        }
                    </div>
                    <div className={styles.loader}>
                        {isLimit ? null : <Loader/>}
                    </div>
                </>
            }
        </div>
    );
};

export default GameList;
