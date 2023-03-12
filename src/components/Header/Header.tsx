import React from "react";

import {NavLink} from "react-router-dom";

import styles from "./Header.module.scss";

import Search from "../Search/Search";

const Header: React.FC = () => {

    return (
        <header className={styles.container}>
            <div className={styles.header}>
                <NavLink
                    className={styles.header__title}
                    to="/games"
                    title="Back to main page"
                >
                    I G D b
                </NavLink>
                <Search/>
                <nav className={styles.header__items}>
                    <NavLink
                        className={styles.header__item}
                        to="/library"
                        title="Your games library"
                    >
                        Library
                    </NavLink>
                    <p className={styles.header__item}>
                        Log out
                    </p>
                </nav>
            </div>
        </header>
    );
};

export default Header;
