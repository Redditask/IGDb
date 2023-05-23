import React from "react";

import styles from "./Registration.module.scss";

import {useRegistrationMutation} from "../../API/igdbAPI";

import {NavLink} from "react-router-dom";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

import Button from "../../components/UI/Button/Button";
import FormInput from "../../components/UI/FormInput/FormInput";

import {RegistrationQueryArgs} from "../../types/types";

import {LOGIN_ROUTE} from "../../utils/consts";
import {registrationValidationSchema} from "../../utils/helpers";

const Registration: React.FC = () => {
    const [registration, {isError}] = useRegistrationMutation();

    const {
        register,
        formState: {errors},
        handleSubmit,
    } = useForm<RegistrationQueryArgs>({
        resolver: yupResolver(registrationValidationSchema),
    });

    const registrationHandler = async (data: RegistrationQueryArgs): Promise<void> => {
        const response = await registration({email: data.email, password: data.password, username: data.username}).unwrap();
        console.log(response);
    };

    return (
        <div
            className={styles.wrapper}
            style={{
                backgroundImage:
                    `linear-gradient(rgba(254, 254, 254, 0.5),rgba(254, 254, 254, 0.5)), url(${process.env["REACT_APP_BACKEND_URL"]}/images/background.jpg)`
            }}
        >
            <form
                className={styles.card}
                onSubmit={handleSubmit(registrationHandler)}
                autoComplete="off"
            >
                <h2>Registration</h2>
                <div className={styles.inputs}>
                    <FormInput
                        placeholderText="Username"
                        errorMessage={errors?.username?.message}
                        register={{...register("username")}}
                    />
                    <FormInput
                        placeholderText="Email"
                        errorMessage={errors?.email?.message}
                        register={{...register("email")}}
                    />
                    <FormInput
                        placeholderText="Password"
                        errorMessage={errors?.password?.message}
                        register={{...register("password")}}
                    />
                </div>
                <Button
                    title="Create your account"
                    type="submit"
                />
                <div className={styles.link}>
                    <p className={styles.link__info}>Already have an account?</p>
                    <NavLink
                        className={styles.link__button}
                        to={LOGIN_ROUTE}
                    >
                        Login now!
                    </NavLink>
                </div>
            </form>
        </div>
    );
};

export default Registration;
