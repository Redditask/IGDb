import React from "react";

import {NavLink} from "react-router-dom";
import {LazyLoadImage} from "react-lazy-load-image-component";

import styles from "./SearchItem.module.scss";

import PlatformIcons from "../UI/PlatofrmIcons/PlatformIcons";

import {IGameCard} from "../../types/types";

import {dateFormatting, searchCrop} from "../../utils/helpers";

interface SearchItemProps {
    game: IGameCard;
    clean: () => void;
}

const SearchItem: React.FC<SearchItemProps> = ({game, clean}) => {

    return (
        <NavLink
            className={styles.searchItem}
            to={`/game/${game.slug}`}
            onClick={clean}
        >
            <LazyLoadImage
                className={styles.searchItem__image}
                src={searchCrop(game.background_image)}
                effect="blur"
                alt="Background"
            />
            <div>
                <PlatformIcons platformsArray={game.parent_platforms}/>
                <div className={styles.searchItem__about}>
                    <h3>{game.name}</h3>
                    <p className={styles.searchItem__date}>({dateFormatting(game.released)})</p>
                </div>
            </div>
        </NavLink>
    );
};

export default SearchItem;
