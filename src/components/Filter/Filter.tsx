import React from "react";

import styles from "./Filter.module.scss";

import {CustomOption, Game} from "../../types/types";

interface FilterProps {
    title: string;
    options: CustomOption[];
    filterString: string;
    setState: (option: string) => void;
    setGames: (games:Game []) => void;
    setPage: (page: number) => void;
    defaultValue: string;
}

const Filter: React.FC<FilterProps> = ({title, options, setState, filterString, setPage, setGames, defaultValue}) => {

    const selectHandler = (event: any) => {
        if (event.target.value) {
            setGames([]);
            setState(`${filterString}=${event.target.value}`);
            setPage(1);
        }else {
            setGames([]);
            setState("");
            setPage(1);
        }
    };

    return (
        <form className={styles.filter}>
            <p className={styles.filter__title}>{title}:</p>
            <select
                onChange={selectHandler}
            >
                <option value="">{defaultValue}</option>
                {
                    options.map(option=>
                        <option
                            className={styles.filter__option}
                            key={option.name}
                            value={option.value}
                        >
                            {option.name}
                        </option>)

                }
            </select>
        </form>
    );
};

export default Filter;
