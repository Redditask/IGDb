import React from "react";

import styles from "./GameDescription.module.scss";

import GameDescriptionSkeleton from "../UI/GameDescriptionSkeleton/GameDescriptionSkeleton";

interface GameDescriptionProps {
    description: string;
    isLoading: boolean;
}

const GameDescription: React.FC<GameDescriptionProps> = ({description, isLoading}) => {

    return (
        isLoading
            ?
            <GameDescriptionSkeleton/>
            :
            <div className={styles.description}>
                {description ? <h2>About</h2> : <></>}
                <p className={styles.text}>{description}</p>
            </div>
    );
};

export default GameDescription;
