import React, {useEffect, useState} from "react";

import {useGetReviewsQuery} from "../../API/igdbAPI";

import styles from "./Reviews.module.scss";

import Button from "../UI/Button/Button";
import ReviewItem from "../ReviewItem/ReviewItem";
import ReviewsSkeleton from "../Skeletons/ReviewsSkeleton/ReviewsSkeleton";
import ReviewForm from "../ReviewForm/ReviewForm";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {setIsFetching} from "../../store/userSlice";
import {selectIsAuth} from "../../store/selectors";

import {IGameReview} from "../../types/data";
import {initialReviewsState} from "../../utils/helpers/initialStates";

interface ReviewsProps {
    slug: string | undefined;
    setIsError: (isError: boolean) => void;
    isLoading: boolean;
}

const Reviews: React.FC<ReviewsProps> = ({slug, setIsError, isLoading}) => {
    const [displayedReviews, setDisplayedReviews] = useState<IGameReview []>([]);
    const [isAllDisplayed, setIsAllDisplayed] = useState<boolean>(true);
    const [isShowReviewForm, setIsShowReviewForm] = useState<boolean>(false);

    const isAuth: boolean = useAppSelector(selectIsAuth);
    const dispatch = useAppDispatch();

    const {
        data: reviewsResponse = initialReviewsState,
        error,
        isFetching,
        refetch
    } = useGetReviewsQuery({slug}, {skip: !slug});

    const reviewFormHandler = (): void => setIsShowReviewForm(true);

    useEffect((): void => {
        if (reviewsResponse.reviews.length > 5) {
            setDisplayedReviews([...reviewsResponse.reviews.slice(0, 5)]);
            setIsAllDisplayed(false);
        } else {
            setDisplayedReviews([...reviewsResponse.reviews]);
            setIsAllDisplayed(true);
        }

        if (error) setIsError(true);
    }, [reviewsResponse]);

    const showAllReviews = (): void => {
        setDisplayedReviews([...displayedReviews, ...reviewsResponse.reviews.slice(5)]);
        setIsAllDisplayed(true);
    }

    useEffect((): void => {
        dispatch(setIsFetching(isFetching));
    }, [isFetching]);

    return (
        isLoading
            ?
            <ReviewsSkeleton/>
            :
            <div className={styles.container}>
                <h2>Reviews</h2>
                {
                    isShowReviewForm
                        ?
                        <ReviewForm
                            setIsError={setIsError}
                            setIsShowReviewForm={setIsShowReviewForm}
                            gameSlug={slug}
                            refetchReview={refetch}
                        />
                        :
                        <>
                            <Button
                                title="Write a review"
                                onClick={reviewFormHandler}
                                disabled={!isAuth}
                            />
                            {!isAuth
                                &&
                                <p className={styles.errorMessage}>You must be logged in</p>
                            }
                        </>
                }
                <div className={styles.reviews}>
                    {
                        !!displayedReviews.length
                            ?
                            displayedReviews.map((review) =>
                                <ReviewItem
                                    key={review.id}
                                    username={review.username}
                                    text={review.text}
                                />
                            )
                            :
                            <h3 className={styles.reviews__emptyMessage}>No reviews yet, be first!</h3>
                    }
                </div>
                {
                    !isAllDisplayed
                    &&
                    <Button
                        title="Show all reviews"
                        onClick={showAllReviews}
                    />
                }
            </div>
    );
};

export default Reviews;
