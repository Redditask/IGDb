import React from "react";

import styles from "./GameDetails.module.scss";

import MetacriticScore from "../UI/MetacriticScore/MetacriticScore";
import Link from "../UI/Link/Link";
import LabelRow from "../UI/LabelRow/LabelRow";

import {GameQueryResult} from "../../types/types";

import {developersToLabels, platformsToLabels} from "../../utils/helpers";

interface GameDetailsProps {
    game: GameQueryResult;
}

const GameDetails: React.FC<GameDetailsProps> = ({game}) => {

    return (
        <div className={styles.details}>
            <h1>Details about game</h1>
            <div className={styles.detail}>
                <LabelRow
                    labels={developersToLabels(game.developers)}
                    title="Developers"
                />
            </div>
            <div className={styles.detail}>
               <LabelRow
                   labels={platformsToLabels(game.platforms)}
                   title="Platforms"
               />
            </div>
            <LabelRow labels={game.genres} title="Genres"/>
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
