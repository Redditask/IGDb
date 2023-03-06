import React from "react";

import styles from "./RangeSlider.module.scss";

interface RangeSliderProps {
    min: number;
    max: number;
    firstValue: number;
    secondValue: number;
    firstHandler: (event: any) => void;
    secondHandler: (event: any) => void;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
        min,
        max,
        firstValue,
        firstHandler,
        secondValue,
        secondHandler
    }) => {

    return (
        <div className={styles.container}>
            <p className={styles.value}>{firstValue}</p>
            <div className={styles.rangeSlider}>
                <div className={styles.rangeSlider__progress}/>
                <div className={styles.inputs}>
                    <input
                        className={styles.rangeMin}
                        type="range"
                        min={min}
                        max={max}
                        value={firstValue}
                        onChange={firstHandler}
                    />
                    <input
                        className={styles.rangeMax}
                        type="range"
                        min={min}
                        max={max}
                        value={secondValue}
                        onChange={secondHandler}
                    />
                </div>
            </div>
            <p className={styles.value}>{secondValue}</p>
        </div>
    );
};

export default RangeSlider;
