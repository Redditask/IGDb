import React from "react";

import {useGetTopGamesQuery} from "../../API/rawgApi";

import PageWithGames from "../../components/PageWithGames/PageWithGames";

const Top:React.FC = () => {

    return (
        <PageWithGames apiHook={useGetTopGamesQuery}/>
    );
};

export default Top;
