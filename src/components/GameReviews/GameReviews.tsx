import React, {forwardRef, useEffect, useState} from "react";

import {useGetReviewsQuery} from "../../API/igdbAPI";

import styles from "./GameReviews.module.scss";

import Button from "../UI/Button/Button";
import GameReviewItem from "../GameReviewItem/GameReviewItem";
import ReviewsSkeleton from "../Skeletons/ReviewsSkeleton/ReviewsSkeleton";
import GameReviewForm from "../GameReviewForm/GameReviewForm";
import ReviewsSorter from "../ReviewsSorter/ReviewsSorter";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {setIsError, setIsFetching} from "../../store/userSlice";
import {selectIsAuth, selectUsername} from "../../store/selectors";

import {IGameReview, IReviewInfo, NotificationRef} from "../../types/data";
import {initialReviewInfoState, initialGameReviewsState} from "../../utils/helpers/initialStates";
import {gamePageInfoConvert} from "../../utils/helpers/converters";

interface GameReviewsProps {
    slug: string | undefined;
    isLoadingPage: boolean;
}

const GameReviews = forwardRef<NotificationRef, GameReviewsProps>(({
         slug,
         isLoadingPage
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
        data: reviewsResponse = initialGameReviewsState,
        isError,
        isFetching,
        refetch
    } = useGetReviewsQuery({
        slug,
        username,
        sortOption: reviewsSorter
    }, {skip: !slug});

    let ratingColor: string = styles.reviews__greenAverage;
    if (reviewsResponse.medianRating < 3.8) ratingColor = styles.reviews__yellowAverage;
    if (reviewsResponse.medianRating < 2.5) ratingColor = styles.reviews__redAverage;

    const showAllReviews = (): void => {
        setDisplayedReviews([...displayedReviews, ...reviewsResponse.reviews.slice(5)]);
        setIsAllDisplayed(true);
    };

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
        isLoadingPage
            ?
            <ReviewsSkeleton/>
            :
            <div className={styles.container}>
                {
                    !isAuth
                    &&
                    <h3 className={styles.reviews__nonAuthMessage}>
                        YOU MUST BE LOGGED IN TO WRITE AND LIKE REVIEW'S
                    </h3>
                }
                <div className={styles.reviews__header}>
                    <h2 className={styles.reviews__title}>Reviews</h2>
                    <ReviewsSorter setSortOption={setReviewsSorter}/>
                </div>
                {
                    !!displayedReviews.length
                    &&
                    <h3 className={styles.reviews__stats}>
                        AVERAGE USER RATING:
                        <span className={ratingColor}>
                        {reviewsResponse.medianRating}
                        </span>
                    </h3>
                }
                <GameReviewForm
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
                                <GameReviewItem
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

export default GameReviews;
