import React, {forwardRef, useEffect, useState} from "react";

import styles from "./ReviewForm.module.scss";

import {useAddReviewMutation, useEditReviewMutation} from "../../API/igdbAPI";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {selectIsAuth} from "../../store/selectors";
import {setIsError, setIsFetching} from "../../store/userSlice";

import Textarea from "../UI/Textarea/Textarea";
import Button from "../UI/Button/Button";
import RegularLoader from "../UI/RegularLoader/RegularLoader";

import {GamePageInfo, NotificationRef} from "../../types/data";

interface ReviewFormProps {
   gamePageInfo: GamePageInfo,
   editReviewText: string;
   setEditReviewText: (editReviewText: string) => void;
   refetchReviews: () => void;
}

const ReviewForm = forwardRef<NotificationRef, ReviewFormProps>(({
        gamePageInfo,
        refetchReviews,
        editReviewText,
        setEditReviewText
    }, ref) => {

    const [reviewText, setReviewText] = useState<string>("");
    const [isShowForm, setIsShowForm] = useState<boolean>(false);

    const [addReview, {isLoading: isAddLoading, isError: isAddError}] = useAddReviewMutation();
    const [editReview, {isLoading: isEditLoading, isError: isEditError}] = useEditReviewMutation();

    const buttonDisabledHandler = (): boolean => !(reviewText.length && gamePageInfo.slug);

    const isAuth: boolean = useAppSelector(selectIsAuth);
    const dispatch = useAppDispatch();

    const showNotification = (message: string): void => {
        refetchReviews();
        if (ref && "current" in ref && ref.current) ref.current.show(message);
    };

    const addReviewHandler = async (): Promise<void> => {
        if (gamePageInfo.slug?.length) {
            const response = await addReview({
                text: reviewText,
                slug: gamePageInfo.slug
            }).unwrap().catch((err) => err);

            if (response?.status === 200) {
                setIsShowForm(false);
                setReviewText("");
                showNotification("Review was added");
            } else if (response?.data?.message) {
                setIsShowForm(false);
            }
        }
    };

    const editReviewHandler = async (): Promise<void> => {
        if (editReviewText.trim() !== reviewText.trim()) {
            const response = await editReview({
                reviewId: gamePageInfo.userReviewId,
                text: reviewText
            }).unwrap().catch((err) => err);

            if (response?.status === 200){
                setIsShowForm(false);
                setEditReviewText("");
                showNotification("Review was edited");
            } else if (response?.data?.message) {
                setIsShowForm(false);
            }
        }
    };

    const closeFormHandler = (): void => {
        setIsShowForm(false);
        if (editReviewText) setEditReviewText("");
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
        if (editReviewText) {
            setReviewText(editReviewText);
            setIsShowForm(true);
        } else setIsShowForm(false);
    }, [editReviewText]);

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
                {
                    (isAddLoading || isEditLoading)
                        ?
                        <div className={styles.loader}>
                            <RegularLoader/>
                        </div>
                        :
                        <div className={styles.buttons}>
                            <Button
                                title="Close"
                                onClick={closeFormHandler}
                            />
                            {
                                editReviewText
                                    ?
                                    <Button
                                        title="Edit"
                                        onClick={editReviewHandler}
                                        disabled={buttonDisabledHandler()}
                                    />
                                    :
                                    <Button
                                        title="Send"
                                        onClick={addReviewHandler}
                                        disabled={buttonDisabledHandler()}
                                    />
                            }
                        </div>
                }
            </div>
            :
            <>
                {
                    !gamePageInfo.userReviewId
                    &&
                    <Button
                        title="Write a review"
                        onClick={showFormHandler}
                        disabled={!isAuth}
                    />
                }
                {
                    !isAuth
                    &&
                    <p className={styles.errorMessage}>
                        You must be logged in to write and like review's
                    </p>
                }
            </>
    );
});

export default ReviewForm;
