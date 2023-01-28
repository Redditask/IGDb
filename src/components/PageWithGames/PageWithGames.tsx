import React, {useEffect, useState} from "react";

import styles from "./PageWithGames.module.scss";

import {UseQuery} from "@reduxjs/toolkit/dist/query/react/buildHooks";

import Header from "../Header/Header";
import SideBar from "../AsideBar/SideBar";
import Message from "../UI/Mesage/Message";
import GameList from "../GameList/GameList";
import Filter from "../Filter/Filter";

import {apiHookType, Game} from "../../types/types";

import {scrollCheck, scrollUpCheck} from "../../utils/helpers";
import {gamesLimit, genresList, platformsList} from "../../utils/consts";

interface PageWithGamesProps {
    apiHook: UseQuery<apiHookType>;
}

const PageWithGames:React.FC<PageWithGamesProps> = ({apiHook}) => {
    const [games, setGames] = useState<Game []>([]);
    const [page, setPage] = useState<number>(1);
    const [pageLimit, setPageLimit] = useState<number>(2);
    const [isLimit, setIsLimit] = useState<boolean>(false);
    const [isEmpty, setIsEmpty] = useState<boolean>(false);
    const [genres, setGenres] = useState<string>("");
    const [platforms, setPlatforms] = useState<string>("");

    const {data: response, error, isSuccess} = apiHook({page: page, genres: genres, platforms: platforms});

    useEffect(() => {

        if (isSuccess) {
            setGames([...games, ...response.results]);
            setPageLimit(Math.ceil(response.count / gamesLimit));

            response.count < 20
                ? response.count === 0 ? setIsEmpty(true) : setIsLimit(true)
                : document.addEventListener("scroll", scrollListener);
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

    const resetState = (): void => {
        setGames([]);
        setPage(1);
        setPageLimit(2);
        setIsEmpty(false);
        setIsLimit(false);
    };

    return (
        <div className={styles.PageWithGames}>
            <Header/>
            <div className={styles.PageWithGames__container}>
                <SideBar/>
                <div className={styles.PageWithGames__body}>
                    <div className={styles.PageWithGames__filters}>
                        <Filter
                            title="Genre"
                            defaultValue="All"
                            setFilter={setGenres}
                            filterString="&genres"
                            options={genresList}
                            resetState={resetState}
                        />
                        <Filter
                            title="Platform"
                            defaultValue="All"
                            setFilter={setPlatforms}
                            filterString="&parent_platforms"
                            options={platformsList}
                            resetState={resetState}
                        />
                    </div>
                    {
                        error
                            ? <Message text="Oops, something go wrong..."/>
                            : <GameList games={games} isLimit={isLimit} isEmpty={isEmpty}/>
                    }
                </div>
            </div>
        </div>
    );
};

export default PageWithGames;
