import React from "react";

import {NavLink} from "react-router-dom";

import styles from "./Error.module.scss";

import {useAppDispatch} from "../../hooks";
import {setIsError} from "../../store/userSlice";

import {HOME_ROUTE} from "../../utils/consts";

const Error: React.FC = () => {

    const dispatch = useAppDispatch();

    const clearError = (): void => {
        dispatch(setIsError(false));
    };

    return (
        <div className={styles.page}>
            <h1 className={styles.errorMessage}>Oops, something go wrong...</h1>
            <NavLink
                to={HOME_ROUTE}
                onClick={clearError}
                className={styles.page__link}
            >
                Back to main page
            </NavLink>
        </div>
    );
};

export default Error;
