import React, {memo} from "react";

import styles from "./Filter.module.scss";

import {CustomOption} from "../../types/types";

interface FilterProps {
    title: string;
    options: CustomOption[];
    filterString: string;
    setState: (option: string) => void;
    resetState: () => void;
    defaultValue: string;
}

const Filter: React.FC<FilterProps> = memo(
    ({title, options, setState, filterString, resetState, defaultValue}) => {

    const selectHandler = (event: any) => {
        if (event.target.value) {
            resetState();
            setState(`${filterString}=${event.target.value}`);
        }else {
            resetState();
            setState("");
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
                        </option>
                    )
                }
            </select>
        </form>
    );
});

export default Filter;
