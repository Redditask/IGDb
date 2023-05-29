import React from "react";

import {NavLink} from "react-router-dom";

import styles from "./Header.module.scss";

import {useLogoutMutation} from "../../API/igdbAPI";

import Search from "../Search/Search";

import {clearUser} from "../../store/userSlice";
import {selectIsAuth} from "../../store/selectors";
import {useAppDispatch, useAppSelector} from "../../hooks";

const Header: React.FC = () => {
    const [logout, {isError}] = useLogoutMutation();

    const isAuth: boolean = useAppSelector(selectIsAuth);
    const dispatch = useAppDispatch();

    const logoutHandler = async () => {
        await logout();
        dispatch(clearUser());
    };

    return (
        <header className={styles.container}>
            <nav className={styles.header}>
                <NavLink
                    className={styles.header__title}
                    to="/games"
                    title="Back to main page"
                >
                    I G D b
                </NavLink>
                <Search/>
                {
                    isAuth
                        ?
                        <>
                            <nav className={styles.header__items}>
                                <NavLink
                                    className={styles.header__item}
                                    to="/library"
                                    title="Your games library"
                                >
                                    Library
                                </NavLink>
                                <NavLink
                                    className={styles.header__item}
                                    to="/"
                                    title="Log out"
                                    onClick={logoutHandler}
                                >
                                    Log out
                                </NavLink>
                            </nav>
                        </>
                        :
                        <>
                            <nav className={styles.header__items}>
                                <NavLink
                                    className={styles.header__item}
                                    to="/login"
                                    title="Login"
                                >
                                    Login
                                </NavLink>
                            </nav>
                        </>
                }
            </nav>
        </header>
    );
};

export default Header;
