import React from "react";

import styles from "./AdditionalContentItem.module.scss";

import GameList from "../GameList/GameList";
import Button from "../UI/Button/Button";

import {IGameCard} from "../../types/types";

interface AdditionalContentItemProps {
    title: string;
    content: IGameCard[];
    onClickAction: () => void;
    isAll: boolean;
}

const AdditionalContentItem:React.FC<AdditionalContentItemProps> = ({title, content, onClickAction, isAll}) => {

    return (
        <>
            {
                (content.length !== 0)
                &&
                <div className={styles.gameList}>
                    <h2>{title}</h2>
                    <GameList games={content} isLimit={true} isEmpty={false}/>
                    {
                        !isAll
                        &&
                        <div className={styles.showButton}>
                            <Button
                                title="Show"
                                onClick={onClickAction}
                            />
                        </div>
                    }
                </div>
            }
        </>
    );
};

export default AdditionalContentItem;
