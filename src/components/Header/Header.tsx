import React, {useEffect} from "react";

import {NavLink} from "react-router-dom";

import styles from "./Header.module.scss";

import {useLogoutMutation} from "../../API/igdbAPI";

import {useAppDispatch, useAppSelector} from "../../hooks";

import Search from "../Search/Search";
import HeaderLoader from "../UI/HeaderLoader/HeaderLoader";
import HeaderItems from "../HeaderItems/HeaderItems";
import HeaderItemsSkeleton from "../Skeletons/HeaderItemsSkeleton/HeaderItemsSkeleton";

import {clearUser, setIsLoading} from "../../store/userSlice";
import {selectIsAuth, selectIsChecked, selectUsername} from "../../store/selectors";

import {HOME_ROUTE} from "../../utils/consts";

const Header: React.FC = () => {
    const [logout, {isLoading}] = useLogoutMutation();

    const dispatch = useAppDispatch();
    const isAuth: boolean = useAppSelector(selectIsAuth);
    const isChecked: boolean = useAppSelector(selectIsChecked);
    const username: string = useAppSelector(selectUsername);

    const logoutHandler = async (): Promise<void> => {
        await logout({});
        dispatch(clearUser());
    };

    useEffect((): void => {
        dispatch(setIsLoading(isLoading));
    }, [isLoading]);

    return (
        <>
            <header className={styles.container}>
                <nav className={styles.header}>
                    <NavLink
                        className={styles.header__title}
                        to={HOME_ROUTE}
                        title="Back to main page"
                    >
                        I G D b
                    </NavLink>
                    <Search/>
                    {
                        !isChecked
                            ?
                            <HeaderItems
                                isAuth={isAuth}
                                logoutHandler={logoutHandler}
                                username={username}
                            />
                            :
                            <HeaderItemsSkeleton/>
                    }
                </nav>
            </header>
            <HeaderLoader />
        </>
    );
};

export default Header;
