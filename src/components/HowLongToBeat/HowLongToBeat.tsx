import React from "react";

import {useGetHowLongToBeatQuery} from "../../API/igdbAPI";

import styles from "./HowLongToBeat.module.scss";

import HowLongToBeatSkeleton from "../UI/HowLongToBeatSkeleton/HowLongToBeatSkeleton";
import HowLongToBeatItem from "../HowLongToBeatItem/HowLongToBeatItem";

import {initialHowLongToBeatState, isHasHowLongToBeat} from "../../utils/helpers";

interface HowLongToBeatProps {
    gameName: string;
    isLoading: boolean;
}

const HowLongToBeat: React.FC<HowLongToBeatProps> = ({gameName, isLoading}) => {

    const {
        data: howLongToBeat = initialHowLongToBeatState,
        error: howLongToBeatError
    } = useGetHowLongToBeatQuery({gameName}, {skip: !gameName});

    return (
        <>
            {
                isHasHowLongToBeat(howLongToBeat)
                &&
                (
                    isLoading
                        ?
                        <HowLongToBeatSkeleton/>
                        :
                        <div className={styles.howLongToBeat}>
                            <h2>How long to beat</h2>
                            <div className={styles.howLongToBeat__items}>
                                <HowLongToBeatItem title="Main story" value={howLongToBeat?.gameplayMain}/>
                                <HowLongToBeatItem title="Main + Sides" value={howLongToBeat?.gameplayMainExtra}/>
                                <HowLongToBeatItem title="Completionist" value={howLongToBeat?.gameplayCompletionist}/>
                            </div>
                        </div>
                )
            }
        </>
    );
};

export default HowLongToBeat;
