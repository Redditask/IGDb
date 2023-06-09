import React from "react";

import {NavLink} from "react-router-dom";

import styles from "./ErrorPage.module.scss";

import {HOME_ROUTE} from "../../../utils/consts";

const ErrorPage: React.FC = () => {

    return (
        <div className={styles.errorPage}>
            <h1 className={styles.errorMessage}>Oops, something go wrong...</h1>
            <NavLink
                to={HOME_ROUTE}
                className={styles.errorPage__link}
            >
                Back to main page
            </NavLink>
        </div>
    );
};

export default ErrorPage;
