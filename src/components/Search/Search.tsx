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
                <ImSearch size={20}/>
                <Input
                    value={searchText}
                    onChange={searchHandler}
                    placeholder="Search"
                />
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
