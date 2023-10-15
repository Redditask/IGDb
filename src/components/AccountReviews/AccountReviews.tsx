import React, {useEffect} from "react";

import styles from "./AccountReviews.module.scss";

import {useGetAccountReviewsQuery} from "../../API/igdbAPI";

import {useAppDispatch} from "../../hooks";
import {setIsError, setIsFetching} from "../../store/userSlice";

import AccountReviewItem from "../AccountReviewItem/AccountReviewItem";
import RegularLoader from "../UI/RegularLoader/RegularLoader";

import {initialAccountReviewsState} from "../../utils/helpers/initialStates";
import {IGameReview} from "../../types/data";

interface AccountReviewsProps {
    selectedUser: string | undefined;
    isLoadingPage: boolean
}

const AccountReviews: React.FC<AccountReviewsProps> = ({selectedUser, isLoadingPage}) => {
    let ratingColor: string = styles.reviews__greenAverage;

    const dispatch = useAppDispatch();

    const {
        data: reviewsData = initialAccountReviewsState,
        isError,
        isFetching,
        refetch
    } = useGetAccountReviewsQuery({username: selectedUser}, {skip: !selectedUser});

    if (reviewsData.medianRating < 4) ratingColor = styles.reviews__yellowAverage;
    if (reviewsData.medianRating < 2.5) ratingColor = styles.reviews__redAverage;

    useEffect((): void => {
        dispatch(setIsFetching(isFetching));
    }, [isFetching]);

    useEffect((): void => {
        dispatch(setIsError(isError));
    }, [isError]);

    useEffect((): void => {
        refetch();
    }, []);

    console.log(reviewsData.reviews)

    return (
        (isLoadingPage || isFetching)
            ?
            <div className={styles.loaderArea}>
                <RegularLoader/>
            </div>
            :
            <div className={styles.container}>
                {
                    !!reviewsData.reviews.length
                        ?
                        <>
                            <h2>User reviews</h2>
                            <div className={styles.reviews}>
                                <h3 className={styles.reviews__stats}>
                                    AVERAGE GAME RATING:
                                    <span className={ratingColor}>
                                        {reviewsData.medianRating}
                                    </span>
                                </h3>
                                {reviewsData.reviews.map((review: IGameReview) =>
                                    <AccountReviewItem
                                        key={review.id}
                                        reviewData={review}
                                    />
                                )}
                            </div>
                        </>
                        :
                        <h1 className={styles.reviews__emptyList}>
                            User hasn't written any reviews
                        </h1>
                }
            </div>
    );
};

export default AccountReviews;
