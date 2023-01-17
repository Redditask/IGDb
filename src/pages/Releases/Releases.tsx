import React, {useEffect, useState} from "react";

import styles from "./Releases.module.scss";

import Header from "../../components/Header/Header";
import AsideBar from "../../components/AsideBar/AsideBar";
import GameList from "../../components/GameList/GameList";
import ErrorMessage from "../../components/UI/ErrorMesage/ErrorMessage";

import {useGetNewReleasesQuery} from "../../API/rawgApi";

import {scrollHandler} from "../../utils/helpers";

import {Game} from "../../types/types";

const Releases: React.FC = () => {
    const [games, setGames] = useState<Game []>([]);
    const [page, setPage] = useState<number>(1);

    const {data: response, error, isSuccess} = useGetNewReleasesQuery(page);

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
        <div className={styles.Releases}>
            <Header/>
            <div className={styles.Releases__body}>
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

export default Releases;
