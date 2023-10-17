import React, {useEffect} from "react";

import styles from "./AccountReviewItem.module.scss";

import {useGetSearchResultsQuery} from "../../API/rawgApi";
import {useDislikeReviewMutation, useLikeReviewMutation} from "../../API/igdbAPI";

import {LazyLoadImage} from "react-lazy-load-image-component";
import {NavLink} from "react-router-dom";

import {useAppDispatch} from "../../hooks";
import {setIsError, setIsFetching} from "../../store/userSlice";

import ReviewRating from "../UI/ReviewRating/ReviewRating";
import ReviewStats from "../UI/ReviewStats/ReviewStats";

import {IGameReview} from "../../types/data";
import {initialGamesState} from "../../utils/helpers/initialStates";
import {regularCrop} from "../../utils/helpers/systemActions";

import {GAME_ROUTE} from "../../utils/consts";

interface AccountReviewItemProps {
    reviewData: IGameReview;
    refetchReviews: () => void;
    currentUser: string;
}

const AccountReviewItem: React.FC<AccountReviewItemProps> = ({reviewData, refetchReviews, currentUser}) => {
    const [likeReview, {isLoading: isLoadingLike, isError: isLikeError}] = useLikeReviewMutation();
    const [dislikeReview, {isLoading: isLoadingDislike, isError: isDislikeError}] = useDislikeReviewMutation();

    const {
        data: searchResults = initialGamesState,
        isError: isImageError,
        isFetching: isLoadingImage
    } = useGetSearchResultsQuery({searchText: reviewData.slug}, {skip: !reviewData.slug});

    const dispatch = useAppDispatch();

    const isActiveButtons = (): boolean => !(reviewData.username === currentUser || !currentUser);

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

    useEffect((): void => {
        dispatch(setIsError(
            isImageError
            || isLikeError
            || isDislikeError
        ));
    }, [
        isImageError,
        isLikeError,
        isDislikeError
    ]);

    useEffect((): void => {
        dispatch(setIsFetching(
            isLoadingImage
            || isLoadingLike
            || isLoadingDislike
        ));
    }, [
        isLoadingImage,
        isLoadingLike,
        isLoadingDislike
    ]);

    return (
        !!searchResults.results.length
            ?
            <div className={styles.container}>
                <div className={styles.review__infoSide}>
                    <NavLink
                        className={styles.review__link}
                        to={GAME_ROUTE
                            .replace(":slug", `${reviewData.slug}`)
                        }
                        title="Game page"
                    >
                        <LazyLoadImage
                            className={styles.review__image}
                            src={regularCrop(searchResults.results[0].background_image)}
                            effect="blur"
                            alt="Background"
                        />
                        <h3>{searchResults.results[0].name}</h3>
                    </NavLink>
                    <div
                        className={styles.review__rating}
                        title="Rating"
                    >
                        <ReviewRating rating={reviewData.rating} size={22}/>
                    </div>
                </div>
                <div className={styles.review}>
                    <p className={styles.review__text}>{reviewData.text}</p>
                    <ReviewStats
                        reviewData={reviewData}
                        likeHandler={likeReviewHandler}
                        dislikeHandler={dislikeReviewHandler}
                        isActiveButtons={isActiveButtons()}
                    />
                </div>
            </div>
            :
            <>
            </>
    );
};

export default AccountReviewItem;
