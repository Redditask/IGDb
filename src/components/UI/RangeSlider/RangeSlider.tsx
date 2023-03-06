import React, {useState, useTransition} from "react";

import styles from "./RangeSlider.module.scss";

interface RangeSliderProps {
    min: number;
    max: number;
    firstValue: number;
    secondValue: number;
    firstHandler: (value: number) => void;
    secondHandler: (value: number) => void;
    title: string;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
        min,
        max,
        firstValue,
        firstHandler,
        secondValue,
        secondHandler,
        title
    }) => {
    const [isPending, startTransition] = useTransition();
    const [left, setLeft] = useState<number>(min);
    const [right, setRight] = useState<number>(max);

    const leftProgressHandler = (event: any): void => {
        startTransition(()=>{
            firstHandler(event.target.value);
        });
        setLeft(event.target.value);
    };

    const rightProgressHandler = (event: any): void => {
        startTransition(()=>{
            secondHandler(event.target.value);
        });
        setRight(event.target.value);
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
