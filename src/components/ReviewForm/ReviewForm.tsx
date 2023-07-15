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
   setIsShowModal: (isShowModal: boolean) => void;
   pageReload: () => void;
   gameSlug: string | undefined;
}

const ReviewForm: React.FC<ReviewFormProps> = ({setIsError, setIsShowModal, gameSlug, pageReload}) => {
    const [addReview, {isLoading}] = useAddReviewMutation();
    const dispatch = useAppDispatch();

    const [reviewText, setReviewText] = useState<string>("");
    const [isSuccessfulAdded, setIsSuccessfulAdded] = useState<boolean>(false);

    const buttonDisabledHandler = (): boolean => !(reviewText.length && gameSlug);

    const addReviewHandler = async (): Promise<void> => {
        if (gameSlug?.length) {
            const response = await addReview({
                text: reviewText,
                slug: gameSlug
            }).unwrap().catch((err) => err);

            if (response?.status === 200) {
                setIsSuccessfulAdded(true);
            } else if (response?.data?.message) {
                setIsError(true);
                setIsShowModal(false);
            }
        }
    };

    const closeForm = (): void => {
        setIsShowModal(false);
        pageReload();
    };

    useEffect((): void => {
        dispatch(setIsFetching(isLoading));
    }, [isLoading])

    return (
        !isSuccessfulAdded
            ?
            <div className={styles.form}>
                <h1>Write your impression about game!</h1>
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
                        <Button
                            title="Send"
                            onClick={addReviewHandler}
                            disabled={buttonDisabledHandler()}
                        />
                }
            </div>
            :
            <div className={styles.successfulForm}>
                <h1>Your review has been successfully added!</h1>
                <span
                    className={styles.successfulForm__button}
                    onClick={closeForm}
                >
                    Close
                </span>
            </div>
    );
};

export default ReviewForm;
