import React from "react";

import styles from "./ReviewItem.module.scss";

import {IGameReview} from "../../types/data";

interface ReviewItemProps extends Omit<IGameReview, "id"> {}

const ReviewItem: React.FC<ReviewItemProps> = ({username, text}) => {

    return (
        <div className={styles.container}>
            <h3>{username}</h3>
            <p>{text}</p>
        </div>
    );
};

export default ReviewItem;
