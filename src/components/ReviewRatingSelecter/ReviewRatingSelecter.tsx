import React from "react";

import styles from "./ReviewRatingSelecter.module.scss";

import ReviewRating from "../UI/ReviewRating/ReviewRating";

interface ReviewRatingSelecterProps {
    rating: number;
    setRating: (rating: number) => void;
}

const ReviewRatingSelecter: React.FC<ReviewRatingSelecterProps> = ({rating, setRating}) => {

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

export default ReviewRatingSelecter;
