import React from "react";

import CustomRoutes from "../CustomRoutes/CustomRoutes";

import {publicRoutes} from "../../routes/routes";

import {HOME_ROUTE} from "../../utils/consts";

const AppRouter: React.FC = () => {

    return (
        <CustomRoutes routes={publicRoutes} redirectRout={HOME_ROUTE}/>
    );
};

export default AppRouter;
