import React from "react";

import styles from "./GameDetails.module.scss";

import MetacriticScore from "../UI/MetacriticScore/MetacriticScore";

import {GameQueryResult} from "../../types/types";
import Link from "../UI/Link/Link";

interface GameDetailsProps {
    game: GameQueryResult;
}

const GameDetails: React.FC<GameDetailsProps> = ({game}) => {

    return (
        <div className={styles.details}>
            <h1>Details about game</h1>
            <div className={styles.detail}>
                <p>Developers: </p>
                <div className={styles.detail__info}>
                    {game.developers.map((developer, index) => {
                            return index === game.developers.length - 1
                                ? <p key={developer.name}>{developer.name}</p>
                                : <p key={developer.name}>{developer.name}, </p>
                        }
                    )}
                </div>
            </div>
            <div className={styles.detail}>
                <p>Platforms: </p>
                <div className={styles.detail__info}>
                    {game.platforms.map((platform, index) => {
                            return index === game.platforms.length - 1
                                ? <p key={platform.platform.name}>{platform.platform.name}</p>
                                : <p key={platform.platform.name}>{platform.platform.name}, </p>
                        }
                    )}
                </div>
            </div>
            <MetacriticScore score={game.metacritic}/>
            <div className={styles.detail}>
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
