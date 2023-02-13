import React from "react";

import styles from "./GameDetails.module.scss";

import MetacriticScore from "../UI/MetacriticScore/MetacriticScore";
import Link from "../UI/Link/Link";
import Labels from "../UI/Labels/Labels";

import {GameQueryResult} from "../../types/types";

import {developersToLabels, isHaveLinks, platformsToLabels} from "../../utils/helpers";

interface GameDetailsProps {
    game: GameQueryResult;
}

const GameDetails: React.FC<GameDetailsProps> = ({game}) => {

    return (
        <div className={styles.details}>
            <h1>Details about game</h1>
            <Labels
                labels={developersToLabels(game.developers)}
                title="Developers"
            />
            <Labels
                labels={platformsToLabels(game.platforms)}
                title="Platforms"
            />
            <Labels
                labels={game.genres}
                title="Genres"
            />
            <MetacriticScore score={game.metacritic}/>
            {
                isHaveLinks(game)
                &&
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
            }
        </div>
    );
};

export default GameDetails;
