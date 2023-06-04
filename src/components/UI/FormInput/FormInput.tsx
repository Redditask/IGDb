import React from "react";

import styles from "./FormInput.module.scss";

import {UseFormRegisterReturn} from "react-hook-form";

interface FormInputProps {
    placeholderText: string;
    errorMessage: any;
    type: "text" | "password";
    register: UseFormRegisterReturn<any>;
}

const FormInput: React.FC<FormInputProps> = ({placeholderText, errorMessage, register, type}) => {

    const wrapperStyles = [styles.formInput__wrapper];
    if (errorMessage) wrapperStyles.push(styles.formInput__errorWrapper);

    return (
        <>
            <div className={wrapperStyles.join(" ")}>
                <input
                    className={styles.formInput__item}
                    type={type}
                    placeholder={placeholderText}
                    {...register}
                />
            </div>
            {
                errorMessage
                &&
                <h5 className={styles.formInput__error}>
                    {String(errorMessage)}
                </h5>
            }
        </>
    );
};

export default FormInput;
