import React from "react";

import styles from "./GamesFilter.module.scss";

import {ICustomOption} from "../../types/data";

interface GamesFilterProps {
    title: string;
    options: ICustomOption[];
    filterString: string;
    setFilter: (option: string) => void;
    resetState: () => void;
    defaultValue: string;
}

const GamesFilter: React.FC<GamesFilterProps> = ({
        title,
        options,
        setFilter,
        filterString,
        resetState,
        defaultValue
    }) => {

    const selectHandler = (event: any): void => {
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
            <select
                onChange={selectHandler}
                title={`Select ${title}`}
            >
                <option value="">{defaultValue}</option>
                {
                    options.map((option: ICustomOption)=>
                        <option
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

export default GamesFilter;
