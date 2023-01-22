import React from "react";

import {useGetAllTimeTopGamesQuery} from "../../../API/rawgApi";

import PageWithGames from "../../../components/PageWithGames/PageWithGames";

const AllTimeTop:React.FC = () => {

    return (
        <PageWithGames apiHook={useGetAllTimeTopGamesQuery}/>
    );
};

export default AllTimeTop;
