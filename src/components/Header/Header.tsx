import React from "react";

import styles from "./Header.module.scss";

const Header: React.FC = () => {
    return (
        <header className={styles.Container}>
            <div className={styles.Header}>
                <h1>I G D b</h1>
                <nav className={styles.Header__items}>
                    <p className={styles.Header__item}>My library</p>
                    <p className={styles.Header__item}>Log out</p>
                </nav>
            </div>
        </header>
    );
};

export default Header;
