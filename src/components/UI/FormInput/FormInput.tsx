import React from "react";

import styles from "./FormInput.module.scss";

import {UseFormRegisterReturn} from "react-hook-form";

interface FormInputProps {
    placeholderText: string;
    formErrorMessage: string | undefined;
    serverErrorMessage: string | null;
    type: "text" | "password";
    register: UseFormRegisterReturn<any>;
}

const FormInput: React.FC<FormInputProps> = ({placeholderText, formErrorMessage, register, type, serverErrorMessage}) => {

    const wrapperStyles: string[] = [styles.formInput__wrapper];
    if (formErrorMessage || serverErrorMessage) wrapperStyles.push(styles.formInput__errorWrapper);

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
                (!!formErrorMessage || !!serverErrorMessage)
                &&
                <h5 className={styles.formInput__error}>
                    {formErrorMessage ?? serverErrorMessage}
                </h5>
            }
        </>
    );
};

export default FormInput;
