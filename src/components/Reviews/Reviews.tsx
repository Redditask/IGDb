import React, {forwardRef, useEffect, useState} from "react";

import {useGetReviewsQuery} from "../../API/igdbAPI";

import styles from "./Reviews.module.scss";

import Button from "../UI/Button/Button";
import ReviewItem from "../ReviewItem/ReviewItem";
import ReviewsSkeleton from "../Skeletons/ReviewsSkeleton/ReviewsSkeleton";
import ReviewForm from "../ReviewForm/ReviewForm";
import ReviewsSorter from "../ReviewsSorter/ReviewsSorter";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {setIsError, setIsFetching} from "../../store/userSlice";
import {selectIsAuth, selectUsername} from "../../store/selectors";

import {IGameReview, IReviewInfo, NotificationRef} from "../../types/data";
import {initialReviewInfoState, initialReviewsState} from "../../utils/helpers/initialStates";
import {gamePageInfoConvert} from "../../utils/helpers/converters";

interface ReviewsProps {
    slug: string | undefined;
    isLoading: boolean;
}

const Reviews = forwardRef<NotificationRef, ReviewsProps>(({
         slug,
         isLoading
     }, ref) => {

    const [displayedReviews, setDisplayedReviews] = useState<IGameReview []>([]);
    const [isAllDisplayed, setIsAllDisplayed] = useState<boolean>(false);
    const [reviewsRerender, setReviewsRerender] = useState<boolean>(false);
    const [editReviewInfo, setEditReviewInfo] = useState<IReviewInfo>(initialReviewInfoState);
    const [reviewsSorter, setReviewsSorter] = useState<"latest" | "mostLiked">("latest");

    const username: string = useAppSelector(selectUsername);
    const isAuth: boolean = useAppSelector(selectIsAuth);
    const dispatch = useAppDispatch();

    const {
        data: reviewsResponse = initialReviewsState,
        isError,
        isFetching,
        refetch
    } = useGetReviewsQuery({slug, username, sortOption: reviewsSorter}, {skip: !slug});

    const showAllReviews = (): void => {
        setDisplayedReviews([...displayedReviews, ...reviewsResponse.reviews.slice(5)]);
        setIsAllDisplayed(true);
    }

    useEffect((): void => {
        dispatch(setIsFetching(isFetching));
    }, [isFetching]);

    useEffect((): void => {
        setReviewsRerender((prevState: boolean) => !prevState);
        setIsAllDisplayed(false);
    }, [slug]);

    useEffect((): void => {
        if (isAllDisplayed) {
            setDisplayedReviews([...reviewsResponse.reviews]);
        } else if (reviewsResponse.reviews.length > 5) {
            setDisplayedReviews([...reviewsResponse.reviews.slice(0, 5)]);
            setIsAllDisplayed(false);
        } else {
            setDisplayedReviews([...reviewsResponse.reviews]);
            setIsAllDisplayed(true);
        }

        dispatch(setIsError(isError));
    }, [reviewsResponse, reviewsRerender]);

    return (
        isLoading
            ?
            <ReviewsSkeleton/>
            :
            <div className={styles.container}>
                <div className={styles.reviews__header}>
                    <h2 className={styles.reviews__title}>Reviews</h2>
                    {
                        !isAuth
                        &&
                        <h4 className={styles.reviews__nonAuthMessage}>
                            You must be logged in to write and like review's
                        </h4>
                    }
                    <ReviewsSorter setSortOption={setReviewsSorter}/>
                </div>
                <ReviewForm
                    gamePageInfo={gamePageInfoConvert(reviewsResponse.userReviewId, slug)}
                    refetchReviews={refetch}
                    editReviewInfo={editReviewInfo}
                    setEditReviewInfo={setEditReviewInfo}
                    ref={ref}
                />
                <div className={styles.reviews}>
                    {
                        !!displayedReviews.length
                            ?
                            displayedReviews.map((review: IGameReview) =>
                                <ReviewItem
                                    key={review.id}
                                    reviewData={review}
                                    refetchReviews={refetch}
                                    editReviewInfo={editReviewInfo}
                                    setEditReviewInfo={setEditReviewInfo}
                                    ref={ref}
                                />
                            )
                            :
                            <h3 className={styles.reviews__emptyReviews}>No reviews yet, be first!</h3>
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
});

export default Reviews;
