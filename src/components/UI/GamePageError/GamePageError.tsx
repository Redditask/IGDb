import React from "react";

import {NavLink} from "react-router-dom";

import styles from "./GamePageError.module.scss";

import Message from "../Message/Message";

import {HOME_ROUTE} from "../../../utils/consts";

const GamePageError: React.FC = () => {

    return (
        <div className={styles.gamePageError}>
            <Message text="Oops, something go wrong..."/>
            <NavLink
                to={HOME_ROUTE}
                className={styles.gamePageError__link}
            >
                Back to main page
            </NavLink>
        </div>
    );
};

export default GamePageError;
