import React from "react";

import styles from "./Header.module.scss";

const Header: React.FC = () => {

    return (
        <header className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.header__title}>
                    I G D b
                </h1>
                <nav className={styles.header__items}>
                    <p className={styles.header__item}>
                        My library
                    </p>
                    <p className={styles.header__item}>
                        Log out
                    </p>
                </nav>
            </div>
        </header>
    );
};

export default Header;
