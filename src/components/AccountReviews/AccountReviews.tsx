import React, {useEffect, useState} from "react";

import styles from "./AccountReviews.module.scss";

import {useGetAccountReviewsQuery} from "../../API/igdbAPI";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {setIsError, setIsFetching} from "../../store/userSlice";
import {selectUsername} from "../../store/selectors";

import AccountReviewItem from "../AccountReviewItem/AccountReviewItem";
import RegularLoader from "../UI/RegularLoader/RegularLoader";
import ReviewsSorter from "../ReviewsSorter/ReviewsSorter";

import {initialAccountReviewsState} from "../../utils/helpers/initialStates";
import {IGameReview} from "../../types/data";

interface AccountReviewsProps {
    selectedUser: string | undefined;
    isLoadingPage: boolean
}

const AccountReviews: React.FC<AccountReviewsProps> = ({selectedUser, isLoadingPage}) => {
    const [userReviews, setUserReviews] = useState<IGameReview []>([]);
    const [reviewsSorter, setReviewsSorter] = useState<"latest" | "mostLiked">("latest");

    let ratingColor: string = styles.reviews__greenAverage;

    const dispatch = useAppDispatch();
    const currentUser: string = useAppSelector(selectUsername);

    const {
        data: reviewsData = initialAccountReviewsState,
        isError,
        isFetching,
        refetch
    } = useGetAccountReviewsQuery({
        username: selectedUser,
        viewer: currentUser,
        sortOption: reviewsSorter
    }, {skip: !selectedUser});

    if (reviewsData.medianRating < 3.8) ratingColor = styles.reviews__yellowAverage;
    if (reviewsData.medianRating < 2.5) ratingColor = styles.reviews__redAverage;

    useEffect((): void => {
        dispatch(setIsFetching(isFetching));
    }, [isFetching]);

    useEffect((): void => {
        dispatch(setIsError(isError));
    }, [isError]);

    useEffect((): void => {
        setUserReviews([...reviewsData.reviews]);
    }, [reviewsData]);

    return (
        isLoadingPage
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
                            <div className={styles.reviews__header}>
                                <h2>User reviews</h2>
                                <ReviewsSorter setSortOption={setReviewsSorter}/>
                            </div>
                            <div className={styles.reviews}>
                                <h3 className={styles.reviews__stats}>
                                    AVERAGE GAME RATING:
                                    <span className={ratingColor}>
                                        {reviewsData.medianRating}
                                    </span>
                                </h3>
                                {userReviews.map((review: IGameReview) =>
                                    <AccountReviewItem
                                        key={review.id}
                                        reviewData={review}
                                        refetchReviews={refetch}
                                        currentUser={currentUser}
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
