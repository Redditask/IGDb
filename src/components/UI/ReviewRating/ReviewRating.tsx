import React from "react";

import {AiFillStar, AiOutlineStar} from "react-icons/ai";

interface ReviewRatingProps {
    rating: number;
    size: number;
    className?: string;
    handler?: (value: number) => void;
}

const ReviewRating: React.FC<ReviewRatingProps> = ({rating, size, className, handler}) => {

    const ratingHandler = (ratingValue: number): void => handler && handler(ratingValue);

    return (
        <>
            {[...Array(5)].map((star, index: number) => {
                const ratingValue: number = index + 1;

                return (rating >= ratingValue)
                    ?
                    <AiFillStar
                        key={`fill ${index}`}
                        className={className}
                        onClick={() => ratingHandler(ratingValue)}
                        size={size}
                    />
                    :
                    <AiOutlineStar
                        key={`outline ${index}`}
                        className={className}
                        onClick={() => ratingHandler(ratingValue)}
                        size={size}
                    />
            })}
        </>
    );
};

export default ReviewRating;
