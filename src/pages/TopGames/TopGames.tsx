import React from "react";

import {useGetTopGamesQuery} from "../../API/rawgApi";

import PageWithGames from "../../components/PageWithGames/PageWithGames";

const TopGames:React.FC = () => {

    return (
        <PageWithGames apiHook={useGetTopGamesQuery}/>
    );
};

export default TopGames;
