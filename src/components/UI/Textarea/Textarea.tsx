import React from "react";

import styles from "./Textarea.module.scss";

import {StringChangeEvent} from "../../../types/data";

interface TextareaProps {
    value: string;
    setValue: (value: string) => void;
    placeholder: string;
}

const Textarea: React.FC<TextareaProps> = ({value, setValue, placeholder}) => {

    const handler = (event: StringChangeEvent): void => setValue(event.target.value);

    return (
        <textarea
            title="Textarea"
            className={styles.textarea}
            value={value}
            onChange={handler}
            placeholder={placeholder}
        />
    );
};

export default Textarea;
