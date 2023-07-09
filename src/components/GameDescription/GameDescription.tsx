import React from "react";

import styles from "./GameDescription.module.scss";

import GameDescriptionSkeleton from "../Skeletons/GameDescriptionSkeleton/GameDescriptionSkeleton";

interface GameDescriptionProps {
    description: string;
    isLoading: boolean;
}

const GameDescription: React.FC<GameDescriptionProps> = ({description, isLoading}) => {

    return (
        <>
            {
                !!description
                &&
                (
                    isLoading
                        ?
                        <GameDescriptionSkeleton/>
                        :
                        <div className={styles.description}>
                            <h2>About</h2>
                            <p className={styles.text}>{description}</p>
                        </div>
                )
            }
        </>
    );
};

export default GameDescription;
