import React, {useEffect} from "react";

import styles from "./AccountInfo.module.scss";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {selectUsername} from "../../store/selectors";

import {useGetAccountInfoQuery} from "../../API/igdbAPI";

import {initialAccountInfoState} from "../../utils/helpers/initialStates";
import {setIsFetching} from "../../store/userSlice";
import {dateFormatting} from "../../utils/helpers/dates";

interface AccountInfoProps {
    selectedUser: string | undefined;
}

const AccountInfo: React.FC<AccountInfoProps> = ({selectedUser}) => {

    const {
        data: info = initialAccountInfoState,
        error: isError,
        isFetching,
        refetch
    } = useGetAccountInfoQuery({selectedUser}, {skip: !selectedUser});

    const dispatch = useAppDispatch();
    const username: string = useAppSelector(selectUsername);

    const getStringRegistrationDate = (): string => {
        const date = new Date(info.registrationDate);

        return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    };

    useEffect((): void=> {
        refetch();
    }, []);

    useEffect((): void => {
        dispatch(setIsFetching(isFetching));
    }, [isFetching]);

    return (
        <div className={styles.container}>
            <div className={styles.profilePhoto}>
                {/*заглушка*/}
            </div>
            <div className={styles.textInfo}>
                <h2>{username}</h2>
                <h3>
                    Registration date:
                    {dateFormatting(getStringRegistrationDate())}
                </h3>
                <div>
                    <h1>{info.reviewsCount} REVIEWS</h1>
                    <h1>{info.libraryCount} GAME IN LIBRARY</h1>
                    <h1>{info.wishlistCount} GAME IN WISHLIST</h1>
                </div>
                {/* v заглушка v */}
                <h3>PLATFORMS: XBOX, PLAYSTATION</h3>
            </div>
        </div>
    );
};

export default AccountInfo;
