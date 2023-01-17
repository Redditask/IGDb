import React, {useEffect, useState} from "react";

import styles from "./App.module.scss";

import Header from "./components/Header/Header";
import AsideBar from "./components/AsideBar/AsideBar";
import GameList from "./components/GameList/GameList";
import ErrorMessage from "./components/UI/ErrorMesage/ErrorMessage";

import {useGetAllGamesQuery} from "./API/rawgApi";

import {scrollHandler} from "./utils/helpers";

import {Game} from "./types/types";

// ToDo:
//  Ссылки в компонентах сделать через map, названия ссылок в константы, добавить роутинг
//  Query:
//    больше запросов
//  авторизация (jwt)
//  анимации при наведении на ссылки
//  в Home будут популярные игры
//  решить проблему с pageLimit, event: any

const App: React.FC = () => {
    const [games, setGames] = useState<Game []>([]);
    const [page, setPage] = useState<number>(1);

    const {data: response, error, isSuccess} = useGetAllGamesQuery(page);

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
        <div className={styles.App}>
            <Header/>
            <div className={styles.App__body}>
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

export default App;
