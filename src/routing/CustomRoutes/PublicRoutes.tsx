import React from "react";

import {Routes, Route, Navigate} from "react-router-dom";

import Layout from "./Layout/Layout";
import PageWithGames from "../../pages/PageWithGames/PageWithGames";

import {PageWithGamesRoute} from "../../types/types";

interface PublicRoutesProps {
    publicRoutes: PageWithGamesRoute [];
    redirectRoute: string;
}

const PublicRoutes: React.FC<PublicRoutesProps> = ({publicRoutes, redirectRoute}) => {

    return (
        <Routes>
            <Route element={<Layout/>}>
                {publicRoutes.map((route) =>
                    <Route key={route.path} path={route.path} element={<PageWithGames apiHook={route.apiHook}/>}/>
                )}
                <Route path="*" element={<Navigate to={redirectRoute} replace/>}/>
            </Route>
        </Routes>
    );
};

export default PublicRoutes;
