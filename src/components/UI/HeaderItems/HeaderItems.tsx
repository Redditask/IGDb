import React from "react";

import styles from "./HeaderItems.module.scss";

import {NavLink} from "react-router-dom";

import {HOME_ROUTE, LIBRARY_ROUTE, LOGIN_ROUTE} from "../../../utils/consts";

interface HeaderItemsProps {
    isAuth: boolean;
    logoutHandler: () => void;
}

const HeaderItems: React.FC<HeaderItemsProps> = ({isAuth, logoutHandler}) => {

    return (
        isAuth
            ?
            <>
                <nav className={styles.items}>
                    <NavLink
                        className={styles.item}
                        to={LIBRARY_ROUTE}
                        title="Your games library"
                    >
                        Library
                    </NavLink>
                    <NavLink
                        className={styles.item}
                        to={HOME_ROUTE}
                        title="Log out"
                        onClick={logoutHandler}
                    >
                        Log out
                    </NavLink>
                </nav>
            </>
            :
            <>
                <nav className={styles.items}>
                    <NavLink
                        className={styles.item}
                        to={LOGIN_ROUTE}
                        title="Login"
                    >
                        Login
                    </NavLink>
                </nav>
            </>
    );
};

export default HeaderItems;
