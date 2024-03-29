import React, {forwardRef, useEffect, useState} from "react";

import styles from "./GameReviewItem.module.scss";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {selectUsername} from "../../store/selectors";

import {IGameReview, IReviewInfo, NotificationRef} from "../../types/data";
import {useDeleteReviewMutation, useDislikeReviewMutation, useLikeReviewMutation} from "../../API/igdbAPI";
import {setIsError, setIsFetching} from "../../store/userSlice";

import {NavLink} from "react-router-dom";

import {MdDelete, MdEdit} from "react-icons/md";
import ReviewRating from "../UI/ReviewRating/ReviewRating";
import ReviewStats from "../UI/ReviewStats/ReviewStats";

import {ACCOUNT_ROUTE} from "../../utils/consts";

interface GameReviewItemProps {
    reviewData: IGameReview
    refetchReviews: () => void;
    editReviewInfo: IReviewInfo;
    setEditReviewInfo: (editReviewInfo: IReviewInfo) => void;
}

const GameReviewItem = forwardRef<NotificationRef, GameReviewItemProps>(({
        reviewData,
        refetchReviews,
        editReviewInfo,
        setEditReviewInfo
    }, ref) => {

    const [isShowUserReview, setIsShowUserReview] = useState<boolean>(true);

    const [deleteReview, {isLoading: isLoadingDelete, isError: isDeleteError}] = useDeleteReviewMutation();
    const [likeReview, {isLoading: isLoadingLike, isError: isLikeError}] = useLikeReviewMutation();
    const [dislikeReview, {isLoading: isLoadingDislike, isError: isDislikeError}] = useDislikeReviewMutation();

    const currentUser: string = useAppSelector(selectUsername);
    const dispatch = useAppDispatch();

    const isThisUserReview = (): boolean => reviewData.username === currentUser;

    const isActiveButtons = (): boolean => !(isThisUserReview() || !currentUser);

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
        if (currentUser && currentUser !== reviewData.username) {
            const response = await likeReview(({
                id: reviewData.id
            })).unwrap().catch((err) => err);

            if (response?.status === 200) {
                refetchReviews();
            }
        }
    };

    const dislikeReviewHandler = async (): Promise<void> => {
        if (currentUser && currentUser !== reviewData.username) {
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
                        <NavLink
                            className={styles.review__userLink}
                            to={ACCOUNT_ROUTE
                                .replace(":username", `${reviewData.username}`)
                            }
                            title="User account"
                        >
                            {reviewData.username}
                        </NavLink>
                        {
                            isThisUserReview()
                            &&
                            <h4 className={styles.review__userMark}>
                                (Your review)
                            </h4>
                        }
                    </div>
                    <div
                        className={styles.review__rating}
                        title="Game rating"
                    >
                        <ReviewRating
                            rating={reviewData.rating}
                            size={22}
                        />
                    </div>
                </div>
                <p className={styles.review__text}>{reviewData.text}</p>
                <ReviewStats
                    reviewData={reviewData}
                    likeHandler={likeReviewHandler}
                    dislikeHandler={dislikeReviewHandler}
                    isActiveButtons={isActiveButtons()}
                />
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

export default GameReviewItem;
