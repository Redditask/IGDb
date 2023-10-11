import React from "react";

import styles from "./GameReviewRatingSelecter.module.scss";

import ReviewRating from "../UI/ReviewRating/ReviewRating";

interface GameReviewRatingSelecterProps {
    rating: number;
    setRating: (rating: number) => void;
}

const GameReviewRatingSelecter: React.FC<GameReviewRatingSelecterProps> = ({rating, setRating}) => {

    return (
        <div
            className={styles.container}
            title="Select game rating"
        >
            <ReviewRating
                rating={rating}
                size={35}
                className={styles.star}
                handler={setRating}
            />
        </div>
    );
};

export default GameReviewRatingSelecter;
