import React, {useEffect, useState} from "react";

import styles from "./ReviewForm.module.scss";

import {useAddReviewMutation} from "../../API/igdbAPI";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {selectIsAuth} from "../../store/selectors";
import {setIsFetching} from "../../store/userSlice";

import Textarea from "../UI/Textarea/Textarea";
import Button from "../UI/Button/Button";
import RegularLoader from "../UI/RegularLoader/RegularLoader";

interface ReviewFormProps {
   setIsError: (isError: boolean) => void;
   isShowForm: boolean;
   setIsShowForm: (isShowForm: boolean) => void;
   isUserReviewWritten: boolean;
   gameSlug: string | undefined;
   refetchReviews: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({setIsError, isShowForm, setIsShowForm, isUserReviewWritten, gameSlug, refetchReviews}) => {
    const [addReview, {isLoading}] = useAddReviewMutation();

    const [reviewText, setReviewText] = useState<string>("");

    const buttonDisabledHandler = (): boolean => !(reviewText.length && gameSlug);

    const addReviewHandler = async (): Promise<void> => {
        if (gameSlug?.length) {
            const response = await addReview({
                text: reviewText,
                slug: gameSlug
            }).unwrap().catch((err) => err);

            if (response?.status === 200) {
                setIsShowForm(false);
                refetchReviews();
            } else if (response?.data?.message) {
                setIsError(true);
                setIsShowForm(false);
            }
        }
    };

    const closeFormHandler = (): void => {
        setIsShowForm(false);
    };

    const showFormHandler = (): void => {
        setIsShowForm(true);
    };

    const isAuth: boolean = useAppSelector(selectIsAuth);
    const dispatch = useAppDispatch();

    useEffect((): void => {
        dispatch(setIsFetching(isLoading));
    }, [isLoading]);

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
                isLoading
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
                        <Button
                            title="Send"
                            onClick={addReviewHandler}
                            disabled={buttonDisabledHandler()}
                        />
                    </div>
            }
        </div>
            :
            <>
                {
                    !isUserReviewWritten
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
                    <p className={styles.errorMessage}>You must be logged in to write and like review's</p>
                }
            </>
    );
};

export default ReviewForm;
