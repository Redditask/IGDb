import React, {useEffect, useState} from "react";

import styles from "./AccountInfo.module.scss";

import {setIsError, setIsFetching} from "../../store/userSlice";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {selectUsername} from "../../store/selectors";

import {useGetAccountInfoQuery} from "../../API/igdbAPI";

import AccountInfoEditer from "../AccountInfoEditer/AccountInfoEditer";
import PlatformIcons from "../UI/PlatofrmIcons/PlatformIcons";
import Button from "../UI/Button/Button";

import {initialAccountInfoState} from "../../utils/helpers/initialStates";
import {dateFormatting} from "../../utils/helpers/dates";

interface AccountInfoProps {
    selectedUser: string | undefined;
}

const AccountInfo: React.FC<AccountInfoProps> = ({selectedUser}) => {
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const username: string = useAppSelector(selectUsername);

    const {
        data: info = initialAccountInfoState,
        isError,
        isFetching,
        refetch
    } = useGetAccountInfoQuery({selectedUser}, {skip: !selectedUser});

    const getStringRegistrationDate = (): string => {
        const date: Date = new Date(info.registrationDate);

        return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    };

    const openEditerHandler = (): void => setIsEdit(true);

    useEffect((): void => {
        refetch();
    }, []);

    useEffect((): void => {
        dispatch(setIsError(isError));
    }, [isError]);

    useEffect((): void => {
        dispatch(setIsFetching(isFetching));
    }, [isFetching]);

    return (
        <div className={styles.container}>
            <div className={styles.leftSide}>
                <div className={styles.leftSide__profilePhoto}>
                    {/*заглушка*/}
                </div>
            </div>
            {
                isEdit
                    ?
                    <AccountInfoEditer
                        username={username}
                        userInfo={info}
                        setIsEdit={setIsEdit}
                    />
                    :
                    <div className={styles.textSide}>
                        <h2>{selectedUser}</h2>
                        <h3>
                            REGISTRATION DATE: {dateFormatting(getStringRegistrationDate())}
                        </h3>
                        <div>
                            <h2>{info.reviewsCount} REVIEWS</h2>
                            <h2>{info.libraryCount} GAME IN LIBRARY</h2>
                            <h2>{info.wishlistCount} GAME IN WISHLIST</h2>
                        </div>
                        <div className={styles.textSide__currentPlatforms}>
                            <h3>PLATFORMS:</h3>
                            {
                                !!info.platforms.length
                                    ?
                                    <PlatformIcons platformsArray={info.platforms}/>
                                    :
                                    <h3 className={styles.textSide__message}>NO SELECTED PLATFORMS</h3>
                            }
                        </div>
                        <Button
                            title="Edit"
                            onClick={openEditerHandler}
                        />
                    </div>
            }
        </div>
    );
};

export default AccountInfo;
