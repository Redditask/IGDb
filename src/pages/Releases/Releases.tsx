import React from "react";

import {useGetNewReleasesQuery} from "../../API/rawgApi";

import PageWithGames from "../../components/PageWithGames/PageWithGames";

const Releases: React.FC = () => {

    return (
        <PageWithGames apiHook={useGetNewReleasesQuery} />
    );
};

export default Releases;
