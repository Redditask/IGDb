import React from "react";

import styles from "./GameLabels.module.scss";

import MetacriticScore from "../UI/MetacriticScore/MetacriticScore";
import Link from "../UI/Link/Link";
import Labels from "../UI/Labels/Labels";
import GameLabelsSkeleton from "../Skeletons/GameLabelsSkeleton/GameLabelsSkeleton";

import {developersToLabelsConvert, platformsToLabelsConvert} from "../../utils/helpers/converters";
import {isHaveLinks} from "../../utils/helpers/dataProcessing";
import {GameQueryResult} from "../../types/queries";

interface GameLabelsProps {
    game: GameQueryResult;
    isLoading: boolean;
}

const GameLabels: React.FC<GameLabelsProps> = ({game, isLoading}) => {

    return (
        isLoading
            ?
            <GameLabelsSkeleton/>
            :
            <div className={styles.labels}>
                <h2>Details about game</h2>
                <Labels
                    labels={developersToLabelsConvert(game.developers)}
                    title="Developers"
                />
                <Labels
                    labels={platformsToLabelsConvert(game.platforms)}
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
                    <div className={styles.label}>
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

export default GameLabels;
