import React, {Suspense} from "react";

import {Routes, Route, Navigate} from "react-router-dom";

import {CustomRoute} from "../../types/types";

interface CustomRoutesProps {
    routes: CustomRoute [];
    redirectRout: string;
}

const CustomRoutes: React.FC<CustomRoutesProps> = ({routes, redirectRout}) => {

    return (
        <Routes>
            {routes.map((route)=>
                <Route key={route.path} path={route.path} element={
                    <Suspense>
                        <route.Component/>
                    </Suspense>
                }/>
            )}
            <Route path="/*" element={<Navigate to={redirectRout} replace />}/>
        </Routes>
    );
};

export default CustomRoutes;
