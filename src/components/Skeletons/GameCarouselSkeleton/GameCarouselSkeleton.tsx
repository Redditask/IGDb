import React from "react";

import styles from "./GameCarouselSkeleton.module.scss";

import GameCardSkeleton from "../GameCardSkeleton/GameCardSkeleton";

const GameCarouselSkeleton = () => {

    return (
        <div className={styles.container}>
            <span className={styles.skeleton__header}/>
            <div className={styles.skeleton}>
                <GameCardSkeleton/>
                <GameCardSkeleton/>
                <GameCardSkeleton/>
            </div>
        </div>
    );
};

export default GameCarouselSkeleton;
