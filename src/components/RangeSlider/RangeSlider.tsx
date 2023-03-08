import React, {useState, useTransition} from "react";

import styles from "./RangeSlider.module.scss";

interface RangeSliderProps {
    min: number;
    max: number;
    firstValue: number;
    secondValue: number;
    setFirstValue: (value: number) => void;
    setSecondValue: (value: number) => void;
    title: string;
    minRange: number;
    resetState: () => void;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
         min,
         max,
         firstValue,
         secondValue,
         setFirstValue,
         setSecondValue,
         title,
         minRange,
        resetState
    }) => {

    const [isPending, startTransition] = useTransition();
    const [left, setLeft] = useState<number>(min);
    const [right, setRight] = useState<number>(max);

    const leftProgressHandler = (event: any): void => {
        if(secondValue - event.target.value >= minRange) {
            resetState();
            startTransition(() => {
                setFirstValue(event.target.value);
            });
            setLeft(event.target.value);
        }
    };

    const rightProgressHandler = (event: any): void => {
        if (event.target.value - firstValue >= minRange) {
            resetState();
            startTransition(() => {
                setSecondValue(event.target.value);
            });
            setRight(event.target.value);
        }
    };

    return (
        <div
            className={styles.container}
            title={title}
        >
            <p className={styles.value}>{firstValue}</p>
            <div className={styles.rangeSlider}>
                <div
                    className={styles.rangeSlider__progress}
                    style={{left: `${left}%`, right: `${max - right}%`}}
                />
                <div className={styles.inputs}>
                    <input
                        type="range"
                        min={min}
                        max={max}
                        value={firstValue}
                        onChange={leftProgressHandler}
                    />
                    <input
                        type="range"
                        min={min}
                        max={max}
                        value={secondValue}
                        onChange={rightProgressHandler}
                    />
                </div>
            </div>
            <p className={styles.value}>{secondValue}</p>
        </div>
    );
};

export default RangeSlider;
