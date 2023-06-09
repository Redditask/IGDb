import React from "react";

import {NavLink} from "react-router-dom";

import styles from "./Header.module.scss";

import {useLogoutMutation} from "../../API/igdbAPI";

import Search from "../Search/Search";
import HeaderItems from "../UI/HeaderItems/HeaderItems";

import {clearUser} from "../../store/userSlice";
import {selectIsAuth, selectIsChecked} from "../../store/selectors";
import {useAppDispatch, useAppSelector} from "../../hooks";
import HeaderItemsSkeleton from "../UI/HeaderItemsSkeleton/HeaderItemsSkeleton";
import {HOME_ROUTE} from "../../utils/consts";

const Header: React.FC = () => {
    const [logout] = useLogoutMutation();

    const dispatch = useAppDispatch();
    const isAuth: boolean = useAppSelector(selectIsAuth);
    const isChecked = useAppSelector(selectIsChecked);

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
                        />
                        :
                        <HeaderItemsSkeleton />
                }
            </nav>
        </header>
    );
};

export default Header;
