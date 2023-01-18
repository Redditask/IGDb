import React from "react";

import {useGetAllGamesQuery} from "../../API/rawgApi";

import PageWithGames from "../../components/PageWithGames/PageWithGames";

const Home:React.FC = () => {

    return (
        <PageWithGames apiHook={useGetAllGamesQuery}/>
    );
};

export default Home;
