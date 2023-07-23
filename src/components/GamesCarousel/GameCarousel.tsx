import React, {useEffect, useState} from "react";

import styles from "./GameCarousel.module.scss";

import {MdArrowForwardIos, MdArrowBackIos} from "react-icons/md";

import GameList from "../GameList/GameList";
import GameCarouselSkeleton from "../Skeletons/GameCarouselSkeleton/GameCarouselSkeleton";

import {IGameCard} from "../../types/data";

interface GameCarouselProps {
    title: string;
    games: IGameCard[];
    isLoading: boolean;
}

const GamesCarousel:React.FC<GameCarouselProps> = ({title, games, isLoading}) => {
    const [displayedGames, setDisplayedGames] = useState<IGameCard []>([]);
    const [startIndex, setStartIndex] = useState<number>(0);
    const [finalIndex, setFinalIndex] = useState<number>(0);

    useEffect((): void => {
        setDisplayedGames([...games.slice(startIndex, finalIndex)]);
    }, [finalIndex]);

    useEffect((): void => {
        setStartIndex(0);

        games.length > 3 ? setFinalIndex(3) : setFinalIndex(games.length);
    }, [games]);

    const nextIndexHandler = (): void => {
        if (finalIndex < games.length) {
            setStartIndex((prev: number) => prev + 1);
            setFinalIndex((prev: number) => prev + 1);
        }
    };

    const prevIndexHandler = (): void => {
        if (startIndex > 0) {
            setStartIndex((prev: number) => prev - 1);
            setFinalIndex((prev: number) => prev - 1);
        }
    };

    const leftButtonIdDefinition = (): string => !!startIndex ? styles.show : styles.hide;

    const rightButtonIdDefinition = (): string => (finalIndex !== games.length) ? styles.show : styles.hide;

    return (
        isLoading
            ?
            <GameCarouselSkeleton/>
            :
            <>
                {
                    !!games.length
                    &&
                    <div className={styles.container}>
                        <h2 className={styles.title}>{title}</h2>
                        <div className={styles.carousel}>
                            <MdArrowBackIos
                                className={styles.button}
                                id={leftButtonIdDefinition()}
                                size={40}
                                onClick={prevIndexHandler}
                            />
                            <div className={styles.track}>
                                <GameList
                                    games={displayedGames}
                                    isLimit={true}
                                    isEmpty={false}
                                />
                            </div>
                            <MdArrowForwardIos
                                className={styles.button}
                                id={rightButtonIdDefinition()}
                                size={40}
                                onClick={nextIndexHandler}
                            />
                        </div>
                    </div>
                }
            </>
    );
};

export default GamesCarousel;
