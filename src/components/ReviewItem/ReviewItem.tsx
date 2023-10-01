import React, {forwardRef, useEffect, useState} from "react";

import styles from "./ReviewItem.module.scss";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {selectUsername} from "../../store/selectors";

import {IGameReview, IReviewInfo, NotificationRef} from "../../types/data";
import {useDeleteReviewMutation, useDislikeReviewMutation, useLikeReviewMutation} from "../../API/igdbAPI";
import {setIsError, setIsFetching} from "../../store/userSlice";

import {MdDelete, MdEdit} from "react-icons/md"

import {AiFillDislike, AiFillLike, AiFillStar, AiOutlineDislike, AiOutlineLike, AiOutlineStar} from "react-icons/ai";

interface ReviewItemProps {
    reviewData: IGameReview
    refetchReviews: () => void;
    editReviewInfo: IReviewInfo;
    setEditReviewInfo: (editReviewInfo: IReviewInfo) => void;
}

const ReviewItem = forwardRef<NotificationRef, ReviewItemProps>(({
        reviewData,
        refetchReviews,
        editReviewInfo,
        setEditReviewInfo
    }, ref) => {

    const [isShowUserReview, setIsShowUserReview] = useState<boolean>(true);

    const [deleteReview, {isLoading: isLoadingDelete, isError: isDeleteError}] = useDeleteReviewMutation();
    const [likeReview, {isLoading: isLoadingLike, isError: isLikeError}] = useLikeReviewMutation();
    const [dislikeReview, {isLoading: isLoadingDislike, isError: isDislikeError}] = useDislikeReviewMutation();

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
        }
    };

    const likeReviewHandler = async (): Promise<void> => {
        if (user && user !== reviewData.username) {
            const response = await likeReview(({
                id: reviewData.id
            })).unwrap().catch((err) => err);

            if (response?.status === 200) {
                refetchReviews();
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
            }
        }
    };

    const editReviewHandler = (): void => {
        setEditReviewInfo({
            text: reviewData.text,
            rating: reviewData.rating
        });
    };

    useEffect((): void => {
        dispatch(setIsFetching(
            isLoadingDelete
            || isLoadingLike
            || isLoadingDislike
        ));
    }, [
        isLoadingDelete,
        isLoadingLike,
        isLoadingDislike
    ]);

    useEffect((): void => {
        dispatch(setIsError(
            isDeleteError
            || isLikeError
            || isDislikeError
        ));
    }, [
        isDeleteError,
        isLikeError,
        isDislikeError
    ]);

    useEffect((): void => {
        if (!(editReviewInfo.text || editReviewInfo.rating) && isThisUserReview()) setIsShowUserReview(true)
        else if ((editReviewInfo.text || editReviewInfo.rating) && isThisUserReview()) setIsShowUserReview(false);
    }, [editReviewInfo.text, editReviewInfo.rating]);

    return (
        isShowUserReview
            ?
            <div className={styles.review}>
                <div className={styles.review__header}>
                    <div className={styles.review__info}>
                        <h3>{reviewData.username}</h3>
                        {
                            isThisUserReview()
                            &&
                            <h4 className={styles.review__userMark}>
                                (Your review)
                            </h4>
                        }
                    </div>
                    {/*вынести*/}
                    <div
                        className={styles.review__rating}
                        title="Game rating"
                    >
                        {[...Array(5)].map((star, index: number) => {
                            const ratingValue: number = index + 1;

                            return (
                                (reviewData.rating >= ratingValue)
                                    ?
                                    <AiFillStar
                                        key={`fill ${index}`}
                                        size={22}
                                    />
                                    :
                                    <AiOutlineStar
                                        key={`outline ${index}`}
                                        size={22}
                                    />
                            );
                        })}
                    </div>
                </div>
                <p className={styles.review__text}>{reviewData.text}</p>
                <div className={styles.review__stats}>
                    <div
                        className={styles.review__reaction}
                        title="Like"
                    >
                        {
                            (reviewData.userReaction === "like")
                                ?
                                <AiFillLike
                                    className={buttonStyles}
                                    onClick={likeReviewHandler}
                                    size={25}
                                />
                                :
                                <AiOutlineLike
                                    className={buttonStyles}
                                    onClick={likeReviewHandler}
                                    size={25}
                                />
                        }
                        {reviewData.likedUsers}
                    </div>
                    <div
                        className={styles.review__reaction}
                        title="Dislike"
                    >
                        {
                            (reviewData.userReaction === "dislike")
                                ?
                                <AiFillDislike
                                    className={buttonStyles}
                                    onClick={dislikeReviewHandler}
                                    size={25}
                                />
                                :
                                <AiOutlineDislike
                                    className={buttonStyles}
                                    onClick={dislikeReviewHandler}
                                    size={25}
                                />
                        }
                        {reviewData.dislikedUsers}
                    </div>
                </div>
                {
                    isThisUserReview()
                    &&
                    <>
                        <MdDelete
                            className={styles.review__deleteButton}
                            size={30}
                            title="Delete review"
                            onClick={deleteReviewHandler}
                        />
                        <MdEdit
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
