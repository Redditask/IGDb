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
            </select>
        </form>
    );
};

export default ReviewsSorter;
