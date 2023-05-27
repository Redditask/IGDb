import React from "react";

import CustomRoutes from "./CustomRoutes/CustomRoutes";

import {privateRoutes, publicRoutes} from "./routes";

import {HOME_ROUTE} from "../utils/consts";

import {useAppSelector} from "../hooks";
import {selectIsAuth} from "../store/selectors";

const AppRouter: React.FC = () => {
    const isAuth: boolean = useAppSelector(selectIsAuth);

    return (
        isAuth
            ? <CustomRoutes routes={privateRoutes} redirectRoute={HOME_ROUTE}/>
            : <CustomRoutes routes={publicRoutes} redirectRoute={HOME_ROUTE}/>
    );
};

export default AppRouter;
