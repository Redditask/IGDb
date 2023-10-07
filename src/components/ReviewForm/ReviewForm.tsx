import React, {forwardRef, useEffect, useState} from "react";

import styles from "./ReviewForm.module.scss";

import {useAddReviewMutation, useEditReviewMutation} from "../../API/igdbAPI";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {selectIsAuth} from "../../store/selectors";
import {setIsError, setIsFetching} from "../../store/userSlice";

import Textarea from "../UI/Textarea/Textarea";
import Button from "../UI/Button/Button";
import RegularLoader from "../UI/RegularLoader/RegularLoader";
import ReviewRatingSelecter from "../ReviewRatingSelecter/ReviewRatingSelecter";

import {GamePageInfo, IReviewInfo, NotificationRef} from "../../types/data";

interface ReviewFormProps {
   gamePageInfo: GamePageInfo,
   editReviewInfo: IReviewInfo;
   setEditReviewInfo: (editReviewInfo: IReviewInfo) => void;
   refetchReviews: () => void;
}

const ReviewForm = forwardRef<NotificationRef, ReviewFormProps>(({
        gamePageInfo,
        refetchReviews,
        editReviewInfo,
        setEditReviewInfo
    }, ref) => {

    const [reviewText, setReviewText] = useState<string>("");
    const [reviewRating, setReviewRating] = useState<number>(0);
    const [isShowForm, setIsShowForm] = useState<boolean>(false);

    const [addReview, {isLoading: isAddLoading, isError: isAddError}] = useAddReviewMutation();
    const [editReview, {isLoading: isEditLoading, isError: isEditError}] = useEditReviewMutation();

    const isAuth: boolean = useAppSelector(selectIsAuth);
    const dispatch = useAppDispatch();

    const buttonsDisabledHandler = (): boolean => !(reviewText.length && gamePageInfo.slug && reviewRating);
    const mainButtonDisabledHandler = (): () => void => isAuth ? showFormHandler : ()=> {};

    const showNotification = (message: string): void => {
        refetchReviews();
        if (ref && "current" in ref && ref.current) ref.current.show(message);
    };

    const addReviewHandler = async (): Promise<void> => {
        if (gamePageInfo.slug?.length) {
            const response = await addReview({
                text: reviewText,
                rating: reviewRating,
                slug: gamePageInfo.slug
            }).unwrap().catch((err) => err);

            if (response?.status === 200) {
                setIsShowForm(false);
                setReviewText("");
                setReviewRating(0);
                showNotification("Review was added");
            } else if (response?.data?.message) {
                setIsShowForm(false);
            }
        }
    };

    const editReviewHandler = async (): Promise<void> => {
        if (editReviewInfo.text.trim() !== reviewText.trim()
            || editReviewInfo.rating !== reviewRating) {
            const response = await editReview({
                reviewId: gamePageInfo.userReviewId,
                text: reviewText,
                rating: reviewRating,
            }).unwrap().catch((err) => err);

            if (response?.status === 200){
                setIsShowForm(false);
                setEditReviewInfo({
                    text: "",
                    rating: 0
                });
                showNotification("Review was edited");
            } else if (response?.data?.message) {
                setIsShowForm(false);
            }
        }
    };

    const closeFormHandler = (): void => {
        setIsShowForm(false);
        if (editReviewInfo.text || editReviewInfo.rating) {
            setEditReviewInfo({
                text: "",
                rating: 0
            });
        }
    };

    const showFormHandler = (): void => {
        setIsShowForm(true);
    };

    useEffect((): void => {
        dispatch(setIsFetching(isAddLoading || isEditLoading));
    }, [isAddLoading, isEditLoading]);

    useEffect((): void => {
        dispatch(setIsError(isAddError || isEditError));
    }, [isAddError, isEditError]);

    useEffect((): void => {
        if (editReviewInfo.text) {
            console.log(editReviewInfo)
            setReviewText(editReviewInfo.text)
            setIsShowForm(true);
        } else setIsShowForm(false);
    }, [editReviewInfo.text]);

    useEffect((): void => {
        if (editReviewInfo.rating) {
            setReviewRating(editReviewInfo.rating);
            setIsShowForm(true);
        } else setIsShowForm(false);
    }, [editReviewInfo.rating]);

    useEffect((): void => {
        setIsShowForm(false);
    }, [gamePageInfo.slug]);

    return (
        isShowForm
            ?
            <div className={styles.form}>
                <Textarea
                    value={reviewText}
                    setValue={setReviewText}
                    placeholder="Write something!"
                />
                <div className={styles.form__footer}>
                <ReviewRatingSelecter
                    rating={reviewRating}
                    setRating={setReviewRating}
                />
                {
                    (isAddLoading || isEditLoading)
                        ?
                        <div className={styles.loader}>
                            <RegularLoader/>
                        </div>
                        :
                        <div className={styles.form__buttons}>
                            <Button
                                title="Close"
                                onClick={closeFormHandler}
                            />
                            {
                                (editReviewInfo.text || editReviewInfo.rating)
                                    ?
                                    <Button
                                        title="Edit"
                                        onClick={editReviewHandler}
                                        disabled={buttonsDisabledHandler()}
                                    />
                                    :
                                    <Button
                                        title="Send"
                                        onClick={addReviewHandler}
                                        disabled={buttonsDisabledHandler()}
                                    />
                            }
                        </div>
                }
                </div>
            </div>
            :
            <>
                {
                    !gamePageInfo.userReviewId
                    &&
                    <div
                        className={styles.form__startButton}
                        onClick={mainButtonDisabledHandler()}
                    >
                        Write a review
                    </div>
                }
            </>
    );
});

export default ReviewForm;
