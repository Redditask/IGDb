import React from "react";

import styles from "./GameDescription.module.scss";

import GameDescriptionSkeleton from "../Skeletons/GameDescriptionSkeleton/GameDescriptionSkeleton";

interface GameDescriptionProps {
    description: string;
    isLoadingPage: boolean;
}

const GameDescription: React.FC<GameDescriptionProps> = ({description, isLoadingPage}) => {

    return (
        <>
            {
                !!description
                &&
                (
                    isLoadingPage
                        ?
                        <GameDescriptionSkeleton/>
                        :
                        <div className={styles.description}>
                            <h2 className={styles.description__title}>About</h2>
                            <p className={styles.description__text}>{description}</p>
                        </div>
                )
            }
        </>
    );
};

export default GameDescription;
