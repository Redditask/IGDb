import React from "react";

import styles from "./ReviewRatingSelecter.module.scss";

import {AiFillStar, AiOutlineStar} from "react-icons/ai";

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
            {/*вынести*/}
            {[...Array(5)].map((star, index: number) => {
                const ratingValue: number = index + 1;

                return (
                    (rating >= ratingValue)
                        ?
                        <AiFillStar
                            key={`fill ${index}`}
                            className={styles.star}
                            onClick={() => setRating(ratingValue)}
                            size={35}
                        />
                        :
                        <AiOutlineStar
                            key={`outline ${index}`}
                            className={styles.star}
                            onClick={() => setRating(ratingValue)}
                            size={35}
                        />
                );
            })}
        </div>
    );
};

export default ReviewRatingSelecter;
