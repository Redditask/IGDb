import React from "react";

import styles from "./Filter.module.scss";

import {ICustomOption} from "../../types/types";

interface FilterProps {
    title: string;
    options: ICustomOption[];
    filterString: string;
    setFilter: (option: string) => void;
    resetState: () => void;
    defaultValue: string;
}

const Filter: React.FC<FilterProps> = ({title, options, setFilter, filterString, resetState, defaultValue}) => {

    const selectHandler = (event: any) => {
        if (event.target.value) {
            resetState();
            setFilter(`${filterString}=${event.target.value}`);
        }else {
            resetState();
            setFilter("");
        }
    };

    return (
        <form className={styles.filter}>
            <p className={styles.filter__title}>{title}:</p>
            <select onChange={selectHandler}>
                <option value="">{defaultValue}</option>
                {
                    options.map(option=>
                        <option
                            className={styles.filter__option}
                            key={option.name}
                            value={option.value}
                        >
                            {option.name}
                        </option>
                    )
                }
            </select>
        </form>
    );
};

export default Filter;
