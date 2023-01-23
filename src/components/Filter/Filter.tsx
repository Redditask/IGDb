import React from "react";

import styles from "./Filter.module.scss";

import {CustomOption} from "../../types/types";

interface FilterProps {
    options: CustomOption[];
    filterString: string;
    setState: (option: string) => void;
}

const Filter: React.FC<FilterProps> = ({options, setState, filterString}) => {

    const selectHandler = (event: any) => {
        setState(`${filterString}=${event.target.value}`)
    };

    return (
        <select
            className={styles.filter}
            onChange={selectHandler}
        >
            <option value="" disabled>Select filter</option>
            {
                options.map(option=>
                    <option
                        key={option.name}
                        value={option.value}
                    >
                        {option.name}
                    </option>)

            }
        </select>
    );
};

export default Filter;
