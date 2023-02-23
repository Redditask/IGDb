import React from "react";

import styles from "./GameHeadRender.module.scss";

const GameHeadRender:React.FC = () => {

    return (
        <div className={styles.gameHeadRender}>
            <span className={styles.gameHeadRender__released}/>
            <span className={styles.gameHeadRender__title}/>
            <div className={styles.gameHeadRender__buttons}>
                <span className={styles.button}/>
                <span className={styles.button}/>
            </div>
        </div>
    );
};

export default GameHeadRender;
