import React, {useEffect} from "react";

import {NavLink, useParams} from "react-router-dom";

import styles from "./Activate.module.scss";

import {setIsFetching} from "../../store/userSlice";
import {useAppDispatch} from "../../hooks";

import {useActivateAccountQuery} from "../../API/igdbAPI";

import ErrorPage from "../../components/UI/ErrorPage/ErrorPage";

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
            <ErrorPage/>
            :
            <div className={styles.activate}>
                <h2>{data.activationMessage}</h2>
                <NavLink
                    className={styles.link}
                    to={LOGIN_ROUTE}
                >
                    Login now!
                </NavLink>
            </div>
    );
};

export default Activate;
