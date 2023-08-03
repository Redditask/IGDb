import React from "react";

import {NavLink} from "react-router-dom";

import styles from "./Error.module.scss";

import {HOME_ROUTE} from "../../utils/consts";

const Error: React.FC = () => {

    return (
        <div className={styles.page}>
            <h1 className={styles.errorMessage}>Oops, something go wrong...</h1>
            <NavLink
                to={HOME_ROUTE}
                className={styles.page__link}
            >
                Back to main page
            </NavLink>
        </div>
    );
};

export default Error;
