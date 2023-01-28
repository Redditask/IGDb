import React from "react";

import {Outlet} from "react-router-dom";

import styles from "./Layout.module.scss";

import Header from "../../../components/Header/Header";

const Layout:React.FC = () => {

    return (
        <div className={styles.Layout}>
            <Header/>
            <Outlet/>
        </div>
    );
};

export default Layout;
