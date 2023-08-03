import React, {useEffect} from "react";

import styles from "./ReviewItem.module.scss";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {selectUsername} from "../../store/selectors";

import {IGameReview} from "../../types/data";
import {useDeleteReviewMutation} from "../../API/igdbAPI";
import {setIsFetching} from "../../store/userSlice";

interface ReviewItemProps extends IGameReview {
    refetchReviews: () => void;
    setIsError: (isError: boolean) => void;
}

const ReviewItem: React.FC<ReviewItemProps> = ({id, username, text, refetchReviews, setIsError}) => {
    const [deleteReview, {isLoading}] = useDeleteReviewMutation();

    const user: string = useAppSelector(selectUsername);
    const dispatch = useAppDispatch();

    const isThisUserReview = (): boolean => username === user;

    const deleteReviewHandler = async (): Promise<void> => {
        const response = await deleteReview({id}).unwrap().catch((err) => err);

        if (response?.status === 200) {
            refetchReviews();
        } else if (response?.data?.message) {
            setIsError(true);
        }
    };

    useEffect((): void => {
        dispatch(setIsFetching(isLoading));
    }, [isLoading]);

    return (
        <div className={styles.review}>
            <div className={styles.review__header}>
                <h3>{username}</h3>
                {
                    isThisUserReview()
                    &&
                    <h3
                        className={styles.review__deleteButton}
                        onClick={deleteReviewHandler}
                    >
                        Delete
                    </h3>
                }
            </div>
            <p className={styles.review__text}>{text}</p>
        </div>
    );
};

export default ReviewItem;
