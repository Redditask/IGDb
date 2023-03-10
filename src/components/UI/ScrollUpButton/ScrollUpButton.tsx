import React from "react";

import styles from "./ScrollUpButton.module.scss";

import {AiOutlineArrowUp} from "react-icons/ai";

import {scrollUp} from "../../../utils/helpers";

interface ScrollUpButtonProps {
    showScrollUp: boolean;
}

const ScrollUpButton: React.FC<ScrollUpButtonProps> = ({showScrollUp}) => {

    return (
        <>
            {
                showScrollUp
                &&
                <AiOutlineArrowUp
                    title="Scroll up"
                    className={styles.scrollUpButton}
                    size={40}
                    onClick={scrollUp}
                />
            }
        </>
    );
};

export default ScrollUpButton;
