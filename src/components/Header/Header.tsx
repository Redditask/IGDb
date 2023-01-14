import React from "react";

import styles from "./Header.module.scss";

const Header: React.FC = () => {
    return (
        <header className={styles.Header}>
            <h1>I G D b</h1>
            <div className={styles.Header__items}>
                <p className={styles.Header__item}>My library</p>
                <p className={styles.Header__item}>Log out</p>
            </div>
        </header>
    );
};

export default Header;
