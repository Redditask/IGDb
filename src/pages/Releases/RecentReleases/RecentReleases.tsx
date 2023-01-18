import React from "react";

import {useGetRecentReleasesQuery} from "../../../API/rawgApi";

import PageWithGames from "../../../components/PageWithGames/PageWithGames";

const RecentReleases = () => {

    return (
        <PageWithGames apiHook={useGetRecentReleasesQuery}/>
    );
};

export default RecentReleases;
