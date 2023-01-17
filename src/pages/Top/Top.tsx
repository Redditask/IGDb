import React, {useEffect, useState} from 'react';

import styles from "./Top.module.scss";

import {Game} from "../../types/types";

import {useGetTopGamesQuery} from "../../API/rawgApi";

import {scrollHandler} from "../../utils/helpers";

import Header from "../../components/Header/Header";
import AsideBar from "../../components/AsideBar/AsideBar";
import ErrorMessage from "../../components/UI/ErrorMesage/ErrorMessage";
import GameList from "../../components/GameList/GameList";

const Top = () => {
    const [games, setGames] = useState<Game []>([]);
    const [page, setPage] = useState<number>(1);

    const {data: response, error, isSuccess} = useGetTopGamesQuery(page);

    useEffect(() => {
        if (isSuccess) {
            setGames(() => [...games, ...response.results]);
        }
    }, [response]);

    useEffect(() => {
        document.addEventListener("scroll", (event)=>scrollHandler(event, setPage));

        return function () {
            document.removeEventListener("scroll", (event)=>scrollHandler(event, setPage));
        }
    }, []);

    return (
        <div className={styles.Top}>
            <Header/>
            <div className={styles.Top__body}>
                <AsideBar/>
                {
                    error
                        ? <ErrorMessage />
                        : <GameList games={games}/>
                }
            </div>
        </div>
    );
};

export default Top;
