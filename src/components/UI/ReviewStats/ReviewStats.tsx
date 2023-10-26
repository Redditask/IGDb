import React from "react";

import styles from "./ReviewStats.module.scss"

import {AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike} from "react-icons/ai";

import {IGameReview} from "../../../types/data";

interface ReviewStatsProps {
    reviewData: IGameReview;
    likeHandler: () => void;
    dislikeHandler: () => void;
    isActiveButtons: boolean;
}

const ReviewStats: React.FC<ReviewStatsProps> = ({
    reviewData,
    likeHandler,
    dislikeHandler,
    isActiveButtons
    }) => {

    const buttonStyles: string = isActiveButtons
        ? styles.reaction__activeReaction
        : styles.reaction__inactiveReaction;

    return (
        <div className={styles.container}>
            <div
                className={styles.reaction}
                title="Like"
            >
                {
                    (reviewData.userReaction === "like")
                        ?
                        <AiFillLike
                            className={buttonStyles}
                            onClick={likeHandler}
                            size={25}
                        />
                        :
                        <AiOutlineLike
                            className={buttonStyles}
                            onClick={likeHandler}
                            size={25}
                        />
                }
                {reviewData.likedUsers}
            </div>
            <div
                className={styles.reaction}
                title="Dislike"
            >
                {
                    (reviewData.userReaction === "dislike")
                        ?
                        <AiFillDislike
                            className={buttonStyles}
                            onClick={dislikeHandler}
                            size={25}
                        />
                        :
                        <AiOutlineDislike
                            className={buttonStyles}
                            onClick={dislikeHandler}
                            size={25}
                        />
                }
                {reviewData.dislikedUsers}
            </div>
        </div>
    );
};

export default ReviewStats;
