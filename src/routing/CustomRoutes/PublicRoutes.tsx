import React from "react";

import {Routes, Route, Navigate} from "react-router-dom";

import Layout from "./Layout/Layout";

import {ICustomRoute} from "../../types/types";

interface PublicRoutesProps {
    routes: ICustomRoute [];
    redirectRoute: string;
}

const PublicRoutes: React.FC<PublicRoutesProps> = ({routes, redirectRoute}) => {

    return (
        <Routes>
            <Route element={<Layout/>}>
                {routes.map((route) =>
                    <Route key={route.path} path={route.path} element={<route.component/>}/>
                )}
                <Route path="*" element={<Navigate to={redirectRoute} replace/>}/>
            </Route>
        </Routes>
    );
};

export default PublicRoutes;
