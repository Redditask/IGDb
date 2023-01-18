import React from "react";

import {useGetUpcomingReleasesQuery} from "../../../API/rawgApi";

import PageWithGames from "../../../components/PageWithGames/PageWithGames";

const UpcomingReleases:React.FC = () => {

    return (
        <PageWithGames apiHook={useGetUpcomingReleasesQuery}/>
    );
};

export default UpcomingReleases;
