import React from "react";

import styles from "./ReviewItem.module.scss";

import {IGameReview} from "../../types/data";

interface ReviewItemProps extends Omit<IGameReview, "id"> {}

const ReviewItem: React.FC<ReviewItemProps> = ({username, text}) => {

    return (
        <div className={styles.review}>
            <h3>{username}</h3>
            <p className={styles.review__text}>{text}</p>
        </div>
    );
};

export default ReviewItem;
