import React from "react";

import styles from "./Button.module.scss";

interface ButtonProps {
    title: string;
    type?: "button" | "submit" | "reset" | undefined;
    disabled?: boolean;
    onClick?: () => void;
}

const Button:React.FC<ButtonProps> = ({title, onClick, type, disabled}) => {

    const stylesHandler = (): string => disabled ? styles.disabledButton : styles.activeButton;

    return (
        <button
            className={stylesHandler()}
            onClick={onClick}
            type={type}
            disabled={disabled}
        >
            {title}
        </button>
    );
};

export default Button;
