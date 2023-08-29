import React, {forwardRef, useEffect, useState} from "react";

import styles from "./ReviewItem.module.scss";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {selectUsername} from "../../store/selectors";

import {IGameReview, NotificationRef} from "../../types/data";
import {useDeleteReviewMutation, useDislikeReviewMutation, useLikeReviewMutation} from "../../API/igdbAPI";
import {setIsFetching} from "../../store/userSlice";

import {MdDelete, MdEdit} from "react-icons/md"

import {getDislikeButtonByReaction, getLikeButtonByReaction} from "../../utils/helpers/componentsProcessing";

interface ReviewItemProps {
    reviewData: IGameReview
    refetchReviews: () => void;
    setIsError: (isError: boolean) => void;
    editReviewText: string;
    setEditReviewText: (editReviewText: string) => void;
}

const ReviewItem = forwardRef<NotificationRef, ReviewItemProps>(({
        reviewData,
        refetchReviews,
        setIsError,
        editReviewText,
        setEditReviewText
    }, ref) => {

    const [isShowUserReview, setIsShowUserReview] = useState<boolean>(true);

    const [deleteReview, {isLoading: isLoadingDelete}] = useDeleteReviewMutation();
    const [likeReview, {isLoading: isLoadingLike}] = useLikeReviewMutation();
    const [dislikeReview, {isLoading: isloadingDislike}] = useDislikeReviewMutation();

    const user: string = useAppSelector(selectUsername);
    const dispatch = useAppDispatch();

    const isThisUserReview = (): boolean => reviewData.username === user;

    const buttonStyles: string = (isThisUserReview() || !user)
        ? styles.review__inactiveReaction
        : styles.review__activeReaction;

    const showNotification = (message: string): void => {
        refetchReviews();
        if (ref && "current" in ref && ref.current) ref.current.show(message);
    };

    const deleteReviewHandler = async (): Promise<void> => {
        const response = await deleteReview({
            id: reviewData.id
        }).unwrap().catch((err) => err);

        if (response?.status === 200) {
            showNotification("Review was deleted");
        } else if (response?.data?.message) {
            setIsError(true);
        }
    };

    const likeReviewHandler = async (): Promise<void> => {
        if (user && user !== reviewData.username) {
            const response = await likeReview(({id: reviewData.id})).unwrap().catch((err) => err);

            if (response?.status === 200) {
                refetchReviews();
            } else if (response?.data?.message) {
                setIsError(true);
            }
        }
    };

    const dislikeReviewHandler = async (): Promise<void> => {
        if (user && user !== reviewData.username) {
            const response = await dislikeReview(({
                id: reviewData.id
            })).unwrap().catch((err) => err);

            if (response?.status === 200) {
                refetchReviews();
            } else if (response?.data?.message) {
                setIsError(true);
            }
        }
    };

    const editReviewHandler = (): void => {
        setEditReviewText(reviewData.text);
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

    useEffect((): void => {
        if (!editReviewText && isThisUserReview()) setIsShowUserReview(true)
        else if (editReviewText && isThisUserReview()) setIsShowUserReview(false);
    }, [editReviewText]);

    return (
        isShowUserReview
            ?
            <div className={styles.review}>
                <div className={styles.review__header}>
                    <h3>{reviewData.username}</h3>
                    {
                        isThisUserReview()
                        &&
                        <h4 className={styles.review__userMark}>
                            (Your review)
                        </h4>
                    }
                </div>
                <p className={styles.review__text}>{reviewData.text}</p>
                <div className={styles.review__stats}>
                    <div className={styles.review__reaction}>
                        {getLikeButtonByReaction(
                            reviewData.userReaction,
                            likeReviewHandler,
                            buttonStyles
                        )}
                        {reviewData.likedUsers}
                    </div>
                    <div className={styles.review__reaction}>
                        {getDislikeButtonByReaction(
                            reviewData.userReaction,
                            dislikeReviewHandler,
                            buttonStyles
                        )}
                        {reviewData.dislikedUsers}
                    </div>
                </div>
                {
                    isThisUserReview()
                    &&
                    <>
                        <
                            MdDelete
                            className={styles.review__deleteButton}
                            size={30}
                            title="Delete review"
                            onClick={deleteReviewHandler}
                        />
                        <
                            MdEdit
                            className={styles.review__editButton}
                            size={30}
                            title="Edit review"
                            onClick={editReviewHandler}
                        />
                    </>
                }
            </div>
            :
            <>
            </>
    );
});

export default ReviewItem;
