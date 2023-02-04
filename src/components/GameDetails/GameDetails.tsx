import React from "react";

import styles from "./GameDetails.module.scss";

import MetacriticScore from "../UI/MetacriticScore/MetacriticScore";

import {ResponseWithGame} from "../../types/types";
import Link from "../UI/Link/Link";

interface GameDetailsProps {
    game: ResponseWithGame;
}

const GameDetails: React.FC<GameDetailsProps> = ({game}) => {

    return (
        <div className={styles.GameDetails}>
            <h1>Details about game</h1>
            <div className={styles.GameDetail}>
                <p>Developers: </p>
                <div className={styles.GameDetail__info}>
                    {game.developers.map((developer, index) => {
                            return index === game.developers.length - 1
                                ? <p key={developer.name}>{developer.name}</p>
                                : <p key={developer.name}>{developer.name}, </p>
                        }
                    )}
                </div>
            </div>
            <div className={styles.GameDetail}>
                <p>Platforms: </p>
                <div className={styles.GameDetail__info}>
                    {game.platforms.map((platform, index) => {
                            return index === game.platforms.length - 1
                                ? <p key={platform.platform.name}>{platform.platform.name}</p>
                                : <p key={platform.platform.name}>{platform.platform.name}, </p>
                        }
                    )}
                </div>
            </div>
            <div className={styles.GameDetail}>
                <p>Metacritic: </p>
                <MetacriticScore score={game.metacritic}/>
            </div>
            <div className={styles.GameDetail}>
                <p>Links: </p>
                <Link
                    name={"Metacritic"}
                    link={game.metacritic_url}
                />
                <Link
                    name={"Reddit"}
                    link={game.reddit_url}
                />
                <Link
                    name={"Game Website"}
                    link={game.website}
                />
            </div>
        </div>
    );
};

export default GameDetails;
