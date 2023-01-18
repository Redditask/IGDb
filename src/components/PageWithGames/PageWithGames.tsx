import React, {useEffect, useState} from "react";

import styles from "./PageWithGames.module.scss";

import {UseQuery} from "@reduxjs/toolkit/dist/query/react/buildHooks";

import Header from "../Header/Header";
import AsideBar from "../AsideBar/AsideBar";
import ErrorMessage from "../UI/ErrorMesage/ErrorMessage";
import GameList from "../GameList/GameList";

import {apiHookType, Game} from "../../types/types";

import {scrollHandler} from "../../utils/helpers";

interface PageWithGamesProps {
    apiHook: UseQuery<apiHookType>;
}

const PageWithGames:React.FC<PageWithGamesProps> = ({apiHook}) => {
    const [games, setGames] = useState<Game []>([]);
    const [page, setPage] = useState<number>(1);

    const {data: response, error, isSuccess} = apiHook(page);

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
        <div className={styles.PageWithGames}>
            <Header/>
            <div className={styles.PageWithGames__body}>
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

export default PageWithGames;
