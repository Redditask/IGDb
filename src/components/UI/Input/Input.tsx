import React, {ChangeEventHandler} from "react";

import styles from "./Input.module.scss";

interface InputProps {
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    placeholder: string;
}

const Input: React.FC<InputProps> = ({value, onChange, placeholder}) => {

    return (
        <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={styles.input}
        />
    );
};

export default Input;
