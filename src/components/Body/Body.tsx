import React, {useState} from "react";

import styles from "./Body.module.scss";

import {useGetAllGamesQuery} from "../../API/rawgApi";

const Body: React.FC = () => {
    const [page, setPage] = useState<number>(1);
    const {data = [], error, isLoading} = useGetAllGamesQuery(page);

    return (
        <div className={styles.Body}>

        </div>
    );
};

export default Body;
