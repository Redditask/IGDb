import React, {useState} from "react";

import {useGetSearchResultsQuery} from "../../API/rawgApi";

import styles from "./Search.module.scss";

import Input from "../UI/Input/Input";
import {ImSearch} from "react-icons/im";

const Search: React.FC = () => {
    const [searchText, setSearchText] = useState<string>("");

    //const {data, isLoading} = useGetSearchResultsQuery({searchText});

    const searchHandler = (event: any) => setSearchText(event.target.value);

    //console.log(data)

    return (
        <div className={styles.search}>
            <ImSearch/>
            <Input
                value={searchText}
                onChange={searchHandler}
                placeholder="Search"
            />
        </div>
    );
};

export default Search;
