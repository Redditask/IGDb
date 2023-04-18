import React, {useTransition, useState} from "react";

import {useGetSearchResultsQuery} from "../../API/rawgApi";

import {ImSearch} from "react-icons/im";

import styles from "./Search.module.scss";

import Input from "../UI/Input/Input";
import SearchResults from "../SearchResults/SearchResults";

import {initialSearchState} from "../../utils/helpers";

const Search: React.FC = () => {
    const [isPending, startTransition] = useTransition();
    const [searchText, setSearchText] = useState<string>("");

    const {
        data: searchResults = initialSearchState,
        error: searchError,
        isLoading
    } = useGetSearchResultsQuery({searchText}, {skip: !searchText});

    const searchHandler = (event: any): void => {
        startTransition(() => {
            setSearchText(event.target.value);
        });
    };

    const cleanSearch = (): void => {
        setSearchText("");
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
            <div className={styles.search__content}>
                {
                    searchError
                        ?
                        <h2 className={styles.notFounded}>
                            Oops, something go wrong...
                        </h2>
                        :
                        <SearchResults
                            list={searchResults}
                            clean={cleanSearch}
                            isLoading={isLoading}
                        />
                }
            </div>
        </div>
    );
};

export default Search;
