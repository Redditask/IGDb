import React, {useTransition, useState, lazy, Suspense} from "react";

import {useGetSearchResultsQuery} from "../../API/rawgApi";

import {ImSearch} from "react-icons/im";

import styles from "./Search.module.scss";

import Input from "../UI/Input/Input";
const SearchItem = lazy(()=>import("../SearchItem/SearchItem"));

const Search: React.FC = () => {
    const [isPending, startTransition] = useTransition();
    const [searchText, setSearchText] = useState<string>("");

    const {data} = useGetSearchResultsQuery({searchText}, {skip: !searchText});

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
            {
                data
                    ?
                    <div className={styles.search__content}>
                        {
                            data.results.length
                                ?
                                data.results.map((game) =>
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
                    :
                    <></>
            }
        </div>
    );
};

export default Search;
