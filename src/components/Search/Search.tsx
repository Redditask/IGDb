import React, {useTransition, useState, lazy, Suspense, useEffect} from "react";

import {useGetSearchResultsQuery} from "../../API/rawgApi";

import {ImSearch} from "react-icons/im";

import styles from "./Search.module.scss";

import {initialSearchState} from "../../utils/helpers";

import Input from "../UI/Input/Input";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
const SearchItem = lazy(()=>import("../SearchItem/SearchItem"));

const Search: React.FC = () => {
    const [isPending, startTransition] = useTransition();
    const [searchText, setSearchText] = useState<string>("");

    const {
        data: searchResults = initialSearchState,
        error: searchError
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
                        searchResults.count
                            ?
                            searchResults.results.map((game) =>
                                game.background_image
                                &&
                                <Suspense
                                    fallback={null}
                                    key={game.slug}
                                >
                                    <SearchItem
                                        game={game}
                                        clean={cleanSearch}
                                    />
                                </Suspense>
                            )
                            :
                            <h2 className={styles.notFounded}>
                                No results
                            </h2>
                }
            </div>
        </div>
    );
};

export default Search;
