import React, {useTransition, useState} from "react";

import {useGetSearchResultsQuery} from "../../API/rawgApi";

import {ImSearch} from "react-icons/im";

import styles from "./Search.module.scss";

import Input from "../UI/Input/Input";

const Search: React.FC = () => {
    const [isPending, startTransition] = useTransition();
    const [searchText, setSearchText] = useState<string>("");

    const {data, isLoading} = useGetSearchResultsQuery({searchText}, {skip: !searchText});

    const searchHandler = (event: any) => {
        startTransition(()=>{
            setSearchText(event.target.value);
        });
    };

    return (
        <div className={styles.search}>
            <div className={styles.search__line}>
                <div className={styles.search__wrapper}>
                    <Input
                        placeholder="Search"
                        value={searchText}
                        onChange={searchHandler}
                    >
                        <span className={styles.icon}><ImSearch size={15}/></span>
                    </Input>
                </div>
            </div>
            {
                data
                    ?
                    <div className={styles.search__content}>
                        {data.results[0].name}
                    </div>
                    :
                    <></>
            }
        </div>
    );
};

export default Search;
