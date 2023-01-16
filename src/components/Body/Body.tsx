import React, {useState} from "react";

import styles from "./Body.module.scss";

import {useGetAllGamesQuery} from "../../API/rawgApi";

import {ServerResponse} from "../../types/types";

import GameCard from "../GameCard/GameCard";
import Loader from "../UI/Loader/Loader";

const Body: React.FC = () => {
    const [page, setPage] = useState<number>(2);

    const {data = [], error, isLoading, isSuccess} = useGetAllGamesQuery(page);
    const response: ServerResponse = data;

    //console.log(response.results[0].tags[0].name)
    //console.log(response)

    if (error) alert(error);

    return (
        <div className={styles.Body}>
            {
                isSuccess
                    ?
                    response.results.map(
                        (game) => <GameCard game={game} key={game.name}/>
                    )
                    :
                    <Loader/>
            }
        </div>
    );
};

export default Body;
