import React from "react";

import {useGetLastYearTopGamesQuery} from "../../../API/rawgApi";

import PageWithGames from "../../../components/PageWithGames/PageWithGames";

const LastYearTop = () => {

    return (
        <PageWithGames apiHook={useGetLastYearTopGamesQuery}/>
    );
};

export default LastYearTop;
