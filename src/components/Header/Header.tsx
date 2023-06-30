import React from "react";

import {NavLink} from "react-router-dom";

import styles from "./Header.module.scss";

import {useLogoutMutation} from "../../API/igdbAPI";

import {useAppDispatch, useAppSelector} from "../../hooks";

import Search from "../Search/Search";
import HeaderItems from "../UI/HeaderItems/HeaderItems";
import HeaderItemsSkeleton from "../UI/HeaderItemsSkeleton/HeaderItemsSkeleton";

import {clearUser} from "../../store/userSlice";
import {selectIsAuth, selectIsChecked, selectUsername} from "../../store/selectors";

import {HOME_ROUTE} from "../../utils/consts";

const Header: React.FC = () => {
    const [logout] = useLogoutMutation();

    const dispatch = useAppDispatch();
    const isAuth: boolean = useAppSelector(selectIsAuth);
    const isChecked: boolean = useAppSelector(selectIsChecked);
    const username: string = useAppSelector(selectUsername);

    const logoutHandler = async () => {
        await logout({});
        dispatch(clearUser());
    };

    return (
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
                        <HeaderItemsSkeleton />
                }
            </nav>
        </header>
    );
};

export default Header;
