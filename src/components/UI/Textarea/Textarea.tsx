import React from "react";

import styles from "./Textarea.module.scss";

import {StringChangeEvent} from "../../../types/data";

interface TextareaProps {
    value: string;
    setValue: (value: string) => void;
    placeholder: string;
}

const Textarea: React.FC<TextareaProps> = ({value, setValue, placeholder}) => {

    const textareaHandler = (event: StringChangeEvent): void => setValue(event.target.value);

    return (
        <textarea
            title="Textarea"
            className={styles.textarea}
            value={value}
            onChange={textareaHandler}
            placeholder={placeholder}
        />
    );
};

export default Textarea;
