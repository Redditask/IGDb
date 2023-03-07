import React, {useEffect, useState} from "react";

import styles from "./Games.module.scss";

import {useGetGamesQuery} from "../../API/rawgApi";

import SideBar from "../../components/SideBar/SideBar";
import GameList from "../../components/GameList/GameList";
import Filter from "../../components/Filter/Filter";
import Message from "../../components/UI/Message/Message";
import RangeSlider from "../../components/UI/RangeSlider/RangeSlider";

import {IGameCard} from "../../types/types";

import {gamesLimit, genresList, platformsList} from "../../utils/consts";
import {initialGamesState, scrollCheck} from "../../utils/helpers";

interface GamesProps {
    metacritic: string;
    dates: string;
}

const Games:React.FC<GamesProps> = ({metacritic, dates}) => {
    const [games, setGames] = useState<IGameCard []>([]);
    const [page, setPage] = useState<number>(1);
    const [pageLimit, setPageLimit] = useState<number>(2);
    const [isLimit, setIsLimit] = useState<boolean>(false);
    const [isEmpty, setIsEmpty] = useState<boolean>(false);

    const [genres, setGenres] = useState<string>("");
    const [platforms, setPlatforms] = useState<string>("");

    const [firstMetacriticScore, setFirstMetacriticScore] = useState<number>(0);
    const [secondMetacriticScore, setSecondMetacriticScore] = useState<number>(100);

    const {data: response = initialGamesState, error, isSuccess} = useGetGamesQuery({page, metacritic, dates, genres, platforms});

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

    const scrollListener = (event: Event): void => {
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
        <div className={styles.games}>
            <SideBar/>
            <div className={styles.games__body}>
                <div className={styles.games__options}>
                    <RangeSlider
                        min={0}
                        max={100}
                        firstValue={firstMetacriticScore}
                        secondValue={secondMetacriticScore}
                        setFirstValue={setFirstMetacriticScore}
                        setSecondValue={setSecondMetacriticScore}
                        title="Metacritic"
                        minRange={15}
                    />
                    <div className={styles.games__filters}>
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
                </div>
                {
                    error
                        ? <Message text="Oops, something go wrong..."/>
                        : <GameList games={games} isLimit={isLimit} isEmpty={isEmpty}/>
                }
            </div>
        </div>
    );
};

export default Games;
