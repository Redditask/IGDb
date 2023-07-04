import React from "react";

import styles from "./HeaderLoader.module.scss";

import {useSelector} from "react-redux";
import {selectIsLoading} from "../../../store/selectors";

const HeaderLoader = () => {
    const isLoading: boolean = useSelector(selectIsLoading);

    const idDefinition = (): string => isLoading ? styles.show : styles.hide;

    return (
        <div
            className={styles.headerLoader}
            id={idDefinition()}
        >
            <div className={styles.headerLoader__inner}/>
        </div>
    );
};

export default HeaderLoader;
