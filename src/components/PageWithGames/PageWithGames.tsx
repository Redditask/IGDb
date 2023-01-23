import React, {useEffect, useState} from "react";

import styles from "./PageWithGames.module.scss";

import {UseQuery} from "@reduxjs/toolkit/dist/query/react/buildHooks";

import Header from "../Header/Header";
import AsideBar from "../AsideBar/AsideBar";
import ErrorMessage from "../UI/ErrorMesage/ErrorMessage";
import GameList from "../GameList/GameList";
import Filter from "../Filter/Filter";

import {apiHookType, Game} from "../../types/types";

import {scrollCheck} from "../../utils/helpers";
import {genresList, platformsList} from "../../utils/consts";

interface PageWithGamesProps {
    apiHook: UseQuery<apiHookType>;
}

const PageWithGames:React.FC<PageWithGamesProps> = ({apiHook}) => {
    const [games, setGames] = useState<Game []>([]);
    const [page, setPage] = useState<number>(1);
    const [pageLimit, setPageLimit] = useState<number>(2);
    const [isLimit, setIsLimit] = useState<boolean>(false);
    const [genres, setGenres] = useState<string>("");
    const [platforms, setPlatforms] = useState<string>("");

    const {data: response, error, isSuccess} = apiHook({page: page, genres: genres, platforms: platforms});

    useEffect(()=>{
        setPage(1);
        setGames([]);
    }, [genres, platforms]);

    useEffect(() => {
        document.addEventListener("scroll", scrollListener);

        if (isSuccess) {
            setGames([...games, ...response.results]);
            setPageLimit(Math.ceil(response.count / 20));
        }

        return function () {
            document.removeEventListener("scroll", scrollListener);
        };
    }, [response]);

    const scrollListener = (event: Event) => {
        scrollHandler(event, setPage);
    };

    const scrollHandler = (event: any, setPage: React.Dispatch<React.SetStateAction<number>>): void => {
        if (scrollCheck(event) && page < pageLimit) {
            setPage((prevState: number) => prevState + 1);
        } else if (page === pageLimit) {
            setIsLimit(true);
        }
    };

    return (
        <div className={styles.PageWithGames}>
            <Header/>
            <div className={styles.PageWithGames__container}>
                <AsideBar/>
                <div className={styles.PageWithGames__body}>
                    <div className={styles.PageWithGames__filters}>
                        <Filter setState={setGenres} filterString="&genres" options={genresList}/>
                        <Filter setState={setPlatforms} filterString="&parent_platforms" options={platformsList}/>
                    </div>
                    {
                        error
                            ? <ErrorMessage/>
                            : <GameList games={games} isLimit={isLimit}/>
                    }
                </div>
            </div>
        </div>
    );
};

export default PageWithGames;
