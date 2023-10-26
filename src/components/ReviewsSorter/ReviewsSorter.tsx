import React from "react";

import styles from "./ReviewsSorter.module.scss";

interface ReviewsSorterProps {
    setSortOption: (sortOption: "latest" | "mostLiked") => void;
}

const ReviewsSorter: React.FC<ReviewsSorterProps> = ({setSortOption}) => {

    const selectHandler = (event: any): void => {
        setSortOption(event.target.value);
    };

    return (
        <form className={styles.sorter}>
            <select
                onChange={selectHandler}
                title="Select sort"
            >
                <option value="latest">
                    Latest
                </option>
                <option value="mostLiked">
                    Most liked
                </option>
                <option value="ascendingRating">
                    Rating &#8593;
                </option>
                <option value="descendingRating">
                    Rating &#8595;
                </option>
            </select>
        </form>
    );
};

export default ReviewsSorter;
