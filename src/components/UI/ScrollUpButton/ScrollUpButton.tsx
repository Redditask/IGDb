import React from "react";

import styles from "./ScrollUpButton.module.scss";

import {AiOutlineArrowUp} from "react-icons/ai";

import {scrollUp} from "../../../utils/helpers/systemActions";

interface ScrollUpButtonProps {
    showScrollUp: boolean;
}

const ScrollUpButton: React.FC<ScrollUpButtonProps> = ({showScrollUp}) => {

    const idDefinition = (): string => showScrollUp ? styles.show : styles.hide;

    return (
        <>
            <AiOutlineArrowUp
                title="Scroll up"
                className={styles.scrollUpButton}
                id={idDefinition()}
                size={45}
                onClick={scrollUp}
            />
        </>
    );
};

export default ScrollUpButton;
