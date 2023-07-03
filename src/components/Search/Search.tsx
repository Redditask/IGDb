import React, {useTransition, useState} from "react";

import {useGetSearchResultsQuery} from "../../API/rawgApi";

import {ImSearch} from "react-icons/im";

import styles from "./Search.module.scss";

import SearchResults from "../SearchResults/SearchResults";

import {initialSearchState} from "../../utils/helpers/initialStates";

const Search: React.FC = () => {
    const [isPending, startTransition] = useTransition();
    const [searchText, setSearchText] = useState<string>("");
    const [searchFocus, setSearchFocus] = useState<boolean>(false);
    const [isShowResults, setIsShowResults] = useState<boolean>(false);

    const {
        data: searchResults = initialSearchState,
        error: searchError,
        isLoading
    } = useGetSearchResultsQuery({searchText}, {skip: !searchText});

    const searchHandler = (event: any): void => {
        startTransition((): void => {
            setSearchText(event.target.value);
        });
    };

    const cleanSearch = (): void => {
        setSearchText("");
        hideResults();
    };

    const focusSearch = (): void => {
        setSearchFocus(true);
    };

    const blurSearch = (): void => {
        setSearchFocus(false);
    };

    const displayResults = (): void => {
        setIsShowResults(true);
    };

    const hideResults = (): void => {
        setIsShowResults(false);
    };

    const idDefinition = (): string => {
        if ((searchText.length && searchFocus) || isShowResults) return styles.show
        else return styles.hide;
    };

    return (
        <div className={styles.search}>
            <div className={styles.search__line}>
                <div className={styles.search__wrapper}>
                    <input
                        className={styles.search__input}
                        type="text"
                        placeholder="Search"
                        value={searchText}
                        onChange={searchHandler}
                        onFocus={focusSearch}
                        onBlur={blurSearch}
                    />
                    <span className={styles.icon}><ImSearch size={15}/></span>
                </div>
            </div>
            <div
                className={styles.search__content}
                id={idDefinition()}
                onMouseOver={displayResults}
                onMouseOut={hideResults}
            >
                {
                    !!searchError
                        ?
                        <h2 className={styles.errorMessage}>Oops, something go wrong...</h2>
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
