import React, {useEffect, useState} from "react";

import styles from "./Reviews.module.scss";

import {useGetReviewsQuery} from "../../API/igdbAPI";

import Button from "../UI/Button/Button";
import ReviewItem from "../ReviewItem/ReviewItem";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {selectIsAuth} from "../../store/selectors";

import {IGameReview} from "../../types/data";
import {initialReviewsState} from "../../utils/helpers/initialStates";
import {setIsFetching} from "../../store/userSlice";

interface ReviewsProps {
    slug: string | undefined;
    setIsError: (isError: boolean) => void;
}

const Reviews: React.FC<ReviewsProps> = ({slug, setIsError}) => {
    const [displayedReviews, setDisplayedReviews] = useState<IGameReview []>([]);

    const isAuth: boolean = useAppSelector(selectIsAuth);
    const dispatch = useAppDispatch();

    const {
        data: reviewsResponse = initialReviewsState,
        error,
        isFetching,
    } = useGetReviewsQuery({slug}, {skip: !slug});

    useEffect((): void => {
        if (reviewsResponse.reviews.length > 5) {
            setDisplayedReviews([...reviewsResponse.reviews.slice(0, 5)]);
        } else setDisplayedReviews([...reviewsResponse.reviews]);

        if (error) setIsError(true);
    }, [reviewsResponse]);

    useEffect((): void => {
        dispatch(setIsFetching(isFetching));
    }, [isFetching]);

    return (
        <div className={styles.container}>
            <h2>Reviews</h2>
            <Button title="Write a review" disabled={!isAuth}/>
            {
                !!displayedReviews.length
                    ?
                    displayedReviews.map((review) =>
                        <ReviewItem
                            key={review.username}
                            username={review.username}
                            text={review.text}
                        />
                    )
                    :
                    <h3>No reviews</h3>
            }
        </div>
    );
};

export default Reviews;
