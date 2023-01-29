import React from "react";

import PublicRoutes from "./CustomRoutes/PublicRoutes";

import {publicRoutes} from "./routes";

import {HOME_ROUTE} from "../utils/consts";

const AppRouter: React.FC = () => {

    return (
        <PublicRoutes routes={publicRoutes} redirectRoute={HOME_ROUTE}/>
    );
};

export default AppRouter;
