import React, {useEffect} from "react";

import styles from "./AccountReviews.module.scss";

import {useGetAccountReviewsQuery} from "../../API/igdbAPI";

import {useAppDispatch} from "../../hooks";
import {setIsError, setIsFetching} from "../../store/userSlice";

import AccountReviewItem from "../AccountReviewItem/AccountReviewItem";

import {initialAccountReviewsState} from "../../utils/helpers/initialStates";
import {IGameReview} from "../../types/data";

interface AccountReviewsProps {
    selectedUser: string | undefined;
}

const AccountReviews: React.FC<AccountReviewsProps> = ({selectedUser}) => {

    const dispatch = useAppDispatch();

    const {
        data: reviewsData = initialAccountReviewsState,
        isError,
        isFetching,
        refetch
    } = useGetAccountReviewsQuery({username: selectedUser}, {skip: !selectedUser});

    useEffect((): void => {
        dispatch(setIsFetching(isFetching));
    }, [isFetching]);

    useEffect((): void => {
        dispatch(setIsError(isError));
    }, [isError]);

    useEffect((): void => {
        refetch();
    }, []);

    return (
        <div className={styles.container}>
            <h2>User review's</h2>
            {/* тут средняя оценка в ревьюшках */}
            <div className={styles.reviews}>
                {reviewsData.reviews.map((review: IGameReview) =>
                    <AccountReviewItem
                        key={review.id}
                        reviewData={review}
                    />
                )}
                {/*фраза если нет ревьюшек*/}
            </div>
        </div>
    );
};

export default AccountReviews;
