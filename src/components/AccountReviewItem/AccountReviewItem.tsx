import React, {useEffect} from "react";

import styles from "./AccountReviewItem.module.scss";

import {useGetSearchResultsQuery} from "../../API/rawgApi";

import {LazyLoadImage} from "react-lazy-load-image-component";
import {NavLink} from "react-router-dom";

import {useAppDispatch} from "../../hooks";
import {setIsError, setIsFetching} from "../../store/userSlice";

import ReviewRating from "../UI/ReviewRating/ReviewRating";

import {IGameReview} from "../../types/data";
import {initialGamesState} from "../../utils/helpers/initialStates";
import {regularCrop} from "../../utils/helpers/systemActions";

import {GAME_ROUTE} from "../../utils/consts";

interface AccountReviewItemProps {
    reviewData: IGameReview;
}

const AccountReviewItem: React.FC<AccountReviewItemProps> = ({reviewData}) => {

    const dispatch = useAppDispatch();

    const {
        data: searchResults = initialGamesState,
        isError,
        isFetching
    } = useGetSearchResultsQuery({searchText: reviewData.slug}, {skip: !reviewData.slug});

    useEffect((): void => {
        dispatch(setIsError(isError));
    }, [isError]);

    useEffect((): void => {
        dispatch(setIsFetching(isFetching));
    }, [isFetching]);

    return (
        !!searchResults.results.length
            ?
            <div className={styles.container}>
                <div className={styles.review__infoSide}>
                    <NavLink
                        className={styles.review__link}
                        title="Game page"
                        to={GAME_ROUTE.replace(":slug", `${reviewData.slug}`)}
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
                </div>
            </div>
            :
            <></>
    );
};

export default AccountReviewItem;
