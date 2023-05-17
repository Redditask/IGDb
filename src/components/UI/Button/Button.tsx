import React from "react";

import styles from "./Button.module.scss";

interface ButtonProps {
    title: string;
    type?: "button" | "submit" | "reset" | undefined;
    onClick?: () => void;
}

const Button:React.FC<ButtonProps> = ({title, onClick, type}) => {

    return (
        <button
            className={styles.button}
            onClick={onClick}
            type={type}
        >
            {title}
        </button>
    );
};

export default Button;
