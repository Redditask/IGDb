import React from "react";

import {Routes, Route, Navigate} from "react-router-dom";

import Layout from "./Layout/Layout";

import {ICustomRoute} from "../../types/data";

interface CustomRoutesProps {
    routes: ICustomRoute [];
    redirectRoute: string;
}

const CustomRoutes: React.FC<CustomRoutesProps> = ({routes, redirectRoute}) => {

    return (
        <Routes>
            <Route element={<Layout/>}>
                {routes.map((route: ICustomRoute) =>
                    <Route key={route.path} path={route.path} element={<route.component/>}/>
                )}
                <Route path="*" element={<Navigate to={redirectRoute} replace/>}/>
            </Route>
        </Routes>
    );
};

export default CustomRoutes;
