import React, {useEffect} from "react";

import styles from "./ReviewItem.module.scss";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {selectUsername} from "../../store/selectors";

import {IGameReview} from "../../types/data";
import {useDeleteReviewMutation, useDislikeReviewMutation, useLikeReviewMutation} from "../../API/igdbAPI";
import {setIsFetching} from "../../store/userSlice";

import {MdDelete} from "react-icons/md"

import {getDislikeButtonByReaction, getLikeButtonByReaction} from "../../utils/helpers/componentsProcessing";

interface ReviewItemProps extends IGameReview {
    refetchReviews: () => void;
    setIsError: (isError: boolean) => void;
}

const ReviewItem: React.FC<ReviewItemProps> = ({id, username, text, refetchReviews, setIsError, likedUsers, dislikedUsers, userReaction}) => {
    const [deleteReview, {isLoading: isLoadingDelete}] = useDeleteReviewMutation();
    const [likeReview, {isLoading: isLoadingLike}] = useLikeReviewMutation();
    const [dislikeReview, {isLoading: isloadingDislike}] = useDislikeReviewMutation();

    const user: string = useAppSelector(selectUsername);
    const dispatch = useAppDispatch();

    const isThisUserReview = (): boolean => username === user;

    const buttonStyles: string = isThisUserReview() || !user ? styles.review__inactiveReaction : styles.review__activeReaction;

    const deleteReviewHandler = async (): Promise<void> => {
        const response = await deleteReview({id}).unwrap().catch((err) => err);

        if (response?.status === 200) {
            refetchReviews();
        } else if (response?.data?.message) {
            setIsError(true);
        }
    };

    const likeReviewHandler = async (): Promise<void> => {
        if (user && user !== username) {
            const response = await likeReview(({id})).unwrap().catch((err) => err);

            if (response?.status === 200) {
                refetchReviews();
            } else if (response?.data?.message) {
                setIsError(true);
            }
        }
    };

    const dislikeReviewHandler = async (): Promise<void> => {
        if (user && user !== username) {
            const response = await dislikeReview(({id})).unwrap().catch((err) => err);

            if (response?.status === 200) {
                refetchReviews();
            } else if (response?.data?.message) {
                setIsError(true);
            }
        }
    };

    useEffect((): void => {
        dispatch(setIsFetching(
            isLoadingDelete
            || isLoadingLike
            || isloadingDislike
        ));
    }, [
        isLoadingDelete,
        isLoadingLike,
        isloadingDislike
    ]);

    return (
        <div className={styles.review}>
            <h3>{username}</h3>
            <p className={styles.review__text}>{text}</p>
            <div className={styles.review__stats}>
                <div className={styles.review__reaction}>
                    {getLikeButtonByReaction(userReaction, likeReviewHandler, buttonStyles)}
                    {likedUsers}
                </div>
                <div className={styles.review__reaction}>
                    {getDislikeButtonByReaction(userReaction, dislikeReviewHandler, buttonStyles)}
                    {dislikedUsers}
                </div>
            </div>
            {
                isThisUserReview()
                &&
                <MdDelete
                    className={styles.review__deleteButton}
                    size={30}
                    title="Delete review"
                    onClick={deleteReviewHandler}
                />
            }
        </div>
    );
};

export default ReviewItem;
