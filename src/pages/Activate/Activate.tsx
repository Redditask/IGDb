import React, {useEffect} from "react";

import {NavLink, useParams} from "react-router-dom";

import styles from "./Activate.module.scss";

import {setIsFetching} from "../../store/userSlice";
import {useAppDispatch} from "../../hooks";

import {useActivateAccountQuery} from "../../API/igdbAPI";

import Error from "../Error/Error";

import {initialActivateState} from "../../utils/helpers/initialStates";
import {LOGIN_ROUTE} from "../../utils/consts";

const Activate = () => {
    const {link} = useParams();

    const dispatch = useAppDispatch();

    const {
        data = initialActivateState,
        error,
        isFetching
    } = useActivateAccountQuery({link}, {skip: !link});

    useEffect((): void => {
        dispatch(setIsFetching(isFetching));
    }, [isFetching]);

    return (
        !!error
            ?
            <Error/>
            :
            <div className={styles.activate}>
                <h2>{data.message}</h2>
                <h1 className={styles.activate__message}>Please select your platforms in account</h1>
                <NavLink
                    className={styles.activate__link}
                    to={LOGIN_ROUTE}
                >
                    Login now!
                </NavLink>
            </div>
    );
};

export default Activate;
