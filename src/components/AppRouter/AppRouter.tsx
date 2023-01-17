import React from "react";

import {publicRoutes} from "../../routes/routes";
import {HOME_ROUTE} from "../../utils/consts";

import CustomRoutes from "../CustomRoutes/CustomRoutes";

const AppRouter: React.FC = () => {

    return (
        <CustomRoutes routes={publicRoutes} redirectRout={HOME_ROUTE}/>
    );
};

export default AppRouter;
