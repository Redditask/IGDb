import React, {ChangeEventHandler, ReactNode} from "react";

import styles from "./Input.module.scss";

interface InputProps {
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    placeholder: string;
    children: ReactNode | undefined;
}

const Input: React.FC<InputProps> = ({value, onChange, placeholder, children}) => {

    return (
        <div className={styles.container}>
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={styles.input}
            />
            {children}
        </div>
    );
};

export default Input;
