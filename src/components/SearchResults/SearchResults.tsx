import React, {lazy, Suspense} from "react";

import styles from "./SearchResults.module.scss";

import {IGameCard} from "../../types/data";

import {GamesQueryResult} from "../../types/queries/results";

const SearchItem = lazy(()=>import("../SearchItem/SearchItem"));

interface SearchResultsProps {
    list: GamesQueryResult;
    clean: () => void;
    isLoading: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({list, clean, isLoading}) => {

    return (
        <>
            {
                !!list.count
                    ?
                    list.results.map((game: IGameCard) =>
                        game.background_image
                        &&
                        <Suspense
                            fallback={null}
                            key={game.slug}
                        >
                            <SearchItem
                                game={game}
                                clean={clean}
                                isLoading={isLoading}
                            />
                        </Suspense>
                    )
                    :
                    <h2 className={styles.emptySearch}>
                        No results
                    </h2>
            }
        </>
    );
};

export default SearchResults;
