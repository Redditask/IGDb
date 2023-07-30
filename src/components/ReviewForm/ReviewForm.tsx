import React, {useEffect, useState} from "react";

import styles from "./ReviewForm.module.scss";

import {useAddReviewMutation} from "../../API/igdbAPI";

import {useAppDispatch} from "../../hooks";
import {setIsFetching} from "../../store/userSlice";

import Textarea from "../UI/Textarea/Textarea";
import Button from "../UI/Button/Button";
import RegularLoader from "../UI/RegularLoader/RegularLoader";

interface ReviewFormProps {
   setIsError: (isError: boolean) => void;
   setIsShowReviewForm: (isShowReviewForm: boolean) => void;
   gameSlug: string | undefined;
   refetchReview: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({setIsError, setIsShowReviewForm, gameSlug, refetchReview}) => {
    const [addReview, {isLoading}] = useAddReviewMutation();
    const dispatch = useAppDispatch();

    const [reviewText, setReviewText] = useState<string>("");

    const buttonDisabledHandler = (): boolean => !(reviewText.length && gameSlug);

    const addReviewHandler = async (): Promise<void> => {
        if (gameSlug?.length) {
            const response = await addReview({
                text: reviewText,
                slug: gameSlug
            }).unwrap().catch((err) => err);

            if (response?.status === 200) {
                setIsShowReviewForm(false);
                refetchReview();
            } else if (response?.data?.message) {
                setIsError(true);
                setIsShowReviewForm(false);
            }
        }
    };

    const closeFormHandler = (): void => {
        setIsShowReviewForm(false);
    };

    useEffect((): void => {
        dispatch(setIsFetching(isLoading));
    }, [isLoading])

    return (
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
    );
};

export default ReviewForm;
