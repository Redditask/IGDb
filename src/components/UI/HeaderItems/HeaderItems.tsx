import React from "react";

import styles from "./HeaderItems.module.scss";

import {NavLink} from "react-router-dom";

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
                        to="/library"
                        title="Your games library"
                    >
                        Library
                    </NavLink>
                    <NavLink
                        className={styles.item}
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
                <nav className={styles.items}>
                    <NavLink
                        className={styles.item}
                        to="/login"
                        title="Login"
                    >
                        Login
                    </NavLink>
                </nav>
            </>
    );
};

export default HeaderItems;
