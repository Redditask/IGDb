import React, {useEffect, useRef, useState} from "react";

import {useParams} from "react-router-dom";

import styles from "./Account.module.scss";

import Error from "../Error/Error";
import AccountInfo from "../../components/AccountInfo/AccountInfo";
import ScrollUpButton from "../../components/UI/ScrollUpButton/ScrollUpButton";
import AccountGames from "../../components/AccountGames/AccountGames";
import Notification from "../../components/UI/Notification/Notification";

import {selectIsError, selectUsername} from "../../store/selectors";
import {useAppSelector} from "../../hooks";

import {NotificationRef} from "../../types/data";

const Account: React.FC = () => {
    const [showScrollUp, setShowScrollUp] = useState<boolean>(false);

    const {username} = useParams();

    const isError: boolean = useAppSelector(selectIsError);
    const user: string = useAppSelector(selectUsername);

    const notificationRef = useRef<NotificationRef>(null);

    const isUserAccount = (): boolean => user === username;

    const idDefinition = (): string => showScrollUp ? styles.show : styles.hide;

    const scrollHandler = (): void => {
        if (window.scrollY > 1300) {
            setShowScrollUp(true);
        } else {
            setShowScrollUp(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", scrollHandler);

        return function (): void {
            window.removeEventListener("scroll", scrollHandler);
        }
    }, []);

    return (
        isError
            ?
            <Error/>
            :
            <div className={styles.account}>
                <AccountInfo
                    selectedUser={username}
                    isUserAccount={isUserAccount()}
                    ref={notificationRef}
                />
                {
                    isUserAccount()
                    &&
                    <AccountGames/>
                }
                <div className={styles.scrollUp}>
                    <div
                        className={styles.scrollUp__button}
                        id={idDefinition()}
                    >
                        <ScrollUpButton showScrollUp={showScrollUp}/>
                    </div>
                </div>
                <Notification
                    ref={notificationRef}
                />
            </div>
    );
};

export default Account;
